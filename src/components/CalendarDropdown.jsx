import React from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, ChevronRight, Flag, Target } from 'lucide-react'

const panelMotion = {
  initial: { opacity: 0, y: -10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 },
  transition: { duration: 0.18, ease: 'easeOut' },
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const priorityStyles = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-emerald-100 text-emerald-700',
}

export default function CalendarDropdown({ events = [], onNavigate }) {
  const upcomingEvents = [...events].sort((left, right) => new Date(left.date || 0) - new Date(right.date || 0))

  return (
    <motion.div
      {...panelMotion}
      className="absolute right-0 top-full z-50 mt-3 w-[min(30rem,calc(100vw-1rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
    >
      <div className="border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-dsu-gold/15 text-dsu-maroon">
            <CalendarDays className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Upcoming events</p>
            <p className="text-xs text-slate-500">Deadlines and academic milestones</p>
          </div>
        </div>
      </div>

      <div className="max-h-[30rem] overflow-y-auto p-3">
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <button
              key={event.id}
              type="button"
              onClick={() => onNavigate(event.route)}
              className="group flex w-full items-start gap-3 rounded-2xl border border-slate-100 p-3 text-left transition hover:-translate-y-0.5 hover:border-dsu-maroon/20 hover:bg-dsu-maroon/5"
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-dsu-maroon group-hover:bg-white">
                <Target className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="truncate text-sm font-semibold text-slate-900">{event.title}</p>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${priorityStyles[event.priority] || 'bg-slate-100 text-slate-600'}`}>
                    {event.priority}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{event.description}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <Flag className="h-3.5 w-3.5" />
                  {event.date ? dateFormatter.format(new Date(event.date)) : 'TBA'}
                </div>
              </div>

              <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-600" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}