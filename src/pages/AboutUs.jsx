import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, CheckCircle, MapPin, Phone, Mail, 
  Globe, Facebook, Instagram, Youtube, Linkedin, Smartphone, 
  X, Menu, ArrowUp
} from 'lucide-react'
import logo from '../assets/dsu-logo.png'
import campusBanner from '../assets/dsu-campus.png'

export default function AboutUs() {
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to home on page reload
  useEffect(() => {
    if (!window.__spa_navigated__) {
      navigate('/')
    }
  }, [navigate])

  const [activeTab, setActiveTab] = useState('about-us')
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

  const handleResearchNav = () => {
    window.__spa_navigated__ = true
    navigate('/research-and-innovation')
  }

  const handleEnquiryNav = () => {
    window.__spa_navigated__ = true
    navigate('/contact-us')
  }

  const handleAboutNav = () => {
    window.__spa_navigated__ = true
    navigate('/about-us')
  }



  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#7B1E3A]/10 selection:text-[#7B1E3A]">
      
      {/* Header Topbar Block */}
      <div className="bg-[#001c4f] text-white py-0 px-6 md:px-12 border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
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

      {/* Navigation Menu Bar */}
      <nav className="bg-[#7B1E3A] border-b border-red-950/40 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden py-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <span className="text-xs font-extrabold uppercase text-white tracking-wider ml-2.5">Menu</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center w-full justify-between select-none text-xs font-extrabold uppercase text-white">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')} 
                className="px-4 py-4 hover:bg-white/10 hover:text-white transition outline-none"
              >
                Home
              </button>
              <button 
                onClick={handleAboutNav} 
                className="px-4 py-4 hover:bg-white/10 hover:text-white transition outline-none border-b-2 border-white"
              >
                About Us
              </button>
              <button 
                onClick={handleResearchNav} 
                className="px-4 py-4 hover:bg-white/10 hover:text-white transition outline-none"
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

            {/* PhD LOGIN PORTAL Button */}
            <div className="py-2.5">
              <button 
                onClick={() => navigate('/login')}
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
          <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 flex flex-col gap-3 text-slate-800 text-sm font-bold shadow-lg">
            <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A]">Home</button>
            <button onClick={() => { handleAboutNav(); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A]">About Us</button>
            <button onClick={() => { handleResearchNav(); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A]">Research & Innovation</button>
            <button onClick={() => { handleEnquiryNav(); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A]">Contact Us</button>
            <div className="pt-2">
              <button 
                onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} 
                className="w-full bg-[#7B1E3A] text-white text-xs font-black uppercase tracking-widest py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
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
            About Us
          </h2>
        </div>
      </section>

      {/* Breadcrumb Path Bar */}
      <div className="bg-[#001c4f] py-3.5 px-6 md:px-12 text-slate-300 text-[11px] sm:text-xs font-semibold select-none border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button onClick={() => navigate('/')} className="hover:text-white transition cursor-pointer font-semibold">Home</button>
          <span className="text-slate-500">/</span>
          <button onClick={handleAboutNav} className="hover:text-white transition cursor-pointer font-semibold">About Us</button>
          <span className="text-slate-500">/</span>
          <span className="text-white uppercase">
            {activeTab === 'about-us' ? 'Office Information' : activeTab.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Sidebar Tabs Navigation */}
          <div className="lg:col-span-3 flex flex-col bg-white rounded-sm border border-slate-200 overflow-hidden shadow-sm select-none">
            <div className="bg-[#001c4f] text-white px-5 py-3.5 text-xs font-black uppercase tracking-wider text-left">
              Office Information
            </div>
            {[
              { id: 'about-us', label: 'About Us' },
              { id: 'vision-mission', label: 'Vision & Mission' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-5 py-3.5 border-b border-slate-100 last:border-b-0 text-[13px] font-bold transition-all duration-150 flex items-center justify-between ${
                  activeTab === tab.id 
                    ? 'bg-[#7B1E3A] text-white font-extrabold shadow-sm' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-l-transparent hover:border-l-[#7B1E3A]'
                }`}
              >
                <span className="truncate">{tab.label}</span>
                {tab.hasIcon && (
                  <span className="shrink-0 flex items-center bg-red-50 text-[#7B1E3A] rounded p-1 text-[9px] font-black uppercase tracking-wider scale-90 border border-red-200">
                    DOCX
                  </span>
                )}
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
                
                {/* 1. ABOUT US TAB (Integrated with DSU, PhD and R&I overview) */}
                {activeTab === 'about-us' && (
                  <div className="space-y-8">
                    {/* Top row: DSU & PhD Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                      {/* DSU column */}
                      <div className="space-y-4 text-left">
                        <span className="text-xs uppercase tracking-[0.25em] text-[#7B1E3A] font-bold">University Profile</span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#7B1E3A] uppercase tracking-wide">
                          About DSU
                        </h3>
                        <div className="h-1 w-20 bg-[#D4AF37] rounded-full"></div>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                          Dhanalakshmi Srinivasan University (DSU) is a world-class institution dedicated to excellence in education, research, and innovation. Established under the Tamil Nadu Private Universities Act, 2019, the university offers a multi-disciplinary learning environment designed to empower future leaders, researchers, and global citizens through hands-on education and robust industry linkages.
                        </p>
                        <p className="text-slate-500 text-[11px] leading-relaxed">
                          Located in the historic region of Tiruchirappalli, DSU stands out as a hub for cutting-edge academics, housing modern infrastructure, state-of-the-art research laboratories, and diverse schools of learning.
                        </p>
                      </div>

                      {/* PhD Column */}
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-left relative overflow-hidden">
                        <span className="text-xs uppercase tracking-[0.25em] text-[#7B1E3A] font-bold">Research Excellence</span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#7B1E3A] uppercase tracking-wide">
                          About PhD Programme
                        </h3>
                        <div className="h-1 w-20 bg-[#D4AF37] rounded-full"></div>
                        <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-semibold">
                          The Ph.D. Programme at Dhanalakshmi Srinivasan University is exclusively designed to promote high-quality, impact-driven research across diverse disciplines. With a strong focus on scientific rigor, interdisciplinary collaboration, and publication benchmarks (Scopus/WoS), DSU provides state-of-the-art research facilities, approved supervisors, and structured guidance throughout the PhD lifecycle.
                        </p>
                        <ul className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-800">
                          <li className="flex items-center gap-1.5">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                            Approved Guides
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                            Milestones Tracking
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                            NPTEL SWAYAM
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                            Indexed Publications
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Row: Office of R&I */}
                    <div className="pt-6 border-t border-slate-200 space-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#7B1E3A] uppercase tracking-wide">
                          ABOUT THE OFFICE OF RESEARCH & INNOVATION
                        </h3>
                        <h4 className="text-sm font-bold text-[#7B1E3A] mt-1">
                          at Dhanalakshmi Srinivasan University
                        </h4>
                      </div>

                      <p className="text-sm text-[#0033CC] leading-relaxed font-semibold">
                        The Office of Research & Innovation (O/o. R&I) functions as the strategic hub for fostering a vibrant, ethical, and impact-driven research ecosystem within the University. It integrates faculty, scientists, scholars, and external collaborators to advance knowledge creation, technology development, and societal transformation through interdisciplinary and translational research.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div>
                          <h5 className="text-sm font-extrabold text-[#7B1E3A] uppercase tracking-wide border-b border-slate-100 pb-1.5">
                            Vision-Driven Research Ecosystem
                          </h5>
                          <p className="text-xs text-[#0033CC] leading-relaxed font-bold mt-2">
                            The Office promotes a culture of inquiry that bridges academic excellence with real-world relevance. By aligning institutional strengths across Medicine, Engineering & Technology, Agricultural Sciences, Management, Arts, Science, Humanities, and emerging interdisciplinary domains, it enables collaborative solutions to contemporary global and regional challenges.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="text-sm font-extrabold text-[#7B1E3A] uppercase tracking-wide border-b border-slate-100 pb-1.5">
                            Strategic Functions
                          </h5>
                          <ul className="text-[11px] text-[#0033CC] space-y-2 list-none pl-1">
                            <li className="flex items-start gap-2 font-bold leading-tight">
                              <span className="text-[#7B1E3A] shrink-0">▶</span>
                              <span><strong>Policy Leadership:</strong> Quality benchmarks aligned with National accreditation.</span>
                            </li>
                            <li className="flex items-start gap-2 font-bold leading-tight">
                              <span className="text-[#7B1E3A] shrink-0">▶</span>
                              <span><strong>Capacity Building:</strong> Mentor/funding facilitation for faculty and scholars.</span>
                            </li>
                            <li className="flex items-start gap-2 font-bold leading-tight">
                              <span className="text-[#7B1E3A] shrink-0">▶</span>
                              <span><strong>Industry & Partnerships:</strong> Innovation and technology transfer linkages.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. VISION AND MISSION TAB */}
                {activeTab === 'vision-mission' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#7B1E3A] uppercase tracking-wide">
                        VISION AND MISSION
                      </h3>
                      <h4 className="text-sm font-bold text-[#7B1E3A] mt-1.5">
                        Office of Research and Innovation
                      </h4>
                    </div>

                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                      <h5 className="text-base font-extrabold text-[#7B1E3A] uppercase tracking-wide">
                        Our Vision
                      </h5>
                      <p className="text-sm text-[#0033CC] leading-relaxed font-semibold">
                        To foster a robust research ecosystem that drives innovation and multidisciplinary collaboration, contributing to a globally sustainable and equitable world.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                      <h5 className="text-base font-extrabold text-[#7B1E3A] uppercase tracking-wide">
                        Our Mission
                      </h5>
                      <ul className="text-xs text-[#0033CC] space-y-3.5 list-none pl-1">
                        <li className="flex items-start gap-2.5 font-bold leading-relaxed">
                           <span className="text-[#7B1E3A] shrink-0 mt-0.5">▶</span>
                          <span>To enable a robust and ethical research ecosystem that supports quality research, innovation, and scholarly excellence across disciplines.</span>
                        </li>
                        <li className="flex items-start gap-2.5 font-bold leading-relaxed">
                           <span className="text-[#7B1E3A] shrink-0 mt-0.5">▶</span>
                          <span>To promote multidisciplinary, translational, and impact-oriented research addressing societal, industrial, and global sustainability challenges.</span>
                        </li>
                        <li className="flex items-start gap-2.5 font-bold leading-relaxed">
                           <span className="text-[#7B1E3A] shrink-0 mt-0.5">▶</span>
                          <span>To strengthen research capacity and collaborations through infrastructure development, partnerships, funding facilitation, and effective knowledge dissemination.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}


                
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>



      {/* Footer Block */}
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

    </div>
  )
}
