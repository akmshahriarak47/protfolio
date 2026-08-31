import React, { useState } from 'react'
import { Layers, Search, Check, Copy, Sliders, ToggleLeft, ToggleRight, Sparkles, Box } from 'lucide-react'

export function ShadcnSystemLab() {
  const [copied, setCopied] = useState(false)
  const [toggleState, setToggleState] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')

  const components = [
    { name: 'Button', category: 'Primitive', desc: 'Accessible CVA polymorphic action trigger', tag: 'Primitives' },
    { name: 'Dialog', category: 'Overlay', desc: 'Focus-trapped accessible modal with portal mounting', tag: 'Overlays' },
    { name: 'Dropdown Menu', category: 'Menu', desc: 'Keyboard-navigable contextual item container', tag: 'Menus' },
    { name: 'Command', category: 'Search', desc: 'Fast fuzzy search & combobox item selector', tag: 'Search' },
    { name: 'Accordion', category: 'Layout', desc: 'Smooth height-animated collapsible disclosure', tag: 'Layout' },
    { name: 'Tooltip', category: 'Feedback', desc: 'Collision-aware floating helper anchored tag', tag: 'Feedback' }
  ]

  const filtered = components.filter(c => {
    const matchesTag = selectedTag === 'All' || c.tag === selectedTag
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  const copyConfig = () => {
    navigator.clipboard.writeText(`npx shadcn@latest add button dialog dropdown-menu command tooltip`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Skill Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-sky-950/30 border border-sky-500/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-base">shadcn-ui & baseline-ui</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono">Accessible Primitives</span>
            </div>
            <p className="text-xs text-slate-400">WAI-ARIA compliant Radix components, Class Variance Authority, and zero runtime overhead</p>
          </div>
        </div>

        <button
          onClick={copyConfig}
          className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-sky-400/30 active:scale-95 shadow-md shadow-sky-500/20"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'CLI Copied!' : 'Copy Shadcn CLI'}</span>
        </button>
      </div>

      {/* Interactive Primitives Stage */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        {/* Search & Tag Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Primitives', 'Overlays', 'Menus', 'Search'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedTag === tag
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {filtered.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-sky-500/40 transition-all group cursor-pointer space-y-2 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">{item.name}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">{item.category}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Live Accessible Switch Demo */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setToggleState(!toggleState)}
              className="text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
            >
              {toggleState ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-600" />}
            </button>
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-white">Interactive Keyboard Focus State</div>
              <div className="text-[11px] text-slate-400">ARIA compliant: aria-checked="{toggleState ? 'true' : 'false'}"</div>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-500">
            Radix UI Primitives • 100% Type-Safe
          </div>
        </div>
      </div>
    </div>
  )
}
