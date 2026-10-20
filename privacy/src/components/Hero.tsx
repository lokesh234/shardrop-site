import { EFFECTIVE_DATE } from '../config'
import { PrismField } from './PrismField'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <PrismField />
      <div className="hero-inner">
        <p className="hero-kicker mono">Shardrop <span aria-hidden="true">/</span> Privacy Policy</p>
        <h1 id="hero-title">
          Your game.<br />
          Your data.<br />
          <em>Your call.</em>
        </h1>
        <div className="hero-foot">
          <p className="hero-lede">
            Shardrop is a free arcade game with no account and no sign-up. This is exactly what happens to your
            information when you play, in plain language.
          </p>
          <dl className="hero-facts mono">
            <div><dt>Effective</dt><dd>{EFFECTIVE_DATE}</dd></div>
            <div><dt>Applies to</dt><dd>Shardrop for iPhone</dd></div>
            <div><dt>Reading time</dt><dd>4 minutes</dd></div>
          </dl>
        </div>
        <a className="hero-down mono" href="#glance">Start reading <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  )
}
