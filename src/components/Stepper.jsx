import React from 'react'

export default function Stepper({steps=[]}){
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-fit">
      <h3 className="font-semibold mb-3">Thesis Status</h3>
      <ol className="space-y-3">
        {steps.map((s,idx) => (
          <li key={s.key} className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${s.status === 'done' ? 'bg-dsu-maroon' : s.status === 'current' ? 'bg-dsu-gold' : 'bg-gray-300'}`} />
            <div>
              <div className="font-medium">{s.title}</div>
              <div className="text-sm text-slate-500">{s.note}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
