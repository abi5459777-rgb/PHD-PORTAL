import React from 'react'
import { motion } from 'framer-motion'
import { Bell, CheckCheck, ChevronRight, Clock3, Inbox } from 'lucide-react'

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

export default function NotificationDropdown({ notifications = [], onNavigate, onMarkRead, onMarkAllRead }) {
  const latestNotifications = [...notifications].sort((left, right) => new Date(right.date || 0) - new Date(left.date || 0)).slice(0, 5)

  return (
    <motion.div
      {...panelMotion}
      className="absolute right-0 top-full z-50 mt-3 w-[min(24rem,calc(100vw-1rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Notifications</p>
          <p className="text-xs text-slate-500">Latest updates from the portal</p>
        </div>
        <button
          type="button"
          onClick={onMarkAllRead}
          className="inline-flex items-center gap-1 rounded-full bg-dsu-maroon/10 px-3 py-1 text-xs font-semibold text-dsu-maroon transition hover:bg-dsu-maroon/15"
        >
          <CheckCheck className="h-3.5 w-3.5" />
          Mark all read
        </button>
      </div>

      <div className="max-h-[28rem] overflow-y-auto">
        {latestNotifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-10 text-center text-sm text-slate-500">
            <Inbox className="h-8 w-8 text-slate-300" />
            No notifications yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {latestNotifications.map((notification) => {
              const isUnread = !notification.read
              return (
                <div key={notification.id} className={`px-4 py-4 ${isUnread ? 'bg-dsu-gold/5' : ''}`}>
                  <button
                    type="button"
                    onClick={() => onNavigate('/notifications')}
                    className="group flex w-full items-start gap-3 rounded-xl text-left outline-none transition hover:bg-slate-50"
                  >
                    <div className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isUnread ? 'bg-dsu-maroon text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Bell className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className={`truncate text-sm font-semibold ${isUnread ? 'text-slate-900' : 'text-slate-700'}`}>
                          {notification.title}
                        </p>
                        <span className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${isUnread ? 'bg-dsu-maroon/10 text-dsu-maroon' : 'bg-slate-100 text-slate-500'}`}>
                          {notification.status || (isUnread ? 'Unread' : 'Read')}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                        {notification.message || notification.body}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {notification.date ? dateFormatter.format(new Date(notification.date)) : 'Today'}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-600" />
                  </button>

                  {isUnread && (
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          onMarkRead(notification.id)
                        }}
                        className="rounded-full border border-dsu-maroon/20 px-3 py-1 text-xs font-semibold text-dsu-maroon transition hover:bg-dsu-maroon/5"
                      >
                        Mark as read
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
        <button
          type="button"
          onClick={() => onNavigate('/notifications')}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-dsu-maroon px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-dsu-maroon/90"
        >
          View all notifications
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}