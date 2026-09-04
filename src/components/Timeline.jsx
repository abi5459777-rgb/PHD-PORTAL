import React from 'react'

export default function Timeline({milestones=[]}){
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full overflow-hidden">
      <h3 className="font-semibold mb-6 text-slate-800 text-base">PhD Journey</h3>
      
      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="relative flex items-start min-w-[1000px] justify-between px-6">
          {milestones.map((m, idx) => (
            <div key={m.key} className="relative z-10 flex flex-col items-center flex-1">
              
              {/* Connector line to next step */}
              {idx < milestones.length - 1 && (
                <div 
                  className={`absolute top-4 left-1/2 w-full h-0.5 -z-10 ${
                    m.status === 'done' && (milestones[idx+1].status === 'done' || milestones[idx+1].status === 'current')
                      ? 'bg-dsu-maroon' 
                      : 'bg-slate-200'
                  }`}
                />
              )}

              {/* Dot */}
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white transition-all duration-300 ${
                  m.status === 'done' 
                    ? 'border-dsu-maroon text-dsu-maroon font-bold ring-4 ring-red-50' 
                    : m.status === 'current' 
                    ? 'border-dsu-gold text-dsu-gold font-bold ring-4 ring-yellow-50 animate-pulse' 
                    : 'border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-xs">{idx + 1}</span>
              </div>
              
              {/* Title & Status */}
              <div className="text-center mt-3 max-w-[95px]">
                <div className={`text-[11px] font-bold leading-tight ${
                  m.status === 'done' 
                    ? 'text-dsu-maroon' 
                    : m.status === 'current' 
                    ? 'text-[#0033CC]' 
                    : 'text-slate-500'
                }`}>
                  {m.title}
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider font-extrabold">
                  {m.status === 'done' ? 'Completed' : m.status === 'current' ? 'In Progress' : 'Pending'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

