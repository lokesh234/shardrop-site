import { CONTACT_EMAIL, DEVELOPER, EFFECTIVE_DATE, SECTIONS } from './config'
import { useActiveSection, useScrollProgress } from './hooks'
import { TopBar } from './components/TopBar'
import { Hero } from './components/Hero'
import { Section } from './components/Section'
import { Ledger } from './components/Ledger'
import { Choices } from './components/Choices'
import { Faq } from './components/Faq'

const IDS = SECTIONS.map((s) => s.id)

const GLANCE = [
  { swatch: 'cyan', claim: 'Your progress never leaves your phone.', detail: 'Scores, shards, skins and settings are saved on your device. We can’t see them.' },
  { swatch: 'violet', claim: 'There is no account.', detail: 'No name, email, contacts, photos or precise location. Ever.' },
  { swatch: 'pink', claim: 'Ads pay for the game.', detail: 'Google AdMob receives device and ad data to show them.' },
  { swatch: 'gold', claim: 'Saying no costs you nothing.', detail: 'Decline tracking and the game plays exactly the same.' },
]

const RIGHTS = [
  ['Access', 'Know what’s processed about you, and get a copy.'],
  ['Correction', 'Have inaccurate information fixed.'],
  ['Deletion', 'Have your information erased.'],
  ['Objection', 'Restrict processing, or withdraw consent at any time.'],
  ['Opt-out', 'Of the “sale” or “sharing” of data for targeted ads.'],
  ['Complaint', 'To your local data protection authority.'],
]

export default function App() {
  const active = useActiveSection(IDS)
  const progress = useScrollProgress()

  return (
    <>
      <a className="skip" href="#glance">Skip to the policy</a>
      <TopBar active={active} progress={progress} />
      <Hero />

      <main className="paper">
        <Section id="glance" num="01" label="At a glance" title="The short version." wide>
          <ol className="glance">
            {GLANCE.map((g, i) => (
              <li key={g.claim}>
                <span className="glance-num mono"><span className={`swatch ${g.swatch}`} aria-hidden="true" />{String(i + 1).padStart(2, '0')}</span>
                <p className="glance-claim">{g.claim}</p>
                <p className="glance-detail">{g.detail}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="ledger" num="02" label="Data map" title="Where your information goes." wide
          standfirst="Almost all of it stays on your iPhone. Apple and our ad partner get only what they need. We get nothing.">
          <Ledger />
        </Section>

        <Section id="device" num="03" label="On your device" title="What the game remembers."
          standfirst="Your progress is saved on your phone, and only on your phone.">
          <div className="prose">
            <p>To keep your progress between sessions, Shardrop saves your best scores, unlocked maps and mastery stars, shards and skins, missions, Daily Prism streaks and results, and your sound and haptics settings.</p>
            <p>None of it leaves your device through Shardrop, and we can’t see it. It’s included in your own iCloud or computer backups if you make them, under Apple’s terms. Deleting the app deletes it.</p>
            <p>We don’t run servers, and Shardrop has no analytics of its own.</p>
          </div>
        </Section>

        <Section id="game-center" num="04" label="Apple" title="Game Center."
          standfirst="Optional. If you’re signed in, your scores go to Apple’s leaderboards.">
          <div className="prose">
            <p>If you’re signed in to Game Center, Shardrop sends your scores, Daily Prism results and achievements to Apple so they appear on leaderboards and to your friends. Your nickname and profile are managed by Apple; we never receive your Apple ID or email.</p>
            <p>You can sign out in Settings › Game Center and the game works the same. Apple explains its handling of this data in the <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple Privacy Policy</a>.</p>
          </div>
        </Section>

        <Section id="ads" num="05" label="Advertising" title="How ads work."
          standfirst="Ads keep Shardrop free. Tracking only happens if you say yes.">
          <div className="prose">
            <p>You’ll see an occasional full-screen ad between runs, and you can choose to watch an ad for bonus shards. There are never ads while you play. Ads are delivered by <strong>Google AdMob</strong>, which may let other ad companies bid to fill each one.</p>
          </div>
          <div className="columns">
            <div>
              <h3 className="col-head mono">What they may receive</h3>
              <ul className="ruled">
                <li><strong>Device identifiers.</strong> The IDFV, and the IDFA only if you allow tracking.</li>
                <li><strong>Device and app details.</strong> Model, iOS version, language, time zone, screen size, network type, app version.</li>
                <li><strong>IP address,</strong> which can indicate approximate, city-level location.</li>
                <li><strong>Ad interactions.</strong> Which ads were shown, watched, skipped or tapped.</li>
              </ul>
            </div>
            <div>
              <h3 className="col-head mono">Why</h3>
              <ul className="ruled">
                <li>Choosing and delivering ads</li>
                <li>Not showing you the same ad too often</li>
                <li>Confirming a watched ad, so you get your shards</li>
                <li>Measuring ads and attributing installs</li>
                <li>Detecting and preventing ad fraud</li>
                <li>Personalizing ads, only if you allow tracking</li>
              </ul>
            </div>
          </div>
          <figure className="pullquote">
            <blockquote>Choose “Ask App Not to Track” and your advertising ID stays on your phone. You’ll still see ads. They just won’t follow you.</blockquote>
            <figcaption className="mono">Apple’s standard prompt appears before any tracking</figcaption>
          </figure>
          <div className="prose">
            <p>In the European Economic Area, the UK and Switzerland, the app shows Google’s consent form before ads use your data, and you can change your answer any time in the game’s Settings under Ad Privacy Choices.</p>
            <p>We don’t sell your personal information for money. Google explains how it uses information from apps that show its ads in <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses information from sites or apps that use our services</a>, and in the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</p>
          </div>
        </Section>

        <Section id="choices" num="06" label="Your choices" title="Four switches, all yours."
          standfirst="Everything is controlled from the iPhone Settings app.">
          <Choices />
        </Section>

        <Section id="children" num="07" label="Children" title="For players 13 and up."
          standfirst="Shardrop isn’t directed at children under 13.">
          <div className="prose">
            <p>We don’t knowingly collect personal information from children under 13, or the minimum age in your country. If you believe a child has provided information through the app, <a href="#contact">get in touch</a> and we’ll help remove it.</p>
          </div>
        </Section>

        <Section id="rights" num="08" label="Your rights" title="What the law gives you."
          standfirst="Depending on where you live, you have rights over your data. Using them never costs you anything in the game.">
          <dl className="rights">
            {RIGHTS.map(([term, desc]) => (
              <div key={term}><dt>{term}</dt><dd>{desc}</dd></div>
            ))}
          </dl>
          <div className="prose">
            <p>These come from laws like the GDPR in the EU and UK and state laws such as California’s. Because we don’t hold your data on servers, the quickest route is usually the settings above. For data held by our ad partner, you can also use Google’s privacy tools directly. You’re always welcome to <a href="#contact">write to us</a>.</p>
            <p className="fine">For users in the EEA and UK: the legal basis for advertising that uses your data is your consent. For non-personalized ads and fraud prevention, it’s our legitimate interest in keeping the game free and safe.</p>
          </div>
        </Section>

        <Section id="retention" num="09" label="Retention & changes" title="How long, and what if it changes."
          standfirst="On-device data lasts until you delete the app. Anything sent out is encrypted.">
          <div className="prose">
            <p>Data on your device stays until you delete the app. Apple keeps Game Center data under its own policies, and Google and its ad partners keep advertising data for the periods in theirs. Information sent to them travels over encrypted connections.</p>
            <p>If the way Shardrop handles information changes, for example a new partner, we’ll update this page and its effective date, and mention significant changes in the app’s release notes.</p>
          </div>
        </Section>

        <Section id="faq" num="10" label="Questions" title="Things people ask.">
          <Faq />
        </Section>

        <Section id="contact" num="11" label="Contact" title={<>Questions? Write to the person<br className="br-wide" /> who made the game.</>}>
          <div className="contact">
            <a className="contact-link" href={`mailto:${CONTACT_EMAIL}?subject=Shardrop%20privacy`}>
              {CONTACT_EMAIL} <span aria-hidden="true">→</span>
            </a>
            <p>Shardrop is made by {DEVELOPER}, an independent developer. You’ll usually hear back within a few days.</p>
          </div>
        </Section>
      </main>

      <footer className="footer mono">
        <span>© 2026 {DEVELOPER}</span>
        <span>Shardrop Privacy Policy · Effective {EFFECTIVE_DATE}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  )
}
