import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Page not found | Tom Spencer',
}

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        <p className="mb-2 text-sm font-medium text-accent-600 dark:text-accent-400">404</p>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          This page doesn&apos;t exist
        </h1>
        <p className="mb-8 max-w-md text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
          The page you&apos;re looking for has moved or never existed. The work, however, is very much still here.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-5 py-2.5 text-sm font-normal text-white transition-colors hover:bg-accent-800 dark:bg-accent-400 dark:text-slate-950 dark:hover:bg-accent-300"
        >
          <ArrowLeft size={15} strokeWidth={2.5} />
          Back to home
        </Link>
      </div>
    </div>
  )
}
