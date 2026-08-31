import { useEffect, useRef, useState } from "react"
import { getProject, types } from "@theatre/core"
import studio from "@theatre/studio"
import { Play, Pause, RotateCcw, Clapperboard, Sparkles } from "lucide-react"

// Initialize Theatre.js studio in development
if (typeof window !== "undefined" && import.meta.env.DEV) {
  try {
    studio.initialize({ usePersistentStorage: true })
  } catch {
    // ignore if already initialized
  }
}

const project = getProject("Theatre Showcase")
const sheet = project.sheet("Hero Animation")

export function TheatreDemo() {
  const cardRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [coords, setCoords] = useState({ y: 0, scale: 1, rotate: 0, glow: 0.8 })

  useEffect(() => {
    // Create animated Theatre.js Sheet Object
    const heroObject = sheet.object("Hero Card", {
      y: types.number(0, { range: [-40, 40] }),
      scale: types.number(1, { range: [0.8, 1.25] }),
      rotate: types.number(0, { range: [-25, 25] }),
      glow: types.number(0.8, { range: [0.2, 1.5] }),
      orbOffset: types.number(0, { range: [-120, 120] }),
      ringRotate: types.number(0, { range: [0, 360] }),
    })

    // Listen to changes from Theatre.js timeline
    const unsubscribe = heroObject.onValuesChange((vals) => {
      setCoords({
        y: Math.round(vals.y * 10) / 10,
        scale: Math.round(vals.scale * 100) / 100,
        rotate: Math.round(vals.rotate * 10) / 10,
        glow: Math.round(vals.glow * 100) / 100,
      })

      if (cardRef.current) {
        cardRef.current.style.transform = `translateY(${vals.y}px) scale(${vals.scale}) rotate(${vals.rotate}deg)`
        cardRef.current.style.boxShadow = `0 20px 50px -10px rgba(59, 130, 246, ${vals.glow * 0.35}), 0 0 30px 2px rgba(147, 51, 234, ${vals.glow * 0.2})`
      }

      if (orbRef.current) {
        orbRef.current.style.transform = `translateX(${vals.orbOffset}px)`
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${vals.ringRotate}deg)`
      }
    })

    // Auto-play the sequence
    project.ready.then(() => {
      sheet.sequence.play({ iterationCount: Infinity, range: [0, 4] })
      setIsPlaying(true)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleTogglePlay = () => {
    if (isPlaying) {
      sheet.sequence.pause()
      setIsPlaying(false)
    } else {
      sheet.sequence.play({ iterationCount: Infinity, range: [0, 4] })
      setIsPlaying(true)
    }
  }

  const handleReset = () => {
    sheet.sequence.position = 0
    sheet.sequence.play({ iterationCount: Infinity, range: [0, 4] })
    setIsPlaying(true)
  }

  return (
    <div className="w-full rounded-2xl bg-[#0f172a]/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Clapperboard className="w-3.5 h-3.5" />
            <span>Theatre.js Studio + Runtime</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Timeline & Keyframe Motion</h2>
          <p className="text-xs text-slate-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px]">Alt + \</kbd> to toggle the visual Theatre.js Studio GUI in dev mode.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all cursor-pointer shadow-lg shadow-blue-500/20 active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Play</span>
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer border border-slate-700 active:scale-95"
            title="Reset Timeline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative h-64 sm:h-72 w-full rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        {/* Animated Rotating Geometric Ring */}
        <div
          ref={ringRef}
          className="absolute w-56 h-56 rounded-full border border-dashed border-blue-500/20 pointer-events-none transition-transform duration-75"
        />

        {/* Animated Orbiting Glow */}
        <div
          ref={orbRef}
          className="absolute w-4 h-4 rounded-full bg-cyan-400 blur-sm pointer-events-none transition-transform duration-75"
        />

        {/* Animated Main Card Object */}
        <div
          ref={cardRef}
          className="relative z-10 p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl max-w-xs text-center space-y-3 transition-all duration-75 cursor-pointer select-none"
        >
          <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-white">Interactive Sheet Object</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Properties connected to Theatre.js timeline sequence with live reactivity.
            </p>
          </div>
        </div>
      </div>

      {/* Live Value Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
          <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">translateY</div>
          <div className="text-sm font-mono font-medium text-blue-400">{coords.y}px</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
          <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">scale</div>
          <div className="text-sm font-mono font-medium text-purple-400">{coords.scale}x</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
          <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">rotation</div>
          <div className="text-sm font-mono font-medium text-cyan-400">{coords.rotate}°</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
          <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">glow intensity</div>
          <div className="text-sm font-mono font-medium text-emerald-400">{coords.glow}</div>
        </div>
      </div>
    </div>
  )
}
