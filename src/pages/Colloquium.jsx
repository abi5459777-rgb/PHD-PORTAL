import React from 'react'
import { CheckCircle2, Calendar, MapPin, ClipboardList, ChevronRight, Clock } from 'lucide-react'

const data = {
  status: 'Completed',
  presentationDate: '10 June 2026',
  presentationTime: '11:00 AM',
  venue: 'Auditorium 2, DSU Main Campus, Perambalur',
  mode: 'Offline (In-Person)',
  committeeStatus: 'Approved',
  result: 'Approved',
  resultNote: 'Colloquium clearance approved. Scholar permitted to proceed to thesis preparation.',
  remarks: 'Research presented was methodologically sound and well-structured. Simulation results were comprehensive. Scholar is recommended to proceed to thesis preparation without reservations.',
  nextStage: 'Thesis Preparation',
  nextStageNote: 'Eligible to submit thesis draft to Inch Committee'
}

const Badge = ({ label, variant = 'green' }) => {
  const styles = {
    green:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue:   'bg-blue-50 text-blue-700 border-blue-200',
    amber:  'bg-amber-50 text-amber-700 border-amber-200',
    violet: 'bg-violet-50 text-violet-700 border-violet-200',
    slate:  'bg-slate-100 text-slate-600 border-slate-200'
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black border ${styles[variant]}`}>
      {variant === 'green' && <CheckCircle2 size={9} />}
      {variant === 'amber' && <Clock size={9} />}
      {label}
    </span>
  )
}

export default function Colloquium() {
  return (
    <div className="space-y-4 pb-10">

      {/* ── Header ─────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">PhD Stage 5</p>
          <h1 className="text-xl font-black text-slate-900 mt-0.5">Colloquium</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Pre-synopsis open seminar — milestone before thesis preparation
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-black text-emerald-700 uppercase tracking-wide">Colloquium Cleared</span>
        </div>
      </div>

      {/* ── Top 4 stat cards ───────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Colloquium Status',  value: data.status,           color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          { label: 'Presentation Date',  value: data.presentationDate, color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200'   },
          { label: 'Mode',               value: 'Offline',             color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200'   },
          { label: 'Committee Status',   value: data.committeeStatus,  color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200'   }
        ].map((c, i) => (
          <div key={i} className={`${c.bg} ${c.border} border rounded-xl p-4`}>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">{c.label}</p>
            <p className={`text-sm font-black ${c.color} mt-1 leading-tight`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* ── Main 2-col grid ────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* LEFT — Date, Venue & Mode */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">
            Date, Venue & Mode
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-slate-900">{data.presentationDate} · {data.presentationTime}</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{data.mode}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-slate-700">{data.venue}</p>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-xs font-black text-blue-800">Committee Review Status</p>
              <Badge label={data.committeeStatus} variant="green" />
            </div>
          </div>
        </div>

        {/* RIGHT — Result */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">
            Colloquium Result
          </h2>
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black text-emerald-800 uppercase">{data.result}</p>
              <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">{data.resultNote}</p>
            </div>
          </div>
          {/* Result options reference */}
          <div className="space-y-2">
            {[
              { label: 'Approved',                   active: data.result === 'Approved' },
              { label: 'Approved with Suggestions',  active: data.result === 'Approved with Suggestions' },
              { label: 'Re-Presentation Required',   active: data.result === 'Re-Presentation Required' }
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

