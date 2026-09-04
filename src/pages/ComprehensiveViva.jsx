import React from 'react'
import { CheckCircle2, Calendar, MapPin, ChevronRight, Award, ClipboardList } from 'lucide-react'

const vivaData = {
  vivaStatus: 'Passed',
  eligibilityStatus: 'Eligible',
  eligibilityNote: 'Coursework Completed — 13 Credits Verified',
  vivaDate: '17 June 2026',
  vivaTime: '10:30 AM',
  vivaMode: 'Offline (In-Person)',
  venue: 'Dean Research Chambers, Room 302, DSU Main Campus',
  result: 'Recommended & Passed',
  remarks: 'Priya R demonstrated a clear grasp of data security metrics in healthcare algorithms. The proposed methodology is logically sound. Candidacy continuation recommended without reservations.',
  nextStage: 'Colloquium',
  nextStageNote: 'Registration opens July 2026',
  scores: [
    { label: 'Research Proposal Defensibility', score: '22 / 25', pct: 88 },
    { label: 'Domain Knowledge & Methodology',  score: '44 / 50', pct: 88 },
    { label: 'Q&A / Defence Performance',        score: '23 / 25', pct: 92 }
  ]
}

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
    <span className="text-xs font-black text-slate-800">{value}</span>
  </div>
)

export default function ComprehensiveViva() {
  return (
    <div className="space-y-4 pb-10">

      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">PhD Stage 2</p>
          <h1 className="text-xl font-black text-slate-900 mt-0.5">Comprehensive Viva</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Assessment of research understanding and candidacy readiness
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-black text-emerald-700 uppercase tracking-wide">Viva Cleared</span>
        </div>
      </div>

      {/* ── Top 4 stat cards ───────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Viva Status',   value: vivaData.vivaStatus,        color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          { label: 'Eligibility',   value: vivaData.eligibilityStatus,  color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200' },
          { label: 'Mode',          value: 'Offline',                   color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200' },
          { label: 'Viva Date',     value: vivaData.vivaDate,           color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200' }

        ].map((c, i) => (
          <div key={i} className={`${c.bg} ${c.border} border rounded-xl p-4`}>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">{c.label}</p>
            <p className={`text-sm font-black ${c.color} mt-1`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* ── Main 2-column grid ─────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* LEFT — Eligibility & Schedule */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">
            Eligibility & Schedule
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-emerald-800">Eligible for Viva</p>
                <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">{vivaData.eligibilityNote}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-slate-900">{vivaData.vivaDate} · {vivaData.vivaTime}</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{vivaData.vivaMode}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-slate-700">{vivaData.venue}</p>
            </div>
          </div>
        </div>

        {/* RIGHT — Viva Result */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">
            Viva Result
          </h2>
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-black text-emerald-800 uppercase">{vivaData.result}</p>
              <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                Continuation Orders issued by Dean (Research), DSU
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Recommended & Passed',         active: vivaData.result === 'Recommended & Passed' },
              { label: 'Passed with Minor Corrections', active: vivaData.result === 'Passed with Minor Corrections' },
              { label: 'Re-Examination Required',       active: vivaData.result === 'Re-Examination Required' }
            ].map((opt, i) => (
              <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-bold
                ${opt.active
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0
                  ${opt.active ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'}`}>
                  {opt.active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                {opt.label}
                {opt.active && <CheckCircle2 size={12} className="ml-auto text-emerald-600" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Remarks (full width) ────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
          Committee Remarks
        </h2>
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
          <ClipboardList className="w-4 h-4 text-slate-400 mb-2" />
          <p className="text-xs text-slate-700 leading-relaxed font-medium italic">
            "{vivaData.remarks}"
          </p>
        </div>
      </div>

    </div>
  )
}
