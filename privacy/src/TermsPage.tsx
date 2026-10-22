import { CONTACT_EMAIL, DEVELOPER, TERMS_EFFECTIVE_DATE, TERMS_SECTIONS } from './config'
import { useActiveSection, useScrollProgress } from './hooks'
import { TopBar } from './components/TopBar'
import { Hero } from './components/Hero'
import { Section } from './components/Section'

const IDS = TERMS_SECTIONS.map((s) => s.id)

const GLANCE = [
  { swatch: 'cyan', claim: 'Play it, enjoy it, keep it fair.', detail: 'Shardrop is licensed to you for personal play under Apple’s standard terms, plus the few below.' },
  { swatch: 'violet', claim: 'Shards are for the game only.', detail: 'They have no cash value and can’t be sold, transferred or exchanged.' },
  { swatch: 'pink', claim: 'Purchases go through Apple.', detail: 'Apple handles payment, refunds and restoring Remove Ads.' },
  { swatch: 'gold', claim: 'Mind the flashing lights.', detail: 'Read the photosensitivity warning below before you play.' },
]

export default function Terms() {
  const active = useActiveSection(IDS)
  const progress = useScrollProgress()

  return (
    <>
      <a className="skip" href="#glance">Skip to the terms</a>
      <TopBar sections={TERMS_SECTIONS} active={active} progress={progress} />
      <Hero
        kicker="Terms of Use"
        title={<>Play hard.<br />Play fair.<br /><em>Have fun.</em></>}
        lede="The rules for playing Shardrop, in plain language: your license to the game, how shards and purchases work, fair play on the leaderboards, and staying safe while you play."
        facts={[['Effective', TERMS_EFFECTIVE_DATE], ['Applies to', 'Shardrop for iPhone'], ['Reading time', '4 minutes']]}
        start="#glance"
      />

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

        <Section id="license" num="02" label="Using Shardrop" title="Your license to the game."
          standfirst="Shardrop is licensed to you, not sold, for your own personal play.">
          <div className="prose">
            <p>When you download Shardrop from the App Store, Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer">Licensed Application End User License Agreement</a> gives you a license to use it on Apple devices you own or control. These terms add the parts specific to Shardrop. If the two ever conflict, Apple’s agreement wins.</p>
            <p>You may play Shardrop for personal, non-commercial purposes. Please don’t copy, modify, reverse-engineer or redistribute the app, or use it in a way that breaks the law or interferes with other players.</p>
            <p>Shardrop is meant for players 13 and up, or the minimum age in your country. By playing, you agree to these terms. If you don’t agree, please don’t use the app.</p>
          </div>
        </Section>

        <Section id="shards" num="03" label="Shards & purchases" title="Shards, purchases and your progress."
          standfirst="Shards are an in-game currency with no real-world value. Payments and refunds are handled by Apple.">
          <div className="columns">
            <div>
              <h3 className="col-head mono">Shards</h3>
              <ul className="ruled">
                <li><strong>For the game only.</strong> You earn shards by playing and can buy packs of them. You spend them on skins and streak freezes.</li>
                <li><strong>No cash value.</strong> Shards can’t be redeemed for money, sold, traded, or transferred to another player or account.</li>
                <li><strong>A license, not property.</strong> Shards and skins are part of your license to the game; you don’t own them.</li>
                <li><strong>Balance may change.</strong> We may adjust prices, rewards and how the game is balanced as it develops.</li>
              </ul>
            </div>
            <div>
              <h3 className="col-head mono">Purchases</h3>
              <ul className="ruled">
                <li><strong>Through Apple.</strong> Shard packs and Remove Ads are bought with your Apple Account, under Apple’s terms.</li>
                <li><strong>Refunds by Apple.</strong> Ask at <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a>. We can’t issue refunds ourselves.</li>
                <li><strong>Shard packs are used up.</strong> Once added to your balance, they can’t be restored to another device.</li>
                <li><strong>Remove Ads stays yours.</strong> Restore it any time from Settings › Restore purchases.</li>
              </ul>
            </div>
          </div>
          <figure className="pullquote">
            <blockquote>Your progress lives on your iPhone. Delete the app without a backup and it’s gone, and we have no copy to restore.</blockquote>
            <figcaption className="mono">There are no accounts or servers, by design</figcaption>
          </figure>
        </Section>

        <Section id="fair-play" num="04" label="Fair play" title="Keep the leaderboards honest."
          standfirst="The Daily Prism and the Weekly Challenge only mean something if everyone plays the same game.">
          <div className="prose">
            <p>Leaderboards, achievements and challenge links run on Apple’s Game Center and on the links you share. Please don’t cheat: no modified copies of the app, no tools that change scores or game speed, and no exploiting bugs to post scores you didn’t earn.</p>
            <p>We may remove scores that look impossible, reset leaderboards, or ask Apple to act on accounts that cheat. If you find a bug that affects scores, <a href="#contact">tell us</a>; we’d love to fix it.</p>
          </div>
        </Section>

        <Section id="health" num="05" label="Play safely" title="Photosensitivity warning."
          standfirst="Shardrop contains flashing lights, bright colors and fast motion.">
          <div className="prose">
            <p>These may trigger seizures in people with photosensitive epilepsy. If you or anyone in your family has a history of epilepsy or seizures, consult a doctor before playing. Stop playing immediately if you feel dizzy, have altered vision, eye or muscle twitches, or any involuntary movement.</p>
            <p>We keep flashing under three times a second and respect your iPhone’s Reduce Motion setting, but no game can rule out every risk. Take regular breaks, play in a well-lit room, and stop if you feel unwell.</p>
          </div>
        </Section>

        <Section id="services" num="06" label="Ads & other services" title="Ads, Game Center and the rest."
          standfirst="Some parts of Shardrop are provided by others, under their own terms.">
          <div className="prose">
            <p>Ads are delivered by Google AdMob, leaderboards and achievements by Apple’s Game Center, and purchases by the App Store. Their own terms and privacy policies apply to what they provide. We’re not responsible for ads shown by our ad partner or for the sites they link to.</p>
            <p>How information is handled is explained in the <a href="/privacy/">Shardrop Privacy Policy</a>, which is part of these terms.</p>
          </div>
        </Section>

        <Section id="changes" num="07" label="Changes" title="When the game, or these terms, change."
          standfirst="Shardrop will keep evolving. Features may be added, changed or retired.">
          <div className="prose">
            <p>We may update the game at any time, including maps, skins, prices, the Daily Prism and the Weekly Challenge, and we may stop offering Shardrop altogether. If we change these terms, we’ll update this page and its effective date and mention significant changes in the app’s release notes. Playing after a change means you accept the new terms.</p>
          </div>
        </Section>

        <Section id="legal" num="08" label="The legal part" title="Warranties and liability."
          standfirst="The fine print, kept as short as we can make it.">
          <div className="prose">
            <p>Shardrop is provided “as is” and “as available.” To the extent the law allows, we make no warranties beyond those in Apple’s standard agreement, and we aren’t liable for indirect or consequential losses, or for lost progress, shards or items. Our total liability to you is limited to the amount you paid for in-app purchases in the twelve months before a claim.</p>
            <p className="fine">Nothing in these terms limits rights you have under the consumer protection laws where you live. If any part of these terms can’t be enforced, the rest still applies. Apple is not responsible for these terms or for Shardrop, except as set out in its standard agreement.</p>
          </div>
        </Section>

        <Section id="contact" num="09" label="Contact" title={<>Questions? Write to the person<br className="br-wide" /> who made the game.</>}>
          <div className="contact">
            <a className="contact-link" href={`mailto:${CONTACT_EMAIL}?subject=Shardrop%20terms`}>
              {CONTACT_EMAIL} <span aria-hidden="true">→</span>
            </a>
            <p>Shardrop is made by {DEVELOPER}, an independent developer. You’ll usually hear back within a few days.</p>
          </div>
        </Section>
      </main>

      <footer className="footer mono">
        <span>© 2026 {DEVELOPER}</span>
        <span>Shardrop Terms of Use · Effective {TERMS_EFFECTIVE_DATE}</span>
        <a href="/privacy/">Privacy Policy</a>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  )
}
