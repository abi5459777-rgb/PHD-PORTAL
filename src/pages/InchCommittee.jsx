import React from 'react'
import { CheckCircle2, Calendar, ClipboardList, Clock } from 'lucide-react'

const data = {
  status: 'Approved',
  reviewDate: '20 June 2026',
  reviewTime: '11:00 AM',
  reviewCompleted: true,
  finalDecision: 'Approved with Corrections',
  decisionNote: 'Inch Committee report signed. Scholar cleared to proceed to thesis submission.',
  remarks: 'Minor corrections required in Chapter 3 equation numbering and a typographical error on page 141. All other sections conform to DSU thesis format standards. Scholar may proceed after corrections.'
}

const Badge = ({ label, variant = 'green' }) => {
  const styles = {
    green:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue:   'bg-blue-50 text-blue-700 border-blue-200',
    amber:  'bg-amber-50 text-amber-700 border-amber-200',
    violet: 'bg-violet-50 text-violet-700 border-violet-200',
    slate:  'bg-slate-100 text-slate-600 border-slate-200'
  }
  const icon = variant === 'green' ? <CheckCircle2 size={9} />
    : variant === 'amber' ? <Clock size={9} /> : null
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black border ${styles[variant]}`}>
      {icon}{label}
    </span>
  )
}

export default function InchCommittee() {
  return (
    <div className="space-y-4 pb-10">

      {/* ── Header ─────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">PhD Stage 6</p>
          <h1 className="text-xl font-black text-slate-900 mt-0.5">Inch Committee</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Format verification and review of draft thesis before final submission
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-black text-emerald-700 uppercase tracking-wide">Format Verified</span>
        </div>
      </div>

      {/* ── Top 4 stat cards ───────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Inch Committee Status', value: data.status,        color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          { label: 'Review Date',           value: data.reviewDate,    color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200'   },
          { label: 'Review Completed',      value: data.reviewCompleted ? 'Yes' : 'No',
                                                                       color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200'   },
          { label: 'Final Decision',        value: 'Approved',         color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' }

        ].map((c, i) => (
          <div key={i} className={`${c.bg} ${c.border} border rounded-xl p-4`}>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">{c.label}</p>
            <p className={`text-sm font-black ${c.color} mt-1 leading-tight`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* ── Main 2-col grid ────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* LEFT — Review Date & Committee Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">
            Review Details
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-slate-900">{data.reviewDate} · {data.reviewTime}</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Inch Committee Review Session</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-xs font-black text-blue-800">Committee Status</p>
              <Badge label="Review Completed" variant="green" />
            </div>
            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-xs font-black text-slate-700">Inch Committee Status</p>
              <Badge label={data.status} variant="green" />
            </div>
          </div>
        </div>

        {/* RIGHT — Final Decision */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">
            Final Decision
          </h2>
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black text-emerald-800 uppercase">{data.finalDecision}</p>
              <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">{data.decisionNote}</p>
            </div>
          </div>
          {/* Decision options */}
          <div className="space-y-2">
            {[
              'Approved',
              'Approved with Corrections',
              'Re-Submission Required'
            ].map((opt) => {
              const active = data.finalDecision === opt
              return (
                <div key={opt} className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-bold
                  ${active ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                  <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0
                    ${active ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'}`}>
                    {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  {opt}
                  {active && <CheckCircle2 size={12} className="ml-auto text-emerald-600" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Remarks (full width) ───────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
          Committee Remarks
        </h2>
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
          <ClipboardList className="w-4 h-4 text-slate-400 mb-2" />
          <p className="text-xs text-slate-700 leading-relaxed font-medium italic">
            "{data.remarks}"
          </p>
        </div>
      </div>

    </div>
  )
}
