import React from 'react'

const summaryCards = [
  { id: 'c1', label: 'Total Courses', value: 10, description: 'All coursework subjects registered' },
  { id: 'c2', label: 'Completed Courses', value: 3, description: 'Successfully finished credits' },
  { id: 'c3', label: 'Pending Courses', value: 7, description: 'Courses still in progress' },
  { id: 'c4', label: 'Completion Rate', value: '30%', description: 'Overall coursework progress' },
]

const mandatoryCourses = [
  { code: 'RM101', name: 'Research Methodology', credits: 4, semester: 'Sem 1', status: 'Completed' },
  { code: 'RPE102', name: 'Research & Publication Ethics', credits: 3, semester: 'Sem 1', status: 'Completed' },
  { code: 'AI201', name: 'Advanced Data Analytics', credits: 4, semester: 'Sem 2', status: 'In Progress' },
  { code: 'TS203', name: 'Teaching Strategies for Scholars', credits: 2, semester: 'Sem 2', status: 'Pending' },
]

const selfLearningCourses = [
  { id: 's1', platform: 'NPTEL', title: 'Research Paper Writing', certificateStatus: 'Uploaded', certificateLink: '#' },
  { id: 's2', platform: 'SWAYAM', title: 'Machine Learning for Research', certificateStatus: 'Pending', certificateLink: '#' },
]

const certificateRepo = [
  { id: 'r1', name: 'Research Methodology Certificate', date: '20 May 2026', link: '#' },
  { id: 'r2', name: 'Publication Ethics Certificate', date: '10 Jun 2026', link: '#' },
]

const approvalStatus = {
  supervisor: 'Approved',
  dean: 'Pending',
}

function StatusBadge({ status }) {
  const classes = {
    Completed: 'bg-emerald-100 text-emerald-700',
    'In Progress': 'bg-amber-100 text-amber-700',
    Pending: 'bg-slate-100 text-slate-700',
    Uploaded: 'bg-indigo-100 text-indigo-700',
    Approved: 'bg-emerald-100 text-emerald-700',
  }
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classes[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  )
}

function SummaryCard({ label, value, description }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-4 text-4xl font-semibold text-dsu-maroon">{value}</p>
      <p className="mt-3 text-sm text-slate-500">{description}</p>
    </div>
  )
}

import { UploadCloud, CheckCircle2, FileText, Eye, Download } from 'lucide-react'

export default function Coursework() {
  const [documents, setDocuments] = React.useState([])

  React.useEffect(() => {
    const saved = localStorage.getItem('dsu_documents')
    if (saved) {
      try {
        setDocuments(JSON.parse(saved))
      } catch (e) {}
    }
  }, [])

  const handleDocUpload = (docName, event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const newDoc = {
      id: 'd_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      name: file.name,
      category: 'DAC & Coursework',
      uploadedBy: 'Scholar (Priya R)',
      uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
      fileType: file.name.split('.').pop().toUpperCase(),
      status: 'Pending',
      versions: [
        {
          version: 'v1.0',
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
          author: 'Scholar',
          remarks: `Uploaded ${docName} for First DAC & Coursework evaluation.`
        }
      ]
    }

    const updated = [...documents, newDoc]
    setDocuments(updated)
    localStorage.setItem('dsu_documents', JSON.stringify(updated))
    alert(`Uploaded "${file.name}" successfully for ${docName}!`)
  }

  const getUploadedFile = (docName) => {
    // Exact name mapping or keyword check
    if (docName === 'Research Presentation') {
      return documents.find(d => d.category === 'DAC & Coursework' && d.name.toLowerCase().includes('presentation'))
    }
    if (docName === 'NPTEL Certificate') {
      return documents.find(d => d.category === 'DAC & Coursework' && d.name.toLowerCase().includes('nptel'))
    }
    if (docName === 'SWAYAM Certificate') {
      return documents.find(d => d.category === 'DAC & Coursework' && d.name.toLowerCase().includes('swayam'))
    }
    if (docName === 'MOOC Completion Certificate') {
      return documents.find(d => d.category === 'DAC & Coursework' && (d.name.toLowerCase().includes('mooc') || d.name.toLowerCase().includes('completion')))
    }
    return null
  }

  const courseworkUploads = [
    { key: 'research_pres', name: 'Research Presentation' },
    { key: 'nptel_cert', name: 'NPTEL Certificate' },
    { key: 'swayam_cert', name: 'SWAYAM Certificate' },
    { key: 'mooc_cert', name: 'MOOC Completion Certificate' }
  ]

  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Course Work Overview</p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900">Academic Coursework Progress</h1>
            <p className="mt-2 text-sm text-slate-500">Monitor mandatory and self-learning requirements, certificates, and approval status.</p>
          </div>
          <div className="rounded-3xl bg-dsu-maroon/5 px-4 py-3 text-sm font-semibold text-dsu-maroon">Updated for current academic year</div>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <SummaryCard key={card.id} {...card} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr] items-start">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Mandatory Courses</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">Core Coursework</h2>
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Course Code</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Course Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Credits</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Semester</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {mandatoryCourses.map((course) => (
                  <tr key={course.code}>
                    <td className="px-4 py-4 text-slate-900">{course.code}</td>
                    <td className="px-4 py-4 text-slate-900">{course.name}</td>
                    <td className="px-4 py-4 text-slate-900">{course.credits}</td>
                    <td className="px-4 py-4 text-slate-900">{course.semester}</td>
                    <td className="px-4 py-4"><StatusBadge status={course.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6 h-fit">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Coursework Progress</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Milestone Completion</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
                  <span>Overall Coursework Completion</span>
                  <span className="font-semibold text-slate-900">30%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[30%] rounded-full bg-dsu-maroon"></div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Approval Status</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <span className="text-sm text-slate-700">Supervisor Approval</span>
                    <StatusBadge status={approvalStatus.supervisor} />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <span className="text-sm text-slate-700">Dean of Research Approval</span>
                    <StatusBadge status={approvalStatus.dean} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Certificates Repository</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Uploaded Documents</h2>
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Certificate Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Upload Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">View</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {certificateRepo.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4 text-slate-900">{item.name}</td>
                      <td className="px-4 py-4 text-slate-500">{item.date}</td>
                      <td className="px-4 py-4">
                        <a href={item.link} className="text-sm font-semibold text-dsu-maroon hover:text-red-800">View</a>
                      </td>
                      <td className="px-4 py-4">
                        <button className="rounded-2xl border border-dsu-maroon bg-dsu-maroon/5 px-3 py-2 text-sm font-semibold text-dsu-maroon transition hover:bg-dsu-maroon/10">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Self-Learning Courses</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Digital Course Certifications</h2>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Platform</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Course Name</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Certificate Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {selfLearningCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-4 py-4 text-slate-900">{course.platform}</td>
                  <td className="px-4 py-4 text-slate-900">{course.title}</td>
                  <td className="px-4 py-4"><StatusBadge status={course.certificateStatus} /></td>
                  <td className="px-4 py-4">
                    <button className="rounded-2xl bg-dsu-maroon px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-800">View Certificate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* NEW First DAC & Coursework Document Submissions */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">First DAC & Coursework</p>
          <h2 className="mt-3 text-xl font-semibold text-slate-900">Document Submissions</h2>
          <p className="mt-1 text-sm text-slate-500">Upload your coursework certifications and presentations for review.</p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courseworkUploads.map((up) => {
            const file = getUploadedFile(up.name)
            const isUploaded = !!file

            return (
              <div 
                key={up.key} 
                className={`rounded-2xl border p-4 flex flex-col justify-between h-48 bg-slate-50/50 transition duration-200
                  ${isUploaded ? 'border-slate-200' : 'border-dashed border-slate-300'}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">File Requirement</span>
                    {isUploaded && (
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-100">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        Uploaded
                      </span>
                    )}
                  </div>
                  <h4 className="mt-2 text-sm font-bold text-slate-900 leading-tight">{up.name}</h4>
                  {isUploaded ? (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-100">
                      <FileText className="h-4 w-4 text-dsu-maroon shrink-0" />
                      <span className="truncate font-medium" title={file.name}>{file.name}</span>
                    </div>
                  ) : (
                    <p className="mt-2 text-[11px] text-slate-400">PDF or PPT format preferred.</p>
                  )}
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                  {isUploaded ? (
                    <div className="flex gap-1.5 w-full">
                      <button 
                        onClick={() => alert(`Viewing: ${file.name}`)}
                        className="flex-1 p-1 text-[11px] font-bold text-slate-700 bg-white border rounded-lg flex items-center justify-center gap-1"
                      >
                        <Eye className="h-3 w-3" /> View
                      </button>
                      <button 
                        onClick={() => alert(`Downloading: ${file.name}`)}
                        className="flex-1 p-1 text-[11px] font-bold text-dsu-maroon bg-dsu-maroon/5 border border-dsu-maroon/20 rounded-lg flex items-center justify-center gap-1"
                      >
                        <Download className="h-3 w-3" /> Download
                      </button>
                    </div>
                  ) : (
                    <label className="w-full text-center text-xs font-bold text-white bg-dsu-maroon hover:bg-red-800 rounded-lg py-2 cursor-pointer transition flex items-center justify-center gap-1">
                      <UploadCloud className="h-3.5 w-3.5" />
                      Upload
                      <input 
                        type="file" 
                        accept=".pdf,.ppt,.pptx,.doc,.docx"
                        onChange={(e) => handleDocUpload(up.name, e)}
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
