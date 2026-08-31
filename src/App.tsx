import { useState } from 'react'
import { 
  Sparkles, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Compass, 
  Film, 
  Layers, 
  Zap, 
  Palette, 
  Crown, 
  Box, 
  CheckCircle2,
  Code2,
  Cpu
} from "lucide-react"

import { MotionPhysicsLab } from "@/components/skills-showcase/MotionPhysicsLab"
import { GenerativeCanvasLab } from "@/components/skills-showcase/GenerativeCanvasLab"
import { GsapTimelineLab } from "@/components/skills-showcase/GsapTimelineLab"
import { HighEndVisualLab } from "@/components/skills-showcase/HighEndVisualLab"
import { ShadcnSystemLab } from "@/components/skills-showcase/ShadcnSystemLab"
import { AuditInspectorLab } from "@/components/skills-showcase/AuditInspectorLab"

import ParticleButton from "@/components/kokonutui/particle-button"
import { Map } from "@/components/ui/map"
import { TheatreDemo } from "@/components/theatre-demo"

export default function App() {
  const [copied, setCopied] = useState<string | null>(null)
  const [clickCount, setClickCount] = useState(0)
  const [activeTab, setActiveTab] = useState<
    'motion' | 'canvas' | 'gsap' | 'visual' | 'shadcn' | 'audit' | 'theatre' | 'map' | 'kokonut'
  >('motion')

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const skillTabs = [
    { id: 'motion', label: 'Motion Physics', icon: Zap, skillName: 'motion-framer', color: 'text-blue-400' },
    { id: 'canvas', label: 'Generative Canvas', icon: Palette, skillName: 'canvas-design', color: 'text-purple-400' },
    { id: 'gsap', label: 'GSAP Timelines', icon: Layers, skillName: 'gsap-scrolltrigger', color: 'text-emerald-400' },
    { id: 'visual', label: 'Aesthetic Tokens', icon: Crown, skillName: 'ui-ux-pro-max', color: 'text-amber-400' },
    { id: 'shadcn', label: 'Shadcn Primitives', icon: Box, skillName: 'shadcn-ui', color: 'text-sky-400' },
    { id: 'audit', label: 'E2E & A11y Audit', icon: CheckCircle2, skillName: 'playwright-cli', color: 'text-teal-400' },
  ]

  const legacyTabs = [
    { id: 'theatre', label: 'Theatre.js', icon: Film },
    { id: 'map', label: 'Eldora Map', icon: Compass },
    { id: 'kokonut', label: 'Kokonut UI', icon: Layers }
  ]

  return (
    <div className="min-h-screen bg-[#070d19] text-[#dae2fd] p-4 sm:p-8 md:p-12 flex flex-col items-center selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131f37] border border-blue-500/20 text-xs font-medium text-blue-400 shadow-lg shadow-blue-500/10">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Skills Studio • High-Performance Web Stack</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Live Skill Capability Canvas
          </h1>
          <p className="text-[#94a3b8] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Test and interact with real-time implementations powered individually by each specialized agent skill.
          </p>
        </div>

        {/* Skill Category Switcher */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 text-center font-semibold">
            Active Core Skills Explorer
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#0f172a]/90 border border-slate-800 shadow-xl max-w-4xl mx-auto">
            {skillTabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-3 sm:px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer select-none ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-100'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Legacy Playground Shortcuts */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="text-[11px] text-slate-500 font-mono">Demos:</span>
            {legacyTabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-700 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800/80'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dynamic Skill Canvas Workspaces */}
        <div className="min-h-[420px]">
          {activeTab === 'motion' && <MotionPhysicsLab />}
          {activeTab === 'canvas' && <GenerativeCanvasLab />}
          {activeTab === 'gsap' && <GsapTimelineLab />}
          {activeTab === 'visual' && <HighEndVisualLab />}
          {activeTab === 'shadcn' && <ShadcnSystemLab />}
          {activeTab === 'audit' && <AuditInspectorLab />}

          {activeTab === 'theatre' && <TheatreDemo />}

          {activeTab === 'map' && (
            <div className="p-6 md:p-8 rounded-2xl bg-[#0f172a]/90 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Eldora UI Component</span>
                  <h2 className="text-xl font-bold text-white">Interactive World Map</h2>
                  <p className="text-xs text-slate-400">Hover over the map to trigger avatar marker animations</p>
                </div>
              </div>
              <div className="relative w-full h-[400px] overflow-hidden rounded-xl border border-slate-800 bg-[#020617] flex items-center justify-center">
                <Map />
              </div>
            </div>
          )}

          {activeTab === 'kokonut' && (
            <div className="p-8 rounded-2xl bg-[#0f172a]/90 border border-slate-800 shadow-2xl flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Kokonut UI</span>
                <h2 className="text-xl font-bold text-white">Particle Burst Button</h2>
                <p className="text-sm text-slate-400">Click to trigger dynamic particle bursts</p>
              </div>

              <div className="py-4">
                <ParticleButton 
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg shadow-lg shadow-blue-500/20"
                  onSuccess={() => setClickCount(c => c + 1)}
                >
                  Trigger Burst ({clickCount})
                </ParticleButton>
              </div>

              <p className="text-xs text-slate-500 font-mono">
                Imported from <span className="text-blue-400">@/components/kokonutui/particle-button</span>
              </p>
            </div>
          )}
        </div>

        {/* Skill Command & Verification Reference */}
        <div className="p-6 rounded-2xl bg-[#0f172a]/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>Active Agent Skills Inventory</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/20">
              28 Active • Zero Bloat
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { name: 'motion-framer', desc: 'Gesture physics & layout FLIP transitions', cat: 'Motion' },
              { name: 'canvas-design', desc: 'Interactive HTML5 Canvas & WebGL particles', cat: 'Canvas' },
              { name: 'gsap-scrolltrigger', desc: 'Sub-frame timeline sequence choreography', cat: 'Choreography' },
              { name: 'ui-ux-pro-max', desc: 'Agency design heuristics & OKLCH tokens', cat: 'Design' },
              { name: 'shadcn-ui', desc: 'Accessible Radix UI polymorphic components', cat: 'Primitives' },
              { name: 'playwright-cli', desc: 'Automated visual regression & a11y testing', cat: 'Verification' }
            ].map((s) => (
              <div key={s.name} className="p-3 rounded-xl bg-[#070d19] border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs text-blue-300 font-semibold">{s.name}</div>
                  <span className="text-[10px] text-slate-500 font-mono">{s.cat}</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-snug">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 px-2 pb-6 border-t border-slate-800/60 pt-4">
          <span>Temporary Draft Canvas • Ready to be replaced by your main project plan anytime</span>
          <span className="font-mono text-blue-400">Vite 6 + React 19 + Tailwind v4</span>
        </div>

      </div>
    </div>
  )
}
