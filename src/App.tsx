import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Landmark, Users, GraduationCap, Leaf,
  Shield, Workflow, Layers, LayoutTemplate,
  Play, Check, Cpu, X,
  BarChart3, FileText, Network, Scale, Briefcase, Sparkles,
  Activity, Bell, Menu, User, ChevronDown,
} from 'lucide-react'

const domains = [
  { id: 'economy', icon: Landmark, title: 'Economy', subtitle: 'Governance Management Traceability', accent: '#8b5cf6' },
  { id: 'employment', icon: Users, title: 'Employment', subtitle: 'Information Curation Variety', accent: '#3b82f6' },
  { id: 'ecology', icon: Leaf, title: 'Ecology', subtitle: 'Intelligence Cooperation Integrity', accent: '#10b981' },
  { id: 'education', icon: GraduationCap, title: 'Education', subtitle: 'Inference Interaction Accountability', accent: '#f97316' },
] as const

type DomainId = (typeof domains)[number]['id']
type Step = 1 | 2 | 3
type Domain = (typeof domains)[number]
type Generation = 'idle' | 'running' | 'done'

const STEP_COLORS: Record<Step, string> = {
  1: 'bg-violet-600 shadow-violet-600/25',
  2: 'bg-blue-600 shadow-blue-600/25',
  3: 'bg-emerald-600 shadow-emerald-600/25',
}

const TEMPLATE_ICONS = [BarChart3, FileText, Network, Scale, Briefcase, Sparkles] as const

export default function App() {
  const [domainId, setDomainId] = useState<DomainId>('economy')
  const [step, setStep] = useState<Step>(1)
  const [generation, setGeneration] = useState<Generation>('idle')
  const [expandedId, setExpandedId] = useState<DomainId | null>(null)
  const [showAppSample, setShowAppSample] = useState(false)

  const activeDomain = domains.find((d) => d.id === domainId)!
  const expandedDomain = expandedId ? domains.find((d) => d.id === expandedId)! : null
  const overlayOpen = showAppSample || expandedDomain !== null

  const handleGenerate = () => {
    if (generation === 'running') return
    setGeneration('running')
    setStep(2)
    window.setTimeout(() => {
      setGeneration('done')
      setStep(3)
      window.setTimeout(() => {
        setGeneration('idle')
        setStep(1)
      }, 2800)
    }, 2200)
  }

  const openDomain = (id: DomainId) => {
    setDomainId(id)
    setShowAppSample(false)
    setExpandedId(id)
  }

  const openAppSample = () => {
    setExpandedId(null)
    setStep(1)
    setShowAppSample(true)
  }

  const closeOverlay = () => {
    setExpandedId(null)
    setShowAppSample(false)
  }

  return (
    <div className="h-screen w-screen overflow-hidden ambient-bg text-slate-900 relative">
      {/* Decorative background waves & orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-[640px] h-[640px] rounded-full bg-blue-400/25 blur-[90px]" />
        <div className="absolute top-[20%] -right-32 w-[560px] h-[560px] rounded-full bg-indigo-300/20 blur-[100px]" />
        <div className="absolute -bottom-32 left-[30%] w-[720px] h-[720px] rounded-full bg-sky-300/22 blur-[110px]" />
        <svg className="absolute -top-16 left-0 w-full min-w-[900px] h-[280px] opacity-[0.22]" viewBox="0 0 1200 280" preserveAspectRatio="none">
          <path
            d="M0 160 C 200 100, 400 220, 600 140 S 1000 80, 1200 150 L 1200 0 L 0 0 Z"
            fill="url(#waveTop)"
          />
          <defs>
            <linearGradient id="waveTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#a5b4fc" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute bottom-0 right-0 w-full min-w-[900px] h-[240px] opacity-[0.18]" viewBox="0 0 1200 240" preserveAspectRatio="none">
          <path
            d="M0 80 C 250 160, 450 40, 700 120 S 1050 200, 1200 100 L 1200 240 L 0 240 Z"
            fill="url(#waveBottom)"
          />
          <defs>
            <linearGradient id="waveBottom" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#bfdbfe" />
              <stop offset="50%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#c4b5fd" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Top bar — centered, 12px from top */}
      <header className="absolute top-3 left-1/2 -translate-x-1/2 z-50">
        <div className="glass-strong rounded-full px-3 py-2.5 shadow-glass flex items-center gap-3 min-w-[420px]">
          {/* Client company profile menu */}
          <button
            type="button"
            aria-label="Company profile"
            className="relative w-9 h-9 rounded-full bg-gradient-to-br from-teal-600 to-emerald-700 grid place-items-center shadow-md shrink-0 ring-2 ring-white/80"
          >
            <span className="text-[11px] font-bold text-white tracking-tight leading-none">IG</span>
            <ChevronDown className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-slate-600 bg-white rounded-full p-0.5 shadow-sm" strokeWidth={2.5} />
          </button>

          {/* Brand — centered (platform logo lives in left nav) */}
          <div className="flex-1 text-center px-1 min-w-0">
            <div className="text-[16px] font-semibold tracking-tight leading-none">Democracy Governance</div>
            <div className="text-[13px] text-slate-500 mt-1">AI Applications Platform · Made in Greece</div>
          </div>

          {/* User avatar */}
          <button
            type="button"
            aria-label="User profile"
            className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 grid place-items-center shadow-md shrink-0 ring-2 ring-white/80"
          >
            <User className="w-4 h-4 text-white" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Left rail — vertically centered, 12px from left */}
      <aside className="absolute left-3 top-1/2 -translate-y-1/2 z-40">
        <nav className="glass rounded-full py-3 px-2.5 shadow-glass flex flex-col items-center gap-2" aria-label="Domains">
          {domains.map((d) => {
            const Icon = d.icon
            const active = domainId === d.id
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setShowAppSample(false)
                  setDomainId(d.id)
                }}
                aria-label={d.title}
                aria-current={active ? 'true' : undefined}
                className="relative w-[48px] h-[48px] grid place-items-center rounded-full"
              >
                {active && (
                  <motion.div
                    layoutId="domainActive"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-slate-200/70"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon
                  className={`relative z-10 w-5 h-5 ${active ? 'text-slate-900' : 'text-slate-500'}`}
                  strokeWidth={1.8}
                />
              </button>
            )
          })}

          <div className="w-7 h-px bg-slate-200/80 my-0.5" />

          <button
            type="button"
            aria-label="Template app"
            aria-pressed={showAppSample}
            onClick={openAppSample}
            className="relative w-[48px] h-[48px] grid place-items-center rounded-full"
          >
            {showAppSample && (
              <motion.div
                layoutId="templateActive"
                className="absolute inset-0 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-slate-200/70"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <LayoutTemplate className={`relative z-10 w-5 h-5 ${showAppSample ? 'text-blue-700' : 'text-blue-600'}`} strokeWidth={1.8} />
          </button>
        </nav>
      </aside>

      {/* Center stage + right panel — inset clears left nav (12px + ~72px + 12px gap) */}
      <div className="absolute inset-0 flex min-h-0 pt-[76px] pb-[84px] pl-[96px] z-10">
        <main className="flex-1 min-w-0 flex items-center justify-center px-4 lg:pr-6 relative">
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-700"
            style={{
              background: `radial-gradient(ellipse 560px 440px at 50% 50%, ${activeDomain.accent}28, transparent 68%)`,
            }}
          />

          <div className="relative w-full max-w-[720px] aspect-[16/10] max-h-[min(520px,calc(100vh-220px))]">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-5 lg:gap-6">
              {domains.map((domain) => (
                <DomainCard
                  key={domain.id}
                  domain={domain}
                  active={domainId === domain.id}
                  onSelect={() => openDomain(domain.id)}
                />
              ))}
            </div>
          </div>

          {/* Overlay — domain builder or template app sample */}
          <AnimatePresence>
            {overlayOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center px-4"
                onClick={closeOverlay}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 16 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  className="w-full max-w-[720px] glass-strong rounded-[36px] p-7 lg:p-8 shadow-[0_40px_120px_rgba(0,0,0,0.12)] border border-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  {showAppSample ? (
                    <AppSamplePreview domain={activeDomain} onClose={closeOverlay} />
                  ) : expandedDomain ? (
                    <ExpandedView
                      domain={expandedDomain}
                      step={step}
                      generation={generation}
                      onGenerate={handleGenerate}
                      onClose={closeOverlay}
                    />
                  ) : null}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generation toast */}
          <AnimatePresence>
            {generation !== 'idle' && !overlayOpen && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-[min(420px,calc(100%-2rem))]"
              >
                <div className="glass-strong rounded-2xl px-5 py-3 shadow-glass-lg border border-white/80">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${generation === 'running' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-medium truncate">
                        {generation === 'running'
                          ? `Building ${activeDomain.title} application…`
                          : 'Build complete — ready to deploy'}
                      </div>
                    </div>
                    {generation === 'running' && (
                      <div className="w-14 h-1.5 bg-slate-200 rounded-full overflow-hidden shrink-0">
                        <motion.div
                          className="h-full bg-blue-600 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2.2, ease: 'easeInOut' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Right panel */}
        <aside className="shrink-0 w-[260px] xl:w-[280px] hidden lg:flex flex-col py-4 pr-6 z-40">
          <div className="glass rounded-[28px] p-5 shadow-glass flex-1 min-h-0 flex flex-col">
            <StepPanel step={step} domain={activeDomain} generation={generation} />
          </div>
        </aside>
      </div>

      {/* Bottom dock — centered */}
      <footer className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50">
        <div className="glass-strong rounded-full px-2.5 py-2 shadow-glass-lg flex items-center gap-1.5">
          {([
            { n: 1 as Step, t: 'Choices', d: 'Explore' },
            { n: 2 as Step, t: 'Preparation', d: 'Build' },
            { n: 3 as Step, t: 'Delivery', d: 'Deploy' },
          ]).map((s) => (
            <button
              key={s.n}
              type="button"
              onClick={() => setStep(s.n)}
              className="relative flex items-center gap-2.5 px-4 py-2 rounded-full"
            >
              {step === s.n && (
                <motion.div
                  layoutId="stepHighlight"
                  className={`absolute inset-0 rounded-full shadow-md ${STEP_COLORS[s.n]}`}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={`relative w-7 h-7 rounded-full grid place-items-center text-[13px] font-semibold ${
                  step === s.n ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {step > s.n ? <Check className="w-3.5 h-3.5" /> : s.n}
              </span>
              <span className="relative hidden md:block text-left">
                <span className={`block text-[14px] font-medium leading-none ${step === s.n ? 'text-white' : 'text-slate-800'}`}>
                  {s.t}
                </span>
                <span className={`block text-[13px] mt-0.5 ${step === s.n ? 'text-white/70' : 'text-slate-500'}`}>
                  {s.d}
                </span>
              </span>
            </button>
          ))}

          <div className="w-px h-9 bg-slate-200/80 mx-1.5" />

          <button
            type="button"
            onClick={handleGenerate}
            disabled={generation === 'running'}
            className="px-5 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[14px] font-medium shadow-[0_4px_16px_rgba(59,130,246,0.35)] flex items-center gap-2 disabled:opacity-60"
          >
            <Play className="w-3.5 h-3.5" />
            {generation === 'running' ? 'Generating…' : 'Generate'}
          </button>
        </div>
      </footer>
    </div>
  )
}

function DomainCard({
  domain,
  active,
  onSelect,
}: {
  domain: Domain
  active: boolean
  onSelect: () => void
}) {
  const Icon = domain.icon

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={`${domain.title} — ${domain.subtitle}`}
      aria-pressed={active}
      className="relative text-left min-h-0 cursor-pointer"
      animate={{
        scale: active ? 1 : 0.96,
        opacity: active ? 1 : 0.72,
      }}
      whileHover={{ scale: active ? 1.01 : 0.98, opacity: 0.9 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
    >
      <div className={`absolute inset-0 rounded-[32px] ${active ? 'shadow-float' : 'shadow-glass-lg'}`} />
      <div
        className={`relative h-full glass-strong rounded-[32px] p-5 flex flex-col overflow-hidden ${
          active ? 'border-white' : 'border-white/60'
        }`}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${domain.accent}, transparent 65%)` }}
        />

        <div className="relative flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-slate-100 grid place-items-center shrink-0">
            <Icon className="w-5 h-5" style={{ color: domain.accent }} strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[18px] font-semibold leading-tight tracking-tight">{domain.title}</h3>
            <p className="text-[13px] text-slate-600 mt-1 leading-snug line-clamp-2">{domain.subtitle}</p>
          </div>
        </div>

        <div className="relative mt-auto pt-4">
          {domain.id === 'economy' && <EconomyPreview accent={domain.accent} active={active} />}
          {domain.id === 'employment' && <EmploymentPreview accent={domain.accent} active={active} />}
          {domain.id === 'ecology' && <EcologyPreview accent={domain.accent} active={active} />}
          {domain.id === 'education' && <EducationPreview accent={domain.accent} active={active} />}
        </div>
      </div>
    </motion.button>
  )
}

function AppSamplePreview({ domain, onClose }: { domain: Domain; onClose: () => void }) {
  const DomainIcon = domain.icon

  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 grid place-items-center">
            <LayoutTemplate className="w-5 h-5 text-blue-600" strokeWidth={1.75} />
          </div>
          <div>
            <h2 className="text-[22px] font-semibold tracking-tight leading-none">Sample App Preview</h2>
            <p className="text-[14px] text-slate-600 mt-1">{domain.title} template · live prototype</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center transition-colors"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      {/* Mini app window */}
      <div className="rounded-[24px] border border-slate-200/80 overflow-hidden bg-white/90 shadow-inner">
        <div className="h-10 border-b border-slate-200/70 flex items-center px-4 gap-2 bg-slate-50/80">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
          </div>
          <span className="flex-1 text-center text-[13px] font-medium text-slate-700">Governance Portal</span>
          <Bell className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <div className="flex h-[300px]">
          {/* App sidebar */}
          <div className="w-14 border-r border-slate-200/70 py-4 flex flex-col items-center gap-3 bg-slate-50/50">
            <div className="w-8 h-8 rounded-xl grid place-items-center" style={{ backgroundColor: `${domain.accent}18` }}>
              <DomainIcon className="w-4 h-4" style={{ color: domain.accent }} strokeWidth={1.75} />
            </div>
            {[Menu, Shield, Activity, Users].map((Icon, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-lg grid place-items-center ${i === 0 ? 'bg-white shadow-sm border border-slate-200/60' : ''}`}
              >
                <Icon className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.75} />
              </div>
            ))}
          </div>

          {/* App main */}
          <div className="flex-1 p-4 flex flex-col gap-3 min-w-0">
            <div className="grid grid-cols-3 gap-2">
              {['Overview', 'Activity', 'Status'].map((label, i) => (
                <div
                  key={label}
                  className="h-14 rounded-xl border border-slate-200/60 p-2.5 flex flex-col justify-between"
                  style={{ backgroundColor: i === 0 ? `${domain.accent}10` : 'rgba(255,255,255,0.8)' }}
                >
                  <span className="text-[11px] text-slate-500">{label}</span>
                  <div className="h-2 rounded-full" style={{ backgroundColor: `${domain.accent}${i === 0 ? '50' : '25'}`, width: `${60 + i * 15}%` }} />
                </div>
              ))}
            </div>

            <div className="flex-1 rounded-xl border border-slate-200/60 p-3 bg-gradient-to-b from-white to-slate-50/80 min-h-[100px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium text-slate-700">Governance flow</span>
                <Activity className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <svg viewBox="0 0 400 80" className="w-full h-[72px]">
                <path
                  d="M0 55 C 50 48, 100 62, 150 40 S 250 28, 300 45 S 360 35, 400 30"
                  fill="none"
                  stroke={domain.accent}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <path
                  d="M0 65 C 50 60, 100 68, 150 55 S 250 48, 300 58 S 360 52, 400 48"
                  fill="none"
                  stroke={domain.accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 rounded-lg border border-slate-200/50 flex items-center gap-2 px-2.5"
                  style={{ backgroundColor: i % 2 === 0 ? `${domain.accent}08` : 'white' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: domain.accent }} />
                  <span className="h-2 flex-1 rounded-full bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[13px] text-slate-500 text-center">
        Abstract preview of a deployed {domain.title.toLowerCase()} application
      </p>
    </div>
  )
}

function ExpandedView({
  domain,
  step,
  generation,
  onGenerate,
  onClose,
}: {
  domain: Domain
  step: Step
  generation: Generation
  onGenerate: () => void
  onClose: () => void
}) {
  const Icon = domain.icon

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-slate-100 grid place-items-center">
            <Icon className="w-6 h-6" style={{ color: domain.accent }} strokeWidth={1.75} />
          </div>
          <div>
            <h2 className="text-[24px] font-semibold tracking-tight leading-none">{domain.title} AI App</h2>
            <p className="text-[14px] text-slate-600 mt-1">{domain.subtitle}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center transition-colors"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Templates', icon: Layers },
          { label: 'Human Specialist', icon: Users },
          { label: 'No-Code Builder', icon: Cpu },
        ].map(({ label, icon: TileIcon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="h-[100px] rounded-[22px] bg-gradient-to-b from-white to-slate-50 border border-slate-200/60 p-4 flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-xl grid place-items-center" style={{ backgroundColor: `${domain.accent}15` }}>
              <TileIcon className="w-4 h-4" style={{ color: domain.accent }} />
            </div>
            <span className="text-[13px] font-medium text-slate-800">{label}</span>
          </motion.div>
        ))}
      </div>

      <div className="rounded-[24px] bg-slate-950 text-white p-5 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />
        <div className="relative flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[13px] font-medium">AI App Generation — Step {step}/3</span>
          </div>
        </div>

        <div className="relative font-mono text-[13px] leading-relaxed text-white/80 h-[72px]">
          <AnimatePresence mode="wait">
            {generation === 'running' ? (
              <motion.div key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="text-emerald-400">$ initializing {domain.id} module…</div>
                <div>› connecting APIs · governance layer…</div>
                <motion.div
                  className="h-[2px] bg-emerald-400/50 mt-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.2 }}
                />
              </motion.div>
            ) : generation === 'done' ? (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-emerald-400">✓ Build complete</div>
                <div>› deployed to cloud · source code ready</div>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-white/50">Select a template and run the prototype</div>
                <div>› ready for {domain.title.toLowerCase()} workflows</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative mt-4 flex gap-2">
          <button
            type="button"
            onClick={onGenerate}
            disabled={generation === 'running'}
            className="px-4 h-9 rounded-xl bg-white text-slate-900 text-[13px] font-medium hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            Run Prototype
          </button>
        </div>
      </div>
    </div>
  )
}

function StepPanel({ step, domain, generation }: { step: Step; domain: Domain; generation: Generation }) {
  const meta = {
    1: { title: 'Explore', desc: 'Choose a template for your domain', icon: Layers },
    2: { title: 'Customize', desc: 'AI assembles modules with human oversight', icon: Workflow },
    3: { title: 'Launch', desc: 'One-click deploy with governance built in', icon: Shield },
  }[step]

  const Icon = meta.icon

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl grid place-items-center" style={{ backgroundColor: `${domain.accent}15` }}>
          <Icon className="w-5 h-5" style={{ color: domain.accent }} strokeWidth={1.75} />
        </div>
        <div>
          <div className="text-[15px] font-semibold leading-none">{meta.title}</div>
          <div className="text-[13px] text-slate-600 mt-1">{domain.title}</div>
        </div>
      </div>

      <p className="text-[14px] leading-relaxed text-slate-700">{meta.desc}</p>

      <div className="mt-5 flex-1 min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${step}-${domain.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            {step === 1 && (
              <div className="grid grid-cols-3 gap-2 h-full content-start">
                {TEMPLATE_ICONS.map((TemplateIcon, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className="aspect-square rounded-xl grid place-items-center"
                    style={{ backgroundColor: `${domain.accent}14`, border: `1px solid ${domain.accent}28` }}
                  >
                    <TemplateIcon
                      className="w-5 h-5"
                      style={{ color: domain.accent, opacity: 0.7 }}
                      strokeWidth={1.75}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-2">
                {['Data layer', 'Governance', 'Interface'].map((label) => (
                  <div
                    key={label}
                    className="h-9 rounded-xl bg-white/70 border border-slate-200/60 flex items-center px-3 gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: domain.accent }} />
                    <span className="text-[13px] text-slate-700">{label}</span>
                  </div>
                ))}
                {generation === 'running' && (
                  <div className="text-[13px] text-amber-600 pt-1 animate-pulse">Assembling modules…</div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-200 grid place-items-center">
                  <Check className="w-7 h-7 text-emerald-600" strokeWidth={2.5} />
                </div>
                <div className="flex gap-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-2 rounded-full bg-emerald-200/80" />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pt-4 mt-auto border-t border-slate-200/60 space-y-2.5">
        {['Human specialist', 'No-code builder', 'Safe deployment'].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span className="text-[13px] text-slate-600">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EconomyPreview({ accent, active }: { accent: string; active: boolean }) {
  return (
    <div className="flex items-end gap-1 h-[48px]">
      {[40, 68, 52, 75, 60, 82, 70].map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md"
          style={{ backgroundColor: accent }}
          initial={{ height: 0 }}
          animate={{ height: `${h}%`, opacity: active ? 0.75 : 0.35 }}
          transition={{ delay: i * 0.04, duration: 0.5 }}
        />
      ))}
    </div>
  )
}

function EmploymentPreview({ accent, active }: { accent: string; active: boolean }) {
  return (
    <div className="h-[48px]">
      <svg viewBox="0 0 300 48" className="w-full h-full overflow-visible">
        <motion.path
          d="M0 30 C 60 26, 120 34, 180 20 S 240 12, 300 24"
          fill="none"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: active ? 0.9 : 0.45 }}
          transition={{ duration: 1.1 }}
        />
        <motion.path
          d="M0 38 C 60 35, 120 40, 180 30 S 240 26, 300 34"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          opacity={active ? 0.5 : 0.25}
        />
      </svg>
    </div>
  )
}

function EcologyPreview({ accent, active }: { accent: string; active: boolean }) {
  return (
    <div className="h-[48px] flex items-center gap-1.5">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-8 h-8 rounded-xl"
          style={{ backgroundColor: `${accent}12`, border: `1.5px solid ${accent}28` }}
          animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ delay: i * 0.15, duration: 2, repeat: Infinity }}
        >
          <div className="w-full h-full grid place-items-center">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent, opacity: active ? 1 : 0.55 }} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function EducationPreview({ accent, active }: { accent: string; active: boolean }) {
  return (
    <div className="h-[48px] grid grid-cols-6 gap-1.5">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="rounded-md"
          style={{ backgroundColor: `${accent}${i % 3 === 0 ? '30' : '15'}` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0.55 }}
          transition={{ delay: i * 0.02 }}
        />
      ))}
    </div>
  )
}
