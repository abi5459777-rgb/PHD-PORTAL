import React, { useState, useEffect } from 'react'
import { 
  FileText, UploadCloud, CheckCircle2, Award, BookOpen, 
  ExternalLink, Eye, Download, Search, Plus, Calendar, Settings
} from 'lucide-react'

// Mock Data
const initialStats = {
  citations: 28,
  hIndex: 3,
  i10Index: 1,
  scopusCount: 2,
  wosCount: 1
}

const initialPublications = [
  {
    id: 1,
    title: 'Secure AI-Driven Edge Computing in Intelligent Smart Healthcare Networks',
    type: 'Journal',
    venue: 'IEEE Transactions on Network and Service Management',
    publisher: 'IEEE',
    date: '12 Jan 2026',
    doi: '10.1109/TNSM.2026.10398',
    indexing: 'Scopus & Web of Science',
    status: 'Verified',
    proofName: 'ieee_tnsm_paper_proof.pdf'
  },
  {
    id: 2,
    title: 'Blockchain-Based Distributed Ledger Solutions for Healthcare Data Access Audit Logs',
    type: 'Conference',
    venue: 'IEEE International Conference on Advanced Communications (ICAC 2026)',
    publisher: 'IEEE',
    date: '10 Feb 2026',
    doi: '10.1109/ICAC.2026.23019',
    indexing: 'Scopus Indexed',
    status: 'Verified',
    proofName: 'ieee_icac_conference_proof.pdf'
  },
  {
    id: 3,
    title: 'A Method and System for Real-Time Secure Cloud-IoT Smart ECG Transmission',
    type: 'Patent',
    venue: 'Indian Patent Office (Application No. 202641010342 A)',
    publisher: 'IPO India',
    date: '28 May 2026',
    doi: 'TEMP-PAT-202641',
    indexing: 'Published',
    status: 'Under Audit',
    proofName: 'patent_application_receipt.pdf'
  }
]

export default function Publications() {
  const [publications, setPublications] = useState(initialPublications)
  const [documents, setDocuments] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)

  // Add form fields
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Journal')
  const [venue, setVenue] = useState('')
  const [publisher, setPublisher] = useState('')
  const [doi, setDoi] = useState('')
  const [indexing, setIndexing] = useState('Scopus Indexed')

  useEffect(() => {
    const saved = localStorage.getItem('dsu_documents')
    if (saved) {
      try {
        setDocuments(JSON.parse(saved))
      } catch (e) {}
    }
  }, [])

  const handleProofUpload = (pubId, event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setPublications(publications.map(pub => {
      if (pub.id === pubId) {
        return { ...pub, proofName: file.name, status: 'Under Audit' }
      }
      return pub
    }))

    alert(`Uploaded proof document "${file.name}" successfully for verification!`)
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!title || !venue) return

    const newPub = {
      id: Date.now(),
      title,
      type,
      venue,
      publisher,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
      doi: doi || 'N/A',
      indexing,
      status: 'Awaiting Proof Upload',
      proofName: ''
    }

    setPublications([...publications, newPub])
    setShowAddForm(false)
    setTitle('')
    setVenue('')
    setPublisher('')
    setDoi('')
    alert('Publication details added! Please upload verification proof in the checklist.')
  }

  const journalCount = publications.filter(p => p.type === 'Journal').length
  const conferenceCount = publications.filter(p => p.type === 'Conference').length
  const patentCount = publications.filter(p => p.type === 'Patent').length
  const chapterCount = publications.filter(p => p.type === 'Book Chapter').length

  return (
    <div className="space-y-6 pb-12">
      {/* Header Panel */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 font-semibold">PhD Stage 4</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Publications</h1>
            <p className="mt-2 text-sm text-slate-500">
              <strong>Purpose:</strong> Track publications required for PhD completion.
            </p>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#7B1E3A] hover:bg-red-800 text-white text-xs font-bold uppercase py-3 px-5 rounded-2xl transition duration-150 flex items-center gap-1.5 shadow-md"
          >
            <Plus className="h-4 w-4" />
            Add Publication
          </button>
        </div>

        {/* Phase Outputs Summary */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">Target Outputs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-dsu-maroon shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase">Publication Compliance Status</h4>
                <p className="text-xs text-slate-900 font-semibold mt-1">Status: COMPLIANT (Minimum 2 Scopus/WoS Papers Verified)</p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex items-start gap-3">
              <Award className="h-5 w-5 text-dsu-maroon shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase">Research Impact Summary</h4>
                <p className="text-xs text-slate-900 font-semibold mt-1">Citations: {initialStats.citations} • h-index: {initialStats.hIndex} • Web of Science papers: {initialStats.wosCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Breakdown */}
      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Journals</span>
          <p className="text-2xl font-bold text-[#7B1E3A] mt-2">{journalCount}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Conferences</span>
          <p className="text-2xl font-bold text-[#7B1E3A] mt-2">{conferenceCount}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patents</span>
          <p className="text-2xl font-bold text-[#7B1E3A] mt-2">{patentCount}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Book Chapters</span>
          <p className="text-2xl font-bold text-[#7B1E3A] mt-2">{chapterCount}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scopus Papers</span>
          <p className="text-2xl font-bold text-emerald-700 mt-2">{initialStats.scopusCount}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WoS Papers</span>
          <p className="text-2xl font-bold text-emerald-700 mt-2">{initialStats.wosCount}</p>
        </div>
      </section>

      {/* Add Publication Modal/Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider border-b pb-2">Add New Publication Record</h3>
          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
            <div>
              <label className="block mb-1">Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Full title of paper/patent" className="w-full border p-2 rounded-xl bg-slate-50" required />
            </div>
            <div>
              <label className="block mb-1">Publication Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border p-2.5 rounded-xl bg-slate-50">
                <option value="Journal">Journal Publication</option>
                <option value="Conference">Conference Publication</option>
                <option value="Patent">Patent</option>
                <option value="Book Chapter">Book Chapter</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Journal/Conference/Patent Office Name</label>
              <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="e.g. IEEE Transactions, Indian Patent Office" className="w-full border p-2 rounded-xl bg-slate-50" required />
            </div>
            <div>
              <label className="block mb-1">Publisher</label>
              <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="e.g. IEEE, Springer, Elsevier" className="w-full border p-2 rounded-xl bg-slate-50" />
            </div>
            <div>
              <label className="block mb-1">DOI / Application Number</label>
              <input type="text" value={doi} onChange={(e) => setDoi(e.target.value)} placeholder="e.g. 10.1109/..." className="w-full border p-2 rounded-xl bg-slate-50" />
            </div>
            <div>
              <label className="block mb-1">Indexing Status</label>
              <select value={indexing} onChange={(e) => setIndexing(e.target.value)} className="w-full border p-2.5 rounded-xl bg-slate-50">
                <option value="Scopus & Web of Science">Scopus & Web of Science</option>
                <option value="Scopus Indexed">Scopus Indexed Only</option>
                <option value="Web of Science Indexed">Web of Science Only</option>
                <option value="Published (Patent)">Patent Published</option>
                <option value="Non-Indexed">Non-Indexed</option>
              </select>
            </div>
            <div className="md:col-span-3 flex justify-end gap-2 pt-2 border-t">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 border rounded-xl text-slate-600 hover:bg-slate-50">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-dsu-maroon text-white rounded-xl hover:bg-red-800 transition">Save Publication</button>
            </div>
          </form>
        </div>
      )}

      {/* Main Publications Table List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-dsu-maroon" />
          Publication Verification Tracker & Records
        </h2>
        <div className="overflow-x-auto mt-4 rounded-2xl border border-slate-150">
          <table className="min-w-full divide-y divide-slate-150 text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold tracking-wider">
              <tr>
                <th className="px-4 py-3">Title Details</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Journal / Conference / Patent Office</th>
                <th className="px-4 py-3 font-semibold">DOI Details</th>
                <th className="px-4 py-3">Indexing</th>
                <th className="px-4 py-3">Verification Status</th>
                <th className="px-4 py-3 text-right">Proof Upload & Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 bg-white font-medium text-slate-800">
              {publications.map((pub) => (
                <tr key={pub.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3.5 max-w-sm">
                    <p className="font-extrabold text-slate-950 leading-normal">{pub.title}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Added on {pub.date}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 font-bold text-slate-700">
                      {pub.type}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-slate-900">{pub.venue}</p>
                    <p className="text-[10px] text-slate-450 mt-0.5">{pub.publisher}</p>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[10px] font-bold text-slate-600 select-all">
                    {pub.doi}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-emerald-800">
                    {pub.indexing}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex rounded px-2.5 py-0.5 font-bold border ${
                      pub.status === 'Verified' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {pub.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right space-y-2">
                    {pub.proofName ? (
                      <div className="flex justify-end items-center gap-2 text-[10px]">
                        <span className="text-slate-450 truncate max-w-[100px] font-bold" title={pub.proofName}>{pub.proofName}</span>
                        <button 
                          onClick={() => alert(`Downloading: ${pub.proofName}`)}
                          className="p-1.5 text-dsu-maroon bg-dsu-maroon/5 border border-dsu-maroon/20 rounded font-black hover:underline"
                        >
                          Download
                        </button>
                      </div>
                    ) : (
                      <label className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-dsu-maroon hover:bg-red-800 rounded py-1.5 px-2.5 cursor-pointer transition">
                        <UploadCloud className="h-3 w-3" /> Upload Proof
                        <input type="file" accept=".pdf" onChange={(e) => handleProofUpload(pub.id, e)} className="hidden" />
                      </label>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
