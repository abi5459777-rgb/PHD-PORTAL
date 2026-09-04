import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, ArrowUp, GraduationCap, ChevronDown, 
  Calendar, Users, MapPin, Phone, Mail, Award, BookOpen,
  FileText, Globe, Facebook, Instagram, Youtube, Linkedin,
  Smartphone, X, Menu, ShieldCheck, Sparkles, TrendingUp,
  Clock, CheckCircle, HelpCircle, FileCheck, Landmark
} from 'lucide-react'
import logo from '../assets/dsu-logo.png'
import campusBanner from '../assets/dsu-campus.png'
import libraryStudents from '../assets/library_students.png'

export default function Home() {
  const navigate = useNavigate()
  const handleResearchNav = () => {
    window.__spa_navigated__ = true
    navigate('/research-and-innovation')
  }
  const handleAboutNav = () => {
    window.__spa_navigated__ = true
    navigate('/about-us')
  }
  const handleEnquiryNav = () => {
    window.__spa_navigated__ = true
    navigate('/contact-us')
  }
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Initialize SPA navigation flag on home mount
  useEffect(() => {
    window.__spa_navigated__ = true
  }, [])

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
                className="px-4 py-4 hover:bg-white/10 hover:text-white transition outline-none border-b-2 border-white"
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

      {/* 1. Hero Section with DSU Campus Image */}
      <section 
        className="relative bg-cover bg-center h-[680px] flex items-center border-b border-slate-200 overflow-hidden shadow-inner select-none"
        style={{ backgroundImage: `url(${campusBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#001c4fd8] via-[#521323be] to-[#001c4fd8] mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-white text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl"
          >
            <div className="bg-[#D4AF37] text-[#001c4f] px-4 py-1.5 rounded-md text-xs font-black uppercase tracking-widest w-fit shadow-md">
              DSU Research Office
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide leading-tight drop-shadow-lg">
              DSU PhD Research Portal
            </h2>
            <p className="text-base sm:text-lg text-slate-100/90 font-medium max-w-2xl leading-relaxed">
              Advancing Research, Innovation, and Scholarly Excellence. A centralized platform for PhD Research Scholars, Supervisors, and Administrators.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button 
              onClick={() => navigate('/login')}
              className="bg-white hover:bg-slate-100 text-[#001c4f] font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 border border-white"
            >
              PhD Login Portal
            </button>
          </motion.div>
        </div>
      </section>





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
