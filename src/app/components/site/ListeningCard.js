import Image from 'next/image'
import { CARD_RADIUS, TEXT, DARK_INK, DARK_FAINT } from './tokens'
import { LISTENING } from '../../lib/media'

/**
 * "Listening to" — a record slides out from behind the sleeve and spins. Hover
 * only, CSS in globals.css. The record is decorative; the sleeve carries the alt text.
 */
export default function ListeningCard() {
  const { title, artist, cover, alt } = LISTENING

  return (
    <div className={`listening ${CARD_RADIUS} flex flex-1 items-center gap-11 border border-white/10 bg-white/[0.03] p-5`}>
      <div className="relative h-[96px] w-[96px] shrink-0">
        <span aria-hidden="true" className="rec absolute inset-2 rounded-full" />
        <Image
          className="relative h-full w-full rounded-[4px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_6px_16px_rgba(0,0,0,0.45)]"
          src={cover}
          alt={alt}
          width={96}
          height={96}
          sizes="96px"
        />
      </div>
      <div className="min-w-0">
        <p className={`${TEXT.xs} ${DARK_FAINT} mb-1 font-medium leading-[22px]`}>Listening to</p>
        <p className={`${DARK_INK} mb-0 text-[20px] font-medium leading-7`}>{title}</p>
        <p className={`${TEXT.xs} ${DARK_FAINT} mb-0 leading-[22px]`}>{artist}</p>
      </div>
    </div>
  )
}
