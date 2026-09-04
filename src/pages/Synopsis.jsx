import React from 'react'
import { CheckCircle2, Clock, Calendar, MapPin, ClipboardList, AlertCircle } from 'lucide-react'

const data = {
  synopsisStatus:    'Approved',
  approvalStatus:    'Approved',
  meetingDate:       '20 June 2026',
  meetingTime:       '10:30 AM',
  venue:             'Dean Research Chambers, Room 302, DSU Main Campus',
  examinerPanel:     'Approved',
  clearanceStatus:   'Cleared',
  remark:            'Synopsis approved and cleared for external evaluation. Examiner panel of national and international reviewers recommended and approved by the Vice Chancellor.'
}

// ── Badge ────────────────────────────────────────
const Badge = ({ label, variant }) => {
  const styles = {
    green:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber:  'bg-amber-50  text-amber-700  border-amber-200',
    red:    'bg-red-50    text-red-700    border-red-200',
    blue:   'bg-blue-50   text-blue-700   border-blue-200',
    slate:  'bg-slate-100 text-slate-500  border-slate-200'
  }
  const icon = variant === 'green' ? <CheckCircle2 size={9} />
    : variant === 'amber' ? <Clock size={9} />
    : variant === 'red'   ? <AlertCircle size={9} /> : null
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black border ${styles[variant] || styles.slate}`}>
      {icon}{label}
    </span>
  )
}

// ── Radio option row ──────────────────────────────
const RadioRow = ({ label, active, variant = 'green' }) => (
  <div className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-bold
    ${active
      ? variant === 'green' ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
        : variant === 'amber' ? 'bg-amber-50 border-amber-200 text-amber-700'
        : 'bg-red-50 border-red-200 text-red-700'
      : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
    <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0
      ${active
        ? variant === 'green' ? 'border-emerald-500 bg-emerald-500'
          : variant === 'amber' ? 'border-amber-500 bg-amber-500'
          : 'border-red-500 bg-red-500'
        : 'border-slate-300'}`}>
      {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
    </div>
    {label}
    {active && variant === 'green' && <CheckCircle2 size={12} className="ml-auto text-emerald-600" />}
    {active && variant === 'amber' && <Clock size={12} className="ml-auto text-amber-500" />}
  </div>
)

// ── Main ─────────────────────────────────────────
export default function Synopsis() {
  return (
    <div className="space-y-4 pb-10">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">PhD Stage 7</p>
          <h1 className="text-xl font-black text-slate-900 mt-0.5">Synopsis</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Synopsis presentation and examiner panel recommendation milestone
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-black text-emerald-700 uppercase tracking-wide">Synopsis Approved</span>
        </div>
      </div>

      {/* ── Top 4 stat cards ─────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Synopsis Status',   value: data.synopsisStatus,  color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          { label: 'Meeting Date',      value: data.meetingDate,     color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200'   },
          { label: 'Examiner Panel',    value: data.examinerPanel,   color: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200'   },
          { label: 'Clearance',         value: data.clearanceStatus, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' }

        ].map((c, i) => (
          <div key={i} className={`${c.bg} ${c.border} border rounded-xl p-4`}>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">{c.label}</p>
            <p className={`text-sm font-black ${c.color} mt-1 leading-tight`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* ── Main 2-col grid ──────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* LEFT — Status + Meeting */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">
            Synopsis Status
          </h2>

          {/* Status options */}
          <div className="space-y-2 mb-4">
            {[
              { label: 'Pending Submission', active: data.synopsisStatus === 'Pending Submission', variant: 'amber' },
              { label: 'Submitted',          active: data.synopsisStatus === 'Submitted',          variant: 'amber' },
              { label: 'Under Review',       active: data.synopsisStatus === 'Under Review',       variant: 'amber' },
              { label: 'Approved',           active: data.synopsisStatus === 'Approved',           variant: 'green' }
            ].map(opt => <RadioRow key={opt.label} {...opt} />)}
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Approval Status</p>
            {[
              { label: 'Approved',     active: data.approvalStatus === 'Approved',     variant: 'green' },
              { label: 'Not Approved', active: data.approvalStatus === 'Not Approved', variant: 'red'   }
            ].map(opt => <RadioRow key={opt.label} {...opt} />)}
          </div>
        </div>

        {/* RIGHT — Meeting Schedule */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">
            Synopsis Meeting Schedule
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-slate-900">{data.meetingDate} · {data.meetingTime}</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Synopsis Presentation Panel</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-slate-700">{data.venue}</p>
            </div>
          </div>

          {/* Examiner Panel + Clearance */}
          <div className="mt-4 border-t border-slate-100 pt-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Examiner Panel Status</p>
            {[
              { label: 'Pending',     active: data.examinerPanel === 'Pending',     variant: 'amber' },
              { label: 'Recommended', active: data.examinerPanel === 'Recommended', variant: 'amber' },
              { label: 'Approved',    active: data.examinerPanel === 'Approved',    variant: 'green' }
            ].map(opt => <RadioRow key={opt.label} {...opt} />)}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Synopsis Clearance Status</p>
            {[
              { label: 'Awaiting Clearance', active: data.clearanceStatus === 'Awaiting Clearance', variant: 'amber' },
              { label: 'Cleared',            active: data.clearanceStatus === 'Cleared',            variant: 'green' }
            ].map(opt => <RadioRow key={opt.label} {...opt} />)}
          </div>
        </div>
      </div>

      {/* ── Remark (full width) ──────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
          DAC / Research Office Remark
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
