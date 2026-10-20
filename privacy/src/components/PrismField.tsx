import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks'

const COLORS = ['#ff338c', '#ffc726', '#9959ff']

type Prism = { x: number; y: number; size: number; speed: number; angle: number; spin: number; color: string; depth: number }

/** The game's falling prisms, drifting behind the hero. Pauses off screen and holds still for reduced motion. */
export function PrismField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let width = 0, height = 0, frame = 0, last = 0, running = true
    let prisms: Prism[] = []

    const make = (y?: number): Prism => {
      const depth = Math.random() ** 1.6 // Mostly far away, a few close.
      return {
        x: Math.random() * width,
        y: y ?? -40,
        size: 8 + depth * 30,
        speed: 14 + depth * 70,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * (0.4 + depth),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        depth,
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(70, (width * height) / 16000))
      prisms = Array.from({ length: count }, () => make(Math.random() * height))
      prisms.sort((a, b) => a.depth - b.depth)
    }

    const draw = (p: Prism) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.globalAlpha = 0.18 + p.depth * 0.6
      ctx.shadowColor = p.color
      ctx.shadowBlur = 6 + p.depth * 18
      const s = p.size
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.62)
      ctx.lineTo(s * 0.56, s * 0.38)
      ctx.lineTo(-s * 0.56, s * 0.38)
      ctx.closePath()
      ctx.fillStyle = p.color
      ctx.fill()
      // A lighter facet sells the prism.
      ctx.shadowBlur = 0
      ctx.globalAlpha *= 0.45
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.62)
      ctx.lineTo(0, s * 0.38)
      ctx.lineTo(-s * 0.56, s * 0.38)
      ctx.closePath()
      ctx.fillStyle = '#fff'
      ctx.fill()
      ctx.restore()
    }

    const tick = (t: number) => {
      const dt = Math.min(0.05, last ? (t - last) / 1000 : 0)
      last = t
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < prisms.length; i++) {
        const p = prisms[i]
        p.y += p.speed * dt
        p.angle += p.spin * dt
        if (p.y - p.size > height) prisms[i] = { ...make(), depth: p.depth, size: p.size, speed: p.speed }
        draw(prisms[i])
      }
      if (running) frame = requestAnimationFrame(tick)
    }

    resize()
    const still = prefersReducedMotion()
    if (still) prisms.forEach(draw)
    else frame = requestAnimationFrame(tick)

    const start = () => { if (!running && !still) { running = true; last = 0; frame = requestAnimationFrame(tick) } }
    const stop = () => { running = false; cancelAnimationFrame(frame) }
    const visibility = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()))
    visibility.observe(canvas)
    const onResize = () => { resize(); if (still) prisms.forEach(draw) }
    window.addEventListener('resize', onResize)
    return () => { stop(); visibility.disconnect(); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} className="prism-field" aria-hidden="true" />
}
