import ThemeToggle from './ThemeToggle'
import { Mail, Linkedin } from 'lucide-react'

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="flex w-full items-center justify-center bg-transparent">
      <div className="w-full max-w-6xl px-4">

        <div className="border-t border-[#C8BEB0] dark:border-[#2A3A4A] py-12">
          <div className="flex items-center justify-between">

            {/* Left: contact + attribution */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 leading-none">
                <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
                  Want to get in touch?
                </span>
                <a
                  href="mailto:tom.m.spencer@gmail.com"
                  aria-label="Send email"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/[0.07] text-slate-600 transition-[background-color,color,transform] hover:bg-accent-600 hover:text-white active:scale-[0.96] dark:bg-white/10 dark:text-slate-400 dark:hover:bg-accent-600 dark:hover:text-white"
                >
                  <Mail size={14} strokeWidth={2} />
                </a>
                <a
                  href="https://www.linkedin.com/in/thomas-spencer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/[0.07] text-slate-600 transition-[background-color,color,transform] hover:bg-accent-600 hover:text-white active:scale-[0.96] dark:bg-white/10 dark:text-slate-400 dark:hover:bg-accent-600 dark:hover:text-white"
                >
                  <Linkedin size={14} strokeWidth={2} />
                </a>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                Designed and built by Tom Spencer © {year}
              </p>
            </div>

            {/* Right: theme toggle */}
            <ThemeToggle />

          </div>
        </div>

      </div>
    </div>
  )
}
