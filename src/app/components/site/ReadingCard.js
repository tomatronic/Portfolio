import Image from 'next/image'
import { CARD_RADIUS, TEXT, DARK_INK, DARK_FAINT } from './tokens'
import { READING } from '../../lib/media'

/**
 * "Now reading" — the cover swings open on its spine to show a page block. Hover only, CSS in globals.css.
 */
export default function ReadingCard() {
  const { title, author, cover, alt } = READING

  return (
    <div className={`reading ${CARD_RADIUS} flex flex-1 items-center gap-6 border border-white/10 bg-white/[0.03] p-5`}>
      <div className="book relative h-[96px] w-16 shrink-0">
        <span aria-hidden="true" className="pages absolute inset-y-[3px] left-1 right-[-4px] rounded-r-[3px] bg-[#E8E2D4]" />
        <Image
          className="cover relative h-full w-full rounded-[3px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_6px_16px_rgba(0,0,0,0.45)]"
          src={cover}
          alt={alt}
          width={64}
          height={96}
          sizes="64px"
        />
      </div>
      <div className="min-w-0">
        <p className={`${TEXT.xs} ${DARK_FAINT} mb-1 font-medium leading-[22px]`}>Now reading</p>
        <p className={`${DARK_INK} mb-0 text-[20px] font-medium leading-7`}>{title}</p>
        <p className={`${TEXT.xs} ${DARK_FAINT} mb-0 leading-[22px]`}>{author}</p>
      </div>
    </div>
  )
}
