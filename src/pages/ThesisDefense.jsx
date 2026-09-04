import React from 'react'
import { CheckCircle2, Clock, AlertCircle, Calendar, MapPin, ClipboardList } from 'lucide-react'

const data = {
  defenseStatus:  'Completed',
  outcome:        'PhD Recommended',
  defenseDate:    '18 June 2026',
  defenseTime:    '10:00 AM',
  venue:          'Research Board Room, DSU Main Campus, Perambalur',
  mode:           'Offline (In-Person)',
  finalDecision:  'Recommended for PhD Award',
  decisionNote:   'Recommended to Vice Chancellor for degree conferment at next Convocation.',
  remark:         'Oral defense completed successfully. The board unanimously recommends the award of Doctor of Philosophy (PhD) to Priya R, Dhanalakshmi Srinivasan University.'
}

// ── Radio option row ──────────────────────────────
const RadioRow = ({ label, active, variant = 'green' }) => {
  const cfg = {
    green: { wrap: 'bg-emerald-50 border-emerald-200 text-emerald-700', dot: 'border-emerald-500 bg-emerald-500', icon: <CheckCircle2 size={12} className="ml-auto text-emerald-600" /> },
    amber: { wrap: 'bg-amber-50  border-amber-200  text-amber-700',  dot: 'border-amber-500  bg-amber-500',  icon: <Clock size={12} className="ml-auto text-amber-500" /> },
    red:   { wrap: 'bg-red-50    border-red-200    text-red-700',    dot: 'border-red-500    bg-red-500',    icon: <AlertCircle size={12} className="ml-auto text-red-500" /> }
  }
  const s = cfg[variant] || cfg.green
  return (
    <div className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-bold
      ${active ? s.wrap : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
      <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0
        ${active ? s.dot : 'border-slate-300'}`}>
        {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>
      {label}
      {active && s.icon}
    </div>
  )
}

export default function ThesisDefense() {
  return (
    <div className="space-y-4 pb-10">

      {/* ── Header ─────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">PhD Stage 9</p>
          <h1 className="text-xl font-black text-slate-900 mt-0.5">Thesis Defense</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Final viva-voce oral examination and PhD award recommendation
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-black text-emerald-700 uppercase tracking-wide">PhD Recommended</span>
        </div>
      </div>

      {/* ── Top 4 stat cards ───────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Defense Status',  value: data.defenseStatus, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          { label: 'Defense Date',    value: data.defenseDate,   color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200'   },
          { label: 'Defense Outcome', value: data.outcome,       color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          { label: 'Final Decision',  value: 'PhD Award',        color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200'   }

        ].map((c, i) => (
          <div key={i} className={`${c.bg} ${c.border} border rounded-xl p-4`}>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">{c.label}</p>
            <p className={`text-sm font-black ${c.color} mt-1 leading-tight`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* ── Main 2-col grid ────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* LEFT — Defense Status + Outcome */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">
            Thesis Defense Status
          </h2>
          <div className="space-y-2 mb-5">
            {[
              { label: 'Scheduled',               active: data.defenseStatus === 'Scheduled',               variant: 'amber' },
              { label: 'In Progress',             active: data.defenseStatus === 'In Progress',             variant: 'amber' },
              { label: 'Completed',               active: data.defenseStatus === 'Completed',               variant: 'green' },
              { label: 'Re-Appearance Required',  active: data.defenseStatus === 'Re-Appearance Required',  variant: 'red'   }
            ].map(opt => <RadioRow key={opt.label} {...opt} />)}
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
              Defense Outcome
            </p>
            <div className="space-y-2">
              {[
                { label: 'PhD Recommended',        active: data.outcome === 'PhD Recommended',        variant: 'green' },
                { label: 'Corrections Required',   active: data.outcome === 'Corrections Required',   variant: 'red'   },
                { label: 'Re-Appearance Required', active: data.outcome === 'Re-Appearance Required', variant: 'red'   }
              ].map(opt => <RadioRow key={opt.label} {...opt} />)}
            </div>
          </div>
        </div>

        {/* RIGHT — Schedule + Final Decision */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">
            Defense Schedule & Venue
          </h2>
          <div className="space-y-3 mb-5">
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-slate-900">{data.defenseDate} · {data.defenseTime}</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{data.mode}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-slate-700">{data.venue}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
              Final Board Decision
            </p>
            <div className="space-y-2">
              {[
                { label: 'Recommended for PhD Award',  active: data.finalDecision === 'Recommended for PhD Award',  variant: 'green' },
                { label: 'Pending Final Approval',     active: data.finalDecision === 'Pending Final Approval',     variant: 'amber' },
                { label: 'Re-Examination Required',    active: data.finalDecision === 'Re-Examination Required',    variant: 'red'   }
              ].map(opt => <RadioRow key={opt.label} {...opt} />)}
            </div>
            <div className="mt-4 flex items-start gap-3 p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-emerald-700 font-semibold leading-relaxed">{data.decisionNote}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Remark (full width) ──────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
          Oral Board Remark
        </h2>
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
          <ClipboardList className="w-4 h-4 text-slate-400 mb-2" />
          <p className="text-xs text-slate-700 leading-relaxed font-medium italic">
            "{data.remark}"
          </p>
        </div>
      </div>

    </div>
  )
}
