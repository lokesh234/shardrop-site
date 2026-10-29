import { useState, type ReactNode } from 'react'

const QUESTIONS: { q: string; a: ReactNode }[] = [
  { q: 'Do you sell my data?', a: 'No. We never sell anything, and all we receive are anonymous totals that aren’t about you. Our ad partner uses device and ad data to deliver ads, as described above.' },
  { q: 'Can you see my scores or progress?', a: 'No. Progress is saved only on your iPhone. We see anonymous totals, such as how many runs across all players ended with a score of 50–99, never yours. If you use Game Center, Apple shows your scores on leaderboards, but they aren’t sent to us.' },
  { q: 'What are the anonymous stats?', a: 'Counts of things like app opens, runs per map and Starter Week rewards claimed, added up per day across everyone. They help us see what to improve. Turn them off in the game’s Settings under Share anonymous stats.' },
  { q: 'Why does the app ask to track me?', a: 'Apple requires every app to ask before using the advertising identifier. Allowing it can make ads more relevant. Declining is fine, and the game plays exactly the same.' },
  { q: 'What happens if I say no?', a: 'You still see ads, but they won’t be personalized using your activity in other companies’ apps and websites. Nothing in the game is locked.' },
  { q: 'Do I need an account?', a: 'No. There’s no sign-up, login or email. Game Center is optional and run by Apple.' },
  { q: 'How do I delete my data?', a: 'Delete Shardrop from your iPhone; that erases everything the game stored. For ad data held by Google, use the choices above or Google’s privacy tools.' },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="faq">
      {QUESTIONS.map(({ q, a }, i) => {
        const isOpen = open === i
        return (
          <div key={q} className={`faq-item${isOpen ? ' open' : ''}`}>
            <h3>
              <button aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{q}</span>
                <span className="faq-mark mono" aria-hidden="true">{isOpen ? '–' : '+'}</span>
              </button>
            </h3>
            <div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq-answer" hidden={!isOpen}>
              <p>{a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
