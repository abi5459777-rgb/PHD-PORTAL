import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldAlert, ArrowLeft, KeyRound, Mail, UserCheck, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import logo from '../assets/dsu-logo.png'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForgot, setShowForgot] = useState(false)
  const [forgotUsername, setForgotUsername] = useState('')
  const [forgotStatus, setForgotStatus] = useState('idle') // 'idle', 'loading', 'success'

  const handleForgotSubmit = (e) => {
    e.preventDefault()
    if (!forgotUsername) {
      setError('Please enter your email or ID.')
      return
    }
    setForgotStatus('loading')
    setTimeout(() => {
      setForgotStatus('success')
    }, 1000)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    // Mock authentication check & role retrieval
    setTimeout(() => {
      setLoading(false)
      const inputVal = formData.username.trim()
      const inputLower = inputVal.toLowerCase()
      
      let role = 'scholar'
      let name = 'Priya R'
      let dept = 'Computer Science'
      let sub = 'DSU-PHD-2022-045'
      
      if (inputLower.includes('supervisor') || inputLower.includes('guide') || inputLower.includes('srinivasan')) {
        role = 'supervisor'
        name = 'Dr. D. Srinivasan'
        dept = 'Research Supervisor'
        sub = 'Dept of Computer Science'
      } else if (inputLower.includes('dean.school') || inputLower.includes('dean_school') || inputLower.includes('school')) {
        role = 'dean_school'
        name = 'Dr. G. Amutha'
        dept = 'Dean of School'
        sub = 'School of Computing'
      } else if (inputLower.includes('dean') || inputLower.includes('deepalakshmi')) {
        role = 'dean'
        name = 'Dr. N. Deepalakshmi'
        dept = 'Dean (Research)'
        sub = 'Research & Innovation'
      } else if (inputLower.includes('ri') || inputLower.includes('office') || inputLower.includes('research_office')) {
        role = 'ri_office'
        name = 'Research Office (R&I)'
        dept = 'R&I Administration'
        sub = 'Research Cell'
      } else if (inputLower.includes('registrar')) {
        role = 'registrar'
        name = 'Registrar Office'
        dept = 'University Registrar'
        sub = 'Administration'
      } else if (inputLower.includes('vc') || inputLower.includes('vice')) {
        role = 'vc'
        name = 'Vice Chancellor'
        dept = 'Vice Chancellor'
        sub = 'Executive Office'
      }
      
      // Store user info in localStorage for role-based dashboard & layouts
      localStorage.setItem('user_role', role)
      localStorage.setItem('user_profile', JSON.stringify({ name, department: dept, sub, scholarId: sub }))
      localStorage.setItem('user_username', inputVal)
      
      navigate('/dashboard')
    }, 800)
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      
      {/* Left Banner Panel (Maroon) */}
      <div className="w-full md:w-5/12 bg-dsu-maroon text-white flex flex-col justify-center items-center p-8 md:p-12 relative border-b-4 md:border-b-0 md:border-r-4 border-dsu-gold shrink-0">
        
        {/* Back Arrow */}
        <button 
          onClick={handleBackToHome}
          className="absolute top-6 left-6 text-white/80 hover:text-white transition flex items-center gap-1.5 text-xs font-bold"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </button>

        {/* Logo and DSU Credentials */}
        <div className="flex flex-col items-center text-center mt-6 md:mt-0">
          <img 
            src={logo} 
            alt="DSU Logo" 
            className="w-44 h-auto md:w-56 md:h-auto object-contain drop-shadow-xl"
          />
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#fed501]">
            Dhanalakshmi Srinivasan
          </p>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#fed501] mt-0.5">
            University
          </p>
          <h2 className="text-xl md:text-3xl font-black text-white mt-1 uppercase tracking-wide">
            PhD Research Portal
          </h2>
        </div>

        {/* Mini Footer Accent (Desktop only) */}
        <div className="absolute bottom-6 text-[10px] text-white/40 hidden md:block font-medium">
          © 2026 Dhanalakshmi Srinivasan University
        </div>
      </div>

      {/* Right Form Panel (White / Light Slate) */}
      <div className="w-full md:w-7/12 flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-xl relative">
          
          {showForgot ? (
            <div className="space-y-5">
              <div className="mb-6 text-center md:text-left">
                <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-wide">
                  Reset Portal Password
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-semibold">
                  Enter your registered Scholar ID or Email address to receive a recovery link.
                </p>
              </div>

              {forgotStatus === 'success' ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl p-4 space-y-2 font-semibold">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    Reset Instructions Sent!
                  </p>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    A password reset link has been dispatched to your university email address. Please follow the instructions to configure your credentials.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-start gap-2 font-semibold">
                      <ShieldAlert className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Scholar ID / Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        required
                        value={forgotUsername}
                        onChange={(e) => { setForgotUsername(e.target.value); setError('') }}
                        placeholder="e.g. DSU-PHD-2022-045"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-dsu-maroon focus:ring-2 focus:ring-dsu-maroon/10 focus:bg-white transition placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotStatus === 'loading'}
                    className="w-full rounded-xl bg-dsu-maroon text-white font-bold py-3.5 text-xs shadow-md hover:bg-red-800 transition uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-dsu-maroon/50 flex items-center justify-center gap-2"
                  >
                    {forgotStatus === 'loading' ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </button>
                </form>
              )}

              <button
                type="button"
                onClick={() => { setShowForgot(false); setForgotStatus('idle'); setError('') }}
                className="w-full text-center text-xs font-bold text-slate-500 hover:text-dsu-maroon transition mt-4"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center md:text-left">
                <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-wide">
                  Portal Account Login
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-semibold">
                  Enter your credentials.
                </p>

              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-start gap-2 font-semibold"
                  >
                    <ShieldAlert className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Username / Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <UserCheck className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      placeholder="Enter your ID or Email (e.g. DSU-PHD-2022-045)"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-dsu-maroon focus:ring-2 focus:ring-dsu-maroon/10 focus:bg-white transition placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Password</label>
                    <button
                      type="button"
                      onClick={() => { setShowForgot(true); setError('') }}
                      className="text-[10px] text-dsu-maroon font-bold hover:underline focus:outline-none"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <KeyRound className="h-4 w-4" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-12 py-3 text-sm text-slate-900 outline-none focus:border-dsu-maroon focus:ring-2 focus:ring-dsu-maroon/10 focus:bg-white transition placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input 
                    id="remember" 
                    type="checkbox" 
                    className="rounded border-slate-300 text-dsu-maroon focus:ring-dsu-maroon/20"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-500 select-none font-semibold">Remember my session</label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-dsu-maroon text-white font-bold py-3.5 text-xs shadow-md hover:bg-red-800 transition uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-dsu-maroon/50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    'Login to Dashboard'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
