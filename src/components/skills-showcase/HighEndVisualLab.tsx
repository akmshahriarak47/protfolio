import React, { useState } from 'react'
import { Sparkles, ShieldCheck, TrendingUp, Cpu, Crown, Eye, CheckCircle2, ArrowUpRight } from 'lucide-react'

export function HighEndVisualLab() {
  const [activePreset, setActivePreset] = useState<'obsidian' | 'cyberpunk' | 'luxury'>('obsidian')

  const presets = {
    obsidian: {
      bg: 'from-slate-950 via-[#0b1329] to-slate-900',
      border: 'border-cyan-500/30',
      accent: 'text-cyan-400',
      glow: 'shadow-cyan-500/10',
      badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
    },
    cyberpunk: {
      bg: 'from-[#180828] via-[#0d1124] to-[#1a0b2e]',
      border: 'border-fuchsia-500/30',
      accent: 'text-fuchsia-400',
      glow: 'shadow-fuchsia-500/10',
      badge: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30'
    },
    luxury: {
      bg: 'from-[#1a1500] via-[#120f04] to-[#1f1a05]',
      border: 'border-amber-500/30',
      accent: 'text-amber-400',
      glow: 'shadow-amber-500/10',
      badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
    }
  }

  const p = presets[activePreset]

  return (
    <div className="space-y-6">
      {/* Skill Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-base">ui-ux-pro-max & high-end-visual-design</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">Agency-Grade Aesthetic Token Engine</span>
            </div>
            <p className="text-xs text-slate-400">Micro-typography, calibrated contrast ratios, glassmorphism, and anti-slop design heuristics</p>
          </div>
        </div>

        {/* Preset Switcher */}
        <div className="flex gap-1.5 p-1 rounded-lg bg-slate-900 border border-slate-800">
          {(['obsidian', 'cyberpunk', 'luxury'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActivePreset(mode)}
              className={`px-2.5 py-1 text-xs font-semibold rounded capitalize transition-all cursor-pointer ${
                activePreset === mode
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid High-End Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Main Hero Card */}
        <div className={`md:col-span-2 p-6 md:p-8 rounded-3xl bg-gradient-to-br ${p.bg} border ${p.border} shadow-2xl ${p.glow} backdrop-blur-xl relative overflow-hidden flex flex-col justify-between`}>
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${p.badge}`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Generic AI Patterns</span>
              </span>
              <span className="text-xs font-mono text-slate-400">AA / AAA Contrast Pass</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Curated Optical Balance & Subtle Atmospheric Depth
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
              Engineered with custom HSL token architecture, multi-layered elevation shadows, and sub-pixel typography scaling.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs font-mono text-slate-400">Interaction Latency</div>
              <div className={`text-xl font-bold font-mono ${p.accent}`}>&lt;16.6ms</div>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">Lighthouse A11y</div>
              <div className="text-xl font-bold font-mono text-emerald-400">100 / 100</div>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">Color System</div>
              <div className="text-xl font-bold font-mono text-white">OKLCH Tokens</div>
            </div>
          </div>
        </div>

        {/* Side Feature Bento 1 */}
        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl backdrop-blur-md space-y-3 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Verified</span>
            </div>
            <h4 className="text-sm font-bold text-white">Micro-Interactions</h4>
            <p className="text-xs text-slate-400">Tactile haptic feedback emulation with spring physics damping.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl backdrop-blur-md space-y-3 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">60 FPS</span>
            </div>
            <h4 className="text-sm font-bold text-white">Non-Destructive Elevation</h4>
            <p className="text-xs text-slate-400">Layered ambient drop-shadows calibrated for dark surface readability.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
