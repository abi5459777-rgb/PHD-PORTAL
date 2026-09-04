import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Volume2, ArrowRight, ArrowUp, Search, Download, FileText, 
  ExternalLink, Menu, X, ChevronDown, Award, GraduationCap, 
  Bookmark, ShieldCheck, Users, MapPin, Phone, Mail,
  Smartphone, Globe, Facebook, Instagram, Youtube, Linkedin
} from 'lucide-react'
import logo from '../assets/dsu-logo.png'
import campusBanner from '../assets/dsu-campus.png'
import libraryStudents from '../assets/library_students.png'

export default function ResearchInnovation() {
  const navigate = useNavigate()

  // Redirect to home on page reload
  useEffect(() => {
    if (!window.__spa_navigated__) {
      navigate('/')
    }
  }, [navigate])

  const handleAboutNav = () => {
    window.__spa_navigated__ = true
    navigate('/about-us')
  }

  const handleEnquiryNav = () => {
    window.__spa_navigated__ = true
    navigate('/contact-us')
  }

  const [activeTab, setActiveTab] = useState('domains')
  const [supervisorSearch, setSupervisorSearch] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll to top listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePhDLogin = () => {
    navigate('/login')
  }

  // supervisors list
  const supervisors = [
    { name: 'Dr. R. Gopi', dept: 'Computer Science & Engineering', role: 'Associate Professor & HOD', inst: 'Dhanalakshmi Srinivasan Engineering College (Autonomous)', email: 'gopircse@gmail.com' },
    { name: 'Dr. G. Amutha', dept: 'Management Studies', role: 'Professor & HOD', inst: 'Dhanalakshmi Srinivasan College of Engineering and Technology', email: 'amuteju@gmail.com' },
    { name: 'Dr. N. Deepalakshmi', dept: 'Management Studies', role: 'Academic Dean & Professor', inst: 'Dhanalakshmi Srinivasan College of Arts and Science for Women (Autonomous)', email: 'deepasachine@gmail.com' },
    { name: 'Dr. D. Kalaiselvan', dept: 'Management Studies', role: 'Professor', inst: 'Srinivasan College of Arts & Science', email: 'kalaiselvavennila@gmail.com' },
    { name: 'Dr. K. Sivakumar', dept: 'Biomedical Engineering', role: 'Professor & HOD', inst: 'Karpaga Vinayaga College of Engineering and Technology', email: 'ksivakumar76@gmail.com' },
    { name: 'Dr. Madhiarasan. M', dept: 'Electrical & Electronics Engineering', role: 'Associate Professor & R&D Coordinator', inst: 'Dhanalakshmi Srinivasan University', email: 'mmadhiarasan89@gmail.com' },
    { name: 'Dr. T. Ramani Devi', dept: 'Reproductive Medicine / OBGYN', role: 'Managing Director & Guide', inst: 'Janani Trichy Fertility Centre', email: 'ramanidevidr@yahoo.co.in' },
    { name: 'Dr. Anbu. S', dept: 'Mechanical Engineering', role: 'Associate Professor', inst: 'Dhanalakshmi Srinivasan Engineering College (Autonomous)', email: 'sathasivamanbu1974@gmail.com' },
    { name: 'Dr. S. Vignesh', dept: 'Computer Science & Engineering', role: 'Professor', inst: 'DSU School of Engineering & Technology', email: 'vignesh.cse@dsuniversity.ac.in' },
    { name: 'Dr. M. Priya', dept: 'Basic Sciences - Chemistry', role: 'Associate Professor', inst: 'DSU School of Arts and Science', email: 'priya.chem@dsuniversity.ac.in' },
    { name: 'Dr. K. Kumar', dept: 'Agricultural Sciences - Agronomy', role: 'Assistant Professor', inst: 'DSU School of Agricultural Sciences', email: 'kumar.agro@dsuniversity.ac.in' }
  ]

  const filteredSupervisors = supervisors.filter(s => 
    s.name.toLowerCase().includes(supervisorSearch.toLowerCase()) || 
    s.dept.toLowerCase().includes(supervisorSearch.toLowerCase()) ||
    s.inst.toLowerCase().includes(supervisorSearch.toLowerCase())
  )

  const downloadableForms = [
    {
      category: 'General Registration Forms',
      items: [
        { name: 'Undertaking Form of the Scholar', link: '#' },
        { name: 'Anti-Ragging Affidavit by the Scholar', link: '#' },
        { name: 'Anti-Ragging Affidavit by the Parent', link: '#' },
        { name: 'Joining Report of the Scholar', link: '#' }
      ]
    },
    {
      category: 'First Doctoral Advisory Committee (DAC)',
      items: [
        { name: 'Constitution of Panel of Members for DAC', link: '#' },
        { name: 'Minutes of the First Doctoral Committee Meeting', link: '#' }
      ]
    },
    {
      category: 'Ph.D. Course Work Forms',
      items: [
        { name: 'Course Work - NPTEL, SWAYAM or MOOC', link: '#' },
        { name: 'Course Work - Self-Study or Special Elective', link: '#' },
        { name: 'Online Course Work - Foil Card Generation', link: '#' }
      ]
    },
    {
      category: 'Comprehensive Viva & Colloquium',
      items: [
        { name: 'Comprehensive Viva Syllabus Template', link: '#' },
        { name: 'Minutes of Meeting - Comprehensive Viva (MoM-CV)', link: '#' },
        { name: 'Minutes of Colloquium Meeting (Open Seminar)', link: '#' }
      ]
    },
    {
      category: 'Prior to Synopsis & Ethics',
      items: [
        { name: 'Inch Committee Assessment for Format Check', link: '#' },
        { name: 'Verification of Publications (Prior to Synopsis)', link: '#' },
        { name: 'Plagiarism Check Report & Clearance Form', link: '#' }
      ]
    },
    {
      category: 'Thesis Evaluation & Oral Board',
      items: [
        { name: 'Adjudication of Thesis Format', link: '#' },
        { name: 'Electronic Thesis and Dissertation Form (ETD)', link: '#' },
        { name: 'Award Processing Request Form to COE', link: '#' }
      ]
    },
    {
      category: 'Progress Monitoring Forms',
      items: [
        { name: 'Progress Meetings - Half-Yearly (HYPE Meeting Report)', link: '#' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#001c4f]/10 selection:text-[#001c4f]">
      
      {/* Header Topbar Block */}
      <div className="bg-[#001c4f] text-white py-0 px-6 md:px-12 border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Logo & University Credentials */}
          <div className="flex items-center gap-5 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="DSU Seal Logo" className="w-32 h-32 md:w-52 md:h-52 object-contain shrink-0 -my-4 md:-my-12" />
            <div className="text-left">
              <h1 className="text-xl md:text-3xl font-black tracking-wide text-white leading-none uppercase">
                Dhanalakshmi Srinivasan
              </h1>
              <h2 className="text-lg md:text-2xl font-black tracking-wider text-white uppercase mt-1">
                University
              </h2>
              <p className="text-[10px] md:text-xs font-bold text-white/95 mt-1.5 leading-tight">
                (Established Under The Tamil Nadu Private Universities Act, 2019)
              </p>
              <p className="text-[10px] md:text-xs font-bold text-white/80 leading-tight mt-0.5">
                Tiruchirappalli - 621 112. Tamil Nadu, India.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Announcements Marquee */}
      <div className="bg-[#000e28] text-white py-2.5 border-b border-white/10 flex items-center relative overflow-hidden">
        <div className="flex items-center gap-2 bg-dsu-maroon text-white px-5 py-1 text-xs font-extrabold uppercase shrink-0 relative z-10 skew-x-12 -ml-2 select-none shadow-md">
          <span className="-skew-x-12 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
            PhD Announcements:
          </span>
        </div>
        <marquee className="text-xs font-semibold text-white/95" behavior="scroll" direction="left" scrollamount="4">
          <span className="mx-8 text-white font-bold">★ Ph.D. Admissions Open - June 2026 Intake</span>
          <span className="mx-8">★ Junior Research Fellowship (JRF) Applications Accepted Online</span>
          <span className="mx-8 text-white font-bold">★ Approved by All India Council for Technical Education, (AICTE) New Delhi</span>
          <span className="mx-8 font-bold text-yellow-400">★ Ph.D. Entrance Examination Schedule released for July 2026</span>
        </marquee>
      </div>

      {/* Main Yellow Navigation Menu Bar */}
      <nav className="bg-dsu-maroon border-b border-red-900/50 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden py-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <span className="text-xs font-black uppercase text-white tracking-wider ml-2.5">Portal Navigation</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center w-full justify-between select-none text-[11px] xl:text-[12px] font-black uppercase text-white">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')} 
                className="px-4 py-4 hover:bg-white/10 hover:text-white transition outline-none"
              >
                Home
              </button>
              <button 
                onClick={handleAboutNav} 
                className="px-4 py-4 hover:bg-white/10 hover:text-white transition outline-none"
              >
                About Us
              </button>
              <button 
                onClick={() => { setActiveTab('domains'); scrollToTop(); }} 
                className="px-4 py-4 hover:bg-white/10 hover:text-white transition outline-none border-b-2 border-[#D4AF37]"
              >
                Research & Innovation
              </button>
              <button 
                onClick={handleEnquiryNav} 
                className="px-4 py-4 hover:bg-white/10 hover:text-white transition outline-none"
              >
                Contact Us
              </button>
            </div>

            <div className="py-2.5">
              <button 
                onClick={handlePhDLogin}
                className="bg-[#001c4f] hover:bg-[#000e28] text-white px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-wider transition duration-200 shadow-sm flex items-center gap-1.5 border border-white/10 hover:scale-105"
              >
                <GraduationCap className="h-4 w-4 text-[#D4AF37]" />
                PhD Login Portal
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu links */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 flex flex-col gap-3 text-slate-800 text-sm font-bold shadow-lg animate-fadeIn">
            <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-slate-100 hover:text-dsu-maroon">Home</button>
            <button onClick={() => { handleAboutNav(); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-slate-100 hover:text-dsu-maroon">About Us</button>
            <button onClick={() => { setActiveTab('domains'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-slate-100 hover:text-dsu-maroon">Research & Innovation</button>
            <button onClick={() => { handleEnquiryNav(); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-slate-100 hover:text-dsu-maroon">Contact Us</button>
            <div className="pt-2">
              <button 
                onClick={() => { handlePhDLogin(); setMobileMenuOpen(false); }}
                className="w-full bg-dsu-maroon text-white text-xs font-black uppercase tracking-widest py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <GraduationCap className="h-4 w-4 text-[#D4AF37]" />
                PhD Login Portal
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Cover Banner Section */}
      <section 
        className="relative bg-cover bg-center h-[240px] sm:h-[280px] flex items-center border-b border-slate-200 overflow-hidden shadow-inner select-none"
        style={{ backgroundImage: `url(${campusBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#001c4fd0] via-[#521323b0] to-[#001c4fd0] mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 text-white text-left space-y-3">
          <div className="bg-[#D4AF37] text-[#001c4f] px-3.5 py-1.5 rounded-md text-[10px] sm:text-xs font-black uppercase tracking-widest w-fit shadow-md">
            DSU Research Office
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide leading-tight drop-shadow-lg">
            Office of Research and Innovation
          </h2>
        </div>
      </section>

      {/* Breadcrumb Path Bar */}
      <div className="bg-[#001c4f] py-3.5 px-6 md:px-12 text-slate-300 text-[11px] sm:text-xs font-semibold select-none border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button onClick={() => navigate('/')} className="hover:text-white transition cursor-pointer font-semibold">Home</button>
          <span className="text-slate-500">/</span>
          <span className="text-white">Office Of Research and Innovation</span>
        </div>
      </div>

      {/* Main Container Layout */}
      <div id="about" className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Sidebar Tabs Navigation */}
          <div className="lg:col-span-3 flex flex-col bg-white rounded-sm border border-slate-200 overflow-hidden shadow-sm select-none">

            <div className="bg-[#001c4f] text-white px-5 py-3.5 text-xs font-black uppercase tracking-wider text-left">
              Office Information
            </div>
            {[
              { id: 'domains', label: 'Research Domains' },
              { id: 'policies', label: 'Research Policies' },
              { id: 'organogram', label: 'Organogram' },
              { id: 'supervisors', label: 'Recognized Supervisors' },
              { id: 'forms', label: 'Downloadable Forms' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-5 py-3.5 border-b border-slate-100 last:border-b-0 text-[13px] font-bold transition-all duration-150 flex items-center justify-between ${
                  activeTab === tab.id 
                    ? 'bg-dsu-maroon text-white font-extrabold shadow-sm' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-l-transparent hover:border-l-dsu-maroon'
                }`}
              >
                <span className="truncate">{tab.label}</span>
              </button>
            ))}

            <div className="bg-[#001c4f] text-white px-5 py-3.5 text-xs font-black uppercase tracking-wider border-t border-slate-200/50 text-left">
              PhD Portal Lifecycle
            </div>
            {[
              { id: 'dac-meeting-workflow', label: 'I. First DAC & Course Work' },
              { id: 'comprehensive-viva-workflow', label: 'II. Comprehensive Viva' },
              { id: 'colloquium-workflow', label: 'III. Open Seminar / Colloquium' },
              { id: 'inch-committee-workflow', label: 'IV. Inch Committee' },
              { id: 'synopsis-workflow', label: 'V. Synopsis & Plagiarism' },
              { id: 'thesis-evaluation-workflow', label: 'VI. Thesis Evaluation' },
              { id: 'thesis-defense-workflow', label: 'VII. Thesis Defense' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-5 py-3.5 border-b border-slate-100 last:border-b-0 text-[13px] font-bold transition-all duration-150 flex items-center justify-between ${
                  activeTab === tab.id 
                    ? 'bg-dsu-maroon text-white font-extrabold shadow-sm' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-l-transparent hover:border-l-dsu-maroon'
                }`}
              >
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Right Column Main content layout display */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm min-h-[600px] text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                


                {/* 7. II. FIRST DAC MEETING WORKFLOW TAB */}
                {activeTab === 'dac-meeting-workflow' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-dsu-maroon uppercase tracking-wide">
                        FIRST DAC & COURSE WORK
                      </h3>
                      <h4 className="text-base font-bold text-dsu-maroon mt-1.5">
                        Stage 1: Committee Formation, Syllabus Approval, and Course Work Completion
                      </h4>
                    </div>

                    <div className="space-y-4 text-xs font-semibold text-[#0033CC] leading-relaxed">
                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">1. DAC Committee Constitution</h5>
                        <p>The DAC must be constituted within a month of provisional registration. The supervisor nominates a panel of experts including both <strong>Internal</strong> and <strong>External Experts</strong>. The panel is recommended by the Dean (Research) and approved by the Vice-Chancellor.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">2. Meeting Schedule & Presentation</h5>
                        <p>During the first DAC meeting, the scholar presents the research proposal plan, objectives, and methodology. The committee approves the presentation and finalizes the coursework subjects.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">3. Course Registration & NPTEL/SWAYAM Certificates</h5>
                        <p>Scholars register for 12 credits of coursework (Research Methodology, Research & Publication Ethics, and 2 online elective courses from NPTEL/SWAYAM). Certificates must be uploaded upon verification.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">4. MoM & Grade Sheets</h5>
                        <p>The supervisor submits the official Minutes of Meeting (MoM) and recommendations. Upon coursework completion, the CoE issues the coursework grade sheets and approval status is confirmed.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. III. COMPREHENSIVE VIVA WORKFLOW TAB */}
                {activeTab === 'comprehensive-viva-workflow' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-dsu-maroon uppercase tracking-wide">
                        COMPREHENSIVE VIVA-VOCE EXAMINATION
                      </h3>
                      <h4 className="text-base font-bold text-dsu-maroon mt-1.5">
                        Stage 2: Coursework Validation and Candidacy Confirmation
                      </h4>
                    </div>

                    <div className="space-y-4 text-xs font-semibold text-[#0033CC] leading-relaxed">
                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">1. Timeline & Syllabus Formulation</h5>
                        <p>Within six months of completing the coursework, the supervisor must constitute the DAC meeting for the Comprehensive Viva-Voce (CV) examination. The syllabus is prepared by the supervisor and approved by the School Dean and expert members. The candidate must be notified of the syllabus at least <strong>15 days</strong> before the exam date.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">2. Examination Structure</h5>
                        <p>The candidate presents a seminar for 15-20 minutes outlining research progress and the experimental methodology. The expert panel then conducts an oral Q&A session regarding specialization subjects, coursework papers, and general research principles.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">3. Results & Candidacy Orders</h5>
                        <p>Comprehensive Viva results are kept <strong>strictly confidential</strong> and are not displayed publicly. The board submits its recommendations directly to the Office of R&I. </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>If Passed:</strong> The Office of R&I issues the official Ph.D. candidacy order.</li>
                          <li><strong>If Failed:</strong> The board assigns additional courses/tasks, and the scholar must re-appear for the examination after a gap of 6 months.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. VI. OPEN SEMINAR / COLLOQUIUM WORKFLOW TAB */}
                {activeTab === 'colloquium-workflow' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-dsu-maroon uppercase tracking-wide">
                        OPEN SEMINAR & COLLOQUIUM
                      </h3>
                      <h4 className="text-base font-bold text-dsu-maroon mt-1.5">
                        Stage 3: Public Progress Presentation and Evaluation
                      </h4>
                    </div>

                    <div className="space-y-4 text-xs font-semibold text-[#0033CC] leading-relaxed">
                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">1. Eligibility Criteria</h5>
                        <p>A scholar is eligible for the Colloquium (Open Seminar) upon completing all coursework, passing the Comprehensive Viva, meeting publication criteria, and completing at least <strong>80%</strong> of the proposed research objectives.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">2. Colloquium Committee Formulation</h5>
                        <p>The supervisor requests the Dean to initiate the Colloquium. The Dean constitutes a school-level evaluation committee consisting of:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>A Professor from the same domain.</li>
                          <li>A Professor or Associate Professor from within the School.</li>
                          <li>The Head of the Department (HOD) or Associate Dean.</li>
                        </ul>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">3. Open Presentation Guidelines</h5>
                        <p>The Dean invites scholars, faculty, and students to attend. A <strong>minimum of 25 participants</strong> from various schools must be present. The candidate delivers a 45-minute presentation outlining major research achievements and patent/publication outputs, followed by a 15-minute Q&A session.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">4. Outcome & MoM Submission</h5>
                        <p>The committee evaluates performance based on scientific rigor, publications, and objective fulfillment. </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>If Approved:</strong> The candidate is cleared to prepare the draft thesis.</li>
                          <li><strong>If Disapproved:</strong> The scholar must revise their findings and re-appear for the colloquium within 1 month.</li>
                          <li>The official Colloquium MoM must be uploaded to the Office of R&I within <strong>10 days</strong> of the presentation.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* 10. VII. INCH COMMITTEE WORKFLOW TAB */}
                {activeTab === 'inch-committee-workflow' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-dsu-maroon uppercase tracking-wide">
                        INCH COMMITTEE FORMAT VERIFICATION
                      </h3>
                      <h4 className="text-base font-bold text-dsu-maroon mt-1.5">
                        Stage 4: Draft Thesis and Synopsis Formatting Review
                      </h4>
                    </div>

                    <div className="space-y-4 text-xs font-semibold text-[#0033CC] leading-relaxed">
                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">1. Format Checking Initiation</h5>
                        <p>Following a successful Colloquium, the scholar submits the draft thesis and synopsis to the Office of R&I through the supervisor. The publication list is audited by the Research Office to verify that index criteria (Scopus/Web of Science) are fully met before forwarding to the Inch Committee.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">2. Inch Committee Review</h5>
                        <p>Nominated domain experts form the Inch Committee. The assigned reviewer is given <strong>10 days</strong> to check the thesis formatting against the official University thesis manual guidelines:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Overall format style and layout consistency.</li>
                          <li>Citation rules and bibliography mapping.</li>
                          <li>Table of Contents (TOC), list of figures, and list of tables matching.</li>
                          <li>Correct page numbering sequences, captions, and section titles.</li>
                          <li>Chapter formatting compliance.</li>
                        </ul>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">3. Revision & Re-Submission</h5>
                        <p>Based on the checklist responses, the committee highlights formatting discrepancies. The scholar must incorporate corrections and submit the draft copy for re-verification. Re-submission loops continue until the thesis matches DSU formatting standards.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 11. VIII. SYNOPSIS & PLAGIARISM WORKFLOW TAB */}
                {activeTab === 'synopsis-workflow' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-dsu-maroon uppercase tracking-wide">
                        THESIS SYNOPSIS MEETING & EXAMINER PANEL FORMULATION
                      </h3>
                      <h4 className="text-base font-bold text-dsu-maroon mt-1.5">
                        Stage 5: Plagiarism Clearance, DAC Synopsis Presentation, and Panel Recommendation
                      </h4>
                    </div>

                    <div className="space-y-4 text-xs font-semibold text-[#0033CC] leading-relaxed">
                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">1. Plagiarism Audit</h5>
                        <p>Before initiating the synopsis meeting, the thesis draft must undergo a plagiarism check using official software (Turnitin/URKUND). The Research Office runs the audit and R&I verifies the results. The maximum allowed similarity index is strictly <strong>10%</strong> (excluding reference and formula blocks).</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">2. DAC Synopsis Meeting</h5>
                        <p>Once plagiarism clearance and format checks are approved, the Dean of Research constitutes the DAC Synopsis Meeting. The candidate delivers a 45-60 minute presentation summarizing the depth, quantum, and academic contribution of their research. The DAC evaluates performance and recommends final submission or further revisions.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">3. Examiner Panel Nomination</h5>
                        <p>During the meeting, the supervisor submits a panel list containing <strong>12 potential examiners</strong> (6 Indian Experts + 6 Foreign Experts from at least 4 different countries). The panel criteria are strictly enforced by the system:</p>
                        <ul className="list-disc pl-5 space-y-1.5">
                          <li>Must be regular faculty in the cadre of Associate Professor or Professor.</li>
                          <li>Must possess at least 10 years of active research/teaching experience.</li>
                          <li>Indian examiners must be from premier institutes of national importance (IIT, IISc, NIT, etc.).</li>
                          <li><strong>No repetition:</strong> Supervisors cannot reuse examiners from their previous two theses.</li>
                        </ul>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">4. MoM Submission</h5>
                        <p>The official Synopsis MoM must be submitted to the Office of R&I within <strong>5 working days</strong> of the presentation. Any corrections requested by DAC members must be incorporated, and the revised thesis must undergo a final plagiarism check before submission to R&I.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 12. IX. THESIS EVALUATION WORKFLOW TAB */}
                {activeTab === 'thesis-evaluation-workflow' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-dsu-maroon uppercase tracking-wide">
                        THESIS EVALUATION PROCESS
                      </h3>
                      <h4 className="text-base font-bold text-dsu-maroon mt-1.5">
                        Stage 6: Examiner Reports and Decision Processing
                      </h4>
                    </div>

                    <div className="space-y-4 text-xs font-semibold text-[#0033CC] leading-relaxed">
                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">1. Examiner Assignment</h5>
                        <p>The Vice-Chancellor approves the examiner panel recommended by the DAC in the Synopsis MoM. The Dean of Research selects <strong>2 examiners</strong> (1 Indian + 1 Foreign) and dispatches the thesis copy digitally with secure download access codes.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">2. Evaluation Review Process</h5>
                        <p>Examiners are given <strong>2 months</strong> to upload their evaluation report. The report must provide details of strengths, minor corrections, and a definitive recommendation. Automatic reminders are sent by the system at <strong>30, 45, and 60 days</strong>. In case of excessive delay, the Dean designates a replacement examiner from the panel.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">3. Decision Tree Rules</h5>
                        <p>The final route depends on the combination of the two examiner reports:</p>
                        <ul className="list-disc pl-5 space-y-1.5">
                          <li><strong>Both recommended (Recommended):</strong> Scholar is cleared to proceed to the viva-voce defense. Oral Board is formed.</li>
                          <li><strong>One recommended + One rejected:</strong> The thesis is forwarded to a 3rd examiner from the panel. If the 3rd examiner recommends it, the scholar proceeds; if the 3rd examiner rejects it, the thesis is rejected and the candidate's registration is cancelled.</li>
                          <li><strong>Both not recommended (Not Recommended):</strong> The thesis is rejected, resulting in the cancellation of registration.</li>
                          <li><strong>Revision required (Revision Required / Additional Evaluation):</strong> The candidate has up to <strong>3 months</strong> to revise and submit the thesis, which is then re-sent to the same examiner for a final decision.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* 13. X. THESIS DEFENSE WORKFLOW TAB */}
                {activeTab === 'thesis-defense-workflow' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-dsu-maroon uppercase tracking-wide">
                        VIVA-VOCE ORAL EXAMINATION & THESIS DEFENSE
                      </h3>
                      <h4 className="text-base font-bold text-dsu-maroon mt-1.5">
                        Stage 7: Final Public Defense and Ph.D. Award Recommendation
                      </h4>
                    </div>

                    <div className="space-y-4 text-xs font-semibold text-[#0033CC] leading-relaxed">
                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">1. Thesis Oral Examination Board</h5>
                        <p>Once evaluation reports are approved, the Dean of Research constitutes the Oral Examination Board:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Dean (Research):</strong> Chairman</li>
                          <li><strong>School Dean:</strong> Member</li>
                          <li><strong>Indian Examiner of the Thesis:</strong> Member (alternate nominated if unavailable)</li>
                          <li><strong>Research Supervisor:</strong> Member</li>
                          <li><strong>Co-supervisor (if applicable):</strong> Member</li>
                        </ul>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">2. Public Defense & Evaluation</h5>
                        <p>The defense must be scheduled within <strong>1 month</strong> of board formation. Scholars must present in-person (except when located abroad, where online defense can be arranged with VC approval). The supervisor organizes wide publicity. The scholar delivers a 45-minute seminar followed by public Q&A. The board grades the performance as <strong>Satisfactory</strong> or <strong>Not Satisfactory</strong>.</p>
                        <p>In case of a 'Not Satisfactory' outcome, the scholar must re-appear within 1 to 6 months. A second failure is referred to the Academic Council.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">3. PhD Degree Award & Archiving</h5>
                        <p>Upon a 'Satisfactory' result, the supervisor submits the final signed report (including summaries, corrections certificate, and recommendations) through the Chairman. A final corrected copy of the thesis is archived in the central library. The system updates the scholar's status to <strong>Completed</strong> and generates the degree certificate recommendation.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Research Domains Tab */}
                {activeTab === 'domains' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-dsu-maroon uppercase tracking-wide">
                        MAJOR DOMAINS & DISCIPLINES
                      </h3>
                      <h4 className="text-sm font-bold text-dsu-maroon mt-1.5">
                        Approved Academic Research Disciplines at DSU
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: 'Medicine', items: ['Anatomy', 'Physiology', 'Biochemistry', 'Microbiology', 'Reproductive Medicine'] },
                        { title: 'Engineering & Technology', items: ['Computer Science & Engineering', 'Electronics & Comm. Engineering', 'Electrical & Electronics Engineering', 'Mechanical Engineering', 'Biomedical Engineering', 'Biotechnology', 'Materials Science', 'Nanoscience & Tech'] },
                        { title: 'Agricultural Sciences', items: ['Entomology', 'Agronomy', 'Horticulture', 'Floriculture', 'Agribusiness Management', 'Agricultural Extension', 'Agricultural Economics', 'Agricultural Nanotechnology', 'Genetics & Plant Breeding', 'Plant Pathology'] },
                        { title: 'Management Studies', items: ['Finance', 'Human Resource Management', 'Marketing', 'Commerce', 'Digital Operations'] },
                        { title: 'Sciences & Humanities', items: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Microbiology', 'Sociology', 'Political Science'] },
                        { title: 'Pharmacy & Health', items: ['Pharmaceutics', 'Pharmacognosy', 'Allied Health Sciences (Biochemistry, Anatomy)'] }
                      ].map((domain, dIdx) => (
                        <div key={dIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          <h5 className="font-extrabold text-sm text-dsu-maroon uppercase tracking-wider border-b border-slate-200/50 pb-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-4 bg-dsu-maroon rounded-full"></span>
                            {domain.title}
                          </h5>
                          <ul className="text-xs text-[#0033CC] font-bold space-y-1 list-disc pl-4 leading-relaxed">
                            {domain.items.map((item, iIdx) => (
                              <li key={iIdx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                      <h5 className="font-extrabold text-sm text-dsu-maroon flex items-center gap-1.5 mb-2">
                        <ShieldCheck className="h-4 w-4" />
                        PhD Onboarding Eligibility Guidelines
                      </h5>
                      <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4">
                        <li className="font-semibold">Master's Qualification: Master's Degree with not less than 55% marks (or equivalent grade) in the subject concerned for full-time/part-time PhD streams.</li>
                        <li className="font-semibold">Direct PhD Admission: B.E. / B.Tech holding a CGPA of 8.5 and above, with a valid GATE score or CSIR/UGC-NET/DST-INSPIRE fellowships, are eligible for Direct Full-time PhD entry.</li>
                        <li className="font-semibold">Admission Screening: Candidates must qualify in the University Research Entrance Test (RET), followed by an expert panel interview. Candidates holding UGC-NET/CSIR/GATE/SET are exempted from the entrance test.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Research Policies Tab */}
                {activeTab === 'policies' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-dsu-maroon uppercase tracking-wide">
                        UNIVERSITY RESEARCH POLICIES
                      </h3>
                      <h4 className="text-sm font-bold text-dsu-maroon mt-1.5">
                        Rules, Guidelines & Compliance at Dhanalakshmi Srinivasan University
                      </h4>
                    </div>

                    <div className="space-y-4 text-xs font-semibold text-[#0033CC] leading-relaxed">
                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">1. Plagiarism & Ethics Check Policy</h5>
                        <p>DSU maintains zero tolerance for academic misconduct. All doctoral synopsis and thesis submissions must clear plagiarism checks prior to synopsis meeting and thesis evaluation. The university enforces a strict similarity threshold of <strong>under 10% similarity</strong> (excluding reference sections and standard mathematical expressions) verified via official plagiarism software (Turnitin/URKUND).</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">2. Research Guide Capacity Limits</h5>
                        <p>To ensure adequate mentorship, the university regulates the capacity limits for recognized research guides. The capacity is capped based on designation and cannot exceed: </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Professors:</strong> Maximum of 8 scholars concurrently</li>
                          <li><strong>Associate Professors:</strong> Maximum of 6 scholars concurrently</li>
                          <li><strong>Assistant Professors:</strong> Maximum of 4 scholars concurrently</li>
                          <li>Each eligible guide can enroll a <strong>maximum of 2 scholars per semester</strong>.</li>
                        </ul>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">3. Coursework Completion Timeline</h5>
                        <p>All candidates provisionally registered for the Ph.D. program must complete a total of 12 coursework credits within <strong>1 year</strong> of their registration. Coursework includes 2 mandatory core papers (Research Methodology and Research Ethics) and 2 elective courses approved by the DAC.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">4. Comprehensive Viva-Voce Timeline</h5>
                        <p>Upon successful coursework completion, the candidate must undergo the Comprehensive Viva-Voce examination within <strong>6 months</strong>. The syllabus must be approved by the expert panel and communicated to the candidate at least 15 days prior. Candidates who fail must complete additional work and re-appear after a 6-month period.</p>
                      </div>

                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <h5 className="font-extrabold text-sm text-dsu-maroon uppercase">5. Open Seminar / Colloquium Requirements</h5>
                        <p>Scholars are eligible for the Open Seminar/Colloquium upon completing coursework, passing the comprehensive viva, fulfilling publication requirements, and completing 80% of their research objectives. A school-level evaluation committee reviews the work, and the seminar requires a <strong>minimum of 25 active participants</strong> comprising students, scholars, and faculty from various schools.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Organogram Tab */}
                {activeTab === 'organogram' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-dsu-maroon uppercase tracking-wide">
                        OFFICE ORGANOGRAM
                      </h3>
                      <h4 className="text-sm font-bold text-dsu-maroon mt-1.5">
                        Research Governance Hierarchy at DSU
                      </h4>
                    </div>

                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-6">
                      <p className="text-sm text-[#0033CC] leading-relaxed font-semibold">
                        The governance framework details the administrative and review flow for ensuring thesis quality, regulatory checkoffs, and ethics clearances:
                      </p>

                      <div className="flex flex-col gap-4 max-w-md mx-auto text-xs font-bold">
                        <div className="bg-slate-900 text-white p-3 rounded-lg border border-slate-700 text-center uppercase tracking-wider">
                          Vice Chancellor (Patron)
                        </div>
                        <div className="text-center text-dsu-maroon -my-2 font-bold">▼</div>
                        <div className="bg-[#001c4f] text-white p-3 rounded-lg border border-white/20 text-center uppercase tracking-wider">
                          Registrar Desk
                        </div>
                        <div className="text-center text-dsu-maroon -my-2 font-bold">▼</div>
                        <div className="bg-red-800 text-white p-3 rounded-lg border border-red-700 text-center uppercase tracking-wider">
                          Dean, Academic & Research Cell
                        </div>
                        <div className="text-center text-dsu-maroon -my-2 font-bold">▼</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-[#337ab7] text-white p-2.5 rounded-lg text-center leading-tight">
                            Institutional Ethics & Review Panel (IEC)
                          </div>
                          <div className="bg-[#337ab7] text-white p-2.5 rounded-lg text-center leading-tight">
                            Doctoral Advisory Committee (DAC)
                          </div>
                        </div>
                        <div className="text-center text-dsu-maroon -my-2 font-bold">▼</div>
                        <div className="bg-emerald-700 text-white p-3 rounded-lg border border-emerald-800 text-center uppercase tracking-wider">
                          Research Supervisors / Guides
                        </div>
                        <div className="text-center text-dsu-maroon -my-2 font-bold">▼</div>
                        <div className="bg-white text-slate-800 p-3 rounded-lg border border-slate-200 text-center">
                          Ph.D. Scholars / Candidates
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recognized Supervisors Tab */}
                {activeTab === 'supervisors' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-dsu-maroon uppercase tracking-wide">
                          APPROVED RESEARCH SUPERVISORS
                        </h3>
                        <h4 className="text-sm font-bold text-slate-400 mt-1.5">
                          Roster of University Recognized PhD Guides
                        </h4>
                      </div>
                      
                      {/* Search Guides */}
                      <div className="relative shrink-0 w-full sm:w-64">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <Search className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          placeholder="Search guides, department..."
                          value={supervisorSearch}
                          onChange={(e) => setSupervisorSearch(e.target.value)}
                          className="w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:border-[#337ab7] focus:ring-2 focus:ring-[#337ab7]/10 transition"
                        />
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-200">
                      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                        <table className="min-w-full text-left text-xs text-slate-700">
                          <thead className="bg-[#001c4f] text-white font-bold uppercase tracking-wider sticky top-0 z-10">
                            <tr>
                              <th className="px-4 py-3">Supervisor Name</th>
                              <th className="px-4 py-3">Department</th>
                              <th className="px-4 py-3">Designation & Institution</th>
                              <th className="px-4 py-3">Contact Email</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-150 bg-white">
                            {filteredSupervisors.length > 0 ? (
                              filteredSupervisors.map((s, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition font-medium">
                                  <td className="px-4 py-3.5 font-bold text-[#0033CC]">{s.name}</td>
                                  <td className="px-4 py-3.5">
                                    <span className="inline-flex rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 font-bold text-[10px] text-blue-700">
                                      {s.dept}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3.5">
                                    <p className="font-semibold text-slate-800">{s.role}</p>
                                    <p className="text-[10px] text-slate-400 font-medium">{s.inst}</p>
                                  </td>
                                  <td className="px-4 py-3.5 text-slate-500 font-semibold">{s.email}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-slate-400 font-semibold">
                                  No approved supervisors found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Downloadable Forms Tab */}
                {activeTab === 'forms' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-dsu-maroon uppercase tracking-wide">
                        OFFICIAL DOWNLOADABLE FORMS
                      </h3>
                      <h4 className="text-sm font-bold text-dsu-maroon mt-1.5">
                        Official MS Word (.docx) Templates for PhD Scholars
                      </h4>
                    </div>

                    <div className="space-y-6 max-h-[480px] overflow-y-auto pr-2">
                      {downloadableForms.map((group, idx) => (
                        <div key={idx} className="space-y-3">
                          <h4 className="font-extrabold text-sm text-slate-900 border-b border-slate-200 pb-1.5 flex items-center gap-1.5 border-l-4 border-l-[#337ab7] pl-2">
                            {group.category}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {group.items.map((form, fIdx) => (
                              <div key={fIdx} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-[#337ab7] transition duration-200 text-xs font-semibold">
                                <span className="text-slate-800 truncate mr-3">{form.name}</span>
                                <a
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); alert(`Downloading: ${form.name}`); }}
                                  className="shrink-0 rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition flex items-center gap-1 shadow-sm font-bold uppercase tracking-wider text-[10px]"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  DOCX
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>




      {/* Footer */}
      <footer className="bg-[#001c4f] text-white py-16 px-6 md:px-12 border-t border-white/10 select-none text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Column 1: Contact Us */}
          <div className="space-y-6">
            <h3 className="text-white text-lg font-bold border-b border-white/20 pb-2 w-fit pr-8 uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm font-semibold text-slate-200">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  NH-45, Trichy Chennai Trunk Road,<br />
                  Samayapuram (Near Samayapuram Toll Plaza),<br />
                  Tiruchirappalli - 621 112.<br />
                  Tamil Nadu,<br />
                  India.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#D4AF37] shrink-0" />
                <p>Toll Free Number: 1800-5322-222</p>
              </div>

              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-[#D4AF37] shrink-0" />
                <p>+91 63841 76766 | +91 63841 76769</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#D4AF37] shrink-0" />
                <a href="mailto:enquiry@dsuniversity.ac.in" className="hover:underline hover:text-[#D4AF37] transition">
                  enquiry@dsuniversity.ac.in
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-[#D4AF37] shrink-0" />
                <a href="https://www.dsuniversity.ac.in" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#D4AF37] transition">
                  www.dsuniversity.ac.in
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5 pt-4">
              {[
                { icon: Facebook, link: '#' },
                { icon: X, link: '#' },
                { icon: Instagram, link: '#' },
                { icon: Youtube, link: '#' },
                { icon: Linkedin, link: '#' },
                { icon: Phone, link: '#' }
              ].map((soc, sIdx) => {
                const Icon = soc.icon
                return (
                  <a 
                    key={sIdx} 
                    href={soc.link} 
                    className="w-8 h-8 bg-white hover:bg-[#D4AF37] text-[#001c4f] hover:text-white rounded flex items-center justify-center transition shadow-md"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Column 2: Our Location */}
          <div className="space-y-6">
            <h3 className="text-white text-lg font-bold border-b border-white/20 pb-2 w-fit pr-8 uppercase tracking-wider">
              Our Location
            </h3>
            <div className="w-full h-[220px] rounded-xl overflow-hidden shadow-md border-4 border-white/20">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.4728254504104!2d78.730248!3d10.9276532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50ff2aaaaab%3A0x2a6b4478f4a3c2cf!2sDhanalakshmi%20Srinivasan%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="DSU Location Map"
              ></iframe>
            </div>
          </div>

        </div>
      </footer>

      {/* Bottom Copyright bar */}
      <div className="bg-[#000e28] py-4 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <p className="text-[11px] sm:text-xs font-bold text-[#fed501] text-left leading-relaxed">
            © Copyright 2025 - All Rights Reserved | Designed & Maintained by DSU - Trichy
          </p>
          <button 
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-[#1e3a8a] hover:bg-[#7B1E3A] text-white flex items-center justify-center transition shadow-md shrink-0"
            title="Scroll to Top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Right sticky vertical floating badge buttons */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-2.5 select-none">
        <button 
          onClick={handlePhDLogin}
          className="bg-[#001c4f] text-white border-l-2 border-white px-2 py-5 sm:px-2.5 sm:py-6 rounded-l-md shadow-2xl hover:bg-dsu-maroon transition duration-300 font-black text-[10px] sm:text-xs uppercase tracking-widest [writing-mode:vertical-lr] text-center"
        >
          PhD Portal Login
        </button>
      </div>

      {/* Back to top circular button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#337ab7] text-white p-3 rounded-full shadow-lg hover:bg-dsu-maroon transition-all duration-300 flex items-center justify-center border border-[#337ab7]/20"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

    </div>
  )
}
