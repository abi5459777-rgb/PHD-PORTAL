import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationsList from '../components/NotificationsList'
import { useScholarData } from '../hooks/useFetchMock'
import { Search, X, Check } from 'lucide-react'

export default function Notifications() {
  const role = localStorage.getItem('user_role') || 'scholar'
  const navigate = useNavigate()
  const { notifications: scholarNotifications, loading } = useScholarData()

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('dsu_dean_school_notifications')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {}
    }
    const initial = [
      { id: 'n-ds-1', date: '15-Jun-2026', guide: 'Dr. Kumar', scholar: 'Arun Kumar', approval: 'First DAC Approval', type: 'dac', topic: 'Optimization of Wind Turbine Blades' },
      { id: 'n-ds-2', date: '16-Jun-2026', guide: 'Dr. Priya', scholar: 'Karthik S', approval: 'Comprehensive Viva Approval', type: 'viva', dateStr: '2026-06-26' },
      { id: 'n-ds-3', date: '17-Jun-2026', guide: 'Dr. Ravi', scholar: 'Deepa R', approval: 'Colloquium Approval', type: 'colloquium', topic: 'Aerodynamic Modeling' },
      { id: 'n-ds-4', date: '18-Jun-2026', guide: 'Dr. Kumar', scholar: 'Naveen M', approval: 'Inch Committee Approval', type: 'inch', docType: 'Pre-Synopsis Thesis Draft' },
      { id: 'n-ds-5', date: '19-Jun-2026', guide: 'Dr. Priya', scholar: 'Akash V', approval: 'Synopsis Approval', type: 'synopsis', topic: 'Aerodynamic Modeling' },
      { id: 'n-ds-6', date: '20-Jun-2026', guide: 'Dr. Ravi', scholar: 'Harini K', approval: 'Oral Viva Voce Approval', type: 'viva', dateStr: '2026-07-02' }
    ]
    localStorage.setItem('dsu_dean_school_notifications', JSON.stringify(initial))
    return initial
  })

  const [deanNotifications, setDeanNotifications] = useState(() => {
    const saved = localStorage.getItem('dsu_dean_notifications')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {}
    }
    const initial = [
      { id: 'n-dr-1', date: '30-Jun-2026', school: 'School of Engineering', guide: 'Dr. Ravi', scholar: 'Deepa R', event: 'Comprehensive Viva', approval: 'MoM Approval' },
      { id: 'n-dr-2', date: '28-Jun-2026', school: 'School of Computing', guide: 'Dr. Kumar', scholar: 'Arun Kumar', event: 'First DAC', approval: 'MoM Approval' },
      { id: 'n-dr-3', date: '26-Jun-2026', school: 'School of Engineering', guide: 'Dr. Priya', scholar: 'Meera S', event: 'Thesis Defense', approval: 'Thesis Defense Approval' },
      { id: 'n-dr-4', date: '24-Jun-2026', school: 'School of Computing', guide: 'Dr. Ravi', scholar: 'Harini K', event: 'Synopsis', approval: 'Synopsis Approval' },
      { id: 'n-dr-5', date: '22-Jun-2026', school: 'School of Science', guide: 'Dr. Kumar', scholar: 'Naveen M', event: 'Inch Committee', approval: 'Inch Committee Approval' },
      { id: 'n-dr-6', date: '20-Jun-2026', school: 'School of Computing', guide: 'Dr. Priya', scholar: 'Akash V', event: 'Colloquium', approval: 'Colloquium Approval' },
      { id: 'n-dr-7', date: '18-Jun-2026', school: 'School of Engineering', guide: 'Dr. Ravi', scholar: 'Deepa R', event: 'Comprehensive Viva', approval: 'Comprehensive Viva Approval' },
      { id: 'n-dr-8', date: '15-Jun-2026', school: 'School of Computing', guide: 'Dr. Kumar', scholar: 'Arun Kumar', event: 'First DAC', approval: 'First DAC Approval' }
    ]
    localStorage.setItem('dsu_dean_notifications', JSON.stringify(initial))
    return initial
  })

  const [vcNotifications, setVcNotifications] = useState(() => {
    const saved = localStorage.getItem('dsu_vc_notifications')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {}
    }
    const initial = [
      { id: 'n-vc-1', date: '15-Jun-2026', school: 'School of Computing', department: 'CSE', guide: 'Dr. Kumar', scholar: 'Arun Kumar', approval: 'Examiner Panel Approval', status: 'Pending' },
      { id: 'n-vc-2', date: '18-Jun-2026', school: 'School of Engineering', department: 'ECE', guide: 'Dr. Ravi', scholar: 'Meera S', approval: 'Thesis Evaluation Approval', status: 'Pending' },
      { id: 'n-vc-3', date: '22-Jun-2026', school: 'School of Management', department: 'MBA', guide: 'Dr. Priya', scholar: 'Deepa R', approval: 'Final PhD Approval', status: 'Pending' }
    ]
    localStorage.setItem('dsu_vc_notifications', JSON.stringify(initial))
    return initial
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNotif, setSelectedNotif] = useState(null)

  useEffect(() => {
    const syncNotifs = () => {
      const savedDS = localStorage.getItem('dsu_dean_school_notifications')
      if (savedDS) {
        try { setNotifications(JSON.parse(savedDS)) } catch(e){}
      }
      const savedD = localStorage.getItem('dsu_dean_notifications')
      if (savedD) {
        try { setDeanNotifications(JSON.parse(savedD)) } catch(e){}
      }
      const savedVC = localStorage.getItem('dsu_vc_notifications')
      if (savedVC) {
        try { setVcNotifications(JSON.parse(savedVC)) } catch(e){}
      }
    }
    window.addEventListener('notifications_updated', syncNotifs)
    window.addEventListener('storage', syncNotifs)
    return () => {
      window.removeEventListener('notifications_updated', syncNotifs)
      window.removeEventListener('storage', syncNotifs)
    }
  }, [])

  // 1. Scholar Notifications View (STAYS 100% UNCHANGED)
  if (role === 'scholar') {
    if (loading) return <div className="p-4 text-xs font-bold text-slate-500">Loading notifications...</div>
    return (
      <div>
        <NotificationsList items={scholarNotifications} />
      </div>
    )
  }

  // 1a. Registrar Notifications View
  if (role === 'registrar') {
    // 1. Load pending registrations
    const savedReg = localStorage.getItem('dsu_registrar_registrations')
    const regs = savedReg ? JSON.parse(savedReg) : []
    const pendingRegs = regs.filter(r => r.status === 'Pending Verification').map(r => ({
      date: r.applicationDate || '10-Jun-2026',
      scholarName: r.scholarName,
      school: r.school,
      department: r.department,
      type: 'Registration Approval',
      view: 'registration',
      key: `reg-${r.id}`
    }))

    // 2. Load pending enrollments
    const savedEnroll = localStorage.getItem('dsu_registrar_enrollments')
    const enrolls = savedEnroll ? JSON.parse(savedEnroll) : []
    const pendingEnrolls = enrolls.filter(e => e.status === 'Pending Confirmation').map(e => ({
      date: e.enrollmentDate || '15-Jun-2026',
      scholarName: e.scholarName,
      school: e.school,
      department: e.department,
      type: 'Enrollment Confirmation',
      view: 'enrollment',
      key: `enroll-${e.id}`
    }))

    // 3. Load pending academic records
    const savedRec = localStorage.getItem('dsu_registrar_academic_records')
    const recs = savedRec ? JSON.parse(savedRec) : []
    const pendingRecs = recs.filter(r => r.status === 'Pending Verification').map(r => ({
      date: '11-Jun-2026',
      scholarName: r.scholarName,
      school: r.school,
      department: r.department,
      type: 'Academic Records',
      view: 'records',
      key: `record-${r.id}`
    }))

    // 4. Load pending degrees
    const savedDeg = localStorage.getItem('dsu_registrar_degrees')
    const degs = savedDeg ? JSON.parse(savedDeg) : []
    const pendingDegs = degs.filter(d => d.degreeStatus === 'Pending Verification').map(d => ({
      date: d.submissionDate || '18-May-2026',
      scholarName: d.scholarName,
      school: d.school,
      department: d.department,
      type: 'Degree Processing',
      view: 'degree',
      key: `degree-${d.id}`
    }))

    // 5. Load pending awards
    const savedAwd = localStorage.getItem('dsu_registrar_awards')
    const awds = savedAwd ? JSON.parse(savedAwd) : []
    const pendingAwds = awds.filter(a => a.awardStatus === 'Pending Documentation').map(a => ({
      date: a.finalApprovalDate || '22-Jun-2026',
      scholarName: a.scholarName,
      school: a.school,
      department: a.department,
      type: 'Award Documentation',
      view: 'award',
      key: `award-${a.id}`
    }))

    // Combine all pending requests
    const allPending = [
      ...pendingRegs,
      ...pendingEnrolls,
      ...pendingRecs,
      ...pendingDegs,
      ...pendingAwds
    ]

    // Date Parser Helper for Sorting
    const parseDateStr = (dateStr) => {
      const parts = dateStr.split('-')
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10)
        const monthNames = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
        const month = monthNames[parts[1]] || 0
        const year = parseInt(parts[2], 10)
        return new Date(year, month, day)
      }
      return new Date(0)
    }

    // Sort by latest first
    const sortedNotifs = allPending.sort((a, b) => parseDateStr(b.date) - parseDateStr(a.date))

    // Apply search filter
    const filteredNotifs = sortedNotifs.filter(n =>
      n.scholarName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.type.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Notifications</p>
            <div className="flex items-center gap-2 mt-2">
              <h1 className="text-2xl font-black text-dsu-maroon uppercase tracking-wide">
                Registrar Registry Notifications
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#7B1E3A] text-white border border-[#7B1E3A]/20">
                {sortedNotifs.length} Pending
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500 font-semibold">
              Review and act on pending academic and degree administration requests.
            </p>
          </div>
        </header>

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
          {/* Search Bar */}
          <div className="flex justify-end">
            <div className="relative w-full sm:w-64">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, school, type..."
                className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-slate-800 outline-none focus:border-[#7B1E3A] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
            <table className="min-w-full text-left text-xs text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Scholar Name</th>
                  <th className="p-4">School</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Request Type</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {filteredNotifs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-400 font-semibold">
                      No pending administrative requests.
                    </td>
                  </tr>
                ) : (
                  filteredNotifs.map((item, idx) => (
                    <tr key={item.key} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 text-slate-500 font-bold">{item.date}</td>
                      <td className="p-4 font-black text-dsu-maroon">{item.scholarName}</td>
                      <td className="p-4 text-slate-700">{item.school}</td>
                      <td className="p-4 text-slate-700">{item.department}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10 font-bold uppercase text-[9px] tracking-wider">
                          {item.type}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            navigate(`/dashboard?view=${item.view}&scholarName=${item.scholarName}`)
                          }}
                          className="px-3.5 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider transition shadow-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    )
  }

  // 1a-2. Research & Innovation (R&I) Notifications View
  if (role === 'ri_office') {
    // 1. Load pending applications
    const savedApp = localStorage.getItem('dsu_ri_applications')
    const apps = savedApp ? JSON.parse(savedApp) : []
    const pendingApps = apps.filter(a => a.status === 'Pending').map(a => ({
      date: a.submissionDate || '20-Jun-2026',
      scholarName: a.scholarName,
      school: a.school,
      department: a.department,
      type: 'Application Verification',
      status: a.status,
      view: 'application',
      key: `app-${a.id}`
    }))

    // 2. Load pending documents
    const savedDoc = localStorage.getItem('dsu_ri_original_docs')
    const docs = savedDoc ? JSON.parse(savedDoc) : []
    const pendingDocs = docs.filter(d => d.status === 'Pending').map(d => ({
      date: d.submissionDate || '21-Jun-2026',
      scholarName: d.scholarName,
      school: d.school,
      department: d.department,
      type: 'Document Verification',
      status: d.status,
      view: 'document',
      key: `doc-${d.id}`
    }))

    // 3. Load pending publications
    const savedPub = localStorage.getItem('dsu_ri_publications')
    const pubs = savedPub ? JSON.parse(savedPub) : []
    const pendingPubs = pubs.filter(p => p.status === 'Pending').map(p => ({
      date: p.submissionDate || '22-Jun-2026',
      scholarName: p.scholarName,
      school: p.school,
      department: p.department,
      type: 'Publication Verification',
      status: p.status,
      view: 'publication',
      key: `pub-${p.id}`
    }))

    // 4. Load pending plagiarism check submissions
    const savedPlag = localStorage.getItem('dsu_ri_plagiarism')
    const plags = savedPlag ? JSON.parse(savedPlag) : []
    const pendingPlags = plags.filter(p => p.status === 'Pending').map(p => ({
      date: p.submissionDate || '23-Jun-2026',
      scholarName: p.scholarName,
      school: p.school,
      department: p.department,
      type: 'Plagiarism Approval',
      status: p.status,
      view: 'plagiarism',
      key: `plag-${p.id}`
    }))

    // 5. Load pending format checking
    const savedFormat = localStorage.getItem('dsu_ri_format_checking')
    const formats = savedFormat ? JSON.parse(savedFormat) : []
    const pendingFormats = formats.filter(f => f.status === 'Pending').map(f => ({
      date: f.submissionDate || '24-Jun-2026',
      scholarName: f.scholarName,
      school: f.school,
      department: f.department,
      type: 'Format Checking',
      status: f.status,
      view: 'format',
      key: `format-${f.id}`
    }))

    // 6. Load pending thesis dispatches
    const savedDispatch = localStorage.getItem('dsu_ri_thesis_dispatches')
    const dispatches = savedDispatch ? JSON.parse(savedDispatch) : []
    const pendingDispatches = dispatches.filter(t => t.status === 'Pending').map(t => ({
      date: t.dispatchDate || '25-Jun-2026',
      scholarName: t.scholarName,
      school: t.school,
      department: t.department,
      type: 'Thesis Dispatch',
      status: t.status,
      view: 'thesis',
      key: `dispatch-${t.id}`
    }))

    // 7. Load pending examiner reports
    const savedExp = localStorage.getItem('dsu_ri_examiner_reports')
    const exps = savedExp ? JSON.parse(savedExp) : []
    const pendingExps = exps.filter(e => e.reportStatus === 'Awaiting Report').map(e => ({
      date: e.receivedDate || '26-Jun-2026',
      scholarName: e.scholarName,
      school: e.school,
      department: e.department,
      type: 'Examiner Report Collection',
      status: 'Pending',
      view: 'examiner_report',
      key: `exp-${e.id}`
    }))

    // 8. Load pending library submissions
    const savedLib = localStorage.getItem('dsu_ri_library_submissions')
    const libs = savedLib ? JSON.parse(savedLib) : []
    const pendingLibs = libs.filter(l => l.status === 'Awaiting Archival Copy').map(l => ({
      date: l.submissionDate || '27-Jun-2026',
      scholarName: l.scholarName,
      school: l.school,
      department: l.department,
      type: 'Final Library Submission',
      status: 'Pending',
      view: 'library',
      key: `lib-${l.id}`
    }))

    // Combine all pending requests
    const allPending = [
      ...pendingApps,
      ...pendingDocs,
      ...pendingPubs,
      ...pendingPlags,
      ...pendingFormats,
      ...pendingDispatches,
      ...pendingExps,
      ...pendingLibs
    ]

    // Date Parser Helper for Sorting
    const parseDateStr = (dateStr) => {
      const parts = dateStr.split('-')
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10)
        const monthNames = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
        const month = monthNames[parts[1]] || 0
        const year = parseInt(parts[2], 10)
        return new Date(year, month, day)
      }
      return new Date(0)
    }

    // Sort by latest first
    const sortedNotifs = allPending.sort((a, b) => parseDateStr(b.date) - parseDateStr(a.date))

    // Apply search filter
    const filteredNotifs = sortedNotifs.filter(n =>
      n.scholarName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.type.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Notifications</p>
            <div className="flex items-center gap-2 mt-2">
              <h1 className="text-2xl font-black text-dsu-maroon uppercase tracking-wide">
                Research & Innovation Notifications
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#7B1E3A] text-white border border-[#7B1E3A]/20">
                {sortedNotifs.length} Pending
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500 font-semibold">
              Which scholar's verification request is currently pending with the Research & Innovation Office, and what action is required?
            </p>
          </div>
        </header>

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
          {/* Search Bar */}
          <div className="flex justify-end">
            <div className="relative w-full sm:w-64">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, school, type..."
                className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-slate-800 outline-none focus:border-[#7B1E3A] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
            <table className="min-w-full text-left text-xs text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Scholar Name</th>
                  <th className="p-4">School</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Verification Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {filteredNotifs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-400 font-semibold">
                      No pending verification requests.
                    </td>
                  </tr>
                ) : (
                  filteredNotifs.map((item, idx) => (
                    <tr key={item.key} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 text-slate-500 font-bold">{item.date}</td>
                      <td className="p-4 font-black text-dsu-maroon">{item.scholarName}</td>
                      <td className="p-4 text-slate-700">{item.school}</td>
                      <td className="p-4 text-slate-700">{item.department}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10 font-bold uppercase text-[9px] tracking-wider">
                          {item.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            navigate(`/dashboard?view=${item.view}&scholarName=${item.scholarName}`)
                          }}
                          className="px-3.5 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider transition shadow-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    )
  }

  // 1b. Dean of School Notifications View
  if (role === 'dean_school') {
    const getDepartmentForScholar = (scholarName) => {
      const deptMap = {
        'Arun Kumar': 'CSE',
        'Karthik S': 'MBA',
        'Deepa R': 'ECE',
        'Naveen M': 'AIDS',
        'Akash V': 'Management Studies',
        'Harini K': 'Biotechnology'
      }
      return deptMap[scholarName] || 'School of Computing'
    }

    const filteredNotifs = notifications.filter(n =>
      n.scholar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.guide.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Notifications</p>
          <h1 className="mt-2 text-2xl font-black text-dsu-maroon uppercase tracking-wide">
            School Dean Office Notifications
          </h1>
        </header>

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
          {/* Search Bar */}
          <div className="flex justify-end">
            <div className="relative w-full sm:w-64">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guide or scholar name..."
                className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-slate-800 outline-none focus:border-[#7B1E3A] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
            <table className="min-w-full text-left text-xs text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Guide Name</th>
                  <th className="p-4">Scholar Name</th>
                  <th className="p-4">Approval Required</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {filteredNotifs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-400 font-semibold">
                      No pending approval requests.
                    </td>
                  </tr>
                ) : (
                  filteredNotifs.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 text-slate-500 font-bold">{item.date}</td>
                      <td className="p-4 font-bold text-slate-700">{getDepartmentForScholar(item.scholar)}</td>
                      <td className="p-4 font-bold text-slate-900">{item.guide}</td>
                      <td className="p-4 font-bold text-[#7B1E3A]">{item.scholar}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10 font-bold">
                          {item.approval}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            navigate(`/dashboard?view=workload&scholar=${item.scholar}&guide=${item.guide}`)
                          }}
                          className="px-3.5 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider transition shadow-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Verification Modal */}
        {selectedNotif && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-5 py-4 bg-gradient-to-r from-[#7B1E3A] to-[#5a1229] text-white flex items-center justify-between">
                <h3 className="font-extrabold text-sm uppercase tracking-wide">Scholar Details & Verification</h3>
                <button onClick={() => setSelectedNotif(null)} className="text-white/80 hover:text-white transition">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5 space-y-4 text-xs font-semibold text-slate-700">
                <div className="space-y-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Scholar Name</span>
                    <span className="text-slate-900 font-extrabold text-sm block">{selectedNotif.scholar}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Research Guide</span>
                    <span className="text-slate-900 block">{selectedNotif.guide}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Approval Required</span>
                    <span className="text-[#7B1E3A] font-bold block">{selectedNotif.approval}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Submission Date</span>
                    <span className="text-slate-950 block">{selectedNotif.date}</span>
                  </div>

                  {selectedNotif.topic && (
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Research Topic</span>
                      <span className="text-slate-700 block font-normal leading-relaxed">{selectedNotif.topic}</span>
                    </div>
                  )}

                  {selectedNotif.dateStr && (
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Proposed Presentation Date</span>
                      <span className="text-slate-900 block">{selectedNotif.dateStr}</span>
                    </div>
                  )}

                  {selectedNotif.docType && (
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Document Type</span>
                      <span className="text-slate-900 block">{selectedNotif.docType}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    onClick={() => setSelectedNotif(null)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold uppercase tracking-wider transition text-[10px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const updated = notifications.filter(n => n.id !== selectedNotif.id)
                      setNotifications(updated)
                      localStorage.setItem('dsu_dean_school_notifications', JSON.stringify(updated))
                      window.dispatchEvent(new Event('notifications_updated'))
                      setSelectedNotif(null)
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve & Forward
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // 1c. Dean of Research Notifications View
  if (role === 'dean') {
    const filteredNotifs = deanNotifications.filter(n =>
      n.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.guide.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.scholar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.event.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Notifications</p>
          <h1 className="mt-2 text-2xl font-black text-dsu-maroon uppercase tracking-wide">
            Dean of Research Notifications
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-semibold">
            Review and verify pending school, guide, and scholar milestone approval submissions.
          </p>
        </header>

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
          {/* Search Bar */}
          <div className="flex justify-end">
            <div className="relative w-full sm:w-64">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search school, guide, scholar, stage..."
                className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-slate-800 outline-none focus:border-[#7B1E3A] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
            <table className="min-w-full text-left text-xs text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">School Name</th>
                  <th className="p-4">Guide Name</th>
                  <th className="p-4">Scholar Name</th>
                  <th className="p-4">Event / Stage</th>
                  <th className="p-4">Approval Required</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {filteredNotifs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-400 font-semibold">
                      No pending approval requests.
                    </td>
                  </tr>
                ) : (
                  filteredNotifs.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 text-slate-500 font-bold">{item.date}</td>
                      <td className="p-4 font-bold text-slate-900">{item.school}</td>
                      <td className="p-4 font-bold text-slate-900">{item.guide}</td>
                      <td className="p-4 font-bold text-[#7B1E3A]">{item.scholar}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200/60 font-bold">
                          {item.event}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded font-bold ${
                          item.approval.includes('MoM') 
                            ? 'bg-amber-50 text-amber-800 border border-amber-200/60'
                            : 'bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10'
                        }`}>
                          {item.approval}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            navigate(`/dashboard?view=schools&scholar=${item.scholar}&guide=${item.guide}`)
                          }}
                          className="px-3.5 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider transition shadow-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Verification Modal */}
        {selectedNotif && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-5 py-4 bg-gradient-to-r from-[#7B1E3A] to-[#5a1229] text-white flex items-center justify-between">
                <h3 className="font-extrabold text-sm uppercase tracking-wide">Approval Details & Verification</h3>
                <button onClick={() => setSelectedNotif(null)} className="text-white/80 hover:text-white transition">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5 space-y-4 text-xs font-semibold text-slate-700">
                <div className="space-y-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">School Name</span>
                    <span className="text-slate-900 font-extrabold text-xs block">{selectedNotif.school}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Research Guide</span>
                    <span className="text-slate-900 font-bold block">{selectedNotif.guide}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Scholar Name</span>
                    <span className="text-slate-900 font-extrabold text-sm block">{selectedNotif.scholar}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Event / Stage</span>
                    <span className="text-slate-955 block">{selectedNotif.event}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Approval Required</span>
                    <span className="text-[#7B1E3A] font-bold block">{selectedNotif.approval}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Submission Date</span>
                    <span className="text-slate-950 block">{selectedNotif.date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    onClick={() => setSelectedNotif(null)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold uppercase tracking-wider transition text-[10px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const updated = deanNotifications.filter(n => n.id !== selectedNotif.id)
                      setDeanNotifications(updated)
                      localStorage.setItem('dsu_dean_notifications', JSON.stringify(updated))
                      window.dispatchEvent(new Event('notifications_updated'))
                      setSelectedNotif(null)
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // 1d. Vice Chancellor Notifications View
  if (role === 'vc') {
    const getDepartmentForScholar = (scholarName) => {
      const deptMap = {
        'Arun Kumar': 'CSE',
        'Priya R': 'CSE',
        'Suresh M': 'ECE',
        'Kavitha P': 'CSE',
        'Amit Sharma': 'MBA',
        'Rajesh Kumar': 'CSE',
        'Meera S': 'ECE',
        'Sneha Roy': 'ECE',
        'Dr. Arun Pranesh': 'ECE',
        'Deepa R': 'MBA'
      }
      return deptMap[scholarName] || 'CSE'
    }

    const parseDateStr = (dateStr) => {
      const parts = dateStr.split('-')
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10)
        const monthNames = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
        const month = monthNames[parts[1]] || 0
        const year = parseInt(parts[2], 10)
        return new Date(year, month, day)
      }
      return new Date(0)
    }

    const filteredNotifs = vcNotifications.filter(n =>
      n.status === 'Pending' && (
        (n.school || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (n.department || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (n.guide || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (n.scholar || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    ).sort((a, b) => parseDateStr(b.date) - parseDateStr(a.date))

    return (
      <div className="space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Notifications</p>
          <h1 className="mt-2 text-2xl font-black text-dsu-maroon uppercase tracking-wide">
            Vice Chancellor Office Notifications
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-semibold">
            Authorize pending examiner panels, thesis reviews, and degree sanctions.
          </p>
        </header>

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
          {/* Search Bar */}
          <div className="flex justify-end">
            <div className="relative w-full sm:w-64">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by School, Department, Guide, or Scholar"
                className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-slate-800 outline-none focus:border-[#7B1E3A] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
            <table className="min-w-full text-left text-xs text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">School</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Guide Name</th>
                  <th className="p-4">Scholar Name</th>
                  <th className="p-4">Approval Type</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {filteredNotifs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-400 font-semibold">
                      No pending approval requests.
                    </td>
                  </tr>
                ) : (
                  filteredNotifs.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 text-slate-500 font-bold">{item.date}</td>
                      <td className="p-4 text-slate-700">{item.school}</td>
                      <td className="p-4 text-slate-700">{item.department || getDepartmentForScholar(item.scholar)}</td>
                      <td className="p-4 font-bold text-slate-900">{item.guide}</td>
                      <td className="p-4 font-bold text-[#7B1E3A]">{item.scholar}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10 font-bold">
                          {item.approval}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            navigate(`/dashboard?view=approvals&scholar=${item.scholar}`)
                          }}
                          className="px-3.5 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider transition shadow-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    )
  }

  // ──── ROLE-SPECIFIC NOTIFICATIONS MOCK DATA ────
  const getRoleNotifications = () => {
    switch (role) {
      case 'supervisor':
        return [
          {
            id: 'n-sup-1',
            title: 'Scholar Submission',
            message: 'Scholar Priya R uploaded draft thesis sections 1-3 for your primary review and approval.',
            read: false,
            date: '2026-06-18T08:00:00Z',
            priority: 'High',
            status: 'Action Needed'
          },
          {
            id: 'n-sup-2',
            title: 'DAC Request',
            message: 'Doctoral Advisory Committee (DAC) formation request submitted for Aishwarya S.',
            read: false,
            date: '2026-06-17T10:30:00Z',
            priority: 'High',
            status: 'Pending'
          },
          {
            id: 'n-sup-3',
            title: 'Comprehensive Viva Request',
            message: 'A request to constitute a Viva Voces panel for Rajesh Kumar has been forwarded to the Dean.',
            read: true,
            date: '2026-06-15T14:20:00Z',
            priority: 'Normal',
            status: 'Submitted'
          },
          {
            id: 'n-sup-4',
            title: 'Colloquium Request',
            message: 'Pre-Synopsis Colloquium scheduled for Rajesh Kumar has been confirmed for 30th June.',
            read: true,
            date: '2026-06-12T09:00:00Z',
            priority: 'Normal',
            status: 'Scheduled'
          },
          {
            id: 'n-sup-5',
            title: 'Thesis Evaluation Comments',
            message: 'External examiner from IIT Madras submitted positive evaluation reports for Completed Scholar Arun Pranesh.',
            read: true,
            date: '2026-06-10T16:45:00Z',
            priority: 'High',
            status: 'Complete'
          }
        ]
      case 'dean':
        return [
          {
            id: 'n-dean-1',
            title: 'DAC Approval Request',
            message: 'First DAC Committee panel proposed for Srinath V is waiting for your signature.',
            read: false,
            date: '2026-06-18T09:00:00Z',
            priority: 'High',
            status: 'Signature Required'
          },
          {
            id: 'n-dean-2',
            title: 'Synopsis Approval Request',
            message: 'Pre-Synopsis similarity and publication check clearance filed for Scholar Praveen K.',
            read: false,
            date: '2026-06-17T14:10:00Z',
            priority: 'High',
            status: 'Review Pending'
          },
          {
            id: 'n-dean-3',
            title: 'Examiner Panel Approval',
            message: 'A new examiner panel roster has been compiled and submitted for Scholar Kavitha P.',
            read: true,
            date: '2026-06-16T11:20:00Z',
            priority: 'Normal',
            status: 'Awaiting Selection'
          },
          {
            id: 'n-dean-4',
            title: 'Thesis Evaluation Decision',
            message: 'Dual external evaluations returned for Narayanan R (Reports: Accept, Minor Revisions). Action required.',
            read: false,
            date: '2026-06-15T09:30:00Z',
            priority: 'High',
            status: 'Decision Required'
          },
          {
            id: 'n-dean-5',
            title: 'Viva Approval Request',
            message: 'Final thesis defense scheduling clearance requested for Scholar Rajesh Kumar.',
            read: true,
            date: '2026-06-14T10:00:00Z',
            priority: 'Normal',
            status: 'Pending Viva'
          }
        ]
      case 'dean_school':
        return [
          {
            id: 'n-ds-1',
            title: 'First DAC Approval',
            message: 'First DAC panel proposal for Kamalesh N awaits School Dean authorization.',
            read: false,
            date: '2026-06-18T08:30:00Z',
            priority: 'High',
            status: 'Pending School Approval'
          },
          {
            id: 'n-ds-2',
            title: 'Comprehensive Viva Approval',
            message: 'Comprehensive Viva Panel selection proposed for Scholar Meera Das.',
            read: false,
            date: '2026-06-17T15:20:00Z',
            priority: 'High',
            status: 'Pending Approval'
          },
          {
            id: 'n-ds-3',
            title: 'Colloquium Approval',
            message: 'Pre-Synopsis Colloquium presentation summary submitted for Scholar Ajay Dev.',
            read: true,
            date: '2026-06-16T10:45:00Z',
            priority: 'Normal',
            status: 'Awaiting Outcome'
          },
          {
            id: 'n-ds-4',
            title: 'Thesis Defense Approval',
            message: 'Thesis formatting check (Inch Committee submission) cleared for Scholar Sneha Roy.',
            read: true,
            date: '2026-06-14T11:00:00Z',
            priority: 'Normal',
            status: 'Format Verified'
          }
        ]
      case 'registrar':
        return [
          {
            id: 'n-reg-1',
            title: 'Registration Approval',
            message: 'Registrar confirmation requested for Scholar Preethi S provisional registration allocation.',
            read: false,
            date: '2026-06-18T09:15:00Z',
            priority: 'High',
            status: 'Awaiting Signature'
          },
          {
            id: 'n-reg-2',
            title: 'Degree Processing',
            message: 'Issue Provisional Degree Certificate (PDC) for Scholar Arun Pranesh who completed thesis defense.',
            read: false,
            date: '2026-06-17T14:40:00Z',
            priority: 'High',
            status: 'Processing PDC'
          },
          {
            id: 'n-reg-3',
            title: 'Academic Records Update',
            message: 'Academic coursework credit audit status marked PASS for Scholar Rajesh Kumar.',
            read: true,
            date: '2026-06-16T11:00:00Z',
            priority: 'Normal',
            status: 'Audit Logged'
          }
        ]
      case 'ri_office':
        return [
          {
            id: 'n-ri-1',
            title: 'Document Audit Requested',
            message: 'Original PG/UG degree transcript certificates submitted for Scholar Aishwarya S.',
            read: false,
            date: '2026-06-18T07:45:00Z',
            priority: 'High',
            status: 'Audit Needed'
          },
          {
            id: 'n-ri-2',
            title: 'Plagiarism Submission',
            message: 'Thesis draft section similarity Turnitin report uploaded for Scholar Priya R.',
            read: false,
            date: '2026-06-17T13:20:00Z',
            priority: 'High',
            status: 'Verify Turnitin'
          },
          {
            id: 'n-ri-3',
            title: 'Thesis Dispatch',
            message: 'Confirm dispatch of thesis print copies to national/international examiners for Scholar Preethi S.',
            read: true,
            date: '2026-06-15T10:00:00Z',
            priority: 'Normal',
            status: 'Dispatch Logged'
          }
        ]
      case 'vc':
        return [
          {
            id: 'n-vc-1',
            title: 'Examiner Panel Approval',
            message: 'External examiner nominations list requires final VC selection and signature for Scholar Priya R.',
            read: false,
            date: '2026-06-18T09:00:00Z',
            priority: 'High',
            status: 'Signature Required'
          },
          {
            id: 'n-vc-2',
            title: 'Thesis Clearance',
            message: 'Dean Research forwarded final thesis defense report clearance for Rajesh Kumar.',
            read: false,
            date: '2026-06-17T15:30:00Z',
            priority: 'High',
            status: 'Sanction Needed'
          },
          {
            id: 'n-vc-3',
            title: 'Degree Sanction',
            message: 'Authorize PhD Convocation award and degree certificate generation for Dr. Arun Pranesh.',
            read: true,
            date: '2026-06-16T11:15:00Z',
            priority: 'High',
            status: 'Approved'
          }
        ]
      default:
        return []
    }
  }

  const roleTitleMap = {
    supervisor: 'Supervisor Desk',
    dean: 'Dean Research',
    admin: 'Administrator Portal',
    dean_school: 'School Dean Office',
    registrar: 'Registrar Registry',
    ri_office: 'R&I Office',
    vc: 'Vice Chancellor Chambers'
  }

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Notifications</p>
        <h1 className="mt-2 text-2xl font-black text-dsu-maroon uppercase tracking-wide">
          {roleTitleMap[role] || 'Research Portal'} Notifications
        </h1>
        <p className="mt-1 text-sm text-slate-500 font-semibold">
          Review warnings, approvals, scheduling events, and communications relevant to your role.
        </p>
      </header>

      <NotificationsList items={getRoleNotifications()} />
    </div>
  )
}
