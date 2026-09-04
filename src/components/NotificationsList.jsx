import React from 'react'
import { AlertCircle, CalendarClock, CheckCircle2 } from 'lucide-react'

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export default function NotificationsList({items=[]}){
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-fit">
      <h3 className="font-semibold mb-3">Recent Notifications</h3>
      <ul className="space-y-2">
        {items.length === 0 && <div className="text-sm text-slate-500">No notifications</div>}
        {items.map(n => (
          <li key={n.id} className={`rounded-xl border p-3 ${n.read ? 'border-slate-100 bg-white' : 'border-dsu-maroon/10 bg-dsu-maroon/5'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-slate-900">{n.title}</div>
                <div className="mt-1 text-sm text-slate-600">{n.message || n.body}</div>
              </div>
              <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${n.read ? 'bg-emerald-100 text-emerald-700' : 'bg-dsu-maroon/10 text-dsu-maroon'}`}>
                {n.read ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                {n.status || (n.read ? 'Read' : 'Unread')}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <CalendarClock className="h-3.5 w-3.5" />
                {n.date ? dateFormatter.format(new Date(n.date)) : 'Today'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
