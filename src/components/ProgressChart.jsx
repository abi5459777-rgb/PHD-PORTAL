import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function ProgressChart({data=[]}){
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-fit">
      <h3 className="font-semibold mb-3">Research Progress</h3>
      <div style={{height:240}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0,100]} />
            <Tooltip />
            <Line type="monotone" dataKey="progress" stroke="#7B1E3A" strokeWidth={3} dot={{r:3}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
