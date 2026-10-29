const ROWS = [
  {
    where: 'Your iPhone', tag: 'Device', swatch: 'cyan',
    what: ['Best scores, maps and mastery stars', 'Shards, skins and missions', 'Daily Prism streaks and results', 'Sound, music and haptics settings'],
    why: 'So your progress is there the next time you play.',
    control: 'Delete the app to erase it.',
  },
  {
    where: 'Apple Game Center', tag: 'Optional', swatch: 'violet',
    what: ['Scores and Daily Prism results', 'Achievements'],
    why: 'Leaderboards, and showing friends how you did. Only if you’re signed in.',
    control: 'Settings › Game Center › Sign Out.',
  },
  {
    where: 'Shardrop’s own server', tag: 'Optional', swatch: 'gold',
    what: ['That the app was opened, once a day', 'Each run’s map and mode, with score and length rounded into ranges', 'Revives, boosts, Starter Week rewards, unlocks and purchases, by type', 'The day the app was installed'],
    why: 'Seeing which maps and features work, so we know what to improve. Kept only as anonymous daily totals.',
    control: 'Shardrop › Settings › Share anonymous stats.',
  },
  {
    where: 'Google AdMob & ad partners', tag: 'Ads', swatch: 'pink',
    what: ['Device identifiers (IDFV, and IDFA only if you allow tracking)', 'Device model, iOS version, language', 'IP address, for approximate location', 'Which ads were shown, watched or tapped'],
    why: 'Showing the ads that keep the game free, paying out ads you choose to watch, and stopping ad fraud.',
    control: 'Settings › Privacy & Security › Tracking.',
  },
]

/** Where each kind of information ends up, set as a ledger rather than a diagram. */
export function Ledger() {
  return (
    <div className="ledger" role="table" aria-label="Where your information goes">
      <div className="ledger-head mono" role="row">
        <span role="columnheader">Goes to</span>
        <span role="columnheader">What</span>
        <span role="columnheader">Why</span>
        <span role="columnheader">Your control</span>
      </div>
      {ROWS.map((r) => (
        <div className="ledger-row" role="row" key={r.where}>
          <div className="ledger-where" role="rowheader">
            <span className={`swatch ${r.swatch}`} aria-hidden="true" />
            <span className="where-name">{r.where}</span>
            <span className="where-tag mono">{r.tag}</span>
          </div>
          <div role="cell" data-label="What">
            <ul>{r.what.map((w) => <li key={w}>{w}</li>)}</ul>
          </div>
          <div role="cell" data-label="Why"><p>{r.why}</p></div>
          <div role="cell" data-label="Your control"><p className="mono path">{r.control}</p></div>
        </div>
      ))}
      <div className="ledger-row nothing" role="row">
        <div className="ledger-where" role="rowheader">
          <span className="swatch empty" aria-hidden="true" />
          <span className="where-name">The developer</span>
          <span className="where-tag mono">Us</span>
        </div>
        <div role="cell" className="nothing-cell">
          <p className="nothing-word">Totals only.</p>
          <p>No accounts, no IDs, no IP addresses. We receive anonymous daily totals, like “1,204 runs on Neon Grid”, never your scores, your device or you.</p>
        </div>
      </div>
    </div>
  )
}
