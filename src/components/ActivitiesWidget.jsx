import React from 'react'

export default function ActivitiesWidget({items=[]}){
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-fit">
      <h3 className="font-semibold mb-3">Upcoming Activities</h3>
      <ul className="space-y-2">
        {items.length === 0 && <div className="text-sm text-slate-500">No upcoming activities</div>}
        {items.map(it => (
          <li key={it.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-slate-500">{it.date}</div>
            </div>
            <div className="text-sm text-slate-600">{it.type}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
