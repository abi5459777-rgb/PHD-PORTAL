import React, { useState } from 'react'
import { Search, Filter, Download, Eye, FileText, CheckCircle2, AlertCircle, XCircle, FolderOpen, UploadCloud } from 'lucide-react'

// ─── Document Data ────────────────────────────────
const CATEGORIES = [
  'All Categories',
  'Admission',
  'DAC & Course Work',
  'Comprehensive Viva',
  'Colloquium',
  'Inch Committee',
  'Synopsis',
  'Thesis Evaluation',
  'Thesis Defense'
]

const SCHOLAR_UPLOADS = [
  // Admission
  { id: 'u1',  name: 'Scholar Affidavit',                        category: 'Admission',           date: '15 Jan 2026', status: 'Approved', type: 'upload' },
  { id: 'u2',  name: 'Parent Affidavit',                         category: 'Admission',           date: '15 Jan 2026', status: 'Approved', type: 'upload' },
  { id: 'u3',  name: 'Joining Report',                           category: 'Admission',           date: '16 Jan 2026', status: 'Approved', type: 'upload' },
  // Course Work
  { id: 'u4',  name: 'NPTEL Course Certificate – Deep Learning', category: 'DAC & Course Work',   date: '10 Apr 2026', status: 'Approved', type: 'upload' },
  { id: 'u5',  name: 'SWAYAM Certificate – Cybersecurity',       category: 'DAC & Course Work',   date: '12 Apr 2026', status: 'Approved', type: 'upload' },
  // Research Progress
  { id: 'u6',  name: 'Half-Yearly Progress Report',              category: 'DAC & Course Work',   date: '05 Jul 2026', status: 'Pending',  type: 'upload' },
  // Comprehensive Viva
  { id: 'u7',  name: 'Comprehensive Viva Presentation',          category: 'Comprehensive Viva', date: '15 Jun 2026', status: 'Approved', type: 'upload' },
  // Colloquium
  { id: 'u8',  name: 'Colloquium Presentation',                  category: 'Colloquium',          date: '08 Jun 2026', status: 'Approved', type: 'upload' },
  // Inch Committee
  { id: 'u9',  name: 'Thesis Draft',                             category: 'Inch Committee',      date: '11 Jun 2026', status: 'Approved', type: 'upload' },
  { id: 'u10', name: 'Synopsis Draft',                           category: 'Inch Committee',      date: '11 Jun 2026', status: 'Approved', type: 'upload' },
  // Synopsis
  { id: 'u11', name: 'Synopsis Presentation',                    category: 'Synopsis',            date: '18 Jun 2026', status: 'Approved', type: 'upload' },
  // Thesis Defense
  { id: 'u12', name: 'Final Corrected Thesis',                   category: 'Thesis Defense',      date: '17 Jun 2026', status: 'Approved', type: 'upload' }
]

const UNIVERSITY_DOWNLOADS = [
  // Admission
  { id: 'd1',  name: 'Admission Order',                          category: 'Admission',           date: '18 Jan 2026', status: 'Approved', type: 'download' },
  // DAC & Course Work
  { id: 'd2',  name: 'DAC Approval Order',                       category: 'DAC & Course Work',   date: '20 Jun 2026', status: 'Approved', type: 'download' },
  { id: 'd3',  name: 'DAC Minutes of Meeting',                   category: 'DAC & Course Work',   date: '21 Jun 2026', status: 'Approved', type: 'download' },
  { id: 'd4',  name: 'Coursework Grade Sheet',                   category: 'DAC & Course Work',   date: '28 Jun 2026', status: 'Approved', type: 'download' },
  // Comprehensive Viva
  { id: 'd5',  name: 'Candidacy Confirmation Order',             category: 'Comprehensive Viva', date: '18 Jun 2026', status: 'Approved', type: 'download' },
  { id: 'd6',  name: 'Comprehensive Viva Result',                category: 'Comprehensive Viva', date: '18 Jun 2026', status: 'Approved', type: 'download' },
  // Colloquium
  { id: 'd7',  name: 'Colloquium Approval Order',                category: 'Colloquium',          date: '12 Jun 2026', status: 'Approved', type: 'download' },
  // Inch Committee
  { id: 'd8',  name: 'Format Verification Report',               category: 'Inch Committee',      date: '22 Jun 2026', status: 'Approved', type: 'download' },
  // Synopsis
  { id: 'd9',  name: 'Synopsis Approval Order',                  category: 'Synopsis',            date: '22 Jun 2026', status: 'Approved', type: 'download' },
  // Thesis Evaluation
  { id: 'd10', name: 'Thesis Evaluation Decision',               category: 'Thesis Evaluation',   date: '28 Jun 2026', status: 'Pending',  type: 'download' },
  // Thesis Defense
  { id: 'd11', name: 'Final PhD Recommendation Report',          category: 'Thesis Defense',      date: '19 Jun 2026', status: 'Approved', type: 'download' },
  { id: 'd12', name: 'Degree Award Approval',                    category: 'Thesis Defense',      date: '19 Jun 2026', status: 'Pending',  type: 'download' }
]

const ALL_DOCS = [...SCHOLAR_UPLOADS, ...UNIVERSITY_DOWNLOADS]

// ─── Status badge ─────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    Approved: { cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <CheckCircle2 size={9} /> },
    Pending:  { cls: 'bg-amber-50  text-amber-700  border-amber-200',  icon: <AlertCircle size={9} className="animate-pulse" /> },
    Rejected: { cls: 'bg-red-50    text-red-700    border-red-200',    icon: <XCircle size={9} /> }
  }
  const s = map[status] || map.Pending
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black border ${s.cls}`}>
      {s.icon}{status}
    </span>
  )
}

// ─── Type pill ────────────────────────────────────
const TypePill = ({ type }) =>
  type === 'upload'
    ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black bg-[#7B1E3A]/10 text-[#7B1E3A] border border-[#7B1E3A]/20"><UploadCloud size={8} />Scholar Upload</span>
    : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black bg-blue-50 text-blue-700 border border-blue-200"><Download size={8} />University</span>

// ─── Main ─────────────────────────────────────────
export default function Documents() {
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All Categories')
  const [typeFilter, setType]   = useState('all')

  const filtered = ALL_DOCS.filter(d => {
    const matchSearch   = d.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All Categories' || d.category === category
    const matchType     = typeFilter === 'all' || d.type === typeFilter
    return matchSearch && matchCategory && matchType
  })

  return (
    <div className="space-y-4 pb-10">

      {/* ── Header ─────────────────────────────── */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scholar Workspace</p>
        <h1 className="text-xl font-black text-slate-900 mt-0.5">Documents Repository</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Academic archive of all mandatory upload documents and university-generated official documents
        </p>
      </div>

      {/* ── Quick legend ───────────────────────── */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: `Scholar Uploads (${SCHOLAR_UPLOADS.length})`, color: 'bg-[#7B1E3A]/10 text-[#7B1E3A] border-[#7B1E3A]/20', icon: <UploadCloud size={11} /> },
          { label: `University Documents (${UNIVERSITY_DOWNLOADS.length})`, color: 'bg-blue-50 text-blue-700 border-blue-200', icon: <Download size={11} /> }
        ].map((l, i) => (
          <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-black ${l.color}`}>
            {l.icon}{l.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-black bg-slate-50 text-slate-500 border-slate-200">
          Total: {ALL_DOCS.length} documents
        </span>
      </div>

      {/* ── Filters ────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#7B1E3A] focus:ring-2 focus:ring-[#7B1E3A]/10 focus:bg-white transition"
            />
          </div>
          {/* Category */}
          <div className="flex items-center gap-2">
            <Filter size={13} className="text-slate-400 shrink-0" />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-[#7B1E3A] focus:bg-white transition cursor-pointer"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          {/* Type filter */}
          <div className="flex gap-1">
            {[
              { val: 'all',      label: 'All' },
              { val: 'upload',   label: 'My Uploads' },
              { val: 'download', label: 'University' }
            ].map(t => (
              <button key={t.val} onClick={() => setType(t.val)}
                className={`px-3 py-2 rounded-xl text-xs font-black border transition
                  ${typeFilter === t.val ? 'bg-[#7B1E3A] text-white border-[#7B1E3A]' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-400'}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Table ──────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Document Name', 'Category', 'Type', 'Upload Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length > 0 ? filtered.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 transition">
                  {/* Name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        <FileText size={13} className="text-[#7B1E3A]" />
                      </div>
                      <span className="font-bold text-slate-800 leading-tight">{doc.name}</span>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-4 py-3">
                    <span className="text-slate-500 font-semibold whitespace-nowrap">{doc.category}</span>
                  </td>
                  {/* Type */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <TypePill type={doc.type} />
                  </td>
                  {/* Date */}
                  <td className="px-4 py-3 text-slate-500 font-semibold whitespace-nowrap">{doc.date}</td>
                  {/* Status */}
                  <td className="px-4 py-3"><StatusBadge status={doc.status} /></td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => alert(`Viewing: ${doc.name}`)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-500 hover:text-slate-700 transition text-[10px] font-bold"
                        title="View">
                        <Eye size={11} /> View
                      </button>
                      <button
                        onClick={() => alert(`Downloading: ${doc.name}`)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-[#7B1E3A] text-slate-500 hover:text-[#7B1E3A] transition text-[10px] font-bold"
                        title="Download">
                        <Download size={11} /> Download
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FolderOpen size={32} className="text-slate-300" />
                      <p className="text-sm font-bold text-slate-500">No documents found</p>
                      <p className="text-xs text-slate-400">Try adjusting your search or filter</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-[10px] font-black text-slate-400">
            Showing {filtered.length} of {ALL_DOCS.length} documents
          </p>
        </div>
      </div>

    </div>
  )
}
