import React, { useRef, useEffect, useState } from 'react'
import { Palette, Play, Pause, Sparkles, Activity, Layers } from 'lucide-react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  baseRadius: number
}

export function GenerativeCanvasLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isRunning, setIsRunning] = useState(true)
  const [particleCount, setParticleCount] = useState(70)
  const [connectionDist, setConnectionDist] = useState(110)
  const [particleSpeed, setParticleSpeed] = useState(1.5)
  const [mode, setMode] = useState<'neon' | 'cyber' | 'aurora'>('neon')

  const colorPalettes = {
    neon: ['#38bdf8', '#818cf8', '#c084fc', '#f472b6'],
    cyber: ['#00ffcc', '#0099ff', '#ff007f', '#ffe600'],
    aurora: ['#10b981', '#06b6d4', '#6366f1', '#a855f7']
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700)
    let height = (canvas.height = 360)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = 360
    }
    window.addEventListener('resize', handleResize)

    const colors = colorPalettes[mode]
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2.5 + 1.5
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
        radius,
        baseRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let mouse = { x: -1000, y: -1000, radius: 120 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      if (!ctx) return
      ctx.fillStyle = 'rgba(7, 13, 25, 0.25)'
      ctx.fillRect(0, 0, width, height)

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.4
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy

        // Bounce on borders
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Mouse repulsion & interaction
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          p.x += (dx / dist) * force * 5
          p.y += (dy / dist) * force * 5
          p.radius = p.baseRadius * (1 + force * 1.5)
        } else {
          p.radius = p.baseRadius
        }

        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      if (isRunning) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isRunning, particleCount, connectionDist, particleSpeed, mode])

  return (
    <div className="space-y-6">
      {/* Skill Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-base">canvas-design & threejs-webgl</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">Generative Canvas Engine</span>
            </div>
            <p className="text-xs text-slate-400">High-performance 60FPS fluid particle repulsion field and dynamic mesh geometry</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-purple-400/30 active:scale-95 shadow-md shadow-purple-500/20"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause Engine' : 'Resume Engine'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls & Palette Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Particles</span>
            <span className="text-purple-400 font-semibold">{particleCount}</span>
          </div>
          <input 
            type="range" 
            min="20" 
            max="150" 
            value={particleCount} 
            onChange={(e) => setParticleCount(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Mesh Radius</span>
            <span className="text-cyan-400 font-semibold">{connectionDist}px</span>
          </div>
          <input 
            type="range" 
            min="40" 
            max="200" 
            value={connectionDist} 
            onChange={(e) => setConnectionDist(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Velocity</span>
            <span className="text-emerald-400 font-semibold">{particleSpeed}x</span>
          </div>
          <input 
            type="range" 
            min="0.5" 
            max="4" 
            step="0.5"
            value={particleSpeed} 
            onChange={(e) => setParticleSpeed(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
        </div>

        <div className="space-y-1.5">
          <div className="text-xs font-mono text-slate-400">Palette Mode</div>
          <div className="flex gap-1.5">
            {(['neon', 'cyber', 'aurora'] as const).map(p => (
              <button
                key={p}
                onClick={() => setMode(p)}
                className={`flex-1 py-1 text-[11px] font-semibold rounded uppercase tracking-wider transition-all cursor-pointer ${
                  mode === p 
                    ? 'bg-purple-600 text-white shadow' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-purple-500/20 bg-[#070d19] shadow-2xl shadow-purple-950/40">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair block" />
        
        {/* Floating Canvas Badges */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 backdrop-blur-sm text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-green-400 animate-pulse" />
          <span>Interactive Cursor Gravitation Field (Move mouse over canvas)</span>
        </div>

        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 backdrop-blur-sm text-[10px] font-mono text-purple-300">
          <span>60 FPS • Canvas2D Accelerated</span>
        </div>
      </div>
    </div>
  )
}
