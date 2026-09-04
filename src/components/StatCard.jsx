import React from 'react'

export default function StatCard({title, value, delta, color='bg-white'}){
  return (
    <div className={`p-4 rounded-lg shadow-sm ${color}`}>
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {delta && <div className="text-xs text-slate-400 mt-1">{delta}</div>}
    </div>
  )
}
