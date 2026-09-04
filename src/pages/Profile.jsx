import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useScholarData } from '../hooks/useFetchMock'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { 
  Mail, Phone, MapPin, Award, FileText, Layers, CalendarCheck, 
  CheckCircle2, UserCheck, Star, Users, Briefcase, Bookmark, 
  ShieldCheck, ShieldAlert, Activity, Landmark, Settings as Cog, Shield, Clock,
  Upload, Camera, KeyRound, Lock
} from 'lucide-react'

// Default values for each role
const defaults = {
  scholar: {
    name: 'Priya R',
    mobile: '+91 98765 43210',
    altMobile: '+91 98765 43211',
    email: 'priya.r@dsu.edu.in',
    designation: 'Research Scholar',
    department: 'Computer Science',
    specialization: 'Machine Learning, Data Privacy, Cybersecurity',
    photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'><rect width='128' height='128' rx='64' fill='%237B1E3A'/><circle cx='64' cy='48' r='22' fill='%23F5D6B8'/><path d='M28 114c5-24 23-38 36-38s31 14 36 38' fill='%23F5D6B8'/><path d='M42 62c6 8 16 13 22 13s16-5 22-13' fill='none' stroke='%237B1E3A' stroke-width='5' stroke-linecap='round'/></svg>",
    userId: 'DSU-PHD-2022-045',
    regNo: 'DSU/PhD/2022/045',
    school: 'School of Computing',
    faculty: 'Faculty of Engineering',
    org: 'Dhanalakshmi Srinivasan University'
  },
  supervisor: {
    name: 'Dr. D. Srinivasan',
    mobile: '+91 94440 28105',
    altMobile: '+91 94440 28106',
    email: 'd.srinivasan@dsu.edu.in',
    designation: 'Professor & Head',
    department: 'Computer Science & Engineering',
    specialization: 'Artificial Intelligence, Deep Learning, Secure Smart Healthcare',
    photo: '',
    userId: 'DSU-FAC-2018-09',
    school: 'School of Computing',
    org: 'Dhanalakshmi Srinivasan University'
  },
  dean: {
    name: 'Dr. N. Deepalakshmi',
    mobile: '+91 94440 28101',
    altMobile: '+91 94440 28102',
    email: 'dean.research@dsu.edu.in',
    designation: 'Dean of Research & Innovation',
    department: 'Research & Innovation Cell',
    specialization: 'Advanced Algorithms, Distributed Databases, Edge Computing',
    photo: '',
    userId: 'DSU-EMP-2012-01',
    school: 'Research Office',
    org: 'Dhanalakshmi Srinivasan University'
  },
  dean_school: {
    name: 'Dr. G. Amutha',
    mobile: '+91 94440 28118',
    altMobile: '+91 94440 28119',
    email: 'dean.computing@dsu.edu.in',
    designation: 'Dean & Professor',
    department: 'School of Computing',
    specialization: 'Data Mining, Wireless Networks, Cyber Security',
    photo: '',
    userId: 'DSU-EMP-2015-18',
    school: 'School of Computing',
    org: 'Dhanalakshmi Srinivasan University'
  },
  registrar: {
    name: 'Registrar Office',
    mobile: '+91 94440 28100',
    altMobile: '+91 94440 28109',
    email: 'registrar@dsu.edu.in',
    designation: 'University Registrar (Academic)',
    department: 'Academic Administration',
    specialization: 'Higher Education Regulation',
    photo: '',
    userId: 'DSU-REG-2010',
    school: 'Academic Affairs',
    org: 'Dhanalakshmi Srinivasan University'
  },
  vc: {
    name: 'Dr. R. Kumar',
    mobile: '+91 98765 43210',
    altMobile: '+91 98765 43219',
    email: 'vc@dsu.edu.in',
    designation: 'Vice Chancellor',
    department: 'Office of the Vice Chancellor',
    specialization: 'Higher Education Administration, Research Management',
    photo: '',
    userId: 'VC001',
    school: 'Executive Office',
    org: 'Dhanalakshmi Srinivasan University'
  },
  admin: {
    name: 'Systems Administrator',
    mobile: '+91 99999 88888',
    altMobile: '+91 99999 77777',
    email: 'admin@dsu.edu.in',
    designation: 'System Administrator',
    department: 'IT Infrastructure & Support',
    specialization: 'System Administration',
    photo: '',
    userId: 'DSU-ADMIN-01',
    school: 'IT Department',
    org: 'Dhanalakshmi Srinivasan University'
  },
  ri_office: {
    name: 'Research & Innovation Office',
    mobile: '+91 XXXXX XXXXX',
    altMobile: '',
    email: 'ri.office@dsu.edu.in',
    designation: 'Research & Innovation Administration',
    department: 'Research & Innovation (R&I)',
    specialization: 'Research Verification, Publication Review, Plagiarism Monitoring, Thesis Processing',
    photo: '',
    userId: 'RI001',
    school: 'Research & Innovation (R&I)',
    org: 'Dhanalakshmi Srinivasan University',
    officeLocation: 'Research & Innovation Office, DSU Campus'
  }
}

export default function Profile() {
  const role = localStorage.getItem('user_role') || 'scholar'
  const location = useLocation()
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search)

  const { scholar, loading } = useScholarData()
  const [activeTab, setActiveTab] = useState('research')
  const [isEditing, setIsEditing] = useState(query.get('mode') === 'edit')
  
  // Dynamic profile data state
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('dsu_profile_data_' + role)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {}
    }
    
    // Parse name and dept from user_profile to align with current session
    const userProfileStr = localStorage.getItem('user_profile')
    let userProfile = {}
    if (userProfileStr) {
      try { userProfile = JSON.parse(userProfileStr) } catch(e){}
    }
    
    const base = { ...(defaults[role] || defaults['ri_office']) }
    if (userProfile.name) base.name = userProfile.name
    if (userProfile.department) base.department = userProfile.department
    return base
  })

  const [formValues, setFormValues] = useState({ ...profile })
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [successMessage, setSuccessMessage] = useState('')
  const [validationError, setValidationError] = useState('')

  // Sync mode with URL search query
  useEffect(() => {
    setIsEditing(query.get('mode') === 'edit')
  }, [location.search])

  // Initialize values when state changes
  useEffect(() => {
    setFormValues({ ...profile })
  }, [profile])

  const handleInputChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }))
    setValidationError('')
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!validTypes.includes(file.type)) {
      setValidationError('Profile image should support JPG, JPEG, and PNG formats!')
      return
    }
    
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormValues(prev => ({ ...prev, photo: reader.result }))
      setValidationError('')
    }
    reader.readAsDataURL(file)
  }

  const handleSave = (e) => {
    e.preventDefault()
    
    // Validations
    // Email Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formValues.email)) {
      setValidationError('Please enter a valid email address.')
      return
    }
    
    // Mobile Check (only digits, optional +, spaces, dashes, min 10 digits)
    const phoneDigits = formValues.mobile.replace(/[^0-9]/g, '')
    if (phoneDigits.length < 10) {
      setValidationError('Mobile number must contain valid digits (minimum 10 digits).')
      return
    }
    
    if (formValues.altMobile) {
      const altPhoneDigits = formValues.altMobile.replace(/[^0-9]/g, '')
      if (altPhoneDigits.length < 10) {
        setValidationError('Alternate mobile number must contain valid digits (minimum 10 digits).')
        return
      }
    }
    
    // Password Check
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        setValidationError('Password confirmation must match.')
        return
      }
    }

    // Save profile data
    const updated = { ...formValues }
    setProfile(updated)
    localStorage.setItem('dsu_profile_data_' + role, JSON.stringify(updated))
    
    // Sync back to general user_profile
    const userProfileStr = localStorage.getItem('user_profile')
    if (userProfileStr) {
      try {
        const up = JSON.parse(userProfileStr)
        localStorage.setItem('user_profile', JSON.stringify({
          ...up,
          name: updated.name,
          department: updated.department
        }))
      } catch (e) {}
    }
    
    // If scholar, also update local storage key for scholar profile view
    if (role === 'scholar') {
      localStorage.setItem('dsu_scholar_profile', JSON.stringify(updated))
    }

    // Trigger Topbar update event
    window.dispatchEvent(new Event('profile_updated'))
    
    setSuccessMessage('Profile updated successfully.')
    setIsEditing(false)
    setPassword('')
    setConfirmPassword('')
    
    // Scroll to top to see success message
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Clean mode param
    navigate('/profile')
  }

  const handleCancel = () => {
    setFormValues({ ...profile })
    setPassword('')
    setConfirmPassword('')
    setValidationError('')
    setIsEditing(false)
    navigate('/profile')
  }

  // ──── HELPER RENDER CARD ────
  const renderCard = (title, value, icon) => {
    const Icon = icon
    return (
      <div className="bg-white px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm hover:-translate-y-0.5 transition duration-300">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{title}</p>
          <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5">{value}</p>
        </div>
        {Icon && (
          <div className="p-2 bg-dsu-maroon/10 rounded-lg text-dsu-maroon shrink-0">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
    )
  }

  // ──── HELPER ROLE HEADER ────
  const getRoleHeader = (roleTitle, idLabel, idVal) => {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-xl bg-dsu-maroon/10 ring-1 ring-dsu-maroon/20 flex items-center justify-center text-lg font-black text-dsu-maroon shrink-0">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              profile.name?.charAt(0) || 'R'
            )}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{roleTitle} Profile</p>
            <h1 className="mt-0.5 text-lg sm:text-xl font-bold text-slate-900 leading-tight">{profile.name}</h1>
            <p className="text-xs text-slate-500 font-semibold">{profile.department}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
          <div className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm flex flex-col justify-center text-left">
            <span className="text-slate-400 font-black uppercase tracking-wider text-[8px] block leading-none">{idLabel}</span>
            <span className="text-xs font-black text-slate-900 mt-0.5 block leading-none">{idVal}</span>
          </div>
          <button
            onClick={() => {
              setIsEditing(true)
              navigate('/profile?mode=edit')
            }}
            className="rounded-lg bg-dsu-maroon px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-800 shadow-sm uppercase tracking-wider"
          >
            Edit Profile
          </button>
        </div>
      </div>
    )
  }

  // ──── 0. EDIT PROFILE LAYOUT ────
  if (isEditing) {
    return (
      <div className="space-y-6 pb-6">
        {/* Header card with maroon gradient */}
        <section className="bg-gradient-to-r from-[#7B1E3A] to-[#5a1229] p-6 rounded-2xl text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-xl uppercase tracking-wider text-white">Edit User Profile</h3>
            <p className="text-xs font-bold text-red-100 uppercase tracking-widest mt-1">Configure your personal and professional details</p>
          </div>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-[10px] rounded-xl transition shrink-0 shadow-sm"
          >
            Cancel Edit
          </button>
        </section>

        {validationError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-4 flex items-start gap-2 font-semibold animate-shake">
            <ShieldAlert className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
          
          {/* LEFT COLUMN: Photo Upload & Security Preferences */}
          <div className="space-y-6">
            
            {/* Profile Photo Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b pb-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-dsu-maroon"></span>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Account Avatar</h4>
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border border-slate-200 bg-slate-50 ring-4 ring-slate-100 flex items-center justify-center">
                  {formValues.photo ? (
                    <img src={formValues.photo} alt="Avatar Preview" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-dsu-maroon">{formValues.name?.charAt(0) || 'U'}</span>
                  )}
                  <label className="absolute bottom-0 inset-x-0 bg-black/60 py-1 text-center text-[9px] font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-black/80 transition flex items-center justify-center gap-1">
                    <Camera className="w-3 h-3" />
                    Upload
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accepted Formats</p>
                  <p className="text-[9px] font-semibold text-slate-500 leading-tight mt-0.5">JPG, JPEG, PNG (under 5MB)</p>
                </div>
              </div>
            </div>

            {/* Password Change Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b pb-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#001c4f]"></span>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Security Credentials</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon font-semibold"
                  />
                </div>
                
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon font-semibold"
                  />
                </div>
              </div>
            </div>
            
          </div>

          {/* RIGHT COLUMN: Profile Fields */}
          <div className="space-y-6">
            
            {/* Personal Details */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b pb-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-dsu-maroon"></span>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Personal Information</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formValues.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formValues.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Mobile Number</label>
                  <input
                    type="text"
                    required
                    value={formValues.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Alternate Mobile Number</label>
                  <input
                    type="text"
                    value={formValues.altMobile || ''}
                    onChange={(e) => handleInputChange('altMobile', e.target.value)}
                    placeholder="Optional alternative contact"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b pb-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#001c4f]"></span>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Professional Information</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Designation</label>
                  <input
                    type="text"
                    required
                    value={formValues.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Department</label>
                  <input
                    type="text"
                    required
                    value={formValues.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon font-semibold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Research Area / Specialization</label>
                  <input
                    type="text"
                    value={formValues.specialization || ''}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    placeholder="Enter academic specialization"
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Read-Only Details */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b pb-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">System Information (Read-Only)</h4>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-650">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">User ID / Employee ID</span>
                  <span className="text-slate-800 font-extrabold block mt-0.5">{profile.userId}</span>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Role</span>
                  <span className="text-slate-800 font-extrabold block mt-0.5 uppercase">{role}</span>
                </div>
                
                {profile.school && (
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">School Name</span>
                    <span className="text-slate-800 font-extrabold block mt-0.5 truncate">{profile.school}</span>
                  </div>
                )}
                
                {role === 'scholar' && profile.regNo && (
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Registration Number</span>
                    <span className="text-slate-800 font-extrabold block mt-0.5">{profile.regNo}</span>
                  </div>
                )}

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 col-span-2 md:col-span-3">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Organization</span>
                  <span className="text-slate-800 font-extrabold block mt-0.5">{profile.org}</span>
                </div>
              </div>
            </div>

            {/* Actions Form Footer */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold uppercase tracking-wider text-[10px] rounded-xl transition shadow-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-dsu-maroon hover:bg-red-800 text-white font-bold uppercase tracking-wider text-[10px] rounded-xl shadow-md transition"
              >
                Save Changes
              </button>
            </div>
            
          </div>
          
        </form>
      </div>
    )
  }

  // ──── 1. SCHOLAR PROFILE VIEW ────
  if (role === 'scholar') {
    if (loading || !scholar) return <LoadingSkeleton className="h-32" />
    
    // Override scholar attributes with current local profile updates
    const currentScholar = {
      ...scholar,
      name: profile.name,
      email: profile.email,
      mobile: profile.mobile,
      photo: profile.photo || scholar.photo
    }

    return (
      <div className="space-y-3 pb-6">
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center justify-between text-xs font-bold shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-emerald-500 hover:text-emerald-700 font-bold uppercase text-[9px] px-2.5 py-1 rounded-md border border-emerald-200 bg-white hover:bg-emerald-50 transition">
              Dismiss
            </button>
          </div>
        )}

        <div className="grid gap-3 items-start xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-xl bg-dsu-maroon/10 ring-1 ring-dsu-maroon/20 shrink-0">
                  {currentScholar.photo ? (
                    <img src={currentScholar.photo} alt={currentScholar.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-lg font-black text-dsu-maroon">{currentScholar.name?.charAt(0) || 'S'}</div>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Scholar Overview</p>
                  <h1 className="mt-0.5 text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">{currentScholar.name}</h1>
                  <p className="text-xs text-slate-500 font-semibold">{currentScholar.researchTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <div className="rounded-full border border-dsu-maroon/20 bg-dsu-maroon/5 px-2.5 py-1 text-xs font-bold text-dsu-maroon">
                  {currentScholar.status}
                </div>
                <button
                  onClick={() => {
                    setIsEditing(true)
                    navigate('/profile?mode=edit')
                  }}
                  className="rounded-lg bg-dsu-maroon px-2.5 py-1 text-xs font-bold text-white transition hover:bg-red-800 uppercase tracking-wider"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="mt-3.5 grid gap-2 grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Scholar ID</p>
                <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{currentScholar.scholarId}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Registration No.</p>
                <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{currentScholar.regNo}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Department</p>
                <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{currentScholar.department}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">School / Faculty</p>
                <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm truncate">{currentScholar.school} / {currentScholar.faculty}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Admission Year</p>
                <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{currentScholar.admissionYear}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Enrollment</p>
                <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{currentScholar.enrollmentType}</p>
              </div>
            </div>
          </div>

          <div className="self-stretch rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between gap-3 border-b pb-2 mb-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Contact Information</p>
                <h2 className="text-sm font-bold text-slate-955">Contact Details</h2>
              </div>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-1">
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                <Mail className="h-4 w-4 text-dsu-maroon shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Email</p>
                  <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm truncate">{currentScholar.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                <Phone className="h-4 w-4 text-dsu-maroon shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Mobile Number</p>
                  <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{currentScholar.mobile}</p>
                </div>
              </div>
              {profile.altMobile && (
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <Phone className="h-4 w-4 text-dsu-maroon shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Alternate Contact</p>
                    <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.altMobile}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100 md:col-span-2 xl:col-span-1">
                <MapPin className="mt-0.5 h-4 w-4 text-dsu-maroon shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Address</p>
                  <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm leading-tight">{currentScholar.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          {/* Tabs header */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2 mb-3">
            <button
              onClick={() => setActiveTab('research')}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg transition duration-150 ${activeTab === 'research' ? 'bg-dsu-maroon text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              Research & Academic Profile
            </button>
            <button
              onClick={() => setActiveTab('supervisor')}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg transition duration-150 ${activeTab === 'supervisor' ? 'bg-dsu-maroon text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              Supervisor Details
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg transition duration-150 ${activeTab === 'timeline' ? 'bg-dsu-maroon text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              Progress Timeline
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg transition duration-150 ${activeTab === 'documents' ? 'bg-dsu-maroon text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              Scholar Documents
            </button>
          </div>

          {/* Tab content */}
          {activeTab === 'research' && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-100 p-3.5 bg-slate-50/30">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-1.5 mb-3">Research Profile</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Research Title</span>
                    <span className="font-bold text-slate-900 block leading-snug mt-0.5 text-sm sm:text-base">{currentScholar.researchTitle}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Specializations</span>
                    <span className="font-bold text-slate-900 block leading-snug mt-0.5 text-xs">{profile.specialization}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Research Area</span>
                      <span className="font-bold text-slate-900 block mt-0.5 text-xs sm:text-sm">{currentScholar.researchArea}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Research Domain</span>
                      <span className="font-bold text-slate-900 block mt-0.5 text-xs sm:text-sm">{currentScholar.researchDomain}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2.5 pt-1">
                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm flex flex-col justify-center text-center">
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Progress</span>
                      <span className="font-black text-dsu-maroon text-base sm:text-lg block mt-1">{currentScholar.researchProgress}%</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm flex flex-col justify-center text-center">
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Thesis</span>
                      <span className="font-bold text-slate-900 text-xs block mt-1 truncate">{currentScholar.thesisStatus}</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm flex flex-col justify-center text-center">
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Pubs</span>
                      <span className="font-bold text-slate-900 text-xs block mt-1">{currentScholar.publicationsCount}</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm flex flex-col justify-center text-center">
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Patents</span>
                      <span className="font-bold text-slate-900 text-xs block mt-1">{currentScholar.patentsCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-100 p-3.5 bg-slate-50/30">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-1.5 mb-3">Academic Details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Registration Date</span>
                      <span className="font-bold text-slate-900 block mt-0.5 text-xs sm:text-sm">
                        {new Date(currentScholar.registrationDate).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Expected Completion</span>
                      <span className="font-bold text-slate-900 block mt-0.5 text-xs sm:text-sm">
                        {new Date(currentScholar.expectedCompletionDate).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm flex flex-col justify-center text-center">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Coursework Completion</span>
                      <span className="font-black text-dsu-maroon text-base sm:text-lg block mt-1">{currentScholar.courseworkCompletion}%</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm flex flex-col justify-center text-center">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Comprehensive Viva</span>
                      <span className="font-bold text-slate-900 text-xs block mt-1 truncate">{currentScholar.comprehensiveVivaStatus}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Department</span>
                      <span className="font-bold text-slate-900 block mt-0.5 text-xs sm:text-sm truncate">{currentScholar.department}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Enrollment Type</span>
                      <span className="font-bold text-slate-900 block mt-0.5 text-xs sm:text-sm">{currentScholar.enrollmentType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'supervisor' && (
            <div className="rounded-lg border border-slate-100 p-3 bg-slate-50/30">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-1.5 mb-2.5">Supervisor Details</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Primary Supervisor</span>
                    <span className="font-bold text-slate-900 block mt-0.5 text-xs sm:text-sm">{currentScholar.supervisorName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Designation</span>
                    <span className="font-bold text-slate-900 block mt-0.5 text-xs sm:text-sm">{currentScholar.supervisorDesignation}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Department</span>
                    <span className="font-bold text-slate-900 block mt-0.5 text-xs sm:text-sm">{currentScholar.supervisorDepartment}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Contact</span>
                    <span className="font-bold text-slate-900 block mt-0.5 text-xs sm:text-sm">{currentScholar.supervisorEmail}</span>
                  </div>
                  {currentScholar.coSupervisor && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Co-Supervisor</span>
                      <span className="font-bold text-slate-900 block mt-0.5 text-xs sm:text-sm">{currentScholar.coSupervisor}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-1.5 mb-2.5">Progress Timeline</h3>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {currentScholar.milestones.map((item) => (
                  <div key={item.title} className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/50 p-2">
                    <div className={`inline-flex h-6.5 w-6.5 items-center justify-center rounded-lg shrink-0 ${item.status === 'done' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                      {item.status === 'done' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Star className="h-3.5 w-3.5" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-900 leading-tight truncate">{item.title}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 leading-none">{item.status === 'done' ? 'Completed' : 'Pending'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-1.5 mb-2.5">Documents Repository</h3>
              <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {currentScholar.documents.map((doc) => {
                  const isAdmission = doc.title === 'Admission Documents';
                  const cardContent = (
                    <>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate leading-none">{doc.title}</p>
                      <div className="flex items-baseline gap-0.5 mt-1 leading-none">
                        <span className="text-sm sm:text-base font-bold text-slate-955">{doc.count}</span>
                        <span className="text-[8px] text-slate-400 uppercase font-semibold">files</span>
                      </div>
                      <p className="text-[9px] text-slate-500 truncate mt-1 leading-none">{doc.subtitle}</p>
                      {isAdmission && (
                        <span className="mt-2 inline-flex items-center gap-0.5 text-[8px] font-black text-dsu-maroon hover:text-red-950 transition uppercase tracking-wider leading-none">
                          Manage &rarr;
                        </span>
                      )}
                    </>
                  )
                  return isAdmission ? (
                    <Link key={doc.title} to="/admission" className="rounded-lg border border-slate-200 bg-slate-50 p-2 hover:bg-slate-100/70 hover:border-dsu-maroon/30 transition shadow-sm block">
                      {cardContent}
                    </Link>
                  ) : (
                    <div key={doc.title} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                      {cardContent}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ──── 2. SUPERVISOR PROFILE VIEW ────
  if (role === 'supervisor') {
    return (
      <div className="space-y-3 pb-6">
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center justify-between text-xs font-bold shadow-sm animate-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-emerald-500 hover:text-emerald-700 font-bold uppercase text-[9px] px-2.5 py-1 rounded-md border border-emerald-200 bg-white hover:bg-emerald-50 transition">
              Dismiss
            </button>
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          {getRoleHeader('Research Supervisor', 'Faculty ID', profile.userId)}

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-3">
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Designation</p>
              <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.designation}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Department</p>
              <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.department}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 sm:col-span-2 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Research Specializations</p>
              <p className="mt-1 font-bold text-dsu-maroon text-xs sm:text-sm">{profile.specialization}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          {renderCard('Total Scholars', '15 Scholars', Users)}
          {renderCard('Active Scholars', '3 Scholars', Activity)}
          {renderCard('Completed Scholars', '12 Scholars', CheckCircle2)}
          {renderCard('Pending Approvals', '3 Pending', Clock)}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-1.5 mb-2.5">Contact Details</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
              <Mail className="h-4 w-4 text-dsu-maroon shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Email Address</p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1 truncate">{profile.email}</p>
              </div>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
              <Phone className="h-4 w-4 text-dsu-maroon shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Mobile Number</p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{profile.mobile}</p>
              </div>
            </div>
            {profile.altMobile && (
              <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
                <Phone className="h-4 w-4 text-dsu-maroon shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Alternate Contact</p>
                  <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{profile.altMobile}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ──── 3. DEAN RESEARCH PROFILE VIEW ────
  if (role === 'dean') {
    return (
      <div className="space-y-3 pb-6 animate-in fade-in duration-150">
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center justify-between text-xs font-bold shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-emerald-500 hover:text-emerald-700 font-bold uppercase text-[9px] px-2.5 py-1 rounded-md border border-emerald-200 bg-white hover:bg-emerald-50 transition">
              Dismiss
            </button>
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          {getRoleHeader('Dean of Research', 'Dean of Research ID', profile.userId)}

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3">
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Designation</p>
              <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.designation}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Research Office</p>
              <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.department}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Research Specializations</p>
              <p className="mt-1 font-bold text-dsu-maroon text-xs sm:text-sm truncate">{profile.specialization}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 grid-cols-3 lg:grid-cols-3">
          {renderCard('Total Schools', '5 Schools', Landmark)}
          {renderCard('Total Guides', '24 Guides', Users)}
          {renderCard('Total Scholars', '112 Scholars', Users)}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-1.5 mb-2.5">Contact Details</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
              <Mail className="h-4 w-4 text-dsu-maroon shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Email Address</p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1 truncate">{profile.email}</p>
              </div>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
              <Phone className="h-4 w-4 text-dsu-maroon shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Mobile Number</p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{profile.mobile}</p>
              </div>
            </div>
            {profile.altMobile && (
              <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
                <Phone className="h-4 w-4 text-dsu-maroon shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Alternate Contact</p>
                  <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{profile.altMobile}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ──── 5. DEAN OF SCHOOL PROFILE VIEW ────
  if (role === 'dean_school') {
    return (
      <div className="space-y-3 pb-6 animate-in fade-in duration-150">
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center justify-between text-xs font-bold shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-emerald-500 hover:text-emerald-700 font-bold uppercase text-[9px] px-2.5 py-1 rounded-md border border-emerald-200 bg-white hover:bg-emerald-50 transition">
              Dismiss
            </button>
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          {getRoleHeader('Dean of School', 'School Dean ID', profile.userId)}

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3">
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Designation</p>
              <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.designation}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">School Name</p>
              <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.department}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Research Specializations</p>
              <p className="mt-1 font-bold text-dsu-maroon text-xs sm:text-sm truncate">{profile.specialization}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 grid-cols-2 lg:grid-cols-2">
          {renderCard('Total Guides', '18 Guides', Users)}
          {renderCard('Total Scholars', '54 Scholars', Users)}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-1.5 mb-2.5">Contact Details</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
              <Mail className="h-4 w-4 text-dsu-maroon shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Email Address</p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1 truncate">{profile.email}</p>
              </div>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
              <Phone className="h-4 w-4 text-dsu-maroon shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Mobile Number</p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{profile.mobile}</p>
              </div>
            </div>
            {profile.altMobile && (
              <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
                <Phone className="h-4 w-4 text-dsu-maroon shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Alternate Contact</p>
                  <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{profile.altMobile}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ──── 6. REGISTRAR PROFILE VIEW ────
  if (role === 'registrar') {
    return (
      <div className="space-y-3 pb-6 animate-in fade-in duration-150 text-xs">
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center justify-between text-xs font-bold shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-emerald-500 hover:text-emerald-700 font-bold uppercase text-[9px] px-2.5 py-1 rounded-md border border-emerald-200 bg-white hover:bg-emerald-50 transition">
              Dismiss
            </button>
          </div>
        )}

        {/* Profile Header */}
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-xl bg-dsu-maroon/10 ring-1 ring-dsu-maroon/20 flex items-center justify-center text-lg font-black text-dsu-maroon shrink-0">
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
                ) : (
                  profile.name?.charAt(0) || 'R'
                )}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#D4AF37]">REGISTRAR PROFILE</p>
                <h1 className="mt-0.5 text-lg sm:text-xl font-bold text-slate-900 leading-tight">{profile.name || 'Registrar Office'}</h1>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">University Registrar</p>
              </div>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
              <div className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm flex flex-col justify-center text-left">
                <span className="text-slate-400 font-black uppercase tracking-wider text-[8px] block leading-none">REG ID</span>
                <span className="text-xs font-black text-slate-900 mt-0.5 block leading-none">{profile.userId || 'DSU-REG-2010'}</span>
              </div>
              <button
                onClick={() => {
                  setIsEditing(true)
                }}
                className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-[#7B1E3A] hover:text-red-800 transition uppercase tracking-wider shadow-sm flex items-center gap-1.5 shrink-0"
                type="button"
              >
                EDIT PROFILE
              </button>
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 mt-3">
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 flex flex-col justify-center shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Designation</p>
              <p className="mt-1.5 font-bold text-slate-900 text-xs sm:text-sm">{profile.designation || 'University Registrar (Academic)'}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 flex flex-col justify-center shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Office</p>
              <p className="mt-1.5 font-bold text-slate-900 text-xs sm:text-sm">{profile.department || 'Registrar Office'}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 flex flex-col justify-center shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Responsibilities</p>
              <p className="mt-1.5 font-bold text-dsu-maroon text-xs sm:text-sm truncate animate-pulse" title="Registration Management, Enrollment Processing, Academic Records, Degree Processing">
                Registration Management, Enrollment Processing, Academic Records, Degree Processing
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
          {renderCard('Pending Registration Approvals', '12', UserCheck)}
          {renderCard('Pending Enrollment Confirmations', '8', CheckCircle2)}
          {renderCard('Pending Academic Record Verifications', '6', FileText)}
        </div>

        {/* Contact details & Administrative Responsibilities grid */}
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          {/* Contact Details */}
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-[#001c4f] uppercase tracking-wide border-b pb-1.5 flex items-center gap-1.5">
              <Mail className="h-4 w-4 text-dsu-maroon" />
              Contact Details
            </h2>
            <div className="space-y-2">
              <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-3 border border-slate-100 shadow-sm">
                <Mail className="h-4 w-4 text-dsu-maroon shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Official Email Address</p>
                  <p className="font-bold text-slate-900 text-xs mt-1 truncate">
                    <a href={`mailto:${profile.email || 'registrar@dsu.edu.in'}`} className="hover:underline text-dsu-maroon">
                      {profile.email || 'registrar@dsu.edu.in'}
                    </a>
                  </p>
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-3 border border-slate-100 shadow-sm">
                <Phone className="h-4 w-4 text-dsu-maroon shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Contact Number</p>
                  <p className="font-bold text-slate-900 text-xs mt-1">{profile.mobile || '+91 XXXXX XXXXX'}</p>
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-3 border border-slate-100 shadow-sm">
                <MapPin className="h-4 w-4 text-dsu-maroon shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Office Location</p>
                  <p className="font-bold text-slate-900 text-xs mt-1 truncate" title="Registrar Office, Administrative Block, DSU Campus">
                    Registrar Office, Administrative Block, DSU Campus
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Administrative Responsibilities */}
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm flex flex-col">
            <h2 className="text-xs font-bold text-[#001c4f] uppercase tracking-wide border-b pb-1.5 mb-2.5 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-dsu-maroon" />
              Administrative Responsibilities
            </h2>
            <ul className="space-y-2 flex-1 flex flex-col justify-center text-slate-700 font-semibold">
              {[
                'Registration Approval',
                'Enrollment Confirmation',
                'Academic Record Verification',
                'Degree Processing',
                'Award Documentation Processing'
              ].map((resp, respIdx) => (
                <li key={respIdx} className="flex items-center gap-2 bg-slate-50/50 p-2 rounded-lg border border-slate-100 hover:border-slate-250 transition">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-xs text-slate-800">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // ──── 7. VICE CHANCELLOR PROFILE VIEW ────
  if (role === 'vc') {
    return (
      <div className="space-y-3 pb-6 animate-in fade-in duration-150">
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center justify-between text-xs font-bold shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-emerald-500 hover:text-emerald-700 font-bold uppercase text-[9px] px-2.5 py-1 rounded-md border border-emerald-200 bg-white hover:bg-emerald-50 transition">
              Dismiss
            </button>
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          {getRoleHeader('Vice Chancellor', 'VC ID', profile.userId)}

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 mt-3">
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Designation</p>
              <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.designation}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Office</p>
              <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.department}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Specialization</p>
              <p className="mt-1 font-bold text-dsu-maroon text-xs sm:text-sm truncate">{profile.specialization}</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
          {renderCard('Pending Examiner Panel Approvals', '5', UserCheck)}
          {renderCard('Pending Thesis Evaluation Approvals', '3', Layers)}
          {renderCard('Pending Final PhD Approvals', '2', Landmark)}
        </div>

        {/* Contact Information */}
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-1.5 mb-2.5">Contact Details</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
              <Mail className="h-4 w-4 text-dsu-maroon shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Email Address</p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1 truncate">{profile.email}</p>
              </div>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
              <Phone className="h-4 w-4 text-dsu-maroon shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Mobile Number</p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{profile.mobile}</p>
              </div>
            </div>
            {profile.altMobile && (
              <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
                <Phone className="h-4 w-4 text-dsu-maroon shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Alternate Contact</p>
                  <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{profile.altMobile}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ──── 8. RESEARCH & INNOVATION (R&I) PROFILE VIEW ────
  if (role === 'ri_office') {
    return (
      <div className="space-y-3 pb-6 animate-in duration-150">
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center justify-between text-xs font-bold shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-emerald-500 hover:text-emerald-700 font-bold uppercase text-[9px] px-2.5 py-1 rounded-md border border-emerald-200 bg-white hover:bg-emerald-50 transition">
              Dismiss
            </button>
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          {getRoleHeader('Research & Innovation Office', 'R&I ID', profile.userId)}

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 mt-3">
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Designation</p>
              <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.designation}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Office</p>
              <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.department}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Responsibilities</p>
              <p className="mt-1 font-bold text-dsu-maroon text-xs sm:text-sm truncate" title={profile.specialization}>{profile.specialization}</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
          {renderCard('Pending Application Verifications', '12', FileText)}
          {renderCard('Pending Publication Verifications', '14', Award)}
          {renderCard('Pending Plagiarism Approvals', '4', ShieldAlert)}
        </div>

        {/* Contact Information */}
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-1.5 mb-2.5">Contact Details</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
              <Mail className="h-4 w-4 text-dsu-maroon shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Official Email Address</p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1 truncate">{profile.email}</p>
              </div>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
              <Phone className="h-4 w-4 text-dsu-maroon shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Contact Number</p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{profile.mobile}</p>
              </div>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg flex items-center gap-2.5 border border-slate-100">
              <MapPin className="h-4 w-4 text-dsu-maroon shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Office Location</p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm mt-1 truncate" title={profile.officeLocation || 'Research & Innovation Office, DSU Campus'}>{profile.officeLocation || 'Research & Innovation Office, DSU Campus'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ──── 9. FALLBACK & FUTURE ROLES VIEW ────
  return (
    <div className="space-y-3 pb-6 animate-in">
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center justify-between text-xs font-bold shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage('')} className="text-emerald-500 hover:text-emerald-700 font-bold uppercase text-[9px] px-2.5 py-1 rounded-md border border-emerald-200 bg-white hover:bg-emerald-50 transition">
            Dismiss
          </button>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
        {getRoleHeader('Research Office', 'Employee ID', profile.userId)}
        
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 mt-3">
          <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Designation</p>
            <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.designation}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Department Details</p>
            <p className="mt-1 font-bold text-slate-900 text-xs sm:text-sm">{profile.department}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Email Address</p>
            <p className="mt-1 font-bold text-dsu-maroon text-xs sm:text-sm truncate">{profile.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
