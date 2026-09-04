import React, { useState, useEffect } from 'react'
import { useScholarData } from '../hooks/useFetchMock'
import { progressData } from '../data/progressData'
import StatCard from '../components/StatCard'
import Timeline from '../components/Timeline'
import ProgressChart from '../components/ProgressChart'
import ActivitiesWidget from '../components/ActivitiesWidget'
import NotificationsList from '../components/NotificationsList'
import PublicationsSummary from '../components/PublicationsSummary'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { 
  Users, FileText, CheckCircle, Clock, BookOpen, 
  Layers, ShieldCheck, Shield, Settings, Activity, FileCheck, 
  Landmark, AlertCircle, Calendar, MessageSquare, Plus, ArrowRight, ArrowLeft,
  Upload, CheckCircle2, ChevronRight, Award, Trash2, Eye, Search,
  Check, FileArchive, Send, RefreshCw, X, ClipboardList, Download,
  Mail, Globe, MapPin, Truck, Info
} from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const role = localStorage.getItem('user_role') || 'scholar'
  const profileStr = localStorage.getItem('user_profile')
  let profile = { name: 'Priya R', department: 'Computer Science', sub: 'DSU-PHD-2022-045' }
  if (profileStr) {
    try {
      profile = JSON.parse(profileStr)
    } catch (e) {}
  }

  const { scholar, progress, activities, publications, notifications, loading } = useScholarData()
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const view = query.get('view') || 'home'

  const [activeSupervisorScholar, setActiveSupervisorScholar] = useState(null)
  const [activeSupervisorPhase, setActiveSupervisorPhase] = useState(null)
  const [activeDeanApproval, setActiveDeanApproval] = useState(null)
  const [activeDeanGuide, setActiveDeanGuide] = useState(null)
  const [guideSearchQuery, setGuideSearchQuery] = useState('')
  const [activeDeanVerifyScholar, setActiveDeanVerifyScholar] = useState(null)
  const [deanVerifyItems, setDeanVerifyItems] = useState({})
  const [activeDeanSchool, setActiveDeanSchool] = useState(null)
  const [deanRemarksText, setDeanRemarksText] = useState('')
  const [deanSignedFile, setDeanSignedFile] = useState(null)
  const [activeRiApplication, setActiveRiApplication] = useState(null)
  const [riRemarksText, setRiRemarksText] = useState('')
  const [activeRiDocument, setActiveRiDocument] = useState(null)
  const [riDocRemarksText, setRiDocRemarksText] = useState('')
  const [riDocUploadedFile, setRiDocUploadedFile] = useState(null)
  const [activeRiPublication, setActiveRiPublication] = useState(null)
  const [riPubRemarksText, setRiPubRemarksText] = useState('')
  const [deanActivitySearch, setDeanActivitySearch] = useState('')
  const [deanActivitySchool, setDeanActivitySchool] = useState('')
  const [deanActivityType, setDeanActivityType] = useState('')
  const [deanActivityStatus, setDeanActivityStatus] = useState('')
  const [deanAcademicActivities, setDeanAcademicActivities] = useState([
    { date: '2026-06-26', school: 'School of Computing', dept: 'Computer Science & Engineering', guide: 'Dr. D. Srinivasan', scholar: 'Meera Das', type: 'Comprehensive Viva', status: 'Scheduled' },
    { date: '2026-07-02', school: 'School of Engineering', dept: 'Mechanical Engineering', guide: 'Dr. S. K. Gupta', scholar: 'Ajay Dev', type: 'Colloquium Presentation', status: 'Confirmed' },
    { date: '2026-07-08', school: 'School of Management', dept: 'Business Administration', guide: 'Dr. R. Venkataraman', scholar: 'Sneha Roy', type: 'Pre-Synopsis Submission', status: 'Proposed' },
    { date: '2026-07-12', school: 'School of Sciences', dept: 'Physics', guide: 'Dr. S. Ananthi', scholar: 'Kamalesh N', type: 'Synopsis Review', status: 'Panel Approved' },
    { date: '2026-07-18', school: 'School of Computing', dept: 'Artificial Intelligence & Data Science', guide: 'Dr. J. Paul', scholar: 'Priya R', type: 'Thesis Defense Oral Viva', status: 'Scheduled' },
    { date: '2026-07-25', school: 'School of Computing', dept: 'Computer Science & Engineering', guide: 'Dr. D. Srinivasan', scholar: 'Aishwarya S', type: 'First DAC', status: 'Proposed' },
    { date: '2026-07-30', school: 'School of Engineering', dept: 'ECE', guide: 'Dr. Ravi Kumar', scholar: 'Deepa R', type: 'Second DAC', status: 'Under Review' },
    { date: '2026-08-05', school: 'School of Management', dept: 'MBA', guide: 'Dr. Priya', scholar: 'Amit Sharma', type: 'Thesis Submission', status: 'Confirmed' },
    { date: '2026-08-12', school: 'School of Computing', dept: 'Computer Science & Engineering', guide: 'Dr. D. Srinivasan', scholar: 'Suresh Kumar', type: 'Third DAC', status: 'Scheduled' },
    { date: '2026-08-20', school: 'School of Engineering', dept: 'ECE', guide: 'Dr. Ravi Kumar', scholar: 'Vikram S', type: 'Final Viva Voce', status: 'Completed' }
  ])

  const getDeanStatusBadgeClass = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-100'
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'Proposed':
        return 'bg-amber-50 text-amber-700 border-amber-100'
      case 'Under Review':
        return 'bg-purple-50 text-purple-700 border-purple-100'
      case 'Panel Approved':
        return 'bg-teal-50 text-teal-700 border-teal-100'
      case 'Completed':
        return 'bg-slate-50 text-slate-700 border-slate-100'
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100'
    }
  }

  const formatDeanDisplayDate = (dateStr) => {
    if (!dateStr) return ''
    const parts = dateStr.split('-')
    if (parts.length !== 3) return dateStr
    const [year, month, day] = parts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const mIdx = parseInt(month, 10) - 1
    return `${day}-${months[mIdx] || 'Jan'}-${year}`
  }
  const [activeRiPlagiarism, setActiveRiPlagiarism] = useState(null)
  const [riPlagRemarksText, setRiPlagRemarksText] = useState('')
  const [registrarSearch, setRegistrarSearch] = useState('')
  const [registrarSchoolFilter, setRegistrarSchoolFilter] = useState('')
  const [registrarTypeFilter, setRegistrarTypeFilter] = useState('')
  const [registrarStatusFilter, setRegistrarStatusFilter] = useState('')
  const [registrarAdminRequests, setRegistrarAdminRequests] = useState([
    { date: '2026-06-20', school: 'School of Management', dept: 'Finance', guide: 'Dr. R. Venkataraman', scholar: 'Aishwarya S', type: 'Registration Approval', status: 'Pending' },
    { date: '2026-06-21', school: 'School of Computing', dept: 'Computer Science & Engineering', guide: 'Dr. D. Srinivasan', scholar: 'Rajesh Kumar', type: 'Degree Processing', status: 'Under Review' },
    { date: '2026-06-22', school: 'School of Engineering', dept: 'Electronics & Communication Engineering', guide: 'Dr. S. K. Gupta', scholar: 'Priya R', type: 'Award Documentation', status: 'Pending' },
    { date: '2026-06-23', school: 'School of Sciences', dept: 'Physics', guide: 'Dr. S. Ananthi', scholar: 'Kamalesh N', type: 'Academic Record Verification', status: 'Approved' },
    { date: '2026-06-24', school: 'School of Management', dept: 'Business Administration', guide: 'Dr. J. Paul', scholar: 'Sneha Roy', type: 'Enrollment Confirmation', status: 'Pending' },
    { date: '2026-06-25', school: 'School of Engineering', dept: 'Mechanical Engineering', guide: 'Dr. Ravi Kumar', scholar: 'Ajay Dev', type: 'Research Registration Modification', status: 'Returned' },
    { date: '2026-06-26', school: 'School of Sciences', dept: 'Chemistry', guide: 'Dr. A. K. Sharma', scholar: 'Rohan Mehta', type: 'Scholar Status Update', status: 'Processed' }
  ])

  const getRegistrarStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
      case 'Under Review':
        return 'bg-purple-50 text-purple-700 border-purple-100'
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'Returned':
        return 'bg-rose-50 text-rose-700 border-rose-100'
      case 'Processed':
        return 'bg-blue-50 text-blue-700 border-blue-100'
      default:
        return 'bg-slate-50 text-slate-650 border-slate-100'
    }
  }

  const formatRegistrarDisplayDate = (dateStr) => {
    if (!dateStr) return ''
    const parts = dateStr.split('-')
    if (parts.length !== 3) return dateStr
    const [year, month, day] = parts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const mIdx = parseInt(month, 10) - 1
    return `${day}-${months[mIdx] || 'Jan'}-${year}`
  }

  const [riSearch, setRiSearch] = useState('')
  const [riSchoolFilter, setRiSchoolFilter] = useState('')
  const [riTypeFilter, setRiTypeFilter] = useState('')
  const [riStatusFilter, setRiStatusFilter] = useState('')
  const [riVerificationRequests, setRiVerificationRequests] = useState([
    { date: '2026-06-20', school: 'School of Management', dept: 'Finance', guide: 'Dr. R. Venkataraman', scholar: 'Aishwarya S', type: 'Publication Verification', status: 'Pending' },
    { date: '2026-06-21', school: 'School of Computing', dept: 'Computer Science & Engineering', guide: 'Dr. D. Srinivasan', scholar: 'Rajesh Kumar', type: 'Plagiarism Approval', status: 'Pending' },
    { date: '2026-06-22', school: 'School of Engineering', dept: 'Electronics & Communication Engineering', guide: 'Dr. S. K. Gupta', scholar: 'Priya R', type: 'Format Check', status: 'Under Review' },
    { date: '2026-06-23', school: 'School of Sciences', dept: 'Physics', guide: 'Dr. S. Ananthi', scholar: 'Kamalesh N', type: 'Document Verification', status: 'Verified' },
    { date: '2026-06-24', school: 'School of Computing', dept: 'Artificial Intelligence & Data Science', guide: 'Dr. J. Paul', scholar: 'Sneha Roy', type: 'Thesis Dispatch Verification', status: 'Approved' },
    { date: '2026-06-25', school: 'School of Sciences', dept: 'Mathematics', guide: 'Dr. S. Ananthi', scholar: 'Rohan Mehta', type: 'Research Compliance Review', status: 'Returned' },
    { date: '2026-06-26', school: 'School of Management', dept: 'Business Administration', guide: 'Dr. J. Paul', scholar: 'Divya Menon', type: 'Final Submission Verification', status: 'Completed' }
  ])

  const getRiStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
      case 'Under Review':
        return 'bg-purple-50 text-purple-700 border-purple-100'
      case 'Verified':
        return 'bg-teal-50 text-teal-700 border-teal-100'
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'Returned':
        return 'bg-rose-50 text-rose-700 border-rose-100'
      case 'Completed':
        return 'bg-slate-50 text-slate-700 border-slate-100'
      default:
        return 'bg-slate-50 text-slate-650 border-slate-100'
    }
  }

  const formatRiDisplayDate = (dateStr) => {
    if (!dateStr) return ''
    const parts = dateStr.split('-')
    if (parts.length !== 3) return dateStr
    const [year, month, day] = parts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const mIdx = parseInt(month, 10) - 1
    return `${day}-${months[mIdx] || 'Jan'}-${year}`
  }

  const [riPlagUploadedFile, setRiPlagUploadedFile] = useState(null)
  const [activeRiFormat, setActiveRiFormat] = useState(null)
  const [riFormatRemarksText, setRiFormatRemarksText] = useState('')
  const [riFormatUploadedFile, setRiFormatUploadedFile] = useState(null)
  const [riFormatChecklist, setRiFormatChecklist] = useState({
    titlePage: false,
    toc: false,
    references: false,
    margins: false
  })
  const [activeThesisDispatch, setActiveThesisDispatch] = useState(null)
  const [riDispatchRemarksText, setRiDispatchRemarksText] = useState('')
  const [riDispatchUploadedProof, setRiDispatchUploadedProof] = useState(null)
  const [riDispatchCourier, setRiDispatchCourier] = useState('')
  const [riDispatchTracking, setRiDispatchTracking] = useState('')
  const [riDispatchMode, setRiDispatchMode] = useState('')
  const [riDispatchExpectedDate, setRiDispatchExpectedDate] = useState('')
  const [riDispatchDate, setRiDispatchDate] = useState('')
  const [activeExaminerReport, setActiveExaminerReport] = useState(null)
  const [riReportRemarksText, setRiReportRemarksText] = useState('')
  const [riReportUploadedFile, setRiReportUploadedFile] = useState(null)
  const [activeLibrarySubmission, setActiveLibrarySubmission] = useState(null)
  const [riLibraryRemarksText, setRiLibraryRemarksText] = useState('')
  const [riLibraryUploadedFile, setRiLibraryUploadedFile] = useState(null)
  const [activeRegistrarRegistration, setActiveRegistrarRegistration] = useState(null)
  const [registrarRegRemarksText, setRegistrarRegRemarksText] = useState('')
  const [registrarRegUploadedFile, setRegistrarRegUploadedFile] = useState(null)
  const [activeRegistrarEnrollment, setActiveRegistrarEnrollment] = useState(null)
  const [registrarEnrollRemarksText, setRegistrarEnrollRemarksText] = useState('')
  const [registrarEnrollUploadedFile, setRegistrarEnrollUploadedFile] = useState(null)
  const [activeRegistrarRecord, setActiveRegistrarRecord] = useState(null)
  const [registrarRecordRemarksText, setRegistrarRecordRemarksText] = useState('')
  const [registrarRecordUploadedFile, setRegistrarRecordUploadedFile] = useState(null)
  const [activeRegistrarDegree, setActiveRegistrarDegree] = useState(null)
  const [registrarDegreeRemarksText, setRegistrarDegreeRemarksText] = useState('')
  const [registrarDegreeUploadedFile, setRegistrarDegreeUploadedFile] = useState(null)
  const [activeRegistrarAward, setActiveRegistrarAward] = useState(null)
  const [registrarAwardRemarksText, setRegistrarAwardRemarksText] = useState('')
  const [registrarAwardUploadedFile, setRegistrarAwardUploadedFile] = useState(null)
  const [schoolsSearchQuery, setSchoolsSearchQuery] = useState('')
  const [schoolsGuidesSearchQuery, setSchoolsGuidesSearchQuery] = useState('')

  // ──── SCHOLAR DASHBOARD DATA (UNCHANGED) ────
  const milestones = [
    { key: 'dac-coursework', title: 'First DAC & Course Work', status: 'done' },
    { key: 'comp-viva',     title: 'Comprehensive Viva',       status: 'done' },
    { key: 'colloquium',    title: 'Colloquium',               status: 'done' },
    { key: 'inch',          title: 'Inch Committee',           status: 'done' },
    { key: 'synopsis',      title: 'Synopsis',                 status: 'done' },
    { key: 'thesis-eval',   title: 'Thesis Evaluation',        status: 'current' },
    { key: 'defense',       title: 'Thesis Defense',           status: 'done' }
  ]
  const doneCount = milestones.filter(m => m.status === 'done').length
  const progressPercent = Math.round((doneCount / milestones.length) * 100)

  // ──── INTERACTIVE MOCK STATE DATABASES ────

  // 1. Supervisor State
  const [supervisedScholars, setSupervisedScholars] = useState([
    { id: 'DSU-PHD-2022-045', name: 'Priya R', dept: 'Computer Science', topic: 'Secure AI-Driven Smart Healthcare', progress: 30, status: 'Active' },
    { id: 'DSU-PHD-2023-012', name: 'Rajesh Kumar', dept: 'Computer Science', topic: 'Blockchain for Decentralized Cloud IoT', progress: 50, status: 'Active' },
    { id: 'DSU-PHD-2024-008', name: 'Aishwarya S', dept: 'Computer Science', topic: 'Explainable AI in Cybersecurity Systems', progress: 10, status: 'Coursework' }
  ])
  const [supervisorActions, setSupervisorActions] = useState([
    { id: 1, text: 'Review and approve first DAC minutes for Aishwarya S', category: 'DAC', date: 'Due in 2 days', severity: 'high', done: false },
    { id: 2, text: 'Evaluate draft thesis submission for Rajesh Kumar', category: 'Thesis', date: 'Due in 5 days', severity: 'medium', done: false },
    { id: 3, text: 'Approve publication draft for Scholar Priya R', category: 'Publications', date: 'Due in 7 days', severity: 'low', done: false }
  ])
  const [dacPanels, setDacPanels] = useState([
    { id: 1, scholar: 'Aishwarya S', internal: 'Dr. R. Venkataraman', external: 'Dr. M. Sathyapriya (NIT Trichy)', date: '2026-06-25', status: 'Approved' }
  ])
  const [courseworkAllocations, setCourseworkAllocations] = useState([
    { id: 1, scholar: 'Priya R', course: 'Advanced Machine Learning', credits: 4, type: 'Core', code: 'AM-CS-101', status: 'Approved' },
    { id: 2, scholar: 'Priya R', course: 'Natural Language Processing', credits: 3, type: 'Self Study Course', code: '', status: 'Approved' },
    { id: 3, scholar: 'Rajesh Kumar', course: 'Research Methodology', credits: 4, type: 'Core', code: 'RM-CS-102', status: 'Approved' },
    { id: 4, scholar: 'Rajesh Kumar', course: 'Advanced Cryptography', credits: 4, type: 'Self Study Course', code: '', status: 'Approved' },
    { id: 5, scholar: 'Aishwarya S', course: 'Mathematical Foundations of Computer Science', credits: 4, type: 'Core', code: '', status: 'Approved' },
    { id: 6, scholar: 'Aishwarya S', course: 'Advanced Algorithms & Analysis', credits: 4, type: 'Core', code: '', status: 'Approved' },
    { id: 7, scholar: 'Aishwarya S', course: 'Deep Learning & Neural Networks', credits: 4, type: 'Self Study Course', code: '', status: 'Approved' }
  ])
  const [dacMeetings, setDacMeetings] = useState([
    { id: 1, reqNo: 'REQ-DAC1-0024', scholar: 'Aishwarya S', date: '2026-06-25', time: '10:30 AM', venue: 'Research Block Seminar Hall 1', status: 'Submitted' }
  ])
  const [proposedDacMembers, setProposedDacMembers] = useState([])
  const [firstDacTab, setFirstDacTab] = useState('coursework')
  const [vivaRequests, setVivaRequests] = useState([
    { id: 1, reqNo: 'REQ-VIVA-0012', scholar: 'Rajesh Kumar', date: '2026-07-10', time: '11:00 AM', venue: 'Research Cell Auditorium 2', external: 'Dr. G. Loganathan (IIT Madras)', status: 'Pending Approval' }
  ])
  const [vivaTab, setVivaTab] = useState('request')
  const [vivaSyllabi, setVivaSyllabi] = useState([
    { id: 1, scholar: 'Priya R', fileName: 'priya_viva_syllabus.pdf', date: '2026-06-10', status: 'Approved' }
  ])
  const [vivaMembers, setVivaMembers] = useState([
    { id: 1, scholar: 'Rajesh Kumar', name: 'Dr. R. Venkataraman', designation: 'Professor', institution: 'DSU', role: 'Internal Expert' },
    { id: 2, scholar: 'Rajesh Kumar', name: 'Dr. G. Loganathan', designation: 'Professor', institution: 'IIT Madras', role: 'External Expert' }
  ])
  const [candidacyRequests, setCandidacyRequests] = useState([
    { id: 1, scholar: 'Priya R', requestDate: '2026-06-15', status: 'Confirmed' }
  ])
  const [progressReports, setProgressReports] = useState([
    { id: 1, scholar: 'Aishwarya S', period: 'Jan 2026 - Jun 2026', submissionDate: '2026-06-01', status: 'Pending Review', fileName: 'progress_report_aishwarya.pdf' },
    { id: 2, scholar: 'Rajesh Kumar', period: 'Jan 2026 - Jun 2026', submissionDate: '2026-06-02', status: 'Approved', fileName: 'progress_report_rajesh.pdf' },
    { id: 3, scholar: 'Priya R', period: 'Jan 2026 - Jun 2026', submissionDate: '2026-06-03', status: 'Approved', fileName: 'progress_report_priya.pdf' }
  ])
  const [colloquiumSchedules, setColloquiumSchedules] = useState([
    { id: 1, reqNo: 'REQ-COLL-0021', scholar: 'Rajesh Kumar', topic: 'Blockchain IoT Architectures', date: '2026-06-30', time: '02:30 PM', venue: 'Research Auditorium 1', status: 'Scheduled' }
  ])
  const [colloquiumTab, setColloquiumTab] = useState('request')
  const [publicationsList, setPublicationsList] = useState([
    { id: 1, scholar: 'Rajesh Kumar', title: 'Decentralized Consensus in IoT networks', forum: 'IEEE Infocom', year: '2025', status: 'Published' }
  ])
  const [journalsList, setJournalsList] = useState([
    { id: 1, scholar: 'Rajesh Kumar', title: 'Blockchain architectures for IoT: A Survey', forum: 'ACM Computing Surveys', impactFactor: '14.3', year: '2026', status: 'Under Review' }
  ])
  const [fulfillmentStatus, setFulfillmentStatus] = useState([
    { id: 1, scholar: 'Rajesh Kumar', residency: true, coursework: true, seminar: true, plagiarism: false }
  ])
  const [examinerPanels, setExaminerPanels] = useState([
    { id: 1, scholar: 'Priya R', examiners: ['Dr. A. K. Singh (IIT-B)', 'Dr. Sarah Mitchell (Stanford)', 'Dr. R. K. Prasad (IISc)'], status: 'Submitted' }
  ])
  const [uploadedMoms, setUploadedMoms] = useState([
    { id: 1, scholar: 'Priya R', type: 'First DAC Meeting', date: '2026-06-12', fileName: 'priya_dac1_mom.pdf', status: 'Verified' }
  ])
  const [inchRequests, setInchRequests] = useState([
    { id: 1, reqNo: 'REQ-INCH-0015', scholar: 'Rajesh Kumar', title: 'Blockchain Security in Smart Cities', date: '2026-08-15', time: '11:00 AM', venue: 'Research Block Panel Room 3', status: 'Submitted' }
  ])
  const [inchTab, setInchTab] = useState('request')
  const [inchThesisSynopsis, setInchThesisSynopsis] = useState([
    { id: 1, scholar: 'Priya R', thesisName: 'priya_draft_thesis.pdf', synopsisName: 'priya_synopsis.pdf', date: '2026-06-15', status: 'Uploaded' }
  ])
  const [inchPlagiarismAiReports, setInchPlagiarismAiReports] = useState([
    { id: 1, scholar: 'Priya R', plagName: 'priya_similarity_report.pdf', aiName: 'priya_ai_report.pdf', plagPct: 10, aiPct: 3, date: '2026-06-16', status: 'Verified' }
  ])
  const [synopsisRequests, setSynopsisRequests] = useState([
    { id: 1, reqNo: 'REQ-SYNP-0012', scholar: 'Priya R', title: 'Secure AI-Driven Smart Healthcare Framework', date: '2026-06-20', time: '10:00 AM', venue: 'Board Room 2', status: 'Approved' }
  ])
  const [synopsisTab, setSynopsisTab] = useState('request')
  const [proposedIndianExaminers, setProposedIndianExaminers] = useState([
    { id: 1, scholar: 'Priya R', name: 'Dr. Ramesh Rao', designation: 'Professor', institution: 'IIT Madras', email: 'ramesh.rao@iitm.ac.in' },
    { id: 2, scholar: 'Priya R', name: 'Dr. Amit Sharma', designation: 'Professor', institution: 'IISc Bangalore', email: 'sharma.amit@iisc.ac.in' }
  ])
  const [proposedForeignExaminers, setProposedForeignExaminers] = useState([
    { id: 1, scholar: 'Priya R', name: 'Dr. John Doe', designation: 'Associate Professor', institution: 'Stanford University', email: 'johndoe@stanford.edu', country: 'USA' },
    { id: 2, scholar: 'Priya R', name: 'Dr. Alice Smith', designation: 'Professor', institution: 'NUS Singapore', email: 'alicesmith@nus.edu.sg', country: 'Singapore' }
  ])
  const [synopsisExaminerStatus, setSynopsisExaminerStatus] = useState([
    { id: 1, scholar: 'Priya R', panelStatus: 'Recommended' },
    { id: 2, scholar: 'Rajesh Kumar', panelStatus: 'Pending' }
  ])
  const [thesisEvaluations, setThesisEvaluations] = useState([
    { id: 1, scholar: 'Priya R', title: 'Secure AI-Driven Smart Healthcare Framework', submissionDate: '2026-06-10', evalStatus: 'Under Evaluation' }
  ])
  const [defenseTab, setDefenseTab] = useState('request')
  const [defenseMeetings, setDefenseMeetings] = useState([
    { id: 1, reqNo: 'REQ-DEF-0019', scholar: 'Manoj Rajan', title: 'Edge Computing Frameworks for Heterogeneous IoT Systems', date: '2026-07-20', time: '09:00 AM', venue: 'School of Computing Seminar Hall', status: 'Scheduled' }
  ])
  const [defenseEvaluatorReports, setDefenseEvaluatorReports] = useState([
    { id: 1, scholar: 'Manoj Rajan', reportName: 'manoj_evaluator_responses.pdf', commentsName: 'manoj_evaluator_comments.pdf', date: '2026-07-15', status: 'Submitted' }
  ])
  const [defenseFinalThesisSynopsis, setDefenseFinalThesisSynopsis] = useState([
    { id: 1, scholar: 'Manoj Rajan', thesisName: 'manoj_final_thesis_v2.pdf', synopsisName: 'manoj_final_synopsis_v2.pdf', date: '2026-07-18', status: 'Approved' }
  ])
  const [evaluationExaminerStatus, setEvaluationExaminerStatus] = useState([
    { id: 1, scholar: 'Priya R', panelStatus: 'Dispatched' },
    { id: 2, scholar: 'Rajesh Kumar', panelStatus: 'Approved' }
  ])
  const [evaluationRecommendations, setEvaluationRecommendations] = useState([
    { id: 1, scholar: 'Priya R', recommendation: 'Accepted with Corrections' }
  ])
  const [defenseRequests, setDefenseRequests] = useState([
    { id: 1, scholar: 'Priya R', title: 'Secure AI-Driven Smart Healthcare Framework', date: '2026-06-18', status: 'Scheduled' }
  ])
  const [defenseOutcomes, setDefenseOutcomes] = useState([
    { id: 1, scholar: 'Priya R', outcome: 'PhD Recommended' }
  ])
  const [documentHistory, setDocumentHistory] = useState([
    { id: 1, scholar: 'Priya R',      docType: 'Thesis Draft',          submissionDate: '2026-06-10', status: 'Verified'  },
    { id: 2, scholar: 'Rajesh Kumar', docType: 'Synopsis Report',       submissionDate: '2026-05-28', status: 'Pending'   },
    { id: 3, scholar: 'Aishwarya S',  docType: 'Coursework Completion', submissionDate: '2026-04-15', status: 'Verified'  },
    { id: 4, scholar: 'Divya Menon',  docType: 'Progress Report',       submissionDate: '2026-06-01', status: 'Returned'  },
    { id: 5, scholar: 'Manoj Rajan',  docType: 'DAC Minutes',           submissionDate: '2026-05-20', status: 'Pending'   },
  ])
  const [momArchives, setMomArchives] = useState([
    { id: 1, scholar: 'Priya R',      meetingType: 'First DAC',      fileName: 'priya_dac1_mom.pdf',         uploadDate: '2026-06-12', status: 'Verified' },
    { id: 2, scholar: 'Rajesh Kumar', meetingType: 'Second DAC',     fileName: 'rajesh_dac2_mom.pdf',        uploadDate: '2026-05-30', status: 'Pending'  },
    { id: 3, scholar: 'Aishwarya S',  meetingType: 'Progress Review',fileName: 'aishwarya_progress_mom.pdf', uploadDate: '2026-04-18', status: 'Verified' },
    { id: 4, scholar: 'Divya Menon',  meetingType: 'Synopsis',       fileName: 'divya_synopsis_mom.pdf',    uploadDate: '2026-06-03', status: 'Returned' },
  ])


  // 3. Dean Research State
  const [deanClearances, setDeanClearances] = useState([
    { id: 1, scholar: 'Praveen K', dept: 'Agricultural Sciences', task: 'Synopsis Plagiarism Check Clearance', index: '6% similarity', status: 'Pending' },
    { id: 2, scholar: 'Divya M', dept: 'Management Studies', task: 'Thesis Examiner Panel Approval', panel: '12 members', status: 'Pending' },
    { id: 3, scholar: 'Arun Kumar', dept: 'Biomedical Engineering', task: 'VC Defense Signature Dispatch', status: 'Pending' }
  ])
  const [deanDacProposals, setDeanDacProposals] = useState([
    { id: 1, scholar: 'Srinath V', school: 'School of Engineering', guide: 'Dr. A. R. Balaji', external: 'Dr. Suresh Kumar (NIT)', status: 'Pending Approval' }
  ])
  const [deanCoursework, setDeanCoursework] = useState([
    { id: 1, scholar: 'Preethi S', school: 'School of Computing', course: 'Neural Networks & Deep Learning', type: 'MOOC Transfer', status: 'Pending Approval' }
  ])
  const [deanColloquium, setDeanColloquium] = useState([
    { id: 1, scholar: 'Ranjith K', school: 'School of Business', topic: 'Microfinance Impact Analysis', status: 'Awaiting Clearance' }
  ])
  const [deanExaminerPanels, setDeanExaminerPanels] = useState([
    { id: 1, scholar: 'Kavitha P', school: 'School of Law', panelSize: 6, status: 'Pending Approval' }
  ])
  const [deanThesisEvaluations, setDeanThesisEvaluations] = useState([
    { id: 1, scholar: 'Narayanan R', school: 'School of Pharmacy', report1: 'Acceptable', report2: 'Minor Revisions', status: 'Awaiting Viva Permission' }
  ])

  // 4. Dean of School State
  const [schoolDacs, setSchoolDacs] = useState([
    { id: 1, scholar: 'Aishwarya S', guide: 'Dr. D. Srinivasan', topic: 'Explainable AI in Cybersecurity Systems', status: 'Pending School Approval' },
    { id: 101, scholar: 'Arun Kumar', guide: 'Dr. Kumar', topic: 'Optimization of Wind Turbine Blades', status: 'Pending School Approval' }
  ])
  const [schoolVivas, setSchoolVivas] = useState([
    { id: 1, scholar: 'Meera Das', guide: 'Dr. H. Subramanian', date: '2026-06-26', status: 'Pending School Approval' },
    { id: 102, scholar: 'Karthik S', guide: 'Dr. Priya', date: '2026-06-26', status: 'Pending School Approval' },
    { id: 106, scholar: 'Harini K', guide: 'Dr. Ravi', date: '2026-07-02', status: 'Pending School Approval' }
  ])
  const [schoolColloquiums, setSchoolColloquiums] = useState([
    { id: 1, scholar: 'Ajay Dev', guide: 'Dr. S. K. Gupta', date: '2026-07-02', status: 'Pending School Approval' },
    { id: 103, scholar: 'Deepa R', guide: 'Dr. Ravi', date: '2026-06-28', status: 'Pending School Approval' }
  ])
  const [inchSubmissions, setInchSubmissions] = useState([
    { id: 1, scholar: 'Sneha Roy', guide: 'Dr. D. Srinivasan', docType: 'Pre-Synopsis Thesis Draft', status: 'Pending Verification' },
    { id: 104, scholar: 'Naveen M', guide: 'Dr. Kumar', docType: 'Pre-Synopsis Thesis Draft', status: 'Pending Verification' }
  ])
  const [schoolSynopsis, setSchoolSynopsis] = useState([
    { id: 1, scholar: 'Kamalesh N', topic: 'Aerodynamic Modeling', status: 'Pending School Review' },
    { id: 105, scholar: 'Akash V', topic: 'Aerodynamic Modeling', status: 'Pending School Review' }
  ])
  const [guideWorkload, setGuideWorkload] = useState([
    { id: 1, name: 'Dr. D. Srinivasan', designation: 'Professor', maxLimit: 8, currentScholars: 5, department: 'School of Computing', specialization: 'Computer Science & Engineering', email: 'd.srinivasan.set@dsuniversity.ac.in' },
    { id: 2, name: 'Dr. R. Venkataraman', designation: 'Associate Professor', maxLimit: 6, currentScholars: 4, department: 'School of Computing', specialization: 'Computer Science & Engineering', email: 'r.venkataraman.set@dsuniversity.ac.in' },
    { id: 3, name: 'Dr. H. Subramanian', designation: 'Assistant Professor', maxLimit: 4, currentScholars: 3, department: 'School of Engineering', specialization: 'Electronics & Communication Engineering', email: 'h.subramanian.set@dsuniversity.ac.in' },
    { id: 4, name: 'Dr. S. K. Gupta', designation: 'Professor', maxLimit: 8, currentScholars: 8, department: 'School of Engineering', specialization: 'Electronics & Communication Engineering', email: 's.k.gupta.set@dsuniversity.ac.in' },
    { id: 5, name: 'Dr. Kumar', designation: 'Professor', maxLimit: 8, currentScholars: 3, department: 'School of Computing', specialization: 'Computer Science & Engineering', email: 'kumar.set@dsuniversity.ac.in' },
    { id: 6, name: 'Dr. Priya', designation: 'Associate Professor', maxLimit: 8, currentScholars: 2, department: 'School of Computing', specialization: 'Computer Science & Engineering', email: 'priya.set@dsuniversity.ac.in' },
    { id: 7, name: 'Dr. Ravi', designation: 'Professor', maxLimit: 8, currentScholars: 3, department: 'School of Engineering', specialization: 'Electronics & Communication Engineering', email: 'ravi.set@dsuniversity.ac.in' }
  ])
  const [scholarApprovalHistories, setScholarApprovalHistories] = useState({
    'Amit Sharma': [
      { phase: 'First DAC', status: 'Approved', date: '10-Jan-2026', documents: ['dac_report.pdf', 'first_dac_mom.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '15-Apr-2026', documents: ['viva_report.pdf'] },
      { phase: 'Colloquium', status: 'Approved', date: '12-Jul-2026', documents: ['colloquium_minutes.pdf'] },
      { phase: 'Synopsis', status: 'Approved', date: '20-Sep-2026', documents: ['synopsis_copy.pdf'] }
    ],
    'Priya R': [
      { phase: 'First DAC', status: 'Approved', date: '10-Nov-2022', documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
      { phase: 'Coursework', status: 'Approved', date: '05-May-2023', documents: ['coursework_marksheet.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '14-Sep-2023', documents: ['viva_report.pdf'] },
      { phase: 'Colloquium', status: 'Approved', date: '20-Feb-2024', documents: ['colloquium_minutes.pdf', 'journal_publications.pdf'] },
      { phase: 'INCH Formatting', status: 'Approved', date: '18-Aug-2024', documents: ['formatting_clearance.pdf', 'plagiarism_report.pdf'] },
      { phase: 'Synopsis', status: 'Approved', date: '12-Jan-2025', documents: ['synopsis_copy.pdf', 'examiner_panel.pdf'] }
    ],
    'Rajesh Kumar': [
      { phase: 'First DAC', status: 'Approved', date: '15-Mar-2023', documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
      { phase: 'Coursework', status: 'Approved', date: '18-Oct-2023', documents: ['coursework_marksheet.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '22-Feb-2024', documents: ['viva_report.pdf'] },
      { phase: 'Colloquium', status: 'Approved', date: '10-Jul-2024', documents: ['colloquium_minutes.pdf', 'journal_publications.pdf'] },
      { phase: 'INCH Formatting', status: 'Approved', date: '15-Dec-2024', documents: ['formatting_clearance.pdf', 'plagiarism_report.pdf'] }
    ],
    'Aishwarya S': [],
    'Kamalesh N': [
      { phase: 'First DAC', status: 'Approved', date: '05-Jan-2023', documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
      { phase: 'Coursework', status: 'Approved', date: '12-May-2023', documents: ['coursework_marksheet.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '20-Sep-2023', documents: ['viva_report.pdf'] },
      { phase: 'Colloquium', status: 'Approved', date: '15-Mar-2024', documents: ['colloquium_minutes.pdf'] },
      { phase: 'INCH Formatting', status: 'Approved', date: '10-Sep-2024', documents: ['formatting_clearance.pdf', 'plagiarism_report.pdf'] }
    ],
    'Sneha Roy': [
      { phase: 'First DAC', status: 'Approved', date: '10-Jan-2024', documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
      { phase: 'Coursework', status: 'Approved', date: '15-Jun-2024', documents: ['coursework_marksheet.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '05-Nov-2024', documents: ['viva_report.pdf'] },
      { phase: 'Colloquium', status: 'Approved', date: '12-Apr-2025', documents: ['colloquium_minutes.pdf'] }
    ],
    'Amit Kumar': [
      { phase: 'First DAC', status: 'Approved', date: '18-Feb-2025', documents: ['dac_proposal.pdf', 'dac_members.pdf'] }
    ],
    'Divya Menon': [
      { phase: 'First DAC', status: 'Approved', date: '12-Dec-2024', documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
      { phase: 'Coursework', status: 'Approved', date: '15-May-2025', documents: ['coursework_marksheet.pdf'] }
    ],
    'Rahul Sharma': [],
    'Manoj Rajan': [
      { phase: 'First DAC', status: 'Approved', date: '10-Jan-2022', documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
      { phase: 'Coursework', status: 'Approved', date: '15-Jun-2022', documents: ['coursework_marksheet.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '05-Nov-2022', documents: ['viva_report.pdf'] },
      { phase: 'Colloquium', status: 'Approved', date: '12-Apr-2023', documents: ['colloquium_minutes.pdf'] },
      { phase: 'INCH Formatting', status: 'Approved', date: '18-Sep-2023', documents: ['formatting_clearance.pdf', 'plagiarism_report.pdf'] },
      { phase: 'Synopsis', status: 'Approved', date: '12-Feb-2024', documents: ['synopsis_copy.pdf', 'examiner_panel.pdf'] },
      { phase: 'Thesis Evaluation', status: 'Approved', date: '20-Sep-2024', documents: ['evaluator_reports.pdf', 'thesis_final.pdf'] }
    ],
    'Meera Das': [
      { phase: 'First DAC', status: 'Approved', date: '10-Jan-2023', documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
      { phase: 'Coursework', status: 'Approved', date: '15-Jun-2023', documents: ['coursework_marksheet.pdf'] }
    ],
    'Arun Kumar': [
      { phase: 'First DAC', status: 'Approved', date: '18-Feb-2025', documents: ['dac_proposal.pdf', 'dac_members.pdf'] }
    ],
    'Preethi S': [],
    'Ajay Dev': [
      { phase: 'First DAC', status: 'Approved', date: '10-Jan-2023', documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
      { phase: 'Coursework', status: 'Approved', date: '15-Jun-2023', documents: ['coursework_marksheet.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '05-Nov-2023', documents: ['viva_report.pdf'] }
    ],
    'Vikram Singh': [
      { phase: 'First DAC', status: 'Approved', date: '18-Feb-2025', documents: ['dac_proposal.pdf', 'dac_members.pdf'] }
    ],
    'Kavitha P': [],
    'Sanjay Dutt': [
      { phase: 'First DAC', status: 'Approved', date: '18-Feb-2025', documents: ['dac_proposal.pdf', 'dac_members.pdf'] }
    ],
    'Rajesh Khanna': [
      { phase: 'First DAC', status: 'Approved', date: '10-Jan-2023', documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
      { phase: 'Coursework', status: 'Approved', date: '15-Jun-2023', documents: ['coursework_marksheet.pdf'] }
    ],
    'Kishore Kumar': [
      { phase: 'First DAC', status: 'Approved', date: '10-Jan-2022', documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
      { phase: 'Coursework', status: 'Approved', date: '15-Jun-2022', documents: ['coursework_marksheet.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '05-Nov-2022', documents: ['viva_report.pdf'] },
      { phase: 'Colloquium', status: 'Approved', date: '12-Apr-2023', documents: ['colloquium_minutes.pdf'] },
      { phase: 'INCH Formatting', status: 'Approved', date: '18-Sep-2023', documents: ['formatting_clearance.pdf', 'plagiarism_report.pdf'] },
      { phase: 'Synopsis', status: 'Approved', date: '12-Feb-2024', documents: ['synopsis_copy.pdf', 'examiner_panel.pdf'] }
    ],
    'Asha Bhosle': [
      { phase: 'First DAC', status: 'Approved', date: '18-Feb-2025', documents: ['dac_proposal.pdf', 'dac_members.pdf'] }
    ],
    'Lata Mangeshkar': [
      { phase: 'First DAC', status: 'Approved', date: '10-Jan-2022', documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
      { phase: 'Coursework', status: 'Approved', date: '15-Jun-2022', documents: ['coursework_marksheet.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '05-Nov-2022', documents: ['viva_report.pdf'] },
      { phase: 'Colloquium', status: 'Approved', date: '12-Apr-2023', documents: ['colloquium_minutes.pdf'] },
      { phase: 'INCH Formatting', status: 'Approved', date: '18-Sep-2023', documents: ['formatting_clearance.pdf', 'plagiarism_report.pdf'] },
      { phase: 'Synopsis', status: 'Approved', date: '12-Feb-2024', documents: ['synopsis_copy.pdf', 'examiner_panel.pdf'] },
      { phase: 'Thesis Evaluation', status: 'Approved', date: '20-Sep-2024', documents: ['evaluator_reports.pdf', 'thesis_final.pdf'] }
    ],
    'Deepa R': [
      { phase: 'First DAC', status: 'Approved', date: '05-Feb-2026', documents: ['dac_report.pdf', 'first_dac_mom.pdf'] },
      { phase: 'Coursework', status: 'Approved', date: '12-May-2026', documents: ['transcript.pdf', 'coursework_certificate.pdf'] }
    ],
    'Akash V': [
      { phase: 'First DAC', status: 'Approved', date: '12-Feb-2026', documents: ['dac_report.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '20-May-2026', documents: ['viva_mom.pdf'] }
    ],
    'Naveen M': [
      { phase: 'First DAC', status: 'Approved', date: '15-Mar-2026', documents: ['dac_report.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '10-Jun-2026', documents: ['viva_mom.pdf'] },
      { phase: 'Colloquium', status: 'Approved', date: '18-Jun-2026', documents: ['colloquium_mom.pdf'] }
    ],
    'Harini K': [
      { phase: 'First DAC', status: 'Approved', date: '02-Jan-2026', documents: ['dac_report.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '14-Apr-2026', documents: ['viva_mom.pdf'] },
      { phase: 'Colloquium', status: 'Approved', date: '22-May-2026', documents: ['colloquium_mom.pdf'] },
      { phase: 'INCH Formatting', status: 'Approved', date: '15-Jun-2026', documents: ['inch_certificate.pdf'] }
    ],
    'Meera S': [
      { phase: 'First DAC', status: 'Approved', date: '20-Dec-2025', documents: ['dac_report.pdf'] },
      { phase: 'Comprehensive Viva', status: 'Approved', date: '10-Mar-2026', documents: ['viva_mom.pdf'] },
      { phase: 'Colloquium', status: 'Approved', date: '25-Apr-2026', documents: ['colloquium_mom.pdf'] },
      { phase: 'INCH Formatting', status: 'Approved', date: '18-May-2026', documents: ['inch_certificate.pdf'] },
      { phase: 'Synopsis', status: 'Approved', date: '12-Jun-2026', documents: ['synopsis_approval.pdf'] }
    ]
  })

  // 5. Research Office (R&I) State
  const [retApplications, setRetApplications] = useState(() => {
    const saved = localStorage.getItem('dsu_ri_applications')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      { 
        id: 1, 
        scholarName: 'Vigneshwaran M', 
        regNo: 'DSU20260901', 
        school: 'School of Computing', 
        department: 'CSE', 
        appType: 'PhD Admission Application', 
        submissionDate: '15-Jun-2026', 
        status: 'Pending',
        docs: ['ret_scorecard.pdf', 'ug_pg_certificates.pdf', 'research_proposal.pdf'],
        remarks: ''
      },
      { 
        id: 2, 
        scholarName: 'Aishwarya S', 
        regNo: 'DSU20260902', 
        school: 'School of Management', 
        department: 'Finance', 
        appType: 'Coursework Exemption Application', 
        submissionDate: '20-Jun-2026', 
        status: 'Approved',
        docs: ['coursework_syllabus.pdf', 'exemption_request.pdf'],
        remarks: 'Exemption approved based on prior M.Phil coursework matching.'
      },
      { 
        id: 3, 
        scholarName: 'Rajesh Kumar', 
        regNo: 'DSU20260903', 
        school: 'School of Computing', 
        department: 'CSE', 
        appType: 'PhD Admission Application', 
        submissionDate: '21-Jun-2026', 
        status: 'Returned',
        docs: ['ret_scorecard_rajesh.pdf', 'transcript.pdf'],
        remarks: 'Returned for upload of proper research guide consent letter.'
      }
    ]
    localStorage.setItem('dsu_ri_applications', JSON.stringify(initial))
    return initial
  })

  const [originalDocs, setOriginalDocs] = useState(() => {
    const saved = localStorage.getItem('dsu_ri_original_docs')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      { 
        id: 1, 
        scholarName: 'Aishwarya S', 
        school: 'School of Management', 
        department: 'Finance', 
        docType: 'PG Degree & Consolidated Transcript', 
        submissionDate: '20-Jun-2026', 
        status: 'Pending',
        docName: 'pg_transcript_aishwarya.pdf',
        remarks: '',
        verifiedCopy: null
      },
      { 
        id: 2, 
        scholarName: 'Rajesh Kumar', 
        school: 'School of Computing', 
        department: 'CSE', 
        docType: 'Community Certificate', 
        submissionDate: '21-Jun-2026', 
        status: 'Approved',
        docName: 'community_certificate_rajesh.pdf',
        remarks: 'Community certificate verified online against State Registry.',
        verifiedCopy: 'verified_community_cert_rajesh.pdf'
      }
    ]
    localStorage.setItem('dsu_ri_original_docs', JSON.stringify(initial))
    return initial
  })

  const [riPublications, setRiPublications] = useState(() => {
    const saved = localStorage.getItem('dsu_ri_publications')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      { 
        id: 1, 
        scholarName: 'Rajesh Kumar', 
        school: 'School of Computing', 
        department: 'CSE', 
        pubTitle: 'Blockchain for Decentralized Cloud IoT', 
        journalName: 'Springer Cloud & Systems', 
        submissionDate: '20-Jun-2026', 
        status: 'Pending',
        pubProof: 'blockchain_iot_proof.pdf',
        doi: '10.1007/s11227-026-10294-x',
        indexing: 'Scopus & Web of Science Indexed',
        remarks: ''
      },
      { 
        id: 2, 
        scholarName: 'Aishwarya S', 
        school: 'School of Management', 
        department: 'Finance', 
        pubTitle: 'Corporate Governance and Capital Structures in Emerging Markets', 
        journalName: 'International Journal of Financial Analysis', 
        submissionDate: '18-Jun-2026', 
        status: 'Approved',
        pubProof: 'corp_governance_proof.pdf',
        doi: '10.1016/j.ijfa.2026.04.015',
        indexing: 'Scopus Indexed (Q1)',
        remarks: 'Paper verified successfully against Scopus database indexing API.'
      }
    ]
    localStorage.setItem('dsu_ri_publications', JSON.stringify(initial))
    return initial
  })

  const [riPlagiarism, setRiPlagiarism] = useState(() => {
    const saved = localStorage.getItem('dsu_ri_plagiarism')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      { 
        id: 1, 
        scholarName: 'Priya R', 
        school: 'School of Computing', 
        department: 'CSE', 
        similarity: '7%', 
        submissionDate: '20-Jun-2026', 
        status: 'Pending',
        reportFile: 'plagiarism_draft_priya.pdf',
        remarks: '',
        verifiedReport: null
      },
      { 
        id: 2, 
        scholarName: 'Deepa R', 
        school: 'School of Management', 
        department: 'MBA', 
        similarity: '12%', 
        submissionDate: '19-Jun-2026', 
        status: 'Approved',
        reportFile: 'plagiarism_draft_deepa.pdf',
        remarks: 'Similarity is 12%, which is well within the 15% institutional tolerance threshold.',
        verifiedReport: 'verified_plagiarism_report_deepa.pdf'
      }
    ]
    localStorage.setItem('dsu_ri_plagiarism', JSON.stringify(initial))
    return initial
  })

  const [riFormatChecking, setRiFormatChecking] = useState(() => {
    const saved = localStorage.getItem('dsu_ri_format_checking')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      {
        id: 1,
        scholarName: 'Amit Sharma',
        school: 'School of Management',
        department: 'MBA',
        thesisTitle: 'A Study on Consumer Behavior in Digital Banking Ecosystems',
        submissionDate: '19-Jun-2026',
        status: 'Pending',
        thesisDraft: 'thesis_draft_amit.pdf',
        remarks: '',
        correctedVersion: null,
        checklist: { titlePage: false, toc: false, references: false, margins: false }
      },
      {
        id: 2,
        scholarName: 'Sneha Roy',
        school: 'School of Engineering',
        department: 'ECE',
        thesisTitle: 'Design and Optimization of Low-Power VLSI Architectures',
        submissionDate: '17-Jun-2026',
        status: 'Approved',
        thesisDraft: 'thesis_draft_sneha.pdf',
        remarks: 'Formatting checklist verified and approved. No corrections required.',
        correctedVersion: 'corrected_thesis_sneha.pdf',
        checklist: { titlePage: true, toc: true, references: true, margins: true }
      }
    ]
    localStorage.setItem('dsu_ri_format_checking', JSON.stringify(initial))
    return initial
  })

  const [thesisDispatches, setThesisDispatches] = useState(() => {
    const saved = localStorage.getItem('dsu_ri_thesis_dispatches')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.some(p => p.scholarName === 'Rajesh Kumar' && p.regNo)) {
          return parsed
        }
      } catch (e) {}
    }
    const initial = [
      {
        id: 1,
        scholarName: 'Preethi S',
        regNo: 'DSU-PHD-2023-018',
        school: 'School of Engineering',
        department: 'CSE',
        guide: 'Dr. D. Srinivasan',
        thesisTitle: 'Distributed Ledger Technologies for Secure Decentralized DNS Systems',
        examinerName: 'Dr. Ravi Kant',
        examinerAffiliation: 'NIT Calicut',
        examinerType: 'Indian Examiner',
        examinerCountry: 'India',
        examinerEmail: 'ravi.kant@nitc.ac.in',
        dispatchDate: '2026-06-10',
        courierService: 'EMS Speed Post',
        trackingNumber: 'SP123456789IN',
        dispatchMode: 'Physical Thesis Package',
        status: 'In Transit',
        deliveryStatus: 'Awaiting Delivery Confirmation',
        expectedDeliveryDate: '16-Jun-2026',
        dispatchDocuments: [
          'Thesis Package Dispatch Receipt.pdf',
          'Courier Acknowledgement.pdf',
          'Examiner Communication Letter.pdf',
          'Dispatch Proof Document.pdf'
        ],
        dispatchProof: 'dispatch_receipt_10294.pdf',
        remarks: 'Dispatched via EMS Speed Post. Tracking info shared with scholar.'
      },
      {
        id: 2,
        scholarName: 'Rajesh Kumar',
        regNo: 'DSU-PHD-2023-041',
        school: 'School of Engineering',
        department: 'Electronics & Communication Engineering (ECE)',
        guide: 'Dr. S. K. Gupta',
        thesisTitle: 'A Deep Learning Framework for Real-time Edge Video Analytics',
        examinerName: 'Dr. John Miller',
        examinerAffiliation: 'National University of Singapore (NUS)',
        examinerType: 'Foreign Examiner',
        examinerCountry: 'Singapore',
        examinerEmail: 'john.miller@nus.edu.sg',
        dispatchDate: '10-Jun-2026',
        courierService: 'DHL Express',
        trackingNumber: 'DHL987654321',
        dispatchMode: 'Physical Thesis Package',
        status: 'In Transit',
        deliveryStatus: 'Awaiting Delivery Confirmation',
        expectedDeliveryDate: '15-Jun-2026',
        dispatchDocuments: [
          'Thesis Package Dispatch Receipt.pdf',
          'Courier Acknowledgement.pdf',
          'Examiner Communication Letter.pdf',
          'Dispatch Proof Document.pdf'
        ],
        dispatchProof: null,
        remarks: ''
      }
    ]
    localStorage.setItem('dsu_ri_thesis_dispatches', JSON.stringify(initial))
    return initial
  })

  const [examinerReports, setExaminerReports] = useState(() => {
    const saved = localStorage.getItem('dsu_ri_examiner_reports')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      {
        id: 1,
        scholarName: 'Preethi S',
        school: 'School of Engineering',
        department: 'CSE',
        thesisTitle: 'Distributed Ledger Technologies for Secure Decentralized DNS Systems',
        examinerName: 'Dr. Ravi Kant',
        examinerAffiliation: 'NIT Calicut',
        examinerType: 'Indian Examiner',
        reportStatus: 'Received',
        receivedDate: '18-Jun-2026',
        reportFile: 'examiner_report_ravi_kant.pdf',
        remarks: 'Excellent thesis work, recommended for PhD award without any revisions.'
      },
      {
        id: 2,
        scholarName: 'Rajesh Kumar',
        school: 'School of Engineering',
        department: 'ECE',
        thesisTitle: 'A Deep Learning Framework for Real-time Edge Video Analytics',
        examinerName: 'Dr. John Miller',
        examinerAffiliation: 'NUS, Singapore',
        examinerType: 'Foreign Examiner',
        reportStatus: 'Awaiting Report',
        receivedDate: '',
        reportFile: null,
        remarks: ''
      }
    ]
    localStorage.setItem('dsu_ri_examiner_reports', JSON.stringify(initial))
    return initial
  })

  const [librarySubmissions, setLibrarySubmissions] = useState(() => {
    const saved = localStorage.getItem('dsu_ri_library_submissions')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      {
        id: 1,
        scholarName: 'Dr. Arun Pranesh',
        school: 'School of Basic Sciences',
        department: 'Chemistry',
        thesisTitle: 'Design of Nano-fertilizer Formulations for Sustainable Agriculture',
        submissionDate: '15-Jun-2026',
        status: 'Awaiting Archival Copy',
        libraryNoDueCert: 'library_nodue_arun.pdf',
        plagiarismCert: 'plagiarism_report_arun.pdf',
        cdSubmissionReceipt: 'cd_receipt_arun.pdf',
        verifiedCopy: null,
        remarks: ''
      },
      {
        id: 2,
        scholarName: 'Preethi S',
        school: 'School of Engineering',
        department: 'CSE',
        thesisTitle: 'Distributed Ledger Technologies for Secure Decentralized DNS Systems',
        submissionDate: '20-Jun-2026',
        status: 'Approved',
        libraryNoDueCert: 'library_nodue_preethi.pdf',
        plagiarismCert: 'plagiarism_report_preethi.pdf',
        cdSubmissionReceipt: 'cd_receipt_preethi.pdf',
        verifiedCopy: 'verified_final_thesis_preethi.pdf',
        remarks: 'All documents verified and final archival copy generated.'
      }
    ]
    localStorage.setItem('dsu_ri_library_submissions', JSON.stringify(initial))
    return initial
  })

  useEffect(() => {
    localStorage.setItem('dsu_ri_applications', JSON.stringify(retApplications))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [retApplications])

  useEffect(() => {
    localStorage.setItem('dsu_ri_original_docs', JSON.stringify(originalDocs))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [originalDocs])

  useEffect(() => {
    localStorage.setItem('dsu_ri_publications', JSON.stringify(riPublications))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [riPublications])

  useEffect(() => {
    localStorage.setItem('dsu_ri_plagiarism', JSON.stringify(riPlagiarism))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [riPlagiarism])

  useEffect(() => {
    localStorage.setItem('dsu_ri_format_checking', JSON.stringify(riFormatChecking))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [riFormatChecking])

  useEffect(() => {
    localStorage.setItem('dsu_ri_thesis_dispatches', JSON.stringify(thesisDispatches))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [thesisDispatches])

  useEffect(() => {
    localStorage.setItem('dsu_ri_examiner_reports', JSON.stringify(examinerReports))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [examinerReports])

  useEffect(() => {
    localStorage.setItem('dsu_ri_library_submissions', JSON.stringify(librarySubmissions))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [librarySubmissions])

  // 6. Registrar State
  const [registrarRegistrations, setRegistrarRegistrations] = useState(() => {
    const saved = localStorage.getItem('dsu_registrar_registrations')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      {
        id: 1,
        scholarName: 'Preethi S',
        regNumber: 'DSU/PHD/2026/089',
        school: 'School of Computing Sciences',
        department: 'CSE',
        applicationDate: '10-Jun-2026',
        status: 'Pending Verification',
        admissionLetter: 'admission_letter_preethi.pdf',
        eligibilityDocs: 'eligibility_cert_preethi.pdf',
        verifiedDoc: null,
        remarks: ''
      },
      {
        id: 2,
        scholarName: 'Aishwarya S',
        regNumber: 'DSU/PHD/2026/092',
        school: 'School of Management',
        department: 'Finance',
        applicationDate: '12-Jun-2026',
        status: 'Approved',
        admissionLetter: 'admission_letter_aishwarya.pdf',
        eligibilityDocs: 'eligibility_cert_aishwarya.pdf',
        verifiedDoc: 'verified_registration_aishwarya.pdf',
        remarks: 'Documents verified and provisional registration approved.'
      }
    ]
    localStorage.setItem('dsu_registrar_registrations', JSON.stringify(initial))
    return initial
  })

  const [registrarAcademicRecords, setRegistrarAcademicRecords] = useState(() => {
    const saved = localStorage.getItem('dsu_registrar_academic_records')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      {
        id: 1,
        scholarName: 'Rajesh Kumar',
        regNumber: 'DSU/PHD/2026/085',
        school: 'School of Computing Sciences',
        department: 'CSE',
        recordType: 'Coursework Credit Audit',
        status: 'Pending Verification',
        submittedDocs: 'coursework_gradesheet_rajesh.pdf',
        verifiedCopy: null,
        remarks: '',
        history: [
          { semester: 'Semester 1', coursework: 'Advanced Algorithms', grade: 'A', credits: 4 },
          { semester: 'Semester 1', coursework: 'Research Methodology', grade: 'B+', credits: 4 },
          { semester: 'Semester 2', coursework: 'Machine Learning', grade: 'A-', credits: 4 },
          { semester: 'Semester 2', coursework: 'Technical Writing', grade: 'A', credits: 4 }
        ]
      },
      {
        id: 2,
        scholarName: 'Aishwarya S',
        regNumber: 'DSU/PHD/2026/092',
        school: 'School of Management',
        department: 'Finance',
        recordType: 'Comprehensive Viva Transcript',
        status: 'Approved',
        submittedDocs: 'comprehensive_viva_transcript_aishwarya.pdf',
        verifiedCopy: 'verified_viva_transcript_aishwarya.pdf',
        remarks: 'All coursework credits verified and transcript validated.',
        history: [
          { semester: 'Semester 1', coursework: 'Corporate Finance', grade: 'A', credits: 4 },
          { semester: 'Semester 1', coursework: 'Quantitative Research Methods', grade: 'A', credits: 4 }
        ]
      }
    ]
    localStorage.setItem('dsu_registrar_academic_records', JSON.stringify(initial))
    return initial
  })

  const [registrarEnrollments, setRegistrarEnrollments] = useState(() => {
    const saved = localStorage.getItem('dsu_registrar_enrollments')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      {
        id: 1,
        scholarName: 'Deepa R',
        regNumber: 'DSU/PHD/2026/094',
        school: 'School of Management',
        department: 'MBA',
        enrollmentDate: '15-Jun-2026',
        status: 'Pending Confirmation',
        enrollmentDocs: 'enrollment_application_deepa.pdf',
        signedDoc: null,
        remarks: ''
      },
      {
        id: 2,
        scholarName: 'Sneha Roy',
        regNumber: 'DSU/PHD/2026/097',
        school: 'School of Engineering',
        department: 'ECE',
        enrollmentDate: '16-Jun-2026',
        status: 'Confirmed',
        enrollmentDocs: 'enrollment_application_sneha.pdf',
        signedDoc: 'signed_enrollment_sneha.pdf',
        remarks: 'Enrollment confirmed and formal notification issued.'
      }
    ]
    localStorage.setItem('dsu_registrar_enrollments', JSON.stringify(initial))
    return initial
  })

  const [registrarDegrees, setRegistrarDegrees] = useState(() => {
    const saved = localStorage.getItem('dsu_registrar_degrees')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      {
        id: 1,
        scholarName: 'Dr. Arun Pranesh',
        regNumber: 'DSU/PHD/2026/024',
        school: 'School of Engineering',
        department: 'ECE',
        degreeStatus: 'Pending Verification',
        submissionDate: '18-May-2026',
        finalThesisTitle: 'Advanced Signal Processing Algorithms for 5G MIMO Systems',
        thesisAbstract: 'This research presents novel low-complexity algorithms for signal processing in 5G and beyond MIMO networks...',
        approvalHistory: [
          { milestone: 'First DAC coursework audit', status: 'Approved', date: '10-Jan-2026', approvedBy: 'Dean of School' },
          { milestone: 'Comprehensive Viva Voce', status: 'Approved', date: '22-Feb-2026', approvedBy: 'Dean of Research' },
          { milestone: 'Thesis Review Panel', status: 'Approved', date: '05-May-2026', approvedBy: 'External Examiner' },
          { milestone: 'Final Defense Viva', status: 'Approved', date: '18-May-2026', approvedBy: 'Vice Chancellor' }
        ],
        processingDocs: [
          { name: 'thesis_defense_report_arun.pdf', type: 'Defense Viva Report' },
          { name: 'external_examiner_clearance_arun.pdf', type: 'Examiner Clearance' },
          { name: 'library_archival_receipt_arun.pdf', type: 'Library Archival Receipt' }
        ],
        processedDoc: null,
        remarks: ''
      },
      {
        id: 2,
        scholarName: 'Dr. Deepa R',
        regNumber: 'DSU/PHD/2026/094',
        school: 'School of Management',
        department: 'MBA',
        degreeStatus: 'Approved',
        submissionDate: '22-Jun-2026',
        finalThesisTitle: 'Employee Retention Strategies in Modern Tech Startups',
        thesisAbstract: 'A study of dynamic retention policies and remote work impact on millennial workers in Indian tech centers...',
        approvalHistory: [
          { milestone: 'First DAC coursework audit', status: 'Approved', date: '12-Jan-2026', approvedBy: 'Dean of School' },
          { milestone: 'Comprehensive Viva Voce', status: 'Approved', date: '15-Mar-2026', approvedBy: 'Dean of Research' },
          { milestone: 'Thesis Review Panel', status: 'Approved', date: '10-Jun-2026', approvedBy: 'External Examiner' },
          { milestone: 'Final Defense Viva', status: 'Approved', date: '22-Jun-2026', approvedBy: 'Vice Chancellor' }
        ],
        processingDocs: [
          { name: 'thesis_defense_report_deepa.pdf', type: 'Defense Viva Report' },
          { name: 'library_archival_receipt_deepa.pdf', type: 'Library Archival Receipt' }
        ],
        processedDoc: 'processed_degree_certificate_deepa.pdf',
        remarks: 'All degree audits cleared. Provisional certificate processed and dispatched.'
      }
    ]
    localStorage.setItem('dsu_registrar_degrees', JSON.stringify(initial))
    return initial
  })

  const [registrarAwards, setRegistrarAwards] = useState(() => {
    const saved = localStorage.getItem('dsu_registrar_awards')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      {
        id: 1,
        scholarName: 'Dr. Arun Pranesh',
        regNumber: 'DSU/PHD/2026/024',
        school: 'School of Engineering',
        department: 'ECE',
        awardStatus: 'Pending Documentation',
        finalApprovalDate: '22-Jun-2026',
        finalApprover: 'Vice Chancellor Approval Board',
        certificateDetails: {
          certificateNumber: 'DSU/PHD/CERT/2026-104',
          convocationDate: '15-Oct-2026',
          registryFolio: 'FOLIO-2026-089A'
        },
        awardDocs: [
          { name: 'provisional_degree_cert_arun.pdf', type: 'Provisional Degree Certificate' },
          { name: 'board_of_governors_resolution_arun.pdf', type: 'BoG Resolution Approval' },
          { name: 'phd_final_conferred_dossier_arun.pdf', type: 'Award Clearance Dossier' }
        ],
        signedDoc: null,
        remarks: ''
      },
      {
        id: 2,
        scholarName: 'Dr. Deepa R',
        regNumber: 'DSU/PHD/2026/094',
        school: 'School of Management',
        department: 'MBA',
        awardStatus: 'Approved',
        finalApprovalDate: '21-Jun-2026',
        finalApprover: 'Vice Chancellor Approval Board',
        certificateDetails: {
          certificateNumber: 'DSU/PHD/CERT/2026-092',
          convocationDate: '15-Oct-2026',
          registryFolio: 'FOLIO-2026-042B'
        },
        awardDocs: [
          { name: 'provisional_degree_cert_deepa.pdf', type: 'Provisional Degree Certificate' },
          { name: 'board_of_governors_resolution_deepa.pdf', type: 'BoG Resolution Approval' }
        ],
        signedDoc: 'signed_degree_scroll_deepa.pdf',
        remarks: 'Signed degree scroll processed, registry ledger entry updated, and student dossier archived.'
      }
    ]
    localStorage.setItem('dsu_registrar_awards', JSON.stringify(initial))
    return initial
  })

  useEffect(() => {
    localStorage.setItem('dsu_registrar_registrations', JSON.stringify(registrarRegistrations))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [registrarRegistrations])

  useEffect(() => {
    localStorage.setItem('dsu_registrar_academic_records', JSON.stringify(registrarAcademicRecords))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [registrarAcademicRecords])

  useEffect(() => {
    localStorage.setItem('dsu_registrar_enrollments', JSON.stringify(registrarEnrollments))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [registrarEnrollments])

  useEffect(() => {
    localStorage.setItem('dsu_registrar_degrees', JSON.stringify(registrarDegrees))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [registrarDegrees])

  useEffect(() => {
    localStorage.setItem('dsu_registrar_awards', JSON.stringify(registrarAwards))
    window.dispatchEvent(new Event('notifications_updated'))
  }, [registrarAwards])

  // 7. Vice Chancellor State
  const [vcExaminers, setVcExaminers] = useState(() => {
    const saved = localStorage.getItem('dsu_vc_examiners')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      { id: 1, scholar: 'Arun Kumar', school: 'School of Computing', department: 'CSE', guide: 'Dr. Kumar', date: '15-Jun-2026', suggestedPanel: ['Dr. Amit Acharya (IIT Hyderabad)', 'Dr. John Miller (Waterloo)', 'Dr. V. Ramakrishnan (IISc)'], status: 'Pending VC Approval' },
      { id: 2, scholar: 'Priya R', school: 'School of Computing', department: 'CSE', guide: 'Dr. D. Srinivasan', date: '16-Jun-2026', suggestedPanel: ['Dr. A. K. Singh (IIT M)', 'Dr. S. Sen (ISI)'], status: 'Pending VC Approval' },
      { id: 3, scholar: 'Suresh M', school: 'School of Engineering', department: 'ECE', guide: 'Dr. Ravi', date: '16-Jun-2026', suggestedPanel: ['Dr. M. Roy (IISc)', 'Dr. J. Mukherjee (IIT KGP)'], status: 'Pending VC Approval' },
      { id: 4, scholar: 'Kavitha P', school: 'School of Computing', department: 'CSE', guide: 'Dr. R. Venkataraman', date: '17-Jun-2026', suggestedPanel: ['Dr. H. Bose (IIT B)', 'Dr. P. Das (ISI)'], status: 'Pending VC Approval' },
      { id: 5, scholar: 'Amit Sharma', school: 'School of Management', department: 'MBA', guide: 'Dr. Priya', date: '18-Jun-2026', suggestedPanel: ['Dr. R. Gopal (IIM B)', 'Dr. S. Nair (IIM C)'], status: 'Pending VC Approval' }
    ]
    localStorage.setItem('dsu_vc_examiners', JSON.stringify(initial))
    return initial
  })
  const [vcEvaluations, setVcEvaluations] = useState(() => {
    const saved = localStorage.getItem('dsu_vc_evaluations')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      { id: 1, scholar: 'Rajesh Kumar', school: 'School of Computing', department: 'CSE', guide: 'Dr. D. Srinivasan', date: '19-Jun-2026', evaluationSummary: 'All reports outstandingly recommend the thesis (Grade A). viva voca conducted.', status: 'Pending Defense Sign-off' },
      { id: 2, scholar: 'Meera S', school: 'School of Engineering', department: 'ECE', guide: 'Dr. Ravi', date: '18-Jun-2026', evaluationSummary: 'Thesis recommended for award without revisions. External examiners reports attached.', status: 'Pending Defense Sign-off' },
      { id: 3, scholar: 'Sneha Roy', school: 'School of Engineering', department: 'ECE', guide: 'Dr. S. K. Gupta', date: '20-Jun-2026', evaluationSummary: 'Grade A awarded by both foreign and Indian examiners. Defence successfully defended.', status: 'Pending Defense Sign-off' }
    ]
    localStorage.setItem('dsu_vc_evaluations', JSON.stringify(initial))
    return initial
  })
  const [vcFinalDegrees, setVcFinalDegrees] = useState(() => {
    const saved = localStorage.getItem('dsu_vc_final_degrees')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    const initial = [
      { id: 1, scholar: 'Dr. Arun Pranesh', school: 'School of Engineering', department: 'ECE', guide: 'Dr. Ravi', date: '21-Jun-2026', topic: 'Nano-fertilizers', status: 'Pending VC Degree Sanction' },
      { id: 2, scholar: 'Deepa R', school: 'School of Management', department: 'MBA', guide: 'Dr. Priya', date: '22-Jun-2026', topic: 'Strategic Brand Alliances', status: 'Pending VC Degree Sanction' }
    ]
    localStorage.setItem('dsu_vc_final_degrees', JSON.stringify(initial))
    return initial
  })

  useEffect(() => {
    localStorage.setItem('dsu_vc_examiners', JSON.stringify(vcExaminers))
  }, [vcExaminers])

  useEffect(() => {
    localStorage.setItem('dsu_vc_evaluations', JSON.stringify(vcEvaluations))
  }, [vcEvaluations])

  useEffect(() => {
    localStorage.setItem('dsu_vc_final_degrees', JSON.stringify(vcFinalDegrees))
  }, [vcFinalDegrees])

  const [activeVcApproval, setActiveVcApproval] = useState(null)
  const [vcApprovalCategory, setVcApprovalCategory] = useState('all')
  const [vcSearchQuery, setVcSearchQuery] = useState('')
  const [vcUploadedDocs, setVcUploadedDocs] = useState({})
  const [vcRemarksText, setVcRemarksText] = useState('')

  // ──── NOTIFICATION DATABASES ────
  const defaultNotifications = [
    { time: '10 mins ago', message: 'New credit allocation rules for MOOC courses updated.', type: 'info' },
    { time: '2 hours ago', message: 'First DAC schedule submission window closes on 30th June.', type: 'warning' },
    { time: '1 day ago', message: 'Dean Research released the Scopus publication audit criteria.', type: 'info' }
  ]

  const getInitialVerificationItems = (scholarName, status, guideName) => {
    switch (status) {
      case 'First DAC':
      case 'Coursework':
        return [
          { id: 'dac-1', name: 'DAC Committee Constitution', type: 'detail', value: `Convener: ${guideName} (Supervisor)\nInternal Members: Dr. R. Venkataraman, Dr. S. Ananthi, Dr. K. Balaji, Dr. M. Chitra, Dr. P. Dinesh, Dr. V. Elango\nExternal Members: Dr. M. Sathyapriya (NIT Trichy), Dr. R. Jayavel (Anna University), Dr. K. Srinivasan (NIT Trichy), Dr. A. Chandra (IIT Madras), Dr. S. Ramanujam (IISc Bangalore), Dr. V. Murugan (Pondicherry University)`, status: 'Pending', remarks: '' },
          { id: 'dac-2', name: 'DAC Proposal (dac_proposal.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'dac-3', name: 'DAC Members List (dac_members.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'dac-4', name: 'Minutes of Meeting (priya_dac1_mom.pdf)', type: 'document', status: 'Pending', remarks: '' },
          { id: 'dac-5', name: 'Progress Report (progress_report_sem1.pdf)', type: 'document', status: 'Pending', remarks: '' }
        ]
      case 'Comprehensive Viva':
        return [
          { id: 'viva-1', name: 'Comprehensive Viva Panel Selection', type: 'detail', value: `Convener: ${guideName}\nExaminer 1: Dr. Priya\nExaminer 2: Dr. Ravi\nProposed Date: 26-Jun-2026`, status: 'Pending', remarks: '' },
          { id: 'viva-2', name: 'CV Syllabus (cv_syllabus.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'viva-3', name: 'Recommendation Letter (recommendation_letter.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'viva-4', name: 'Minutes of Meeting (cv_mom.pdf)', type: 'document', status: 'Pending', remarks: '' },
          { id: 'viva-5', name: 'Progress Report (progress_report_sem2.pdf)', type: 'document', status: 'Pending', remarks: '' }
        ]
      case 'Colloquium':
        return [
          { id: 'col-1', name: 'Pre-Synopsis Colloquium Slot Booking', type: 'detail', value: `Proposed Date: 02-Jul-2026\nVenue: Research Cell Conference Room`, status: 'Pending', remarks: '' },
          { id: 'col-2', name: 'Publication Form (publication_form.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'col-3', name: 'Journal Form (journal_form.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'col-4', name: 'Milestone Fulfilment Form (fulfilment_form.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'col-5', name: 'Minutes of Meeting (colloquium_mom.pdf)', type: 'document', status: 'Pending', remarks: '' },
          { id: 'col-6', name: 'Progress Report (progress_report_sem3.pdf)', type: 'document', status: 'Pending', remarks: '' }
        ]
      case 'INCH Formatting':
      case 'Pre-Synopsis Thesis Draft':
        return [
          { id: 'inch-1', name: 'Inch Committee Formatting Verification', type: 'detail', value: `Thesis Title: Secure AI-Driven Smart Healthcare Systems`, status: 'Pending', remarks: '' },
          { id: 'inch-2', name: 'Thesis Draft (thesis_draft.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'inch-3', name: 'Synopsis Draft (synopsis_draft.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'inch-4', name: 'Plagiarism Report (plagiarism_report.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'inch-5', name: 'AI Detection Report (ai_report.pdf)', type: 'document', status: 'Pending', remarks: '' },
          { id: 'inch-6', name: 'Progress Report (progress_report_sem4.pdf)', type: 'document', status: 'Pending', remarks: '' }
        ]
      case 'Synopsis':
        return [
          { id: 'syn-1', name: 'Synopsis Evaluation & Examiner Panel', type: 'detail', value: `Proposed External Panel:\nExaminer 1 (IIT Madras)\nExaminer 2 (IISc Bangalore)`, status: 'Pending', remarks: '' },
          { id: 'syn-2', name: 'Synopsis Minutes of Meeting (synopsis_mom.pdf)', type: 'document', status: 'Pending', remarks: '' },
          { id: 'syn-3', name: 'Synopsis Draft Copy (synopsis_copy.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'syn-4', name: 'Progress Report (progress_report_sem5.pdf)', type: 'document', status: 'Pending', remarks: '' }
        ]
      case 'Thesis Evaluation':
      case 'Thesis Defense':
        return [
          { id: 'def-1', name: 'Oral Viva Voce Committee Constitution', type: 'detail', value: `Final Thesis Defense Date: 18-Jul-2026\nVenue: School of Computing Seminar Hall`, status: 'Pending', remarks: '' },
          { id: 'def-2', name: 'Evaluator Report (evaluator_report.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'def-3', name: 'Final Thesis Draft (final_thesis.pdf)', type: 'document', status: 'Verified', remarks: '' },
          { id: 'def-4', name: 'Minutes of Meeting (defense_mom.pdf)', type: 'document', status: 'Pending', remarks: '' },
          { id: 'def-5', name: 'Progress Report (progress_report_final.pdf)', type: 'document', status: 'Pending', remarks: '' }
        ]
      default:
        return [
          { id: 'gen-1', name: 'General DAC Review', type: 'detail', value: `Review by ${guideName}`, status: 'Pending', remarks: '' },
          { id: 'gen-2', name: 'Minutes of Meeting', type: 'document', status: 'Pending', remarks: '' },
          { id: 'gen-3', name: 'Progress Report', type: 'document', status: 'Pending', remarks: '' }
        ]
    }
  }

  useEffect(() => {
    if (role === 'dean_school' && view === 'workload') {
      const scholarName = query.get('scholar')
      const guideName = query.get('guide')
      if (scholarName && guideName) {
        const deptMap = {
          'Arun Kumar': 'CSE',
          'Karthik S': 'MBA',
          'Deepa R': 'ECE',
          'Naveen M': 'AIDS',
          'Akash V': 'Management Studies',
          'Harini K': 'Biotechnology'
        }
        const dept = deptMap[scholarName] || 'School of Computing'
        const gObj = {
          name: guideName,
          department: dept,
          designation: 'Professor',
          maxLimit: 8,
          currentScholars: 6,
          scholarsCount: 6,
          capacity: 8,
          vacancy: 2,
          id: 100
        }

        let scholarStatus = 'First DAC'
        const dac = schoolDacs.find(d => d.scholar === scholarName)
        if (dac) scholarStatus = 'First DAC'
        const viva = schoolVivas.find(v => v.scholar === scholarName)
        if (viva) {
          if (scholarName === 'Harini K') {
            scholarStatus = 'Thesis Defense'
          } else {
            scholarStatus = 'Comprehensive Viva'
          }
        }
        const colloq = schoolColloquiums.find(c => c.scholar === scholarName)
        if (colloq) scholarStatus = 'Colloquium'
        const inch = inchSubmissions.find(i => i.scholar === scholarName)
        if (inch) scholarStatus = 'Pre-Synopsis Thesis Draft'
        const syn = schoolSynopsis.find(s => s.scholar === scholarName)
        if (syn) scholarStatus = 'Synopsis'

        const sObj = {
          name: scholarName,
          topic: dac?.topic || colloq?.topic || syn?.topic || 'Research Thesis work',
          status: scholarStatus,
          year: '2023'
        }

        if (!deanVerifyItems[scholarName]) {
          const initialItems = getInitialVerificationItems(scholarName, scholarStatus, guideName)
          setDeanVerifyItems(prev => ({
            ...prev,
            [scholarName]: initialItems
          }))
        }

        setActiveDeanGuide(gObj)
        setActiveDeanVerifyScholar(sObj)
      }
    } else if (role === 'dean' && view === 'schools') {
      const scholarName = query.get('scholar')
      const guideName = query.get('guide')
      if (scholarName && guideName) {
        const guideSchoolMap = {
          'Dr. Kumar': { id: 'computing', name: 'School of Computing', dept: 'CSE' },
          'Dr. Priya': { id: 'computing', name: 'School of Computing', dept: 'AI & DS' },
          'Dr. Ravi': { id: 'computing', name: 'School of Computing', dept: 'ECE' },
          'Dr. D. Srinivasan': { id: 'computing', name: 'School of Computing', dept: 'Computer Science' },
          'Dr. R. Venkataraman': { id: 'computing', name: 'School of Computing', dept: 'Computer Science' },
          'Dr. S. K. Gupta': { id: 'engineering', name: 'School of Engineering', dept: 'Mechanical Eng' },
          'Dr. A. K. Sharma': { id: 'engineering', name: 'School of Engineering', dept: 'Civil Eng' },
          'Dr. Rajesh Khanna': { id: 'engineering', name: 'School of Engineering', dept: 'Electrical Eng' },
          'Dr. D. Srinivasan (Mgt)': { id: 'management', name: 'School of Management', dept: 'MBA' },
          'Dr. Amit Patel': { id: 'management', name: 'School of Management', dept: 'Finance' },
          'Dr. H. Subramanian (Phys)': { id: 'science', name: 'School of Science', dept: 'Physics' },
          'Dr. V. Rama': { id: 'science', name: 'School of Science', dept: 'Chemistry' },
          'Dr. Praveen K (Agri)': { id: 'agriculture', name: 'School of Agricultural Sciences', dept: 'Agronomy' }
        }
        const schoolInfo = guideSchoolMap[guideName] || { id: 'computing', name: 'School of Computing', dept: 'CSE' }
        
        setActiveDeanSchool({
          id: schoolInfo.id,
          name: schoolInfo.name
        })
        setActiveDeanGuide({
          name: guideName,
          department: schoolInfo.dept
        })
        setActiveDeanVerifyScholar(scholarName)
      }
    } else if (role === 'vc') {
      const scholarName = query.get('scholar')
      if (scholarName) {
        const list = []
        vcExaminers.forEach(item => {
          list.push({
            id: `exam-${item.id}`,
            date: item.date || '15-Jun-2026',
            school: item.school || 'School of Computing',
            department: item.department || 'CSE',
            scholar: item.scholar,
            guide: item.guide || 'Dr. Kumar',
            type: 'Examiner Panel Approval',
            status: item.status === 'Pending VC Approval' ? 'Pending' : (item.status === 'Examiner Panel Signed' ? 'Approved' : 'Denied'),
            original: item,
            source: 'examiners'
          })
        })
        vcEvaluations.forEach(item => {
          list.push({
            id: `eval-${item.id}`,
            date: item.date || '18-Jun-2026',
            school: item.school || 'School of Engineering',
            department: item.department || 'ECE',
            scholar: item.scholar,
            guide: item.guide || 'Dr. Ravi',
            type: 'Thesis Evaluation Approval',
            status: item.status === 'Pending Defense Sign-off' ? 'Pending' : (item.status === 'Defense Sign-off Completed' ? 'Approved' : 'Denied'),
            original: item,
            source: 'evaluations'
          })
        })
        vcFinalDegrees.forEach(item => {
          list.push({
            id: `deg-${item.id}`,
            date: item.date || '22-Jun-2026',
            school: item.school || 'School of Management',
            department: item.department || 'MBA',
            scholar: item.scholar,
            guide: item.guide || 'Dr. Priya',
            type: 'Final PhD Approval',
            status: item.status === 'Pending VC Degree Sanction' ? 'Pending' : (item.status === 'Approved' ? 'Approved' : 'Denied'),
            original: item,
            source: 'degrees'
          })
        })
        const match = list.find(a => a.scholar.toLowerCase() === scholarName.toLowerCase() && a.status === 'Pending')
        if (match) {
          setActiveVcApproval(match)
        }
      }
    } else if (role === 'registrar') {
      const scholarName = query.get('scholarName')
      if (scholarName) {
        if (view === 'registration') {
          const match = registrarRegistrations.find(r => r.scholarName === scholarName)
          if (match) setActiveRegistrarRegistration(match)
        } else if (view === 'enrollment') {
          const match = registrarEnrollments.find(e => e.scholarName === scholarName)
          if (match) setActiveRegistrarEnrollment(match)
        } else if (view === 'records') {
          const match = registrarAcademicRecords.find(r => r.scholarName === scholarName)
          if (match) setActiveRegistrarRecord(match)
        } else if (view === 'degree') {
          const match = registrarDegrees.find(d => d.scholarName === scholarName)
          if (match) setActiveRegistrarDegree(match)
        } else if (view === 'award') {
          const match = registrarAwards.find(a => a.scholarName === scholarName)
          if (match) setActiveRegistrarAward(match)
        }
      }
    } else if (role === 'ri_office') {
      const scholarName = query.get('scholarName')
      if (scholarName) {
        if (view === 'application') {
          const match = retApplications.find(a => a.scholarName === scholarName)
          if (match) setActiveRiApplication(match)
        } else if (view === 'document') {
          const match = originalDocs.find(d => d.scholarName === scholarName)
          if (match) setActiveRiDocument(match)
        } else if (view === 'publication') {
          const match = riPublications.find(p => p.scholarName === scholarName)
          if (match) setActiveRiPublication(match)
        } else if (view === 'plagiarism') {
          const match = riPlagiarism.find(p => p.scholarName === scholarName)
          if (match) setActiveRiPlagiarism(match)
        } else if (view === 'format') {
          const match = riFormatChecking.find(f => f.scholarName === scholarName)
          if (match) setActiveRiFormat(match)
        } else if (view === 'thesis') {
          const match = thesisDispatches.find(t => t.scholarName === scholarName)
          if (match) setActiveThesisDispatch(match)
        } else if (view === 'examiner_report') {
          const match = examinerReports.find(e => e.scholarName === scholarName)
          if (match) setActiveExaminerReport(match)
        } else if (view === 'library') {
          const match = librarySubmissions.find(l => l.scholarName === scholarName)
          if (match) setActiveLibrarySubmission(match)
        }
      }
    }
  }, [location.search, role, view, registrarRegistrations, registrarEnrollments, registrarAcademicRecords, registrarDegrees, registrarAwards, retApplications, originalDocs, riPublications, riPlagiarism, riFormatChecking, thesisDispatches, examinerReports, librarySubmissions])

  // ──── HELPERS FOR INTERACTIVITY ────
  const handleApproveAction = (list, setList, id, successStatus = 'Approved') => {
    setList(list.map(item => item.id === id ? { ...item, status: successStatus } : item))
  }

  // ──── RENDER RAMP ────

  // 1. Scholar Dashboard View (STAYS 100% UNCHANGED)
  if (role === 'scholar') {
    return (
      <div className="space-y-6">
        <section>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <LoadingSkeleton className="h-20" />
              <LoadingSkeleton className="h-20" />
              <LoadingSkeleton className="h-20" />
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-xl font-black text-dsu-maroon uppercase tracking-wide">Welcome, {profile.name}</div>
                <div className="text-sm text-slate-500 font-semibold mt-1">{profile.department} • Guide: {scholar.guide || 'Dr. D. Srinivasan'}</div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Scholar ID</div>
                <div className="text-base font-extrabold text-slate-800">{profile.scholarId || profile.sub}</div>
              </div>
            </div>
          )}
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Coursework Completion" value="100%" />
            <StatCard title="Publications" value={(publications && publications.journal) || 2} />
            <StatCard title="Research Progress" value="85%" />
            <StatCard title="Thesis Status" value="Under Evaluation" />
          </div>
        </section>

        <section>
          <Timeline milestones={milestones} />
        </section>

        <section className="grid grid-cols-1 gap-4 items-start h-fit">
          <div className="space-y-4 h-fit">
            <ActivitiesWidget items={activities} />
          </div>
        </section>
      </div>
    )
  }

  // 2. Supervisor Dashboard Views
  if (role === 'supervisor') {
    const handleCreateDac = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const newDac = {
        id: dacPanels.length + 1,
        scholar: formData.get('scholar'),
        internal: formData.get('internal'),
        external: formData.get('external'),
        date: formData.get('date'),
        status: 'Pending Dean Approval'
      }
      setDacPanels([newDac, ...dacPanels])
      e.target.reset()
      alert('DAC Committee constituted successfully and submitted for Dean approval!')
    }

    const handleAllotCourse = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const newAlloc = {
        id: courseworkAllocations.length + 1,
        scholar: formData.get('scholar'),
        course: formData.get('course'),
        credits: parseInt(formData.get('credits') || '4'),
        type: formData.get('type'),
        status: 'Approved'
      }
      setCourseworkAllocations([newAlloc, ...courseworkAllocations])
      e.target.reset()
      alert('Course successfully allocated to scholar!')
    }

    const handleRequestViva = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const newRequest = {
        id: vivaRequests.length + 1,
        scholar: formData.get('scholar'),
        date: formData.get('date'),
        external: formData.get('external'),
        status: 'Pending Approval'
      }
      setVivaRequests([newRequest, ...vivaRequests])
      e.target.reset()
      alert('Comprehensive Viva request filed successfully!')
    }

    const handleScheduleColloquium = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const newColl = {
        id: colloquiumSchedules.length + 1,
        scholar: formData.get('scholar'),
        topic: formData.get('topic'),
        date: formData.get('date'),
        status: 'Scheduled'
      }
      setColloquiumSchedules([newColl, ...colloquiumSchedules])
      e.target.reset()
      alert('Pre-Synopsis Colloquium scheduled successfully!')
    }

    const handleSubmitInchRequest = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const newInch = {
        id: inchRequests.length + 1,
        scholar: formData.get('scholar'),
        title: formData.get('title'),
        date: formData.get('date'),
        status: 'Submitted'
      }
      setInchRequests([newInch, ...inchRequests])
      e.target.reset()
      alert('Inch Committee request submitted successfully!')
    }

    const handleSubmitSynopsis = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const scholar = formData.get('scholar')
      const newSyn = {
        id: synopsisRequests.length + 1,
        scholar,
        title: formData.get('title'),
        date: formData.get('date'),
        status: 'Submitted'
      }
      setSynopsisRequests([newSyn, ...synopsisRequests])
      // also add examiner panel entry if not present
      if (!synopsisExaminerStatus.find(s => s.scholar === scholar)) {
        setSynopsisExaminerStatus(prev => [{ id: prev.length + 1, scholar, panelStatus: 'Pending' }, ...prev])
      }
      e.target.reset()
      alert('Synopsis recommendation submitted successfully!')
    }

    const handleForwardForEvaluation = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const scholar = formData.get('scholar')
      const newEval = {
        id: thesisEvaluations.length + 1,
        scholar,
        title: formData.get('title'),
        submissionDate: formData.get('date'),
        evalStatus: 'Pending Submission'
      }
      setThesisEvaluations([newEval, ...thesisEvaluations])
      if (!evaluationExaminerStatus.find(s => s.scholar === scholar)) {
        setEvaluationExaminerStatus(prev => [{ id: prev.length + 1, scholar, panelStatus: 'Pending' }, ...prev])
      }
      e.target.reset()
      alert('Thesis forwarded for evaluation successfully!')
    }

    const handleSubmitDefenseRecommendation = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const newDef = {
        id: defenseRequests.length + 1,
        scholar: formData.get('scholar'),
        title: formData.get('title'),
        date: formData.get('date'),
        status: 'Pending Approval'
      }
      setDefenseRequests([newDef, ...defenseRequests])
      e.target.reset()
      alert('Defense recommendation submitted successfully!')
    }

    const handleUploadMom = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const file = formData.get('momFile')
      const newMom = {
        id: uploadedMoms.length + 1,
        scholar: formData.get('scholar'),
        type: formData.get('type'),
        date: formData.get('date'),
        fileName: file && file.name ? file.name : 'MoM_Verified_Report.pdf',
        status: 'Awaiting Audit'
      }
      setUploadedMoms([newMom, ...uploadedMoms])
      e.target.reset()
      alert('Minutes of Meeting (MoM) uploaded successfully to the center!')
    }

    const handleSubmitExaminerPanel = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const newPanel = {
        id: examinerPanels.length + 1,
        scholar: formData.get('scholar'),
        examiners: [
          formData.get('ex1') || 'Dr. K. Raghavan',
          formData.get('ex2') || 'Dr. Mary Watson',
          formData.get('ex3') || 'Dr. S. Subramaniam'
        ],
        status: 'Submitted'
      }
      setExaminerPanels([newPanel, ...examinerPanels])
      e.target.reset()
      alert('Examiner panel (3 National & 3 International) successfully submitted!')
    }

    return (
      <div className="space-y-6">

        {view === 'home' && (
          <>
            {/* Welcome */}
            <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-lg font-black text-dsu-maroon uppercase tracking-wide">Welcome, {profile.name}</div>
              <div className="text-sm text-slate-500 font-semibold mt-0.5">Research Supervisor • {profile.department}</div>
            </section>

            {/* Stat Cards */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Scholars',    value: supervisedScholars.length,                                     color: 'text-dsu-maroon' },
                { label: 'Active Scholars',   value: supervisedScholars.filter(s => s.status === 'Active').length,  color: 'text-emerald-600' },
                { label: 'Pending Approvals', value: supervisorActions.filter(a => !a.done).length,                 color: 'text-amber-600'   },
                { label: 'Upcoming Meetings', value: 5,                                                             color: 'text-blue-600'    },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                  <div className={`text-3xl font-black ${c.color}`}>{c.value}</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mt-1">{c.label}</div>
                </div>
              ))}
            </section>

            {/* Main 2-col */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

              {/* Left — Scholars + Milestone Tracker */}
              <div className="lg:col-span-2 space-y-5">

                {/* My Scholars */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">My Scholars</h3>
                    <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/8 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">{supervisedScholars.length} Active</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {[
                      { name: 'Priya R',      stage: 'Thesis Evaluation', progress: 85  },
                      { name: 'Rajesh Kumar', stage: 'Synopsis',          progress: 50  },
                      { name: 'Aishwarya S',  stage: 'First DAC',         progress: 10  },
                      { name: 'Manoj Rajan',  stage: 'Thesis Defense',    progress: 100 },
                      { name: 'Divya Menon',  stage: 'Colloquium',        progress: 40  },
                    ].map((s, i) => (
                      <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50/60 transition">
                        <div className="w-8 h-8 rounded-full bg-dsu-maroon/10 flex items-center justify-center text-xs font-black text-dsu-maroon shrink-0">
                          {s.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-slate-800">{s.name}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">{s.stage}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="w-20 bg-slate-100 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${s.progress === 100 ? 'bg-emerald-500' : 'bg-dsu-maroon'}`}
                              style={{ width: `${s.progress}%` }} />
                          </div>
                          <span className="text-[10px] font-black text-slate-600 w-7 text-right">{s.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right — Upcoming Meetings */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Upcoming Meetings</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { type: 'First DAC',         scholar: 'Aishwarya S',  date: '25 Jun 2026', time: '10:00 AM' },
                    { type: 'Colloquium',         scholar: 'Rajesh Kumar', date: '30 Jun 2026', time: '02:00 PM' },
                    { type: 'Comprehensive Viva', scholar: 'Divya Menon',  date: '05 Jul 2026', time: '11:00 AM' },
                    { type: 'Synopsis Meeting',   scholar: 'Priya R',      date: '12 Jul 2026', time: '03:00 PM' },
                    { type: 'Thesis Defense',     scholar: 'Manoj Rajan',  date: '20 Jul 2026', time: '09:00 AM' },
                  ].map((m, i) => (
                    <div key={i} className="px-5 py-3.5 hover:bg-slate-50/60 transition">
                      <p className="text-xs font-black text-slate-800">{m.type}</p>
                      <p className="text-[11px] font-semibold text-dsu-maroon mt-0.5">{m.scholar}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{m.date} • {m.time}</p>
                    </div>
                  ))}
                </div>
              </div>

            </section>
          </>
        )}






        {view === 'scholars' && (() => {
          const scholars = [
            { name: 'Priya R',      reg: 'DSU-PHD-2022-045', dept: 'Computer Science', topic: 'Secure AI-Driven Framework for Smart Healthcare Systems',     status: 'Active',      progress: 85, milestone: 'Thesis Evaluation', pubs: 4, scopus: 3, patents: 1, pending: 'Thesis Review Pending',           meeting: 'Synopsis Meeting',   meetDate: '12 Jul 2026' },
            { name: 'Rajesh Kumar', reg: 'DSU-PHD-2023-012', dept: 'Computer Science', topic: 'Blockchain for Decentralized Cloud IoT Architectures',         status: 'Active',      progress: 50, milestone: 'Synopsis',          pubs: 2, scopus: 2, patents: 0, pending: 'Publication Verification Pending', meeting: 'Colloquium',         meetDate: '30 Jun 2026' },
            { name: 'Aishwarya S',  reg: 'DSU-PHD-2024-008', dept: 'Computer Science', topic: 'Explainable AI in Cybersecurity Systems',                       status: 'Coursework',  progress: 10, milestone: 'First DAC',        pubs: 0, scopus: 0, patents: 0, pending: 'DAC Approval Pending',              meeting: 'First DAC',          meetDate: '25 Jun 2026' },
            { name: 'Manoj Rajan',  reg: 'DSU-PHD-2021-031', dept: 'Computer Science', topic: 'Edge Computing Frameworks for Heterogeneous IoT Systems',       status: 'Completed',   progress: 100,milestone: 'Thesis Defense',  pubs: 6, scopus: 5, patents: 2, pending: 'No Pending Actions',              meeting: 'Thesis Defense',     meetDate: '20 Jul 2026' },
            { name: 'Divya Menon',  reg: 'DSU-PHD-2023-019', dept: 'Computer Science', topic: 'Natural Language Processing for Regional Language Preservation', status: 'Active',      progress: 40, milestone: 'Colloquium',       pubs: 1, scopus: 1, patents: 0, pending: 'Coursework Verification Pending',  meeting: 'Comprehensive Viva', meetDate: '05 Jul 2026' },
          ]

          // 1. PHASE DETAILS VIEW FOR A SPECIFIC SCHOLAR & PHASE
          if (activeSupervisorScholar && activeSupervisorPhase) {
            const s = activeSupervisorScholar
            const phase = activeSupervisorPhase

            // Form handler wrappers so forms update list states locally
            const onConstituteDac = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newDac = {
                id: dacPanels.length + 1,
                scholar: s.name,
                internal: formData.get('internal'),
                external: formData.get('external'),
                date: formData.get('date'),
                status: 'Pending Dean Approval'
              }
              setDacPanels([newDac, ...dacPanels])
              e.target.reset()
              alert('DAC Committee constituted successfully and submitted for Dean approval!')
            }

            const onAllocateCourse = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newAlloc = {
                id: courseworkAllocations.length + 1,
                scholar: s.name,
                course: formData.get('course'),
                credits: parseInt(formData.get('credits') || '4'),
                type: formData.get('type'),
                status: 'Approved'
              }
              setCourseworkAllocations([newAlloc, ...courseworkAllocations])
              e.target.reset()
              alert('Course successfully allocated to scholar!')
            }

            const onRequestViva = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newRequest = {
                id: vivaRequests.length + 1,
                scholar: s.name,
                date: formData.get('date'),
                external: formData.get('external'),
                status: 'Pending Approval'
              }
              setVivaRequests([newRequest, ...vivaRequests])
              e.target.reset()
              alert('Comprehensive Viva request filed successfully!')
            }

            const onScheduleColloquium = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newColl = {
                id: colloquiumSchedules.length + 1,
                scholar: s.name,
                topic: formData.get('topic'),
                date: formData.get('date'),
                status: 'Scheduled'
              }
              setColloquiumSchedules([newColl, ...colloquiumSchedules])
              e.target.reset()
              alert('Pre-Synopsis Colloquium scheduled successfully!')
            }

            const onRecommendSynopsis = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newSyn = {
                id: synopsisRequests.length + 1,
                scholar: s.name,
                title: formData.get('title'),
                date: formData.get('date'),
                status: 'Submitted'
              }
              setSynopsisRequests([newSyn, ...synopsisRequests])
              if (!synopsisExaminerStatus.find(ex => ex.scholar === s.name)) {
                setSynopsisExaminerStatus(prev => [{ id: prev.length + 1, scholar: s.name, panelStatus: 'Pending' }, ...prev])
              }
              e.target.reset()
              alert('Synopsis recommendation submitted successfully!')
            }

            const onForwardEvaluation = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newEval = {
                id: thesisEvaluations.length + 1,
                scholar: s.name,
                title: formData.get('title'),
                submissionDate: formData.get('date'),
                evalStatus: 'Pending Submission'
              }
              setThesisEvaluations([newEval, ...thesisEvaluations])
              if (!evaluationExaminerStatus.find(ex => ex.scholar === s.name)) {
                setEvaluationExaminerStatus(prev => [{ id: prev.length + 1, scholar: s.name, panelStatus: 'Pending' }, ...prev])
              }
              e.target.reset()
              alert('Thesis forwarded for evaluation successfully!')
            }

            const onRecommendDefense = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newDef = {
                id: defenseRequests.length + 1,
                scholar: s.name,
                title: formData.get('title'),
                date: formData.get('date'),
                status: 'Pending Approval'
              }
              setDefenseRequests([newDef, ...defenseRequests])
              e.target.reset()
              alert('Defense recommendation submitted successfully!')
            }

            const onUploadMom = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const scholarName = formData.get('scholarName')
              const meetingType = formData.get('meetingType')
              const meetingDate = formData.get('meetingDate')
              const file = formData.get('momFile')
              const newMom = {
                id: uploadedMoms.length + 1,
                scholar: scholarName || s.name,
                type: meetingType || (phase + ' Meeting'),
                date: meetingDate || new Date().toISOString().split('T')[0],
                fileName: file && file.name ? file.name : `${(scholarName || s.name).toLowerCase().replace(' ', '_')}_mom.pdf`,
                status: 'Awaiting Audit'
              }
              setUploadedMoms([newMom, ...uploadedMoms])
              e.target.reset()
              alert(`Minutes of Meeting for ${newMom.type} uploaded successfully and sent to registry!`)
            }

            const renderMomUploadForm = () => {
              return (
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-dsu-maroon/5 flex items-center justify-center text-dsu-maroon">
                      <Upload className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-[10px] font-black text-dsu-maroon uppercase tracking-wider">Upload Minutes of Meeting</h4>
                  </div>

                  <form onSubmit={onUploadMom} className="space-y-3 text-xs font-semibold text-slate-700">
                    {/* Scholar name hidden element to preserve the handler payload */}
                    <input type="hidden" name="scholarName" value={s.name} />
                    <input 
                      type="hidden" 
                      name="meetingType" 
                      value={
                        phase === 'First DAC' ? 'First DAC Meeting' :
                        phase === 'Comprehensive Viva' ? 'Comprehensive Viva' :
                        phase === 'Colloquium' ? 'Pre-Synopsis Colloquium' :
                        phase === 'Synopsis' ? 'Synopsis Meeting' :
                        phase === 'Thesis Evaluation' ? 'Thesis Evaluation Review' :
                        phase + ' Meeting'
                      } 
                    />

                    <div>
                      <label className="block mb-1 text-slate-600 font-bold">Meeting Date</label>
                      <input type="date" name="meetingDate" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border border-slate-200 p-2 rounded-lg bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required />
                    </div>

                    <div>
                      <label className="block mb-1 text-slate-600 font-bold">Upload MoM PDF</label>
                      <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-3 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-slate-50 transition cursor-pointer text-center relative">
                        <FileText className="w-5 h-5 text-slate-400 mb-1" />
                        <span className="text-[10px] font-bold text-slate-500">Click to upload PDF</span>
                        <span className="text-[9px] text-slate-400 mt-0.5">Max size: 10MB</span>
                        <input type="file" name="momFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                      </div>
                    </div>

                    <button type="submit" className="w-full flex items-center justify-center gap-1.5 bg-dsu-maroon hover:bg-red-800 text-white font-extrabold uppercase py-2.5 rounded-lg transition text-xs tracking-wider shadow-sm">
                      <Send className="w-3.5 h-3.5" />
                      Upload & Send to Registry
                    </button>
                  </form>

                  {/* List of uploaded documents for this scholar & phase */}
                  {uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes(phase) || m.type.toLowerCase().includes(phase.toLowerCase()))).length > 0 && (
                    <div className="border-t border-slate-100 pt-2.5 space-y-2">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Uploaded Documents History</p>
                      <div className="space-y-1.5">
                        {uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes(phase) || m.type.toLowerCase().includes(phase.toLowerCase()))).map((m, idx) => (
                          <div key={idx} className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between text-[11px]">
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-slate-800 truncate max-w-[130px]">{m.fileName}</p>
                              <p className="text-[9px] text-slate-500">{m.date}</p>
                            </div>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border-amber-200 shrink-0">{m.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
              }

            const renderFirstDacSupervisorWorkspace = (s) => {
              const tabClass = (tab) => `flex-1 py-2 text-center text-xs font-black uppercase tracking-wider border-b-2 transition duration-150 ${firstDacTab === tab ? 'border-dsu-maroon text-dsu-maroon' : 'border-transparent text-slate-400 hover:text-slate-600'}`

              const onAddExternal = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const list = proposedDacMembers.filter(m => m.scholar === s.name && m.type === 'External')
                if (list.length >= 6) {
                  alert('You have already proposed 6 External Members!')
                  return
                }
                const newMember = {
                  id: 'ext_' + Date.now(),
                  scholar: s.name,
                  type: 'External',
                  name: formData.get('name'),
                  designation: formData.get('designation'),
                  institution: formData.get('institution'),
                  cvFileName: formData.get('cvFile') && formData.get('cvFile').name ? formData.get('cvFile').name : 'cv_uploaded.pdf'
                }
                setProposedDacMembers(prev => [...prev, newMember])
                e.target.reset()
              }

              const onAddInternal = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const list = proposedDacMembers.filter(m => m.scholar === s.name && m.type === 'Internal')
                if (list.length >= 6) {
                  alert('You have already proposed 6 Internal Members!')
                  return
                }
                const newMember = {
                  id: 'int_' + Date.now(),
                  scholar: s.name,
                  type: 'Internal',
                  name: formData.get('name'),
                  designation: formData.get('designation'),
                  department: formData.get('department')
                }
                setProposedDacMembers(prev => [...prev, newMember])
                e.target.reset()
              }

              const onDeleteMember = (id) => {
                setProposedDacMembers(prev => prev.filter(m => m.id !== id))
              }

              const onSubmitDacPanel = () => {
                const extCount = proposedDacMembers.filter(m => m.scholar === s.name && m.type === 'External').length
                const intCount = proposedDacMembers.filter(m => m.scholar === s.name && m.type === 'Internal').length
                if (extCount !== 6 || intCount !== 6) {
                  alert('You must propose exactly 6 External and 6 Internal members to submit!')
                  return
                }
                const newPanel = {
                  id: dacPanels.length + 1,
                  scholar: s.name,
                  internal: proposedDacMembers.filter(m => m.scholar === s.name && m.type === 'Internal').map(m => m.name).join(', '),
                  external: proposedDacMembers.filter(m => m.scholar === s.name && m.type === 'External').map(m => m.name).join(', '),
                  date: new Date().toISOString().split('T')[0],
                  status: 'Pending Dean Approval'
                }
                setDacPanels([newPanel, ...dacPanels])
                alert('12-member DAC panel proposed successfully and forwarded for Dean approval!')
              }

              const onScheduleDacMeeting = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const newMeeting = {
                  id: dacMeetings.length + 1,
                  reqNo: formData.get('reqNo'),
                  scholar: s.name,
                  date: formData.get('date'),
                  time: formData.get('time'),
                  venue: formData.get('venue'),
                  status: 'Submitted'
                }
                setDacMeetings([newMeeting, ...dacMeetings])
                e.target.reset()
                alert('First DAC advisory meeting requested successfully!')
              }

              const onAddCoursework = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const newCourse = {
                  id: courseworkAllocations.length + 1,
                  scholar: s.name,
                  course: formData.get('courseName'),
                  credits: parseInt(formData.get('credits') || '4'),
                  type: formData.get('courseType'),
                  code: '',
                  status: 'Approved'
                }
                setCourseworkAllocations([...courseworkAllocations, newCourse])
                e.target.reset()
                alert('Coursework course allocated successfully!')
              }

              const onGenerateCourseCode = (courseId) => {
                setCourseworkAllocations(prev => prev.map(c => {
                  if (c.id === courseId) {
                    const rand = Math.floor(100 + Math.random() * 900)
                    const deptCode = s.dept === 'Computer Science' ? 'CS' : 'PHD'
                    const prefix = c.type === 'Mandatory Course' ? 'RM' : 'SS'
                    return { ...c, code: `${prefix}-${deptCode}-${rand}` }
                  }
                  return c
                }))
              }

              const extList = proposedDacMembers.filter(m => m.scholar === s.name && m.type === 'External')
              const intList = proposedDacMembers.filter(m => m.scholar === s.name && m.type === 'Internal')
              const scholarMeetings = dacMeetings.filter(m => m.scholar === s.name)
              const scholarCourses = courseworkAllocations.filter(c => c.scholar === s.name)

              return (
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                  {/* Visual Step Pipeline matching First DAC workflow flowchart */}
                  <div className="p-4 bg-red-50/30 rounded-2xl border border-red-100/50 space-y-3">
                    <div className="flex justify-between items-center border-b border-red-100 pb-2">
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">First DAC Guide Workflow Progress</h4>
                      <span className="text-[9px] font-bold text-dsu-maroon uppercase tracking-wide bg-dsu-maroon/5 px-2 py-0.5 rounded">Milestone Pipeline</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-center text-[9px] font-bold">
                      {[
                        { key: 'coursework', label: 'Coursework Allocation', note: 'Mandatory & Self-Study', done: scholarCourses.length > 0 },
                        { key: 'meeting', label: 'Request Advisory Meeting', note: 'Req.No, Date/Time, Venue', done: scholarMeetings.length > 0 },
                        { key: 'panel', label: 'Propose DAC Panel', note: '6 Internal + 6 External', done: dacPanels.filter(p => p.scholar === s.name).length > 0 },
                        { key: 'course-code', label: 'Generate Course Code', note: 'For Assigned Courses', done: scholarCourses.length > 0 && scholarCourses.every(c => c.code) },
                        { key: 'mom', label: 'Upload MoM of First DAC', note: 'Signed PDF Upload', done: uploadedMoms.some(m => m.scholar === s.name && m.type.toLowerCase().includes('first dac')) }
                      ].map((step, idx) => {
                        const isActive = firstDacTab === step.key
                        return (
                          <div
                            key={step.key}
                            onClick={() => setFirstDacTab(step.key)}
                            className={`p-2.5 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[75px] ${
                              isActive 
                                ? 'bg-dsu-maroon text-white border-dsu-maroon shadow-md scale-[1.02]' 
                                : step.done
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black border ${
                                  isActive
                                    ? 'bg-white text-dsu-maroon border-white'
                                    : step.done
                                      ? 'bg-emerald-500 text-white border-emerald-500'
                                      : 'bg-slate-100 text-slate-400 border-slate-300'
                                }`}>
                                  {idx + 1}
                                </span>
                                {step.done && !isActive && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                              </div>
                              <p className={`font-black uppercase text-[8px] leading-tight ${isActive ? 'text-white' : 'text-slate-800'}`}>{step.label}</p>
                            </div>
                            <p className={`text-[7px] mt-1 font-semibold leading-tight ${isActive ? 'text-white/80' : 'text-slate-400'}`}>{step.note}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex border-b border-slate-100 pb-1">
                    <button onClick={() => setFirstDacTab('coursework')} className={tabClass('coursework')}>
                      Coursework ({scholarCourses.length})
                    </button>
                    <button onClick={() => setFirstDacTab('meeting')} className={tabClass('meeting')}>
                      Advisory Meeting ({scholarMeetings.length})
                    </button>
                    <button onClick={() => setFirstDacTab('panel')} className={tabClass('panel')}>
                      DAC Panel ({extList.length + intList.length}/12)
                    </button>
                    <button onClick={() => setFirstDacTab('course-code')} className={tabClass('course-code')}>
                      Course Code ({scholarCourses.filter(c => c.code).length}/{scholarCourses.length})
                    </button>
                    <button onClick={() => setFirstDacTab('mom')} className={tabClass('mom')}>
                      Upload MoM
                    </button>
                  </div>

                  {firstDacTab === 'panel' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Propose DAC Committee Panel</h4>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">DSU Regulations require exactly 6 External and 6 Internal members.</p>
                        </div>
                        <button 
                          onClick={onSubmitDacPanel}
                          disabled={extList.length !== 6 || intList.length !== 6}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                            extList.length === 6 && intList.length === 6
                              ? 'bg-dsu-maroon hover:bg-red-800 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                          }`}
                        >
                          Submit Panel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 border rounded-xl space-y-3">
                          <div className="flex items-center justify-between border-b pb-2">
                            <span className="text-[10px] font-black text-dsu-maroon uppercase tracking-wide">6 External Members ({extList.length}/6)</span>
                            <span className="text-[9px] font-bold text-slate-400">CV PDF Required</span>
                          </div>

                          <form onSubmit={onAddExternal} className="space-y-2 text-[11px] font-semibold text-slate-600">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block mb-0.5">Name</label>
                                <input type="text" name="name" placeholder="Dr. Jane Doe" className="w-full border p-1.5 rounded bg-white focus:outline-none focus:border-dsu-maroon" required />
                              </div>
                              <div>
                                <label className="block mb-0.5">Designation</label>
                                <input type="text" name="designation" placeholder="Professor" className="w-full border p-1.5 rounded bg-white focus:outline-none focus:border-dsu-maroon" required />
                              </div>
                            </div>
                            <div>
                              <label className="block mb-0.5">Institution</label>
                              <input type="text" name="institution" placeholder="NIT Trichy" className="w-full border p-1.5 rounded bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-0.5">Upload CV (PDF)</label>
                              <input type="file" name="cvFile" accept="application/pdf" className="w-full text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-dsu-maroon/10 file:text-dsu-maroon hover:file:bg-dsu-maroon/20" required />
                            </div>
                            <button type="submit" className="w-full bg-[#001c4f] text-white py-1.5 rounded font-bold hover:bg-slate-800 transition text-[10px] uppercase tracking-wider">
                              Add External Member
                            </button>
                          </form>

                          <div className="space-y-1 pt-2 border-t max-h-48 overflow-y-auto">
                            {extList.length === 0 ? (
                              <p className="text-[10px] text-slate-400 italic text-center py-2">No external members proposed yet.</p>
                            ) : (
                              extList.map((m, idx) => (
                                <div key={m.id} className="bg-white p-2 rounded border flex items-center justify-between text-[10px]">
                                  <div className="min-w-0">
                                    <p className="font-bold text-slate-800">{idx+1}. {m.name} ({m.designation})</p>
                                    <p className="text-slate-400 font-semibold">{m.institution} &bull; <span className="text-dsu-maroon">{m.cvFileName}</span></p>
                                  </div>
                                  <button onClick={() => onDeleteMember(m.id)} className="text-slate-400 hover:text-red-600 transition shrink-0 p-1">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 border rounded-xl space-y-3">
                          <div className="flex items-center justify-between border-b pb-2">
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-wide">6 Internal Members ({intList.length}/6)</span>
                            <span className="text-[9px] font-bold text-slate-400">No CV Required</span>
                          </div>

                          <form onSubmit={onAddInternal} className="space-y-2 text-[11px] font-semibold text-slate-600">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block mb-0.5">Name</label>
                                <input type="text" name="name" placeholder="Dr. John Smith" className="w-full border p-1.5 rounded bg-white focus:outline-none focus:border-dsu-maroon" required />
                              </div>
                              <div>
                                <label className="block mb-0.5">Designation</label>
                                <input type="text" name="designation" placeholder="Associate Professor" className="w-full border p-1.5 rounded bg-white focus:outline-none focus:border-dsu-maroon" required />
                              </div>
                            </div>
                            <div>
                              <label className="block mb-0.5">Department</label>
                              <input type="text" name="department" placeholder="Computer Science & Engineering" className="w-full border p-1.5 rounded bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <button type="submit" className="w-full bg-[#001c4f] text-white py-1.5 rounded font-bold hover:bg-slate-800 transition text-[10px] uppercase tracking-wider mt-5">
                              Add Internal Member
                            </button>
                          </form>

                          <div className="space-y-1 pt-2 border-t max-h-48 overflow-y-auto">
                            {intList.length === 0 ? (
                              <p className="text-[10px] text-slate-400 italic text-center py-2">No internal members proposed yet.</p>
                            ) : (
                              intList.map((m, idx) => (
                                <div key={m.id} className="bg-white p-2 rounded border flex items-center justify-between text-[10px]">
                                  <div className="min-w-0">
                                    <p className="font-bold text-slate-800">{idx+1}. {m.name} ({m.designation})</p>
                                    <p className="text-slate-400 font-semibold">{m.department}</p>
                                  </div>
                                  <button onClick={() => onDeleteMember(m.id)} className="text-slate-400 hover:text-red-600 transition shrink-0 p-1">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {firstDacTab === 'meeting' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Request First Doctoral Advisory Meeting</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Submit details to request and schedule the first DAC research milestone presentation.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onScheduleDacMeeting} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                          <div>
                            <label className="block mb-1 text-slate-600">Scholar Name</label>
                            <input type="text" value={s.name} className="w-full border p-2 rounded-lg bg-slate-200 text-slate-500 outline-none" readOnly />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Request Number</label>
                            <input type="text" name="reqNo" value={`REQ-DAC1-00${Math.floor(10 + Math.random() * 89)}`} className="w-full border p-2 rounded-lg bg-slate-200 text-slate-500 outline-none font-bold" readOnly />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 text-slate-600">Date</label>
                              <input type="date" name="date" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600">Time</label>
                              <input type="time" name="time" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Venue</label>
                            <input type="text" name="venue" placeholder="e.g. Research Cell Meeting Room" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Request Meeting
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Meeting Requests Queue</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px]">
                            {scholarMeetings.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No meetings scheduled for this scholar yet.</p>
                            ) : (
                              scholarMeetings.map((m, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition text-xs font-semibold text-slate-700">
                                  <div className="flex justify-between items-center">
                                    <span className="font-extrabold text-dsu-maroon">{m.reqNo}</span>
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase">{m.status}</span>
                                  </div>
                                  <p className="mt-1 font-bold">Venue: {m.venue}</p>
                                  <p className="text-[10px] text-slate-400 mt-0.5">Scheduled Date: {m.date} &bull; Time: {m.time}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {firstDacTab === 'coursework' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Coursework Allocation Desk</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Assign Core and Elective coursework subjects, and generate official university course codes.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onAddCoursework} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                          <div>
                            <label className="block mb-1 text-slate-600">Course Type</label>
                            <select name="courseType" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required>
                              <option value="Mandatory Course">Mandatory Course (Core)</option>
                              <option value="Self Study Course">Self Study Course (Elective)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Course Title</label>
                            <input type="text" name="courseName" placeholder="e.g. Advanced Data Mining" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Credits</label>
                            <select name="credits" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required>
                              <option value="4">4 Credits</option>
                              <option value="3">3 Credits</option>
                              <option value="2">2 Credits</option>
                            </select>
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Allocate Course
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Allocated Coursework Mapping</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px] text-xs font-semibold text-slate-700">
                            {scholarCourses.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No coursework allocated yet.</p>
                            ) : (
                              scholarCourses.map((c, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition flex justify-between items-center gap-3">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 leading-tight">{c.course}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">
                                      Type: {c.type} &bull; Credits: {c.credits}
                                    </p>
                                  </div>
                                  <div className="shrink-0 text-right">
                                    {c.code ? (
                                      <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-2 py-1 text-[10px] font-black uppercase tracking-wider">
                                        {c.code}
                                      </span>
                                    ) : (
                                      <button
                                        onClick={() => onGenerateCourseCode(c.id)}
                                        className="px-2.5 py-1 bg-dsu-maroon hover:bg-red-800 text-white rounded text-[9px] font-black uppercase tracking-wider shadow-sm transition"
                                      >
                                        Generate Code
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {firstDacTab === 'course-code' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Generate Course Code</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Generate official university course codes for all allocated coursework subjects.</p>
                      </div>

                      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                        <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                          <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Assigned Coursework Codes</h5>
                        </div>
                        <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px] text-xs font-semibold text-slate-700">
                          {scholarCourses.length === 0 ? (
                            <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No coursework allocated yet. Please use the "Coursework" tab to assign courses first.</p>
                          ) : (
                            scholarCourses.map((c, idx) => (
                              <div key={idx} className="p-3.5 hover:bg-slate-50/50 transition flex justify-between items-center gap-3">
                                <div className="min-w-0">
                                  <p className="font-extrabold text-slate-900 leading-tight">{c.course}</p>
                                  <p className="text-[10px] text-slate-400 font-semibold mt-1">
                                    Type: {c.type} &bull; Credits: {c.credits} Credits
                                  </p>
                                </div>
                                <div className="shrink-0 text-right">
                                  {c.code ? (
                                    <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">
                                      {c.code}
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => onGenerateCourseCode(c.id)}
                                      className="px-3 py-1.5 bg-dsu-maroon hover:bg-red-800 text-white rounded text-[10px] font-black uppercase tracking-wider shadow-sm transition"
                                    >
                                      Generate Course Code
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {firstDacTab === 'mom' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">First DAC Minutes of Meeting Upload</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Upload the official first DAC minutes signed by all internal and external expert members.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                          <form onSubmit={onUploadMom} className="p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                            <input type="hidden" name="scholarName" value={s.name} />
                            <input type="hidden" name="meetingType" value="First DAC Meeting" />
                            <div>
                              <label className="block mb-1 text-slate-600 font-bold">Meeting Date</label>
                              <input type="date" name="meetingDate" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border border-slate-200 p-2 rounded-lg bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600 font-bold">Upload MoM PDF</label>
                              <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-4 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                                <FileText className="w-6 h-6 text-slate-400 mb-1" />
                                <span className="text-[10px] font-bold text-slate-500">Click to upload PDF</span>
                                <span className="text-[9px] text-slate-400 mt-0.5">Max size: 10MB</span>
                                <input type="file" name="momFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                              </div>
                            </div>
                            <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                              Upload MoM
                            </button>
                          </form>
                        </div>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">MoM Upload Archives</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px] text-xs font-semibold text-slate-700">
                            {uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes('First DAC') || m.type.toLowerCase().includes('first dac'))).length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No Minutes of Meeting uploaded yet.</p>
                            ) : (
                              uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes('First DAC') || m.type.toLowerCase().includes('first dac'))).map((m, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition flex justify-between items-center gap-3">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 truncate" title={m.fileName}>{m.fileName}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Uploaded Date: {m.date}</p>
                                  </div>
                                  <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 uppercase shrink-0">
                                    {m.status}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            const renderComprehensiveVivaSupervisorWorkspace = (s) => {
              const tabClass = (tab) => `flex-1 py-2 text-center text-[11px] font-black uppercase tracking-wider border-b-2 transition duration-150 ${vivaTab === tab ? 'border-dsu-maroon text-dsu-maroon' : 'border-transparent text-slate-400 hover:text-slate-600'}`

              const onAddVivaRequest = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const newReq = {
                  id: vivaRequests.length + 1,
                  reqNo: formData.get('reqNo'),
                  scholar: s.name,
                  date: formData.get('date'),
                  time: formData.get('time'),
                  venue: formData.get('venue'),
                  external: formData.get('external'),
                  status: 'Pending Approval'
                }
                setVivaRequests([newReq, ...vivaRequests])
                e.target.reset()
                alert('Comprehensive Viva Exam requested successfully!')
              }

              const onUploadSyllabus = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const file = formData.get('syllabusFile')
                const newSyl = {
                  id: vivaSyllabi.length + 1,
                  scholar: s.name,
                  fileName: file && file.name ? file.name : 'comprehensive_viva_syllabus.pdf',
                  date: new Date().toISOString().split('T')[0],
                  status: 'Approved'
                }
                setVivaSyllabi([newSyl, ...vivaSyllabi])
                e.target.reset()
                alert('Syllabus for Comprehensive Viva uploaded successfully!')
              }

              const onAddMember = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const newMem = {
                  id: 'vivamem_' + Date.now(),
                  scholar: s.name,
                  name: formData.get('name'),
                  designation: formData.get('designation'),
                  institution: formData.get('institution'),
                  role: formData.get('role')
                }
                setVivaMembers([...vivaMembers, newMem])
                e.target.reset()
                alert('Committee member recommended successfully!')
              }

              const onDeleteMember = (id) => {
                setVivaMembers(prev => prev.filter(m => m.id !== id))
              }

              const onRequestCandidacy = () => {
                const newReq = {
                  id: candidacyRequests.length + 1,
                  scholar: s.name,
                  requestDate: new Date().toISOString().split('T')[0],
                  status: 'Pending Dean Approval'
                }
                setCandidacyRequests([newReq, ...candidacyRequests])
                alert('Candidacy Confirmation Request submitted to Dean successfully!')
              }

              const onApproveProgressReport = (id) => {
                setProgressReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r))
                alert('Half-Yearly Progress Report approved successfully!')
              }

              const scholarRequests = vivaRequests.filter(r => r.scholar === s.name)
              const scholarSyllabi = vivaSyllabi.filter(sy => sy.scholar === s.name)
              const scholarMembers = vivaMembers.filter(m => m.scholar === s.name)
              const scholarCandidacy = candidacyRequests.find(c => c.scholar === s.name)
              const scholarReports = progressReports.filter(r => r.scholar === s.name)

              return (
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                  {/* Sub-tab Navigation */}
                  <div className="flex border-b border-slate-100 pb-1 overflow-x-auto gap-2">
                    <button onClick={() => setVivaTab('request')} className={tabClass('request')}>
                      Viva Exam ({scholarRequests.length})
                    </button>
                    <button onClick={() => setVivaTab('syllabus')} className={tabClass('syllabus')}>
                      Syllabus ({scholarSyllabi.length})
                    </button>
                    <button onClick={() => setVivaTab('members')} className={tabClass('members')}>
                      Recommendation ({scholarMembers.length})
                    </button>
                    <button onClick={() => setVivaTab('mom')} className={tabClass('mom')}>
                      Upload MoM
                    </button>
                    <button onClick={() => setVivaTab('candidacy')} className={tabClass('candidacy')}>
                      Candidacy
                    </button>
                    <button onClick={() => setVivaTab('progress')} className={tabClass('progress')}>
                      Progress Reports ({scholarReports.length})
                    </button>
                  </div>

                  {/* Tab contents */}
                  {vivaTab === 'request' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Request for Comprehensive Viva Exam</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Submit exam details including external examiner, date/time, and venue.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onAddVivaRequest} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                          <div>
                            <label className="block mb-1 text-slate-600">Scholar Name</label>
                            <input type="text" value={s.name} className="w-full border p-2 rounded-lg bg-slate-200 text-slate-500 outline-none" readOnly />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Request Number</label>
                            <input type="text" name="reqNo" value={`REQ-VIVA-00${Math.floor(10 + Math.random() * 89)}`} className="w-full border p-2 rounded-lg bg-slate-200 text-slate-500 outline-none font-bold" readOnly />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">External Examiner</label>
                            <input type="text" name="external" placeholder="Dr. G. Loganathan (IIT Madras)" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 text-slate-600">Date</label>
                              <input type="date" name="date" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600">Time</label>
                              <input type="time" name="time" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Venue</label>
                            <input type="text" name="venue" placeholder="Research Cell Conference Hall" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Submit Viva Request
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Viva Exam Requests Queue</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px]">
                            {scholarRequests.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No viva exams scheduled for this scholar yet.</p>
                            ) : (
                              scholarRequests.map((r, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition text-xs font-semibold text-slate-700">
                                  <div className="flex justify-between items-center">
                                    <span className="font-extrabold text-dsu-maroon">{r.reqNo}</span>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase ${r.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>{r.status}</span>
                                  </div>
                                  <p className="mt-1 font-bold">Venue: {r.venue}</p>
                                  <p className="text-[10px] text-slate-505 mt-0.5">External: {r.external}</p>
                                  <p className="text-[10px] text-slate-400 mt-0.5">Scheduled Date: {r.date} &bull; Time: {r.time}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {vivaTab === 'syllabus' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Upload Syllabus of CV</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Upload the approved syllabus file specifically drafted for the Comprehensive Viva.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                          <form onSubmit={onUploadSyllabus} className="p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                            <div>
                              <label className="block mb-1 text-slate-600 font-bold">Upload Syllabus PDF</label>
                              <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-4 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                                <FileText className="w-6 h-6 text-slate-400 mb-1" />
                                <span className="text-[10px] font-bold text-slate-500">Click to upload PDF</span>
                                <span className="text-[9px] text-slate-400 mt-0.5">Max size: 10MB</span>
                                <input type="file" name="syllabusFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                              </div>
                            </div>
                            <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                              Upload Syllabus
                            </button>
                          </form>
                        </div>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Syllabus Documents</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px] text-xs font-semibold text-slate-700">
                            {scholarSyllabi.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No syllabus uploaded yet.</p>
                            ) : (
                              scholarSyllabi.map((sy, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition flex justify-between items-center gap-3">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 truncate">{sy.fileName}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Uploaded Date: {sy.date}</p>
                                  </div>
                                  <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase shrink-0">
                                    {sy.status}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {vivaTab === 'members' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recommendation of the Members</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Propose and recommend expert members for the Comprehensive Viva Panel.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onAddMember} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                          <div>
                            <label className="block mb-0.5">Role / Designation in Panel</label>
                            <select name="role" className="w-full border p-2 rounded bg-white focus:outline-none focus:border-dsu-maroon" required>
                              <option value="Convener">Convener (Supervisor)</option>
                              <option value="Internal Expert">Internal Expert</option>
                              <option value="External Expert">External Expert</option>
                            </select>
                          </div>
                          <div>
                            <label className="block mb-0.5">Name</label>
                            <input type="text" name="name" placeholder="Dr. John Watson" className="w-full border p-2 rounded bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-0.5">Designation</label>
                            <input type="text" name="designation" placeholder="Associate Professor" className="w-full border p-2 rounded bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-0.5">Institution / Department</label>
                            <input type="text" name="institution" placeholder="CSE Dept, DSU" className="w-full border p-2 rounded bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Add Member
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Recommended Panel Members</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px]">
                            {scholarMembers.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No members recommended yet.</p>
                            ) : (
                              scholarMembers.map((m, idx) => (
                                <div key={m.id} className="p-3 hover:bg-slate-50/50 transition flex items-center justify-between text-xs font-semibold text-slate-700 font-bold">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900">{m.name} ({m.role})</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{m.designation} &bull; {m.institution}</p>
                                  </div>
                                  <button onClick={() => onDeleteMember(m.id)} className="text-slate-400 hover:text-red-600 transition shrink-0 p-1">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {vivaTab === 'mom' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Comprehensive Viva Minutes of Meeting Upload</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Upload the official Comprehensive Viva minutes signed by the exam committee members.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                          <form onSubmit={onUploadMom} className="p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                            <input type="hidden" name="scholarName" value={s.name} />
                            <input type="hidden" name="meetingType" value="Comprehensive Viva" />
                            <div>
                              <label className="block mb-1 text-slate-600 font-bold">Meeting Date</label>
                              <input type="date" name="meetingDate" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border border-slate-200 p-2 rounded-lg bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600 font-bold">Upload MoM PDF</label>
                              <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-4 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                                <FileText className="w-6 h-6 text-slate-400 mb-1" />
                                <span className="text-[10px] font-bold text-slate-500">Click to upload PDF</span>
                                <span className="text-[9px] text-slate-400 mt-0.5">Max size: 10MB</span>
                                <input type="file" name="momFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                              </div>
                            </div>
                            <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                              Upload MoM
                            </button>
                          </form>
                        </div>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">MoM Upload Archives</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px] text-xs font-semibold text-slate-700">
                            {uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes('Comprehensive Viva') || m.type.toLowerCase().includes('viva'))).length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No Minutes of Meeting uploaded yet.</p>
                            ) : (
                              uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes('Comprehensive Viva') || m.type.toLowerCase().includes('viva'))).map((m, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition flex justify-between items-center gap-3">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 truncate" title={m.fileName}>{m.fileName}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Uploaded Date: {m.date}</p>
                                  </div>
                                  <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 uppercase shrink-0">
                                    {m.status}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {vivaTab === 'candidacy' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Request for Candidacy Confirmation</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Submit candidacy confirmation request for this scholar after successful completion of the Comprehensive Viva.</p>
                      </div>

                      <div className="p-6 bg-slate-50 border rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-xs font-extrabold text-slate-800">PhD Candidacy Confirmation Request Status</p>
                          <p className="text-[10px] font-medium text-slate-400">Confirmation is issued by the Dean of Research upon reviewing the viva results.</p>
                        </div>
                        <div className="shrink-0 flex items-center gap-3">
                          {scholarCandidacy ? (
                            <span className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase border tracking-wider ${
                              scholarCandidacy.status === 'Confirmed' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              Candidacy: {scholarCandidacy.status}
                            </span>
                          ) : (
                            <button
                              onClick={onRequestCandidacy}
                              className="px-4 py-2 bg-dsu-maroon hover:bg-red-800 text-white rounded-lg text-xs font-black uppercase tracking-wider shadow-sm transition"
                            >
                              Request Candidacy Confirmation
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {vivaTab === 'progress' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Approval of Half Yearly Progress Report</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Review and approve half-yearly academic progress reports submitted by the scholar.</p>
                      </div>

                      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                        <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                          <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Scholar Progress Reports</h5>
                        </div>
                        <div className="divide-y divide-slate-100">
                          {scholarReports.length === 0 ? (
                            <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No progress reports submitted yet.</p>
                          ) : (
                            scholarReports.map((report) => (
                              <div key={report.id} className="p-3 hover:bg-slate-50/50 transition flex justify-between items-center gap-3 text-xs font-semibold text-slate-700">
                                <div className="min-w-0">
                                  <p className="font-extrabold text-slate-900">{report.period}</p>
                                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Submitted: {report.submissionDate} &bull; File: <span className="text-dsu-maroon cursor-pointer hover:underline">{report.fileName}</span></p>
                                </div>
                                <div className="shrink-0">
                                  {report.status === 'Approved' ? (
                                    <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                                      {report.status}
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => onApproveProgressReport(report.id)}
                                      className="px-2.5 py-1 bg-dsu-maroon hover:bg-red-800 text-white rounded text-[9px] font-black uppercase tracking-wider shadow-sm transition"
                                    >
                                      Approve Report
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            const renderColloquiumSupervisorWorkspace = (s) => {
              const tabClass = (tab) => `flex-1 py-2 text-center text-[11px] font-black uppercase tracking-wider border-b-2 transition duration-150 ${colloquiumTab === tab ? 'border-dsu-maroon text-dsu-maroon' : 'border-transparent text-slate-400 hover:text-slate-600'}`

              const onAddColloquiumRequest = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const newReq = {
                  id: colloquiumSchedules.length + 1,
                  reqNo: formData.get('reqNo'),
                  scholar: s.name,
                  topic: formData.get('topic'),
                  date: formData.get('date'),
                  time: formData.get('time'),
                  venue: formData.get('venue'),
                  status: 'Scheduled'
                }
                setColloquiumSchedules([newReq, ...colloquiumSchedules])
                e.target.reset()
                alert('Colloquium presentation requested successfully!')
              }

              const onAddPublication = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const newPub = {
                  id: 'pub_' + Date.now(),
                  scholar: s.name,
                  title: formData.get('title'),
                  forum: formData.get('forum'),
                  year: formData.get('year'),
                  status: formData.get('status')
                }
                setPublicationsList([...publicationsList, newPub])
                e.target.reset()
                alert('Conference publication added to checklist!')
              }

              const onAddJournal = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const newJour = {
                  id: 'jour_' + Date.now(),
                  scholar: s.name,
                  title: formData.get('title'),
                  forum: formData.get('forum'),
                  impactFactor: formData.get('impactFactor'),
                  year: formData.get('year'),
                  status: formData.get('status')
                }
                setJournalsList([...journalsList, newJour])
                e.target.reset()
                alert('Journal paper added to checklist!')
              }

              const onDeletePub = (id) => {
                setPublicationsList(prev => prev.filter(p => p.id !== id))
              }

              const onDeleteJour = (id) => {
                setJournalsList(prev => prev.filter(j => j.id !== id))
              }

              const onToggleFulfillment = (field) => {
                setFulfillmentStatus(prev => {
                  const existing = prev.find(f => f.scholar === s.name)
                  if (existing) {
                    return prev.map(f => f.scholar === s.name ? { ...f, [field]: !f[field] } : f)
                  } else {
                    const newEntry = {
                      id: prev.length + 1,
                      scholar: s.name,
                      residency: false,
                      coursework: false,
                      seminar: false,
                      plagiarism: false,
                      [field]: true
                    }
                    return [...prev, newEntry]
                  }
                })
              }

              const scholarSchedules = colloquiumSchedules.filter(r => r.scholar === s.name)
              const scholarPubs = publicationsList.filter(p => p.scholar === s.name)
              const scholarJournals = journalsList.filter(j => j.scholar === s.name)
              const scholarFulfillment = fulfillmentStatus.find(f => f.scholar === s.name) || { residency: false, coursework: false, seminar: false, plagiarism: false }

              return (
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                  {/* Sub-tab Navigation */}
                  <div className="flex border-b border-slate-100 pb-1 overflow-x-auto gap-2">
                    <button onClick={() => setColloquiumTab('request')} className={tabClass('request')}>
                      Colloquium Exam ({scholarSchedules.length})
                    </button>
                    <button onClick={() => setColloquiumTab('publications')} className={tabClass('publications')}>
                      Publications ({scholarPubs.length})
                    </button>
                    <button onClick={() => setColloquiumTab('journals')} className={tabClass('journals')}>
                      Journals ({scholarJournals.length})
                    </button>
                    <button onClick={() => setColloquiumTab('fulfillment')} className={tabClass('fulfillment')}>
                      Fulfillment Checklist
                    </button>
                    <button onClick={() => setColloquiumTab('mom')} className={tabClass('mom')}>
                      Upload MoM
                    </button>
                  </div>

                  {/* Tab contents */}
                  {colloquiumTab === 'request' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Request & Approval of Colloquium</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Submit slot and topic for the Pre-Synopsis Colloquium presentation.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onAddColloquiumRequest} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                          <div>
                            <label className="block mb-1 text-slate-600">Scholar Name</label>
                            <input type="text" value={s.name} className="w-full border p-2 rounded-lg bg-slate-200 text-slate-505 outline-none" readOnly />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Request Number</label>
                            <input type="text" name="reqNo" value={`REQ-COLL-00${Math.floor(10 + Math.random() * 89)}`} className="w-full border p-2 rounded-lg bg-slate-200 text-slate-505 outline-none font-bold" readOnly />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Presentation Topic</label>
                            <input type="text" name="topic" placeholder="Presentation Topic" defaultValue={s.topic} className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 text-slate-600">Date</label>
                              <input type="date" name="date" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600">Time</label>
                              <input type="time" name="time" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Venue</label>
                            <input type="text" name="venue" placeholder="Research Seminar Hall" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Submit Colloquium Slot
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Colloquium Slots Queue</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px]">
                            {scholarSchedules.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No colloquium presentations scheduled yet.</p>
                            ) : (
                              scholarSchedules.map((r, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition text-xs font-semibold text-slate-700">
                                  <div className="flex justify-between items-center">
                                    <span className="font-extrabold text-dsu-maroon">{r.reqNo}</span>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase ${r.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>{r.status}</span>
                                  </div>
                                  <p className="mt-1 font-bold">Topic: {r.topic}</p>
                                  <p className="text-[10px] text-slate-505 mt-0.5">Venue: {r.venue}</p>
                                  <p className="text-[10px] text-slate-400 mt-0.5">Scheduled Date: {r.date} &bull; Time: {r.time}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {colloquiumTab === 'publications' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Publications Checklist</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Log conference papers published or accepted as part of graduation requirements.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onAddPublication} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                          <div>
                            <label className="block mb-1 text-slate-600">Paper Title</label>
                            <input type="text" name="title" placeholder="A Blockchain Consensus Protocol..." className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Conference Name</label>
                            <input type="text" name="forum" placeholder="IEEE Infocom" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 text-slate-600">Year</label>
                              <input type="text" name="year" placeholder="2025" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600">Status</label>
                              <select name="status" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required>
                                <option value="Accepted">Accepted</option>
                                <option value="Published">Published</option>
                              </select>
                            </div>
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Add Publication
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Logged Publications</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px]">
                            {scholarPubs.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No publications logged yet.</p>
                            ) : (
                              scholarPubs.map((p, idx) => (
                                <div key={p.id} className="p-3 hover:bg-slate-50/50 transition flex items-center justify-between text-xs font-semibold text-slate-700 font-bold">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 leading-tight">{p.title}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Conference: {p.forum} &bull; Year: {p.year}</p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">{p.status}</span>
                                    <button onClick={() => onDeletePub(p.id)} className="text-slate-400 hover:text-red-600 transition p-1">
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {colloquiumTab === 'journals' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Journals Checklist</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Log international indexed journals published or reviewed during research.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onAddJournal} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                          <div>
                            <label className="block mb-1 text-slate-600">Paper Title</label>
                            <input type="text" name="title" placeholder="Blockchain IoT Survey..." className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Journal Name</label>
                            <input type="text" name="forum" placeholder="IEEE IoT Journal" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1">
                              <label className="block mb-1 text-slate-600">IF</label>
                              <input type="text" name="impactFactor" placeholder="8.2" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div className="col-span-1">
                              <label className="block mb-1 text-slate-600">Year</label>
                              <input type="text" name="year" placeholder="2026" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div className="col-span-1">
                              <label className="block mb-1 text-slate-600">Status</label>
                              <select name="status" className="w-full border p-2 rounded bg-white text-[10px] focus:outline-none focus:border-dsu-maroon" required>
                                <option value="Under Review">Review</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Published">Published</option>
                              </select>
                            </div>
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Add Journal Paper
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Logged Journal Papers</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px]">
                            {scholarJournals.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No journal papers logged yet.</p>
                            ) : (
                              scholarJournals.map((j, idx) => (
                                <div key={j.id} className="p-3 hover:bg-slate-50/50 transition flex items-center justify-between text-xs font-semibold text-slate-700 font-bold">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 leading-tight">{j.title}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Journal: {j.forum} &bull; IF: {j.impactFactor} &bull; Year: {j.year}</p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#001c4f]/5 text-[#001c4f] border border-[#001c4f]/10 uppercase">{j.status}</span>
                                    <button onClick={() => onDeleteJour(j.id)} className="text-slate-400 hover:text-red-600 transition p-1">
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {colloquiumTab === 'fulfillment' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">PhD Program Fulfillment Checklist</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Toggle and verify core program requirements before colloquium approval.</p>
                      </div>

                      <div className="p-6 bg-slate-50 border rounded-xl space-y-4 text-xs font-semibold text-slate-700">
                        {[
                          { key: 'residency', label: 'Minimum Residency Requirement Met', desc: 'Scholar has spent minimum required residency period at DSU campus.' },
                          { key: 'coursework', label: 'Coursework Credits Cleared', desc: 'All assigned mandatory and self-study coursework cleared with passing grades.' },
                          { key: 'seminar', label: 'Research Seminars Presented', desc: 'Scholar has presented all required half-yearly research cell seminars.' },
                          { key: 'plagiarism', label: 'Plagiarism Certificate Verified', desc: 'Draft thesis/chapters run through Turnitin and plagiarism clearance report obtained.' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-start justify-between gap-4 p-3 bg-white border border-slate-100 rounded-xl hover:border-slate-200 transition">
                            <div className="space-y-0.5">
                              <p className="font-extrabold text-slate-800">{item.label}</p>
                              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={scholarFulfillment[item.key]}
                              onChange={() => onToggleFulfillment(item.key)}
                              className="w-4 h-4 rounded border-slate-300 text-dsu-maroon focus:ring-dsu-maroon cursor-pointer shrink-0 mt-0.5"
                            />
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => {
                            alert('PhD Program Fulfillment Checklist has been submitted and verified successfully!')
                          }}
                          className="w-full bg-[#7B1E3A] text-white py-2.5 rounded-lg font-bold hover:bg-red-800 transition uppercase tracking-wider text-[10px]"
                        >
                          Submit Checklist
                        </button>
                      </div>
                    </div>
                  )}

                  {colloquiumTab === 'mom' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Colloquium Minutes of Meeting Upload</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Upload the official signed Pre-Synopsis Colloquium presentation minutes.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                          <form onSubmit={onUploadMom} className="p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                            <input type="hidden" name="scholarName" value={s.name} />
                            <input type="hidden" name="meetingType" value="Pre-Synopsis Colloquium" />
                            <div>
                              <label className="block mb-1 text-slate-600 font-bold">Meeting Date</label>
                              <input type="date" name="meetingDate" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border border-slate-200 p-2 rounded-lg bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600 font-bold">Upload MoM PDF</label>
                              <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-4 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                                <FileText className="w-6 h-6 text-slate-400 mb-1" />
                                <span className="text-[10px] font-bold text-slate-500">Click to upload PDF</span>
                                <span className="text-[9px] text-slate-400 mt-0.5">Max size: 10MB</span>
                                <input type="file" name="momFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                              </div>
                            </div>
                            <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                              Upload MoM
                            </button>
                          </form>
                        </div>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">MoM Upload Archives</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px] text-xs font-semibold text-slate-700">
                            {uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes('Colloquium') || m.type.toLowerCase().includes('colloquium'))).length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No Minutes of Meeting uploaded yet.</p>
                            ) : (
                              uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes('Colloquium') || m.type.toLowerCase().includes('colloquium'))).map((m, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition flex justify-between items-center gap-3">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 truncate" title={m.fileName}>{m.fileName}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Uploaded Date: {m.date}</p>
                                  </div>
                                  <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 uppercase shrink-0">
                                    {m.status}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            const renderInchCommitteeSupervisorWorkspace = (s) => {
              const tabClass = (tab) => `flex-1 py-2 text-center text-[11px] font-black uppercase tracking-wider border-b-2 transition duration-150 ${inchTab === tab ? 'border-dsu-maroon text-dsu-maroon' : 'border-transparent text-slate-400 hover:text-slate-600'}`

              const onAddInchRequest = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const newReq = {
                  id: inchRequests.length + 1,
                  reqNo: formData.get('reqNo'),
                  scholar: s.name,
                  title: formData.get('title'),
                  date: formData.get('date'),
                  time: formData.get('time'),
                  venue: formData.get('venue'),
                  status: 'Submitted'
                }
                setInchRequests([newReq, ...inchRequests])
                e.target.reset()
                alert('Inch Committee verification requested successfully!')
              }

              const onUploadThesisSynopsis = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const thesis = formData.get('thesisFile')
                const synopsis = formData.get('synopsisFile')
                const newEntry = {
                  id: inchThesisSynopsis.length + 1,
                  scholar: s.name,
                  thesisName: thesis && thesis.name ? thesis.name : 'draft_thesis.pdf',
                  synopsisName: synopsis && synopsis.name ? synopsis.name : 'synopsis.pdf',
                  date: new Date().toISOString().split('T')[0],
                  status: 'Uploaded'
                }
                setInchThesisSynopsis([newEntry, ...inchThesisSynopsis])
                e.target.reset()
                alert('Thesis and Synopsis draft uploaded successfully!')
              }

              const onUploadPlagAiReports = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const plag = formData.get('plagFile')
                const ai = formData.get('aiFile')
                const newEntry = {
                  id: inchPlagiarismAiReports.length + 1,
                  scholar: s.name,
                  plagName: plag && plag.name ? plag.name : 'similarity_report.pdf',
                  aiName: ai && ai.name ? ai.name : 'ai_report.pdf',
                  plagPct: parseInt(formData.get('plagPct') || '0'),
                  aiPct: parseInt(formData.get('aiPct') || '0'),
                  date: new Date().toISOString().split('T')[0],
                  status: 'Verified'
                }
                setInchPlagiarismAiReports([newEntry, ...inchPlagiarismAiReports])
                e.target.reset()
                alert('Plagiarism and AI reports uploaded successfully!')
              }

              const scholarReqs = inchRequests.filter(r => r.scholar === s.name)
              const scholarDrafts = inchThesisSynopsis.filter(d => d.scholar === s.name)
              const scholarReports = inchPlagiarismAiReports.filter(r => r.scholar === s.name)

              return (
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                  {/* Sub-tab Navigation */}
                  <div className="flex border-b border-slate-100 pb-1 overflow-x-auto gap-2">
                    <button onClick={() => setInchTab('request')} className={tabClass('request')}>
                      Verification Request ({scholarReqs.length})
                    </button>
                    <button onClick={() => setInchTab('thesis-synopsis')} className={tabClass('thesis-synopsis')}>
                      Thesis & Synopsis ({scholarDrafts.length})
                    </button>
                    <button onClick={() => setInchTab('reports')} className={tabClass('reports')}>
                      Plagiarism & AI ({scholarReports.length})
                    </button>
                  </div>

                  {/* Tab contents */}
                  {inchTab === 'request' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Request for Inch Committee Verification</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Submit draft title, scheduling slot, and venue for formatting audit verification.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onAddInchRequest} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                          <div>
                            <label className="block mb-1 text-slate-600">Scholar Name</label>
                            <input type="text" value={s.name} className="w-full border p-2 rounded-lg bg-slate-200 text-slate-505 outline-none" readOnly />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Request Number</label>
                            <input type="text" name="reqNo" value={`REQ-INCH-00${Math.floor(10 + Math.random() * 89)}`} className="w-full border p-2 rounded-lg bg-slate-200 text-slate-505 outline-none font-bold" readOnly />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Thesis Synopsis Title</label>
                            <input type="text" name="title" placeholder="Thesis Synopsis Title" defaultValue={s.topic} className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 text-slate-600">Date</label>
                              <input type="date" name="date" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600">Time</label>
                              <input type="time" name="time" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Venue</label>
                            <input type="text" name="venue" placeholder="Research Cell Conference Room" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Submit Request
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Verification Requests Queue</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px]">
                            {scholarReqs.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No verification requests submitted yet.</p>
                            ) : (
                              scholarReqs.map((r, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition text-xs font-semibold text-slate-700 font-bold">
                                  <div className="flex justify-between items-center">
                                    <span className="font-extrabold text-dsu-maroon">{r.reqNo}</span>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase ${r.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>{r.status}</span>
                                  </div>
                                  <p className="mt-1 font-bold">Title: {r.title}</p>
                                  <p className="text-[10px] text-slate-550 mt-0.5">Venue: {r.venue}</p>
                                  <p className="text-[10px] text-slate-400 mt-0.5">Scheduled Date: {r.date} &bull; Time: {r.time}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {inchTab === 'thesis-synopsis' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Upload Thesis & Synopsis</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Upload draft copies of the thesis and synopsis for format compliance checks.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onUploadThesisSynopsis} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                          <div>
                            <label className="block mb-1 text-slate-600 font-bold">Upload Draft Thesis PDF</label>
                            <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-3 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                              <FileText className="w-5 h-5 text-slate-400 mb-1" />
                              <span className="text-[10px] font-bold text-slate-500">Click to upload Thesis PDF</span>
                              <input type="file" name="thesisFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600 font-bold">Upload Synopsis PDF</label>
                            <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-3 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                              <FileText className="w-5 h-5 text-slate-400 mb-1" />
                              <span className="text-[10px] font-bold text-slate-500">Click to upload Synopsis PDF</span>
                              <input type="file" name="synopsisFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                            </div>
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Upload Drafts
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Draft Documents Archives</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px] text-xs font-semibold text-slate-700">
                            {scholarDrafts.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No draft copies uploaded yet.</p>
                            ) : (
                              scholarDrafts.map((d, idx) => (
                                <div key={d.id} className="p-3 hover:bg-slate-50/50 transition flex justify-between items-center gap-3">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 truncate">Thesis: {d.thesisName}</p>
                                    <p className="font-extrabold text-slate-900 truncate mt-0.5">Synopsis: {d.synopsisName}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Uploaded Date: {d.date}</p>
                                  </div>
                                  <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase shrink-0">
                                    {d.status}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {inchTab === 'reports' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Upload Plagiarism Report & AI Report</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Submit draft similarity index validation and AI-generated contents verification reports.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onUploadPlagAiReports} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                          <div>
                            <label className="block mb-1 text-slate-600 font-bold">Plagiarism Similarity Score (%)</label>
                            <input type="number" name="plagPct" placeholder="e.g. 10" className="w-full border p-2 rounded bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600 font-bold">Upload Plagiarism Report PDF</label>
                            <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-3 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                              <FileText className="w-5 h-5 text-slate-400 mb-1" />
                              <span className="text-[10px] font-bold text-slate-500">Click to upload report</span>
                              <input type="file" name="plagFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                            </div>
                          </div>
                          <div className="border-t border-slate-200 pt-2.5">
                            <label className="block mb-1 text-slate-600 font-bold">AI Content Percentage (%)</label>
                            <input type="number" name="aiPct" placeholder="e.g. 5" className="w-full border p-2 rounded bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600 font-bold">Upload AI Detection Report PDF</label>
                            <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-3 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                              <FileText className="w-5 h-5 text-slate-400 mb-1" />
                              <span className="text-[10px] font-bold text-slate-500">Click to upload report</span>
                              <input type="file" name="aiFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                            </div>
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Upload Reports
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Verification History</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px] text-xs font-semibold text-slate-700">
                            {scholarReports.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No verification reports logged yet.</p>
                            ) : (
                              scholarReports.map((r, idx) => (
                                <div key={r.id} className="p-3 hover:bg-slate-50/50 transition flex justify-between items-center gap-3 font-semibold text-slate-700">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 truncate">Plagiarism: {r.plagName} ({r.plagPct}% Sim)</p>
                                    <p className="font-extrabold text-slate-900 truncate mt-0.5">AI Report: {r.aiName} ({r.aiPct}% AI)</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Verification Date: {r.date}</p>
                                  </div>
                                  <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase shrink-0">
                                    {r.status}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            const renderSynopsisSupervisorWorkspace = (s) => {
              const tabClass = (tab) => `flex-1 py-2 text-center text-[11px] font-black uppercase tracking-wider border-b-2 transition duration-150 ${synopsisTab === tab ? 'border-dsu-maroon text-dsu-maroon' : 'border-transparent text-slate-400 hover:text-slate-600'}`

              const onAddSynopsisMeeting = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const newReq = {
                  id: synopsisRequests.length + 1,
                  reqNo: formData.get('reqNo'),
                  scholar: s.name,
                  title: formData.get('title'),
                  date: formData.get('date'),
                  time: formData.get('time'),
                  venue: formData.get('venue'),
                  status: 'Approved'
                }
                setSynopsisRequests([newReq, ...synopsisRequests])
                e.target.reset()
                alert('Synopsis meeting requested successfully!')
              }

              const onAddIndianExaminer = (e) => {
                e.preventDefault()
                const scholarInd = proposedIndianExaminers.filter(ex => ex.scholar === s.name)
                if (scholarInd.length >= 6) {
                  alert('Maximum of 6 Indian Examiners can be nominated.')
                  return
                }
                const formData = new FormData(e.target)
                const newEx = {
                  id: 'ind_' + Date.now(),
                  scholar: s.name,
                  name: formData.get('name'),
                  designation: formData.get('designation'),
                  institution: formData.get('institution'),
                  email: formData.get('email')
                }
                setProposedIndianExaminers([...proposedIndianExaminers, newEx])
                e.target.reset()
                alert('Indian Examiner nominated successfully!')
              }

              const onAddForeignExaminer = (e) => {
                e.preventDefault()
                const scholarFor = proposedForeignExaminers.filter(ex => ex.scholar === s.name)
                if (scholarFor.length >= 6) {
                  alert('Maximum of 6 Foreign Examiners can be nominated.')
                  return
                }
                const formData = new FormData(e.target)
                const newEx = {
                  id: 'for_' + Date.now(),
                  scholar: s.name,
                  name: formData.get('name'),
                  designation: formData.get('designation'),
                  institution: formData.get('institution'),
                  email: formData.get('email'),
                  country: formData.get('country')
                }
                setProposedForeignExaminers([...proposedForeignExaminers, newEx])
                e.target.reset()
                alert('Foreign Examiner nominated successfully!')
              }

              const onDeleteIndianEx = (id) => {
                setProposedIndianExaminers(prev => prev.filter(ex => ex.id !== id))
              }

              const onDeleteForeignEx = (id) => {
                setProposedForeignExaminers(prev => prev.filter(ex => ex.id !== id))
              }

              const scholarMeetings = synopsisRequests.filter(r => r.scholar === s.name)
              const scholarIndianEx = proposedIndianExaminers.filter(ex => ex.scholar === s.name)
              const scholarForeignEx = proposedForeignExaminers.filter(ex => ex.scholar === s.name)

              return (
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                  {/* Sub-tab Navigation */}
                  <div className="flex border-b border-slate-100 pb-1 overflow-x-auto gap-2">
                    <button onClick={() => setSynopsisTab('request')} className={tabClass('request')}>
                      Synopsis Meeting ({scholarMeetings.length})
                    </button>
                    <button onClick={() => setSynopsisTab('examiners')} className={tabClass('examiners')}>
                      Nominate Examiners ({scholarIndianEx.length} Ind / {scholarForeignEx.length} For)
                    </button>
                    <button onClick={() => setSynopsisTab('mom')} className={tabClass('mom')}>
                      Upload MoM
                    </button>
                  </div>

                  {/* Tab contents */}
                  {synopsisTab === 'request' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Requesting for Synopsis Meeting</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Submit slot, venue, and final thesis title for the Synopsis defense meeting.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onAddSynopsisMeeting} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                          <div>
                            <label className="block mb-1 text-slate-600">Scholar Name</label>
                            <input type="text" value={s.name} className="w-full border p-2 rounded-lg bg-slate-200 text-slate-505 outline-none" readOnly />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Request Number</label>
                            <input type="text" name="reqNo" value={`REQ-SYNP-00${Math.floor(10 + Math.random() * 89)}`} className="w-full border p-2 rounded-lg bg-slate-200 text-slate-505 outline-none font-bold" readOnly />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Thesis Synopsis Title</label>
                            <input type="text" name="title" placeholder="Thesis Title" defaultValue={s.topic} className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 text-slate-600">Date</label>
                              <input type="date" name="date" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600">Time</label>
                              <input type="time" name="time" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Venue</label>
                            <input type="text" name="venue" placeholder="Research Seminar Hall" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Submit Meeting Request
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Synopsis Meetings Queue</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px]">
                            {scholarMeetings.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No synopsis meetings scheduled yet.</p>
                            ) : (
                              scholarMeetings.map((r, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition text-xs font-semibold text-slate-700 font-bold">
                                  <div className="flex justify-between items-center">
                                    <span className="font-extrabold text-dsu-maroon">{r.reqNo}</span>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase ${r.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{r.status}</span>
                                  </div>
                                  <p className="mt-1 font-bold">Title: {r.title}</p>
                                  <p className="text-[10px] text-slate-550 mt-0.5">Venue: {r.venue}</p>
                                  <p className="text-[10px] text-slate-400 mt-0.5">Scheduled Date: {r.date} &bull; Time: {r.time}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {synopsisTab === 'examiners' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Nomination of External Examiners</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Nominate exactly 6 Indian (National) Examiners and 6 Foreign (International) Examiners for thesis evaluation.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Indian Examiners */}
                        <div className="space-y-3 bg-slate-50 p-4 border rounded-xl">
                          <div className="flex justify-between items-center border-b pb-2">
                            <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wide">Indian Examiners ({scholarIndianEx.length}/6)</h5>
                            {scholarIndianEx.length === 6 && <span className="text-[9px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">READY</span>}
                          </div>

                          <form onSubmit={onAddIndianExaminer} className="space-y-2 text-xs font-semibold text-slate-700 font-bold">
                            <input type="text" name="name" placeholder="Examiner Name" className="w-full border p-1.5 rounded bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            <input type="text" name="designation" placeholder="Designation (e.g. Professor)" className="w-full border p-1.5 rounded bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            <input type="text" name="institution" placeholder="Institution (e.g. IIT Madras)" className="w-full border p-1.5 rounded bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            <input type="email" name="email" placeholder="Email Address" className="w-full border p-1.5 rounded bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            <button type="submit" disabled={scholarIndianEx.length >= 6} className="w-full bg-dsu-maroon hover:bg-red-800 disabled:bg-slate-300 text-white py-1.5 rounded font-bold text-xs uppercase tracking-wider transition">
                              Add Indian Examiner
                            </button>
                          </form>

                          <div className="divide-y divide-slate-100 bg-white border rounded-lg max-h-[200px] overflow-y-auto mt-2">
                            {scholarIndianEx.length === 0 ? (
                              <p className="p-4 text-center text-slate-400 italic text-[11px] font-semibold">No Indian examiners added.</p>
                            ) : (
                              scholarIndianEx.map((ex, idx) => (
                                <div key={ex.id} className="p-2 flex justify-between items-start text-xs font-semibold text-slate-700 font-bold">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 leading-tight">{idx + 1}. {ex.name}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold">{ex.designation} &bull; {ex.institution}</p>
                                    <p className="text-[9px] text-slate-400">{ex.email}</p>
                                  </div>
                                  <button onClick={() => onDeleteIndianEx(ex.id)} className="text-slate-400 hover:text-red-600 transition p-0.5">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Foreign Examiners */}
                        <div className="space-y-3 bg-slate-50 p-4 border rounded-xl">
                          <div className="flex justify-between items-center border-b pb-2">
                            <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wide">Foreign Examiners ({scholarForeignEx.length}/6)</h5>
                            {scholarForeignEx.length === 6 && <span className="text-[9px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">READY</span>}
                          </div>

                          <form onSubmit={onAddForeignExaminer} className="space-y-2 text-xs font-semibold text-slate-700 font-bold">
                            <input type="text" name="name" placeholder="Examiner Name" className="w-full border p-1.5 rounded bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            <input type="text" name="designation" placeholder="Designation (e.g. Professor)" className="w-full border p-1.5 rounded bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            <input type="text" name="institution" placeholder="Institution (e.g. MIT)" className="w-full border p-1.5 rounded bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            <input type="text" name="country" placeholder="Country (e.g. USA)" className="w-full border p-1.5 rounded bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            <input type="email" name="email" placeholder="Email Address" className="w-full border p-1.5 rounded bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            <button type="submit" disabled={scholarForeignEx.length >= 6} className="w-full bg-dsu-maroon hover:bg-red-800 disabled:bg-slate-300 text-white py-1.5 rounded font-bold text-xs uppercase tracking-wider transition">
                              Add Foreign Examiner
                            </button>
                          </form>

                          <div className="divide-y divide-slate-100 bg-white border rounded-lg max-h-[200px] overflow-y-auto mt-2">
                            {scholarForeignEx.length === 0 ? (
                              <p className="p-4 text-center text-slate-400 italic text-[11px] font-semibold">No foreign examiners added.</p>
                            ) : (
                              scholarForeignEx.map((ex, idx) => (
                                <div key={ex.id} className="p-2 flex justify-between items-start text-xs font-semibold text-slate-700 font-bold">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 leading-tight">{idx + 1}. {ex.name}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold">{ex.designation} &bull; {ex.institution} ({ex.country})</p>
                                    <p className="text-[9px] text-slate-400">{ex.email}</p>
                                  </div>
                                  <button onClick={() => onDeleteForeignEx(ex.id)} className="text-slate-400 hover:text-red-600 transition p-0.5">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {synopsisTab === 'mom' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Synopsis Minutes of Meeting Upload</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Upload the official signed Minutes of Meeting for the Synopsis presentation.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                          <form onSubmit={onUploadMom} className="p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                            <input type="hidden" name="scholarName" value={s.name} />
                            <input type="hidden" name="meetingType" value="Synopsis" />
                            <div>
                              <label className="block mb-1 text-slate-600 font-bold">Meeting Date</label>
                              <input type="date" name="meetingDate" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border border-slate-200 p-2 rounded-lg bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600 font-bold">Upload MoM PDF</label>
                              <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-4 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                                <FileText className="w-6 h-6 text-slate-400 mb-1" />
                                <span className="text-[10px] font-bold text-slate-500">Click to upload PDF</span>
                                <span className="text-[9px] text-slate-400 mt-0.5">Max size: 10MB</span>
                                <input type="file" name="momFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                              </div>
                            </div>
                            <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                              Upload MoM
                            </button>
                          </form>
                        </div>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">MoM Upload Archives</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px] text-xs font-semibold text-slate-700">
                            {uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes('Synopsis') || m.type.toLowerCase().includes('synopsis'))).length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No Minutes of Meeting uploaded yet.</p>
                            ) : (
                              uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes('Synopsis') || m.type.toLowerCase().includes('synopsis'))).map((m, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition flex justify-between items-center gap-3">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 truncate" title={m.fileName}>{m.fileName}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Uploaded Date: {m.date}</p>
                                  </div>
                                  <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 uppercase shrink-0">
                                    {m.status}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }
            const renderThesisDefenseSupervisorWorkspace = (s) => {
              const tabClass = (tab) => `flex-1 py-2 text-center text-[11px] font-black uppercase tracking-wider border-b-2 transition duration-150 ${defenseTab === tab ? 'border-dsu-maroon text-dsu-maroon' : 'border-transparent text-slate-400 hover:text-slate-600'}`

              const onAddDefenseMeeting = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const newReq = {
                  id: defenseMeetings.length + 1,
                  reqNo: formData.get('reqNo'),
                  scholar: s.name,
                  title: formData.get('title'),
                  date: formData.get('date'),
                  time: formData.get('time'),
                  venue: formData.get('venue'),
                  status: 'Scheduled'
                }
                setDefenseMeetings([newReq, ...defenseMeetings])
                e.target.reset()
                alert('Oral Viva Voce meeting requested successfully!')
              }

              const onUploadEvaluatorReport = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const comments = formData.get('commentsFile')
                const responses = formData.get('responsesFile')
                const newEntry = {
                  id: defenseEvaluatorReports.length + 1,
                  scholar: s.name,
                  commentsName: comments && comments.name ? comments.name : 'evaluator_comments.pdf',
                  reportName: responses && responses.name ? responses.name : 'supervisor_responses.pdf',
                  date: new Date().toISOString().split('T')[0],
                  status: 'Submitted'
                }
                setDefenseEvaluatorReports([newEntry, ...defenseEvaluatorReports])
                e.target.reset()
                alert('Evaluator comments and supervisor responses uploaded successfully!')
              }

              const onUploadFinalThesisSynopsis = (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const thesis = formData.get('thesisFile')
                const synopsis = formData.get('synopsisFile')
                const newEntry = {
                  id: defenseFinalThesisSynopsis.length + 1,
                  scholar: s.name,
                  thesisName: thesis && thesis.name ? thesis.name : 'final_thesis.pdf',
                  synopsisName: synopsis && synopsis.name ? synopsis.name : 'final_synopsis.pdf',
                  date: new Date().toISOString().split('T')[0],
                  status: 'Approved'
                }
                setDefenseFinalThesisSynopsis([newEntry, ...defenseFinalThesisSynopsis])
                e.target.reset()
                alert('Final approved thesis and synopsis uploaded successfully!')
              }

              const scholarReqs = defenseMeetings.filter(r => r.scholar === s.name)
              const scholarReports = defenseEvaluatorReports.filter(r => r.scholar === s.name)
              const scholarFinals = defenseFinalThesisSynopsis.filter(r => r.scholar === s.name)

              return (
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 font-bold text-slate-700">
                  {/* Sub-tab Navigation */}
                  <div className="flex border-b border-slate-100 pb-1 overflow-x-auto gap-2">
                    <button onClick={() => setDefenseTab('request')} className={tabClass('request')}>
                      Oral Viva Voce ({scholarReqs.length})
                    </button>
                    <button onClick={() => setDefenseTab('evaluator-report')} className={tabClass('evaluator-report')}>
                      Evaluator Report ({scholarReports.length})
                    </button>
                    <button onClick={() => setDefenseTab('mom')} className={tabClass('mom')}>
                      Upload MoM
                    </button>
                    <button onClick={() => setDefenseTab('final-thesis')} className={tabClass('final-thesis')}>
                      Final Copy ({scholarFinals.length})
                    </button>
                  </div>

                  {/* Tab contents */}
                  {defenseTab === 'request' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Requesting For Oral Viva Voce</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Submit scheduling slot, venue, and defense topic for the final Oral Viva Voce.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onAddDefenseMeeting} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                          <div>
                            <label className="block mb-1 text-slate-600">Scholar Name</label>
                            <input type="text" value={s.name} className="w-full border p-2 rounded-lg bg-slate-200 text-slate-505 outline-none font-bold" readOnly />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Request Number</label>
                            <input type="text" name="reqNo" value={`REQ-DEF-00${Math.floor(10 + Math.random() * 89)}`} className="w-full border p-2 rounded-lg bg-slate-200 text-slate-505 outline-none font-bold" readOnly />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Thesis Synopsis Title</label>
                            <input type="text" name="title" placeholder="Thesis Title" defaultValue={s.topic} className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block mb-1 text-slate-600">Date</label>
                              <input type="date" name="date" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600">Time</label>
                              <input type="time" name="time" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Venue</label>
                            <input type="text" name="venue" placeholder="School of Computing Seminar Hall" className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Submit Meeting Request
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Oral Viva Voce Schedules Queue</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px]">
                            {scholarReqs.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No defense meetings scheduled yet.</p>
                            ) : (
                              scholarReqs.map((r, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition text-xs font-semibold text-slate-700 font-bold">
                                  <div className="flex justify-between items-center">
                                    <span className="font-extrabold text-dsu-maroon">{r.reqNo}</span>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase ${r.status === 'Approved' || r.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>{r.status}</span>
                                  </div>
                                  <p className="mt-1 font-bold">Title: {r.title}</p>
                                  <p className="text-[10px] text-slate-550 mt-0.5">Venue: {r.venue}</p>
                                  <p className="text-[10px] text-slate-400 mt-0.5">Scheduled Date: {r.date} &bull; Time: {r.time}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {defenseTab === 'evaluator-report' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Upload Comments & Responses (Thesis Evaluator Report)</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Upload external reviewer comments and supervisor/candidate response reports.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onUploadEvaluatorReport} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700 font-bold">
                          <div>
                            <label className="block mb-1 text-slate-600 font-bold">Upload Evaluator Comments PDF</label>
                            <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-3 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                              <FileText className="w-5 h-5 text-slate-400 mb-1" />
                              <span className="text-[10px] font-bold text-slate-500">Click to upload Comments</span>
                              <input type="file" name="commentsFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600 font-bold">Upload Candidate Response PDF</label>
                            <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-3 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                              <FileText className="w-5 h-5 text-slate-400 mb-1" />
                              <span className="text-[10px] font-bold text-slate-500">Click to upload Responses</span>
                              <input type="file" name="responsesFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                            </div>
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Upload Report & Responses
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Evaluator Report details</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px] text-xs font-semibold text-slate-700">
                            {scholarReports.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No evaluator report details uploaded yet.</p>
                            ) : (
                              scholarReports.map((d, idx) => (
                                <div key={d.id} className="p-3 hover:bg-slate-50/50 transition flex justify-between items-center gap-3">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 truncate">Comments: {d.commentsName}</p>
                                    <p className="font-extrabold text-slate-900 truncate mt-0.5">Responses: {d.reportName}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Uploaded Date: {d.date}</p>
                                  </div>
                                  <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase shrink-0">
                                    {d.status}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {defenseTab === 'mom' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Thesis Defense Minutes of Meeting Upload</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Upload the official signed Minutes of Meeting for the final Thesis Defense Oral Viva.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                          <form onSubmit={onUploadMom} className="p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                            <input type="hidden" name="scholarName" value={s.name} />
                            <input type="hidden" name="meetingType" value="Thesis Defense" />
                            <div>
                              <label className="block mb-1 text-slate-600 font-bold">Meeting Date</label>
                              <input type="date" name="meetingDate" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border border-slate-200 p-2 rounded-lg bg-white text-xs focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600 font-bold">Upload MoM PDF</label>
                              <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-4 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                                <FileText className="w-6 h-6 text-slate-400 mb-1" />
                                <span className="text-[10px] font-bold text-slate-500">Click to upload PDF</span>
                                <span className="text-[9px] text-slate-400 mt-0.5">Max size: 10MB</span>
                                <input type="file" name="momFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                              </div>
                            </div>
                            <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                              Upload MoM
                            </button>
                          </form>
                        </div>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">MoM Upload Archives</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px] text-xs font-semibold text-slate-700">
                            {uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes('Defense') || m.type.toLowerCase().includes('defense'))).length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No Minutes of Meeting uploaded yet.</p>
                            ) : (
                              uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes('Defense') || m.type.toLowerCase().includes('defense'))).map((m, idx) => (
                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition flex justify-between items-center gap-3">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 truncate" title={m.fileName}>{m.fileName}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Uploaded Date: {m.date}</p>
                                  </div>
                                  <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 uppercase shrink-0">
                                    {m.status}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {defenseTab === 'final-thesis' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Upload Final Approved Thesis & Synopsis</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Upload final approved, formatting-compliant copies of the thesis and synopsis document files.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <form onSubmit={onUploadFinalThesisSynopsis} className="md:col-span-2 p-4 bg-slate-50 border rounded-xl space-y-3 text-xs font-semibold text-slate-700 font-bold">
                          <div>
                            <label className="block mb-1 text-slate-600 font-bold">Upload Final Approved Thesis PDF</label>
                            <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-3 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                              <FileText className="w-5 h-5 text-slate-400 mb-1" />
                              <span className="text-[10px] font-bold text-slate-500">Click to upload Thesis PDF</span>
                              <input type="file" name="thesisFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600 font-bold">Upload Final Approved Synopsis PDF</label>
                            <div className="border border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-3 flex flex-col items-center justify-center bg-white hover:bg-slate-50/20 transition cursor-pointer text-center relative">
                              <FileText className="w-5 h-5 text-slate-400 mb-1" />
                              <span className="text-[10px] font-bold text-slate-500">Click to upload Synopsis PDF</span>
                              <input type="file" name="synopsisFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                            </div>
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                            Upload Final Approved Copy
                          </button>
                        </form>

                        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col font-bold">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Final Approved Documents</h5>
                          </div>
                          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[300px] text-xs font-semibold text-slate-700">
                            {scholarFinals.length === 0 ? (
                              <p className="p-8 text-center text-slate-400 italic text-xs font-semibold">No final copy uploads yet.</p>
                            ) : (
                              scholarFinals.map((d, idx) => (
                                <div key={d.id} className="p-3 hover:bg-slate-50/50 transition flex justify-between items-center gap-3">
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-slate-900 truncate">Thesis: {d.thesisName}</p>
                                    <p className="font-extrabold text-slate-900 truncate mt-0.5">Synopsis: {d.synopsisName}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">Uploaded Date: {d.date}</p>
                                  </div>
                                  <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase shrink-0">
                                    {d.status}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            return (
              <div className="space-y-4">
                {/* Header with Back button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Milestone Phase Detail</span>
                    <h2 className="text-base font-black text-slate-900 mt-0.5">{s.name} &mdash; <span className="text-dsu-maroon">{phase}</span></h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{s.reg} &bull; {s.dept}</p>
                  </div>
                  <button 
                    onClick={() => setActiveSupervisorPhase(null)}
                    className="self-start sm:self-center px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition flex items-center gap-1.5"
                  >
                    &larr; Back to Phases
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                  {/* Scholar Dashboard View Box (Outcome & Details) */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="border-b pb-2 flex justify-between items-center">
                      <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scholar Dashboard view</h3>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Status & remarks from scholar portal</p>
                      </div>
                      <span className="text-[10px] font-black uppercase text-dsu-maroon bg-dsu-maroon/5 px-2 py-0.5 rounded border border-dsu-maroon/20">
                        {s.progress}% Progress
                      </span>
                    </div>

                    {phase === 'First DAC' && (() => {
                      const isCompleted = s.progress >= 10
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-amber-600" />}
                              <p className="font-extrabold uppercase tracking-wide">First DAC Meeting Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted 
                                ? `Completed on ${s.name === 'Aishwarya S' ? '25 Jun 2026' : '12 Jun 2026'}. Venue: Research Cell Conference Room.` 
                                : 'Scheduled/Awaiting scheduling.'}
                            </p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50/50">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1">DAC Committee Constitution</p>
                            
                            <div className="space-y-0.5 text-[11px]">
                              <p className="font-extrabold text-slate-900">Convener:</p>
                              <p className="pl-3 font-semibold text-slate-700">Dr. D. Srinivasan (Supervisor)</p>
                            </div>
                            
                            <div className="space-y-0.5 text-[11px]">
                              <p className="font-extrabold text-slate-900">Internal Members (6):</p>
                              <ol className="pl-6 list-decimal font-semibold text-slate-700 space-y-0.5">
                                <li>Dr. R. Venkataraman</li>
                                <li>Dr. S. Ananthi</li>
                                <li>Dr. K. Balaji</li>
                                <li>Dr. M. Chitra</li>
                                <li>Dr. P. Dinesh</li>
                                <li>Dr. V. Elango</li>
                              </ol>
                            </div>
                            
                            <div className="space-y-0.5 text-[11px]">
                              <p className="font-extrabold text-slate-900">External Members (6):</p>
                              <ol className="pl-6 list-decimal font-semibold text-slate-700 space-y-0.5">
                                <li>Dr. M. Sathyapriya (NIT Trichy)</li>
                                <li>Dr. R. Jayavel (Anna University)</li>
                                <li>Dr. K. Srinivasan (NIT Trichy)</li>
                                <li>Dr. A. Chandra (IIT Madras)</li>
                                <li>Dr. S. Ramanujam (IISc Bangalore)</li>
                                <li>Dr. V. Murugan (Pondicherry University)</li>
                              </ol>
                            </div>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1">DAC Recommendations</p>
                            <p className="italic font-medium leading-relaxed">
                              "Scholar should complete 12 credits of coursework focusing on advanced research methodology and domain subjects. Coursework mappings approved."
                            </p>
                          </div>
                        </div>
                      )
                    })()}

                    {phase === 'Comprehensive Viva' && (() => {
                      const isCompleted = s.progress >= 40
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-amber-600" />}
                              <p className="font-extrabold uppercase tracking-wide">Comprehensive Viva Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted ? 'Passed & Recommended continuation' : 'Awaiting Coursework completion/scheduling'}
                            </p>
                          </div>

                          {isCompleted && (
                            <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
                              <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-2">Viva Evaluation Scores</p>
                              <div className="space-y-2.5">
                                {[
                                  { label: 'Domain Knowledge & Methodology', score: '44 / 50', pct: 88 },
                                  { label: 'Research Proposal Defensibility', score: '22 / 25', pct: 88 },
                                  { label: 'Q&A / Defence Performance', score: '23 / 25', pct: 92 }
                                ].map((sc, i) => (
                                  <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-[11px] font-bold">
                                      <span>{sc.label}</span>
                                      <span>{sc.score}</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${sc.pct}%` }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Committee Remarks</p>
                            <p className="italic font-medium leading-relaxed">
                              {isCompleted 
                                ? `"The scholar demonstrated a clear grasp of domain-specific challenges. The proposed methodology is logically sound. continuation recommended without reservations."` 
                                : `"Awaiting coursework clearance to formulate exam board."`}
                            </p>
                          </div>
                        </div>
                      )
                    })()}

                    {phase === 'Colloquium' && (() => {
                      const isCompleted = s.progress >= 50
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-505" />}
                              <p className="font-extrabold uppercase tracking-wide">Pre-Synopsis Colloquium Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted ? 'Completed & Approved' : (s.name === 'Divya Menon' || s.name === 'Rajesh Kumar' ? 'Scheduled for review' : 'Pending Stage')}
                            </p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Colloquium Details</p>
                            <p className="flex justify-between"><span>Presentation Date:</span> <span className="font-bold text-slate-900">{isCompleted ? '10 Jun 2026' : (s.name === 'Rajesh Kumar' ? '30 Jun 2026' : 'To be scheduled')}</span></p>
                            <p className="flex justify-between"><span>Venue:</span> <span className="font-bold text-slate-900">Auditorium 2, DSU Main Campus</span></p>
                            <p className="flex justify-between"><span>Mode:</span> <span className="font-bold text-slate-900">Offline (In-Person)</span></p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Committee Feedback</p>
                            <p className="italic font-medium leading-relaxed">
                              {isCompleted 
                                ? `"Research presented was methodologically sound. Simulation results were comprehensive. Permitted to proceed to thesis preparation."`
                                : `"Awaiting draft submission to initiate colloquium slot reservation."`}
                            </p>
                          </div>
                        </div>
                      )
                    })()}

                    {phase === 'Inch Committee' && (() => {
                      const isCompleted = s.progress >= 60
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-amber-600" />}
                              <p className="font-extrabold uppercase tracking-wide">Inch Committee Review Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted ? 'Approved with Corrections' : (s.name === 'Rajesh Kumar' ? 'Under Review' : 'Pending')}
                            </p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Audit Checklist</p>
                            <p className="flex items-center gap-1.5">✓ Coursework Credits: Verified (12 credits)</p>
                            <p className="flex items-center gap-1.5">✓ Plagiarism Index: Verified (&lt; 10% similarity)</p>
                            <p className="flex items-center gap-1.5">{isCompleted ? '✓' : '⌛'} Journal Publications: {isCompleted ? 'Verified' : 'Under Review'}</p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Remarks</p>
                            <p className="italic font-medium leading-relaxed">
                              {isCompleted 
                                ? `"Minor corrections required in Chapter 3 equation numbering and page 141. Scholar may proceed after making these adjustments."`
                                : `"Format audit will be initiated upon draft submission."`}
                            </p>
                          </div>
                        </div>
                      )
                    })()}

                    {phase === 'Synopsis' && (() => {
                      const isCompleted = s.progress >= 80
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-505'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-400" />}
                              <p className="font-extrabold uppercase tracking-wide">Synopsis Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted ? 'Approved & Forwarded to External Examiners' : (s.name === 'Rajesh Kumar' ? 'Under Review' : 'Pending')}
                            </p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Synopsis details</p>
                            <p className="flex justify-between"><span>Meeting Date:</span> <span className="font-bold text-slate-900">{isCompleted ? '20 Jun 2026' : 'To be scheduled'}</span></p>
                            <p className="flex justify-between"><span>Venue:</span> <span className="font-bold text-slate-900">Dean Research Chambers, Room 302</span></p>
                            <p className="flex justify-between"><span>Examiner Panel:</span> <span className="font-bold text-emerald-600">{isCompleted ? 'Approved' : 'Pending'}</span></p>
                            <p className="flex justify-between"><span>Synopsis Clearance:</span> <span className="font-bold text-emerald-600">{isCompleted ? 'Cleared' : 'Pending'}</span></p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Clearance Remark</p>
                            <p className="italic font-medium leading-relaxed">
                              {isCompleted 
                                ? `"Synopsis approved and cleared for external evaluation. Examiner panel recommended and approved by VC."`
                                : `"Awaiting synopsis presentation outcomes."`}
                            </p>
                          </div>
                        </div>
                      )
                    })()}

                    {phase === 'Thesis Evaluation' && (() => {
                      const isCompleted = s.progress >= 85
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <Clock className="w-4.5 h-4.5 text-amber-600" /> : <Clock className="w-4.5 h-4.5 text-slate-400" />}
                              <p className="font-extrabold uppercase tracking-wide">Thesis Evaluation Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted ? 'Evaluation In Progress' : 'Pending Thesis Submission'}
                            </p>
                          </div>
                          {isCompleted && (
                            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
                              <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1">Examiner Tracker</p>
                              <p className="flex items-center justify-between"><span>Examiner 1 (National):</span> <span className="font-bold text-emerald-600">Report Received (Accepted)</span></p>
                              <p className="flex items-center justify-between"><span>Examiner 2 (National):</span> <span className="font-bold text-amber-600">Awaiting Report</span></p>
                              <p className="flex items-center justify-between"><span>Examiner 3 (International):</span> <span className="font-bold text-amber-600">Awaiting Report</span></p>
                            </div>
                          )}
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Evaluation Remarks</p>
                            <p className="italic font-medium leading-relaxed">
                              {isCompleted 
                                ? `"Indian Examiner A recommended minor corrections to Chapter 5 smart gateway data models. Typographical errors to be resolved before defense."`
                                : `"Awaiting external panel report dispatches."`}
                            </p>
                          </div>
                        </div>
                      )
                    })()}

                    {phase === 'Thesis Defense' && (() => {
                      const isCompleted = s.progress >= 100
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" /> : <Clock className="w-4.5 h-4.5 text-slate-400" />}
                              <p className="font-extrabold uppercase tracking-wide">Thesis Defense Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted ? 'Completed — PhD Recommended' : 'Pending evaluation reports approval'}
                            </p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Defense Schedule</p>
                            <p className="flex justify-between"><span>Date:</span> <span className="font-bold text-slate-900">{isCompleted ? '20 Jul 2026' : 'To be scheduled'}</span></p>
                            <p className="flex justify-between"><span>Venue:</span> <span className="font-bold text-slate-900">Research Auditorium, Main Block</span></p>
                            <p className="flex justify-between"><span>Final Decision:</span> <span className="font-bold text-emerald-600">{isCompleted ? 'Recommended for PhD Award' : 'Pending'}</span></p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Board Remarks</p>
                            <p className="italic font-medium leading-relaxed">
                              {isCompleted 
                                ? `"Oral defense completed successfully. The board unanimously recommends the award of Doctor of Philosophy (PhD) to the scholar."`
                                : `"Defense panel scheduling will proceed once all thesis evaluation reports are received and cleared."`}
                            </p>
                          </div>
                        </div>
                      )
                    })()}
                  </div>

                  {/* Research Supervisor Content Box (Forms & tracking actions) */}
                  {phase === 'First DAC' ? (
                    renderFirstDacSupervisorWorkspace(s)
                  ) : phase === 'Comprehensive Viva' ? (
                    renderComprehensiveVivaSupervisorWorkspace(s)
                  ) : phase === 'Colloquium' ? (
                    renderColloquiumSupervisorWorkspace(s)
                  ) : phase === 'Inch Committee' ? (
                    renderInchCommitteeSupervisorWorkspace(s)
                  ) : phase === 'Synopsis' ? (
                    renderSynopsisSupervisorWorkspace(s)
                  ) : phase === 'Thesis Defense' ? (
                    renderThesisDefenseSupervisorWorkspace(s)
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
                      <div className="border-b pb-2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Research Supervisor view</h3>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Forms & tracking details for this milestone</p>
                      </div>

                    {phase === 'Thesis Evaluation' && (
                      <div className="space-y-4">
                        <form onSubmit={onForwardEvaluation} className="space-y-3 text-xs font-semibold text-slate-700">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase">Forward Thesis for Evaluation</h4>
                          <div>
                            <label className="block mb-1 text-slate-600">Thesis Title</label>
                            <input type="text" name="title" defaultValue={s.topic} placeholder="Secure AI-Driven Smart Healthcare Framework" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Submission Date</label>
                            <input type="date" name="date" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition">
                            Forward Thesis
                          </button>
                        </form>

                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-4">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Thesis Submission Status</h4>
                            <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                              {thesisEvaluations.filter(p => p.scholar === s.name).length} Total
                            </span>
                          </div>
                          <div className="divide-y divide-slate-100">
                            {thesisEvaluations.filter(p => p.scholar === s.name).length === 0 ? (
                              <p className="px-4 py-5 text-center text-xs text-slate-400 font-semibold">No evaluations in progress yet.</p>
                            ) : (
                              thesisEvaluations.filter(p => p.scholar === s.name).map((p, idx) => {
                                const badgeColor = (p.evalStatus === 'Evaluation Completed' || p.evalStatus === 'Reports Received') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                                return (
                                  <div key={idx} className="px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition text-xs">
                                    <div className="flex-1 min-w-0">
                                      <p className="font-bold text-slate-700 truncate">Title: {p.title}</p>
                                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Submission Date: {p.submissionDate}</p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${badgeColor}`}>
                                        {p.evalStatus}
                                      </span>
                                    </div>
                                  </div>
                                )
                              })
                            )}
                          </div>
                        </div>

                        {/* Examiner Panel Status */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-4">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Examiner Panel Status</h4>
                            <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                              {evaluationExaminerStatus.filter(p => p.scholar === s.name).length} Total
                            </span>
                          </div>
                          <div className="divide-y divide-slate-100">
                            {evaluationExaminerStatus.filter(p => p.scholar === s.name).length === 0 ? (
                              <p className="px-4 py-5 text-center text-xs text-slate-400 font-semibold">No examiner panels assigned yet.</p>
                            ) : (
                              evaluationExaminerStatus.filter(p => p.scholar === s.name).map((p, idx) => {
                                const badgeColor = p.panelStatus === 'Dispatched' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                                return (
                                  <div key={idx} className="px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition text-xs">
                                    <div className="flex-1 min-w-0">
                                      <p className="font-bold text-slate-700">Thesis Dispatch Status</p>
                                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Examiner panel dispatch tracker</p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${badgeColor}`}>
                                        {p.panelStatus}
                                      </span>
                                    </div>
                                  </div>
                                )
                              })
                            )}
                          </div>
                        </div>

                        {/* Final Recommendation */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-4">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Final Recommendation</h4>
                            <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                              {evaluationRecommendations.filter(p => p.scholar === s.name).length} Total
                            </span>
                          </div>
                          <div className="divide-y divide-slate-100">
                            {evaluationRecommendations.filter(p => p.scholar === s.name).length === 0 ? (
                              <p className="px-4 py-5 text-center text-xs text-slate-400 font-semibold">No final recommendations recorded yet.</p>
                            ) : (
                              evaluationRecommendations.filter(p => p.scholar === s.name).map((p, idx) => {
                                const badgeColor = p.recommendation.includes('Accepted') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                                return (
                                  <div key={idx} className="px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition text-xs">
                                    <div className="flex-1 min-w-0">
                                      <p className="font-bold text-slate-700">Final Recommendation</p>
                                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{p.recommendation}</p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${badgeColor}`}>
                                        {p.recommendation}
                                      </span>
                                    </div>
                                  </div>
                                )
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    )}


                  {/* Close the Research Supervisor Content Box if not First DAC */}
                    </div>
                  )}

                  {/* Render MoM Upload Box if not First DAC, and not Inch/Defense */}
                  {phase !== 'First DAC' && phase !== 'Comprehensive Viva' && phase !== 'Colloquium' && phase !== 'Inch Committee' && phase !== 'Synopsis' && phase !== 'Thesis Defense' && (
                    <div>
                      {renderMomUploadForm()}
                    </div>
                  )}
                </div>
              </div>
            )
          }

          // 2. PHASES SELECT VIEW FOR A SPECIFIC SCHOLAR
          if (activeSupervisorScholar) {
            const s = activeSupervisorScholar
            const phases = [
              { name: 'First DAC',          icon: ShieldCheck },
              { name: 'Comprehensive Viva', icon: CheckCircle2 },
              { name: 'Colloquium',         icon: Calendar },
              { name: 'Inch Committee',     icon: FileCheck },
              { name: 'Synopsis',           icon: ClipboardList },
              { name: 'Thesis Defense',     icon: Award }
            ]

            return (
              <div className="space-y-4">
                {/* Header card with Back button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Supervisor Dashboard</span>
                    <h2 className="text-base font-black text-slate-900 mt-0.5">{s.name} &mdash; Milestone Phases</h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{s.reg} &bull; {s.dept}</p>
                  </div>
                  <button 
                    onClick={() => setActiveSupervisorScholar(null)}
                    className="self-start sm:self-center px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition flex items-center gap-1.5"
                  >
                    &larr; Back to Scholar List
                  </button>
                </div>

                {/* Vertical list of phases matching the second image layout */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-sm">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">
                    Select Milestone Phase
                  </h3>
                  <div className="space-y-4">
                    {phases.map((p, idx) => {
                      const PhaseIcon = p.icon
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveSupervisorPhase(p.name)
                          }}
                          className="w-full flex items-center gap-3.5 py-1.5 text-slate-600 hover:text-dsu-maroon transition text-left group"
                        >
                          <PhaseIcon className="w-5 h-5 text-slate-400 group-hover:text-dsu-maroon transition shrink-0" />
                          <span className="text-sm font-bold group-hover:text-dsu-maroon transition">{p.name}</span>
                          <span className="ml-auto text-slate-300 group-hover:text-dsu-maroon transition font-bold">&rarr;</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          }

          // 3. TABLE VIEW - LIST ONLY SCHOLAR NAMES
          return (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-dsu-maroon uppercase tracking-wide">My Supervised Scholars</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Click a scholar's name to view milestone phases and details</p>
                </div>
                <div className="flex gap-2 text-[10px] font-bold">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{scholars.filter(s=>s.status==='Active').length} Active</span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{scholars.filter(s=>s.status==='Coursework').length} Coursework</span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">{scholars.filter(s=>s.status==='Completed').length} Completed</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-md">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Scholar Name</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {scholars.map((s, idx) => (
                      <tr 
                        key={idx} 
                        className="hover:bg-slate-50/80 transition cursor-pointer"
                        onClick={() => {
                          setActiveSupervisorScholar(s)
                          setActiveSupervisorPhase(null)
                        }}
                      >
                        <td className="px-5 py-3.5 whitespace-nowrap text-sm font-extrabold text-slate-700 hover:text-dsu-maroon transition-colors">
                          {s.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        })()}

        {view === 'dac' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

            {/* ── Section 1: Constitute DAC Committee ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <h3 className="text-xs font-black text-dsu-maroon uppercase tracking-wider border-b border-slate-100 pb-3">
                Constitute DAC Committee
              </h3>
              <form onSubmit={handleCreateDac} className="space-y-3 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Scholar</label>
                  <select name="scholar" className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required>
                    <option value="">Select Scholar</option>
                    <option value="Aishwarya S">Aishwarya S — DSU-PHD-2024-008</option>
                    <option value="Priya R">Priya R — DSU-PHD-2022-045</option>
                    <option value="Rajesh Kumar">Rajesh Kumar — DSU-PHD-2023-012</option>
                    <option value="Divya Menon">Divya Menon — DSU-PHD-2023-019</option>
                    <option value="Manoj Rajan">Manoj Rajan — DSU-PHD-2021-031</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Internal Subject Expert</label>
                  <input
                    type="text"
                    name="internal"
                    placeholder="Dr. R. Venkataraman"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">External Subject Expert</label>
                  <input
                    type="text"
                    name="external"
                    placeholder="Dr. M. Sathyapriya (NIT Trichy)"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Proposed Meeting Date</label>
                  <input
                    type="date"
                    name="date"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-dsu-maroon text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-900 transition"
                >
                  Submit DAC Proposal
                </button>
              </form>
            </div>

            {/* ── Section 2: DAC Proposal Status ── */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">DAC Proposal Status</h3>
                <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                  {dacPanels.length} Total
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {dacPanels.length === 0 ? (
                  <p className="px-5 py-8 text-center text-xs text-slate-400 font-semibold">No DAC proposals submitted yet.</p>
                ) : dacPanels.map((dac, i) => {
                  const badge = {
                    'Approved':           'bg-emerald-50 text-emerald-700 border-emerald-200',
                    'Submitted':          'bg-amber-50 text-amber-700 border-amber-200',
                    'Revision Required':  'bg-red-50 text-red-600 border-red-200',
                    'Draft':              'bg-dsu-maroon/10 text-dsu-maroon border-dsu-maroon/30',
                    'Pending Dean Approval': 'bg-amber-50 text-amber-700 border-amber-200',
                  }[dac.status] || 'bg-slate-100 text-slate-500 border-slate-200'
                  return (
                    <div key={i} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50/60 transition">
                      <div className="w-9 h-9 rounded-full bg-dsu-maroon/10 flex items-center justify-center font-black text-dsu-maroon text-sm shrink-0">
                        {dac.scholar.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-slate-800">{dac.scholar}</p>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">
                          {dac.internal} &nbsp;•&nbsp; {dac.external}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] font-bold text-slate-500 mb-1">{dac.date}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${badge}`}>
                          {dac.status}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </section>
        )}





        {view === 'viva' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

            {/* ── Section 1: Viva Request Form ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <h3 className="text-xs font-black text-dsu-maroon uppercase tracking-wider border-b border-slate-100 pb-3">
                Comprehensive Viva Request
              </h3>
              <form onSubmit={handleRequestViva} className="space-y-3 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Scholar</label>
                  <select name="scholar" className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required>
                    <option value="">Select Scholar</option>
                    <option value="Rajesh Kumar">Rajesh Kumar — DSU-PHD-2023-012</option>
                    <option value="Priya R">Priya R — DSU-PHD-2022-045</option>
                    <option value="Divya Menon">Divya Menon — DSU-PHD-2023-019</option>
                    <option value="Aishwarya S">Aishwarya S — DSU-PHD-2024-008</option>
                    <option value="Manoj Rajan">Manoj Rajan — DSU-PHD-2021-031</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Proposed External Examiner</label>
                  <input
                    type="text"
                    name="external"
                    placeholder="Dr. G. Loganathan (IIT Madras)"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Suggested Viva Date</label>
                  <input
                    type="date"
                    name="date"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-dsu-maroon text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-900 transition"
                >
                  Submit Viva Request
                </button>
              </form>
            </div>

            {/* ── Section 2: Viva Request Status ── */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Viva Request Status</h3>
                <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                  {vivaRequests.length} Total
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {vivaRequests.length === 0 ? (
                  <p className="px-5 py-8 text-center text-xs text-slate-400 font-semibold">No viva requests submitted yet.</p>
                ) : vivaRequests.map((req, i) => {
                  const badge = {
                    'Pending Approval':    'bg-amber-50 text-amber-700 border-amber-200',
                    'Submitted':           'bg-amber-50 text-amber-700 border-amber-200',
                    'Approved':            'bg-emerald-50 text-emerald-700 border-emerald-200',
                    'Revision Required':   'bg-red-50 text-red-600 border-red-200',
                    'Draft':               'bg-dsu-maroon/10 text-dsu-maroon border-dsu-maroon/30',
                  }[req.status] || 'bg-slate-100 text-slate-500 border-slate-200'
                  return (
                    <div key={i} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50/60 transition">
                      <div className="w-9 h-9 rounded-full bg-dsu-maroon/10 flex items-center justify-center font-black text-dsu-maroon text-sm shrink-0">
                        {req.scholar.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-slate-800">{req.scholar}</p>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{req.external}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] font-bold text-slate-500 mb-1">{req.date}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${badge}`}>
                          {req.status}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </section>
        )}





        {view === 'colloquium' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

            {/* ── Section 1: Schedule Colloquium ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <h3 className="text-xs font-black text-dsu-maroon uppercase tracking-wider border-b border-slate-100 pb-3">
                Schedule Colloquium
              </h3>
              <form onSubmit={handleScheduleColloquium} className="space-y-3 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Scholar</label>
                  <select name="scholar" className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required>
                    <option value="">Select Scholar</option>
                    <option value="Rajesh Kumar">Rajesh Kumar</option>
                    <option value="Divya Menon">Divya Menon</option>
                    <option value="Priya R">Priya R</option>
                    <option value="Aishwarya S">Aishwarya S</option>
                    <option value="Manoj Rajan">Manoj Rajan</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Presentation Title</label>
                  <input
                    type="text"
                    name="topic"
                    placeholder="Blockchain Security in Smart Cities"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Proposed Date</label>
                  <input
                    type="date"
                    name="date"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-dsu-maroon text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-900 transition"
                >
                  Schedule Colloquium
                </button>
              </form>
            </div>

            {/* ── Section 2: Colloquium Status Tracker ── */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Colloquium Status Tracker</h3>
                <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                  {colloquiumSchedules.length} Total
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {colloquiumSchedules.length === 0 ? (
                  <p className="px-5 py-8 text-center text-xs text-slate-400 font-semibold">No colloquiums scheduled yet.</p>
                ) : colloquiumSchedules.map((c, i) => {
                  const badge = {
                    'Scheduled':           'bg-amber-50 text-amber-700 border-amber-200',
                    'Completed':           'bg-emerald-50 text-emerald-700 border-emerald-200',
                    'Reschedule Required': 'bg-red-50 text-red-600 border-red-200',
                    'Draft':               'bg-dsu-maroon/10 text-dsu-maroon border-dsu-maroon/30',
                  }[c.status] || 'bg-slate-100 text-slate-500 border-slate-200'
                  return (
                    <div key={i} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50/60 transition">
                      <div className="w-9 h-9 rounded-full bg-dsu-maroon/10 flex items-center justify-center font-black text-dsu-maroon text-sm shrink-0">
                        {c.scholar.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-slate-800">{c.scholar}</p>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{c.topic}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] font-bold text-slate-500 mb-1">{c.date}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${badge}`}>
                          {c.status}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </section>
        )}

        {view === 'inch' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

            {/* ── Section 1: Inch Committee Request ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <h3 className="text-xs font-black text-dsu-maroon uppercase tracking-wider border-b border-slate-100 pb-3">
                Inch Committee Request
              </h3>
              <form onSubmit={handleSubmitInchRequest} className="space-y-3 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Scholar</label>
                  <select name="scholar" className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required>
                    <option value="">Select Scholar</option>
                    <option value="Rajesh Kumar">Rajesh Kumar</option>
                    <option value="Priya R">Priya R</option>
                    <option value="Divya Menon">Divya Menon</option>
                    <option value="Aishwarya S">Aishwarya S</option>
                    <option value="Manoj Rajan">Manoj Rajan</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Thesis / Synopsis Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Blockchain Security in Smart Cities"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Proposed Review Date</label>
                  <input
                    type="date"
                    name="date"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-dsu-maroon text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-900 transition"
                >
                  Submit Inch Committee Request
                </button>
              </form>
            </div>

            {/* ── Section 2: Inch Committee Status ── */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Inch Committee Status</h3>
                <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                  {inchRequests.length} Total
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {inchRequests.length === 0 ? (
                  <p className="px-5 py-8 text-center text-xs text-slate-400 font-semibold">No inch committee requests submitted yet.</p>
                ) : inchRequests.map((req, i) => {
                  const badge = {
                    'Submitted':          'bg-amber-50 text-amber-700 border-amber-200',
                    'Approved':           'bg-emerald-50 text-emerald-700 border-emerald-200',
                    'Revision Required':  'bg-red-50 text-red-600 border-red-200',
                    'Draft':              'bg-dsu-maroon/10 text-dsu-maroon border-dsu-maroon/30',
                  }[req.status] || 'bg-slate-100 text-slate-500 border-slate-200'
                  return (
                    <div key={i} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50/60 transition">
                      <div className="w-9 h-9 rounded-full bg-dsu-maroon/10 flex items-center justify-center font-black text-dsu-maroon text-sm shrink-0">
                        {req.scholar.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-slate-800">{req.scholar}</p>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{req.title}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] font-bold text-slate-500 mb-1">{req.date}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${badge}`}>
                          {req.status}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </section>
        )}

        {view === 'synopsis' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

            {/* ── Section 1: Synopsis Recommendation Form ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <h3 className="text-xs font-black text-dsu-maroon uppercase tracking-wider border-b border-slate-100 pb-3">
                Synopsis Recommendation
              </h3>
              <form onSubmit={handleSubmitSynopsis} className="space-y-3 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Scholar</label>
                  <select name="scholar" className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required>
                    <option value="">Select Scholar</option>
                    <option value="Priya R">Priya R</option>
                    <option value="Rajesh Kumar">Rajesh Kumar</option>
                    <option value="Divya Menon">Divya Menon</option>
                    <option value="Aishwarya S">Aishwarya S</option>
                    <option value="Manoj Rajan">Manoj Rajan</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Synopsis Title</label>
                  <input type="text" name="title" placeholder="Secure AI-Driven Smart Healthcare Framework"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Proposed Presentation Date</label>
                  <input type="date" name="date"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required />
                </div>
                <button type="submit"
                  className="w-full bg-dsu-maroon text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-900 transition">
                  Submit Synopsis Recommendation
                </button>
              </form>
            </div>

            {/* ── Right column: Status Tracker + Examiner Panel stacked ── */}
            <div className="lg:col-span-2 space-y-4">

              {/* ── Section 2: Synopsis Status Tracker ── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Synopsis Status Tracker</h3>
                  <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                    {synopsisRequests.length} Total
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {synopsisRequests.length === 0 ? (
                    <p className="px-5 py-6 text-center text-xs text-slate-400 font-semibold">No synopsis recommendations submitted yet.</p>
                  ) : synopsisRequests.map((req, i) => {
                    const badge = {
                      'Submitted':         'bg-amber-50 text-amber-700 border-amber-200',
                      'Approved':          'bg-emerald-50 text-emerald-700 border-emerald-200',
                      'Revision Required': 'bg-red-50 text-red-600 border-red-200',
                      'Draft':             'bg-dsu-maroon/10 text-dsu-maroon border-dsu-maroon/30',
                    }[req.status] || 'bg-slate-100 text-slate-500 border-slate-200'
                    return (
                      <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50/60 transition">
                        <div className="w-8 h-8 rounded-full bg-dsu-maroon/10 flex items-center justify-center font-black text-dsu-maroon text-sm shrink-0">
                          {req.scholar.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-slate-800">{req.scholar}</p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{req.title}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[10px] font-bold text-slate-500 mb-1">{req.date}</p>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${badge}`}>
                            {req.status}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* ── Section 3: Examiner Panel Status ── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Examiner Panel Status</h3>
                  <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                    {synopsisExaminerStatus.length} Scholars
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {synopsisExaminerStatus.length === 0 ? (
                    <p className="px-5 py-6 text-center text-xs text-slate-400 font-semibold">No examiner panels assigned yet.</p>
                  ) : synopsisExaminerStatus.map((s, i) => {
                    const panelBadge = {
                      'Pending':     'bg-amber-50 text-amber-700 border-amber-200',
                      'Recommended': 'bg-amber-50 text-amber-700 border-amber-200',
                      'Approved':    'bg-emerald-50 text-emerald-700 border-emerald-200',
                    }[s.panelStatus] || 'bg-slate-100 text-slate-500 border-slate-200'
                    return (
                      <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50/60 transition">
                        <div className="w-8 h-8 rounded-full bg-dsu-maroon/10 flex items-center justify-center font-black text-dsu-maroon text-sm shrink-0">
                          {s.scholar.charAt(0)}
                        </div>
                        <p className="flex-1 text-xs font-black text-slate-800">{s.scholar}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${panelBadge}`}>
                          {s.panelStatus}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

          </section>
        )}



        {view === 'evaluation' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

            {/* ── Section 1: Thesis Evaluation Request Form ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <h3 className="text-xs font-black text-dsu-maroon uppercase tracking-wider border-b border-slate-100 pb-3">
                Evaluation Request
              </h3>
              <form onSubmit={handleForwardForEvaluation} className="space-y-3 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Scholar</label>
                  <select name="scholar" className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required>
                    <option value="">Select Scholar</option>
                    <option value="Priya R">Priya R</option>
                    <option value="Rajesh Kumar">Rajesh Kumar</option>
                    <option value="Divya Menon">Divya Menon</option>
                    <option value="Aishwarya S">Aishwarya S</option>
                    <option value="Manoj Rajan">Manoj Rajan</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Thesis Title</label>
                  <input type="text" name="title" placeholder="Secure AI-Driven Smart Healthcare Framework"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Submission Date</label>
                  <input type="date" name="date"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required />
                </div>
                <button type="submit"
                  className="w-full bg-dsu-maroon text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-900 transition">
                  Forward for Evaluation
                </button>
              </form>
            </div>

            {/* ── Right column: stacked cards ── */}
            <div className="lg:col-span-2 space-y-4">

              {/* ── Section 2: Thesis Evaluation Status ── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Evaluation Status</h3>
                  <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                    {thesisEvaluations.length} Total
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {thesisEvaluations.length === 0 ? (
                    <p className="px-5 py-6 text-center text-xs text-slate-400 font-semibold">No evaluations yet.</p>
                  ) : thesisEvaluations.map((ev, i) => {
                    const badge = {
                      'Pending Submission':   'bg-dsu-maroon/10 text-dsu-maroon border-dsu-maroon/30',
                      'Under Evaluation':     'bg-amber-50 text-amber-700 border-amber-200',
                      'Reports Received':     'bg-emerald-50 text-emerald-700 border-emerald-200',
                      'Evaluation Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    }[ev.evalStatus] || 'bg-slate-100 text-slate-500 border-slate-200'
                    return (
                      <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50/60 transition">
                        <div className="w-8 h-8 rounded-full bg-dsu-maroon/10 flex items-center justify-center font-black text-dsu-maroon text-sm shrink-0">
                          {ev.scholar.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-slate-800">{ev.scholar}</p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{ev.title}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[10px] font-bold text-slate-500 mb-1">{ev.submissionDate}</p>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${badge}`}>
                            {ev.evalStatus}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* ── Section 3: Examiner Panel Status ── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Examiner Panel Status</h3>
                  <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                    {evaluationExaminerStatus.length} Scholars
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {evaluationExaminerStatus.map((s, i) => {
                    const pb = {
                      'Pending':    'bg-dsu-maroon/10 text-dsu-maroon border-dsu-maroon/30',
                      'Approved':   'bg-amber-50 text-amber-700 border-amber-200',
                      'Dispatched': 'bg-amber-50 text-amber-700 border-amber-200',
                    }[s.panelStatus] || 'bg-slate-100 text-slate-500 border-slate-200'
                    return (
                      <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50/60 transition">
                        <div className="w-8 h-8 rounded-full bg-dsu-maroon/10 flex items-center justify-center font-black text-dsu-maroon text-sm shrink-0">
                          {s.scholar.charAt(0)}
                        </div>
                        <p className="flex-1 text-xs font-black text-slate-800">{s.scholar}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${pb}`}>
                          {s.panelStatus}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* ── Section 4: Final Evaluation Recommendation ── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Final Recommendation</h3>
                  <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                    {evaluationRecommendations.length} Scholars
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {evaluationRecommendations.length === 0 ? (
                    <p className="px-5 py-6 text-center text-xs text-slate-400 font-semibold">No recommendations yet.</p>
                  ) : evaluationRecommendations.map((r, i) => {
                    const rb = {
                      'Accepted':                  'bg-emerald-50 text-emerald-700 border-emerald-200',
                      'Accepted with Corrections': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      'Re-Evaluation Required':    'bg-red-50 text-red-600 border-red-200',
                    }[r.recommendation] || 'bg-slate-100 text-slate-500 border-slate-200'
                    return (
                      <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50/60 transition">
                        <div className="w-8 h-8 rounded-full bg-dsu-maroon/10 flex items-center justify-center font-black text-dsu-maroon text-sm shrink-0">
                          {r.scholar.charAt(0)}
                        </div>
                        <p className="flex-1 text-xs font-black text-slate-800">{r.scholar}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${rb}`}>
                          {r.recommendation}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

          </section>
        )}




        {view === 'thesis' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

            {/* ── Section 1: Defense Recommendation Form ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <h3 className="text-xs font-black text-dsu-maroon uppercase tracking-wider border-b border-slate-100 pb-3">
                Defense Recommendation
              </h3>
              <form onSubmit={handleSubmitDefenseRecommendation} className="space-y-3 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Scholar</label>
                  <select name="scholar" className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required>
                    <option value="">Select Scholar</option>
                    <option value="Priya R">Priya R</option>
                    <option value="Rajesh Kumar">Rajesh Kumar</option>
                    <option value="Divya Menon">Divya Menon</option>
                    <option value="Aishwarya S">Aishwarya S</option>
                    <option value="Manoj Rajan">Manoj Rajan</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Thesis Title</label>
                  <input type="text" name="title" placeholder="Secure AI-Driven Smart Healthcare Framework"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-600">Proposed Defense Date</label>
                  <input type="date" name="date"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required />
                </div>
                <button type="submit"
                  className="w-full bg-dsu-maroon text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-900 transition">
                  Submit Defense Recommendation
                </button>
              </form>
            </div>

            {/* ── Right column: stacked cards ── */}
            <div className="lg:col-span-2 space-y-4">

              {/* ── Section 2: Thesis Defense Status ── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Defense Status</h3>
                  <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                    {defenseRequests.length} Total
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {defenseRequests.length === 0 ? (
                    <p className="px-5 py-6 text-center text-xs text-slate-400 font-semibold">No defense recommendations yet.</p>
                  ) : defenseRequests.map((def, i) => {
                    const badge = {
                      'Pending Approval': 'bg-amber-50 text-amber-700 border-amber-200',
                      'Scheduled':        'bg-dsu-maroon/10 text-dsu-maroon border-dsu-maroon/30',
                      'Conducted':        'bg-emerald-50 text-emerald-700 border-emerald-200',
                      'Completed':        'bg-emerald-50 text-emerald-700 border-emerald-200',
                    }[def.status] || 'bg-slate-100 text-slate-500 border-slate-200'
                    return (
                      <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50/60 transition">
                        <div className="w-8 h-8 rounded-full bg-dsu-maroon/10 flex items-center justify-center font-black text-dsu-maroon text-sm shrink-0">
                          {def.scholar.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-slate-800">{def.scholar}</p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{def.title}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[10px] font-bold text-slate-500 mb-1">{def.date}</p>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${badge}`}>
                            {def.status}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* ── Section 3: Final Defense Outcome ── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Final Defense Outcome</h3>
                  <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                    {defenseOutcomes.length} Scholars
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {defenseOutcomes.length === 0 ? (
                    <p className="px-5 py-6 text-center text-xs text-slate-400 font-semibold">No outcomes recorded yet.</p>
                  ) : defenseOutcomes.map((o, i) => {
                    const ob = {
                      'PhD Recommended':        'bg-emerald-50 text-emerald-700 border-emerald-200',
                      'Corrections Required':   'bg-red-50 text-red-600 border-red-200',
                      'Re-Appearance Required': 'bg-red-50 text-red-600 border-red-200',
                    }[o.outcome] || 'bg-slate-100 text-slate-500 border-slate-200'
                    return (
                      <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50/60 transition">
                        <div className="w-8 h-8 rounded-full bg-dsu-maroon/10 flex items-center justify-center font-black text-dsu-maroon text-sm shrink-0">
                          {o.scholar.charAt(0)}
                        </div>
                        <p className="flex-1 text-xs font-black text-slate-800">{o.scholar}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${ob}`}>
                          {o.outcome}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

          </section>
        )}



        {view === 'mom' && (
          <section className="space-y-5">

            {/* ── MoM Upload Archives ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileArchive className="w-4 h-4 text-dsu-maroon" />
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">MoM Upload Archives</h3>
                </div>
                <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                  {momArchives.length} Records
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#7B1E3A] to-[#5a1229] text-white">
                      <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider">Scholar Name</th>
                      <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider">Meeting Type</th>
                      <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider">File Name</th>
                      <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider">Upload Date</th>
                      <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {momArchives.map((row, i) => {
                      const sb = {
                        'Verified': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                        'Pending':  'bg-amber-50 text-amber-700 border-amber-200',
                        'Returned': 'bg-red-50 text-red-600 border-red-200',
                      }[row.status] || 'bg-slate-100 text-slate-500 border-slate-200'
                      return (
                        <tr key={i} className={`hover:bg-slate-50/70 transition ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-dsu-maroon/10 flex items-center justify-center font-black text-dsu-maroon text-[10px] shrink-0">
                                {row.scholar.charAt(0)}
                              </div>
                              <span className="font-black text-slate-800">{row.scholar}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-slate-600 font-semibold">{row.meetingType}</td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-1.5 text-dsu-maroon font-semibold">
                              <FileText className="w-3 h-3 shrink-0" />
                              <span className="underline underline-offset-2 cursor-pointer hover:text-red-800">{row.fileName}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-slate-500 font-semibold">{row.uploadDate}</td>
                          <td className="px-5 py-3">
                            <span className={`text-[9px] font-black px-2.5 py-1 rounded-full border ${sb}`}>{row.status}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Document History ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-dsu-maroon" />
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Document History</h3>
                </div>
                <span className="text-[9px] font-bold text-dsu-maroon bg-dsu-maroon/10 border border-dsu-maroon/20 px-2 py-0.5 rounded-full">
                  {documentHistory.length} Documents
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-700 to-slate-600 text-white">
                      <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider">Scholar Name</th>
                      <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider">Document Type</th>
                      <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider">Submission Date</th>
                      <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documentHistory.map((row, i) => {
                      const sb = {
                        'Verified': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                        'Pending':  'bg-amber-50 text-amber-700 border-amber-200',
                        'Returned': 'bg-red-50 text-red-600 border-red-200',
                      }[row.status] || 'bg-slate-100 text-slate-500 border-slate-200'
                      const icon = {
                        'Verified': <CheckCircle className="w-3 h-3 text-emerald-600" />,
                        'Pending':  <Clock className="w-3 h-3 text-amber-600" />,
                        'Returned': <RefreshCw className="w-3 h-3 text-red-500" />,
                      }[row.status]
                      return (
                        <tr key={i} className={`hover:bg-slate-50/70 transition ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-600 text-[10px] shrink-0">
                                {row.scholar.charAt(0)}
                              </div>
                              <span className="font-black text-slate-800">{row.scholar}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-slate-600 font-semibold">{row.docType}</td>
                          <td className="px-5 py-3 text-slate-500 font-semibold">{row.submissionDate}</td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2.5 py-1 rounded-full border ${sb}`}>
                              {icon}
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Row 3: Pending Actions ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
              {/* ── Pending Document Actions ── */}
              <div className="lg:col-span-3 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Pending Document Actions</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Card 1 */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-2xl font-black text-slate-800">3</span>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-700">Documents Awaiting Review</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Requires your action</p>
                    </div>
                    <div className="h-1 rounded-full bg-blue-100">
                      <div className="h-1 rounded-full bg-blue-500 w-3/5"></div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="text-2xl font-black text-slate-800">2</span>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-700">MoM Pending Verification</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Sent to Registry</p>
                    </div>
                    <div className="h-1 rounded-full bg-amber-100">
                      <div className="h-1 rounded-full bg-amber-400 w-2/5"></div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-2xl font-black text-slate-800">1</span>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-700">Registry Remarks</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Needs resubmission</p>
                    </div>
                    <div className="h-1 rounded-full bg-red-100">
                      <div className="h-1 rounded-full bg-red-400 w-1/5"></div>
                    </div>
                  </div>
                </div>

                {/* Registry Remark Detail */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-red-700">Registry Remark — Divya Menon</p>
                    <p className="text-[10px] text-red-600 font-semibold mt-1">
                      Synopsis MoM returned: Signatures missing on Page 3. Please reupload corrected document.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </section>
        )}
      </div>
    )
  }

  // 3. Dean Research Dashboard Views
  if (role === 'dean') {
    return (
      <div className="space-y-6">
        {view === 'home' ? (
          <>
            {/* Welcome Header */}
            <section className="bg-gradient-to-r from-dsu-maroon to-red-900 text-white p-6 rounded-2xl border border-red-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-150">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-amber-400">Welcome Back</div>
                <h2 className="text-xl font-black uppercase tracking-wide mt-1">{profile.name}</h2>
                <p className="text-[11px] text-red-100 font-bold uppercase tracking-wider mt-0.5">Dean of Research Portal</p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-[10px] font-bold uppercase tracking-wider text-red-200">System Role</div>
                <div className="text-xs font-black text-amber-300 uppercase tracking-widest mt-0.5">University Research Dean</div>
              </div>
            </section>

            {/* Quick Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard title="Total Schools" value="5" />
              <StatCard title="Total Guides" value="24" />
              <StatCard title="Total Scholars" value="112" />
            </section>

            {/* Upcoming Academic Activities */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs space-y-4 p-5">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">UPCOMING ACADEMIC ACTIVITIES</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">UPCOMING UNIVERSITY-WIDE RESEARCH EVENTS AND SCHOLAR MILESTONES</p>
              </div>

              {/* Search & Filtering Panel */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Registry Filters & Search</span>
                  <button 
                    onClick={() => {
                      setDeanActivitySearch('')
                      setDeanActivitySchool('')
                      setDeanActivityType('')
                      setDeanActivityStatus('')
                    }}
                    className="text-[9px] font-bold text-dsu-maroon hover:text-red-800 uppercase flex items-center gap-1 transition"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> Clear Filters
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-semibold text-slate-700">
                  <div className="relative">
                    <label className="block mb-1 text-[10px] uppercase font-bold text-slate-500">Search Activities</label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Scholar, Guide, Dept, School..."
                        value={deanActivitySearch}
                        onChange={(e) => setDeanActivitySearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon text-xs font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] uppercase font-bold text-slate-500">Filter by School</label>
                    <select 
                      value={deanActivitySchool}
                      onChange={(e) => setDeanActivitySchool(e.target.value)}
                      className="w-full border border-slate-200 p-1.5 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon text-xs font-semibold"
                    >
                      <option value="">All Schools</option>
                      <option value="School of Computing">School of Computing</option>
                      <option value="School of Engineering">School of Engineering</option>
                      <option value="School of Management">School of Management</option>
                      <option value="School of Sciences">School of Sciences</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] uppercase font-bold text-slate-500">Filter by Activity Type</label>
                    <select 
                      value={deanActivityType}
                      onChange={(e) => setDeanActivityType(e.target.value)}
                      className="w-full border border-slate-200 p-1.5 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon text-xs font-semibold"
                    >
                      <option value="">All Activity Types</option>
                      <option value="First DAC">First DAC</option>
                      <option value="Second DAC">Second DAC</option>
                      <option value="Third DAC">Third DAC</option>
                      <option value="Colloquium Presentation">Colloquium Presentation</option>
                      <option value="Comprehensive Viva">Comprehensive Viva</option>
                      <option value="Pre-Synopsis Submission">Pre-Synopsis Submission</option>
                      <option value="Synopsis Review">Synopsis Review</option>
                      <option value="Thesis Submission">Thesis Submission</option>
                      <option value="Thesis Defense Oral Viva">Thesis Defense Oral Viva</option>
                      <option value="Final Viva Voce">Final Viva Voce</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] uppercase font-bold text-slate-500">Filter by Status</label>
                    <select 
                      value={deanActivityStatus}
                      onChange={(e) => setDeanActivityStatus(e.target.value)}
                      className="w-full border border-slate-200 p-1.5 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon text-xs font-semibold"
                    >
                      <option value="">All Statuses</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Proposed">Proposed</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Panel Approved">Panel Approved</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <table className="min-w-full text-left text-xs text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-3.5">Event Date</th>
                      <th className="p-3.5">School</th>
                      <th className="p-3.5">Department</th>
                      <th className="p-3.5">Research Guide</th>
                      <th className="p-3.5">Scholar Name</th>
                      <th className="p-3.5">Activity Type</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {(() => {
                      const filtered = deanAcademicActivities
                        .filter(activity => {
                          const eventTime = new Date(activity.date).getTime()
                          const todayTime = new Date().setHours(0, 0, 0, 0)
                          const isFuture = eventTime >= todayTime
                          if (!isFuture) return false

                          const query = deanActivitySearch.toLowerCase()
                          const matchesSearch = 
                            activity.scholar.toLowerCase().includes(query) ||
                            activity.guide.toLowerCase().includes(query) ||
                            activity.dept.toLowerCase().includes(query) ||
                            activity.school.toLowerCase().includes(query)

                          const matchesSchool = !deanActivitySchool || activity.school === deanActivitySchool
                          const matchesType = !deanActivityType || activity.type === deanActivityType
                          const matchesStatus = !deanActivityStatus || activity.status === deanActivityStatus

                          return matchesSearch && matchesSchool && matchesType && matchesStatus
                        })
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-slate-400 italic text-xs font-semibold bg-slate-50/50">
                              No matching upcoming academic activities found.
                            </td>
                          </tr>
                        )
                      }

                      return filtered.map((act, idx) => {
                        const statusClass = getDeanStatusBadgeClass(act.status)
                        return (
                          <tr key={idx} className="hover:bg-slate-50/40 transition">
                            <td className="p-3.5 text-slate-500 font-bold whitespace-nowrap">{formatDeanDisplayDate(act.date)}</td>
                            <td className="p-3.5 text-slate-900 font-extrabold">{act.school}</td>
                            <td className="p-3.5 text-slate-500 font-semibold">{act.dept}</td>
                            <td className="p-3.5 text-slate-500 font-semibold">{act.guide}</td>
                            <td className="p-3.5 text-slate-950 font-extrabold">{act.scholar}</td>
                            <td className="p-3.5">
                              <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-bold bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10 uppercase tracking-wide whitespace-nowrap">
                                {act.type}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-black border uppercase tracking-wide whitespace-nowrap ${statusClass}`}>
                                {act.status}
                              </span>
                            </td>
                          </tr>
                        )
                      })
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : null}

        {view === 'dac' && (
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">First DAC Committees Approval Queue</h3>
            <table className="min-w-full text-left text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Scholar</th>
                  <th className="p-3">School / Dept</th>
                  <th className="p-3">Supervising Guide</th>
                  <th className="p-3">External Member Nominee</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {deanDacProposals.map((dac, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-extrabold text-[#7B1E3A]">{dac.scholar}</td>
                    <td className="p-3">{dac.school}</td>
                    <td className="p-3">{dac.guide}</td>
                    <td className="p-3">{dac.external}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleApproveAction(deanDacProposals, setDeanDacProposals, dac.id, 'Committee Approved')}
                        className={`px-3 py-1 rounded font-bold uppercase tracking-wider text-[9px] ${
                          dac.status.includes('Approved') ? 'bg-emerald-100 text-emerald-800' : 'bg-dsu-maroon hover:bg-red-800 text-white'
                        }`}
                      >
                        {dac.status.includes('Approved') ? 'Approved' : 'Approve'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'coursework' && (
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Coursework Allocations & Viva Permissions</h3>
            <table className="min-w-full text-left text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Scholar</th>
                  <th className="p-3">Course / Exam Detail</th>
                  <th className="p-3">School</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Sanction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {deanCoursework.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-extrabold text-[#7B1E3A]">{c.scholar}</td>
                    <td className="p-3">{c.course}</td>
                    <td className="p-3">{c.school}</td>
                    <td className="p-3">{c.type}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleApproveAction(deanCoursework, setDeanCoursework, c.id, 'Sanctioned')}
                        className={`px-3 py-1 rounded font-bold uppercase tracking-wider text-[9px] ${
                          c.status === 'Sanctioned' ? 'bg-emerald-100 text-emerald-800' : 'bg-dsu-maroon hover:bg-red-800 text-white'
                        }`}
                      >
                        {c.status === 'Sanctioned' ? 'Sanctioned' : 'Sanction'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'colloquium' && (
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Pre-Synopsis Colloquium Approvals</h3>
            <table className="min-w-full text-left text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Scholar</th>
                  <th className="p-3">Presentation Topic</th>
                  <th className="p-3">School</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {deanColloquium.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-extrabold text-[#7B1E3A]">{c.scholar}</td>
                    <td className="p-3">{c.topic}</td>
                    <td className="p-3">{c.school}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleApproveAction(deanColloquium, setDeanColloquium, c.id, 'Colloquium Cleared')}
                        className={`px-3 py-1 rounded font-bold uppercase tracking-wider text-[9px] ${
                          c.status === 'Colloquium Cleared' ? 'bg-emerald-100 text-emerald-800' : 'bg-dsu-maroon hover:bg-red-800 text-white'
                        }`}
                      >
                        {c.status === 'Colloquium Cleared' ? 'Cleared' : 'Approve'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'synopsis' && (
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Synopsis Approvals (Pre-Synopsis Clearance Check)</h3>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-[#7B1E3A]">Scholar Praveen K (School of Ag. Sciences)</p>
                <p className="text-[10px] text-slate-400">Turnitin Similarity Index: 6% | 2 Scopus Publications Verified by Research Office</p>
              </div>
              <button 
                onClick={(e) => {
                  e.target.innerText = 'Cleared for Submission'
                  e.target.disabled = true
                }}
                className="bg-[#7B1E3A] text-white px-3 py-1.5 rounded-lg hover:bg-red-800 transition font-bold uppercase tracking-wider text-[9px]"
              >
                Clear Synopsis
              </button>
            </div>
          </section>
        )}

        {view === 'examiner' && (
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Examiner Panel Approval</h3>
            <table className="min-w-full text-left text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Scholar</th>
                  <th className="p-3">School</th>
                  <th className="p-3">Panel Size</th>
                  <th className="p-3">Selection Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {deanExaminerPanels.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-extrabold text-[#7B1E3A]">{p.scholar}</td>
                    <td className="p-3">{p.school}</td>
                    <td className="p-3">{p.panelSize} Nominees</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleApproveAction(deanExaminerPanels, setDeanExaminerPanels, p.id, 'Panel Appointed')}
                        className={`px-3 py-1 rounded font-bold uppercase tracking-wider text-[9px] ${
                          p.status === 'Panel Appointed' ? 'bg-emerald-100 text-emerald-800' : 'bg-dsu-maroon hover:bg-red-800 text-white'
                        }`}
                      >
                        {p.status === 'Panel Appointed' ? 'Panel Appointed' : 'Select Examiners'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'thesis' && (
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Thesis Evaluation Decisions & Viva Approval</h3>
            <table className="min-w-full text-left text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Scholar</th>
                  <th className="p-3">School</th>
                  <th className="p-3">Reports Received</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {deanThesisEvaluations.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-extrabold text-[#7B1E3A]">{t.scholar}</td>
                    <td className="p-3">{t.school}</td>
                    <td className="p-3">Examiner 1: {t.report1} | Examiner 2: {t.report2}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleApproveAction(deanThesisEvaluations, setDeanThesisEvaluations, t.id, 'Viva Voced Approved')}
                        className={`px-3 py-1 rounded font-bold uppercase tracking-wider text-[9px] ${
                          t.status === 'Viva Voced Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-dsu-maroon hover:bg-red-800 text-white'
                        }`}
                      >
                        {t.status === 'Viva Voced Approved' ? 'Approved' : 'Schedule Viva'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'reports' && (
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Analytics & Reports</h3>
            <div className="p-5 border rounded-xl bg-slate-50/50 space-y-3">
              <p className="font-bold text-slate-600">Active Scholars Distribution by Department</p>
              <div className="flex items-end gap-3 h-32 pt-5 max-w-md">
                <div className="w-1/3 bg-[#7B1E3A] h-24 rounded-t-lg flex items-center justify-center text-white font-bold text-[10px]">CS (72)</div>
                <div className="w-1/3 bg-[#001c4f] h-16 rounded-t-lg flex items-center justify-center text-white font-bold text-[10px]">Eng (38)</div>
                <div className="w-1/3 bg-[#D4AF37] h-8 rounded-t-lg flex items-center justify-center text-slate-900 font-bold text-[10px]">Mgt (18)</div>
              </div>
            </div>
          </section>
        )}

        {view === 'schools' && (() => {
          // Schools mock data
          const schoolsData = [
            { id: 'computing', name: 'School of Computing', guidesCount: 25, scholarsCount: 140 },
            { id: 'engineering', name: 'School of Engineering', guidesCount: 18, scholarsCount: 92 },
            { id: 'management', name: 'School of Management', guidesCount: 12, scholarsCount: 65 },
            { id: 'science', name: 'School of Science', guidesCount: 10, scholarsCount: 45 },
            { id: 'agriculture', name: 'School of Agricultural Sciences', guidesCount: 8, scholarsCount: 30 }
          ]

          // Guides mock data by school
          const guidesDataBySchool = {
            computing: [
              { name: 'Dr. Kumar', department: 'CSE', scholarsCount: 6, capacity: 8, vacancy: 2 },
              { name: 'Dr. Priya', department: 'AI & DS', scholarsCount: 4, capacity: 8, vacancy: 4 },
              { name: 'Dr. Ravi', department: 'ECE', scholarsCount: 8, capacity: 8, vacancy: 0 },
              { name: 'Dr. D. Srinivasan', department: 'Computer Science', scholarsCount: 5, capacity: 8, vacancy: 3 },
              { name: 'Dr. R. Venkataraman', department: 'Computer Science', scholarsCount: 4, capacity: 8, vacancy: 4 }
            ],
            engineering: [
              { name: 'Dr. S. K. Gupta', department: 'Mechanical Eng', scholarsCount: 8, capacity: 8, vacancy: 0 },
              { name: 'Dr. A. K. Sharma', department: 'Civil Eng', scholarsCount: 5, capacity: 8, vacancy: 3 },
              { name: 'Dr. Rajesh Khanna', department: 'Electrical Eng', scholarsCount: 6, capacity: 8, vacancy: 2 }
            ],
            management: [
              { name: 'Dr. D. Srinivasan (Mgt)', department: 'MBA', scholarsCount: 3, capacity: 8, vacancy: 5 },
              { name: 'Dr. Amit Patel', department: 'Finance', scholarsCount: 4, capacity: 8, vacancy: 4 }
            ],
            science: [
              { name: 'Dr. H. Subramanian (Phys)', department: 'Physics', scholarsCount: 3, capacity: 8, vacancy: 5 },
              { name: 'Dr. V. Rama', department: 'Chemistry', scholarsCount: 2, capacity: 8, vacancy: 6 }
            ],
            agriculture: [
              { name: 'Dr. Praveen K (Agri)', department: 'Agronomy', scholarsCount: 3, capacity: 8, vacancy: 5 }
            ]
          }

          // Scholars mock list by Guide Name
          const scholarsByGuide = {
            'Dr. Kumar': [
              { name: 'Arun Kumar', approval: 'First DAC Approval' },
              { name: 'Naveen M', approval: 'Inch Committee Approval' },
              { name: 'Vikram A', approval: 'None (All Cleared)' }
            ],
            'Dr. Priya': [
              { name: 'Akash V', approval: 'Colloquium Approval' },
              { name: 'Srinath V', approval: 'None (All Cleared)' }
            ],
            'Dr. Ravi': [
              { name: 'Deepa R', approval: 'Comprehensive Viva Approval' },
              { name: 'Harini K', approval: 'Synopsis Approval' },
              { name: 'Meera S', approval: 'Thesis Defense Approval' }
            ],
            'Dr. D. Srinivasan': [
              { name: 'Priya R', approval: 'None (All Cleared)' },
              { name: 'Rajesh Kumar', approval: 'None (All Cleared)' },
              { name: 'Aishwarya S', approval: 'First DAC Approval' },
              { name: 'Kamalesh N', approval: 'Synopsis Approval' },
              { name: 'Sneha Roy', approval: 'Inch Committee Approval' }
            ],
            'Dr. R. Venkataraman': [
              { name: 'Amit Kumar', approval: 'None (All Cleared)' },
              { name: 'Divya Menon', approval: 'None (All Cleared)' },
              { name: 'Rahul Sharma', approval: 'First DAC Approval' },
              { name: 'Manoj Rajan', approval: 'None (All Cleared)' }
            ],
            'Dr. S. K. Gupta': [
              { name: 'Ajay Dev', approval: 'None (All Cleared)' },
              { name: 'Vikram Singh', approval: 'None (All Cleared)' },
              { name: 'Kavitha P', approval: 'First DAC Approval' },
              { name: 'Sanjay Dutt', approval: 'None (All Cleared)' },
              { name: 'Rajesh Khanna', approval: 'None (All Cleared)' },
              { name: 'Kishore Kumar', approval: 'None (All Cleared)' },
              { name: 'Asha Bhosle', approval: 'None (All Cleared)' },
              { name: 'Lata Mangeshkar', approval: 'None (All Cleared)' }
            ],
            'Dr. H. Subramanian': [
              { name: 'Meera Das', approval: 'None (All Cleared)' },
              { name: 'Arun Kumar', approval: 'None (All Cleared)' },
              { name: 'Preethi S', approval: 'First DAC Approval' }
            ],
            'Dr. A. K. Sharma': [
              { name: 'Karthik S', approval: 'None (All Cleared)' }
            ],
            'Dr. Rajesh Khanna': [
              { name: 'Meera Das', approval: 'None (All Cleared)' }
            ],
            'Dr. D. Srinivasan (Mgt)': [
              { name: 'Amit Kumar (Mgt)', approval: 'None (All Cleared)' }
            ],
            'Dr. Amit Patel': [
              { name: 'Aishwarya S (Mgt)', approval: 'None (All Cleared)' }
            ],
            'Dr. H. Subramanian (Phys)': [
              { name: 'Karthik S (Phys)', approval: 'None (All Cleared)' }
            ],
            'Dr. V. Rama': [
              { name: 'Deepa R (Chem)', approval: 'None (All Cleared)' }
            ],
            'Dr. Praveen K (Agri)': [
              { name: 'Arun Kumar (Agri)', approval: 'None (All Cleared)' }
            ]
          }

          // Scholar histories and pending details
          const scholarDetailsDb = {
            'Arun Kumar': {
              history: [
                { phase: 'Coursework Registration', status: 'Approved', date: '10-Jan-2026', docs: ['coursework_form.pdf', 'fees_receipt.pdf'], documents: ['coursework_form.pdf', 'fees_receipt.pdf'] }
              ],
              pending: {
                phase: 'First DAC',
                approval: 'First DAC Approval',
                date: '15-Jun-2026',
                docs: ['dac_proposal.pdf', 'dac_members_list.pdf', 'priya_dac1_mom.pdf']
              }
            },
            'Deepa R': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '05-Feb-2026', docs: ['dac_report.pdf', 'first_dac_mom.pdf'], documents: ['dac_report.pdf', 'first_dac_mom.pdf'] },
                { phase: 'Coursework Clearance', status: 'Approved', date: '12-May-2026', docs: ['transcript.pdf', 'coursework_certificate.pdf'], documents: ['transcript.pdf', 'coursework_certificate.pdf'] }
              ],
              pending: {
                phase: 'Comprehensive Viva',
                approval: 'Comprehensive Viva Approval',
                date: '18-Jun-2026',
                docs: ['cv_syllabus.pdf', 'recommendation_letter.pdf', 'cv_mom.pdf']
              }
            },
            'Akash V': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '12-Feb-2026', docs: ['dac_report.pdf'], documents: ['dac_report.pdf'] },
                { phase: 'Comprehensive Viva', status: 'Approved', date: '20-May-2026', docs: ['viva_mom.pdf'], documents: ['viva_mom.pdf'] }
              ],
              pending: {
                phase: 'Colloquium',
                approval: 'Colloquium Approval',
                date: '20-Jun-2026',
                docs: ['publication_form.pdf', 'journal_form.pdf', 'fulfilment_form.pdf']
              }
            },
            'Naveen M': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '15-Mar-2026', docs: ['dac_report.pdf'], documents: ['dac_report.pdf'] },
                { phase: 'Comprehensive Viva', status: 'Approved', date: '10-Jun-2026', docs: ['viva_mom.pdf'], documents: ['viva_mom.pdf'] },
                { phase: 'Colloquium', status: 'Approved', date: '18-Jun-2026', docs: ['colloquium_mom.pdf'], documents: ['colloquium_mom.pdf'] }
              ],
              pending: {
                phase: 'Inch Committee',
                approval: 'Inch Committee Approval',
                date: '22-Jun-2026',
                docs: ['thesis_draft.pdf', 'synopsis_draft.pdf', 'plagiarism_report.pdf']
              }
            },
            'Harini K': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '02-Jan-2026', docs: ['dac_report.pdf'], documents: ['dac_report.pdf'] },
                { phase: 'Comprehensive Viva', status: 'Approved', date: '14-Apr-2026', docs: ['viva_mom.pdf'], documents: ['viva_mom.pdf'] },
                { phase: 'Colloquium', status: 'Approved', date: '22-May-2026', docs: ['colloquium_mom.pdf'], documents: ['colloquium_mom.pdf'] },
                { phase: 'Inch Committee', status: 'Approved', date: '15-Jun-2026', docs: ['inch_certificate.pdf'], documents: ['inch_certificate.pdf'] }
              ],
              pending: {
                phase: 'Synopsis',
                approval: 'Synopsis Approval',
                date: '24-Jun-2026',
                docs: ['synopsis_draft.pdf', 'examiner_panel.pdf']
              }
            },
            'Meera S': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '20-Dec-2025', docs: ['dac_report.pdf'], documents: ['dac_report.pdf'] },
                { phase: 'Comprehensive Viva', status: 'Approved', date: '10-Mar-2026', docs: ['viva_mom.pdf'], documents: ['viva_mom.pdf'] },
                { phase: 'Colloquium', status: 'Approved', date: '25-Apr-2026', docs: ['colloquium_mom.pdf'], documents: ['colloquium_mom.pdf'] },
                { phase: 'Inch Committee', status: 'Approved', date: '18-May-2026', docs: ['inch_certificate.pdf'], documents: ['inch_certificate.pdf'] },
                { phase: 'Synopsis', status: 'Approved', date: '12-Jun-2026', docs: ['synopsis_approval.pdf'], documents: ['synopsis_approval.pdf'] }
              ],
              pending: {
                phase: 'Thesis Defense',
                approval: 'Thesis Defense Approval',
                date: '26-Jun-2026',
                docs: ['defense_request.pdf', 'final_thesis.pdf']
              }
            },
            'Priya R': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '10-Nov-2022', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
                { phase: 'Coursework', status: 'Approved', date: '05-May-2023', docs: ['coursework_marksheet.pdf'], documents: ['coursework_marksheet.pdf'] },
                { phase: 'Comprehensive Viva', status: 'Approved', date: '14-Sep-2023', docs: ['viva_report.pdf'], documents: ['viva_report.pdf'] },
                { phase: 'Colloquium', status: 'Approved', date: '20-Feb-2024', docs: ['colloquium_minutes.pdf', 'journal_publications.pdf'], documents: ['colloquium_minutes.pdf', 'journal_publications.pdf'] },
                { phase: 'INCH Formatting', status: 'Approved', date: '18-Aug-2024', docs: ['formatting_clearance.pdf', 'plagiarism_report.pdf'], documents: ['formatting_clearance.pdf', 'plagiarism_report.pdf'] },
                { phase: 'Synopsis', status: 'Approved', date: '12-Jan-2025', docs: ['synopsis_copy.pdf', 'examiner_panel.pdf'], documents: ['synopsis_copy.pdf', 'examiner_panel.pdf'] }
              ],
              pending: {
                phase: 'Thesis Evaluation',
                approval: 'Thesis Evaluation Approval',
                date: '26-Jun-2026',
                docs: ['evaluator_report.pdf', 'final_thesis.pdf']
              }
            },
            'Rajesh Kumar': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '15-Mar-2023', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
                { phase: 'Coursework', status: 'Approved', date: '18-Oct-2023', docs: ['coursework_marksheet.pdf'], documents: ['coursework_marksheet.pdf'] },
                { phase: 'Comprehensive Viva', status: 'Approved', date: '22-Feb-2024', docs: ['viva_report.pdf'], documents: ['viva_report.pdf'] },
                { phase: 'Colloquium', status: 'Approved', date: '10-Jul-2024', docs: ['colloquium_minutes.pdf', 'journal_publications.pdf'], documents: ['colloquium_minutes.pdf', 'journal_publications.pdf'] },
                { phase: 'INCH Formatting', status: 'Approved', date: '15-Dec-2024', docs: ['formatting_clearance.pdf', 'plagiarism_report.pdf'], documents: ['formatting_clearance.pdf', 'plagiarism_report.pdf'] }
              ],
              pending: {
                phase: 'Synopsis',
                approval: 'Synopsis Approval',
                date: '24-Jun-2026',
                docs: ['synopsis_draft.pdf', 'examiner_panel.pdf']
              }
            },
            'Aishwarya S': {
              history: [],
              pending: {
                phase: 'First DAC',
                approval: 'First DAC Approval',
                date: '15-Jun-2026',
                docs: ['dac_proposal.pdf', 'dac_members_list.pdf']
              }
            },
            'Kamalesh N': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '05-Jan-2023', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
                { phase: 'Coursework', status: 'Approved', date: '12-May-2023', docs: ['coursework_marksheet.pdf'], documents: ['coursework_marksheet.pdf'] },
                { phase: 'Comprehensive Viva', status: 'Approved', date: '20-Sep-2023', docs: ['viva_report.pdf'], documents: ['viva_report.pdf'] },
                { phase: 'Colloquium', status: 'Approved', date: '15-Mar-2024', docs: ['colloquium_minutes.pdf'], documents: ['colloquium_minutes.pdf'] },
                { phase: 'INCH Formatting', status: 'Approved', date: '10-Sep-2024', docs: ['formatting_clearance.pdf', 'plagiarism_report.pdf'], documents: ['formatting_clearance.pdf', 'plagiarism_report.pdf'] }
              ],
              pending: {
                phase: 'Synopsis',
                approval: 'Synopsis Approval',
                date: '24-Jun-2026',
                docs: ['synopsis_draft.pdf', 'synopsis_mom.pdf']
              }
            },
            'Sneha Roy': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '10-Jan-2024', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
                { phase: 'Coursework', status: 'Approved', date: '15-Jun-2024', docs: ['coursework_marksheet.pdf'], documents: ['coursework_marksheet.pdf'] },
                { phase: 'Comprehensive Viva', status: 'Approved', date: '05-Nov-2024', docs: ['viva_report.pdf'], documents: ['viva_report.pdf'] },
                { phase: 'Colloquium', status: 'Approved', date: '12-Apr-2025', docs: ['colloquium_minutes.pdf'], documents: ['colloquium_minutes.pdf'] }
              ],
              pending: {
                phase: 'INCH Formatting',
                approval: 'Inch Committee Approval',
                date: '18-Jun-2026',
                docs: ['thesis_draft.pdf', 'synopsis_draft.pdf', 'plagiarism_report.pdf']
              }
            },
            'Amit Kumar': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '18-Feb-2025', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] }
              ],
              pending: {
                phase: 'Coursework',
                approval: 'First DAC Approval',
                date: '20-Jun-2026',
                docs: ['coursework_marksheet.pdf']
              }
            },
            'Divya Menon': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '12-Dec-2024', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
                { phase: 'Coursework', status: 'Approved', date: '15-May-2025', docs: ['coursework_marksheet.pdf'], documents: ['coursework_marksheet.pdf'] }
              ],
              pending: {
                phase: 'Comprehensive Viva',
                approval: 'Comprehensive Viva Approval',
                date: '20-Jun-2026',
                docs: ['cv_syllabus.pdf', 'recommendation_letter.pdf']
              }
            },
            'Rahul Sharma': {
              history: [],
              pending: {
                phase: 'First DAC',
                approval: 'First DAC Approval',
                date: '20-Jun-2026',
                docs: ['dac_proposal.pdf']
              }
            },
            'Manoj Rajan': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '10-Jan-2022', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
                { phase: 'Coursework', status: 'Approved', date: '15-Jun-2022', docs: ['coursework_marksheet.pdf'], documents: ['coursework_marksheet.pdf'] },
                { phase: 'Comprehensive Viva', status: 'Approved', date: '05-Nov-2022', docs: ['viva_report.pdf'], documents: ['viva_report.pdf'] },
                { phase: 'Colloquium', status: 'Approved', date: '12-Apr-2023', docs: ['colloquium_minutes.pdf'], documents: ['colloquium_minutes.pdf'] },
                { phase: 'INCH Formatting', status: 'Approved', date: '18-Sep-2023', docs: ['formatting_clearance.pdf', 'plagiarism_report.pdf'], documents: ['formatting_clearance.pdf', 'plagiarism_report.pdf'] },
                { phase: 'Synopsis', status: 'Approved', date: '12-Feb-2024', docs: ['synopsis_copy.pdf', 'examiner_panel.pdf'], documents: ['synopsis_copy.pdf', 'examiner_panel.pdf'] },
                { phase: 'Thesis Evaluation', status: 'Approved', date: '20-Sep-2024', docs: ['evaluator_reports.pdf', 'thesis_final.pdf'], documents: ['evaluator_reports.pdf', 'thesis_final.pdf'] }
              ],
              pending: {
                phase: 'Thesis Defense',
                approval: 'Thesis Defense Approval',
                date: '26-Jun-2026',
                docs: ['defense_request.pdf', 'final_thesis.pdf']
              }
            },
            'Meera Das': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '10-Jan-2023', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
                { phase: 'Coursework', status: 'Approved', date: '15-Jun-2023', docs: ['coursework_marksheet.pdf'], documents: ['coursework_marksheet.pdf'] }
              ],
              pending: {
                phase: 'Comprehensive Viva',
                approval: 'Comprehensive Viva Approval',
                date: '26-Jun-2026',
                docs: ['cv_syllabus.pdf', 'recommendation_letter.pdf']
              }
            },
            'Preethi S': {
              history: [],
              pending: {
                phase: 'First DAC',
                approval: 'First DAC Approval',
                date: '20-Jun-2026',
                docs: ['dac_proposal.pdf']
              }
            },
            'Ajay Dev': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '10-Jan-2023', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
                { phase: 'Coursework', status: 'Approved', date: '15-Jun-2023', docs: ['coursework_marksheet.pdf'], documents: ['coursework_marksheet.pdf'] },
                { phase: 'Comprehensive Viva', status: 'Approved', date: '05-Nov-2023', docs: ['viva_report.pdf'], documents: ['viva_report.pdf'] }
              ],
              pending: {
                phase: 'Colloquium',
                approval: 'Colloquium Approval',
                date: '02-Jul-2026',
                docs: ['publication_form.pdf', 'journal_form.pdf', 'fulfilment_form.pdf']
              }
            },
            'Vikram Singh': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '18-Feb-2025', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] }
              ],
              pending: {
                phase: 'Coursework',
                approval: 'First DAC Approval',
                date: '20-Jun-2026',
                docs: ['coursework_marksheet.pdf']
              }
            },
            'Kavitha P': {
              history: [],
              pending: {
                phase: 'First DAC',
                approval: 'First DAC Approval',
                date: '20-Jun-2026',
                docs: ['dac_proposal.pdf']
              }
            },
            'Sanjay Dutt': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '18-Feb-2025', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] }
              ],
              pending: {
                phase: 'Coursework',
                approval: 'First DAC Approval',
                date: '20-Jun-2026',
                docs: ['coursework_marksheet.pdf']
              }
            },
            'Rajesh Khanna': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '10-Jan-2023', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
                { phase: 'Coursework', status: 'Approved', date: '15-Jun-2023', docs: ['coursework_marksheet.pdf'], documents: ['coursework_marksheet.pdf'] }
              ],
              pending: {
                phase: 'Comprehensive Viva',
                approval: 'Comprehensive Viva Approval',
                date: '20-Jun-2026',
                docs: ['cv_syllabus.pdf']
              }
            },
            'Kishore Kumar': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '10-Jan-2022', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
                { phase: 'Coursework', status: 'Approved', date: '15-Jun-2022', docs: ['coursework_marksheet.pdf'], documents: ['coursework_marksheet.pdf'] },
                { phase: 'Comprehensive Viva', status: 'Approved', date: '05-Nov-2022', docs: ['viva_report.pdf'], documents: ['viva_report.pdf'] },
                { phase: 'Colloquium', status: 'Approved', date: '12-Apr-2023', docs: ['colloquium_minutes.pdf'], documents: ['colloquium_minutes.pdf'] },
                { phase: 'INCH Formatting', status: 'Approved', date: '18-Sep-2023', docs: ['formatting_clearance.pdf', 'plagiarism_report.pdf'], documents: ['formatting_clearance.pdf', 'plagiarism_report.pdf'] },
                { phase: 'Synopsis', status: 'Approved', date: '12-Feb-2024', docs: ['synopsis_copy.pdf', 'examiner_panel.pdf'], documents: ['synopsis_copy.pdf', 'examiner_panel.pdf'] }
              ],
              pending: {
                phase: 'Thesis Evaluation',
                approval: 'Thesis Evaluation Approval',
                date: '20-Jun-2026',
                docs: ['evaluator_report.pdf', 'final_thesis.pdf']
              }
            },
            'Asha Bhosle': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '18-Feb-2025', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] }
              ],
              pending: {
                phase: 'Coursework',
                approval: 'First DAC Approval',
                date: '20-Jun-2026',
                docs: ['coursework_marksheet.pdf']
              }
            },
            'Lata Mangeshkar': {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '10-Jan-2022', docs: ['dac_proposal.pdf', 'dac_members.pdf'], documents: ['dac_proposal.pdf', 'dac_members.pdf'] },
                { phase: 'Coursework', status: 'Approved', date: '15-Jun-2022', docs: ['coursework_marksheet.pdf'], documents: ['coursework_marksheet.pdf'] },
                { phase: 'Comprehensive Viva', status: 'Approved', date: '05-Nov-2022', docs: ['viva_report.pdf'], documents: ['viva_report.pdf'] },
                { phase: 'Colloquium', status: 'Approved', date: '12-Apr-2023', docs: ['colloquium_minutes.pdf'], documents: ['colloquium_minutes.pdf'] },
                { phase: 'INCH Formatting', status: 'Approved', date: '18-Sep-2023', docs: ['formatting_clearance.pdf', 'plagiarism_report.pdf'], documents: ['formatting_clearance.pdf', 'plagiarism_report.pdf'] },
                { phase: 'Synopsis', status: 'Approved', date: '12-Feb-2024', docs: ['synopsis_copy.pdf', 'examiner_panel.pdf'], documents: ['synopsis_copy.pdf', 'examiner_panel.pdf'] },
                { phase: 'Thesis Evaluation', status: 'Approved', date: '20-Sep-2024', docs: ['evaluator_reports.pdf', 'thesis_final.pdf'], documents: ['evaluator_reports.pdf', 'thesis_final.pdf'] }
              ],
              pending: {
                phase: 'Thesis Defense',
                approval: 'Thesis Defense Approval',
                date: '20-Jun-2026',
                docs: ['defense_request.pdf', 'final_thesis.pdf']
              }
            }
          }

          const getScholarVerificationData = (scholarName) => {
            const savedDetails = localStorage.getItem('dsu_dean_scholar_details')
            if (savedDetails) {
              try {
                const parsed = JSON.parse(savedDetails)
                if (parsed[scholarName]) {
                  return parsed[scholarName]
                }
              } catch (e) {}
            }
            if (scholarDetailsDb[scholarName]) {
              return scholarDetailsDb[scholarName]
            }
            return {
              history: [
                { phase: 'First DAC', status: 'Approved', date: '12-Feb-2026', docs: ['dac_report.pdf', 'mom_dac.pdf'], documents: ['dac_report.pdf', 'mom_dac.pdf'] },
                { phase: 'Coursework', status: 'Approved', date: '18-May-2026', docs: ['grade_card.pdf'], documents: ['grade_card.pdf'] }
              ],
              pending: {
                phase: 'Comprehensive Viva',
                approval: 'Comprehensive Viva Approval',
                date: '19-Jun-2026',
                docs: ['cv_syllabus.pdf', 'recommendation_letter.pdf', 'cv_mom.pdf']
              }
            }
          }

          const handleVerifyAction = (scholarName, outcome, remarks = '') => {
            const savedDetails = localStorage.getItem('dsu_dean_scholar_details')
            let detailsDb = {}
            if (savedDetails) {
              try {
                detailsDb = JSON.parse(savedDetails)
              } catch (e) {}
            }
            
            let sData = detailsDb[scholarName] || getScholarVerificationData(scholarName)
            const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')
            
            if (outcome === 'Approved') {
              const newHistoryItem = {
                phase: sData.pending.phase,
                status: 'Approved',
                approvedBy: 'Dean of Research',
                date: todayStr,
                remarks: remarks,
                signedDoc: deanSignedFile ? deanSignedFile.name : null,
                docs: sData.pending.docs || []
              }
              sData.history = [...(sData.history || []), newHistoryItem]
              
              const savedApprovals = localStorage.getItem('dsu_dean_scholar_approvals')
              let approvalsDb = savedApprovals ? JSON.parse(savedApprovals) : {}
              approvalsDb[scholarName] = 'None (All Cleared)'
              localStorage.setItem('dsu_dean_scholar_approvals', JSON.stringify(approvalsDb))
              
              sData.pending = {
                phase: 'None',
                approval: 'None (All Cleared)',
                date: '',
                docs: []
              }
            } else {
              const newHistoryItem = {
                phase: sData.pending.phase,
                status: 'Returned',
                returnedBy: 'Dean of Research',
                date: todayStr,
                remarks: remarks,
                docs: sData.pending.docs || []
              }
              sData.history = [...(sData.history || []), newHistoryItem]
              
              const savedApprovals = localStorage.getItem('dsu_dean_scholar_approvals')
              let approvalsDb = savedApprovals ? JSON.parse(savedApprovals) : {}
              approvalsDb[scholarName] = 'Returned (Dean of Research)'
              localStorage.setItem('dsu_dean_scholar_approvals', JSON.stringify(approvalsDb))
              
              sData.pending = {
                phase: sData.pending.phase,
                approval: 'Returned (Dean of Research)',
                date: todayStr,
                docs: sData.pending.docs || []
              }
            }
            
            detailsDb[scholarName] = sData
            localStorage.setItem('dsu_dean_scholar_details', JSON.stringify(detailsDb))

            // Remove from dean notifications if it exists
            const savedNotifs = localStorage.getItem('dsu_dean_notifications')
            if (savedNotifs) {
              try {
                const parsed = JSON.parse(savedNotifs)
                const updated = parsed.filter(n => n.scholar !== scholarName)
                localStorage.setItem('dsu_dean_notifications', JSON.stringify(updated))
                // Dispatch event to sync Topbar badge count
                window.dispatchEvent(new Event('notifications_updated'))
              } catch (e) {}
            }
            
            alert(`Scholar ${scholarName} request has been successfully ${outcome === 'Approved' ? 'Approved' : 'Returned'}!`)
            
            setDeanRemarksText('')
            setDeanSignedFile(null)
            setActiveDeanVerifyScholar(null)
          }

          // ──── Sub-view 4: Scholar Verification Page ────
          if (activeDeanVerifyScholar) {
            const sName = typeof activeDeanVerifyScholar === 'string' ? activeDeanVerifyScholar : activeDeanVerifyScholar.name
            const sData = getScholarVerificationData(sName)
            
            return (
              <div className="space-y-6 animate-in fade-in duration-150 text-xs">
                {/* Header with back navigation */}
                <div className="flex items-center justify-between border-b pb-3">
                  <button 
                    onClick={() => {
                      setDeanRemarksText('')
                      setDeanSignedFile(null)
                      setActiveDeanVerifyScholar(null)
                    }}
                    className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Guide Details
                  </button>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scholar Verification Desk</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                    Scholar Profile: <span className="text-dsu-maroon">{sName}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                      <span className="text-slate-900 font-bold text-sm block mt-0.5">{sName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                      <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeDeanSchool?.name || 'School of Computing'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                      <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeDeanGuide?.department || 'CSE'}</span>
                    </div>
                    <div className="mt-2 sm:col-span-2 md:col-span-3">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Research Guide</span>
                      <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeDeanGuide?.name || 'Dr. Priya'}</span>
                    </div>
                  </div>
                </div>

                {/* Part A: Complete Approval History */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">Complete Approval History</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Timeline of previously cleared research milestones</p>
                  </div>

                  <div className="relative border-l border-slate-200 pl-5 ml-2.5 space-y-5 py-2">
                    {sData.history.map((h, index) => {
                      const docsList = h.docs || h.documents || []
                      const isReturned = h.status === 'Returned'
                      return (
                        <div key={index} className="relative">
                          {/* Timeline dot */}
                          <span className={`absolute -left-[27px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full ring-4 ${
                            isReturned ? 'bg-rose-500 ring-rose-50' : 'bg-emerald-500 ring-emerald-50'
                          }`}></span>
                          
                          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex flex-col md:flex-row md:items-start justify-between gap-3 hover:bg-slate-100/50 transition">
                            <div className="space-y-2">
                              <div>
                                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Phase</span>
                                <h4 className="font-extrabold text-slate-800 text-xs mt-0.5">{h.phase}</h4>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                <div>
                                  <span className="text-[9px] text-slate-400 block uppercase font-bold">
                                    {isReturned ? 'Return Date' : 'Approval Date'}
                                  </span>
                                  <span className="font-bold text-slate-700">{h.date || h.returnDate}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Status</span>
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${
                                    isReturned ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                                  }`}>
                                    {h.status}
                                  </span>
                                </div>
                                {(h.approvedBy || h.returnedBy) && (
                                  <div>
                                    <span className="text-[9px] text-slate-400 block uppercase font-bold">
                                      {isReturned ? 'Returned By' : 'Approved By'}
                                    </span>
                                    <span className="font-bold text-slate-700">{h.approvedBy || h.returnedBy}</span>
                                  </div>
                                )}
                              </div>
                              
                              {h.remarks && (
                                <div className="mt-1 p-2 bg-white rounded-lg border border-slate-150 text-[10px] text-slate-650 font-medium italic">
                                  <span className="font-bold text-slate-500 uppercase block tracking-wider text-[8px] not-italic leading-none mb-1">Dean Remarks</span>
                                  {h.remarks}
                                </div>
                              )}

                              {h.signedDoc && (
                                <div className="mt-1">
                                  <span className="text-[9px] text-slate-400 block uppercase font-bold leading-none mb-1">Verified Document</span>
                                  <button 
                                    onClick={() => alert(`Downloading verified document: ${h.signedDoc}`)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#7B1E3A]/20 hover:border-[#7B1E3A]/40 text-[#7B1E3A] rounded-lg transition font-bold text-[9px]"
                                    type="button"
                                  >
                                    <FileText className="h-3 w-3 text-dsu-maroon shrink-0" />
                                    {h.signedDoc}
                                  </button>
                                </div>
                              )}
                            </div>
                            
                            {docsList.length > 0 && (
                              <div className="flex flex-col gap-1.5 shrink-0">
                                <span className="text-[9px] text-slate-400 uppercase font-bold">Submitted Documents</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {docsList.map((doc, dIdx) => (
                                    <button 
                                      key={dIdx}
                                      onClick={() => alert(`Downloading archived document: ${doc}`)}
                                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition text-[10px] text-slate-655 font-bold"
                                      type="button"
                                    >
                                      <Download className="h-3.5 w-3.5 text-dsu-maroon" />
                                      {doc}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Part B: Pending Approval Request */}
                {sData.pending && sData.pending.phase !== 'None' && sData.pending.approval !== 'None (All Cleared)' ? (
                  <div className="bg-white rounded-2xl border border-[#7B1E3A]/20 shadow-sm p-5 space-y-4">
                    <div className="border-b border-slate-100 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                          Current Pending Approval Request
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Verification details submitted for Dean of Research clearance</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200/60 uppercase tracking-wider self-start sm:self-center">
                        Awaiting Dean Clearance
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <div className="space-y-2">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Event / Stage</span>
                          <span className="text-slate-900 font-extrabold text-sm">{sData.pending.phase}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Approval Required</span>
                          <span className="text-dsu-maroon font-bold text-sm">{sData.pending.approval}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Submission Date</span>
                          <span className="text-slate-700 font-bold">{sData.pending.date}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block leading-none">Verification Documents</span>
                        <div className="grid gap-2">
                          {(sData.pending.docs || []).map((doc, dIdx) => (
                            <div key={dIdx} className="flex items-center justify-between bg-white border border-slate-200/60 rounded-xl p-3 shadow-xs hover:border-slate-300 transition">
                              <span className="font-bold text-slate-700">{doc}</span>
                              <button
                                onClick={() => alert(`Downloading pending document for review: ${doc}`)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7B1E3A]/5 hover:bg-[#7B1E3A]/10 text-dsu-maroon rounded-lg transition font-bold text-[10px] uppercase tracking-wider"
                                type="button"
                              >
                                <Download className="h-3.5 w-3.5" />
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Dean Remarks Section */}
                    <div className="space-y-2 mt-4">
                      <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Dean Remarks</h4>
                      <div className="relative">
                        <textarea
                          rows={5}
                          maxLength={500}
                          value={deanRemarksText}
                          onChange={(e) => setDeanRemarksText(e.target.value)}
                          placeholder="Enter verification comments, observations, recommendations, approval notes, or reasons for returning the request..."
                          className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                        />
                        <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                          ({deanRemarksText.length}/500)
                        </div>
                      </div>
                    </div>

                    {/* Verified / Signed Document Section */}
                    <div className="space-y-2 mt-4">
                      <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Verified / Signed Document</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold uppercase tracking-wider text-[10px] rounded-lg cursor-pointer border border-slate-250 transition shadow-sm text-center shrink-0">
                          {deanSignedFile ? 'Replace File' : 'Upload File'}
                          <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0]
                              if (file) {
                                if (file.type !== 'application/pdf') {
                                  alert('Only PDF files are accepted.')
                                  return
                                }
                                if (file.size > 10 * 1024 * 1024) {
                                  alert('Maximum file size is 10 MB.')
                                  return
                                }
                                setDeanSignedFile(file)
                              }
                            }}
                          />
                        </label>
                        <div className="space-y-0.5">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Upload the signed or verified approval document (PDF).</p>
                          {deanSignedFile && (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-emerald-600 font-bold">Selected File: {deanSignedFile.name}</span>
                              <button 
                                type="button"
                                onClick={() => setDeanSignedFile(null)} 
                                className="text-[9px] text-rose-600 hover:underline uppercase font-bold"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => {
                          if (!deanRemarksText.trim()) {
                            alert("Remarks are required when returning a request.")
                            return
                          }
                          handleVerifyAction(sName, 'Denied', deanRemarksText.trim())
                        }}
                        className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition shadow-sm flex items-center gap-1.5"
                        type="button"
                      >
                        <X className="h-4 w-4" />
                        Deny Request
                      </button>
                      <button
                        onClick={() => {
                          handleVerifyAction(sName, 'Approved', deanRemarksText.trim())
                        }}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition shadow-sm flex items-center gap-1.5"
                        type="button"
                      >
                        <Check className="h-4 w-4" />
                        Approve Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center text-slate-400 font-bold uppercase tracking-wider">
                    All requests have been verified. No pending approval requests.
                  </div>
                )}
              </div>
            )
          }

          // ──── Sub-view 3: Guide Details Page ────
          if (activeDeanGuide) {
            const savedApprovals = localStorage.getItem('dsu_dean_scholar_approvals')
            let approvalsDb = {}
            if (savedApprovals) {
              try {
                approvalsDb = JSON.parse(savedApprovals)
              } catch (e) {}
            }
            const gScholars = (scholarsByGuide[activeDeanGuide.name] || []).map(s => {
              if (approvalsDb[s.name]) {
                return { ...s, approval: approvalsDb[s.name] }
              }
              return s
            })
            
            return (
              <div className="space-y-6 animate-in fade-in duration-150 text-xs">
                {/* Header with back navigation */}
                <div className="flex items-center justify-between border-b pb-3">
                  <button 
                    onClick={() => setActiveDeanGuide(null)}
                    className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Guides Directory
                  </button>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guide Details Desk</span>
                </div>

                {/* Guide Information Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                    Research Supervisor Info
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Guide Name</span>
                      <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeDeanGuide.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                      <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeDeanGuide.department}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Capacity</span>
                      <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeDeanGuide.capacity} Scholars</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Assigned Scholars</span>
                      <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeDeanGuide.scholarsCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Available Vacancy</span>
                      <span className="text-emerald-600 font-black text-sm block mt-0.5">{activeDeanGuide.vacancy} Slots</span>
                    </div>
                  </div>
                </div>

                {/* Scholar List */}
                <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Assigned Scholars Registry</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Click any scholar to inspect complete milestone history and pending actions</p>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                    <table className="min-w-full text-left text-xs text-slate-700">
                      <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                          <th className="p-4">Scholar Name</th>
                          <th className="p-4">Approval Required</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold">
                        {gScholars.length === 0 ? (
                          <tr>
                            <td colSpan="2" className="p-8 text-center text-slate-400 font-semibold">
                              No scholars currently assigned to this guide.
                            </td>
                          </tr>
                        ) : (
                          gScholars.map((s, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition">
                              <td className="p-4">
                                <button
                                  onClick={() => setActiveDeanVerifyScholar(s)}
                                  className="text-left font-black text-[#7B1E3A] hover:text-red-800 hover:underline text-xs font-bold"
                                >
                                  {s.name}
                                </button>
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-1 rounded font-bold ${
                                  s.approval.includes('None')
                                    ? 'bg-slate-100 text-slate-500'
                                    : 'bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10'
                                }`}>
                                  {s.approval}
                                </span>
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

          // ──── Sub-view 2: Guides Directory Page ────
          if (activeDeanSchool) {
            const guides = guidesDataBySchool[activeDeanSchool.id] || []
            const filteredGuides = guides.filter(g =>
              g.name.toLowerCase().includes(schoolsGuidesSearchQuery.toLowerCase()) ||
              g.department.toLowerCase().includes(schoolsGuidesSearchQuery.toLowerCase())
            )

            return (
              <div className="space-y-6 animate-in fade-in duration-150 text-xs">
                {/* Header with back navigation */}
                <div className="flex items-center justify-between border-b pb-3">
                  <button 
                    onClick={() => setActiveDeanSchool(null)}
                    className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Schools
                  </button>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guides Directory</span>
                </div>

                <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">School Supervisors</p>
                  <h1 className="mt-2 text-xl font-black text-dsu-maroon uppercase tracking-wide">
                    Guides Registry: {activeDeanSchool.name}
                  </h1>
                </header>

                <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  {/* Search Bar */}
                  <div className="flex justify-end">
                    <div className="relative w-full sm:w-64">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        value={schoolsGuidesSearchQuery}
                        onChange={(e) => setSchoolsGuidesSearchQuery(e.target.value)}
                        placeholder="Search guide name or department..."
                        className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-slate-800 outline-none focus:border-[#7B1E3A] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                    <table className="min-w-full text-left text-xs text-slate-700">
                      <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                          <th className="p-4">Guide Name</th>
                          <th className="p-4">Department</th>
                          <th className="p-4">Assigned Scholars</th>
                          <th className="p-4">Available Vacancy</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold">
                        {filteredGuides.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="p-8 text-center text-slate-400 font-semibold">
                              No guides found matching search query.
                            </td>
                          </tr>
                        ) : (
                          filteredGuides.map((guide, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition">
                              <td className="p-4">
                                <button
                                  onClick={() => {
                                    setActiveDeanGuide(guide)
                                    setActiveDeanVerifyScholar(null)
                                  }}
                                  className="text-left font-black text-[#7B1E3A] hover:text-red-800 hover:underline text-xs"
                                >
                                  {guide.name}
                                </button>
                              </td>
                              <td className="p-4 text-slate-900 font-bold">{guide.department}</td>
                              <td className="p-4 text-slate-600">{guide.scholarsCount}</td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  guide.vacancy > 0
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/50'
                                    : 'bg-rose-50 text-rose-800 border border-rose-200/50'
                                }`}>
                                  {guide.vacancy} Vacancy
                                </span>
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

          // ──── Sub-view 1: Default Schools Page ────
          const filteredSchools = schoolsData.filter(s =>
            s.name.toLowerCase().includes(schoolsSearchQuery.toLowerCase())
          )

          return (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Schools Directory</p>
                <h1 className="mt-2 text-2xl font-black text-dsu-maroon uppercase tracking-wide font-extrabold">
                  University Schools Directory
                </h1>
                <p className="mt-1 text-sm text-slate-500 font-semibold">
                  Select a school to monitor guides, scholar workload distribution, and milestone status.
                </p>
              </header>

              <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                {/* Search Bar */}
                <div className="flex justify-end">
                  <div className="relative w-full sm:w-64">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Search className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      value={schoolsSearchQuery}
                      onChange={(e) => setSchoolsSearchQuery(e.target.value)}
                      placeholder="Search school name..."
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-slate-800 outline-none focus:border-[#7B1E3A] focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                  <table className="min-w-full text-left text-xs text-slate-700">
                    <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="p-4">School Name</th>
                        <th className="p-4">Total Guides</th>
                        <th className="p-4">Total Scholars</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {filteredSchools.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="p-8 text-center text-slate-400 font-semibold">
                            No schools found matching search query.
                          </td>
                        </tr>
                      ) : (
                        filteredSchools.map((school, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50 transition">
                            <td className="p-4 flex items-center gap-3">
                              <Landmark className="h-4 w-4 text-dsu-maroon shrink-0" />
                              <button
                                onClick={() => {
                                  setActiveDeanSchool(school)
                                  setSchoolsGuidesSearchQuery('')
                                  setActiveDeanGuide(null)
                                  setActiveDeanVerifyScholar(null)
                                }}
                                className="text-left font-black text-[#7B1E3A] hover:text-red-800 hover:underline text-xs"
                              >
                                {school.name}
                              </button>
                            </td>
                            <td className="p-4 text-slate-900 font-bold">{school.guidesCount} Guides</td>
                            <td className="p-4 text-slate-900 font-bold">{school.scholarsCount} Scholars</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )
        })()}
      </div>
    )
  }

  // 5. Dean of School Dashboard Views
  if (role === 'dean_school') {
    // Calculate pending approvals dynamically across all school lists
    const pendingDacs = schoolDacs.filter(item => item.status.includes('Pending')).map(item => ({ ...item, phase: 'First DAC', type: 'dac' }))
    const pendingVivas = schoolVivas.filter(item => item.status.includes('Pending')).map(item => ({ ...item, phase: 'Comprehensive Viva', type: 'viva' }))
    const pendingColloquiums = schoolColloquiums.filter(item => item.status.includes('Pending')).map(item => ({ ...item, phase: 'Colloquium', type: 'colloquium' }))
    const pendingInch = inchSubmissions.filter(item => item.status.includes('Pending')).map(item => ({ ...item, phase: 'INCH Formatting', type: 'inch' }))
    const pendingSynopsis = schoolSynopsis.filter(item => item.status.includes('Pending')).map(item => ({ ...item, phase: 'Synopsis', type: 'synopsis' }))

    const pendingApprovals = [
      ...pendingDacs,
      ...pendingVivas,
      ...pendingColloquiums,
      ...pendingInch,
      ...pendingSynopsis
    ]

    const totalPending = pendingApprovals.length

    return (
      <div className="space-y-6">
        {view === 'home' && (
          <>
            {/* Welcome Header */}
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-1">
              <div>
                <div className="text-xl font-black text-dsu-maroon uppercase tracking-wide">Welcome, {profile.name}</div>
                <div className="text-sm text-slate-500 font-semibold mt-1">{profile.sub || 'School of Computing'} • {profile.department || 'Dean of School'}</div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">School Dean ID</div>
                <div className="text-base font-extrabold text-slate-800">{profile.scholarId || 'DSU-DEAN-SCHOOL'}</div>
              </div>
            </section>

            {/* Upcoming Academic Activities */}
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2 mb-1">Upcoming Academic Activities</h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Upcoming school-level academic events and milestones</p>
              </div>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-xs text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Event Date</th>
                      <th className="p-4">School Name</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Research Guide</th>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">Activity Type</th>
                      <th className="p-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {[
                      { date: '26-Jun-2026', scholar: 'Meera Das', guide: 'Dr. H. Subramanian', activity: 'Comprehensive Viva', status: 'Scheduled', dept: 'Computer Science & Engineering' },
                      { date: '02-Jul-2026', scholar: 'Ajay Dev', guide: 'Dr. J. Paul', activity: 'Colloquium Presentation', status: 'Confirmed', dept: 'Artificial Intelligence & Data Science' },
                      { date: '08-Jul-2026', scholar: 'Sneha Roy', guide: 'Dr. S. K. Gupta', activity: 'Pre-Synopsis Submission', status: 'Proposed', dept: 'Cyber Security' },
                      { date: '12-Jul-2026', scholar: 'Kamalesh N', guide: 'Dr. S. K. Gupta', activity: 'Synopsis Panel Review', status: 'Panel Approved', dept: 'Information Technology' },
                      { date: '18-Jul-2026', scholar: 'Rajesh Kumar', guide: 'Dr. D. Srinivasan', activity: 'Thesis Defense Oral Viva', status: 'Scheduled', dept: 'Computer Science & Engineering' }
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="p-4 text-slate-500 font-bold">{item.date}</td>
                        <td className="p-4 text-slate-700">{profile.sub || 'School of Computing'}</td>
                        <td className="p-4 text-slate-700">{item.dept}</td>
                        <td className="p-4 text-slate-700">{item.guide}</td>
                        <td className="p-4 font-bold text-slate-900">{item.scholar}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10 font-bold">
                            {item.activity}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status.includes('Scheduled') ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                            item.status.includes('Confirmed') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                            'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {view === 'dac' && (
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">First DAC Approvals (School)</h3>
            <table className="min-w-full text-left text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Scholar</th>
                  <th className="p-3">Research Guide</th>
                  <th className="p-3">Research Topic</th>
                  <th className="p-3">Clearance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {schoolDacs.map((dac, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-extrabold text-[#7B1E3A]">{dac.scholar}</td>
                    <td className="p-3">{dac.guide}</td>
                    <td className="p-3">{dac.topic}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleApproveAction(schoolDacs, setSchoolDacs, dac.id, 'School Approved')}
                        className={`px-3 py-1 rounded font-bold uppercase tracking-wider text-[9px] ${
                          dac.status === 'School Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-dsu-maroon hover:bg-red-800 text-white'
                        }`}
                      >
                        {dac.status === 'School Approved' ? 'Approved' : 'Approve'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'viva' && (
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Comprehensive Viva Approvals (School)</h3>
            <table className="min-w-full text-left text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Scholar</th>
                  <th className="p-3">Guide</th>
                  <th className="p-3">Proposed Date</th>
                  <th className="p-3">Clearance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {schoolVivas.map((v, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-extrabold text-[#7B1E3A]">{v.scholar}</td>
                    <td className="p-3">{v.guide}</td>
                    <td className="p-3">{v.date}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleApproveAction(schoolVivas, setSchoolVivas, v.id, 'Viva Scheduled')}
                        className={`px-3 py-1 rounded font-bold uppercase tracking-wider text-[9px] ${
                          v.status === 'Viva Scheduled' ? 'bg-emerald-100 text-emerald-800' : 'bg-dsu-maroon hover:bg-red-800 text-white'
                        }`}
                      >
                        {v.status === 'Viva Scheduled' ? 'Approved' : 'Approve'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'colloquium' && (
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Colloquium Approvals (School)</h3>
            <table className="min-w-full text-left text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Scholar</th>
                  <th className="p-3">Guide</th>
                  <th className="p-3">Scheduled Date</th>
                  <th className="p-3">Clearance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {schoolColloquiums.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-extrabold text-[#7B1E3A]">{c.scholar}</td>
                    <td className="p-3">{c.guide}</td>
                    <td className="p-3">{c.date}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleApproveAction(schoolColloquiums, setSchoolColloquiums, c.id, 'Colloquium Cleared')}
                        className={`px-3 py-1 rounded font-bold uppercase tracking-wider text-[9px] ${
                          c.status === 'Colloquium Cleared' ? 'bg-emerald-100 text-emerald-800' : 'bg-dsu-maroon hover:bg-red-800 text-white'
                        }`}
                      >
                        {c.status === 'Colloquium Cleared' ? 'Approved' : 'Approve'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'inch' && (
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Inch Committee Formatting Approvals</h3>
            <table className="min-w-full text-left text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Scholar</th>
                  <th className="p-3">Research Guide</th>
                  <th className="p-3">Document Section</th>
                  <th className="p-3">Format Check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {inchSubmissions.map((i, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-extrabold text-[#7B1E3A]">{i.scholar}</td>
                    <td className="p-3">{i.guide}</td>
                    <td className="p-3">{i.docType}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleApproveAction(inchSubmissions, setInchSubmissions, i.id, 'Formatting Approved')}
                        className={`px-3 py-1 rounded font-bold uppercase tracking-wider text-[9px] ${
                          i.status === 'Formatting Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-dsu-maroon hover:bg-red-800 text-white'
                        }`}
                      >
                        {i.status === 'Formatting Approved' ? 'Verified Pass' : 'Approve Formatting'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'synopsis' && (
          <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Synopsis Approvals (School)</h3>
            <table className="min-w-full text-left text-slate-700">
              <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Scholar</th>
                  <th className="p-3">Topic / Abstract Title</th>
                  <th className="p-3">Clearance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {schoolSynopsis.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-extrabold text-[#7B1E3A]">{s.scholar}</td>
                    <td className="p-3">{s.topic}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleApproveAction(schoolSynopsis, setSchoolSynopsis, s.id, 'Cleared by School')}
                        className={`px-3 py-1 rounded font-bold uppercase tracking-wider text-[9px] ${
                          s.status === 'Cleared by School' ? 'bg-emerald-100 text-emerald-800' : 'bg-dsu-maroon hover:bg-red-800 text-white'
                        }`}
                      >
                        {s.status === 'Cleared by School' ? 'Cleared' : 'Approve Synopsis'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'workload' && (() => {
          const mockGuideScholars = {
            'Dr. D. Srinivasan': [
              { name: 'Priya R', topic: 'Secure AI-Driven Smart Healthcare', status: 'Thesis Evaluation', year: '2022' },
              { name: 'Rajesh Kumar', topic: 'Blockchain for Decentralized Cloud IoT', status: 'Synopsis', year: '2023' },
              { name: 'Aishwarya S', topic: 'Explainable AI in Cybersecurity Systems', status: 'First DAC', year: '2024' },
              { name: 'Kamalesh N', topic: 'Aerodynamic Modeling', status: 'Synopsis', year: '2023' },
              { name: 'Sneha Roy', topic: 'Pre-Synopsis Thesis Draft', status: 'INCH Formatting', year: '2024' }
            ],
            'Dr. R. Venkataraman': [
              { name: 'Amit Kumar', topic: 'Deep Learning for Medical Diagnosis', status: 'Coursework', year: '2025' },
              { name: 'Divya Menon', topic: 'Privacy-Preserving Federated Learning', status: 'Comprehensive Viva', year: '2024' },
              { name: 'Rahul Sharma', topic: 'Network Intrusion Detection Systems', status: 'First DAC', year: '2024' },
              { name: 'Manoj Rajan', topic: 'Cloud Security and Compliance', status: 'Thesis Defense', year: '2022' }
            ],
            'Dr. H. Subramanian': [
              { name: 'Meera Das', topic: 'IoT-Based Smart Agriculture', status: 'Comprehensive Viva', year: '2023' },
              { name: 'Arun Kumar', topic: 'Embedded Systems Optimization', status: 'Coursework', year: '2025' },
              { name: 'Preethi S', topic: 'First DAC', status: 'First DAC', year: '2024' }
            ],
            'Dr. S. K. Gupta': [
              { name: 'Ajay Dev', topic: 'Renewable Energy Integration', status: 'Colloquium', year: '2023' },
              { name: 'Vikram Singh', topic: 'Smart Grid Power Quality', status: 'Coursework', year: '2025' },
              { name: 'Kavitha P', topic: 'Electric Vehicle Battery Management', status: 'First DAC', year: '2024' },
              { name: 'Sanjay Dutt', topic: 'Wind Energy Conversion Systems', status: 'Coursework', year: '2025' },
              { name: 'Rajesh Khanna', topic: 'Solar Photovoltaic Maximum Power Point Tracking', status: 'Comprehensive Viva', year: '2023' },
              { name: 'Kishore Kumar', topic: 'Hydroelectric Generator Control', status: 'Thesis Evaluation', year: '2022' },
              { name: 'Asha Bhosle', topic: 'Thermal Power Plant efficiency', status: 'Coursework', year: '2025' },
              { name: 'Lata Mangeshkar', topic: 'Biomass Energy Systems', status: 'Thesis Defense', year: '2022' }
            ],
            'Dr. Kumar': [
              { name: 'Arun Kumar', topic: 'Optimization of Wind Turbine Blades', status: 'First DAC', year: '2025' },
              { name: 'Naveen M', topic: 'Pre-Synopsis Thesis Draft', status: 'INCH Formatting', year: '2023' },
              { name: 'Vikram A', topic: 'Acoustic Signature Analysis', status: 'Comprehensive Viva', year: '2024' }
            ],
            'Dr. Priya': [
              { name: 'Akash V', topic: 'Aerodynamic Modeling', status: 'Synopsis', year: '2024' },
              { name: 'Srinath V', topic: 'Renewable Hybrid Systems', status: 'First DAC', year: '2025' }
            ],
            'Dr. Ravi': [
              { name: 'Deepa R', topic: 'Aerodynamic Modeling', status: 'Comprehensive Viva', year: '2023' },
              { name: 'Harini K', topic: 'Aerodynamic Modeling', status: 'Synopsis', year: '2024' },
              { name: 'Meera S', topic: 'Aerodynamic Modeling', status: 'Thesis Defense', year: '2022' }
            ]
          }

          const getApprovalType = (status) => {
            switch (status) {
              case 'First DAC':
              case 'Coursework':
                return 'First DAC Approval'
              case 'Comprehensive Viva':
                return 'Comprehensive Viva Approval'
              case 'Colloquium':
                return 'Colloquium Approval'
              case 'INCH Formatting':
                return 'Inch Committee Approval'
              case 'Synopsis':
                return 'Synopsis Approval'
              case 'Thesis Evaluation':
              case 'Thesis Defense':
                return 'Oral Viva Voce Approval'
              default:
                return 'First DAC Approval'
            }
          }

          const getDocumentsForApproval = (approvalType) => {
            switch (approvalType) {
              case 'First DAC Approval':
                return [
                  { name: 'DAC Proposal', status: 'Verified' },
                  { name: 'DAC Members List', status: 'Verified' },
                  { name: 'Minutes of Meeting', status: 'Pending' }
                ]
              case 'Comprehensive Viva Approval':
                return [
                  { name: 'CV Syllabus', status: 'Verified' },
                  { name: 'Recommendation', status: 'Verified' },
                  { name: 'Minutes of Meeting', status: 'Pending' }
                ]
              case 'Colloquium Approval':
                return [
                  { name: 'Publication Form', status: 'Verified' },
                  { name: 'Journal Form', status: 'Verified' },
                  { name: 'Fulfilment Form', status: 'Verified' },
                  { name: 'Minutes of Meeting', status: 'Pending' }
                ]
              case 'Inch Committee Approval':
                return [
                  { name: 'Thesis Draft', status: 'Verified' },
                  { name: 'Synopsis Draft', status: 'Verified' },
                  { name: 'Plagiarism Report', status: 'Verified' },
                  { name: 'AI Report', status: 'Pending' }
                ]
              case 'Synopsis Approval':
                return [
                  { name: 'Examiner Panel', status: 'Verified' },
                  { name: 'Synopsis Minutes of Meeting', status: 'Pending' }
                ]
              case 'Oral Viva Voce Approval':
                return [
                  { name: 'Evaluator Report', status: 'Verified' },
                  { name: 'Final Thesis', status: 'Verified' },
                  { name: 'Minutes of Meeting', status: 'Pending' }
                ]
              default:
                return []
            }
          }



          const handleUpdateItemStatus = (scholarName, itemId, newStatus, remarks = '') => {
            setDeanVerifyItems(prev => {
              const scholarItems = prev[scholarName] || []
              const updated = scholarItems.map(item => {
                if (item.id === itemId) {
                  return { ...item, status: newStatus, remarks }
                }
                return item
              })
              return {
                ...prev,
                [scholarName]: updated
              }
            })
          }

          const handleUpdateItemDownloaded = (scholarName, itemId) => {
            setDeanVerifyItems(prev => {
              const scholarItems = prev[scholarName] || []
              const updated = scholarItems.map(item => {
                if (item.id === itemId) {
                  return { ...item, downloaded: true }
                }
                return item
              })
              return {
                ...prev,
                [scholarName]: updated
              }
            })
          }

          const handleVerifyApprove = (scholarName, appType) => {
            if (appType === 'First DAC Approval') {
              const match = schoolDacs.find(d => d.scholar === scholarName)
              if (match) handleApproveAction(schoolDacs, setSchoolDacs, match.id, 'School Approved')
            } else if (appType === 'Comprehensive Viva Approval') {
              const match = schoolVivas.find(v => v.scholar === scholarName)
              if (match) handleApproveAction(schoolVivas, setSchoolVivas, match.id, 'Viva Scheduled')
            } else if (appType === 'Colloquium Approval') {
              const match = schoolColloquiums.find(c => c.scholar === scholarName)
              if (match) handleApproveAction(schoolColloquiums, setSchoolColloquiums, match.id, 'Colloquium Cleared')
            } else if (appType === 'Inch Committee Approval') {
              const match = inchSubmissions.find(i => i.scholar === scholarName)
              if (match) handleApproveAction(inchSubmissions, setInchSubmissions, match.id, 'Formatting Approved')
            } else if (appType === 'Synopsis Approval') {
              const match = schoolSynopsis.find(s => s.scholar === scholarName)
              if (match) handleApproveAction(schoolSynopsis, setSchoolSynopsis, match.id, 'Cleared by School')
            } else if (appType === 'Oral Viva Voce Approval') {
              const match = schoolVivas.find(v => v.scholar === scholarName)
              if (match) handleApproveAction(schoolVivas, setSchoolVivas, match.id, 'School Approved')
            }

            // Update local history dynamically
            setScholarApprovalHistories(prev => {
              const currentList = prev[scholarName] || []
              const phaseName = appType.replace(' Approval', '')
              const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')
              const docNames = (deanVerifyItems[scholarName] || []).filter(item => item.type === 'document').map(item => item.name.split(' (')[0])
              
              const existsIdx = currentList.findIndex(p => p.phase === phaseName)
              if (existsIdx > -1) {
                const updated = [...currentList]
                updated[existsIdx] = { 
                  ...updated[existsIdx], 
                  status: 'Approved', 
                  date: today,
                  approvedBy: 'Dean of School',
                  remarks: deanRemarksText,
                  signedDoc: deanSignedFile ? deanSignedFile.name : null
                }
                return { ...prev, [scholarName]: updated }
              } else {
                return {
                  ...prev,
                  [scholarName]: [
                    ...currentList,
                    { 
                      phase: phaseName, 
                      status: 'Approved', 
                      date: today, 
                      documents: docNames.length > 0 ? docNames : ['submitted_documents.zip'],
                      approvedBy: 'Dean of School',
                      remarks: deanRemarksText,
                      signedDoc: deanSignedFile ? deanSignedFile.name : null
                    }
                  ]
                }
              }
            })

            alert(`Request approved! Scholar ${scholarName}'s ${appType} has been forwarded to the Dean of Research workflow.`)
            setDeanRemarksText('')
            setDeanSignedFile(null)
            setActiveDeanVerifyScholar(null)
          }

          const handleVerifyReject = (scholarName, appType, remarks) => {
            if (appType === 'First DAC Approval') {
              const match = schoolDacs.find(d => d.scholar === scholarName)
              if (match) handleApproveAction(schoolDacs, setSchoolDacs, match.id, 'Returned to Guide: ' + remarks)
            } else if (appType === 'Comprehensive Viva Approval') {
              const match = schoolVivas.find(v => v.scholar === scholarName)
              if (match) handleApproveAction(schoolVivas, setSchoolVivas, match.id, 'Returned to Guide: ' + remarks)
            } else if (appType === 'Colloquium Approval') {
              const match = schoolColloquiums.find(c => c.scholar === scholarName)
              if (match) handleApproveAction(schoolColloquiums, setSchoolColloquiums, match.id, 'Returned to Guide: ' + remarks)
            } else if (appType === 'Inch Committee Approval') {
              const match = inchSubmissions.find(i => i.scholar === scholarName)
              if (match) handleApproveAction(inchSubmissions, setInchSubmissions, match.id, 'Returned to Guide: ' + remarks)
            } else if (appType === 'Synopsis Approval') {
              const match = schoolSynopsis.find(s => s.scholar === scholarName)
              if (match) handleApproveAction(schoolSynopsis, setSchoolSynopsis, match.id, 'Returned to Guide: ' + remarks)
            } else if (appType === 'Oral Viva Voce Approval') {
              const match = schoolVivas.find(v => v.scholar === scholarName)
              if (match) handleApproveAction(schoolVivas, setSchoolVivas, match.id, 'Returned to Guide: ' + remarks)
            }

            // Update local history dynamically as Rejected
            setScholarApprovalHistories(prev => {
              const currentList = prev[scholarName] || []
              const phaseName = appType.replace(' Approval', '')
              const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')
              const docNames = (deanVerifyItems[scholarName] || []).filter(item => item.type === 'document').map(item => item.name.split(' (')[0])
              
              const existsIdx = currentList.findIndex(p => p.phase === phaseName)
              if (existsIdx > -1) {
                const updated = [...currentList]
                updated[existsIdx] = { 
                  ...updated[existsIdx], 
                  status: 'Returned', 
                  date: today, 
                  approvedBy: 'Dean of School',
                  remarks: remarks 
                }
                return { ...prev, [scholarName]: updated }
              } else {
                return {
                  ...prev,
                  [scholarName]: [
                    ...currentList,
                    { 
                      phase: phaseName, 
                      status: 'Returned', 
                      date: today, 
                      documents: docNames.length > 0 ? docNames : ['submitted_documents.zip'], 
                      approvedBy: 'Dean of School',
                      remarks: remarks 
                    }
                  ]
                }
              }
            })

            alert(`Request returned. Returned to Guide with remarks: "${remarks}"`)
            setDeanRemarksText('')
            setDeanSignedFile(null)
            setActiveDeanVerifyScholar(null)
          }

          const filteredGuides = guideWorkload.filter(guide => 
            guide.name.toLowerCase().includes(guideSearchQuery.toLowerCase()) ||
            guide.department.toLowerCase().includes(guideSearchQuery.toLowerCase()) ||
            (guide.specialization && guide.specialization.toLowerCase().includes(guideSearchQuery.toLowerCase())) ||
            (guide.email && guide.email.toLowerCase().includes(guideSearchQuery.toLowerCase()))
          )

          if (activeDeanVerifyScholar) {
            // Find if there is a pending request for this scholar
            const getPendingRequestForScholar = (scholarName, currentMilestone) => {
              if (currentMilestone === 'First DAC' || currentMilestone === 'Coursework') {
                const dac = schoolDacs.find(d => d.scholar === scholarName && d.status.includes('Pending'))
                if (dac) return { type: 'First DAC Approval', id: dac.id, source: 'dac', original: dac }
              }
              if (currentMilestone === 'Comprehensive Viva') {
                const viva = schoolVivas.find(v => v.scholar === scholarName && v.status.includes('Pending'))
                if (viva) return { type: 'Comprehensive Viva Approval', id: viva.id, source: 'viva', original: viva }
              }
              if (currentMilestone === 'Colloquium') {
                const colloq = schoolColloquiums.find(c => c.scholar === scholarName && c.status.includes('Pending'))
                if (colloq) return { type: 'Colloquium Approval', id: colloq.id, source: 'colloquium', original: colloq }
              }
              if (currentMilestone === 'INCH Formatting' || currentMilestone === 'Pre-Synopsis Thesis Draft') {
                const inch = inchSubmissions.find(i => i.scholar === scholarName && i.status.includes('Pending'))
                if (inch) return { type: 'Inch Committee Approval', id: inch.id, source: 'inch', original: inch }
              }
              if (currentMilestone === 'Synopsis') {
                const syn = schoolSynopsis.find(s => s.scholar === scholarName && s.status.includes('Pending'))
                if (syn) return { type: 'Synopsis Approval', id: syn.id, source: 'synopsis', original: syn }
              }
              if (currentMilestone === 'Thesis Defense' || currentMilestone === 'Thesis Evaluation') {
                const viva = schoolVivas.find(v => v.scholar === scholarName && v.status.includes('Pending'))
                if (viva) return { type: 'Oral Viva Voce Approval', id: viva.id, source: 'viva', original: viva }
              }

              // Fallback
              const dac = schoolDacs.find(d => d.scholar === scholarName && d.status.includes('Pending'))
              if (dac) return { type: 'First DAC Approval', id: dac.id, source: 'dac', original: dac }
              
              const viva = schoolVivas.find(v => v.scholar === scholarName && v.status.includes('Pending'))
              if (viva) {
                if (scholarName === 'Harini K') {
                  return { type: 'Oral Viva Voce Approval', id: viva.id, source: 'viva', original: viva }
                }
                return { type: 'Comprehensive Viva Approval', id: viva.id, source: 'viva', original: viva }
              }
              
              const colloq = schoolColloquiums.find(c => c.scholar === scholarName && c.status.includes('Pending'))
              if (colloq) return { type: 'Colloquium Approval', id: colloq.id, source: 'colloquium', original: colloq }
              
              const inch = inchSubmissions.find(i => i.scholar === scholarName && i.status.includes('Pending'))
              if (inch) return { type: 'Inch Committee Approval', id: inch.id, source: 'inch', original: inch }
              
              const syn = schoolSynopsis.find(s => s.scholar === scholarName && s.status.includes('Pending'))
              if (syn) return { type: 'Synopsis Approval', id: syn.id, source: 'synopsis', original: syn }
              
              return null
            }

            const getStatusFromPending = (pending) => {
              if (pending.source === 'dac') return 'First DAC'
              if (pending.source === 'viva') {
                if (pending.type === 'Oral Viva Voce Approval') return 'Thesis Defense'
                return 'Comprehensive Viva'
              }
              if (pending.source === 'colloquium') return 'Colloquium'
              if (pending.source === 'inch') return 'INCH Formatting'
              if (pending.source === 'synopsis') return 'Synopsis'
              return 'First DAC'
            }

            const pendingRequest = getPendingRequestForScholar(activeDeanVerifyScholar.name, activeDeanVerifyScholar.status)
            const pendingStatus = pendingRequest ? getStatusFromPending(pendingRequest) : null
            
            // Get verification items for the pending status
            const currentItems = pendingStatus ? (deanVerifyItems[activeDeanVerifyScholar.name] || getInitialVerificationItems(
              activeDeanVerifyScholar.name,
              pendingStatus,
              activeDeanGuide?.name || ''
            )) : []

            const history = scholarApprovalHistories[activeDeanVerifyScholar.name] || []

            return (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150 text-xs">
                {/* Back button & Header */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveDeanVerifyScholar(null)}
                    className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-800 uppercase tracking-wide">Scholar Verification & History Panel</h3>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Dean of School Verification Panel</p>
                  </div>
                </div>

                {/* Scholar Profile Summary Card */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full font-semibold">
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                      <span className="text-slate-900 font-black text-sm uppercase mt-0.5 block">{activeDeanVerifyScholar.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider block">Supervising Guide</span>
                      <span className="text-slate-800 font-extrabold mt-0.5 block">{activeDeanGuide?.name || 'Dr. D. Srinivasan'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider block">Current Milestone Status</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10 mt-0.5 inline-block uppercase">
                        {activeDeanVerifyScholar.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scholar Milestone Approval History */}
                <div className="space-y-3">
                  <h4 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">Scholar Milestone Approval History</h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
                    <table className="min-w-full text-left text-slate-700">
                      <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                          <th className="p-4">Phase Name</th>
                          <th className="p-4">Approval Status</th>
                          <th className="p-4">Approval Date</th>
                          <th className="p-4 text-right">Archived Documents</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold">
                        {history.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="p-6 text-center text-slate-400 font-medium">
                              No completed or previous phases found in history.
                            </td>
                          </tr>
                        ) : (
                          history.map((phase, pIdx) => (
                            <tr key={pIdx} className="hover:bg-slate-50/40 transition">
                              <td className="p-4 font-bold text-slate-900">{phase.phase}</td>
                              <td className="p-4 text-xs font-semibold">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                                  phase.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}>
                                  {phase.status}
                                </span>
                                {phase.approvedBy && (
                                  <div className="text-[9px] text-slate-500 mt-1 uppercase font-bold">Action By: {phase.approvedBy}</div>
                                )}
                                {phase.remarks && (
                                  <div className="text-[10px] text-slate-650 mt-1 font-semibold italic">Remarks: {phase.remarks}</div>
                                )}
                                {phase.signedDoc && (
                                  <div className="text-[10px] text-[#7B1E3A] mt-1 font-bold">
                                    Verified Document: <button onClick={() => alert(`Downloading signed document: ${phase.signedDoc}`)} className="underline hover:text-red-800 transition">{phase.signedDoc}</button>
                                  </div>
                                )}
                              </td>
                              <td className="p-4 text-slate-500 font-medium">{phase.date}</td>
                              <td className="p-4 text-right">
                                <div className="flex justify-end gap-1.5 flex-wrap">
                                  {phase.documents.map((doc, dIdx) => (
                                    <button
                                      key={dIdx}
                                      onClick={() => alert(`Downloading archived document "${doc}" successfully.`)}
                                      className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-[#7B1E3A] hover:text-white border border-slate-200 rounded-lg text-[9px] font-black text-slate-650 transition uppercase tracking-wider shadow-sm"
                                    >
                                      <Download className="h-2.5 w-2.5" />
                                      {doc}
                                    </button>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Current Pending Approval Request & Documents for Verification */}
                {pendingRequest ? (
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="font-extrabold text-xs text-[#7B1E3A] uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                        Current Pending Approval Request
                      </h4>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-750 border border-amber-250 uppercase shadow-sm">
                        {pendingRequest.type}
                      </span>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="px-4 py-3 bg-slate-50 border-b border-slate-150">
                        <div className="text-xs font-black text-slate-800 uppercase">Verification Items & Submitted Documents</div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Please review the details and download each document below for verification</p>
                      </div>

                      <div className="divide-y divide-slate-100 font-semibold text-slate-700">
                        {currentItems.map((item, dIdx) => (
                          <div key={dIdx} className="p-4 hover:bg-slate-50/20 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1.5 w-full sm:w-2/3">
                              <div className="flex items-center gap-2 font-bold text-slate-800">
                                {item.type === 'document' ? (
                                  <>
                                    <FileText className="h-4 w-4 text-[#001c4f] shrink-0" />
                                    <span>{item.name}</span>
                                  </>
                                ) : (
                                  <>
                                    <ClipboardList className="h-4 w-4 text-[#7B1E3A] shrink-0" />
                                    <span>{item.name}</span>
                                  </>
                                )}
                              </div>
                              {item.value && (
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-750 font-medium whitespace-pre-line leading-relaxed">
                                  {item.value}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              {item.type === 'document' && (
                                <button
                                  onClick={() => {
                                    handleUpdateItemDownloaded(activeDeanVerifyScholar.name, item.id)
                                    alert(`File "${item.name}" downloaded successfully for verification.`)
                                  }}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[9px] font-black transition uppercase tracking-wider ${
                                    item.downloaded 
                                      ? 'bg-slate-150 text-slate-500 border-slate-200 cursor-default shadow-sm' 
                                      : 'bg-dsu-maroon/10 text-dsu-maroon border-dsu-maroon/30 hover:bg-dsu-maroon hover:text-white shadow-sm'
                                  }`}
                                >
                                  <Download className="h-3 w-3" />
                                  {item.downloaded ? 'Downloaded' : 'Download Document'}
                                </button>
                              )}

                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                                item.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                                item.status === 'Pending' ? 'bg-amber-50 text-amber-755 border-amber-250' :
                                'bg-rose-50 text-rose-700 border-rose-250'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dean Remarks Section */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 mt-4">
                      <h4 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">Dean Remarks</h4>
                      <div className="relative">
                        <textarea
                          rows={4}
                          maxLength={500}
                          value={deanRemarksText}
                          onChange={(e) => setDeanRemarksText(e.target.value)}
                          placeholder="Enter verification comments, observations, recommendations, approval notes, or reasons for returning the request..."
                          className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                        />
                        <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                          {deanRemarksText.length}/500
                        </div>
                      </div>
                    </div>

                    {/* Verified / Signed Document Section */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 mt-4">
                      <h4 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">Verified / Signed Document</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold uppercase tracking-wider text-[9px] rounded-lg cursor-pointer border border-slate-200/80 transition shadow-sm text-center">
                          Upload File
                          <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0]
                              if (file) {
                                if (file.size > 10 * 1024 * 1024) {
                                  alert('Maximum file size is 10 MB.')
                                  return
                                }
                                setDeanSignedFile(file)
                              }
                            }}
                          />
                        </label>
                        <div className="space-y-0.5">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Upload the signed or verified approval document (PDF).</p>
                          {deanSignedFile && (
                            <p className="text-[10px] text-emerald-600 font-bold">Selected File: {deanSignedFile.name}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Approve / Deny Actions */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                          <Clock className="h-5 w-5 animate-pulse" />
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-amber-800 uppercase tracking-wide">Verification Desk Action Required</div>
                          <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                            Review the submitted materials above and choose to Approve or Deny (Return to Guide) the request.
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => {
                            if (!deanRemarksText.trim()) {
                              alert("Remarks are required when returning a request to the Guide.")
                              return
                            }
                            handleVerifyReject(activeDeanVerifyScholar.name, pendingRequest.type, deanRemarksText.trim())
                          }}
                          className="px-4 py-2.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5 shrink-0"
                        >
                          <X className="h-3.5 w-3.5" />
                          Deny Request
                        </button>
                        <button
                          onClick={() => handleVerifyApprove(activeDeanVerifyScholar.name, pendingRequest.type)}
                          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5 shrink-0"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Approve Milestone
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 text-center text-slate-500 font-extrabold text-xs pt-4 border-t border-slate-100 uppercase tracking-wide">
                    No current pending approval request for this scholar.
                  </div>
                )}
              </div>
            )
          }

          // ── Sub-view 2: Guide Details Page ──
          if (activeDeanGuide) {
            return (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
                {/* Back Button & Header */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveDeanGuide(null)}
                    className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-800 uppercase tracking-wide">Guide Details</h3>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Dean of School View</p>
                  </div>
                </div>

                {/* Guide Info Card */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-dsu-maroon/10 text-dsu-maroon flex items-center justify-center font-black text-lg">
                      {activeDeanGuide.name.replace('Dr. ', '').charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-base text-slate-800">{activeDeanGuide.name}</h4>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">{activeDeanGuide.designation} • {activeDeanGuide.department}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm text-center">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assigned Scholars</div>
                      <div className="text-xl font-extrabold text-[#7B1E3A] mt-0.5">{activeDeanGuide.currentScholars} / {activeDeanGuide.maxLimit}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm text-center">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Vacancy</div>
                      <div className="text-xl font-extrabold text-emerald-600 mt-0.5">{activeDeanGuide.maxLimit - activeDeanGuide.currentScholars} Slots</div>
                    </div>
                  </div>
                </div>

                {/* Assigned Scholars List Table */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">Assigned Scholars Registry</h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                    <table className="min-w-full text-left text-xs text-slate-700">
                      <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                          <th className="p-4">Scholar Name</th>
                          <th className="p-4">Research Topic</th>
                          <th className="p-4">Current Phase / Status</th>
                          <th className="p-4 text-right">Admission Year</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold">
                        {(mockGuideScholars[activeDeanGuide.name] || []).length === 0 ? (
                          <tr>
                            <td colSpan="4" className="p-8 text-center text-slate-400 font-semibold">
                              No scholars assigned to this guide.
                            </td>
                          </tr>
                        ) : (
                          (mockGuideScholars[activeDeanGuide.name] || []).map((scholar, sIdx) => (
                            <tr key={sIdx} className="hover:bg-slate-50/40 transition">
                              <td className="p-4">
                                <button
                                  onClick={() => {
                                    if (!deanVerifyItems[scholar.name]) {
                                      const initialItems = getInitialVerificationItems(scholar.name, scholar.status, activeDeanGuide.name)
                                      setDeanVerifyItems(prev => ({
                                        ...prev,
                                        [scholar.name]: initialItems
                                      }))
                                    }
                                    setActiveDeanVerifyScholar(scholar)
                                  }}
                                  className="font-bold text-slate-900 hover:text-[#7B1E3A] hover:underline focus:outline-none text-left"
                                >
                                  {scholar.name}
                                </button>
                              </td>
                              <td className="p-4 text-slate-500 font-medium">{scholar.topic}</td>
                              <td className="p-4">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10">
                                  {scholar.status}
                                </span>
                              </td>
                              <td className="p-4 text-right text-slate-500">{scholar.year}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
          }

          // ── Sub-view 1: Guides List Directory ──
          return (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
              {/* Header & Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Guides Directory</h3>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Capacity & Workload Overview</p>
                </div>

                <div className="relative w-full sm:w-64">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={guideSearchQuery}
                    onChange={(e) => setGuideSearchQuery(e.target.value)}
                    placeholder="Search guide name or dept..."
                    className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-slate-800 outline-none focus:border-[#7B1E3A] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Guides List Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-xs text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Guide Name</th>
                      <th className="p-4">Specialization</th>
                      <th className="p-4">Official Email</th>
                      <th className="p-4">Current Ph.D. Scholars</th>
                      <th className="p-4 text-right">Available Vacancies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {filteredGuides.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-400 font-semibold">
                          No matching guides found.
                        </td>
                      </tr>
                    ) : (
                      filteredGuides.map((guide, idx) => {
                        const vacancy = guide.maxLimit - guide.currentScholars
                        return (
                          <tr key={idx} className="hover:bg-slate-50/50 transition">
                            <td className="p-4">
                              <button
                                onClick={() => setActiveDeanGuide(guide)}
                                className="font-extrabold text-[#7B1E3A] hover:underline focus:outline-none text-left"
                              >
                                {guide.name}
                              </button>
                            </td>
                            <td className="p-4 text-slate-500 font-bold whitespace-normal">
                              {guide.specialization || 'Computer Science & Engineering'}
                            </td>
                            <td className="p-4 text-slate-600 font-normal break-all whitespace-normal">
                              {guide.email || 'faculty@dsuniversity.ac.in'}
                            </td>
                            <td className="p-4 font-bold text-slate-800">{guide.currentScholars}</td>
                            <td className="p-4 text-right">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                vacancy > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                              }`}>
                                {vacancy > 0 ? (vacancy === 1 ? '1 Vacancy' : `${vacancy} Vacancies`) : 'Full'}
                              </span>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )
        })()}

        {/* Approval Modal */}
        {activeDeanApproval && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-5 py-4 bg-gradient-to-r from-[#7B1E3A] to-[#5a1229] text-white flex items-center justify-between">
                <h3 className="font-extrabold text-sm uppercase tracking-wide">Approval Details</h3>
                <button onClick={() => setActiveDeanApproval(null)} className="text-white/80 hover:text-white transition">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5 space-y-4 text-xs font-semibold text-slate-700">
                <div className="space-y-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Scholar Name</span>
                    <span className="text-slate-900 font-extrabold text-sm block">{activeDeanApproval.scholar}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Current Phase</span>
                    <span className="text-slate-900 font-bold block">{activeDeanApproval.phase}</span>
                  </div>

                  {activeDeanApproval.guide && (
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Research Guide</span>
                      <span className="text-slate-900 block">{activeDeanApproval.guide}</span>
                    </div>
                  )}

                  {activeDeanApproval.topic && (
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Research Topic</span>
                      <span className="text-slate-900 block font-bold text-[#7B1E3A]">{activeDeanApproval.topic}</span>
                    </div>
                  )}

                  {activeDeanApproval.date && (
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Proposed Date</span>
                      <span className="text-slate-900 block">{activeDeanApproval.date}</span>
                    </div>
                  )}

                  {activeDeanApproval.docType && (
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Document Type</span>
                      <span className="text-slate-900 block">{activeDeanApproval.docType}</span>
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Status</span>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100 font-bold">
                      {activeDeanApproval.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    onClick={() => setActiveDeanApproval(null)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold uppercase tracking-wider transition text-[10px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const { id, type } = activeDeanApproval
                      if (type === 'dac') {
                        handleApproveAction(schoolDacs, setSchoolDacs, id, 'School Approved')
                      } else if (type === 'viva') {
                        handleApproveAction(schoolVivas, setSchoolVivas, id, 'Viva Scheduled')
                      } else if (type === 'colloquium') {
                        handleApproveAction(schoolColloquiums, setSchoolColloquiums, id, 'Colloquium Cleared')
                      } else if (type === 'inch') {
                        handleApproveAction(inchSubmissions, setInchSubmissions, id, 'Formatting Approved')
                      } else if (type === 'synopsis') {
                        handleApproveAction(schoolSynopsis, setSchoolSynopsis, id, 'Cleared by School')
                      }
                      setActiveDeanApproval(null)
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

  // 6. Research Office (R&I) Dashboard Views
  if (role === 'ri_office') {
    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        {view === 'home' && (
          <section className="bg-gradient-to-r from-dsu-maroon to-red-900 text-white p-6 rounded-2xl border border-red-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-black uppercase tracking-wide text-amber-400">WELCOME, RESEARCH & INNOVATION OFFICE</h2>
              <p className="text-xs font-bold uppercase tracking-wider text-red-100 mt-1">Research Administration Portal</p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-red-200">Office</div>
              <div className="text-xs font-black text-amber-300 uppercase tracking-widest mt-0.5">Research & Innovation (R&I)</div>
            </div>
          </section>
        )}

        {view === 'home' && (
          <>
            {/* Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard title="Pending Application Verifications" value="12" />
              <StatCard title="Pending Document Verifications" value="8" />
              <StatCard title="Pending Publication Verifications" value="14" />
              <StatCard title="Pending Plagiarism Approvals" value="4" />
              <StatCard title="Pending Format Checks" value="6" />
              <StatCard title="Pending Thesis Dispatches" value="3" />
            </section>

            {/* Recent Verification Requests */}
            <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">RECENT VERIFICATION REQUESTS</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Overview of newly submitted research requests awaiting verification and administrative review.</p>
              </div>

              {/* Search & Filtering Panel */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Request Filters & Search</span>
                  <button 
                    onClick={() => {
                      setRiSearch('')
                      setRiSchoolFilter('')
                      setRiTypeFilter('')
                      setRiStatusFilter('')
                    }}
                    className="text-[9px] font-bold text-dsu-maroon hover:text-red-800 uppercase flex items-center gap-1 transition"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> Clear Filters
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-semibold text-slate-700">
                  <div className="relative">
                    <label className="block mb-1 text-[10px] uppercase font-bold text-slate-500">Search Scholar/Guide/Dept</label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Scholar, Guide, Department..."
                        value={riSearch}
                        onChange={(e) => setRiSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon text-xs font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] uppercase font-bold text-slate-500">Filter by School</label>
                    <select 
                      value={riSchoolFilter}
                      onChange={(e) => setRiSchoolFilter(e.target.value)}
                      className="w-full border border-slate-200 p-1.5 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon text-xs font-semibold"
                    >
                      <option value="">All Schools</option>
                      <option value="School of Computing">School of Computing</option>
                      <option value="School of Engineering">School of Engineering</option>
                      <option value="School of Management">School of Management</option>
                      <option value="School of Sciences">School of Sciences</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] uppercase font-bold text-slate-500">Filter by Verification Type</label>
                    <select 
                      value={riTypeFilter}
                      onChange={(e) => setRiTypeFilter(e.target.value)}
                      className="w-full border border-slate-200 p-1.5 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon text-xs font-semibold"
                    >
                      <option value="">All Verification Types</option>
                      <option value="Application Verification">Application Verification</option>
                      <option value="Document Verification">Document Verification</option>
                      <option value="Publication Verification">Publication Verification</option>
                      <option value="Plagiarism Approval">Plagiarism Approval</option>
                      <option value="Format Check">Format Check</option>
                      <option value="Thesis Dispatch Verification">Thesis Dispatch Verification</option>
                      <option value="Research Compliance Review">Research Compliance Review</option>
                      <option value="Final Submission Verification">Final Submission Verification</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] uppercase font-bold text-slate-500">Filter by Status</label>
                    <select 
                      value={riStatusFilter}
                      onChange={(e) => setRiStatusFilter(e.target.value)}
                      className="w-full border border-slate-200 p-1.5 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon text-xs font-semibold"
                    >
                      <option value="">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Verified">Verified</option>
                      <option value="Approved">Approved</option>
                      <option value="Returned">Returned</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">School</th>
                      <th className="p-3.5">Department</th>
                      <th className="p-3.5">Research Guide</th>
                      <th className="p-3.5">Scholar Name</th>
                      <th className="p-3.5">Verification Type</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {(() => {
                      const filtered = riVerificationRequests
                        .filter(req => {
                          const query = riSearch.toLowerCase()
                          const matchesSearch = 
                            req.scholar.toLowerCase().includes(query) ||
                            req.guide.toLowerCase().includes(query) ||
                            req.dept.toLowerCase().includes(query)

                          const matchesSchool = !riSchoolFilter || req.school === riSchoolFilter
                          const matchesType = !riTypeFilter || req.type === riTypeFilter
                          const matchesStatus = !riStatusFilter || req.status === riStatusFilter

                          return matchesSearch && matchesSchool && matchesType && matchesStatus
                        })
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-slate-400 italic text-xs font-semibold bg-slate-50/50">
                              No matching recent verification requests found.
                            </td>
                          </tr>
                        )
                      }

                      return filtered.map((req, idx) => {
                        const statusClass = getRiStatusBadgeClass(req.status)
                        return (
                          <tr key={idx} className="hover:bg-slate-50/40 transition">
                            <td className="p-3.5 text-slate-500 font-bold whitespace-nowrap">{formatRiDisplayDate(req.date)}</td>
                            <td className="p-3.5 text-slate-900 font-extrabold">{req.school}</td>
                            <td className="p-3.5 text-slate-500 font-semibold">{req.dept}</td>
                            <td className="p-3.5 text-slate-500 font-semibold">{req.guide}</td>
                            <td className="p-3.5 text-slate-950 font-extrabold">{req.scholar}</td>
                            <td className="p-3.5">
                              <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-bold bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10 uppercase tracking-wide whitespace-nowrap">
                                {req.type}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-black border uppercase tracking-wide whitespace-nowrap ${statusClass}`}>
                                {req.status}
                              </span>
                            </td>
                          </tr>
                        )
                      })
                    })()}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {view === 'application' && (
          activeRiApplication ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveRiApplication(null)
                    setRiRemarksText('')
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Applications List
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Application Verification Desk</span>
              </div>

              {/* Scholar Information Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Application Review: <span className="text-dsu-maroon">{activeRiApplication.scholarName}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiApplication.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registration Number</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiApplication.regNo}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiApplication.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiApplication.department}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Application Type</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiApplication.appType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Submission Date</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiApplication.submissionDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Current Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block mt-0.5 ${
                      activeRiApplication.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      activeRiApplication.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse' :
                      'bg-rose-50 text-rose-700 border-rose-250'
                    }`}>
                      {activeRiApplication.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Uploaded Documents Section */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Uploaded Application Documents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(activeRiApplication.docs || []).map((doc, dIdx) => (
                    <div key={dIdx} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-xs hover:border-slate-300 transition">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#001c4f] shrink-0" />
                        <span className="font-bold text-slate-700">{doc}</span>
                      </div>
                      <button
                        onClick={() => alert(`Downloading document: ${doc}`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7B1E3A]/5 hover:bg-[#7B1E3A]/10 text-dsu-maroon rounded-lg transition font-bold text-[10px] uppercase tracking-wider"
                        type="button"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Verification Notes</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={riRemarksText}
                    onChange={(e) => setRiRemarksText(e.target.value)}
                    placeholder="Enter application comments, observations, recommendations, or reasons for returning the application..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({riRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                    <Clock className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-amber-800 uppercase tracking-wide">Verification Desk Action Required</div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      Review all submitted certificates and documents above before approving or returning this application.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (!riRemarksText.trim()) {
                        alert("Remarks are required when returning an application.")
                        return
                      }
                      setRetApplications(prev => prev.map(app => 
                        app.id === activeRiApplication.id 
                          ? { ...app, status: 'Returned', remarks: riRemarksText.trim() } 
                          : app
                      ))
                      alert(`Application for ${activeRiApplication.scholarName} has been returned.`)
                      setActiveRiApplication(null)
                      setRiRemarksText('')
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5 shrink-0"
                    type="button"
                  >
                    <X className="h-3.5 w-3.5" />
                    Return Application
                  </button>
                  <button
                    onClick={() => {
                      setRetApplications(prev => prev.map(app => 
                        app.id === activeRiApplication.id 
                          ? { ...app, status: 'Approved', remarks: riRemarksText.trim() } 
                          : app
                      ))
                      alert(`Application for ${activeRiApplication.scholarName} has been approved successfully.`)
                      setActiveRiApplication(null)
                      setRiRemarksText('')
                    }}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5 shrink-0"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve Application
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Scholar Applications Verification</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">List of admission and coursework applications submitted to R&I Office</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">Registration Number</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Application Type</th>
                      <th className="p-4">Submission Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {retApplications.map((app, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{app.scholarName}</td>
                        <td className="p-4 font-bold text-slate-600">{app.regNo}</td>
                        <td className="p-4">{app.school}</td>
                        <td className="p-4">{app.department}</td>
                        <td className="p-4">{app.appType}</td>
                        <td className="p-4 text-slate-500">{app.submissionDate}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            app.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse' :
                            'bg-rose-50 text-rose-700 border-rose-250'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveRiApplication(app)
                              setRiRemarksText(app.remarks || '')
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {view === 'document' && (
          activeRiDocument ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveRiDocument(null)
                    setRiDocRemarksText('')
                    setRiDocUploadedFile(null)
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Documents List
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Verification Desk</span>
              </div>

              {/* Document Details Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Document Review: <span className="text-dsu-maroon">{activeRiDocument.scholarName}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiDocument.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiDocument.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiDocument.department}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Document Type</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiDocument.docType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Submission Date</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiDocument.submissionDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Current Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block mt-0.5 ${
                      activeRiDocument.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      activeRiDocument.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse' :
                      'bg-rose-50 text-rose-700 border-rose-250'
                    }`}>
                      {activeRiDocument.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submitted File View Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Submitted File For Audit</h3>
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-slate-350 transition">
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-5 w-5 text-dsu-maroon" />
                    <div>
                      <span className="font-extrabold text-slate-800 text-xs block">{activeRiDocument.docName}</span>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Submitted PDF Document</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading submitted copy: ${activeRiDocument.docName}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-extrabold text-[10px] uppercase tracking-wider shadow-sm"
                    type="button"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Document
                  </button>
                </div>
              </div>

              {/* Upload Verified Copy Widget */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Verified / Signed Copy Upload</h3>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Upload Verified Copy
                  </label>
                  
                  {riDocUploadedFile ? (
                    <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in duration-100">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-850 text-xs">{riDocUploadedFile.name}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold">Verified document attached successfully.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setRiDocUploadedFile(null)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 transition uppercase tracking-wider"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 hover:border-dsu-maroon rounded-2xl p-6 text-center transition bg-slate-50/50">
                      <input
                        type="file"
                        id="ri-doc-upload-input"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            if (file.type !== 'application/pdf') {
                              alert('Only PDF files are supported.')
                              return
                            }
                            if (file.size > 10 * 1024 * 1024) {
                              alert('File size must be less than 10MB.')
                              return
                            }
                            setRiDocUploadedFile(file)
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="ri-doc-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-slate-400 animate-bounce" />
                        <span className="font-bold text-[#7B1E3A] hover:underline text-xs">
                          Click to upload verified PDF copy
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          PDF only, Max size 10MB
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Observation Notes</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={riDocRemarksText}
                    onChange={(e) => setRiDocRemarksText(e.target.value)}
                    placeholder="Enter verification comments, observations, recommendations, or reasons for returning the document..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({riDocRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                    <Clock className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-amber-800 uppercase tracking-wide">Action Required</div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      Verify physical certificate validity before completing this action.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (!riDocRemarksText.trim()) {
                        alert("Remarks are required when returning a document.")
                        return
                      }
                      setOriginalDocs(prev => prev.map(doc => 
                        doc.id === activeRiDocument.id 
                          ? { ...doc, status: 'Returned', remarks: riDocRemarksText.trim() } 
                          : doc
                      ))
                      alert(`Document request for ${activeRiDocument.scholarName} has been returned.`)
                      setActiveRiDocument(null)
                      setRiDocRemarksText('')
                      setRiDocUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5 shrink-0"
                    type="button"
                  >
                    <X className="h-3.5 w-3.5" />
                    Return Document
                  </button>
                  <button
                    onClick={() => {
                      setOriginalDocs(prev => prev.map(doc => 
                        doc.id === activeRiDocument.id 
                          ? { 
                              ...doc, 
                              status: 'Approved', 
                              remarks: riDocRemarksText.trim(), 
                              verifiedCopy: riDocUploadedFile ? riDocUploadedFile.name : 'verified_copy.pdf'
                            } 
                          : doc
                      ))
                      alert(`Document request for ${activeRiDocument.scholarName} has been approved successfully.`)
                      setActiveRiDocument(null)
                      setRiDocRemarksText('')
                      setRiDocUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5 shrink-0"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve & Verify
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Submitted Documents Verification</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">List of certificates and transcripts awaiting physical verification</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Document Type</th>
                      <th className="p-4">Submission Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {originalDocs.map((doc, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{doc.scholarName}</td>
                        <td className="p-4">{doc.school}</td>
                        <td className="p-4">{doc.department}</td>
                        <td className="p-4">{doc.docType}</td>
                        <td className="p-4 text-slate-500">{doc.submissionDate}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            doc.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            doc.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse' :
                            'bg-rose-50 text-rose-700 border-rose-250'
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveRiDocument(doc)
                              setRiDocRemarksText(doc.remarks || '')
                              setRiDocUploadedFile(doc.verifiedCopy ? { name: doc.verifiedCopy } : null)
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {view === 'publication' && (
          activeRiPublication ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveRiPublication(null)
                    setRiPubRemarksText('')
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Publications List
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Publication Verification Desk</span>
              </div>

              {/* Scholar and Journal Information Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Publication Submission: <span className="text-dsu-maroon">{activeRiPublication.scholarName}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiPublication.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiPublication.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiPublication.department}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Journal Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiPublication.journalName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Submission Date</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiPublication.submissionDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Current Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block mt-0.5 ${
                      activeRiPublication.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      activeRiPublication.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse' :
                      'bg-rose-50 text-rose-700 border-rose-250'
                    }`}>
                      {activeRiPublication.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Publication details and Indexing */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Research Publication Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Publication Title</span>
                    <span className="text-slate-800 font-extrabold text-sm block mt-1 leading-relaxed">
                      "{activeRiPublication.pubTitle}"
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-3 mt-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">DOI URL / Number</span>
                      <span className="text-slate-900 font-mono font-bold block mt-1 text-xs">
                        {activeRiPublication.doi}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Database Indexing Info</span>
                      <span className="text-[#001c4f] font-bold block mt-1 text-xs uppercase tracking-wide">
                        {activeRiPublication.indexing}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Publication Proof PDF Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Publication Proof</h3>
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-slate-350 transition">
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-5 w-5 text-dsu-maroon" />
                    <div>
                      <span className="font-extrabold text-slate-800 text-xs block">{activeRiPublication.pubProof}</span>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Author Manuscript Copy / Published PDF</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading publication proof: ${activeRiPublication.pubProof}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-extrabold text-[10px] uppercase tracking-wider shadow-sm"
                    type="button"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Proof
                  </button>
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Audit Comments</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={riPubRemarksText}
                    onChange={(e) => setRiPubRemarksText(e.target.value)}
                    placeholder="Enter indexing verification comments, journal rankings, or return reasons..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({riPubRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                    <Clock className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-amber-800 uppercase tracking-wide">Journal Registry Check Required</div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      Verify indexed metadata using DOI on scopus.com or webofscience.com before approval.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (!riPubRemarksText.trim()) {
                        alert("Remarks are required when returning a publication.")
                        return
                      }
                      setRiPublications(prev => prev.map(pub => 
                        pub.id === activeRiPublication.id 
                          ? { ...pub, status: 'Returned', remarks: riPubRemarksText.trim() } 
                          : pub
                      ))
                      alert(`Publication request for ${activeRiPublication.scholarName} has been returned.`)
                      setActiveRiPublication(null)
                      setRiPubRemarksText('')
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5 shrink-0"
                    type="button"
                  >
                    <X className="h-3.5 w-3.5" />
                    Return Request
                  </button>
                  <button
                    onClick={() => {
                      setRiPublications(prev => prev.map(pub => 
                        pub.id === activeRiPublication.id 
                          ? { ...pub, status: 'Approved', remarks: riPubRemarksText.trim() } 
                          : pub
                      ))
                      alert(`Publication request for ${activeRiPublication.scholarName} has been approved successfully.`)
                      setActiveRiPublication(null)
                      setRiPubRemarksText('')
                    }}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5 shrink-0"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve & Verify
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Scholar Publications Verification</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">List of journal papers submitted by scholars for indexing audit</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Publication Title</th>
                      <th className="p-4">Journal Name</th>
                      <th className="p-4">Submission Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {riPublications.map((pub, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{pub.scholarName}</td>
                        <td className="p-4">{pub.school}</td>
                        <td className="p-4">{pub.department}</td>
                        <td className="p-4 italic text-slate-800 font-bold">"{pub.pubTitle}"</td>
                        <td className="p-4">{pub.journalName}</td>
                        <td className="p-4 text-slate-500">{pub.submissionDate}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            pub.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            pub.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse' :
                            'bg-rose-50 text-rose-700 border-rose-250'
                          }`}>
                            {pub.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveRiPublication(pub)
                              setRiPubRemarksText(pub.remarks || '')
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {view === 'plagiarism' && (
          activeRiPlagiarism ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveRiPlagiarism(null)
                    setRiPlagRemarksText('')
                    setRiPlagUploadedFile(null)
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Plagiarism List
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plagiarism Approval Desk</span>
              </div>

              {/* Scholar and Plagiarism Metadata Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Plagiarism Review: <span className="text-dsu-maroon">{activeRiPlagiarism.scholarName}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiPlagiarism.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiPlagiarism.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiPlagiarism.department}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Similarity Index</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiPlagiarism.similarity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Submission Date</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiPlagiarism.submissionDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Current Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block mt-0.5 ${
                      activeRiPlagiarism.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      activeRiPlagiarism.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse' :
                      'bg-rose-50 text-rose-700 border-rose-250'
                    }`}>
                      {activeRiPlagiarism.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submitted Plagiarism Report Draft Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Plagiarism Report (Draft)</h3>
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-slate-350 transition">
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-5 w-5 text-dsu-maroon" />
                    <div>
                      <span className="font-extrabold text-slate-800 text-xs block">{activeRiPlagiarism.reportFile}</span>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Scholar Submitted Similarity Report</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading plagiarism report: ${activeRiPlagiarism.reportFile}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-extrabold text-[10px] uppercase tracking-wider shadow-sm"
                    type="button"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Report
                  </button>
                </div>
              </div>

              {/* Upload Verified report copy Widget */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Verified Plagiarism Clearance Report</h3>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Upload Verified Plagiarism Certificate (PDF)
                  </label>
                  
                  {riPlagUploadedFile ? (
                    <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in duration-100">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-850 text-xs">{riPlagUploadedFile.name}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold">Verified clearance report attached successfully.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setRiPlagUploadedFile(null)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 transition uppercase tracking-wider"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 hover:border-dsu-maroon rounded-2xl p-6 text-center transition bg-slate-50/50">
                      <input
                        type="file"
                        id="ri-plag-upload-input"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            if (file.type !== 'application/pdf') {
                              alert('Only PDF files are supported.')
                              return
                            }
                            if (file.size > 10 * 1024 * 1024) {
                              alert('File size must be less than 10MB.')
                              return
                            }
                            setRiPlagUploadedFile(file)
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="ri-plag-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-slate-400 animate-bounce" />
                        <span className="font-bold text-[#7B1E3A] hover:underline text-xs">
                          Click to upload verified plagiarism certificate PDF
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          PDF only, Max size 10MB
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Observation Notes</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={riPlagRemarksText}
                    onChange={(e) => setRiPlagRemarksText(e.target.value)}
                    placeholder="Enter plagiarism assessment observations, formatting compliance remarks, or reasons for returning the report..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({riPlagRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                    <Clock className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-amber-800 uppercase tracking-wide">Plagiarism Compliance Check</div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      Verify similarity reports align with the maximum 15% institutional limit before approving.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (!riPlagRemarksText.trim()) {
                        alert("Remarks are required when returning a plagiarism report.")
                        return
                      }
                      setRiPlagiarism(prev => prev.map(plag => 
                        plag.id === activeRiPlagiarism.id 
                          ? { ...plag, status: 'Returned', remarks: riPlagRemarksText.trim() } 
                          : plag
                      ))
                      alert(`Plagiarism request for ${activeRiPlagiarism.scholarName} has been returned.`)
                      setActiveRiPlagiarism(null)
                      setRiPlagRemarksText('')
                      setRiPlagUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5 shrink-0"
                    type="button"
                  >
                    <X className="h-3.5 w-3.5" />
                    Return Request
                  </button>
                  <button
                    onClick={() => {
                      setRiPlagiarism(prev => prev.map(plag => 
                        plag.id === activeRiPlagiarism.id 
                          ? { 
                              ...plag, 
                              status: 'Approved', 
                              remarks: riPlagRemarksText.trim(), 
                              verifiedReport: riPlagUploadedFile ? riPlagUploadedFile.name : 'verified_plagiarism_report.pdf'
                            } 
                          : plag
                      ))
                      alert(`Plagiarism request for ${activeRiPlagiarism.scholarName} has been approved successfully.`)
                      setActiveRiPlagiarism(null)
                      setRiPlagRemarksText('')
                      setRiPlagUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5 shrink-0"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve Plagiarism
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Plagiarism Clearances & Approvals</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">List of similarity reports and manuscripts awaiting plagiarism audit</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Similarity Percentage</th>
                      <th className="p-4">Submission Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {riPlagiarism.map((plag, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{plag.scholarName}</td>
                        <td className="p-4">{plag.school}</td>
                        <td className="p-4">{plag.department}</td>
                        <td className="p-4 font-extrabold text-slate-800">{plag.similarity}</td>
                        <td className="p-4 text-slate-500">{plag.submissionDate}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            plag.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            plag.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse' :
                            'bg-rose-50 text-rose-700 border-rose-250'
                          }`}>
                            {plag.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveRiPlagiarism(plag)
                              setRiPlagRemarksText(plag.remarks || '')
                              setRiPlagUploadedFile(plag.verifiedReport ? { name: plag.verifiedReport } : null)
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {view === 'format' && (
          activeRiFormat ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveRiFormat(null)
                    setRiFormatRemarksText('')
                    setRiFormatUploadedFile(null)
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Format Checking List
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thesis Format Audit Desk</span>
              </div>

              {/* Scholar and Thesis Metadata Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Format Audit: <span className="text-dsu-maroon">{activeRiFormat.scholarName}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiFormat.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiFormat.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiFormat.department}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Thesis Title</span>
                    <span className="text-slate-905 font-semibold text-xs block mt-0.5 italic">"{activeRiFormat.thesisTitle}"</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Submission Date</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeRiFormat.submissionDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Current Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block mt-0.5 ${
                      activeRiFormat.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      activeRiFormat.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse' :
                      'bg-rose-50 text-rose-700 border-rose-250'
                    }`}>
                      {activeRiFormat.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submitted Thesis Draft Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Thesis Draft</h3>
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-slate-350 transition">
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-5 w-5 text-dsu-maroon" />
                    <div>
                      <span className="font-extrabold text-slate-800 text-xs block">{activeRiFormat.thesisDraft}</span>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Submitted Draft Manuscript</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading thesis draft: ${activeRiFormat.thesisDraft}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-extrabold text-[10px] uppercase tracking-wider shadow-sm"
                    type="button"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Thesis
                  </button>
                </div>
              </div>

              {/* Format Compliance Checklist */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Format Compliance Checklist</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition">
                    <input
                      type="checkbox"
                      checked={riFormatChecklist.titlePage}
                      onChange={(e) => setRiFormatChecklist(prev => ({ ...prev, titlePage: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-dsu-maroon focus:ring-dsu-maroon"
                    />
                    <div>
                      <span className="font-bold text-slate-800 text-xs block">Title Page Formatting</span>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">Font size, logo, institutional headers</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition">
                    <input
                      type="checkbox"
                      checked={riFormatChecklist.toc}
                      onChange={(e) => setRiFormatChecklist(prev => ({ ...prev, toc: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-dsu-maroon focus:ring-dsu-maroon"
                    />
                    <div>
                      <span className="font-bold text-slate-800 text-xs block">Table of Contents Alignment</span>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">Page numbers, dot leaders, headings hierarchy</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition">
                    <input
                      type="checkbox"
                      checked={riFormatChecklist.references}
                      onChange={(e) => setRiFormatChecklist(prev => ({ ...prev, references: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-dsu-maroon focus:ring-dsu-maroon"
                    />
                    <div>
                      <span className="font-bold text-slate-800 text-xs block">Reference Style Compliance</span>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">Harvard/IEEE formatting & citations uniformity</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition">
                    <input
                      type="checkbox"
                      checked={riFormatChecklist.margins}
                      onChange={(e) => setRiFormatChecklist(prev => ({ ...prev, margins: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-dsu-maroon focus:ring-dsu-maroon"
                    />
                    <div>
                      <span className="font-bold text-slate-800 text-xs block">Margin & Spacing Rules</span>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">1.5 line spacing, 1-inch margins on all sides</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Upload Corrected Version copy Widget */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Corrected Thesis Copy (Verified)</h3>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Upload Corrected Thesis (PDF)
                  </label>
                  
                  {riFormatUploadedFile ? (
                    <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in duration-100">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-850 text-xs">{riFormatUploadedFile.name}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold">Corrected thesis manuscript attached.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setRiFormatUploadedFile(null)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 transition uppercase tracking-wider"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 hover:border-dsu-maroon rounded-2xl p-6 text-center transition bg-slate-50/50">
                      <input
                        type="file"
                        id="ri-format-upload-input"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            if (file.type !== 'application/pdf') {
                              alert('Only PDF files are supported.')
                              return
                            }
                            if (file.size > 10 * 1024 * 1024) {
                              alert('File size must be less than 10MB.')
                              return
                            }
                            setRiFormatUploadedFile(file)
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="ri-format-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-slate-400 animate-bounce" />
                        <span className="font-bold text-[#7B1E3A] hover:underline text-xs">
                          Click to upload corrected thesis copy PDF
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          PDF only, Max size 10MB
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Corrections Notes</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={riFormatRemarksText}
                    onChange={(e) => setRiFormatRemarksText(e.target.value)}
                    placeholder="Enter thesis layout observations, guidelines violations notes, or reasons for returning the draft..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({riFormatRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                    <Clock className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-amber-800 uppercase tracking-wide">University Format Validation</div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      Ensure all formatting check list points are verified before approving.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (!riFormatRemarksText.trim()) {
                        alert("Remarks are required when returning a thesis for formatting corrections.")
                        return
                      }
                      setRiFormatChecking(prev => prev.map(format => 
                        format.id === activeRiFormat.id 
                          ? { 
                              ...format, 
                              status: 'Returned', 
                              remarks: riFormatRemarksText.trim(),
                              checklist: { ...riFormatChecklist }
                            } 
                          : format
                      ))
                      alert(`Thesis format submission for ${activeRiFormat.scholarName} has been returned.`)
                      setActiveRiFormat(null)
                      setRiFormatRemarksText('')
                      setRiFormatUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5 shrink-0"
                    type="button"
                  >
                    <X className="h-3.5 w-3.5" />
                    Return Request
                  </button>
                  <button
                    onClick={() => {
                      setRiFormatChecking(prev => prev.map(format => 
                        format.id === activeRiFormat.id 
                          ? { 
                              ...format, 
                              status: 'Approved', 
                              remarks: riFormatRemarksText.trim(), 
                              correctedVersion: riFormatUploadedFile ? riFormatUploadedFile.name : 'corrected_thesis_manuscript.pdf',
                              checklist: { ...riFormatChecklist }
                            } 
                          : format
                      ))
                      alert(`Thesis format audit for ${activeRiFormat.scholarName} approved successfully.`)
                      setActiveRiFormat(null)
                      setRiFormatRemarksText('')
                      setRiFormatUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5 shrink-0"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve Formatting
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Thesis Format Checking</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">List of thesis drafts submitted by scholars for format validation</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Thesis Title</th>
                      <th className="p-4">Submission Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {riFormatChecking.map((format, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{format.scholarName}</td>
                        <td className="p-4">{format.school}</td>
                        <td className="p-4">{format.department}</td>
                        <td className="p-4 italic text-slate-800 font-bold">"{format.thesisTitle}"</td>
                        <td className="p-4 text-slate-500">{format.submissionDate}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            format.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            format.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse' :
                            'bg-rose-50 text-rose-700 border-rose-250'
                          }`}>
                            {format.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveRiFormat(format)
                              setRiFormatRemarksText(format.remarks || '')
                              setRiFormatUploadedFile(format.correctedVersion ? { name: format.correctedVersion } : null)
                              setRiFormatChecklist(format.checklist || { titlePage: false, toc: false, references: false, margins: false })
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {view === 'thesis' && (
          activeThesisDispatch ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveThesisDispatch(null)
                    setRiDispatchRemarksText('')
                    setRiDispatchUploadedProof(null)
                    setRiDispatchCourier('')
                    setRiDispatchTracking('')
                    setRiDispatchMode('')
                    setRiDispatchExpectedDate('')
                    setRiDispatchDate('')
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Thesis Dispatch List
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thesis Dispatch Desk</span>
              </div>

              {/* Scholar & Thesis Details Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-[#001c4f] uppercase tracking-wide border-b pb-2 flex items-center gap-2">
                  <Layers className="h-4.5 w-4.5 text-dsu-maroon" />
                  Scholar & Thesis Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeThesisDispatch.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registration Number</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeThesisDispatch.regNo || 'DSU-PHD-2023-041'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeThesisDispatch.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeThesisDispatch.department}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Research Guide</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeThesisDispatch.guide || 'Dr. S. K. Gupta'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Dispatch Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block mt-0.5 ${
                      activeThesisDispatch.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      activeThesisDispatch.status === 'In Transit' || activeThesisDispatch.status === 'Dispatched' ? 'bg-indigo-50 text-indigo-700 border-indigo-250' :
                      'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                    }`}>
                      {activeThesisDispatch.status}
                    </span>
                  </div>
                  <div className="sm:col-span-4">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Thesis Title</span>
                    <span className="text-slate-905 font-semibold text-xs block mt-0.5 italic">"{activeThesisDispatch.thesisTitle}"</span>
                  </div>
                </div>
              </div>

              {/* Grid for Examiner and Dispatch details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="space-y-6">
                  {/* Examiner Information Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                    <h3 className="text-sm font-extrabold text-[#001c4f] uppercase tracking-wide border-b pb-2 flex items-center gap-2">
                      <Users className="h-4.5 w-4.5 text-dsu-maroon" />
                      Examiner Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Examiner Name</span>
                        <span className="text-slate-900 font-bold text-xs block mt-0.5">{activeThesisDispatch.examinerName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Affiliation</span>
                        <span className="text-slate-900 font-bold text-xs block mt-0.5">{activeThesisDispatch.examinerAffiliation}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Examiner Type</span>
                        <span className="text-slate-900 font-bold text-xs block mt-0.5">{activeThesisDispatch.examinerType}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Country</span>
                        <span className="text-slate-900 font-bold text-xs block mt-0.5 flex items-center gap-1">
                          <Globe className="h-3.5 w-3.5 text-slate-400" />
                          {activeThesisDispatch.examinerCountry || 'Singapore'}
                        </span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Email Address</span>
                        <span className="text-slate-900 font-bold text-xs block mt-0.5 flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          {activeThesisDispatch.examinerEmail || 'john.miller@nus.edu.sg'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dispatch Information Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                    <h3 className="text-sm font-extrabold text-[#001c4f] uppercase tracking-wide border-b pb-2 flex items-center gap-2">
                      <Truck className="h-4.5 w-4.5 text-dsu-maroon" />
                      Dispatch Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-[#7B1E3A] font-extrabold uppercase tracking-wider block mb-1">Dispatch Date</label>
                        <input
                          type="text"
                          value={riDispatchDate}
                          onChange={(e) => setRiDispatchDate(e.target.value)}
                          className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold focus:border-dsu-maroon focus:ring-1 focus:ring-dsu-maroon outline-none"
                          placeholder="e.g. 10-Jun-2026"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#7B1E3A] font-extrabold uppercase tracking-wider block mb-1">Courier Service</label>
                        <input
                          type="text"
                          value={riDispatchCourier}
                          onChange={(e) => setRiDispatchCourier(e.target.value)}
                          className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold focus:border-dsu-maroon focus:ring-1 focus:ring-dsu-maroon outline-none"
                          placeholder="e.g. DHL Express, Speed Post"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#7B1E3A] font-extrabold uppercase tracking-wider block mb-1">Tracking Number</label>
                        <input
                          type="text"
                          value={riDispatchTracking}
                          onChange={(e) => setRiDispatchTracking(e.target.value)}
                          className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold focus:border-dsu-maroon focus:ring-1 focus:ring-dsu-maroon outline-none"
                          placeholder="e.g. DHL987654321, SP123"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#7B1E3A] font-extrabold uppercase tracking-wider block mb-1">Dispatch Mode</label>
                        <input
                          type="text"
                          value={riDispatchMode}
                          onChange={(e) => setRiDispatchMode(e.target.value)}
                          className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold focus:border-dsu-maroon focus:ring-1 focus:ring-dsu-maroon outline-none"
                          placeholder="e.g. Physical Thesis Package"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  {/* Dispatch Documents Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                    <h3 className="text-sm font-extrabold text-[#001c4f] uppercase tracking-wide border-b pb-2 flex items-center gap-2">
                      <FileText className="h-4.5 w-4.5 text-dsu-maroon" />
                      Dispatch Documents
                    </h3>
                    <div className="space-y-3">
                      {[
                        'Thesis Package Dispatch Receipt.pdf',
                        'Courier Acknowledgement.pdf',
                        'Examiner Communication Letter.pdf',
                        'Dispatch Proof Document.pdf'
                      ].map((doc, docIdx) => (
                        <div key={docIdx} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3 hover:border-slate-300 transition">
                          <div className="flex items-center gap-2">
                            <FileCheck className="h-4.5 w-4.5 text-dsu-maroon" />
                            <div>
                              <span className="font-bold text-slate-800 text-[11px] block truncate max-w-[220px]">{doc}</span>
                              <span className="text-[9px] text-slate-400 font-semibold block">Official Milestone File</span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => alert(`Viewing dispatch document: ${doc}`)}
                              className="p-1.5 bg-[#001c4f] hover:bg-blue-900 text-white rounded-lg transition"
                              type="button"
                              title="View"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => alert(`Downloading dispatch document: ${doc}`)}
                              className="p-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition"
                              type="button"
                              title="Download"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Confirmation Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                    <h3 className="text-sm font-extrabold text-[#001c4f] uppercase tracking-wide border-b pb-2 flex items-center gap-2">
                      <CheckCircle className="h-4.5 w-4.5 text-dsu-maroon" />
                      Delivery Confirmation
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-[#7B1E3A] font-extrabold uppercase tracking-wider block mb-1">Expected Delivery Date</label>
                        <input
                          type="text"
                          value={riDispatchExpectedDate}
                          onChange={(e) => setRiDispatchExpectedDate(e.target.value)}
                          className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold focus:border-dsu-maroon focus:ring-1 focus:ring-dsu-maroon outline-none"
                          placeholder="e.g. 15-Jun-2026"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Delivery Status</span>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold border uppercase inline-block mt-1 ${
                          activeThesisDispatch.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' : 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                        }`}>
                          {activeThesisDispatch.status === 'Delivered' ? 'Delivered' : activeThesisDispatch.deliveryStatus || 'Awaiting Delivery Confirmation'}
                        </span>
                      </div>
                    </div>

                    {/* PDF Uploader Widget */}
                    <div className="space-y-3 pt-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Upload Delivery Confirmation Proof (PDF)
                      </label>
                      {riDispatchUploadedProof ? (
                        <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in duration-100">
                          <div className="flex items-center gap-2">
                            <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                            <div>
                              <p className="font-bold text-slate-850 text-xs">{riDispatchUploadedProof.name}</p>
                              <p className="text-[10px] text-emerald-600 font-semibold">Delivery confirmation proof attached.</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setRiDispatchUploadedProof(null)}
                            className="text-xs font-bold text-rose-600 hover:text-rose-800 transition uppercase tracking-wider"
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-slate-200 hover:border-dsu-maroon rounded-2xl p-6 text-center transition bg-slate-50/50">
                          <input
                            type="file"
                            id="ri-dispatch-delivery-proof"
                            accept=".pdf"
                            onChange={(e) => {
                              const file = e.target.files[0]
                              if (file) {
                                if (file.name.split('.').pop().toLowerCase() !== 'pdf') {
                                  alert('Only PDF files are allowed for delivery confirmation.')
                                  return
                                }
                                if (file.size > 10 * 1024 * 1024) {
                                  alert('File size must be less than 10MB.')
                                  return
                                }
                                setRiDispatchUploadedProof({ name: file.name })
                              }
                            }}
                            className="hidden"
                          />
                          <label htmlFor="ri-dispatch-delivery-proof" className="cursor-pointer flex flex-col items-center gap-2">
                            <Upload className="h-8 w-8 text-slate-400 animate-bounce" />
                            <span className="font-bold text-[#7B1E3A] hover:underline text-xs">
                              Click to upload delivery confirmation proof
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold">
                              PDF files only, Max size 10MB
                            </span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Dispatch Notes</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={riDispatchRemarksText}
                    onChange={(e) => setRiDispatchRemarksText(e.target.value)}
                    placeholder="Enter dispatch details, tracking number (e.g., Speed Post EMS tracker), courier service name, or notes..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({riDispatchRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#001c4f] rounded-xl text-white">
                    <Info className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#001c4f] uppercase tracking-wide">Dispatch Processing Status</div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      Save dispatch information, update delivery status, upload proof documents, or record examiner acknowledgement.
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      setActiveThesisDispatch(null)
                      setRiDispatchRemarksText('')
                      setRiDispatchUploadedProof(null)
                      setRiDispatchCourier('')
                      setRiDispatchTracking('')
                      setRiDispatchMode('')
                      setRiDispatchExpectedDate('')
                      setRiDispatchDate('')
                    }}
                    className="px-4 py-2 border border-slate-350 hover:bg-slate-100 text-slate-700 rounded-xl font-bold uppercase tracking-wider transition text-[10px]"
                    type="button"
                  >
                    Back to List
                  </button>

                  <button
                    onClick={() => {
                      const updatedDispatches = thesisDispatches.map(disp => 
                        disp.id === activeThesisDispatch.id 
                          ? { 
                              ...disp, 
                              courierService: riDispatchCourier.trim(),
                              trackingNumber: riDispatchTracking.trim(),
                              dispatchMode: riDispatchMode.trim(),
                              dispatchDate: riDispatchDate.trim(),
                              expectedDeliveryDate: riDispatchExpectedDate.trim(),
                              remarks: riDispatchRemarksText.trim(),
                              dispatchProof: riDispatchUploadedProof ? riDispatchUploadedProof.name : null,
                              status: disp.status === 'Pending' && riDispatchCourier.trim() ? 'In Transit' : disp.status
                            } 
                          : disp
                      )
                      setThesisDispatches(updatedDispatches)
                      localStorage.setItem('dsu_ri_thesis_dispatches', JSON.stringify(updatedDispatches))
                      window.dispatchEvent(new Event('notifications_updated'))
                      alert("Thesis dispatch status updated successfully.")
                      setActiveThesisDispatch(null)
                      setRiDispatchRemarksText('')
                      setRiDispatchUploadedProof(null)
                      setRiDispatchCourier('')
                      setRiDispatchTracking('')
                      setRiDispatchMode('')
                      setRiDispatchExpectedDate('')
                      setRiDispatchDate('')
                    }}
                    className="px-4 py-2 bg-[#001c4f] hover:bg-blue-900 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm"
                    type="button"
                  >
                    Update Dispatch Status
                  </button>

                  <button
                    onClick={() => {
                      if (!riDispatchUploadedProof) {
                        alert("Please upload delivery confirmation proof (PDF) before marking as delivered.")
                        return
                      }
                      const updatedDispatches = thesisDispatches.map(disp => 
                        disp.id === activeThesisDispatch.id 
                          ? { 
                              ...disp, 
                              courierService: riDispatchCourier.trim(),
                              trackingNumber: riDispatchTracking.trim(),
                              dispatchMode: riDispatchMode.trim(),
                              dispatchDate: riDispatchDate.trim(),
                              expectedDeliveryDate: riDispatchExpectedDate.trim(),
                              remarks: riDispatchRemarksText.trim(),
                              dispatchProof: riDispatchUploadedProof.name,
                              status: 'Delivered',
                              deliveryStatus: 'Delivered'
                            } 
                          : disp
                      )
                      setThesisDispatches(updatedDispatches)
                      localStorage.setItem('dsu_ri_thesis_dispatches', JSON.stringify(updatedDispatches))
                      window.dispatchEvent(new Event('notifications_updated'))
                      alert(`Thesis has been marked as delivered for ${activeThesisDispatch.scholarName}.`)
                      setActiveThesisDispatch(null)
                      setRiDispatchRemarksText('')
                      setRiDispatchUploadedProof(null)
                      setRiDispatchCourier('')
                      setRiDispatchTracking('')
                      setRiDispatchMode('')
                      setRiDispatchExpectedDate('')
                      setRiDispatchDate('')
                    }}
                    className="px-4 py-2 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1.5"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Mark Delivered
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Thesis Dispatch Panel</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Official log for managing examiner thesis dispatches and proof receipts</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Examiner Name</th>
                      <th className="p-4">Dispatch Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {thesisDispatches.map((disp, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{disp.scholarName}</td>
                        <td className="p-4">{disp.school}</td>
                        <td className="p-4">{disp.department}</td>
                        <td className="p-4 font-bold text-slate-800">{disp.examinerName} ({disp.examinerAffiliation})</td>
                        <td className="p-4 text-slate-500">{disp.dispatchDate || 'Awaiting Dispatch'}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            disp.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            disp.status === 'In Transit' || disp.status === 'Dispatched' ? 'bg-indigo-50 text-indigo-700 border-indigo-250' :
                            'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                          }`}>
                            {disp.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveThesisDispatch(disp)
                              setRiDispatchRemarksText(disp.remarks || '')
                              setRiDispatchUploadedProof(disp.dispatchProof ? { name: disp.dispatchProof } : null)
                              setRiDispatchCourier(disp.courierService || '')
                              setRiDispatchTracking(disp.trackingNumber || '')
                              setRiDispatchMode(disp.dispatchMode || '')
                              setRiDispatchExpectedDate(disp.expectedDeliveryDate || '')
                              setRiDispatchDate(disp.dispatchDate || '')
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {view === 'examiner_report' && (
          activeExaminerReport ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveExaminerReport(null)
                    setRiReportRemarksText('')
                    setRiReportUploadedFile(null)
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Examiner Report List
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Examiner Report Desk</span>
              </div>

              {/* Scholar and Thesis Details Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Scholar & Thesis Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeExaminerReport.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeExaminerReport.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeExaminerReport.department}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Thesis Title</span>
                    <span className="text-slate-905 font-semibold text-xs block mt-0.5 italic">"{activeExaminerReport.thesisTitle}"</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Report Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block mt-0.5 ${
                      activeExaminerReport.reportStatus === 'Received' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      activeExaminerReport.reportStatus === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                      'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                    }`}>
                      {activeExaminerReport.reportStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Examiner Information Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Examiner Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Examiner Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeExaminerReport.examinerName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Affiliation</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeExaminerReport.examinerAffiliation}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Examiner Type</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeExaminerReport.examinerType}</span>
                  </div>
                </div>
              </div>

              {/* Download Report Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Examiner Report Download</h3>
                {activeExaminerReport.reportFile ? (
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3 hover:border-slate-350 transition">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4.5 w-4.5 text-dsu-maroon" />
                      <div>
                        <span className="font-bold text-slate-800 text-[11px] block truncate max-w-[220px]">{activeExaminerReport.reportFile}</span>
                        <span className="text-[9px] text-slate-400 font-semibold block">Official Evaluation Report</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Downloading examiner report: ${activeExaminerReport.reportFile}`)}
                      className="p-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition flex items-center gap-1 font-bold text-[9px] uppercase px-3"
                      type="button"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download Report
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-amber-50 border border-amber-150 rounded-xl flex items-center gap-2.5 text-amber-800 font-semibold">
                    <AlertCircle className="h-4.5 w-4.5 text-amber-600 shrink-0" />
                    <span>No evaluation report has been filed yet. Status is currently awaiting submission.</span>
                  </div>
                )}
              </div>

              {/* Upload Received Report Widget */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Upload Received Report</h3>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Upload Signed Examiner Report (PDF)
                  </label>
                  
                  {riReportUploadedFile ? (
                    <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in duration-100">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-850 text-xs">{riReportUploadedFile.name}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold">Examiner report attached successfully.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setRiReportUploadedFile(null)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 transition uppercase tracking-wider"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 hover:border-dsu-maroon rounded-2xl p-6 text-center transition bg-slate-50/50">
                      <input
                        type="file"
                        id="ri-report-upload-input"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              alert('File size must be less than 10MB.')
                              return
                            }
                            setRiReportUploadedFile(file)
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="ri-report-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-slate-400 animate-bounce" />
                        <span className="font-bold text-[#7B1E3A] hover:underline text-xs">
                          Click to upload signed examiner report PDF
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          PDF files only, Max size 10MB
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Remarks and Notes</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={riReportRemarksText}
                    onChange={(e) => setRiReportRemarksText(e.target.value)}
                    placeholder="Enter observations, recommendation highlights, evaluation comments, or reasons for return..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({riReportRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Report Evaluation Status</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    Save examiner report details, record recommendations, or return.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (riReportRemarksText.trim() === '') {
                        alert("Remarks are required when returning a report request.")
                        return
                      }
                      setExaminerReports(prev => prev.map(rep => 
                        rep.id === activeExaminerReport.id 
                          ? { 
                              ...rep, 
                              reportStatus: 'Returned', 
                              remarks: riReportRemarksText.trim(), 
                              reportFile: riReportUploadedFile ? riReportUploadedFile.name : rep.reportFile
                            } 
                          : rep
                      ))
                      alert(`Examiner report returned with remarks for ${activeExaminerReport.scholarName}.`)
                      setActiveExaminerReport(null)
                      setRiReportRemarksText('')
                      setRiReportUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <X className="h-3.5 w-3.5" />
                    Return Request
                  </button>

                  <button
                    onClick={() => {
                      if (!riReportUploadedFile && !activeExaminerReport.reportFile) {
                        alert("Please upload the received examiner report PDF first.")
                        return
                      }
                      setExaminerReports(prev => prev.map(rep => 
                        rep.id === activeExaminerReport.id 
                          ? { 
                              ...rep, 
                              reportStatus: 'Received', 
                              receivedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
                              remarks: riReportRemarksText.trim(), 
                              reportFile: riReportUploadedFile ? riReportUploadedFile.name : rep.reportFile
                            } 
                          : rep
                      ))
                      alert(`Examiner report marked as received for ${activeExaminerReport.scholarName}.`)
                      setActiveExaminerReport(null)
                      setRiReportRemarksText('')
                      setRiReportUploadedFile(null)
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Mark Received
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Examiner Report Collection Panel</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Official tracking workspace for signed examiner reports</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Examiner Name</th>
                      <th className="p-4">Report Status</th>
                      <th className="p-4">Received Date</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {examinerReports.map((rep, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{rep.scholarName}</td>
                        <td className="p-4">{rep.school}</td>
                        <td className="p-4 font-bold text-slate-800">{rep.examinerName} ({rep.examinerAffiliation})</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            rep.reportStatus === 'Received' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            rep.reportStatus === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                            'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                          }`}>
                            {rep.reportStatus}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">{rep.receivedDate || 'Pending Receipt'}</td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveExaminerReport(rep)
                              setRiReportRemarksText(rep.remarks || '')
                              setRiReportUploadedFile(rep.reportFile ? { name: rep.reportFile } : null)
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {view === 'library' && (
          activeLibrarySubmission ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveLibrarySubmission(null)
                    setRiLibraryRemarksText('')
                    setRiLibraryUploadedFile(null)
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Library Submission List
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Final Library Submission Desk</span>
              </div>

              {/* Final Thesis Details Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Final Thesis Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeLibrarySubmission.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeLibrarySubmission.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{activeLibrarySubmission.department}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Thesis Title</span>
                    <span className="text-slate-905 font-semibold text-xs block mt-0.5 italic">"{activeLibrarySubmission.thesisTitle}"</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Submission Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block mt-0.5 ${
                      activeLibrarySubmission.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      activeLibrarySubmission.status === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                      'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                    }`}>
                      {activeLibrarySubmission.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Library Submission Documents */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Library Submission Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Library No-Due Cert */}
                  <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex flex-col justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Clearance 1</span>
                      <span className="font-extrabold text-slate-800 text-[11px] block mt-0.5 truncate">{activeLibrarySubmission.libraryNoDueCert}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block mt-1">Library No-Due Certificate</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading: ${activeLibrarySubmission.libraryNoDueCert}`)}
                      className="w-full mt-2 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition flex items-center justify-center gap-1 font-bold text-[9px] uppercase px-3 shadow-sm"
                      type="button"
                    >
                      <Download className="h-3 w-3" />
                      Download No-Due
                    </button>
                  </div>

                  {/* Plagiarism Cert */}
                  <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex flex-col justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Clearance 2</span>
                      <span className="font-extrabold text-slate-800 text-[11px] block mt-0.5 truncate">{activeLibrarySubmission.plagiarismCert}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block mt-1">Plagiarism Verification Report</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading: ${activeLibrarySubmission.plagiarismCert}`)}
                      className="w-full mt-2 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition flex items-center justify-center gap-1 font-bold text-[9px] uppercase px-3 shadow-sm"
                      type="button"
                    >
                      <Download className="h-3 w-3" />
                      Download Report
                    </button>
                  </div>

                  {/* CD Submission Receipt */}
                  <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex flex-col justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Clearance 3</span>
                      <span className="font-extrabold text-slate-800 text-[11px] block mt-0.5 truncate">{activeLibrarySubmission.cdSubmissionReceipt}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block mt-1">CD & Hardcopy Archive Receipt</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading: ${activeLibrarySubmission.cdSubmissionReceipt}`)}
                      className="w-full mt-2 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition flex items-center justify-center gap-1 font-bold text-[9px] uppercase px-3 shadow-sm"
                      type="button"
                    >
                      <Download className="h-3 w-3" />
                      Download Receipt
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Verified Copy Widget */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Upload Verified Copy</h3>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Upload R&I Verified Final Library Copy Receipt (PDF)
                  </label>
                  
                  {riLibraryUploadedFile ? (
                    <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in duration-100">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-855 text-xs">{riLibraryUploadedFile.name}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold">Verified copy uploaded successfully.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setRiLibraryUploadedFile(null)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 transition uppercase tracking-wider"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 hover:border-dsu-maroon rounded-2xl p-6 text-center transition bg-slate-50/50">
                      <input
                        type="file"
                        id="ri-library-upload-input"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              alert('File size must be less than 10MB.')
                              return
                            }
                            setRiLibraryUploadedFile(file)
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="ri-library-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-slate-400 animate-bounce" />
                        <span className="font-bold text-[#7B1E3A] hover:underline text-xs">
                          Click to upload verified final library copy receipt PDF
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          PDF files only, Max size 10MB
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Remarks and Notes</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={riLibraryRemarksText}
                    onChange={(e) => setRiLibraryRemarksText(e.target.value)}
                    placeholder="Enter archival verification notes, clearance comments, or reasons for return..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({riLibraryRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Submission Verification Action</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    Approve and mark final archival completed, or return submission to scholar.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (riLibraryRemarksText.trim() === '') {
                        alert("Remarks are required when returning a library submission request.")
                        return
                      }
                      setLibrarySubmissions(prev => prev.map(sub => 
                        sub.id === activeLibrarySubmission.id 
                          ? { 
                              ...sub, 
                              status: 'Returned', 
                              remarks: riLibraryRemarksText.trim(), 
                              verifiedCopy: riLibraryUploadedFile ? riLibraryUploadedFile.name : sub.verifiedCopy
                            } 
                          : sub
                      ))
                      alert(`Library submission returned with remarks for ${activeLibrarySubmission.scholarName}.`)
                      setActiveLibrarySubmission(null)
                      setRiLibraryRemarksText('')
                      setRiLibraryUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <X className="h-3.5 w-3.5" />
                    Return Submission
                  </button>

                  <button
                    onClick={() => {
                      if (!riLibraryUploadedFile && !activeLibrarySubmission.verifiedCopy) {
                        alert("Please upload the R&I verified final library copy receipt PDF first.")
                        return
                      }
                      setLibrarySubmissions(prev => prev.map(sub => 
                        sub.id === activeLibrarySubmission.id 
                          ? { 
                              ...sub, 
                              status: 'Approved', 
                              remarks: riLibraryRemarksText.trim(), 
                              verifiedCopy: riLibraryUploadedFile ? riLibraryUploadedFile.name : sub.verifiedCopy
                            } 
                          : sub
                      ))
                      alert(`Library submission approved and archived for ${activeLibrarySubmission.scholarName}.`)
                      setActiveLibrarySubmission(null)
                      setRiLibraryRemarksText('')
                      setRiLibraryUploadedFile(null)
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve Submission
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Final Library Submission Panel</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Verify and archive the final thesis copy before PhD completion</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Thesis Title</th>
                      <th className="p-4">Submission Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {librarySubmissions.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{sub.scholarName}</td>
                        <td className="p-4">{sub.school}</td>
                        <td className="p-4">{sub.department}</td>
                        <td className="p-4 font-semibold text-slate-800 max-w-[250px] truncate">"{sub.thesisTitle}"</td>
                        <td className="p-4 text-slate-500">{sub.submissionDate || 'Pending Submission'}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            sub.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            sub.status === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                            'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveLibrarySubmission(sub)
                              setRiLibraryRemarksText(sub.remarks || '')
                              setRiLibraryUploadedFile(sub.verifiedCopy ? { name: sub.verifiedCopy } : null)
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}
      </div>
    )
  }

  // 7. Registrar Dashboard Views
  if (role === 'registrar') {
    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        {view === 'home' && (
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xl font-black text-dsu-maroon uppercase tracking-wide">WELCOME, DR. S. NARAYANAN</div>
              <div className="text-sm text-slate-500 font-semibold mt-1">Registrar</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">PhD Research Portal</div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Office Branch</div>
              <div className="text-base font-extrabold text-slate-800">Registrar Chambers</div>
            </div>
          </section>
        )}

        {view === 'home' && (
          <>
            {/* Quick Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard title="Pending Registration Approvals" value="12" />
              <StatCard title="Pending Enrollment Confirmations" value="8" />
              <StatCard title="Pending Academic Record Verifications" value="6" />
              <StatCard title="Pending Degree Processing Requests" value="4" />
              <StatCard title="Pending Award Documentation Requests" value="3" />
            </section>

            {/* Recent Administrative Requests Table */}
            <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">RECENT ADMINISTRATIVE REQUESTS</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Overview of pending administrative requests awaiting verification and processing across all Schools and Departments.</p>
              </div>

              {/* Search & Filtering Panel */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Request Filters & Search</span>
                  <button 
                    onClick={() => {
                      setRegistrarSearch('')
                      setRegistrarSchoolFilter('')
                      setRegistrarTypeFilter('')
                      setRegistrarStatusFilter('')
                    }}
                    className="text-[9px] font-bold text-dsu-maroon hover:text-red-800 uppercase flex items-center gap-1 transition"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> Clear Filters
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-semibold text-slate-700">
                  <div className="relative">
                    <label className="block mb-1 text-[10px] uppercase font-bold text-slate-500">Search Scholar/Guide/Dept</label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Scholar, Guide, Department..."
                        value={registrarSearch}
                        onChange={(e) => setRegistrarSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon text-xs font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] uppercase font-bold text-slate-500">Filter by School</label>
                    <select 
                      value={registrarSchoolFilter}
                      onChange={(e) => setRegistrarSchoolFilter(e.target.value)}
                      className="w-full border border-slate-200 p-1.5 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon text-xs font-semibold"
                    >
                      <option value="">All Schools</option>
                      <option value="School of Computing">School of Computing</option>
                      <option value="School of Engineering">School of Engineering</option>
                      <option value="School of Management">School of Management</option>
                      <option value="School of Sciences">School of Sciences</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] uppercase font-bold text-slate-500">Filter by Request Type</label>
                    <select 
                      value={registrarTypeFilter}
                      onChange={(e) => setRegistrarTypeFilter(e.target.value)}
                      className="w-full border border-slate-200 p-1.5 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon text-xs font-semibold"
                    >
                      <option value="">All Request Types</option>
                      <option value="Registration Approval">Registration Approval</option>
                      <option value="Enrollment Confirmation">Enrollment Confirmation</option>
                      <option value="Academic Record Verification">Academic Record Verification</option>
                      <option value="Degree Processing">Degree Processing</option>
                      <option value="Award Documentation">Award Documentation</option>
                      <option value="Research Registration Modification">Research Registration Modification</option>
                      <option value="Scholar Status Update">Scholar Status Update</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] uppercase font-bold text-slate-500">Filter by Status</label>
                    <select 
                      value={registrarStatusFilter}
                      onChange={(e) => setRegistrarStatusFilter(e.target.value)}
                      className="w-full border border-slate-200 p-1.5 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon text-xs font-semibold"
                    >
                      <option value="">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Returned">Returned</option>
                      <option value="Processed">Processed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">School</th>
                      <th className="p-3.5">Department</th>
                      <th className="p-3.5">Research Guide</th>
                      <th className="p-3.5">Scholar Name</th>
                      <th className="p-3.5">Request Type</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {(() => {
                      const filtered = registrarAdminRequests
                        .filter(req => {
                          const query = registrarSearch.toLowerCase()
                          const matchesSearch = 
                            req.scholar.toLowerCase().includes(query) ||
                            req.guide.toLowerCase().includes(query) ||
                            req.dept.toLowerCase().includes(query)

                          const matchesSchool = !registrarSchoolFilter || req.school === registrarSchoolFilter
                          const matchesType = !registrarTypeFilter || req.type === registrarTypeFilter
                          const matchesStatus = !registrarStatusFilter || req.status === registrarStatusFilter

                          return matchesSearch && matchesSchool && matchesType && matchesStatus
                        })
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-slate-400 italic text-xs font-semibold bg-slate-50/50">
                              No matching recent administrative requests found.
                            </td>
                          </tr>
                        )
                      }

                      return filtered.map((req, idx) => {
                        const statusClass = getRegistrarStatusBadgeClass(req.status)
                        return (
                          <tr key={idx} className="hover:bg-slate-50/40 transition">
                            <td className="p-3.5 text-slate-500 font-bold whitespace-nowrap">{formatRegistrarDisplayDate(req.date)}</td>
                            <td className="p-3.5 text-slate-900 font-extrabold">{req.school}</td>
                            <td className="p-3.5 text-slate-500 font-semibold">{req.dept}</td>
                            <td className="p-3.5 text-slate-500 font-semibold">{req.guide}</td>
                            <td className="p-3.5 text-slate-950 font-extrabold">{req.scholar}</td>
                            <td className="p-3.5">
                              <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-bold bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10 uppercase tracking-wide whitespace-nowrap">
                                {req.type}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-black border uppercase tracking-wide whitespace-nowrap ${statusClass}`}>
                                {req.status}
                              </span>
                            </td>
                          </tr>
                        )
                      })
                    })()}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {view === 'registration' && (
          activeRegistrarRegistration ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveRegistrarRegistration(null)
                    setRegistrarRegRemarksText('')
                    setRegistrarRegUploadedFile(null)
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Registration Requests
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scholar Registration Verification</span>
              </div>

              {/* Scholar Information Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Scholar Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarRegistration.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registration Number</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarRegistration.regNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarRegistration.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarRegistration.department}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Application Date</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarRegistration.applicationDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Verification Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block mt-0.5 ${
                      activeRegistrarRegistration.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      activeRegistrarRegistration.status === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                      'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                    }`}>
                      {activeRegistrarRegistration.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Registration Documents */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Registration Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Admission Letter */}
                  <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex flex-col justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Document Type</span>
                      <span className="font-extrabold text-slate-800 text-[11px] block mt-0.5 truncate">{activeRegistrarRegistration.admissionLetter}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block mt-1">Official PhD Admission Letter</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading: ${activeRegistrarRegistration.admissionLetter}`)}
                      className="w-full mt-2 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition flex items-center justify-center gap-1 font-bold text-[9px] uppercase px-3 shadow-sm"
                      type="button"
                    >
                      <Download className="h-3 w-3" />
                      Download Admission Letter
                    </button>
                  </div>

                  {/* Eligibility Documents */}
                  <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex flex-col justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Document Type</span>
                      <span className="font-extrabold text-slate-800 text-[11px] block mt-0.5 truncate">{activeRegistrarRegistration.eligibilityDocs}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block mt-1">Eligibility Certificates & Transcripts</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading: ${activeRegistrarRegistration.eligibilityDocs}`)}
                      className="w-full mt-2 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition flex items-center justify-center gap-1 font-bold text-[9px] uppercase px-3 shadow-sm"
                      type="button"
                    >
                      <Download className="h-3 w-3" />
                      Download Eligibility Docs
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Verified Document Widget */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Upload Verified Document</h3>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Upload Registrar Verified Registration Document (PDF)
                  </label>
                  
                  {registrarRegUploadedFile ? (
                    <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in duration-100">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-855 text-xs">{registrarRegUploadedFile.name}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold">Verified document uploaded successfully.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setRegistrarRegUploadedFile(null)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 transition uppercase tracking-wider"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 hover:border-dsu-maroon rounded-2xl p-6 text-center transition bg-slate-50/50">
                      <input
                        type="file"
                        id="registrar-reg-upload-input"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              alert('File size must be less than 10MB.')
                              return
                            }
                            setRegistrarRegUploadedFile(file)
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="registrar-reg-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-slate-400 animate-bounce" />
                        <span className="font-bold text-[#7B1E3A] hover:underline text-xs">
                          Click to upload verified registration document PDF
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          PDF files only, Max size 10MB
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Remarks and Notes</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={registrarRegRemarksText}
                    onChange={(e) => setRegistrarRegRemarksText(e.target.value)}
                    placeholder="Enter registration verification comments, approval notes, or reasons for returning the request..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({registrarRegRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Verification Actions</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    Approve registration or return request to scholar for correction.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (registrarRegRemarksText.trim() === '') {
                        alert("Remarks are required when returning a registration request.")
                        return
                      }
                      setRegistrarRegistrations(prev => prev.map(reg => 
                        reg.id === activeRegistrarRegistration.id 
                          ? { 
                              ...reg, 
                              status: 'Returned', 
                              remarks: registrarRegRemarksText.trim(), 
                              verifiedDoc: registrarRegUploadedFile ? registrarRegUploadedFile.name : reg.verifiedDoc
                            } 
                          : reg
                      ))
                      alert(`Registration request returned to ${activeRegistrarRegistration.scholarName}.`)
                      setActiveRegistrarRegistration(null)
                      setRegistrarRegRemarksText('')
                      setRegistrarRegUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <X className="h-3.5 w-3.5" />
                    Return Request
                  </button>

                  <button
                    onClick={() => {
                      if (!registrarRegUploadedFile && !activeRegistrarRegistration.verifiedDoc) {
                        alert("Please upload the verified registration document PDF first.")
                        return
                      }
                      setRegistrarRegistrations(prev => prev.map(reg => 
                        reg.id === activeRegistrarRegistration.id 
                          ? { 
                              ...reg, 
                              status: 'Approved', 
                              remarks: registrarRegRemarksText.trim(), 
                              verifiedDoc: registrarRegUploadedFile ? registrarRegUploadedFile.name : reg.verifiedDoc
                            } 
                          : reg
                      ))
                      alert(`Registration request approved for ${activeRegistrarRegistration.scholarName}.`)
                      setActiveRegistrarRegistration(null)
                      setRegistrarRegRemarksText('')
                      setRegistrarRegUploadedFile(null)
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve Request
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Scholar Registration Approvals</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Verify, validate, and issue official PhD registrations</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">Registration Number</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Application Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {registrarRegistrations.map((reg, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{reg.scholarName}</td>
                        <td className="p-4 font-bold">{reg.regNumber}</td>
                        <td className="p-4">{reg.school}</td>
                        <td className="p-4">{reg.department}</td>
                        <td className="p-4 text-slate-500">{reg.applicationDate}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            reg.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            reg.status === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                            'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                          }`}>
                            {reg.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveRegistrarRegistration(reg)
                              setRegistrarRegRemarksText(reg.remarks || '')
                              setRegistrarRegUploadedFile(reg.verifiedDoc ? { name: reg.verifiedDoc } : null)
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {view === 'enrollment' && (
          activeRegistrarEnrollment ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveRegistrarEnrollment(null)
                    setRegistrarEnrollRemarksText('')
                    setRegistrarEnrollUploadedFile(null)
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Enrollment Requests
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scholar Enrollment Confirmation</span>
              </div>

              {/* Scholar Information Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Registration Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarEnrollment.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registration Number</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarEnrollment.regNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarEnrollment.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarEnrollment.department}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Enrollment Date</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarEnrollment.enrollmentDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Enrollment Status / Verification Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block mt-0.5 ${
                      activeRegistrarEnrollment.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      activeRegistrarEnrollment.status === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                      'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                    }`}>
                      {activeRegistrarEnrollment.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Enrollment Documents */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Enrollment Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Enrollment Application Form */}
                  <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex flex-col justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Document Type</span>
                      <span className="font-extrabold text-slate-800 text-[11px] block mt-0.5 truncate">{activeRegistrarEnrollment.enrollmentDocs}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block mt-1">Official PhD Enrollment Request Dossier</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading: ${activeRegistrarEnrollment.enrollmentDocs}`)}
                      className="w-full mt-2 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition flex items-center justify-center gap-1 font-bold text-[9px] uppercase px-3 shadow-sm"
                      type="button"
                    >
                      <Download className="h-3 w-3" />
                      Download Enrollment Dossier
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Signed Confirmation */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Upload Signed Confirmation</h3>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Upload Registrar Signed Enrollment Confirmation Letter (PDF)
                  </label>
                  
                  {registrarEnrollUploadedFile ? (
                    <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in duration-100">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-855 text-xs">{registrarEnrollUploadedFile.name}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold">Signed enrollment confirmation letter uploaded successfully.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setRegistrarEnrollUploadedFile(null)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 transition uppercase tracking-wider"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 hover:border-dsu-maroon rounded-2xl p-6 text-center transition bg-slate-50/50">
                      <input
                        type="file"
                        id="registrar-enroll-upload-input"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              alert('File size must be less than 10MB.')
                              return
                            }
                            setRegistrarEnrollUploadedFile(file)
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="registrar-enroll-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-slate-400 animate-bounce" />
                        <span className="font-bold text-[#7B1E3A] hover:underline text-xs">
                          Click to upload signed enrollment letter PDF
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          PDF files only, Max size 10MB
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Remarks and Notes</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={registrarEnrollRemarksText}
                    onChange={(e) => setRegistrarEnrollRemarksText(e.target.value)}
                    placeholder="Enter enrollment confirmation comments, observations, recommendations, or reasons for returning the request..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({registrarEnrollRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Enrollment Actions</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    Confirm scholar enrollment or return request to scholar for correction.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (registrarEnrollRemarksText.trim() === '') {
                        alert("Remarks are required when returning an enrollment request.")
                        return
                      }
                      setRegistrarEnrollments(prev => prev.map(enroll => 
                        enroll.id === activeRegistrarEnrollment.id 
                          ? { 
                              ...enroll, 
                              status: 'Returned', 
                              remarks: registrarEnrollRemarksText.trim(), 
                              signedDoc: registrarEnrollUploadedFile ? registrarEnrollUploadedFile.name : enroll.signedDoc
                            } 
                          : enroll
                      ))
                      alert(`Enrollment request returned to ${activeRegistrarEnrollment.scholarName}.`)
                      setActiveRegistrarEnrollment(null)
                      setRegistrarEnrollRemarksText('')
                      setRegistrarEnrollUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <X className="h-3.5 w-3.5" />
                    Return Request
                  </button>

                  <button
                    onClick={() => {
                      if (!registrarEnrollUploadedFile && !activeRegistrarEnrollment.signedDoc) {
                        alert("Please upload the signed enrollment confirmation letter PDF first.")
                        return
                      }
                      setRegistrarEnrollments(prev => prev.map(enroll => 
                        enroll.id === activeRegistrarEnrollment.id 
                          ? { 
                              ...enroll, 
                              status: 'Confirmed', 
                              remarks: registrarEnrollRemarksText.trim(), 
                              signedDoc: registrarEnrollUploadedFile ? registrarEnrollUploadedFile.name : enroll.signedDoc
                            } 
                          : enroll
                      ))
                      alert(`Enrollment request confirmed for ${activeRegistrarEnrollment.scholarName}.`)
                      setActiveRegistrarEnrollment(null)
                      setRegistrarEnrollRemarksText('')
                      setRegistrarEnrollUploadedFile(null)
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Confirm Enrollment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Scholar Enrollment Confirmations</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Validate and formally confirm student enrollment in the portal</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">Registration Number</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Enrollment Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {registrarEnrollments.map((enroll, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{enroll.scholarName}</td>
                        <td className="p-4 font-bold">{enroll.regNumber}</td>
                        <td className="p-4">{enroll.school}</td>
                        <td className="p-4">{enroll.department}</td>
                        <td className="p-4 text-slate-500">{enroll.enrollmentDate}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            enroll.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            enroll.status === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                            'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                          }`}>
                            {enroll.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveRegistrarEnrollment(enroll)
                              setRegistrarEnrollRemarksText(enroll.remarks || '')
                              setRegistrarEnrollUploadedFile(enroll.signedDoc ? { name: enroll.signedDoc } : null)
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {view === 'records' && (
          activeRegistrarRecord ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveRegistrarRecord(null)
                    setRegistrarRecordRemarksText('')
                    setRegistrarRecordUploadedFile(null)
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Academic Records
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic Record Verification</span>
              </div>

              {/* Academic Record Details Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Academic Record Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarRecord.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registration Number</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarRecord.regNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarRecord.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarRecord.department}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Record Type</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarRecord.recordType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Record Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block mt-0.5 ${
                      activeRegistrarRecord.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      activeRegistrarRecord.status === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                      'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                    }`}>
                      {activeRegistrarRecord.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submitted Documents */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Submitted Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex flex-col justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Document Name</span>
                      <span className="font-extrabold text-slate-800 text-[11px] block mt-0.5 truncate">{activeRegistrarRecord.submittedDocs}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block mt-1">Official gradesheet or comprehensive transcript submission file.</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading: ${activeRegistrarRecord.submittedDocs}`)}
                      className="w-full mt-2 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition flex items-center justify-center gap-1 font-bold text-[9px] uppercase px-3 shadow-sm"
                      type="button"
                    >
                      <Download className="h-3 w-3" />
                      Download Submitted Document
                    </button>
                  </div>
                </div>
              </div>

              {/* Previous Record History */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Previous Record History / Audited Coursework Grades
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                  <table className="min-w-full text-left text-slate-700 text-xs">
                    <thead className="bg-[#001c4f] text-white uppercase text-[9px] font-bold tracking-wider">
                      <tr>
                        <th className="p-3">Semester</th>
                        <th className="p-3">Coursework Module</th>
                        <th className="p-3 text-center">Grade Secured</th>
                        <th className="p-3 text-center">Credits Audited</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-[11px]">
                      {activeRegistrarRecord.history && activeRegistrarRecord.history.length > 0 ? (
                        activeRegistrarRecord.history.map((hist, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/40">
                            <td className="p-3 text-slate-500 font-bold">{hist.semester}</td>
                            <td className="p-3 font-extrabold text-slate-800">{hist.coursework}</td>
                            <td className="p-3 text-center text-dsu-maroon font-black">{hist.grade}</td>
                            <td className="p-3 text-center text-slate-600">{hist.credits} Credits</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-4 text-center font-bold text-slate-400">No coursework history found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Upload Verified Copy */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Upload Verified Copy</h3>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Upload Verified copy of Academic Record / Ledger (PDF)
                  </label>
                  
                  {registrarRecordUploadedFile ? (
                    <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in duration-100">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-855 text-xs">{registrarRecordUploadedFile.name}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold">Verified copy uploaded successfully.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setRegistrarRecordUploadedFile(null)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 transition uppercase tracking-wider"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 hover:border-dsu-maroon rounded-2xl p-6 text-center transition bg-slate-50/50">
                      <input
                        type="file"
                        id="registrar-record-upload-input"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              alert('File size must be less than 10MB.')
                              return
                            }
                            setRegistrarRecordUploadedFile(file)
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="registrar-record-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-slate-400 animate-bounce" />
                        <span className="font-bold text-[#7B1E3A] hover:underline text-xs">
                          Click to upload verified copy PDF
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          PDF files only, Max size 10MB
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Verification Notes</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={registrarRecordRemarksText}
                    onChange={(e) => setRegistrarRecordRemarksText(e.target.value)}
                    placeholder="Enter academic record verification remarks, audits, discrepancies found, or justification notes..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({registrarRecordRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Academic Record Actions</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    Approve and stamp the coursework ledger, or return it to the coordinator.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (registrarRecordRemarksText.trim() === '') {
                        alert("Remarks are required when returning an academic record request.")
                        return
                      }
                      setRegistrarAcademicRecords(prev => prev.map(rec => 
                        rec.id === activeRegistrarRecord.id 
                          ? { 
                              ...rec, 
                              status: 'Returned', 
                              remarks: registrarRecordRemarksText.trim(), 
                              verifiedCopy: registrarRecordUploadedFile ? registrarRecordUploadedFile.name : rec.verifiedCopy
                            } 
                          : rec
                      ))
                      alert(`Academic record request returned to ${activeRegistrarRecord.scholarName}.`)
                      setActiveRegistrarRecord(null)
                      setRegistrarRecordRemarksText('')
                      setRegistrarRecordUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <X className="h-3.5 w-3.5" />
                    Return Request
                  </button>

                  <button
                    onClick={() => {
                      if (!registrarRecordUploadedFile && !activeRegistrarRecord.verifiedCopy) {
                        alert("Please upload the verified copy PDF first.")
                        return
                      }
                      setRegistrarAcademicRecords(prev => prev.map(rec => 
                        rec.id === activeRegistrarRecord.id 
                          ? { 
                              ...rec, 
                              status: 'Approved', 
                              remarks: registrarRecordRemarksText.trim(), 
                              verifiedCopy: registrarRecordUploadedFile ? registrarRecordUploadedFile.name : rec.verifiedCopy
                            } 
                          : rec
                      ))
                      alert(`Academic record request approved for ${activeRegistrarRecord.scholarName}.`)
                      setActiveRegistrarRecord(null)
                      setRegistrarRecordRemarksText('')
                      setRegistrarRecordUploadedFile(null)
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve Request
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Scholar Academic Records</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Manage and verify student coursework credits and comprehensive viva transcripts</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">Registration Number</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Record Type</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {registrarAcademicRecords.map((rec, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{rec.scholarName}</td>
                        <td className="p-4 font-bold">{rec.regNumber}</td>
                        <td className="p-4">{rec.school}</td>
                        <td className="p-4">{rec.department}</td>
                        <td className="p-4 text-slate-500 font-bold">{rec.recordType}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            rec.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            rec.status === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                            'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                          }`}>
                            {rec.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveRegistrarRecord(rec)
                              setRegistrarRecordRemarksText(rec.remarks || '')
                              setRegistrarRecordUploadedFile(rec.verifiedCopy ? { name: rec.verifiedCopy } : null)
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {view === 'degree' && (
          activeRegistrarDegree ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveRegistrarDegree(null)
                    setRegistrarDegreeRemarksText('')
                    setRegistrarDegreeUploadedFile(null)
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Degree Processing
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Degree Processing Workspace</span>
              </div>

              {/* Scholar Details Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Scholar Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarDegree.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registration Number</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarDegree.regNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarDegree.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarDegree.department}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Submission Date</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarDegree.submissionDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Degree Processing Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block mt-0.5 ${
                      activeRegistrarDegree.degreeStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                      activeRegistrarDegree.degreeStatus === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                      'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                    }`}>
                      {activeRegistrarDegree.degreeStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Final Thesis Details Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Final Thesis Details
                </h3>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Thesis Title</span>
                  <span className="text-slate-800 font-extrabold text-sm block mt-0.5 leading-snug">{activeRegistrarDegree.finalThesisTitle}</span>
                </div>
                <div className="mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Abstract Summary</span>
                  <p className="text-slate-650 font-medium text-[11px] mt-1 leading-relaxed">{activeRegistrarDegree.thesisAbstract}</p>
                </div>
              </div>

              {/* Approval History Timeline */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  PhD Milestone Approval History
                </h3>
                <div className="relative border-l border-slate-200 ml-3.5 space-y-5 my-2">
                  {activeRegistrarDegree.approvalHistory && activeRegistrarDegree.approvalHistory.map((ap, idx) => (
                    <div key={idx} className="relative pl-6 animate-in slide-in-from-left duration-150">
                      <div className="absolute -left-2 top-0.5 h-4 w-4 rounded-full border-2 border-white bg-emerald-505 flex items-center justify-center bg-[#7B1E3A] text-[7px] font-bold text-white shadow-sm">
                        {idx + 1}
                      </div>
                      <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-3 rounded-xl transition">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-extrabold text-slate-800 text-xs">{ap.milestone}</span>
                          <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">
                            {ap.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold mt-1.5">
                          <span>Verified by: <span className="text-[#001c4f]">{ap.approvedBy}</span></span>
                          <span>•</span>
                          <span>Date: {ap.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Degree Processing Documents */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Degree Processing Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeRegistrarDegree.processingDocs && activeRegistrarDegree.processingDocs.map((doc, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex flex-col justify-between gap-3">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{doc.type}</span>
                        <span className="font-extrabold text-slate-800 text-[11px] block mt-0.5 truncate">{doc.name}</span>
                        <span className="text-[10px] font-semibold text-slate-500 block mt-1">Required compliance checklist document for PhD Award.</span>
                      </div>
                      <button
                        onClick={() => alert(`Downloading: ${doc.name}`)}
                        className="w-full mt-2 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition flex items-center justify-center gap-1 font-bold text-[9px] uppercase px-3 shadow-sm"
                        type="button"
                      >
                        <Download className="h-3 w-3" />
                        Download Document
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload Processed Documents */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Upload Processed Documents</h3>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Upload Processed provisional Degree Certificate / Official notification (PDF)
                  </label>
                  
                  {registrarDegreeUploadedFile ? (
                    <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in duration-100">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-855 text-xs">{registrarDegreeUploadedFile.name}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold">Processed document uploaded successfully.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setRegistrarDegreeUploadedFile(null)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 transition uppercase tracking-wider"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 hover:border-dsu-maroon rounded-2xl p-6 text-center transition bg-slate-50/50">
                      <input
                        type="file"
                        id="registrar-degree-upload-input"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              alert('File size must be less than 10MB.')
                              return
                            }
                            setRegistrarDegreeUploadedFile(file)
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="registrar-degree-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-slate-400 animate-bounce" />
                        <span className="font-bold text-[#7B1E3A] hover:underline text-xs">
                          Click to upload processed degree certificate PDF
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          PDF files only, Max size 10MB
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Processing Notes</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={registrarDegreeRemarksText}
                    onChange={(e) => setRegistrarDegreeRemarksText(e.target.value)}
                    placeholder="Enter degree processing notes, provisional certificate numbers, convocation registry records, or return reasons..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({registrarDegreeRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Degree Processing Actions</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    Authorize degree processing and issue certificate registry, or return request if incomplete.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (registrarDegreeRemarksText.trim() === '') {
                        alert("Remarks are required when returning a degree processing request.")
                        return
                      }
                      setRegistrarDegrees(prev => prev.map(deg => 
                        deg.id === activeRegistrarDegree.id 
                          ? { 
                              ...deg, 
                              degreeStatus: 'Returned', 
                              remarks: registrarDegreeRemarksText.trim(), 
                              processedDoc: registrarDegreeUploadedFile ? registrarDegreeUploadedFile.name : deg.processedDoc
                            } 
                          : deg
                      ))
                      alert(`Degree processing request returned for ${activeRegistrarDegree.scholarName}.`)
                      setActiveRegistrarDegree(null)
                      setRegistrarDegreeRemarksText('')
                      setRegistrarDegreeUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <X className="h-3.5 w-3.5" />
                    Return Request
                  </button>

                  <button
                    onClick={() => {
                      if (!registrarDegreeUploadedFile && !activeRegistrarDegree.processedDoc) {
                        alert("Please upload the processed degree certificate PDF first.")
                        return
                      }
                      setRegistrarDegrees(prev => prev.map(deg => 
                        deg.id === activeRegistrarDegree.id 
                          ? { 
                              ...deg, 
                              degreeStatus: 'Approved', 
                              remarks: registrarDegreeRemarksText.trim(), 
                              processedDoc: registrarDegreeUploadedFile ? registrarDegreeUploadedFile.name : deg.processedDoc
                            } 
                          : deg
                      ))
                      alert(`Degree processing approved for ${activeRegistrarDegree.scholarName}.`)
                      setActiveRegistrarDegree(null)
                      setRegistrarDegreeRemarksText('')
                      setRegistrarDegreeUploadedFile(null)
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve Degree Processing
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Degree Processing</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Process scholars who have successfully completed all PhD milestones & requirements</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">Registration Number</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Degree Status</th>
                      <th className="p-4">Submission Date</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {registrarDegrees.map((deg, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{deg.scholarName}</td>
                        <td className="p-4 font-bold">{deg.regNumber}</td>
                        <td className="p-4">{deg.school}</td>
                        <td className="p-4">{deg.department}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            deg.degreeStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            deg.degreeStatus === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                            'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                          }`}>
                            {deg.degreeStatus}
                          </span>
                        </td>
                        <td className="p-4 text-slate-550 font-bold">{deg.submissionDate}</td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveRegistrarDegree(deg)
                              setRegistrarDegreeRemarksText(deg.remarks || '')
                              setRegistrarDegreeUploadedFile(deg.processedDoc ? { name: deg.processedDoc } : null)
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {view === 'award' && (
          activeRegistrarAward ? (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              {/* Header with back navigation */}
              <div className="flex items-center justify-between border-b pb-3">
                <button 
                  onClick={() => {
                    setActiveRegistrarAward(null)
                    setRegistrarAwardRemarksText('')
                    setRegistrarAwardUploadedFile(null)
                  }}
                  className="flex items-center gap-1.5 font-bold text-dsu-maroon hover:text-red-800 transition uppercase tracking-wider text-[10px]"
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Award Documentation
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Award Documentation Workspace</span>
              </div>

              {/* Scholar Details Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Scholar Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scholar Name</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarAward.scholarName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registration Number</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarAward.regNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarAward.school}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarAward.department}</span>
                  </div>
                </div>
              </div>

              {/* Degree Award & Final Approval Details */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Degree Award & Final Approval Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Degree Award Details</span>
                    <div className="space-y-1 font-semibold text-slate-700 text-xs">
                      <div className="flex justify-between">
                        <span>Conferred Status:</span>
                        <span className="text-emerald-600 font-extrabold">Ready for Conferral</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Academic Session:</span>
                        <span className="text-slate-900 font-extrabold">2025-2026</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Convocation Batch:</span>
                        <span className="text-slate-900 font-extrabold">12th Convocation</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Final Approval Information</span>
                    <div className="space-y-1 font-semibold text-slate-700 text-xs">
                      <div className="flex justify-between">
                        <span>Approval Body:</span>
                        <span className="text-slate-900 font-extrabold">{activeRegistrarAward.finalApprover}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Approval Date:</span>
                        <span className="text-slate-900 font-extrabold">{activeRegistrarAward.finalApprovalDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Award Status:</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-block ${
                          activeRegistrarAward.awardStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                          activeRegistrarAward.awardStatus === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                          'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                        }`}>
                          {activeRegistrarAward.awardStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Certificate Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Certificate Number</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5 font-mono">{activeRegistrarAward.certificateDetails.certificateNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Convocation Date</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5">{activeRegistrarAward.certificateDetails.convocationDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registry Folio Number</span>
                    <span className="text-slate-905 font-bold text-sm block mt-0.5 font-mono">{activeRegistrarAward.certificateDetails.registryFolio}</span>
                  </div>
                </div>
              </div>

              {/* Award Documents List */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">
                  Award Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeRegistrarAward.awardDocs && activeRegistrarAward.awardDocs.map((doc, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex flex-col justify-between gap-3">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{doc.type}</span>
                        <span className="font-extrabold text-slate-800 text-[11px] block mt-0.5 truncate">{doc.name}</span>
                        <span className="text-[10px] font-semibold text-slate-500 block mt-1">Conferred degree validation scroll document.</span>
                      </div>
                      <button
                        onClick={() => alert(`Downloading: ${doc.name}`)}
                        className="w-full mt-2 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition flex items-center justify-center gap-1 font-bold text-[9px] uppercase px-3 shadow-sm"
                        type="button"
                      >
                        <Download className="h-3 w-3" />
                        Download Document
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload Signed Documents */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide border-b pb-2">Upload Signed Documents</h3>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Upload Conferred Signed Degree Scroll / Senate Award Endorsement (PDF)
                  </label>
                  
                  {registrarAwardUploadedFile ? (
                    <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in duration-100">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-855 text-xs">{registrarAwardUploadedFile.name}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold">Signed document uploaded successfully.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setRegistrarAwardUploadedFile(null)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 transition uppercase tracking-wider"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 hover:border-dsu-maroon rounded-2xl p-6 text-center transition bg-slate-50/50">
                      <input
                        type="file"
                        id="registrar-award-upload-input"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              alert('File size must be less than 10MB.')
                              return
                            }
                            setRegistrarAwardUploadedFile(file)
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="registrar-award-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-slate-400 animate-bounce" />
                        <span className="font-bold text-[#7B1E3A] hover:underline text-xs">
                          Click to upload signed degree scroll PDF
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          PDF files only, Max size 10MB
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-slate-750 uppercase tracking-wider">Remarks / Award Processing Notes</h4>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={registrarAwardRemarksText}
                    onChange={(e) => setRegistrarAwardRemarksText(e.target.value)}
                    placeholder="Enter final award verification comments, Senate observations, Convocation ledger notes, or return reasons..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A] transition font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                    ({registrarAwardRemarksText.length}/500)
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/55 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Award Certification Actions</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    Endorse degree conferral documentation or return for registry rectifications.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (registrarAwardRemarksText.trim() === '') {
                        alert("Remarks are required when returning an award documentation request.")
                        return
                      }
                      setRegistrarAwards(prev => prev.map(awd => 
                        awd.id === activeRegistrarAward.id 
                          ? { 
                              ...awd, 
                              awardStatus: 'Returned', 
                              remarks: registrarAwardRemarksText.trim(), 
                              signedDoc: registrarAwardUploadedFile ? registrarAwardUploadedFile.name : awd.signedDoc
                            } 
                          : awd
                      ))
                      alert(`Award documentation returned for ${activeRegistrarAward.scholarName}.`)
                      setActiveRegistrarAward(null)
                      setRegistrarAwardRemarksText('')
                      setRegistrarAwardUploadedFile(null)
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <X className="h-3.5 w-3.5" />
                    Return Request
                  </button>

                  <button
                    onClick={() => {
                      if (!registrarAwardUploadedFile && !activeRegistrarAward.signedDoc) {
                        alert("Please upload the signed degree scroll PDF first.")
                        return
                      }
                      setRegistrarAwards(prev => prev.map(awd => 
                        awd.id === activeRegistrarAward.id 
                          ? { 
                              ...awd, 
                              awardStatus: 'Approved', 
                              remarks: registrarAwardRemarksText.trim(), 
                              signedDoc: registrarAwardUploadedFile ? registrarAwardUploadedFile.name : awd.signedDoc
                            } 
                          : awd
                      ))
                      alert(`Award documentation approved for ${activeRegistrarAward.scholarName}.`)
                      setActiveRegistrarAward(null)
                      setRegistrarAwardRemarksText('')
                      setRegistrarAwardUploadedFile(null)
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition text-[10px] shadow-sm flex items-center gap-1"
                    type="button"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve Documentation
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Award Documentation</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Manage final PhD award documentation and certificate processing</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                <table className="min-w-full text-left text-slate-700">
                  <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Scholar Name</th>
                      <th className="p-4">Registration Number</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Award Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {registrarAwards.map((awd, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 font-black text-dsu-maroon">{awd.scholarName}</td>
                        <td className="p-4 font-bold">{awd.regNumber}</td>
                        <td className="p-4">{awd.school}</td>
                        <td className="p-4">{awd.department}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            awd.awardStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                            awd.awardStatus === 'Returned' ? 'bg-rose-50 text-rose-700 border-rose-250' :
                            'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                          }`}>
                            {awd.awardStatus}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setActiveRegistrarAward(awd)
                              setRegistrarAwardRemarksText(awd.remarks || '')
                              setRegistrarAwardUploadedFile(awd.signedDoc ? { name: awd.signedDoc } : null)
                            }}
                            className="px-3 py-1.5 bg-[#7B1E3A] hover:bg-red-800 text-white rounded-lg transition font-bold uppercase tracking-wider text-[9px] shadow-sm flex items-center gap-1"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}
      </div>
    )
  }

  // 8. Vice Chancellor Dashboard Views
  if (role === 'vc') {
    const getVcApprovalsList = () => {
      const list = []
      
      vcExaminers.forEach(item => {
        list.push({
          id: `exam-${item.id}`,
          date: item.date || '15-Jun-2026',
          school: item.school || 'School of Computing',
          department: item.department || 'CSE',
          scholar: item.scholar,
          guide: item.guide || 'Dr. Kumar',
          type: 'Examiner Panel Approval',
          status: item.status === 'Pending VC Approval' ? 'Pending' : (item.status === 'Examiner Panel Signed' ? 'Approved' : 'Denied'),
          original: item,
          source: 'examiners'
        })
      })

      vcEvaluations.forEach(item => {
        list.push({
          id: `eval-${item.id}`,
          date: item.date || '18-Jun-2026',
          school: item.school || 'School of Engineering',
          department: item.department || 'ECE',
          scholar: item.scholar,
          guide: item.guide || 'Dr. Ravi',
          type: 'Thesis Evaluation Approval',
          status: item.status === 'Pending Defense Sign-off' ? 'Pending' : (item.status === 'Defense Sign-off Completed' ? 'Approved' : 'Denied'),
          original: item,
          source: 'evaluations'
        })
      })

      vcFinalDegrees.forEach(item => {
        list.push({
          id: `deg-${item.id}`,
          date: item.date || '22-Jun-2026',
          school: item.school || 'School of Management',
          department: item.department || 'MBA',
          scholar: item.scholar,
          guide: item.guide || 'Dr. Priya',
          type: 'Final PhD Approval',
          status: item.status === 'Pending VC Degree Sanction' ? 'Pending' : (item.status === 'Approved' ? 'Approved' : 'Denied'),
          original: item,
          source: 'degrees'
        })
      })

      // Sort: Pending first, then by date descending/latest first
      return list.sort((a, b) => {
        if (a.status === 'Pending' && b.status !== 'Pending') return -1
        if (a.status !== 'Pending' && b.status === 'Pending') return 1
        return new Date(b.date) - new Date(a.date)
      })
    }

    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        {view === 'home' && !activeVcApproval && (
          <section className="bg-gradient-to-r from-dsu-maroon to-red-900 p-6 rounded-2xl text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-black uppercase tracking-wider text-white">WELCOME, DR. R. KUMAR</div>
              <div className="text-sm font-bold text-red-100 uppercase tracking-widest mt-1">Vice Chancellor</div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-[10px] font-bold uppercase tracking-widest text-red-200">System Role</div>
              <div className="text-sm font-black text-amber-300 uppercase tracking-widest mt-0.5">PhD Research Portal</div>
            </div>
          </section>
        )}

        {/* Summary Cards */}
        {!activeVcApproval && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Pending Examiner Panel Approvals" value={vcExaminers.filter(e => e.status === 'Pending VC Approval').length.toString()} />
            <StatCard title="Pending Thesis Evaluation Approvals" value={vcEvaluations.filter(e => e.status === 'Pending Defense Sign-off').length.toString()} />
            <StatCard title="Pending Final PhD Approvals" value={vcFinalDegrees.filter(d => d.status === 'Pending VC Degree Sanction').length.toString()} />
          </section>
        )}

        {/* 1. Dashboard View */}
        {view === 'home' && !activeVcApproval && (
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide border-b pb-2 mb-1">Upcoming Approval Activities</h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Clearances and sanctions awaiting Vice Chancellor executive signature</p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">School</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Scholar Name</th>
                    <th className="p-4">Guide Name</th>
                    <th className="p-4">Approval Type</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {getVcApprovalsList()
                    .filter(item => item.status === 'Pending')
                    .map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="p-4 text-slate-500 font-bold">{item.date}</td>
                        <td className="p-4 text-slate-700">{item.school}</td>
                        <td className="p-4 text-slate-700">{item.department}</td>
                        <td className="p-4 font-bold text-slate-900">{item.scholar}</td>
                        <td className="p-4 text-slate-700">{item.guide}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10">
                            {item.type}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded text-[10px] font-bold">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 2. Approvals View */}
        {view === 'approvals' && !activeVcApproval && (
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Vice Chancellor Approvals</h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Filter and authorize pending doctoral clearances</p>
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl">
                {[
                  { id: 'all', label: 'All Approvals' },
                  { id: 'examiner', label: 'Examiner Panel' },
                  { id: 'thesis', label: 'Thesis Evaluation' },
                  { id: 'degree', label: 'Final PhD' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setVcApprovalCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                      vcApprovalCategory === tab.id
                        ? 'bg-dsu-maroon text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input Section */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={vcSearchQuery}
                onChange={(e) => setVcSearchQuery(e.target.value)}
                placeholder="Search by School, Department, Guide, or Scholar"
                className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-slate-800 outline-none focus:border-[#7B1E3A] focus:bg-white transition"
              />
            </div>

            {/* Pending Approvals Table */}
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
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {(() => {
                    const filteredList = getVcApprovalsList().filter(item => {
                      // Only show Pending approvals on this page as per requirements
                      if (item.status !== 'Pending') return false

                      // Category filter
                      if (vcApprovalCategory === 'examiner' && item.type !== 'Examiner Panel Approval') return false
                      if (vcApprovalCategory === 'thesis' && item.type !== 'Thesis Evaluation Approval') return false
                      if (vcApprovalCategory === 'degree' && item.type !== 'Final PhD Approval') return false

                      // Search filter
                      const q = vcSearchQuery.toLowerCase()
                      return (
                        item.school.toLowerCase().includes(q) ||
                        item.department.toLowerCase().includes(q) ||
                        item.guide.toLowerCase().includes(q) ||
                        item.scholar.toLowerCase().includes(q)
                      )
                    })

                    if (filteredList.length === 0) {
                      return (
                        <tr>
                          <td colSpan="8" className="p-8 text-center text-slate-400 font-semibold">
                            No pending clearances found.
                          </td>
                        </tr>
                      )
                    }

                    return filteredList.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="p-4 text-slate-500 font-bold">{item.date}</td>
                        <td className="p-4 text-slate-700">{item.school}</td>
                        <td className="p-4 text-slate-700">{item.department}</td>
                        <td className="p-4 text-slate-700">{item.guide}</td>
                        <td className="p-4 font-bold text-slate-900">{item.scholar}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#7B1E3A]/5 text-[#7B1E3A] border border-[#7B1E3A]/10">
                            {item.type}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded text-[10px] font-bold">
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setActiveVcApproval(item)}
                            className="text-[#7B1E3A] font-extrabold hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  })()}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 3. Approval Details View */}
        {activeVcApproval && (() => {
          const scholarName = activeVcApproval.scholar
          
          // Fetch previous history
          const getScholarHistory = (name) => {
            if (scholarApprovalHistories[name] && scholarApprovalHistories[name].length > 0) {
              return scholarApprovalHistories[name]
            }
            return [
              { phase: 'First DAC', status: 'Approved', date: '10-Jan-2026', documents: ['dac_report.pdf', 'first_dac_mom.pdf'] },
              { phase: 'Comprehensive Viva', status: 'Approved', date: '15-Apr-2026', documents: ['viva_report.pdf'] },
              { phase: 'Colloquium', status: 'Approved', date: '12-Jul-2026', documents: ['colloquium_minutes.pdf'] },
              { phase: 'Synopsis', status: 'Approved', date: '20-Sep-2026', documents: ['synopsis_copy.pdf'] }
            ]
          }
          const history = getScholarHistory(scholarName)

          // Get authority helper
          const getApprovedBy = (phase) => {
            if (phase.includes('First DAC') || phase.includes('Coursework') || phase.includes('First DAC Meeting')) return 'Dean of School'
            return 'Dean of Research'
          }

          // Mock current verification documents
          const getVerificationDocs = (type, date) => {
            switch (type) {
              case 'Examiner Panel Approval':
                return [
                  { name: 'Examiner Panel Report', date: date || '18-Jun-2026' },
                  { name: 'DAC Recommendation', date: date || '18-Jun-2026' },
                  { name: 'Minutes of Meeting', date: date || '18-Jun-2026' }
                ]
              case 'Thesis Evaluation Approval':
                return [
                  { name: 'Evaluation Reports Summary', date: date || '18-Jun-2026' },
                  { name: 'Plagiarism Clearance Certificate', date: date || '18-Jun-2026' },
                  { name: 'Synopsis Copy', date: date || '18-Jun-2026' }
                ]
              case 'Final PhD Approval':
                return [
                  { name: 'Thesis Defense Report', date: date || '18-Jun-2026' },
                  { name: 'Coursework Transcript', date: date || '18-Jun-2026' },
                  { name: 'External Evaluator Sign-off', date: date || '18-Jun-2026' }
                ]
              default:
                return [
                  { name: 'Verification Document 1', date: date || '18-Jun-2026' },
                  { name: 'Minutes of Meeting', date: date || '18-Jun-2026' }
                ]
            }
          }
          const currentDocs = getVerificationDocs(activeVcApproval.type, activeVcApproval.date)
          const uploadKey = `${scholarName}_${activeVcApproval.type}`
          const selectedFileName = vcUploadedDocs[uploadKey] || ''

          const handleSignedUpload = (e) => {
            const file = e.target.files[0]
            if (!file) return
            if (file.type !== 'application/pdf') {
              alert('Only PDF files are allowed!')
              return
            }
            if (file.size > 10 * 1024 * 1024) {
              alert('Maximum file size is 10 MB!')
              return
            }
            setVcUploadedDocs(prev => ({
              ...prev,
              [uploadKey]: file.name
            }))
            alert(`Signed document "${file.name}" uploaded successfully!`)
          }

          const handleVCApprove = () => {
            if (!selectedFileName) {
              alert('Please upload the signed approval document before completing the approval process.')
              return
            }

            if (activeVcApproval.source === 'examiners') {
              setVcExaminers(prev => prev.map(x => x.id === activeVcApproval.original.id ? { 
                ...x, 
                status: 'Examiner Panel Signed', 
                remarks: vcRemarksText, 
                approvedBy: 'Vice Chancellor', 
                approvalDate: new Date().toLocaleDateString('en-GB'),
                signedDocument: selectedFileName 
              } : x))
            } else if (activeVcApproval.source === 'evaluations') {
              setVcEvaluations(prev => prev.map(x => x.id === activeVcApproval.original.id ? { 
                ...x, 
                status: 'Defense Sign-off Completed', 
                remarks: vcRemarksText, 
                approvedBy: 'Vice Chancellor', 
                approvalDate: new Date().toLocaleDateString('en-GB'),
                signedDocument: selectedFileName 
              } : x))
            } else if (activeVcApproval.source === 'degrees') {
              setVcFinalDegrees(prev => prev.map(x => x.id === activeVcApproval.original.id ? { 
                ...x, 
                status: 'Approved', 
                remarks: vcRemarksText, 
                approvedBy: 'Vice Chancellor', 
                approvalDate: new Date().toLocaleDateString('en-GB'),
                signedDocument: selectedFileName 
              } : x))
            }

            // Update notifications in localStorage
            const savedNotifs = localStorage.getItem('dsu_vc_notifications')
            if (savedNotifs) {
              try {
                const parsed = JSON.parse(savedNotifs)
                const updated = parsed.filter(n => !(n.scholar === activeVcApproval.scholar && n.approval === activeVcApproval.type))
                localStorage.setItem('dsu_vc_notifications', JSON.stringify(updated))
                window.dispatchEvent(new Event('notifications_updated'))
              } catch(e) {}
            }

            alert('Request successfully signed and approved by the Vice Chancellor.')
            setVcRemarksText('')
            setActiveVcApproval(null)
            navigate('/dashboard?view=approvals')
          }

          const handleVCDeny = () => {
            if (!vcRemarksText.trim()) {
              alert('Remarks are required when denying a request.')
              return
            }

            if (activeVcApproval.source === 'examiners') {
              setVcExaminers(prev => prev.map(x => x.id === activeVcApproval.original.id ? { 
                ...x, 
                status: 'Denied', 
                remarks: vcRemarksText, 
                returnedBy: 'Vice Chancellor', 
                returnDate: new Date().toLocaleDateString('en-GB') 
              } : x))
            } else if (activeVcApproval.source === 'evaluations') {
              setVcEvaluations(prev => prev.map(x => x.id === activeVcApproval.original.id ? { 
                ...x, 
                status: 'Denied', 
                remarks: vcRemarksText, 
                returnedBy: 'Vice Chancellor', 
                returnDate: new Date().toLocaleDateString('en-GB') 
              } : x))
            } else if (activeVcApproval.source === 'degrees') {
              setVcFinalDegrees(prev => prev.map(x => x.id === activeVcApproval.original.id ? { 
                ...x, 
                status: 'Denied', 
                remarks: vcRemarksText, 
                returnedBy: 'Vice Chancellor', 
                returnDate: new Date().toLocaleDateString('en-GB') 
              } : x))
            }

            // Update notifications in localStorage
            const savedNotifs = localStorage.getItem('dsu_vc_notifications')
            if (savedNotifs) {
              try {
                const parsed = JSON.parse(savedNotifs)
                const updated = parsed.filter(n => !(n.scholar === activeVcApproval.scholar && n.approval === activeVcApproval.type))
                localStorage.setItem('dsu_vc_notifications', JSON.stringify(updated))
                window.dispatchEvent(new Event('notifications_updated'))
              } catch(e) {}
            }

            alert(`Request returned. Returned to Research Office with remarks: "${vcRemarksText}"`)
            setVcRemarksText('')
            setActiveVcApproval(null)
            navigate('/dashboard?view=approvals')
          }

          return (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Header card with maroon gradient */}
              <section className="bg-gradient-to-r from-[#7B1E3A] to-[#5a1229] p-6 rounded-2xl text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-xl uppercase tracking-wider text-white">Vice Chancellor Verification Panel</h3>
                  <p className="text-xs font-bold text-red-100 uppercase tracking-widest mt-1">Review and authorize submitted milestone files</p>
                </div>
                <button
                  onClick={() => {
                    setActiveVcApproval(null)
                    navigate('/dashboard?view=approvals')
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-[10px] rounded-xl transition shrink-0 shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Approvals
                </button>
              </section>

              {/* Scholar Information Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b pb-3 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-dsu-maroon"></span>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Scholar Information</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Scholar Name</p>
                    <p className="text-slate-900 font-extrabold text-sm mt-0.5">{scholarName}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">School Name</p>
                    <p className="text-slate-900 font-extrabold text-sm mt-0.5">{activeVcApproval.school}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Department</p>
                    <p className="text-slate-900 font-extrabold text-sm mt-0.5">{activeVcApproval.department}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Research Guide</p>
                    <p className="text-slate-900 font-extrabold text-sm mt-0.5">{activeVcApproval.guide}</p>
                  </div>
                </div>
              </div>

              {/* Previous Approval History */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b pb-3 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#001c4f]"></span>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Previous Approval History</h4>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                  <table className="min-w-full text-left text-xs text-slate-750">
                    <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="px-4 py-3.5">Milestone</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5">Approval Date</th>
                        <th className="px-4 py-3.5">Approved By</th>
                        <th className="px-4 py-3.5">Documents</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-semibold">
                      {history.map((h, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition">
                          <td className="px-4 py-3 font-extrabold text-slate-950">{h.phase}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 font-bold border border-emerald-100 uppercase text-[9px]">
                              {h.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-500 font-bold">{h.date}</td>
                          <td className="px-4 py-3 font-extrabold text-slate-800">{getApprovedBy(h.phase)}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-2">
                              {h.documents && h.documents.map((doc, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => alert(`Downloading ${doc}...`)}
                                  className="text-dsu-maroon hover:text-red-800 font-black text-[9px] uppercase flex items-center gap-1 bg-red-50 hover:bg-red-100/50 px-2 py-1 rounded-md border border-red-100 transition"
                                >
                                  <Download className="w-3 h-3" />
                                  Download
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Current Pending Approval */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b pb-3 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Current Pending Approval</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Approval Type</p>
                    <p className="text-slate-900 font-extrabold text-sm mt-0.5">{activeVcApproval.type}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Submitted Date</p>
                    <p className="text-slate-900 font-extrabold text-sm mt-0.5">{activeVcApproval.date}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Submitted By</p>
                    <p className="text-slate-900 font-extrabold text-sm mt-0.5">Dean of Research</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Current Status</p>
                    <span className="inline-flex rounded-full bg-amber-50 text-amber-700 px-2.5 py-0.5 font-bold border border-amber-100 uppercase text-[9px] mt-1.5">
                      Pending VC Approval
                    </span>
                  </div>
                </div>
              </div>

              {/* Current Verification Documents */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b pb-3 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-dsu-maroon"></span>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Current Verification Documents</h4>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                  <table className="min-w-full text-left text-xs text-slate-755">
                    <thead className="bg-[#001c4f] text-white uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="px-4 py-3.5">Document Name</th>
                        <th className="px-4 py-3.5">Upload Date</th>
                        <th className="px-4 py-3.5">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-semibold">
                      {currentDocs.map((doc, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition">
                          <td className="px-4 py-3 font-extrabold text-slate-950">{doc.name}</td>
                          <td className="px-4 py-3 text-slate-500 font-bold">{doc.date}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => alert(`Downloading ${doc.name}...`)}
                              className="text-dsu-maroon hover:text-red-800 font-black text-[9px] uppercase flex items-center gap-1 bg-red-50 hover:bg-red-100/50 px-2.5 py-1.5 rounded-md border border-red-100 transition"
                            >
                              <Download className="w-3 h-3" />
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Signed Document Upload & Remarks Side-by-side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Signed Document Upload */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b pb-3 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-dsu-maroon"></span>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Verified / Signed Documents</h4>
                  </div>
                  
                  <div className="border-2 border-dashed border-slate-250 hover:border-dsu-maroon/30 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition text-center relative">
                    <Upload className="w-8 h-8 text-dsu-maroon mb-2" />
                    <span className="text-xs font-bold text-slate-700 mb-1">Drag & drop or browse signed PDF</span>
                    <span className="text-[10px] text-slate-400 font-semibold mb-4">PDF files only (Max size: 10MB)</span>
                    
                    {/* Upload File Button */}
                    <div className="px-4 py-2 bg-[#7B1E3A] hover:bg-red-800 text-white font-bold uppercase tracking-wider text-[10px] rounded-xl shadow-sm transition pointer-events-none">
                      Upload File
                    </div>
                    
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleSignedUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  
                  {selectedFileName && (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between gap-2 text-xs font-bold text-emerald-800">
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{selectedFileName}</span>
                      </div>
                      <button
                        onClick={() => {
                          setVcUploadedDocs(prev => ({
                            ...prev,
                            [uploadKey]: ''
                          }))
                        }}
                        className="text-slate-400 hover:text-red-500 font-bold uppercase text-[9px] border border-slate-205 hover:border-red-200 bg-white hover:bg-red-50/50 px-2 py-1 rounded transition shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  
                  <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                    Upload the signed approval document before completing the approval process.
                  </p>
                </div>

                {/* Remarks & Final Action */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-dsu-maroon"></span>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Vice Chancellor Remarks</h4>
                      </div>
                      <span className={`text-[10px] font-black ${vcRemarksText.length >= 480 ? 'text-red-500' : 'text-slate-400'}`}>
                        {vcRemarksText.length}/500
                      </span>
                    </div>
                    
                    <div>
                      <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Remarks</label>
                      <textarea
                        value={vcRemarksText}
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            setVcRemarksText(e.target.value)
                          }
                        }}
                        placeholder="Enter approval comments, observations, recommendations, or reasons for returning the request."
                        rows={5}
                        className="w-full border border-slate-200 p-3 rounded-2xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon font-semibold transition"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={handleVCDeny}
                      className="px-5 py-2.5 bg-white hover:bg-slate-50 text-[#7B1E3A] border border-slate-200 hover:border-[#7B1E3A]/30 font-bold uppercase tracking-wider text-[10px] rounded-xl transition shadow-sm animate-in"
                    >
                      Deny Request
                    </button>

                    <button
                      onClick={handleVCApprove}
                      className="px-5 py-2.5 bg-dsu-maroon hover:bg-red-800 text-white font-bold uppercase tracking-wider text-[10px] rounded-xl shadow-md transition"
                    >
                      Approve Milestone
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    )
  }

  return <div>Role not recognized.</div>
}
