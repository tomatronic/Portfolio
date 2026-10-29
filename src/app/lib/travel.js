/**
 * Where Tom has been, and where he is going next — the About page's Travel and
 * Next up cards.
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

// The destination. The outline is hand-traced (~45 points) in a 450x260 box;
// `pin` is in the same coordinates. To change destination, swap all of it.
export const NEXT_UP = {
  country: 'Czech Republic',
  alt: 'Line drawing of the Czech Republic, with Prague marked',
  outline:
    'M7.6 85.0 L34.0 70.0 L63.1 62.0 L88.9 45.0 L124.4 31.0 L150.2 22.0 L169.6 10.0 L183.8 23.0 L195.4 8.0 L214.8 15.0 L230.9 30.0 L260.0 45.0 L276.1 44.0 L287.7 52.0 L272.9 68.0 L295.5 87.0 L314.8 90.0 L324.5 70.0 L350.3 83.0 L369.7 77.0 L382.6 110.0 L408.4 110.0 L426.5 120.0 L443.9 158.0 L424.5 163.0 L395.5 182.0 L382.6 210.0 L366.5 225.0 L337.4 223.0 L321.3 248.0 L292.2 230.0 L260.0 235.0 L227.7 215.0 L195.4 210.0 L192.2 232.0 L176.0 252.0 L150.2 253.0 L130.9 235.0 L118.0 232.0 L92.1 205.0 L66.3 180.0 L40.5 155.0 L30.8 140.0 L37.3 115.0 L14.7 100.0 Z',
  pin: { city: 'Prague', cx: 158, cy: 102 },
}
