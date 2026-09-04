import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UploadCloud, CheckCircle2, AlertCircle, FileText, ArrowLeft, Download, Eye } from 'lucide-react'
import { mockDocuments } from '../data/documentsData'

const REQUIRED_DOCUMENTS = [
  { key: 'parent_affidavit', name: 'Parent Affidavit', required: true },
  { key: 'scholar_affidavit', name: 'Scholar Affidavit', required: true },
  { key: 'sslc_cert', name: 'SSLC Certificate', required: true },
  { key: 'hsc_cert', name: 'HSC Certificate', required: true },
  { key: 'ug_cert', name: 'UG Certificate', required: true },
  { key: 'pg_cert', name: 'PG Certificate', required: true },
  { key: 'photo', name: 'Photograph', required: true },
  { key: 'signature', name: 'Signature', required: true },
  { key: 'proposal', name: 'Research Proposal', required: true },
  { key: 'fee_receipt', name: 'Fee Receipt', required: true },
  { key: 'joining_report', name: 'Joining Report', required: true },
  { key: 'employer_noc', name: 'Employer NOC', required: false }
]

export default function Admission() {
  const [documents, setDocuments] = useState([])

  // Load documents from localStorage or initialize
  useEffect(() => {
    const saved = localStorage.getItem('dsu_documents')
    if (saved) {
      try {
        setDocuments(JSON.parse(saved))
      } catch (e) {
        setDocuments(mockDocuments)
        localStorage.setItem('dsu_documents', JSON.stringify(mockDocuments))
      }
    } else {
      setDocuments(mockDocuments)
      localStorage.setItem('dsu_documents', JSON.stringify(mockDocuments))
    }
  }, [])

  const handleUpload = (docName, event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const newDoc = {
      id: 'd_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      name: file.name,
      category: 'Admission',
      uploadedBy: 'Scholar (Priya R)',
      uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
      fileType: file.name.split('.').pop().toUpperCase(),
      status: 'Pending',
      versions: [
        {
          version: 'v1.0',
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
          author: 'Scholar',
          remarks: `Uploaded ${docName} during scholar onboarding.`
        }
      ]
    }

    const updated = [...documents, newDoc]
    setDocuments(updated)
    localStorage.setItem('dsu_documents', JSON.stringify(updated))
    alert(`Successfully uploaded "${file.name}" for ${docName}!`)
  }

  // Find if a specific document type has been uploaded
  // We can match by suffix or file prefix, but an easy way is matching keywords or tracking key fields.
  // To make it look extremely clean, let's match if the mock/uploaded document name matches the expected type
  const getUploadedFile = (docName) => {
    // If it's a default mock doc
    if (docName === 'SSLC Certificate') {
      return documents.find(d => d.name.toLowerCase().includes('sslc') || d.name === 'SSLC_Certificate_Priya.pdf')
    }
    if (docName === 'PhD Admission Order' || docName === 'Parent Affidavit' || docName === 'Scholar Affidavit' || docName === 'HSC Certificate' || docName === 'UG Certificate' || docName === 'PG Certificate' || docName === 'Photograph' || docName === 'Signature' || docName === 'Research Proposal' || docName === 'Fee Receipt' || docName === 'Joining Report' || docName === 'Employer NOC') {
      return documents.find(d => d.name.toLowerCase().includes(docName.toLowerCase().replace(' ', '_')))
    }
    // General fallback mapping
    return documents.find(d => d.category === 'Admission' && d.name.toLowerCase().includes(docName.toLowerCase().split(' ')[0]))
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link to="/profile" className="inline-flex items-center gap-1 text-xs font-bold text-dsu-maroon hover:underline mb-2">
              <ArrowLeft className="h-3 w-3" />
              Back to Profile
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Admission Documents</h1>
            <p className="mt-1 text-sm text-slate-500">
              Upload and manage your official registration documents. Once uploaded, documents are automatically archived in the central repository for verification.
            </p>
          </div>
          <div className="bg-emerald-50 px-4 py-2.5 rounded-2xl text-xs font-bold text-emerald-700 border border-emerald-100 tracking-wider">
            ADMISSION VERIFIED
          </div>
        </div>
      </div>

      {/* Upload cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REQUIRED_DOCUMENTS.map((doc) => {
          // Check if we already have it in repository
          const uploadedFile = getUploadedFile(doc.name)
          const isUploaded = !!uploadedFile

          return (
            <div 
              key={doc.key} 
              className={`bg-white rounded-3xl border p-5 transition duration-300 flex flex-col justify-between h-56
                ${isUploaded ? 'border-slate-200 shadow-sm' : 'border-dashed border-slate-350 hover:border-dsu-maroon/50 shadow-inner'}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {doc.required ? 'Mandatory Document' : 'Optional Document'}
                  </span>
                  {isUploaded ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-100">
                      <CheckCircle2 className="h-3 w-3" />
                      {uploadedFile.status}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-150 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                      Pending
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-base font-extrabold text-slate-950">{doc.name}</h3>

                {isUploaded ? (
                  <div className="mt-3 bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex items-center gap-2">
                    <FileText className="h-5 w-5 text-dsu-maroon shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-800 truncate" title={uploadedFile.name}>{uploadedFile.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Uploaded on {uploadedFile.uploadDate}</p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-slate-400 leading-normal">
                    Please upload a valid PDF or image file. File size must not exceed 5MB.
                  </p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                {isUploaded ? (
                  <div className="flex items-center gap-2 w-full">
                    <button 
                      onClick={() => alert(`Opening viewer for: ${uploadedFile.name}`)}
                      className="flex-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl py-2 px-3 transition flex items-center justify-center gap-1"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </button>
                    <button 
                      onClick={() => alert(`Downloading: ${uploadedFile.name}`)}
                      className="flex-1 text-xs font-bold text-dsu-maroon bg-dsu-maroon/5 hover:bg-dsu-maroon/10 border border-dsu-maroon/20 rounded-xl py-2 px-3 transition flex items-center justify-center gap-1"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                ) : (
                  <label className="w-full text-center text-xs font-bold text-white bg-dsu-maroon hover:bg-red-800 rounded-xl py-2.5 px-4 cursor-pointer transition flex items-center justify-center gap-2">
                    <UploadCloud className="h-4 w-4" />
                    Upload File
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg,.jpeg" 
                      onChange={(e) => handleUpload(doc.name, e)} 
                      className="hidden" 
                    />
                  </label>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
