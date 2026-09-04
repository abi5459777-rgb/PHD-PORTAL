import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home, User, Bell, Settings as Cog,
  ShieldCheck, FileArchive, Layers, CheckCircle2, ClipboardList,
  FileCheck, Landmark, Users, Award, ChevronDown,
  BookOpen, GraduationCap, FolderOpen, FileText,
  Calendar, Activity, Bookmark, UserCheck, BarChart2
} from 'lucide-react'
import logo from '../assets/dsu-logo.png'

export default function Sidebar() {
  const role = localStorage.getItem('user_role') || 'scholar'
  const location = useLocation()
  const [milestonesOpen, setMilestonesOpen] = useState(false)
  const [approvalsOpen, setApprovalsOpen] = useState(false)
  const [verificationOpen, setVerificationOpen] = useState(false)
  const [thesisOpen, setThesisOpen] = useState(false)
  const [academicAdminOpen, setAcademicAdminOpen] = useState(false)
  const [degreeAdminOpen, setDegreeAdminOpen] = useState(false)

  const getRoleDisplay = () => {
    switch (role) {
      case 'supervisor':  return 'Research Supervisor'
      case 'dean_school': return 'Dean of School'
      case 'dean':        return 'Dean (Research)'
      case 'ri_office':   return 'Research Office (R&I)'
      case 'registrar':   return 'Registrar'
      case 'vc':          return 'Vice Chancellor'
      default:            return 'PhD Research Scholar'
    }
  }

  const isActive = (to) => {
    if (!to.includes('?')) return location.pathname === to && location.search === ''
    const [path, query] = to.split('?')
    if (location.pathname !== path) return false
    const locParams = new URLSearchParams(location.search)
    const toParams = new URLSearchParams(query)
    if (locParams.get('view') !== toParams.get('view')) return false
    if (toParams.has('tab') && locParams.get('tab') !== toParams.get('tab')) return false
    return true
  }

  // ── Reusable components ──────────────────────────────────────

  const Header = () => (
    <div className="border-b bg-gradient-to-b from-dsu-maroon to-red-900 flex flex-col items-center justify-center py-5 px-4">
      <img
        src={logo}
        alt="DSU Logo"
        style={{ width: 300, height: 100, objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
      />
      <div className="flex flex-col items-center mt-3 gap-0.5 text-center">
        <p style={{ color: '#fff', fontWeight: 800, fontSize: 11, letterSpacing: '0.05em', lineHeight: 1.4, margin: 0, textTransform: 'uppercase' }}>
          Dhanalakshmi Srinivasan University
        </p>
        <p style={{ color: '#fed501', fontWeight: 800, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '2px 0 0' }}>
          PhD Research Portal
        </p>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10.5, fontWeight: 600, marginTop: 3 }}>
          {getRoleDisplay()}
        </span>
      </div>
    </div>
  )

  const NavItem = ({ to, label, icon: Icon }) => {
    const active = isActive(to)
    return (
      <li>
        <Link to={to} className={`flex items-center gap-3 px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-150 ${active ? 'bg-dsu-maroon text-white shadow-md' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
          <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-dsu-maroon'}`} />
          <span className="flex-1">{label}</span>
        </Link>
      </li>
    )
  }

  const SubItem = ({ to, label, icon: Icon }) => {
    const active = isActive(to)
    return (
      <li>
        <Link to={to} className={`flex items-center gap-2.5 pl-8 pr-3 py-1.5 rounded-md text-[11px] font-bold transition-all duration-150 ${active ? 'bg-dsu-maroon/10 text-dsu-maroon border-l-2 border-dsu-maroon' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
          <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-dsu-maroon' : 'text-slate-400'}`} />
          <span>{label}</span>
        </Link>
      </li>
    )
  }

  const Sep = () => <li className="my-1.5"><div className="h-px bg-slate-100" /></li>

  const CollapseBtn = ({ label, icon: Icon, open, active, onClick }) => (
    <li>
      <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-150 ${active ? 'text-dsu-maroon' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
        <Icon className={`w-4 h-4 shrink-0 text-dsu-maroon`} />
        <span className="flex-1 text-left">{label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${open || active ? 'rotate-180' : ''}`} />
      </button>
    </li>
  )

  // ── Milestone links (used by supervisor + dean roles) ────────
  const supervisorMilestoneLinks = [
    '/dashboard?view=dac', '/dashboard?view=viva', '/dashboard?view=colloquium',
    '/dashboard?view=inch', '/dashboard?view=synopsis', '/dashboard?view=evaluation', '/dashboard?view=thesis'
  ]
  const scholarMilestoneLinks = [
    '/dac-coursework', '/comprehensive-viva', '/colloquium',
    '/inch-committee', '/synopsis', '/thesis-evaluation', '/thesis-defense'
  ]
  const deanApprovalLinks = [
    '/dashboard?view=dac', '/dashboard?view=coursework', '/dashboard?view=colloquium',
    '/dashboard?view=synopsis', '/dashboard?view=examiner', '/dashboard?view=thesis'
  ]

  const vcApprovalLinks = [
    '/dashboard?view=approvals'
  ]

  const riVerificationLinks = [
    '/dashboard?view=application',
    '/dashboard?view=document',
    '/dashboard?view=publication',
    '/dashboard?view=plagiarism',
    '/dashboard?view=format'
  ]
  const riThesisLinks = [
    '/dashboard?view=thesis',
    '/dashboard?view=examiner_report',
    '/dashboard?view=library'
  ]

  const isMilestoneActive    = supervisorMilestoneLinks.some(l => isActive(l))
  const isScholarMilestoneActive = scholarMilestoneLinks.some(l => isActive(l))
  const isDeanApprovalActive = deanApprovalLinks.some(l => isActive(l))
  const isDeanSchoolApprovalActive = [
    '/dashboard?view=dac','/dashboard?view=viva','/dashboard?view=colloquium',
    '/dashboard?view=inch','/dashboard?view=synopsis'
  ].some(l => isActive(l))
  const isVcApprovalActive = vcApprovalLinks.some(l => isActive(l))
  const isRiVerificationActive = riVerificationLinks.some(l => isActive(l))
  const isRiThesisActive = riThesisLinks.some(l => isActive(l))
  
  const registrarAcademicAdminLinks = [
    '/dashboard?view=registration',
    '/dashboard?view=enrollment',
    '/dashboard?view=records'
  ]
  const registrarDegreeAdminLinks = [
    '/dashboard?view=degree',
    '/dashboard?view=award'
  ]
  const isRegistrarAcademicActive = registrarAcademicAdminLinks.some(l => isActive(l))
  const isRegistrarDegreeActive = registrarDegreeAdminLinks.some(l => isActive(l))

  useEffect(() => {
    if (isMilestoneActive) setMilestonesOpen(true)
    if (isDeanApprovalActive || isDeanSchoolApprovalActive || isVcApprovalActive) setApprovalsOpen(true)
    if (isRiVerificationActive) setVerificationOpen(true)
    if (isRiThesisActive) setThesisOpen(true)
    if (isRegistrarAcademicActive) setAcademicAdminOpen(true)
    if (isRegistrarDegreeActive) setDegreeAdminOpen(true)
  }, [
    isMilestoneActive,
    isDeanApprovalActive,
    isDeanSchoolApprovalActive,
    isVcApprovalActive,
    isRiVerificationActive,
    isRiThesisActive,
    isRegistrarAcademicActive,
    isRegistrarDegreeActive
  ])  // ════════════════════════════════════════════════════════════
  // 1. SCHOLAR
  // ════════════════════════════════════════════════════════════
  if (role === 'scholar') return (
    <aside className="w-72 bg-white border-r h-screen hidden md:flex md:flex-col select-none">
      <Header />
      <nav className="px-3 py-3 flex-1 overflow-y-auto">
        <ul className="space-y-0">
          <NavItem to="/dashboard"          label="Dashboard"             icon={Home} />
          <NavItem to="/profile"            label="My Profile"            icon={User} />
          <NavItem to="/dac-coursework"     label="First DAC & Course Work" icon={ShieldCheck} />
          <NavItem to="/comprehensive-viva" label="Comprehensive Viva"    icon={CheckCircle2} />
          <NavItem to="/colloquium"         label="Colloquium"            icon={Calendar} />
          <NavItem to="/inch-committee"     label="Inch Committee"        icon={FileCheck} />
          <NavItem to="/synopsis"           label="Synopsis"              icon={ClipboardList} />
          <NavItem to="/thesis-evaluation"  label="Thesis Evaluation"     icon={Layers} />
          <NavItem to="/thesis-defense"     label="Thesis Defense"        icon={Award} />
          <NavItem to="/documents"          label="Documents Repository"  icon={FileArchive} />
          <Sep />
          <NavItem to="/notifications" label="Notifications" icon={Bell} />
          <NavItem to="/settings"      label="Settings"      icon={Cog} />
        </ul>
      </nav>
    </aside>
  )

  // ════════════════════════════════════════════════════════════
  // 2. SUPERVISOR
  // ════════════════════════════════════════════════════════════
  if (role === 'supervisor') return (
    <aside className="w-72 bg-white border-r h-screen hidden md:flex md:flex-col select-none">
      <Header />
      <nav className="px-3 py-3 flex-1 overflow-y-auto">
        <ul className="space-y-0">
          <NavItem to="/dashboard?view=home"       label="Dashboard"        icon={Home} />
          <NavItem to="/profile"                   label="My Profile"       icon={User} />
          <NavItem to="/dashboard?view=scholars"   label="Scholars"         icon={Users} />
          <Sep />
          <NavItem to="/dashboard?view=mom" label="Documents & MoM" icon={FolderOpen} />
          <Sep />
          <NavItem to="/notifications" label="Notifications" icon={Bell} />
          <NavItem to="/settings"      label="Settings"      icon={Cog} />
        </ul>
      </nav>
    </aside>
  )

  // ════════════════════════════════════════════════════════════
  // 4. DEAN (RESEARCH)
  // ════════════════════════════════════════════════════════════
  if (role === 'dean') return (
    <aside className="w-72 bg-white border-r h-screen hidden md:flex md:flex-col select-none">
      <Header />
      <nav className="px-3 py-3 flex-1 overflow-y-auto">
        <ul className="space-y-0">
          <NavItem to="/dashboard?view=home"    label="Dashboard"          icon={Home} />
          <NavItem to="/profile"                label="My Profile"         icon={User} />
          <NavItem to="/dashboard?view=schools" label="Schools"            icon={Landmark} />
          <Sep />
          <NavItem to="/notifications"           label="Notifications"      icon={Bell} />
          <NavItem to="/settings"               label="Settings"           icon={Cog} />
        </ul>
      </nav>
    </aside>
  )

  // ════════════════════════════════════════════════════════════
  // 5. DEAN OF SCHOOL
  // ════════════════════════════════════════════════════════════
  if (role === 'dean_school') return (
    <aside className="w-72 bg-white border-r h-screen hidden md:flex md:flex-col select-none">
      <Header />
      <nav className="px-3 py-3 flex-1 overflow-y-auto">
        <ul className="space-y-0">
          <NavItem to="/dashboard?view=home"     label="Dashboard"     icon={Home} />
          <NavItem to="/profile"                 label="My Profile"    icon={User} />
          <NavItem to="/dashboard?view=workload" label="Guide"         icon={Users} />
          <Sep />
          <NavItem to="/notifications"           label="Notifications" icon={Bell} />
          <NavItem to="/settings"                label="Settings"      icon={Cog} />
        </ul>
      </nav>
    </aside>
  )

  // ════════════════════════════════════════════════════════════
  // 6. R&I OFFICE
  // ════════════════════════════════════════════════════════════
  if (role === 'ri_office') return (
    <aside className="w-72 bg-white border-r h-screen hidden md:flex md:flex-col select-none">
      <Header />
      <nav className="px-3 py-3 flex-1 overflow-y-auto">
        <ul className="space-y-0">
          <NavItem to="/dashboard?view=home"        label="Dashboard"                icon={Home} />
          <NavItem to="/profile"                    label="My Profile"               icon={User} />
          <Sep />
          
          <CollapseBtn 
            label="Verification" 
            icon={ShieldCheck} 
            open={verificationOpen} 
            active={isRiVerificationActive} 
            onClick={() => setVerificationOpen(!verificationOpen)} 
          />
          {(verificationOpen || isRiVerificationActive) && (
            <ul className="space-y-0">
              <SubItem to="/dashboard?view=application" label="Application Verification" icon={FileText} />
              <SubItem to="/dashboard?view=document"    label="Document Verification"    icon={FileCheck} />
              <SubItem to="/dashboard?view=publication" label="Publication Verification" icon={BookOpen} />
              <SubItem to="/dashboard?view=plagiarism"  label="Plagiarism Approval"      icon={Activity} />
              <SubItem to="/dashboard?view=format"      label="Format Checking"          icon={Layers} />
            </ul>
          )}
          
          <Sep />

          <CollapseBtn 
            label="Thesis Processing" 
            icon={FolderOpen} 
            open={thesisOpen} 
            active={isRiThesisActive} 
            onClick={() => setThesisOpen(!thesisOpen)} 
          />
          {(thesisOpen || isRiThesisActive) && (
            <ul className="space-y-0">
              <SubItem to="/dashboard?view=thesis"      label="Thesis Dispatch"            icon={Bookmark} />
              <SubItem to="/dashboard?view=examiner_report" label="Examiner Report Collection" icon={ClipboardList} />
              <SubItem to="/dashboard?view=library"     label="Final Library Submission"   icon={Landmark} />
            </ul>
          )}

          <Sep />
          <NavItem to="/notifications" label="Notifications" icon={Bell} />
          <NavItem to="/settings"      label="Settings"      icon={Cog} />
        </ul>
      </nav>
    </aside>
  )

  // ════════════════════════════════════════════════════════════
  // 7. REGISTRAR
  // ════════════════════════════════════════════════════════════
  if (role === 'registrar') return (
    <aside className="w-72 bg-white border-r h-screen hidden md:flex md:flex-col select-none">
      <Header />
      <nav className="px-3 py-3 flex-1 overflow-y-auto">
        <ul className="space-y-0">
          <NavItem to="/dashboard?view=home"         label="Dashboard"              icon={Home} />
          <NavItem to="/profile"                     label="My Profile"             icon={User} />
          <Sep />

          <CollapseBtn 
            label="Academic Administration" 
            icon={ClipboardList} 
            open={academicAdminOpen} 
            active={isRegistrarAcademicActive} 
            onClick={() => setAcademicAdminOpen(!academicAdminOpen)} 
          />
          {(academicAdminOpen || isRegistrarAcademicActive) && (
            <ul className="space-y-0">
              <SubItem to="/dashboard?view=registration" label="Registration Approval"   icon={FileCheck} />
              <SubItem to="/dashboard?view=enrollment"   label="Enrollment Confirmation" icon={UserCheck} />
              <SubItem to="/dashboard?view=records"      label="Academic Records"        icon={GraduationCap} />
            </ul>
          )}

          <Sep />

          <CollapseBtn 
            label="Degree Administration" 
            icon={Landmark} 
            open={degreeAdminOpen} 
            active={isRegistrarDegreeActive} 
            onClick={() => setDegreeAdminOpen(!degreeAdminOpen)} 
          />
          {(degreeAdminOpen || isRegistrarDegreeActive) && (
            <ul className="space-y-0">
              <SubItem to="/dashboard?view=degree"       label="Degree Processing"       icon={Activity} />
              <SubItem to="/dashboard?view=award"        label="Award Documentation"     icon={FileText} />
            </ul>
          )}

          <Sep />
          <NavItem to="/notifications" label="Notifications" icon={Bell} />
          <NavItem to="/settings"      label="Settings"      icon={Cog} />
        </ul>
      </nav>
    </aside>
  )

  // ════════════════════════════════════════════════════════════
  // 8. VICE CHANCELLOR
  // ════════════════════════════════════════════════════════════
  if (role === 'vc') return (
    <aside className="w-72 bg-white border-r h-screen hidden md:flex md:flex-col select-none">
      <Header />
      <nav className="px-3 py-3 flex-1 overflow-y-auto">
        <ul className="space-y-0">
          <NavItem to="/dashboard?view=home"       label="Dashboard"              icon={Home} />
          <NavItem to="/profile"                   label="My Profile"             icon={User} />
          <NavItem to="/dashboard?view=approvals"  label="Approvals"              icon={ShieldCheck} />
          <Sep />
          <NavItem to="/notifications"             label="Notifications"          icon={Bell} />
          <NavItem to="/settings"                  label="Settings"               icon={Cog} />
        </ul>
      </nav>
    </aside>
  )

  // Fallback
  return null
}