import React from 'react'
import { CheckCircle2, Clock, AlertCircle, Calendar, MapPin, ClipboardList, BookOpen, Target, FlaskConical, ChevronRight } from 'lucide-react'

// ─── Data ────────────────────────────────────────
const data = {
  dacStatus:          'Approved',
  meetingDate:        '12 June 2026',
  meetingTime:        '10:00 AM – 12:30 PM',
  venue:              'Research Block – Seminar Hall 1, DSU Main Campus, Perambalur',
  courseworkStatus:   'Completed',
  courseworkDeadline: '14 July 2027',
  completionReq:      'One-year from date of registration',
  totalCourses:       7,
  completed:          7,
  pending:            0,
  completionPct:      100,
  dacOutcome:         'Research Proposal Approved',
  finalStatus:        'Coursework Completed',
  remark:             'First DAC completed successfully. Research proposal approved and coursework cleared. Scholar is authorised to proceed with independent research phase.',

  research: {
    topic:       'Secure AI-Driven Smart Healthcare Monitoring Systems Using Federated Learning',
    area:        'Artificial Intelligence & Cybersecurity in Healthcare',
    objectives: [
      'Design a federated learning framework for privacy-preserving patient data analysis across multi-institutional hospital networks.',
      'Develop real-time anomaly detection models for clinical IoT sensor streams using lightweight deep learning architectures.',
      'Evaluate system performance against benchmark healthcare datasets (MIMIC-III, PhysioNet, eICU-CRD).'
    ],
    methodology: 'Experimental-simulation hybrid methodology. Phase I: systematic literature review (PRISMA). Phase II: prototype development using TensorFlow Federated and PyTorch with secure aggregation protocols. Phase III: benchmarking on clinical datasets. Phase IV: formal security validation using threat modelling tools.',
    outcomes: [
      'Federated learning model achieving ≥94% diagnostic accuracy on benchmark datasets.',
      'Peer-reviewed journal publication in SCI/Scopus-indexed journal within 18 months.',
      'Functional prototype of the secure healthcare monitoring dashboard.',
      'Patent application for the proposed federated learning architecture.'
    ]
  },

  mandatoryCourses: [
    { name: 'Research Methodology',           credits: 4, status: 'Completed', grade: 'A+' },
    { name: 'Research & Publication Ethics',  credits: 3, status: 'Completed', grade: 'A'  }
  ],

  onlineCourses: [
    { provider: 'NPTEL',   name: 'Academic Research Paper Writing & Ethics', credits: 2, status: 'Approved' },
    { provider: 'NPTEL',   name: 'Deep Learning & Neural Networks',          credits: 2, status: 'Approved' },
    { provider: 'SWAYAM',  name: 'Cybersecurity Fundamentals',               credits: 2, status: 'Approved' }
  ]
}

// ─── Helpers ─────────────────────────────────────
const RadioRow = ({ label, active, variant = 'green' }) => {
  const cfg = {
    green: { wrap: 'bg-emerald-50 border-emerald-200 text-emerald-700', dot: 'border-emerald-500 bg-emerald-500', icon: <CheckCircle2 size={12} className="ml-auto text-emerald-600" /> },
    amber: { wrap: 'bg-amber-50  border-amber-200  text-amber-700',     dot: 'border-amber-500  bg-amber-500',  icon: <Clock size={12} className="ml-auto text-amber-500" /> },
    red:   { wrap: 'bg-red-50    border-red-200    text-red-700',       dot: 'border-red-500    bg-red-500',    icon: <AlertCircle size={12} className="ml-auto text-red-500" /> }
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

const SectionHead = ({ title }) => (
  <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">{title}</h2>
)

// ─── Main ─────────────────────────────────────────
export default function DacCoursework() {
  return (
    <div className="space-y-4 pb-10">

      {/* ── Header ─────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">PhD Stage 1</p>
          <h1 className="text-xl font-black text-slate-900 mt-0.5">First DAC & Course Work</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Initial research registration, DAC review and coursework milestone tracking
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-black text-emerald-700 uppercase tracking-wide">First DAC Cleared</span>
        </div>
      </div>

      {/* ── Top 4 stat cards ───────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'First DAC Status',    value: data.dacStatus,        color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          { label: 'Meeting Date',        value: data.meetingDate,      color: 'text-violet-600',  bg: 'bg-violet-50',  border: 'border-violet-200'  },
          { label: 'Coursework Status',   value: data.courseworkStatus, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          { label: 'Completion',          value: `${data.completionPct}%`, color: 'text-blue-600', bg: 'bg-blue-50',    border: 'border-blue-200'    }
        ].map((c, i) => (
          <div key={i} className={`${c.bg} ${c.border} border rounded-xl p-4`}>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">{c.label}</p>
            <p className={`text-sm font-black ${c.color} mt-1 leading-tight`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* ── Row 1: DAC Status + Meeting ────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* First DAC Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <SectionHead title="First DAC Status" />
          <div className="space-y-2 mb-4">
            {[
              { label: 'Pending',   active: data.dacStatus === 'Pending',   variant: 'amber' },
              { label: 'Scheduled', active: data.dacStatus === 'Scheduled', variant: 'amber' },
              { label: 'Conducted', active: data.dacStatus === 'Conducted', variant: 'amber' },
              { label: 'Approved',  active: data.dacStatus === 'Approved',  variant: 'green' }
            ].map(opt => <RadioRow key={opt.label} {...opt} />)}
          </div>

          <div className="border-t border-slate-100 pt-4">
            <SectionHead title="First DAC Outcome" />
            <div className="space-y-2">
              {[
                { label: 'Research Proposal Approved', active: data.dacOutcome === 'Research Proposal Approved', variant: 'green' },
                { label: 'Coursework Approved',         active: data.dacOutcome === 'Coursework Approved',        variant: 'green' },
                { label: 'Revision Required',           active: data.dacOutcome === 'Revision Required',          variant: 'red'   }
              ].map(opt => <RadioRow key={opt.label} {...opt} />)}
            </div>
          </div>
        </div>

        {/* Meeting Info */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <SectionHead title="DAC Meeting Information" />
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-slate-900">{data.meetingDate} · {data.meetingTime}</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">First DAC Meeting & Topic Approval</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-slate-700">{data.venue}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-4">
            <SectionHead title="Final Coursework Status" />
            <div className="space-y-2">
              {[
                { label: 'Coursework In Progress', active: data.finalStatus === 'Coursework In Progress', variant: 'amber' },
                { label: 'Coursework Completed',   active: data.finalStatus === 'Coursework Completed',   variant: 'green' },
                { label: 'Grade Sheet Issued',      active: data.finalStatus === 'Grade Sheet Issued',     variant: 'green' }
              ].map(opt => <RadioRow key={opt.label} {...opt} />)}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Research Summary ─────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <SectionHead title="Research Presentation Summary" />
        {/* Topic */}
        <div className="flex items-start gap-3 p-3.5 bg-violet-50 border border-violet-100 rounded-xl mb-3">
          <Target className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-violet-400 mb-0.5">Research Topic</p>
            <p className="text-xs font-black text-slate-900 leading-snug">{data.research.topic}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Objectives */}
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">Research Objectives</p>
            <div className="space-y-1.5">
              {data.research.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#7B1E3A] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[8px] font-black text-white">{i + 1}</span>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-700 leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology + Outcomes */}
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <FlaskConical size={12} className="text-[#7B1E3A]" />
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Research Methodology</p>
              </div>
              <p className="text-[10px] font-semibold text-slate-700 leading-relaxed">{data.research.methodology}</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">Expected Outcomes</p>
              <div className="space-y-1">
                {data.research.outcomes.map((o, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <ChevronRight size={10} className="text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-semibold text-slate-700 leading-relaxed">{o}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 3: Courses + Progress ───────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Mandatory + Online Courses */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <SectionHead title="Mandatory Courses" />
          <div className="space-y-2 mb-4">
            {data.mandatoryCourses.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <BookOpen size={13} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-black text-slate-800">{c.name}</p>
                    <p className="text-[9px] text-slate-500 font-semibold mt-0.5">{c.credits} Credits</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">{c.grade}</span>
                  <CheckCircle2 size={13} className="text-emerald-600" />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4">
            <SectionHead title="Approved Online Courses" />
            <div className="space-y-2">
              {data.onlineCourses.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border shrink-0
                      ${c.provider === 'NPTEL' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-teal-100 text-teal-700 border-teal-200'}`}>
                      {c.provider}
                    </span>
                    <div>
                      <p className="text-[10px] font-black text-slate-800 leading-tight">{c.name}</p>
                      <p className="text-[9px] text-slate-500 font-semibold">{c.credits} Credits</p>
                    </div>
                  </div>
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coursework Status + Progress + Deadline */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <SectionHead title="Course Work Status" />
          <div className="space-y-2 mb-5">
            {[
              { label: 'Not Started', active: data.courseworkStatus === 'Not Started', variant: 'amber' },
              { label: 'In Progress', active: data.courseworkStatus === 'In Progress', variant: 'amber' },
              { label: 'Completed',   active: data.courseworkStatus === 'Completed',   variant: 'green' }
            ].map(opt => <RadioRow key={opt.label} {...opt} />)}
          </div>

          <div className="border-t border-slate-100 pt-4 mb-4">
            <SectionHead title="Course Completion Progress" />
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { label: 'Total Assigned', value: data.totalCourses, color: 'text-slate-700' },
                { label: 'Completed',      value: data.completed,    color: 'text-emerald-600' },
                { label: 'Pending',        value: data.pending,      color: 'text-amber-600' },
                { label: 'Completion %',   value: `${data.completionPct}%`, color: 'text-blue-600' }
              ].map((s, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                  <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
                  <p className="text-[9px] font-black uppercase text-slate-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${data.completionPct}%` }} />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <SectionHead title="Coursework Deadline" />
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-100 rounded-xl">
                <p className="text-[10px] font-black text-slate-700">Completion Due Date</p>
                <p className="text-xs font-black text-amber-700">{data.courseworkDeadline}</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="text-[10px] font-black text-slate-700">Requirement</p>
                <p className="text-[10px] font-black text-slate-600">{data.completionReq}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Remark (full width) ──────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
          DAC Remark
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
