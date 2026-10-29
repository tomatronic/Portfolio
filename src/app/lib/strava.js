/**
 * Strava — running distance over the last rolling 365 days.
 *
 * Server-only. Runs at build/revalidate time from `app/about/page.js`, so no
 * token ever reaches the browser.
 *
 * Strava has no "last 365 days" endpoint. `/athletes/{id}/stats` only offers
 * last-4-weeks, year-to-date and all-time totals, and year-to-date resets every
 * January — so a true rolling year means paging `/athlete/activities` with an
 * `after` timestamp and summing it locally. That is a handful of requests
 * against a 100-per-15-minutes / 1000-per-day limit, called once a day.
 *
 * Setup (one-off, see the note at the bottom of this file):
 *   STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN
 *
 * With any of those missing this returns null and the About page falls back to
 * its static figure — the section renders fine before Strava is wired up.
 */

const TOKEN_URL = 'https://www.strava.com/oauth/token'
const ACTIVITIES_URL = 'https://www.strava.com/api/v3/athlete/activities'
const PER_PAGE = 200
const MAX_PAGES = 10 // 2000 activities in a year is far beyond any real case.

// Access tokens live 6 hours, so there is nothing worth caching about them
// relative to the once-a-day revalidate on the page that calls this.
//
// Deliberately *not* `cache: 'no-store'`: that flag opts the calling route out
// of static rendering entirely, which would turn the About page's once-a-day
// ISR into a Strava round-trip on every single request — and Strava allows only
// 100 requests per 15 minutes. A POST is never entered into Next's Data Cache
// anyway, so omitting the flag costs nothing and keeps /about static.
async function getAccessToken() {
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  })

  if (!response.ok) {
    throw new Error(`Strava token refresh failed: ${response.status}`)
  }

  const data = await response.json()
  return data.access_token
}

/**
 * The 365 days ending today (Europe/London), shaped for the About page's year
 * grid: `pad` empty cells so the first column lines up with Monday, then one
 * entry per day, then the month labels and their column.
 *
 * Built here, on the server, rather than in the component. The grid has to be
 * the same on the server render and in the browser, and a client that computes
 * "today" itself can disagree with the HTML it hydrates if midnight passes
 * between the two.
 *
 * `perDay` is `{ 'YYYY-MM-DD': { km, runs } }`. Totals are summed from the grid's
 * own days, not from the activities query, whose window is 365 x 24 hours back
 * from the current instant and can include a run from the day before the grid
 * starts — the figure on the card and the dots under it must agree.
 */
function buildYear(perDay) {
  const todayKey = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })
  const [y, m, d] = todayKey.split('-').map(Number)
  const end = Date.UTC(y, m - 1, d)
  const DAY = 86400000
  const start = end - 364 * DAY
  const pad = (new Date(start).getUTCDay() + 6) % 7 // Monday first

  const label = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const month = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' })

  const days = []
  const months = []
  let metres = 0
  let runs = 0
  for (let i = 0; i < 365; i += 1) {
    const date = new Date(start + i * DAY)
    const hit = perDay[date.toISOString().slice(0, 10)]
    const km = hit ? Math.round((hit.metres / 1000) * 10) / 10 : 0
    if (hit) {
      metres += hit.metres
      runs += hit.runs
    }
    days.push({ label: label.format(date), km })
    const col = Math.floor((pad + i) / 7) + 1
    // Skip a month whose label would start in the last two columns: it has no
    // room to print.
    if (date.getUTCDate() === 1 && col <= 51) months.push({ col, label: month.format(date) })
  }

  return {
    pad,
    days,
    months,
    runs,
    km: Math.round(metres / 1000),
    avgKm: runs > 0 ? Math.round((metres / 1000 / runs) * 10) / 10 : 0,
  }
}

/**
 * @returns {Promise<{ km: number, activities: number, year: ReturnType<typeof buildYear> } | null>}
 */
export async function getRunningTotals() {
  if (
    !process.env.STRAVA_CLIENT_ID ||
    !process.env.STRAVA_CLIENT_SECRET ||
    !process.env.STRAVA_REFRESH_TOKEN
  ) {
    return null
  }

  try {
    const token = await getAccessToken()
    const after = Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60

    let metres = 0
    let activities = 0
    const perDay = {}

    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const url = `${ACTIVITIES_URL}?after=${after}&per_page=${PER_PAGE}&page=${page}`
      // Matches the calling page's `revalidate`, so the activity pages are
      // refetched on the same once-a-day cadence rather than per request.
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 86400 },
      })

      if (!response.ok) {
        throw new Error(`Strava activities failed: ${response.status}`)
      }

      const batch = await response.json()
      if (!Array.isArray(batch) || batch.length === 0) break

      for (const activity of batch) {
        // sport_type is the current field; type is the deprecated one, kept as
        // a fallback. Both cover Run / TrailRun / VirtualRun with this prefix.
        const sport = activity.sport_type || activity.type || ''
        if (!sport.toLowerCase().includes('run')) continue
        metres += activity.distance || 0
        activities += 1
        // start_date_local is the athlete's own calendar day, which is the day
        // a run belongs to on the grid; start_date is UTC and would shunt an
        // evening run into tomorrow.
        const day = (activity.start_date_local || '').slice(0, 10)
        if (day) {
          const slot = (perDay[day] ||= { metres: 0, runs: 0 })
          slot.metres += activity.distance || 0
          slot.runs += 1
        }
      }

      if (batch.length < PER_PAGE) break
    }

    const year = buildYear(perDay)
    return { km: year.km, activities: year.runs, year }
  } catch (error) {
    // A failed fetch must not take the About page down — fall back to the
    // static figure and leave a trace in the build/function logs.
    console.error('[strava]', error)
    return null
  }
}

/**
 * Getting STRAVA_REFRESH_TOKEN, once:
 *
 * 1. https://www.strava.com/settings/api — create an app. Set the
 *    "Authorization Callback Domain" to `localhost`. Note the Client ID and
 *    Client Secret.
 * 2. Visit this URL in a browser, with your client id substituted in:
 *
 *    https://www.strava.com/oauth/authorize?client_id=YOUR_ID&response_type=code
 *      &redirect_uri=http://localhost/exchange_token&approval_prompt=force
 *      &scope=activity:read_all
 *
 *    Approve. The browser will fail to load localhost — that is expected. Copy
 *    the `code=...` value out of the address bar.
 * 3. Exchange it (this is the only time the code is usable):
 *
 *    curl -X POST https://www.strava.com/oauth/token \
 *      -F client_id=YOUR_ID -F client_secret=YOUR_SECRET \
 *      -F code=THE_CODE -F grant_type=authorization_code
 *
 *    The response's `refresh_token` is long-lived. Put it, the id and the
 *    secret into Vercel's environment variables (and `.env.local` for dev).
 *
 * `activity:read_all` includes private activities. Use `activity:read` instead
 * if only public runs should count.
 *
 * Note: Strava's brand guidelines require visible attribution wherever their
 * data is shown. The About page carries none — a "via Strava" link and then the
 * official "Powered by Strava" logo were both tried and removed on 2026-08-05.
 * Tom's call; see CLAUDE.md's Strava section before re-adding either.
 */
