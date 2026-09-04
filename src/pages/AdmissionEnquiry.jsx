import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GraduationCap, Menu, X, Mail, Phone, MapPin,
  Facebook, Instagram, Youtube, Linkedin, CheckCircle,
  ArrowUp, Send, Globe, Smartphone
} from 'lucide-react'
import logo from '../assets/dsu-logo.png'
import campusBanner from '../assets/dsu-campus.png'

export default function AdmissionEnquiry() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const onScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (path) => {
    window.__spa_navigated__ = true
    navigate(path)
    setMobileMenuOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    e.target.reset()
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">



      <header className="bg-[#001c4f] text-white py-0 px-6 md:px-12 border-b border-white/10 shadow-sm select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5 cursor-pointer" onClick={() => handleNav('/')}>
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
      </header>

      {/* ── Navigation Bar ── */}
      <nav className="bg-[#7B1E3A] border-b border-red-950/40 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">

          {/* Mobile toggle */}
          <div className="flex items-center lg:hidden py-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <span className="text-xs font-extrabold uppercase text-white tracking-wider ml-2.5">Menu</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center w-full justify-between select-none text-xs font-extrabold uppercase text-white">
            <div className="flex items-center gap-4">
              <button onClick={() => handleNav('/')} className="px-4 py-4 hover:bg-white/10 transition outline-none">Home</button>
              <button onClick={() => handleNav('/about-us')} className="px-4 py-4 hover:bg-white/10 transition outline-none">About Us</button>
              <button onClick={() => handleNav('/research-and-innovation')} className="px-4 py-4 hover:bg-white/10 transition outline-none">Research &amp; Innovation</button>
              <button onClick={() => handleNav('/contact-us')} className="px-4 py-4 hover:bg-white/10 transition outline-none border-b-2 border-white">Contact Us</button>
            </div>
            <div className="py-2.5">
              <button
                onClick={() => handleNav('/login')}
                className="bg-[#001c4f] hover:bg-[#000e28] text-white px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-wider transition duration-200 shadow-sm flex items-center gap-1.5 border border-white/10 hover:scale-105"
              >
                <GraduationCap className="h-4 w-4 text-[#D4AF37]" />
                PhD Login Portal
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 flex flex-col gap-3 text-slate-800 text-sm font-bold shadow-lg">
            <button onClick={() => handleNav('/')} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A]">Home</button>
            <button onClick={() => handleNav('/about-us')} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A]">About Us</button>
            <button onClick={() => handleNav('/research-and-innovation')} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A]">Research &amp; Innovation</button>
            <button onClick={() => handleNav('/contact-us')} className="text-left py-2 border-b border-slate-100 text-[#7B1E3A]">Contact Us</button>
            <div className="pt-2">
              <button
                onClick={() => handleNav('/login')}
                className="w-full bg-[#7B1E3A] text-white text-xs font-black uppercase tracking-widest py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <GraduationCap className="h-4 w-4 text-[#D4AF37]" />
                PhD Login Portal
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Page Hero Banner ── (matches About Us) */}
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
            Contact Us
          </h2>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div className="bg-[#001c4f] py-3.5 px-6 md:px-12 text-slate-300 text-[11px] sm:text-xs font-semibold select-none border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span className="hover:text-white cursor-pointer transition" onClick={() => handleNav('/')}>Home</span>
          <span className="text-white/30">›</span>
          <span className="text-white">Contact Us</span>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 sm:p-10">

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-extrabold text-slate-900">Enquiry Submitted!</h3>
              <p className="text-sm text-slate-500 max-w-sm">
                Thank you for reaching out. Our admissions team will contact you within 2–3 working days.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-extrabold text-slate-900 mb-8 uppercase tracking-wider text-center">
                Contact Us
              </h2>
              <form className="space-y-5" onSubmit={handleSubmit}>

                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Your Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs text-slate-900 bg-slate-50 outline-none focus:border-[#7B1E3A] focus:ring-2 focus:ring-[#7B1E3A]/10 focus:bg-white transition font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs text-slate-900 bg-slate-50 outline-none focus:border-[#7B1E3A] focus:ring-2 focus:ring-[#7B1E3A]/10 focus:bg-white transition font-semibold"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs text-slate-900 bg-slate-50 outline-none focus:border-[#7B1E3A] focus:ring-2 focus:ring-[#7B1E3A]/10 focus:bg-white transition font-semibold"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. PhD Admission Eligibility Query"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs text-slate-900 bg-slate-50 outline-none focus:border-[#7B1E3A] focus:ring-2 focus:ring-[#7B1E3A]/10 focus:bg-white transition font-semibold"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Message Content <span className="text-red-500">*</span></label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write details of your inquiry..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs text-slate-900 bg-slate-50 outline-none focus:border-[#7B1E3A] focus:ring-2 focus:ring-[#7B1E3A]/10 focus:bg-white transition resize-none font-semibold"
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#7B1E3A] hover:bg-red-900 py-3.5 text-xs font-black text-white shadow-md transition uppercase tracking-wider border border-red-900/25 flex items-center justify-center gap-2"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send Inquiry Message
                </button>

                <p className="text-[10px] text-slate-400 text-center">
                  Fields marked with <span className="text-red-500">*</span> are required. We typically respond within 2–3 working days.
                </p>
              </form>
            </>
          )}
        </div>
      </main>

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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-8 h-8 rounded-full bg-[#1e3a8a] hover:bg-[#7B1E3A] text-white flex items-center justify-center transition shadow-md shrink-0"
            title="Scroll to Top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Back to top circular button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-[#337ab7] text-white p-3 rounded-full shadow-lg hover:bg-dsu-maroon transition-all duration-300 flex items-center justify-center border border-[#337ab7]/20"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
