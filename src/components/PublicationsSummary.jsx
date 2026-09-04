import React from 'react'

export default function PublicationsSummary({data={}}){
  const items = [
    {k: 'Journal Papers', v: data.journal || 0},
    {k: 'Conference Papers', v: data.conference || 0},
    {k: 'Patents', v: data.patents || 0},
    {k: 'Book Chapters', v: data.chapters || 0},
  ]
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-fit">
      <h3 className="font-semibold mb-3">Publication Summary</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map(it => (
          <div key={it.k} className="p-3 border rounded">
            <div className="text-sm text-slate-500">{it.k}</div>
            <div className="text-xl font-semibold">{it.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
