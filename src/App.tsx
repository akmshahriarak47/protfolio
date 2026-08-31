import { useState } from 'react'
import ParticleButton from "@/components/kokonutui/particle-button"
import { Map } from "@/components/ui/map"
import { TheatreDemo } from "@/components/theatre-demo"
import { Sparkles, Terminal, Copy, Check, ExternalLink, Compass, Film, Layers } from "lucide-react"

export default function App() {
  const [copied, setCopied] = useState<string | null>(null)
  const [clickCount, setClickCount] = useState(0)
  const [activeTab, setActiveTab] = useState<'theatre' | 'map' | 'kokonut'>('theatre')

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const sampleCommands = [
    { id: "theatre", cmd: "npm install @theatre/core @theatre/studio", desc: "Theatre.js motion design & animation studio" },
    { id: "map", cmd: "npx shadcn@latest add @eldoraui/map", desc: "Interactive global animated map with avatar markers" },
    { id: "radix", cmd: "npm install @radix-ui/themes", desc: "Radix Themes UI library & accessible design system" },
    { id: "particle", cmd: "npx shadcn@latest add @kokonutui/particle-button", desc: "Interactive particle burst button" }
  ]

  return (
    <div className="min-h-screen bg-[#070d19] text-[#dae2fd] p-4 sm:p-8 md:p-12 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131f37] border border-[#1e293b] text-xs font-medium text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Theatre.js + Eldora UI + Kokonut UI + Radix</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Motion & UI Component Studio
          </h1>
          <p className="text-[#94a3b8] text-sm md:text-base max-w-xl mx-auto">
            Interactive playground with cinematic keyframe animations, map markers, and high-performance design primitives.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-xl bg-[#0f172a] border border-[#1e293b] max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('theatre')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'theatre'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Theatre.js</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Eldora Map</span>
          </button>
          <button
            onClick={() => setActiveTab('kokonut')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'kokonut'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Kokonut UI</span>
          </button>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'theatre' && (
          <TheatreDemo />
        )}

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

        {/* Command Reference */}
        <div className="p-6 rounded-2xl bg-[#0f172a]/70 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>Installed Packages & CLI Helpers</span>
          </div>

          <div className="space-y-2.5">
            {sampleCommands.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-[#070d19] border border-slate-800 gap-2">
                <div className="space-y-0.5">
                  <div className="font-mono text-xs text-blue-300 select-all">{item.cmd}</div>
                  <div className="text-xs text-slate-400">{item.desc}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(item.cmd, item.id)}
                  className="self-start sm:self-center p-2 rounded-lg bg-[#131f37] hover:bg-slate-700 text-[#dae2fd] text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700 active:scale-95"
                >
                  {copied === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-2 pb-6">
          <span>Theatre.js Studio shortcut: <code className="text-blue-400">Alt + \</code></span>
          <a 
            href="https://www.theatrejs.com/docs/latest" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>Theatre.js Documentation</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  )
}
