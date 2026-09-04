import React from 'react'
import { CheckCircle2, Clock, AlertCircle, ClipboardList } from 'lucide-react'

const data = {
  evaluationStatus:  'Evaluation In Progress',
  outcome:           'Recommended for Oral Defense',
  examinerReport:    'Partial Reports Received',
  decision:          'Accepted with Minor Corrections',
  decisionNote:      'Cleared by Dean (Research). Constitution of Oral Examination board is in process.',
  remark:            'Indian Examiner A recommended minor corrections to Chapter 5 smart gateway data models. Typographical errors to be resolved before viva-voce. Oral defense scheduled upon dean clearance.'
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

export default function ThesisEvaluation() {
  return (
    <div className="space-y-4 pb-10">

      {/* ── Header ─────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">PhD Stage 8</p>
          <h1 className="text-xl font-black text-slate-900 mt-0.5">Thesis Evaluation</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            External evaluation of the final thesis by appointed examiners
          </p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl">
          <Clock className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-black text-amber-700 uppercase tracking-wide">Evaluation In Progress</span>
        </div>
      </div>

      {/* ── Top 4 stat cards ───────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Evaluation Status',   value: 'In Progress',              color: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-200'   },
          { label: 'Outcome',             value: 'Recommended for Defense',   color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          { label: 'Examiner Reports',    value: 'Partial Received',          color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200'   },
          { label: 'Evaluation Decision', value: 'Accepted with Corrections', color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200'   }

        ].map((c, i) => (
          <div key={i} className={`${c.bg} ${c.border} border rounded-xl p-4`}>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">{c.label}</p>
            <p className={`text-sm font-black ${c.color} mt-1 leading-tight`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* ── Main 2-col grid ────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* LEFT — Evaluation Status + Outcome */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">
            Evaluation Status
          </h2>
          <div className="space-y-2 mb-5">
            {[
              { label: 'Pending Evaluation',        active: data.evaluationStatus === 'Pending Evaluation',        variant: 'amber' },
              { label: 'Evaluation In Progress',    active: data.evaluationStatus === 'Evaluation In Progress',    variant: 'amber' },
              { label: 'Evaluation Completed',      active: data.evaluationStatus === 'Evaluation Completed',      variant: 'green' }
            ].map(opt => <RadioRow key={opt.label} {...opt} />)}
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
              Thesis Evaluation Outcome
            </p>
            <div className="space-y-2">
              {[
                { label: 'Recommended for Oral Defense', active: data.outcome === 'Recommended for Oral Defense', variant: 'green' },
                { label: 'Revision Required',            active: data.outcome === 'Revision Required',            variant: 'red'   },
                { label: 'Not Recommended',              active: data.outcome === 'Not Recommended',              variant: 'red'   }
              ].map(opt => <RadioRow key={opt.label} {...opt} />)}
            </div>
          </div>
        </div>

        {/* RIGHT — Examiner Reports + Decision */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">
            Examiner Report Status
          </h2>
          <div className="space-y-2 mb-5">
            {[
              { label: 'Awaiting Reports',         active: data.examinerReport === 'Awaiting Reports',         variant: 'amber' },
              { label: 'Partial Reports Received', active: data.examinerReport === 'Partial Reports Received', variant: 'amber' },
              { label: 'All Reports Received',     active: data.examinerReport === 'All Reports Received',     variant: 'green' }
            ].map(opt => <RadioRow key={opt.label} {...opt} />)}
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
              Evaluation Decision
            </p>
            <div className="space-y-2">
              {[
                { label: 'Accepted',                       active: data.decision === 'Accepted',                       variant: 'green' },
                { label: 'Accepted with Minor Corrections', active: data.decision === 'Accepted with Minor Corrections', variant: 'green' },
                { label: 'Major Revision Required',         active: data.decision === 'Major Revision Required',         variant: 'red'   },
                { label: 'Re-evaluation Required',          active: data.decision === 'Re-evaluation Required',          variant: 'red'   }
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
          Evaluation Remark
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
