import React, { useState } from 'react'
import { 
  Shield, Calendar, 
  KeyRound, Clock, Check, FileText,
  User, Mail, Phone, MapPin, Award
} from 'lucide-react'

export default function Settings() {
  const role = localStorage.getItem('user_role') || 'scholar'
  const profileStr = localStorage.getItem('user_profile')
  let profileData = { name: 'Priya R', department: 'Computer Science', sub: 'DSU-PHD-2022-045' }
  if (profileStr) {
    try { profileData = JSON.parse(profileStr) } catch (e) {}
  }

  // Active settings category tab
  const [activeTab, setActiveTab] = useState('security')

  // Security configuration states
  const [lastPasswordChange, setLastPasswordChange] = useState('June 10, 2026 • 11:34 AM IST')
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' })
  const [loginActivities, setLoginActivities] = useState([
    { id: 1, device: 'Windows 11 (Chrome Browser)', location: 'Chennai, India', time: '2026-06-20 17:15', ip: '192.168.1.45' },
    { id: 2, device: 'macOS Sonoma (Safari Browser)', location: 'Trichy, India', time: '2026-06-18 09:30', ip: '172.16.22.109' },
    { id: 3, device: 'Ubuntu 22.04 (Firefox Browser)', location: 'Bangalore, India', time: '2026-06-12 14:02', ip: '10.0.4.12' }
  ])

  // Availability preferences states
  const [preferredDays, setPreferredDays] = useState(['Monday', 'Wednesday', 'Friday'])
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('02:00 PM - 04:00 PM')
  const [meetingPref, setMeetingPref] = useState('teams')

  // Submission handlers
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordForm.new !== passwordForm.confirm) {
      alert('New password and confirm password do not match!')
      return
    }
    setLastPasswordChange(new Date().toLocaleString() + ' (Updated)')
    setPasswordForm({ current: '', new: '', confirm: '' })
    alert('Password updated successfully!')
  }

  const toggleDay = (day) => {
    if (preferredDays.includes(day)) {
      setPreferredDays(preferredDays.filter(d => d !== day))
    } else {
      setPreferredDays([...preferredDays, day])
    }
  }

  const getRoleSettingsMeta = () => {
    const savedExt = localStorage.getItem('dsu_profile_data_' + role)
    let ext = {}
    if (savedExt) {
      try { ext = JSON.parse(savedExt) } catch(e){}
    }
    
    let base = {}
    switch (role) {
      case 'supervisor':   base = { idLabel: 'Faculty ID',   idVal: 'DSU-FAC-2018-09',  name: 'Dr. D. Srinivasan',     designation: 'Professor & Head',                       email: 'd.srinivasan@dsu.edu.in',   phone: '+91 94440 28105', office: 'Cabin 402, School of Computing' }; break;
      case 'dean':         base = { idLabel: 'Employee ID',  idVal: 'DSU-EMP-2012-01',  name: 'Dr. N. Deepalakshmi',   designation: 'Dean of Research & Innovation',          email: 'dean.research@dsu.edu.in',  phone: '+91 95430 11984', office: 'R&I Office, Administration Block' }; break;
      case 'dean_school':  base = { idLabel: 'Employee ID',  idVal: 'DSU-EMP-2015-18',  name: 'Dr. G. Amutha',          designation: 'Dean of School',                         email: 'dean.computing@dsu.edu.in', phone: '+91 98450 10294', office: 'School Dean Chamber' }; break;
      case 'registrar':    base = { idLabel: 'Employee ID',  idVal: 'DSU-REG-2010',     name: 'Registrar Academic',     designation: 'University Registrar (Academic)',         email: 'registrar@dsu.edu.in',      phone: '+91 90030 19004', office: 'Registrar Chambers Wing B' }; break;
      case 'ri_office':    base = { idLabel: 'Employee ID',  idVal: 'DSU-RI-33',        name: 'Research Office',                            designation: 'Office Registry Head',                   email: 'ri.office@dsu.edu.in',      phone: '+91 92834 10294', office: 'Research Cell Wing A' }; break;
      case 'vc':           base = { idLabel: 'Employee ID',  idVal: 'DSU-VC-2024',      name: 'VC Office',                                  designation: 'Honorable Vice Chancellor',              email: 'vc@dsu.edu.in',             phone: '+91 99002 99002', office: 'VC Secretariat Block' }; break;
      default:             base = { idLabel: 'Scholar ID',   idVal: profileData.sub,    name: 'Priya R',               designation: 'PhD Research Scholar',                   email: 'priya.r@dsu.edu.in',        phone: '+91 98765 43210', office: 'Research Desk 12, Computing Lab' }; break;
    }
    
    // Override with edited profile values
    if (ext.name) base.name = ext.name
    if (ext.designation) base.designation = ext.designation
    if (ext.email) base.email = ext.email
    if (ext.mobile) base.phone = ext.mobile
    
    return base
  }

  const meta = getRoleSettingsMeta()

  const tabs = [
    { key: 'security',      label: 'Security',      icon: Shield },
    { key: 'availability',  label: 'Availability',  icon: Calendar }
  ]

  const activeTabClass = (key) => `w-full flex items-center gap-3 px-4 py-3 text-xs font-bold transition rounded-xl ${activeTab === key ? 'bg-dsu-maroon text-white shadow-md shadow-dsu-maroon/20' : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'}`

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Breadcrumb */}
      <div className="flex justify-between items-center bg-white p-5 border border-slate-200 rounded-2xl shadow-sm">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">User Settings</p>
          <h1 className="text-xl font-black text-slate-900 mt-1">Portal Account Settings</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Configure your security and slot availability.</p>
        </div>
        <div className="hidden sm:flex items-center gap-3 bg-slate-50 border p-2.5 rounded-xl text-xs font-semibold text-slate-700">
          <User size={14} className="text-dsu-maroon shrink-0" />
          <div>
            <span className="block font-bold">{meta.name}</span>
            <span className="block text-[10px] text-slate-400 font-bold">{meta.designation}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side Navigation (Tabs) */}
        <div className="lg:col-span-1 space-y-2 font-bold text-slate-700">
          {tabs.map(t => {
            const TabIcon = t.icon
            return (
              <button key={t.key} onClick={() => setActiveTab(t.key)} className={activeTabClass(t.key)}>
                <TabIcon size={16} className={activeTab === t.key ? 'text-white' : 'text-dsu-maroon'} />
                <span className="text-left leading-tight">{t.label}</span>
              </button>
            )
          })}
        </div>

        {/* Right Side Settings Forms Card */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 font-bold text-slate-700">
          
          {/* TAB 1: Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Shield size={16} className="text-dsu-maroon" />
                  Security Configuration
                </h3>
                <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Manage password credentials and review recent access logins.</p>
              </div>

              {/* Form & Last Changed side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <form onSubmit={handlePasswordSubmit} className="md:col-span-3 bg-slate-50 border p-4 rounded-xl space-y-3.5 text-xs font-semibold text-slate-700">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Change Account Password</h4>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold">Current Password</label>
                    <input 
                      type="password" 
                      required
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                      placeholder="••••••••" 
                      className="w-full border p-2.5 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon font-bold" 
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold">New Password</label>
                    <input 
                      type="password" 
                      required
                      value={passwordForm.new}
                      onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                      placeholder="••••••••" 
                      className="w-full border p-2.5 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon font-bold" 
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold">Confirm New Password</label>
                    <input 
                      type="password" 
                      required
                      value={passwordForm.confirm}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                      placeholder="••••••••" 
                      className="w-full border p-2.5 rounded-lg bg-white focus:outline-none focus:border-dsu-maroon font-bold" 
                    />
                  </div>
                  <button type="submit" className="w-full bg-dsu-maroon text-white py-2.5 rounded-lg font-bold hover:bg-red-800 transition text-xs uppercase tracking-wider">
                    Change Password
                  </button>
                </form>

                <div className="md:col-span-2 space-y-4">
                  <div className="bg-slate-50 border p-4 rounded-xl">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Last Password Change</h4>
                    <div className="flex items-start gap-2.5 mt-3">
                      <Clock size={16} className="text-dsu-maroon shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-extrabold text-slate-800">{lastPasswordChange}</span>
                        <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">Keep credentials updated regularly.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Login Activity */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                  <Clock size={12} className="text-slate-400" />
                  Recent Login Activity Logs
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2 text-left">Device / OS</th>
                        <th className="px-4 py-2 text-left">Location</th>
                        <th className="px-4 py-2 text-left">IP Address</th>
                        <th className="px-4 py-2 text-left">Time Logged</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 font-bold text-slate-700">
                      {loginActivities.map(act => (
                        <tr key={act.id} className="hover:bg-slate-50/50 transition">
                          <td className="px-4 py-2.5 whitespace-nowrap">{act.device}</td>
                          <td className="px-4 py-2.5 whitespace-nowrap">{act.location}</td>
                          <td className="px-4 py-2.5 whitespace-nowrap text-slate-500 font-mono">{act.ip}</td>
                          <td className="px-4 py-2.5 whitespace-nowrap text-slate-400">{act.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Availability Settings */}
          {activeTab === 'availability' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Calendar size={16} className="text-dsu-maroon" />
                  Meeting Availability Settings
                </h3>
                <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Select preferred weekdays, time slots, and meeting medium for academic reviews.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Meeting Days */}
                <div className="bg-slate-50 border p-5 rounded-xl space-y-3">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Preferred Meeting Days</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                      <label key={day} className="flex items-center gap-2.5 p-2 bg-white rounded-lg border hover:bg-slate-50 transition cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={preferredDays.includes(day)}
                          onChange={() => toggleDay(day)}
                          className="accent-dsu-maroon cursor-pointer" 
                        />
                        <span>{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Time slot & Preference */}
                <div className="space-y-4">
                  {/* Time slot dropdown */}
                  <div className="bg-slate-50 border p-5 rounded-xl space-y-3">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Preferred Time Slot</h4>
                    <select 
                      value={preferredTimeSlot} 
                      onChange={(e) => setPreferredTimeSlot(e.target.value)}
                      className="w-full border p-2.5 rounded-lg bg-white text-xs text-slate-700 focus:outline-none focus:border-dsu-maroon font-bold cursor-pointer"
                    >
                      <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                      <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                      <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                    </select>
                  </div>

                  {/* Meeting medium preference */}
                  <div className="bg-slate-50 border p-5 rounded-xl space-y-3 text-xs font-semibold text-slate-700">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Online Meeting Preference</h4>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="radio" 
                          name="meetingPref" 
                          checked={meetingPref === 'teams'} 
                          onChange={() => setMeetingPref('teams')} 
                          className="accent-dsu-maroon" 
                        />
                        <span>MS Teams / GMeet</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="radio" 
                          name="meetingPref" 
                          checked={meetingPref === 'physical'} 
                          onChange={() => setMeetingPref('physical')} 
                          className="accent-dsu-maroon" 
                        />
                        <span>Physical (In-Person)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
