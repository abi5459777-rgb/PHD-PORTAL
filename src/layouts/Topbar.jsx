import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, CalendarDays, ChevronDown } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import NotificationDropdown from '../components/NotificationDropdown'
import CalendarDropdown from '../components/CalendarDropdown'
import ProfileDropdown from '../components/ProfileDropdown'
import notificationsData from '../data/mockNotifications.json'
import eventsData from '../data/mockEvents.json'
import { scholarData } from '../data/scholarData'

const pageTitles = {
  dashboard: 'Dashboard',
  profile: 'Profile',
  coursework: 'Coursework',
  dac: 'DAC & Reviews',
  'thesis-management': 'Thesis',
  'comprehensive-viva': 'Comprehensive Viva',
  notifications: 'Notifications',
  documents: 'Documents',
  settings: 'Settings',
  colloquium: 'Colloquium',
}

// Titles for ?view= query params inside /dashboard
const viewTitles = {
  home:       'Dashboard',
  scholars:   'Scholars',
  coursework: 'Coursework',
  dac:        'First DAC',
  viva:       'Comprehensive Viva',
  colloquium: 'Colloquium',
  inch:       'Inch Committee',
  synopsis:   'Synopsis',
  evaluation: 'Thesis Evaluation',
  thesis:     'Thesis Defense',
  mom:        'Documents & MoM',
  verifications: 'Verifications',
  reports:    'Reports',
  examiner:   'Examiner Processing',
  workload:   'Guide Workload',
  application: 'Application Verification',
  document:   'Documents & Publications',
  plagiarism: 'Plagiarism & Format',
  library:    'Library Submissions',
  registration: 'Registration Allotment',
  records:    'Academic Records',
  degree:     'Degree Processing',
}

export default function Topbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const containerRef = useRef(null)
  const [openPanel, setOpenPanel] = useState(null)
  const [notifications, setNotifications] = useState(() => notificationsData.map((item) => ({ ...item })))

  const [profile, setProfile] = useState(() => {
    const role = localStorage.getItem('user_role') || 'scholar'
    const saved = localStorage.getItem('user_profile')
    const savedExt = localStorage.getItem('dsu_profile_data_' + role)
    let extPhoto = null
    if (savedExt) {
      try {
        extPhoto = JSON.parse(savedExt).photo
      } catch (e) {}
    }
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        return {
          ...parsed,
          name: parsed.name === 'Vice Chancellor Office' ? 'Vice Chancellor' : parsed.name,
          scholarId: parsed.sub || parsed.scholarId,
          supervisorName: role === 'scholar' ? 'Dr. D. Srinivasan' : 'N/A',
          photo: extPhoto || (role === 'scholar' ? scholarData.photo : null)
        }
      } catch (e) {
        // ignore
      }
    }
    return {
      name: scholarData.name,
      department: scholarData.department,
      scholarId: scholarData.scholarId,
      supervisorName: 'Dr. D. Srinivasan',
      photo: extPhoto || scholarData.photo
    }
  })

  const activePage = location.pathname.split('/')[1] || 'dashboard'
  const searchParams = new URLSearchParams(location.search)
  const view = searchParams.get('view')
  const pageTitle = activePage === 'dashboard' && view
    ? (viewTitles[view] || 'Dashboard')
    : (pageTitles[activePage] || 'Dashboard')
  const role = localStorage.getItem('user_role') || 'scholar'
  const [deanSchoolNotifCount, setDeanSchoolNotifCount] = useState(6)
  const [deanNotifCount, setDeanNotifCount] = useState(8)
  const [vcNotifCount, setVcNotifCount] = useState(3)
  const [registrarNotifCount, setRegistrarNotifCount] = useState(5)
  const [riNotifCount, setRiNotifCount] = useState(8)

  useEffect(() => {
    const updateCount = () => {
      const savedDS = localStorage.getItem('dsu_dean_school_notifications')
      if (savedDS) {
        try {
          setDeanSchoolNotifCount(JSON.parse(savedDS).length)
        } catch (e) {}
      } else {
        setDeanSchoolNotifCount(6)
      }

      const savedD = localStorage.getItem('dsu_dean_notifications')
      if (savedD) {
        try {
          setDeanNotifCount(JSON.parse(savedD).length)
        } catch (e) {}
      } else {
        setDeanNotifCount(8)
      }

      const savedVC = localStorage.getItem('dsu_vc_notifications')
      if (savedVC) {
        try {
          setVcNotifCount(JSON.parse(savedVC).length)
        } catch (e) {}
      }

      let regCount = 0
      try {
        const savedReg = localStorage.getItem('dsu_registrar_registrations')
        const regs = savedReg ? JSON.parse(savedReg) : []
        regCount += regs.filter(r => r.status === 'Pending Verification').length
      } catch (e) {}

      try {
        const savedEnroll = localStorage.getItem('dsu_registrar_enrollments')
        const enrolls = savedEnroll ? JSON.parse(savedEnroll) : []
        regCount += enrolls.filter(e => e.status === 'Pending Confirmation').length
      } catch (e) {}

      try {
        const savedRec = localStorage.getItem('dsu_registrar_academic_records')
        const recs = savedRec ? JSON.parse(savedRec) : []
        regCount += recs.filter(r => r.status === 'Pending Verification').length
      } catch (e) {}

      try {
        const savedDeg = localStorage.getItem('dsu_registrar_degrees')
        const degs = savedDeg ? JSON.parse(savedDeg) : []
        regCount += degs.filter(d => d.degreeStatus === 'Pending Verification').length
      } catch (e) {}

      try {
        const savedAwd = localStorage.getItem('dsu_registrar_awards')
        const awds = savedAwd ? JSON.parse(savedAwd) : []
        regCount += awds.filter(a => a.awardStatus === 'Pending Documentation').length
      } catch (e) {}

      setRegistrarNotifCount(regCount)

      let riCount = 0
      try {
        const savedApp = localStorage.getItem('dsu_ri_applications')
        const apps = savedApp ? JSON.parse(savedApp) : []
        riCount += apps.filter(a => a.status === 'Pending').length
      } catch (e) {}

      try {
        const savedDoc = localStorage.getItem('dsu_ri_original_docs')
        const docs = savedDoc ? JSON.parse(savedDoc) : []
        riCount += docs.filter(d => d.status === 'Pending').length
      } catch (e) {}

      try {
        const savedPub = localStorage.getItem('dsu_ri_publications')
        const pubs = savedPub ? JSON.parse(savedPub) : []
        riCount += pubs.filter(p => p.status === 'Pending').length
      } catch (e) {}

      try {
        const savedPlag = localStorage.getItem('dsu_ri_plagiarism')
        const plags = savedPlag ? JSON.parse(savedPlag) : []
        riCount += plags.filter(p => p.status === 'Pending').length
      } catch (e) {}

      try {
        const savedFormat = localStorage.getItem('dsu_ri_format_checking')
        const formats = savedFormat ? JSON.parse(savedFormat) : []
        riCount += formats.filter(f => f.status === 'Pending').length
      } catch (e) {}

      try {
        const savedDispatch = localStorage.getItem('dsu_ri_thesis_dispatches')
        const dispatches = savedDispatch ? JSON.parse(savedDispatch) : []
        riCount += dispatches.filter(t => t.status === 'Pending').length
      } catch (e) {}

      try {
        const savedExp = localStorage.getItem('dsu_ri_examiner_reports')
        const exps = savedExp ? JSON.parse(savedExp) : []
        riCount += exps.filter(e => e.reportStatus === 'Awaiting Report').length
      } catch (e) {}

      try {
        const savedLib = localStorage.getItem('dsu_ri_library_submissions')
        const libs = savedLib ? JSON.parse(savedLib) : []
        riCount += libs.filter(l => l.status === 'Awaiting Archival Copy').length
      } catch (e) {}

      setRiNotifCount(riCount)
    }
    const updateProfile = () => {
      const role = localStorage.getItem('user_role') || 'scholar'
      const saved = localStorage.getItem('user_profile')
      const savedExt = localStorage.getItem('dsu_profile_data_' + role)
      let extPhoto = null
      if (savedExt) {
        try {
          extPhoto = JSON.parse(savedExt).photo
        } catch (e) {}
      }
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setProfile({
            ...parsed,
            name: parsed.name === 'Vice Chancellor Office' ? 'Vice Chancellor' : parsed.name,
            scholarId: parsed.sub || parsed.scholarId,
            supervisorName: role === 'scholar' ? 'Dr. D. Srinivasan' : 'N/A',
            photo: extPhoto || (role === 'scholar' ? scholarData.photo : null)
          })
        } catch (e) {}
      }
    }
    updateCount()
    updateProfile()
    window.addEventListener('storage', updateCount)
    window.addEventListener('storage', updateProfile)
    window.addEventListener('notifications_updated', updateCount)
    window.addEventListener('profile_updated', updateProfile)
    return () => {
      window.removeEventListener('storage', updateCount)
      window.removeEventListener('storage', updateProfile)
      window.removeEventListener('notifications_updated', updateCount)
      window.removeEventListener('profile_updated', updateProfile)
    }
  }, [])

  const unreadCount = role === 'dean_school' 
    ? deanSchoolNotifCount 
    : role === 'dean'
    ? deanNotifCount
    : role === 'vc'
    ? vcNotifCount
    : role === 'registrar'
    ? registrarNotifCount
    : role === 'ri_office'
    ? riNotifCount
    : notifications.filter((notification) => !notification.read).length

  useEffect(() => {
    if (!openPanel) return

    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenPanel(null)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenPanel(null)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openPanel])

  const togglePanel = (panel) => {
    setOpenPanel((current) => (current === panel ? null : panel))
  }

  const closePanels = () => setOpenPanel(null)

  const markNotificationRead = (notificationId) => {
    setNotifications((current) => current.map((notification) => (
      notification.id === notificationId
        ? { ...notification, read: true, status: 'Read' }
        : notification
    )))
  }

  const markAllNotificationsRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true, status: 'Read' })))
  }

  const goTo = (path) => {
    closePanels()
    navigate(path)
  }

  return (
    <header ref={containerRef} className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">DSU PhD Research Portal</p>
          <h1 className="text-lg font-semibold text-dsu-maroon">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">


          <div className="relative">
            <button
              type="button"
              aria-label="Open events"
              aria-expanded={openPanel === 'calendar'}
              onClick={() => togglePanel('calendar')}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition ${openPanel === 'calendar' ? 'border-dsu-maroon bg-dsu-maroon text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <CalendarDays className="h-5 w-5" />
            </button>

            <AnimatePresence>
              {openPanel === 'calendar' && <CalendarDropdown events={eventsData} onNavigate={goTo} />}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Open notifications"
              aria-expanded={openPanel === 'notifications'}
              onClick={() => togglePanel('notifications')}
              className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border transition ${openPanel === 'notifications' ? 'border-dsu-maroon bg-dsu-maroon text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-dsu-gold px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {openPanel === 'notifications' && (
                <NotificationDropdown
                  notifications={notifications}
                  onNavigate={goTo}
                  onMarkRead={markNotificationRead}
                  onMarkAllRead={markAllNotificationsRead}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Open profile menu"
              aria-expanded={openPanel === 'profile'}
              onClick={() => togglePanel('profile')}
              className={`flex items-center gap-2 rounded-full border px-2 py-1.5 transition ${openPanel === 'profile' ? 'border-dsu-maroon bg-dsu-maroon/5' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
            >
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-dsu-maroon/10 text-sm font-semibold text-dsu-maroon">
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
                ) : (
                  <span>{profile.name?.charAt(0) || 'S'}</span>
                )}
              </div>

              <div className="hidden text-left sm:block">
                <div className="text-sm font-semibold text-slate-900">{profile.name}</div>
                <div className="text-xs text-slate-500">{profile.department}</div>
              </div>

              <ChevronDown className={`h-4 w-4 text-slate-500 transition ${openPanel === 'profile' ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {openPanel === 'profile' && (
                <ProfileDropdown
                  scholar={profile}
                  onNavigate={goTo}
                  onLogout={() => goTo('/login')}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
