import { useEffect, useRef, useState } from 'react'
import { SECTIONS } from '../config'
import { useScrolledPast } from '../hooks'

export function TopBar({ active, progress }: { active: string; progress: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const onPaper = useScrolledPast('top', 60)
  const index = SECTIONS.findIndex((s) => s.id === active)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onClick) }
  }, [open])

  return (
    <header className={`topbar${onPaper ? ' on-paper' : ''}`}>
      <div className="topbar-inner" ref={ref}>
        <a href="#top" className="brand">
          <img src={`${import.meta.env.BASE_URL}prism.svg`} alt="" width={18} height={18} />
          Shardrop
        </a>
        <span className="topbar-where" aria-hidden={!onPaper}>
          {onPaper && index >= 0 && <><span className="mono">{String(index + 1).padStart(2, '0')}</span> {SECTIONS[index].label}</>}
        </span>
        <button className="contents-toggle" aria-expanded={open} aria-controls="contents" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Contents'}
        </button>
        {open && (
          <nav id="contents" className="contents" aria-label="Contents">
            <ol>
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} aria-current={s.id === active ? 'true' : undefined} onClick={() => setOpen(false)}>
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>{s.label}
                  </a>
                </li>
              ))}
            </ol>
            <button className="print-link" onClick={() => { setOpen(false); window.print() }}>Print or save as PDF</button>
          </nav>
        )}
      </div>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  )
}
