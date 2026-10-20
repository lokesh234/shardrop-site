import type { ReactNode } from 'react'
import { useReveal } from '../hooks'

/** An editorial spread: number and label in the margin, headline, a standfirst that says it in one line, then the detail. */
export function Section({ id, num, label, title, standfirst, wide, children }: {
  id: string; num: string; label: string; title: ReactNode; standfirst?: ReactNode; wide?: boolean; children: ReactNode
}) {
  const ref = useReveal<HTMLElement>()
  return (
    <section id={id} ref={ref} className={`section reveal${wide ? ' wide' : ''}`} aria-labelledby={`${id}-title`}>
      <div className="margin">
        <span className="num">{num}</span>
        <span className="label mono">{label}</span>
      </div>
      <div className="body">
        <h2 id={`${id}-title`}>{title}</h2>
        {standfirst && <p className="standfirst">{standfirst}</p>}
        {children}
      </div>
    </section>
  )
}
