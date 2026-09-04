import React from 'react'

export default function EmptyState({title='No data', description=''}){
  return (
    <div className="bg-white p-6 rounded-lg text-center text-slate-600">
      <div className="text-lg font-semibold mb-2">{title}</div>
      <div className="text-sm">{description}</div>
    </div>
  )
}
