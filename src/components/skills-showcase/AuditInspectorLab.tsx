import React, { useState } from 'react'
import { CheckCircle2, AlertTriangle, Play, ShieldAlert, Cpu, Terminal, RefreshCw, BarChart2 } from 'lucide-react'

export function AuditInspectorLab() {
  const [isRunningTest, setIsRunningTest] = useState(false)
  const [auditPassed, setAuditPassed] = useState(true)

  const runSimulatedPlaywrightTest = () => {
    setIsRunningTest(true)
    setTimeout(() => {
      setIsRunningTest(false)
      setAuditPassed(true)
    }, 1200)
  }

  const checks = [
    { rule: 'Color Contrast (WCAG 2.1 AA)', status: 'Pass', score: '7.8:1 Ratio', desc: 'All text meets minimum 4.5:1 requirement' },
    { rule: 'Keyboard Focus Trapping', status: 'Pass', score: '100%', desc: 'Modal dialogs trap Tab & Shift+Tab focus correctly' },
    { rule: 'ARIA Landmarks & Labels', status: 'Pass', score: '100%', desc: 'All interactive elements have descriptive screen-reader labels' },
    { rule: 'Layout Stability (CLS)', status: 'Pass', score: '0.002', desc: 'No content jumping or cumulative layout shift during animations' },
    { rule: 'First Input Delay (INP)', status: 'Pass', score: '12ms', desc: 'Zero main-thread blocking during complex gesture tracking' }
  ]

  return (
    <div className="space-y-6">
      {/* Skill Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-teal-950/30 border border-teal-500/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-base">web-design-guidelines, fixing-accessibility & playwright-cli</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono">Verification Loop</span>
            </div>
            <p className="text-xs text-slate-400">Automated DOM verification, WCAG 2.1 compliance auditing, and Core Web Vitals checks</p>
          </div>
        </div>

        <button
          onClick={runSimulatedPlaywrightTest}
          disabled={isRunningTest}
          className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-teal-400/30 active:scale-95 shadow-md shadow-teal-500/20 disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 ${isRunningTest ? 'animate-spin' : ''}`} />
          <span>{isRunningTest ? 'Running Playwright Check...' : 'Run Automated E2E Audit'}</span>
        </button>
      </div>

      {/* Audit Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-teal-400" />
            <span>Accessibility Score</span>
          </div>
          <div className="text-3xl font-extrabold text-teal-400 font-mono">100 / 100</div>
          <div className="text-[11px] text-slate-400">WCAG Level AAA Compliant</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>Core Web Vitals</span>
          </div>
          <div className="text-3xl font-extrabold text-blue-400 font-mono">100% Good</div>
          <div className="text-[11px] text-slate-400">Zero Jank • 60 FPS compositor</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Playwright E2E Tests</span>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">12 / 12 Passed</div>
          <div className="text-[11px] text-slate-400">0 regressions detected</div>
        </div>
      </div>

      {/* Audit Checklist Table */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">Automated Rules Verification</h4>
        <div className="space-y-2.5">
          {checks.map((c) => (
            <div key={c.rule} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="text-xs font-semibold text-white">{c.rule}</span>
                </div>
                <div className="text-[11px] text-slate-400 pl-5.5">{c.desc}</div>
              </div>
              <div className="self-start sm:self-center font-mono text-xs text-teal-300 bg-teal-950/60 px-2.5 py-1 rounded-md border border-teal-800/50">
                {c.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
