import React, { useState, useEffect } from 'react'
import { 
  Check, 
  Hourglass, 
  FileText, 
  UploadCloud, 
  Calendar, 
  Paperclip, 
  AlertCircle, 
  Layers, 
  CheckCircle2, 
  Download,
  Eye
} from 'lucide-react'

// Thesis overview stats
const initialThesisOverview = {
  progressPercent: 55,
  currentStage: 'Format Verification',
  lastUpdated: '16 Jun 2026',
  expectedNextAction: 'Submit revised thesis if requested by the Inch Committee'
}

export default function ThesisStatus() {
  const [documents, setDocuments] = useState([])

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dsu_documents')
    if (saved) {
      try {
        setDocuments(JSON.parse(saved))
      } catch (e) {}
    }
  }, [])

  const handleUpload = (docName, category, event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const newDoc = {
      id: 'd_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      name: file.name,
      category: category,
      uploadedBy: 'Scholar (Priya R)',
      uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
      fileType: file.name.split('.').pop().toUpperCase(),
      status: 'Pending',
      versions: [
        {
          version: 'v1.0',
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
          author: 'Scholar',
          remarks: `Uploaded ${docName} for Thesis evaluation stages.`
        }
      ]
    }

    const updated = [...documents, newDoc]
    setDocuments(updated)
    localStorage.setItem('dsu_documents', JSON.stringify(updated))
    alert(`Uploaded "${file.name}" successfully for ${docName}!`)
  }

  // Prepopulate checks
  const getUploadedFile = (docName, category) => {
    // Check local storage documents list
    if (docName === 'Draft Thesis') {
      return documents.find(d => d.category === 'Inch Committee' && d.name.toLowerCase().includes('draft') && d.name.toLowerCase().includes('thesis')) ||
             documents.find(d => d.name === 'Draft_Thesis_v1.0.pdf' || d.name === 'Format Verification Report.pdf')
    }
    if (docName === 'Draft Synopsis') {
      return documents.find(d => d.category === 'Inch Committee' && d.name.toLowerCase().includes('draft') && d.name.toLowerCase().includes('synopsis')) ||
             documents.find(d => d.name === 'Synopsis_Draft_v1.0.pdf' || d.name === 'Synopsis Approval.pdf')
    }
    if (docName === 'Revised Thesis') {
      return documents.find(d => d.category === 'Inch Committee' && d.name.toLowerCase().includes('revised') && d.name.toLowerCase().includes('thesis'))
    }
    if (docName === 'Final Defense Presentation') {
      return documents.find(d => d.category === 'Thesis Defense' && d.name.toLowerCase().includes('presentation'))
    }
    if (docName === 'Final Corrected Thesis') {
      return documents.find(d => d.category === 'Thesis Defense' && d.name.toLowerCase().includes('corrected') && d.name.toLowerCase().includes('thesis')) ||
             documents.find(d => d.name === 'Final Thesis.pdf')
    }
    if (docName === 'Final Corrected Synopsis') {
      return documents.find(d => d.category === 'Thesis Defense' && d.name.toLowerCase().includes('corrected') && d.name.toLowerCase().includes('synopsis'))
    }
    return documents.find(d => d.category === category && d.name.toLowerCase().includes(docName.toLowerCase().split(' ')[0]))
  }

  const stages = [
    {
      id: 1,
      title: 'Draft Thesis Submission',
      status: 'Completed',
      date: '10 May 2026',
      description: 'Following successful completion of the Colloquium, the scholar submits the Draft Thesis and Draft Synopsis through the Research Supervisor to the Research & Innovation Office. The Research Office verifies that publication requirements and indexing criteria are satisfied before forwarding the documents to the Inch Committee for review.',
      uploads: [
        { name: 'Draft Thesis', category: 'Inch Committee' },
        { name: 'Draft Synopsis', category: 'Inch Committee' }
      ]
    },
    {
      id: 2,
      title: 'Format Verification',
      status: 'Completed',
      date: '18 May 2026',
      description: 'The Inch Committee performs a detailed formatting review of the thesis and synopsis based on university guidelines. The review includes:',
      bullets: [
        'Thesis structure and layout consistency',
        'Citation and referencing standards',
        'Bibliography verification',
        'Table of Contents validation',
        'List of Figures and List of Tables verification',
        'Page numbering sequence',
        'Chapter formatting compliance',
        'Caption and heading consistency'
      ],
      details: [
        { label: 'Status', value: 'Format Adheres to DSU Standards' },
        { label: 'Verified By', value: 'Research Office' },
        { label: 'Prescribed Timeline', value: 'Completed within timeline' }
      ]
    },
    {
      id: 3,
      title: 'Inch Committee Review',
      status: 'In Progress',
      date: '12 Jun 2026',
      description: 'If formatting issues are identified, the scholar must revise the thesis and synopsis and resubmit them for verification. The review cycle continues until all formatting requirements are satisfied and approval is granted.',
      uploads: [
        { name: 'Revised Thesis', category: 'Inch Committee' }
      ]
    },
    {
      id: 4,
      title: 'Thesis Evaluation',
      status: 'Pending',
      date: '',
      description: 'The approved thesis is forwarded to selected external examiners for evaluation. The thesis is securely shared with the appointed examiners for detailed review.',
      details: [
        { label: 'Indian Examiner', value: 'Awaiting Panel Dispatch' },
        { label: 'International Examiner', value: 'Awaiting Panel Dispatch' }
      ]
    },
    {
      id: 5,
      title: 'Examiner Reports',
      status: 'Pending',
      date: '',
      description: 'Examiners assess the thesis and submit evaluation reports containing:',
      bullets: [
        'Research quality assessment',
        'Originality of work',
        'Technical contribution',
        'Suggested corrections',
        'Final recommendation'
      ],
      outcomes: [
        { title: 'Recommended by All Examiners', desc: 'The scholar becomes eligible to proceed to the Thesis Defense.' },
        { title: 'Revision Required', desc: 'The scholar must incorporate corrections and resubmit the revised thesis for further evaluation.' },
        { title: 'Additional Evaluation Required', desc: 'An additional examiner may be appointed if recommendations differ significantly.' },
        { title: 'Not Recommended', desc: 'The thesis is returned based on university regulations and evaluation policies.' }
      ]
    },
    {
      id: 6,
      title: 'Thesis Defense',
      status: 'Pending',
      date: '',
      description: 'After successful thesis evaluation, an Oral Examination Board is constituted. The board typically includes:',
      bullets: [
        'Dean (Research)',
        'School Dean',
        'External Examiner',
        'Research Supervisor',
        'Co-Supervisor (if applicable)'
      ]
    },
    {
      id: 7,
      title: 'Final Thesis Submission',
      status: 'Pending',
      date: '',
      description: 'The scholar presents the research work before the Oral Examination Board. The defense includes:',
      bullets: [
        'Research presentation',
        'Demonstration of contributions',
        'Technical discussion',
        'Question and Answer session',
        'Evaluation by board members'
      ],
      uploads: [
        { name: 'Final Defense Presentation', category: 'Thesis Defense' },
        { name: 'Final Corrected Thesis', category: 'Thesis Defense' },
        { name: 'Final Corrected Synopsis', category: 'Thesis Defense' }
      ]
    },
    {
      id: 8,
      title: 'Degree Award Status',
      status: 'Pending',
      date: '',
      description: 'Upon successful completion of the defense:',
      bullets: [
        'Final corrections are incorporated',
        'Final thesis copy is submitted',
        'Thesis is archived in the university repository',
        'Degree recommendation is processed',
        'Scholar status is updated to Completed'
      ],
      details: [
        { label: 'Scholar Status', value: 'Active Scholar (Thesis Stage)' }
      ]
    }
  ]

  return (
    <div className="space-y-6 pb-12">
      {/* Header section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 font-semibold">PhD Work Progress</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Thesis Management</h1>
            <p className="mt-1 text-sm text-slate-500">Tracks final thesis submission, committee evaluation reports, oral defense, and degree award status.</p>
          </div>
          <div className="bg-dsu-maroon/5 px-4 py-2.5 rounded-2xl text-xs font-bold text-dsu-maroon border border-dsu-maroon/10 tracking-wider">
            DSU RESEARCH & INNOVATION PROCESS
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-2.5">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700">Overall Thesis Progress</span>
              <span className="text-dsu-maroon font-bold">{initialThesisOverview.progressPercent}%</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-0.5 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-dsu-maroon to-dsu-gold rounded-full transition-all duration-500 relative" 
                style={{ width: `${initialThesisOverview.progressPercent}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 shadow-sm">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Current Stage</p>
              <p className="mt-1.5 text-sm font-extrabold text-dsu-gold truncate">{initialThesisOverview.currentStage}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 shadow-sm">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Last Updated</p>
              <p className="mt-1.5 text-sm font-extrabold text-slate-800">{initialThesisOverview.lastUpdated}</p>
            </div>
          </div>
        </div>

        {/* Action item alert box */}
        <div className="mt-6 p-4 bg-amber-50/50 border border-amber-200/30 rounded-2xl flex items-start gap-3 text-sm text-amber-800">
          <AlertCircle className="h-5 w-5 text-dsu-gold shrink-0 mt-0.5 animate-bounce" />
          <div>
            <span className="font-bold">Expected Next Action:</span> {initialThesisOverview.expectedNextAction}
          </div>
        </div>
      </div>

      {/* Timeline stages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Timeline Columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="h-5 w-5 text-dsu-maroon" />
                Thesis Workflow Timeline
              </h2>
              <span className="text-xs text-slate-400 font-medium">8 Stages to Degree Completion</span>
            </div>

            {/* Vertical timeline stepper */}
            <div className="relative pl-6 sm:pl-10 space-y-8">
              {/* Central vertical line */}
              <div className="absolute left-10 sm:left-14 top-4 bottom-4 w-0.5 bg-slate-100" />

              {stages.map((stage) => {
                const isCompleted = stage.status === 'Completed'
                const isInProgress = stage.status === 'In Progress'
                const isPending = stage.status === 'Pending'

                return (
                  <div key={stage.id} className="relative group transition-all duration-300">
                    {/* Circle indicators */}
                    <div 
                      className={`absolute -left-12 sm:-left-16 top-1 transform -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 z-10 
                        ${isCompleted ? 'bg-dsu-maroon border-dsu-maroon text-white ring-4 ring-dsu-maroon/15 shadow-md shadow-dsu-maroon/20' : ''}
                        ${isInProgress ? 'bg-dsu-gold border-dsu-gold text-white ring-4 ring-dsu-gold/25 animate-pulse shadow-md shadow-dsu-gold/20' : ''}
                        ${isPending ? 'bg-white border-slate-200 text-slate-400' : ''}
                      `}
                    >
                      {isCompleted && <Check className="h-4.5 w-4.5" />}
                      {isInProgress && <Hourglass className="h-4.5 w-4.5" />}
                      {isPending && <span>0{stage.id}</span>}
                    </div>

                    {/* Step Card Content */}
                    <div 
                      className={`rounded-2xl border p-5 transition-all duration-300 bg-white
                        ${isCompleted ? 'border-slate-200 shadow-xs hover:shadow-md' : ''}
                        ${isInProgress ? 'border-dsu-gold ring-1 ring-dsu-gold/30 shadow-md' : ''}
                        ${isPending ? 'border-slate-150 bg-slate-50/40 text-slate-500 opacity-80' : ''}
                      `}
                    >
                      {/* Card Header row */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                        <h3 className={`font-bold text-base leading-tight ${isPending ? 'text-slate-700' : 'text-slate-900'}`}>
                          {stage.id}. {stage.title}
                        </h3>
                        <div className="flex items-center gap-2.5">
                          {stage.date && (
                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {stage.date}
                            </span>
                          )}
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            isCompleted ? 'bg-dsu-maroon text-white' : isInProgress ? 'bg-dsu-gold text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}>
                            {stage.status}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`text-sm leading-relaxed mb-4 ${isPending ? 'text-slate-500' : 'text-slate-655'}`}>
                        {stage.description}
                      </p>

                      {/* Bullet list if exists */}
                      {stage.bullets && stage.bullets.length > 0 && (
                        <ul className="list-disc pl-5 mb-4 space-y-1 text-xs text-slate-600">
                          {stage.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}

                      {/* Outcomes if exists */}
                      {stage.outcomes && stage.outcomes.length > 0 && (
                        <div className="mb-4 space-y-2.5 text-xs text-slate-600">
                          <p className="font-bold text-slate-800">Possible outcomes include:</p>
                          <ul className="list-disc pl-5 space-y-2">
                            {stage.outcomes.map((o, idx) => (
                              <li key={idx}>
                                <strong className="text-slate-700">{o.title}</strong>
                                <p className="text-[11px] text-slate-500 font-medium mt-0.5">{o.desc}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Text details */}
                      {stage.details && stage.details.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                          {stage.details.map((det, idx) => (
                            <div key={idx} className="bg-slate-50/70 p-2.5 rounded-xl border border-slate-100 flex flex-col justify-between">
                              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">{det.label}</span>
                              <span className="text-xs font-semibold text-slate-800 mt-1">{det.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Upload requirements */}
                      {stage.uploads && stage.uploads.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                          {stage.uploads.map((up, idx) => {
                            const file = getUploadedFile(up.name, up.category)
                            const isUploaded = !!file

                            return (
                              <div key={idx} className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
                                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Requirement</span>
                                <p className="text-xs font-bold text-slate-900 mt-1">{up.name}</p>
                                
                                {isUploaded ? (
                                  <div className="mt-2 flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-slate-100">
                                    <span className="text-xs font-semibold text-slate-800 truncate max-w-[120px]" title={file.name}>
                                      {file.name}
                                    </span>
                                    <button 
                                      onClick={() => alert(`Downloading: ${file.name}`)}
                                      className="text-[10px] font-bold text-dsu-maroon hover:underline shrink-0"
                                    >
                                      Download
                                    </button>
                                  </div>
                                ) : (
                                  <label className="mt-2 text-center text-xs font-bold text-white bg-dsu-maroon hover:bg-red-800 rounded-lg py-1.5 px-3 cursor-pointer transition flex items-center justify-center gap-1.5">
                                    <UploadCloud className="h-3.5 w-3.5" />
                                    Upload File
                                    <input 
                                      type="file"
                                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                                      disabled={isPending}
                                      onChange={(e) => handleUpload(up.name, up.category, e)}
                                      className="hidden"
                                    />
                                  </label>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar helpdesk */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              Office of Research
            </h3>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Have questions regarding Pre-Synopsis structure, formatting checklist, similarity indexes, or examiner dispatch? Reach out.
            </p>
            <div className="mt-4 space-y-2 text-xs">
              <p>Email: <strong className="text-slate-800">research@dsuniversity.ac.in</strong></p>
              <p>Contact: <strong className="text-slate-800">+91 4362 282828</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
