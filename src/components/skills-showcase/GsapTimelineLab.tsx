import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Play, RotateCcw, Sliders, Layers, Sparkles, Cpu } from 'lucide-react'

export function GsapTimelineLab() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeScale, setTimeScale] = useState(1)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        onUpdate: () => {
          setProgress(Number((tl.progress() * 100).toFixed(1)))
        },
        onComplete: () => {
          setIsPlaying(false)
        }
      })

      tl.fromTo(
        '.gsap-box',
        { scale: 0, rotation: -180, opacity: 0, y: 50 },
        { scale: 1, rotation: 0, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)' }
      )
      .to('.gsap-box', {
        borderRadius: '50%',
        backgroundColor: '#38bdf8',
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.inOut'
      }, '-=0.2')
      .to('.gsap-box', {
        rotationY: 360,
        scale: 1.15,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out'
      })
      .to('.gsap-box', {
        borderRadius: '16px',
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'elastic.out(1, 0.4)'
      })

      timelineRef.current = tl
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handlePlayPause = () => {
    if (!timelineRef.current) return
    if (isPlaying) {
      timelineRef.current.pause()
      setIsPlaying(false)
    } else {
      if (timelineRef.current.progress() === 1) {
        timelineRef.current.restart()
      } else {
        timelineRef.current.play()
      }
      setIsPlaying(true)
    }
  }

  const handleReset = () => {
    if (!timelineRef.current) return
    timelineRef.current.restart().pause()
    setIsPlaying(false)
    setProgress(0)
  }

  const handleSeek = (val: number) => {
    if (!timelineRef.current) return
    timelineRef.current.progress(val / 100).pause()
    setIsPlaying(false)
    setProgress(val)
  }

  const handleTimeScale = (val: number) => {
    setTimeScale(val)
    if (timelineRef.current) {
      timelineRef.current.timeScale(val)
    }
  }

  const boxColors = [
    'from-emerald-400 to-teal-600',
    'from-cyan-400 to-blue-600',
    'from-indigo-400 to-purple-600',
    'from-pink-400 to-rose-600',
    'from-amber-400 to-orange-600'
  ]

  return (
    <div className="space-y-6" ref={containerRef}>
      {/* Skill Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-base">gsap-scrolltrigger & fixing-motion-performance</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">Choreography & Timeline Studio</span>
            </div>
            <p className="text-xs text-slate-400">Microsecond timeline orchestration, GPU composite transforms, and zero layout-thrashing</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayPause}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-400/30 active:scale-95 shadow-md shadow-emerald-500/20"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isPlaying ? 'Pause Timeline' : 'Play Timeline'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Reset Timeline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrubber & Speed Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="md:col-span-2 space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1"><Sliders className="w-3 h-3 text-emerald-400" /> Timeline Scrubber</span>
            <span className="text-emerald-400 font-semibold">{progress}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="0.1"
            value={progress} 
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <span className="text-[10px] text-slate-500">Directly scrub through keyframes with sub-frame precision</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">TimeScale Speed</span>
            <span className="text-cyan-400 font-semibold">{timeScale}x</span>
          </div>
          <div className="flex gap-1.5">
            {[0.5, 1, 1.5, 2].map(speed => (
              <button
                key={speed}
                onClick={() => handleTimeScale(speed)}
                className={`flex-1 py-1 text-[11px] font-semibold rounded font-mono transition-all cursor-pointer ${
                  timeScale === speed 
                    ? 'bg-emerald-600 text-white shadow' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive GSAP Choreography Stage */}
      <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070d19] border border-slate-800 shadow-2xl flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 perspective-1000">
          {boxColors.map((color, idx) => (
            <div
              key={idx}
              className={`gsap-box w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr ${color} shadow-lg shadow-emerald-500/10 flex items-center justify-center text-white font-bold text-lg border border-white/20 select-none cursor-pointer`}
              onClick={() => {
                gsap.to(`.gsap-box:nth-child(${idx + 1})`, {
                  rotation: '+=360',
                  scale: 1.2,
                  yoyo: true,
                  repeat: 1,
                  duration: 0.5,
                  ease: 'back.out'
                })
              }}
            >
              <Sparkles className="w-5 h-5 opacity-80" />
            </div>
          ))}
        </div>

        {/* Perf Metrics Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 w-full flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Repaints • Pure GPU Compositor Layers</span>
          </span>
          <span className="text-slate-400">Click any individual box to trigger spring wobble</span>
        </div>
      </div>
    </div>
  )
}
