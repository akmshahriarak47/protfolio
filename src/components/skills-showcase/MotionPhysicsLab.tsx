import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Zap, RefreshCw, Move, Sparkles, Sliders } from 'lucide-react'

export function MotionPhysicsLab() {
  const [stiffness, setStiffness] = useState(250)
  const [damping, setDamping] = useState(15)
  const [mass, setMass] = useState(1)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [key, setKey] = useState(0)

  const springConfig = {
    type: "spring" as const,
    stiffness: Number(stiffness),
    damping: Number(damping),
    mass: Number(mass)
  }

  const cards = [
    { id: 1, title: "Liquid Inertia", color: "from-cyan-500 to-blue-600", desc: "Drag with real-world momentum & boundary rebound physics" },
    { id: 2, title: "Magnetic Attraction", color: "from-violet-500 to-purple-600", desc: "Smooth cursor pull with elastic spring settling" },
    { id: 3, title: "Layout Morphing", color: "from-emerald-500 to-teal-600", desc: "Shared layout IDs with sub-pixel hardware interpolation" }
  ]

  return (
    <div className="space-y-6">
      {/* Skill Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-base">motion-framer & react-spring-physics</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">Advanced Physics Engine</span>
            </div>
            <p className="text-xs text-slate-400">High-frequency gesture tracking, FLIP layout animations, and harmonic spring mechanics</p>
          </div>
        </div>
        <button
          onClick={() => setKey(k => k + 1)}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700 active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Re-trigger Motion</span>
        </button>
      </div>

      {/* Physics Sliders Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1"><Sliders className="w-3 h-3 text-cyan-400" /> Stiffness</span>
            <span className="text-cyan-400 font-semibold">{stiffness}</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="600" 
            value={stiffness} 
            onChange={(e) => setStiffness(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-[10px] text-slate-500">Controls acceleration & spring tension</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1"><Sliders className="w-3 h-3 text-purple-400" /> Damping</span>
            <span className="text-purple-400 font-semibold">{damping}</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="50" 
            value={damping} 
            onChange={(e) => setDamping(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
          />
          <span className="text-[10px] text-slate-500">Controls friction and oscillation bounce</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1"><Sliders className="w-3 h-3 text-emerald-400" /> Mass</span>
            <span className="text-emerald-400 font-semibold">{mass}</span>
          </div>
          <input 
            type="range" 
            min="0.2" 
            max="5" 
            step="0.1"
            value={mass} 
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <span className="text-[10px] text-slate-500">Controls perceived weight & momentum</span>
        </div>
      </div>

      {/* Interactive Physics Playground */}
      <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            layout
            drag
            dragConstraints={{ top: -40, left: -40, right: 40, bottom: 40 }}
            dragElastic={0.2}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97, cursor: "grabbing" }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ ...springConfig, delay: i * 0.1 }}
            onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
            className={`p-5 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/60 shadow-xl backdrop-blur-md cursor-grab relative overflow-hidden group select-none ${
              selectedCard === card.id ? 'ring-2 ring-blue-500 shadow-blue-500/20' : ''
            }`}
          >
            {/* Top accent badge */}
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-block w-8 h-8 rounded-lg bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-lg`}>
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700 flex items-center gap-1">
                <Move className="w-2.5 h-2.5" /> Drag me
              </span>
            </div>

            <h3 className="text-base font-bold text-white mb-1.5">{card.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{card.desc}</p>

            {/* Expandable layout content */}
            <AnimatePresence>
              {selectedCard === card.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={springConfig}
                  className="pt-3 border-t border-slate-700/60 font-mono text-[11px] text-blue-300 space-y-1"
                >
                  <p>✓ Spring stiffness: {stiffness}</p>
                  <p>✓ Damping ratio: {damping}</p>
                  <p>✓ Momentum damping applied</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>Click to {selectedCard === card.id ? 'collapse' : 'expand'}</span>
              <span className="text-blue-400 font-medium font-mono">FLIP v12</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
