/**
 * Where Tom has been — the About page's Travel card.
 *
 * One file on purpose: the "26 countries" figure is the length of COUNTRIES, and
 * the burst of flags is drawn from the same list, so the number and the flags
 * cannot disagree. Add a country here and both move. Each `flag` is a file in
 * `public/flags/`.
 */

export const COUNTRIES = [
  { name: 'France', flag: 'france' },
  { name: 'England', flag: 'england' },
  { name: 'Wales', flag: 'wales' },
  { name: 'Ireland', flag: 'ireland' },
  { name: 'Belgium', flag: 'belgium' },
  { name: 'Malta', flag: 'malta' },
  { name: 'Morocco', flag: 'morocco' },
  { name: 'Japan', flag: 'japan' },
  { name: 'South Korea', flag: 'south-korea' },
  { name: 'Australia', flag: 'australia' },
  { name: 'Fiji', flag: 'fiji' },
  { name: 'Germany', flag: 'germany' },
  { name: 'Thailand', flag: 'thailand' },
  { name: 'Singapore', flag: 'singapore' },
  { name: 'Spain', flag: 'spain' },
  { name: 'Greece', flag: 'greece' },
  { name: 'Austria', flag: 'austria' },
  { name: 'Estonia', flag: 'estonia' },
  { name: 'Iceland', flag: 'iceland' },
  { name: 'Malaysia', flag: 'malaysia' },
  { name: 'Denmark', flag: 'denmark' },
  { name: 'Finland', flag: 'finland' },
  { name: 'Sweden', flag: 'sweden' },
  { name: 'Hungary', flag: 'hungary' },
  { name: 'Italy', flag: 'italy' },
  { name: 'USA', flag: 'usa' },
]

// The overlapping row of photos. `overlap` is the negative left margin that
// tucks each one under its predecessor; `shift` and `tilt` are the hand-set
// offset and rotation that make the row read as a scattered handful.
export const TRAVEL_PHOTOS = [
  { src: '/outside/fuji-dusk.jpg', alt: 'Mount Fuji at dusk, Japan', title: 'Mount Fuji, Japan', overlap: 0, shift: 4, tilt: -3 },
  { src: '/outside/kinkakuji.jpg', alt: 'Kinkaku-ji, Kyoto', title: 'Kinkaku-ji, Kyoto', overlap: 16, shift: -4, tilt: 2 },
  { src: '/outside/seoul-gyeongbokgung.jpg', alt: 'Tom and his partner at Gyeongbokgung, Seoul', title: 'Gyeongbokgung, Seoul', overlap: 12, shift: 8, tilt: -1.5 },
  { src: '/outside/glendalough-lake.jpg', alt: 'Glendalough upper lake, Ireland', title: 'Glendalough, Ireland', overlap: 18, shift: 0, tilt: 3 },
  { src: '/outside/glendalough-boulder.jpg', alt: 'Standing on a boulder above Glendalough', title: 'Glendalough, Ireland', overlap: 14, shift: 6, tilt: -2 },
]
