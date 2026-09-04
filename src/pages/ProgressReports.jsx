import React, { useState, useEffect } from 'react'
import { 
  FileText, UploadCloud, CheckCircle2, AlertCircle, Eye, Download, 
  BarChart2, FileSignature, BookOpen, Layers
} from 'lucide-react'
import ProgressChart from '../components/ProgressChart'

// Mock Data
const progressSummary = {
  totalSubmitted: 4,
  completionRate: '45%',
  lastUpdated: '16 Jun 2026',
  approvalStatus: 'Current Semesters Cleared'
}

const mockPublications = [
  { id: 1, title: 'Deep Learning in ECG Classification', journal: 'IEEE Transactions on Medical Imaging', indexing: 'Scopus Indexed', date: 'Jan 2026' }
]

const mockDacComments = [
  { id: 1, meeting: 'First Half-Yearly Review', expert: 'Dr. M. Sathyapriya', comment: 'Scholar is showing progress. Needs to focus on publication counts.', date: '12 Jan 2026' }
]

const initialReports = [
  { month: 'January 2026', title: 'Literature Review & Formulation', date: 'Jan 18, 2026', status: 'Approved', type: 'Monthly Report' },
  { month: 'February 2026', title: 'Research Methodology Definition', date: 'Feb 22, 2026', status: 'Approved', type: 'Monthly Report' },
  { month: 'March 2026', title: 'Healthcare Data Extraction Algorithms', date: 'Mar 17, 2026', status: 'Approved', type: 'Monthly Report' },
  { month: 'April 2026', title: 'Simulation setup & initial trials', date: 'Apr 09, 2026', status: 'Approved', type: 'Monthly Report' }
]

const reportProgressData = [
  { month: 'Jan', progress: 10 },
  { month: 'Feb', progress: 20 },
  { month: 'Mar', progress: 35 },
  { month: 'Apr', progress: 45 },
]

export default function ProgressReports() {
  const [reports, setReports] = useState(initialReports)
  const [documents, setDocuments] = useState([])
  const [monthlyTitle, setMonthlyTitle] = useState('')
  const [monthlyMonth, setMonthlyMonth] = useState('May 2026')
  const [monthlyRemarks, setMonthlyRemarks] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('dsu_documents')
    if (saved) {
      try {
        setDocuments(JSON.parse(saved))
      } catch (e) {}
    }
  }, [])

  const handleHalfYearlyUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const newDoc = {
      id: 'd_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      name: file.name,
      category: 'Progress Reports',
      uploadedBy: 'Scholar (Priya R)',
      uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
      fileType: file.name.split('.').pop().toUpperCase(),
      status: 'Pending',
      versions: [
        {
          version: 'v1.0',
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
          author: 'Scholar',
          remarks: 'Uploaded Half-Yearly Progress Report.'
        }
      ]
    }

    const updated = [...documents, newDoc]
    setDocuments(updated)
    localStorage.setItem('dsu_documents', JSON.stringify(updated))
    alert(`Uploaded "${file.name}" successfully for Half-Yearly Progress Report!`)
  }

  const handleMonthlySubmit = (e) => {
    e.preventDefault()
    if (!monthlyTitle) return

    const newReport = {
      month: monthlyMonth,
      title: monthlyTitle,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
      status: 'Submitted',
      type: 'Monthly Report'
    }

    setReports([newReport, ...reports])
    setMonthlyTitle('')
    setMonthlyRemarks('')
    alert('Monthly progress report submitted successfully!')
  }

  const uploadedHalfYearly = documents.find(d => d.category === 'Progress Reports' && d.name.toLowerCase().includes('half'))
  const defaultHalfYearly = { name: 'Signed_Half_Yearly_Progress_Report_Sem1.pdf', uploadDate: '10 Jan 2026' }

  return (
    <div className="space-y-6 pb-12">
      {/* Header Panel */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 font-semibold">PhD Stage 3</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Progress Reports</h1>
            <p className="mt-2 text-sm text-slate-500">
              <strong>Purpose:</strong> Monitor scholar research progress periodically.
            </p>
          </div>
          <div className="bg-emerald-50 px-4 py-2.5 rounded-2xl text-xs font-bold text-emerald-700 border border-emerald-250 tracking-wider flex items-center gap-1.5 uppercase">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Compliance Verified
          </div>
        </div>

        {/* Phase Outputs Summary */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">Target Outputs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex items-start gap-3">
              <FileText className="h-5 w-5 text-dsu-maroon shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase">Progress Monitoring Record</h4>
                <p className="text-xs text-slate-900 font-semibold mt-1">Audit log of all monthly and half-yearly review sheets.</p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex items-start gap-3">
              <FileSignature className="h-5 w-5 text-dsu-maroon shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase">Continuation Recommendation</h4>
                <p className="text-xs text-slate-900 font-semibold mt-1">Guide endorsement for candidate status continuation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Left Columns (Col Span 2) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Half-Yearly Progress Reports */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <FileText className="h-5 w-5 text-dsu-maroon" />
              Half-Yearly Progress Reports
            </h2>
            <p className="text-xs text-slate-500">
              Submit your signed and verified Half-Yearly Progress Report (HYPE) form below.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Current Semesters Review (Jan-Jun 2026)</p>
                <p className="text-xs font-bold text-slate-800 mt-2 truncate">
                  {uploadedHalfYearly ? uploadedHalfYearly.name : defaultHalfYearly.name}
                </p>
                <div className="mt-3 flex gap-2">
                  <button 
                    onClick={() => alert('Downloading report file...')}
                    className="p-1.5 text-[10px] font-bold text-dsu-maroon bg-dsu-maroon/5 border border-dsu-maroon/20 rounded-lg flex items-center gap-0.5"
                  >
                    <Download className="h-3 w-3" /> Download Signed Report
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-350 flex flex-col justify-between h-32">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Upload Next HYPE Review Report</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Upload PDF format (signed by Supervisor and Expert Panel).</p>
                </div>
                <label className="text-xs font-bold text-white bg-dsu-maroon hover:bg-red-800 rounded-lg py-1.5 px-3 cursor-pointer transition flex items-center justify-center gap-1">
                  <UploadCloud className="h-4 w-4" />
                  Upload HYPE Document
                  <input type="file" accept=".pdf" onChange={handleHalfYearlyUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Progress Report Upload (Monthly Submission Form) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-dsu-maroon" />
              Progress Report Upload (Monthly Report)
            </h2>
            <form onSubmit={handleMonthlySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
              <div className="space-y-3">
                <div>
                  <label className="block mb-1">Report Title</label>
                  <input 
                    type="text" 
                    value={monthlyTitle} 
                    onChange={(e) => setMonthlyTitle(e.target.value)} 
                    placeholder="e.g., Blockchain Setup & Validation Details" 
                    className="w-full border p-2.5 rounded-xl bg-slate-50/50" 
                    required 
                  />
                </div>
                <div>
                  <label className="block mb-1">Reporting Month</label>
                  <select 
                    value={monthlyMonth} 
                    onChange={(e) => setMonthlyMonth(e.target.value)} 
                    className="w-full border p-2.5 rounded-xl bg-slate-50/50"
                  >
                    <option>May 2026</option>
                    <option>June 2026</option>
                    <option>July 2026</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3 flex flex-col justify-between">
                <div>
                  <label className="block mb-1">Brief Details / Remarks</label>
                  <textarea 
                    value={monthlyRemarks} 
                    onChange={(e) => setMonthlyRemarks(e.target.value)} 
                    rows={3} 
                    placeholder="Provide details about target objectives completed this month." 
                    className="w-full border p-2 rounded-xl bg-slate-50/50 resize-none"
                  />
                </div>
                <button type="submit" className="w-full bg-[#7B1E3A] text-white py-2 rounded-xl hover:bg-red-800 transition font-extrabold uppercase tracking-wide">
                  Submit Monthly Progress Report
                </button>
              </div>
            </form>
          </div>

          {/* Research Activities Summary & Lists */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Layers className="h-5 w-5 text-dsu-maroon" />
              Research Activities Summary
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-150">
              <table className="min-w-full divide-y divide-slate-150 text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Reporting Period</th>
                    <th className="px-4 py-3">Activity Description</th>
                    <th className="px-4 py-3">Submission Date</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 bg-white font-medium text-slate-800">
                  {reports.map((rep, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-950">{rep.month}</td>
                      <td className="px-4 py-3">{rep.title} <br/><span className="text-[10px] text-slate-400 font-bold uppercase">{rep.type}</span></td>
                      <td className="px-4 py-3">{rep.date}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-flex rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700 border border-emerald-100 ${
                          rep.status === 'Submitted' ? 'bg-amber-50 text-amber-700 border-amber-100' : ''
                        }`}>
                          {rep.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column (Col Span 1) */}
        <div className="space-y-6">
          
          {/* Progress Chart */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b pb-2">Research Completion Chart</h3>
            <ProgressChart data={reportProgressData} />
          </div>

          {/* Publications Achieved */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b pb-2">Publications Achieved</h3>
            <div className="space-y-3">
              {mockPublications.map((pub) => (
                <div key={pub.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-xs">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-4.5 w-4.5 text-dsu-maroon" />
                    <span className="font-bold text-[#7B1E3A]">{pub.indexing}</span>
                  </div>
                  <p className="mt-2 font-bold text-slate-800 leading-snug">{pub.title}</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-semibold">{pub.journal} • {pub.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Supervisor Remarks */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b pb-2">Supervisor Remarks</h3>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-xs font-semibold text-slate-700 leading-relaxed">
              "Priya is executing the smart monitor project satisfactorily. She has achieved 1 high-quality journal publication and is in track with the proposed simulation schedule."
              <p className="text-right text-[10px] text-slate-400 mt-2">— Dr. D. Srinivasan</p>
            </div>
          </div>

          {/* DAC Comments */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b pb-2">DAC Comments</h3>
            <div className="space-y-3">
              {mockDacComments.map((com) => (
                <div key={com.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-xs">
                  <div className="flex justify-between items-center text-[10px] text-slate-450 font-bold uppercase">
                    <span>{com.meeting}</span>
                    <span>{com.date}</span>
                  </div>
                  <p className="mt-2 font-bold text-slate-800 leading-relaxed">"{com.comment}"</p>
                  <p className="text-[9px] text-slate-400 mt-1 text-right">— {com.expert}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Status */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b pb-2">Approval Status</h3>
            <div className="bg-emerald-50 border border-emerald-150 p-4 rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-emerald-800 uppercase">STATUS: ACTIVE & ENDORSED</p>
                <p className="text-emerald-700 font-semibold mt-1">The scholar has cleared all progress report audit metrics.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
