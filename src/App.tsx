import { useState } from 'react'
import ParticleButton from "@/components/kokonutui/particle-button"
import { Sparkles, Terminal, Copy, Check, ExternalLink } from "lucide-react"

export default function App() {
  const [copied, setCopied] = useState<string | null>(null)
  const [clickCount, setClickCount] = useState(0)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const sampleCommands = [
    { id: "particle", cmd: "npx shadcn@latest add @kokonutui/particle-button", desc: "Interactive button with particle burst effect" },
    { id: "card", cmd: "npx shadcn@latest add @kokonutui/card-01", desc: "Sleek 3D / Hover interactive card" },
    { id: "input", cmd: "npx shadcn@latest add @kokonutui/input-01", desc: "Animated input with floating glow effect" },
    { id: "matrix", cmd: "npx shadcn@latest add @kokonutui/matrix-text", desc: "Cyberpunk matrix decoding text effect" }
  ]

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131f37] border border-[#1e293b] text-xs font-medium text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kokonut UI + shadcn/ui configured</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Kokonut UI Setup Ready
          </h1>
          <p className="text-[#94a3b8] text-base max-w-xl mx-auto">
            Your Vite + React + Tailwind CSS project is configured with the <code className="text-blue-400 bg-[#131f37] px-1.5 py-0.5 rounded text-sm">@kokonutui</code> registry in <code className="text-blue-400 bg-[#131f37] px-1.5 py-0.5 rounded text-sm">components.json</code>.
          </p>
        </div>

        {/* Live Demo Showcase */}
        <div className="p-8 rounded-2xl bg-[#131f37] border border-[#1e293b] shadow-xl flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#94a3b8] font-semibold">Installed Component Demo</span>
            <h2 className="text-xl font-semibold text-white">Particle Button</h2>
            <p className="text-sm text-[#94a3b8]">Click the button below to trigger the particle burst effect</p>
          </div>

          <div className="py-4">
            <ParticleButton 
              className="bg-[#2665fd] hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg shadow-blue-500/20"
              onSuccess={() => setClickCount(c => c + 1)}
            >
              Trigger Burst ({clickCount})
            </ParticleButton>
          </div>

          <p className="text-xs text-[#94a3b8] font-mono">
            Imported from <span className="text-blue-300">@/components/kokonutui/particle-button</span>
          </p>
        </div>

        {/* Command Reference */}
        <div className="p-6 rounded-2xl bg-[#131f37]/70 border border-[#1e293b] space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>Install More Components via CLI</span>
          </div>

          <div className="space-y-2.5">
            {sampleCommands.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-[#0b1326] border border-[#1e293b] gap-2">
                <div className="space-y-0.5">
                  <div className="font-mono text-xs text-blue-300 select-all">{item.cmd}</div>
                  <div className="text-xs text-[#94a3b8]">{item.desc}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(item.cmd, item.id)}
                  className="self-start sm:self-center p-2 rounded-lg bg-[#131f37] hover:bg-[#1e293b] text-[#dae2fd] text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-[#1e293b]"
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
        <div className="flex items-center justify-between text-xs text-[#94a3b8] px-2">
          <span>Namespace: <code className="text-blue-400">@kokonutui</code></span>
          <a 
            href="https://kokonutui.com/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>KokonutUI Documentation</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  )
}
