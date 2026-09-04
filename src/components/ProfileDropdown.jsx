import React from 'react'
import { motion } from 'framer-motion'
import { LogOut, Settings, User } from 'lucide-react'


const panelMotion = {
  initial: { opacity: 0, y: -10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 },
  transition: { duration: 0.18, ease: 'easeOut' },
}

const menuItems = [
  { label: 'View Profile', icon: User, path: '/profile' },
  { label: 'Edit Profile', icon: User, path: '/profile?mode=edit' },
  { label: 'Settings', icon: Settings, path: '/settings' },
]

export default function ProfileDropdown({ scholar, onNavigate, onLogout }) {
  const role = localStorage.getItem('user_role') || 'scholar'

  return (
    <motion.div
      {...panelMotion}
      className="absolute right-0 top-full z-50 mt-3 w-[min(20rem,calc(100vw-1rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
    >
      <div className="border-b border-slate-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-dsu-maroon/10 ring-1 ring-dsu-maroon/10">
            {scholar?.photo ? (
              <img src={scholar.photo} alt={scholar.name || 'Scholar profile'} className="h-full w-full object-cover" />
            ) : (
              <User className="h-6 w-6 text-dsu-maroon" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">{scholar?.name || 'Scholar'}</p>
            <p className="truncate text-xs text-slate-500">{scholar?.scholarId || scholar?.regNo || 'Scholar ID unavailable'}</p>
            <p className="truncate text-xs text-slate-500">{scholar?.department || 'Department not set'}</p>
          </div>
        </div>

        {role === 'scholar' && (
          <dl className="mt-3.5 grid grid-cols-1 gap-2.5">
            <div className="rounded-xl bg-slate-50 px-3 py-2 border border-slate-100">
              <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Supervisor</dt>
              <dd className="mt-0.5 text-xs font-semibold text-slate-800">{scholar?.supervisorName || 'Dr. D. Srinivasan'}</dd>
            </div>
          </dl>
        )}
      </div>

      <div className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.path)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <Icon className="h-4 w-4 text-dsu-maroon" />
              <span className="flex-1">{item.label}</span>
            </button>
          )
        })}

        <button
          type="button"
          onClick={onLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4 text-red-600" />
          <span className="flex-1">Logout</span>
        </button>
      </div>
    </motion.div>
  )
}