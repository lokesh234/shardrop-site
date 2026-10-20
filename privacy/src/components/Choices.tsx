const STEPS = [
  { title: 'Stop tracking', path: ['Privacy & Security', 'Tracking'], note: 'Turn off Shardrop, or turn off “Allow Apps to Request to Track” for every app.' },
  { title: 'Limit Apple’s personalized ads', path: ['Privacy & Security', 'Apple Advertising'], note: 'Covers ads Apple itself shows in its apps.' },
  { title: 'Leave Game Center', path: ['Game Center'], note: 'Sign out. Your progress on the phone is kept.' },
  { title: 'Erase everything', path: ['General', 'iPhone Storage', 'Shardrop'], note: 'Tap Delete App. All game data goes with it.' },
]

export function Choices() {
  return (
    <ol className="choices">
      {STEPS.map((s, i) => (
        <li key={s.title}>
          <span className="choice-num mono">{String.fromCharCode(65 + i)}</span>
          <div>
            <h3>{s.title}</h3>
            <p className="path mono">
              Settings{s.path.map((p, j) => <span key={p}> › {j === s.path.length - 1 ? <strong>{p}</strong> : p}</span>)}
            </p>
            <p className="choice-note">{s.note}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
