import type { ReactNode } from 'react'
import { PrismField } from './PrismField'

/** The dark cover: kicker, headline, a lede, and a few facts set like a masthead. */
export function Hero({ kicker, title, lede, facts, start }: {
  kicker: string; title: ReactNode; lede: string; facts: [string, string][]; start: string
}) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <PrismField />
      <div className="hero-inner">
        <p className="hero-kicker mono">Shardrop <span aria-hidden="true">/</span> {kicker}</p>
        <h1 id="hero-title">{title}</h1>
        <div className="hero-foot">
          <p className="hero-lede">{lede}</p>
          <dl className="hero-facts mono">
            {facts.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
          </dl>
        </div>
        <a className="hero-down mono" href={start}>Start reading <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  )
}
