import React from 'react'
import {
  dacSummary,
  upcomingDacMeetings,
  previousDacMeetings,
  minutesOfMeeting,
  presentationRepository,
  dacRecommendations,
  actionItems,
  supervisorRemarks,
} from '../data/dacReviewsData'

function SummaryCard({ label, value, description }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-4 text-4xl font-semibold text-dsu-maroon">{value}</p>
      <p className="mt-3 text-sm text-slate-500">{description}</p>
    </div>
  )
}

export default function DAC() {
  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">DAC Overview</p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900">DAC & Reviews Dashboard</h1>
            <p className="mt-2 text-sm text-slate-500">Track meeting status, recommendations, documents, and action items from your DAC panel.</p>
          </div>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dacSummary.map((item) => (
          <SummaryCard key={item.id} label={item.label} value={item.value} description={item.description} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr] items-start">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Upcoming DAC Meetings</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">Next Scheduled Reviews</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {upcomingDacMeetings.map((meeting) => (
              <div key={meeting.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{meeting.meeting}</p>
                    <p className="text-sm text-slate-500">{meeting.date} • {meeting.venue}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{meeting.status}</span>
                    <button className="rounded-2xl bg-dsu-maroon px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-800">{meeting.action}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 h-fit">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Previous DAC Meetings</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Meeting Outcomes</h2>
            <div className="mt-6 space-y-3">
              {previousDacMeetings.map((meeting) => (
                <div key={meeting.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{meeting.meeting}</p>
                      <p className="text-sm text-slate-500">{meeting.date}</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:items-end">
                      <span className="font-semibold text-slate-900">{meeting.outcome}</span>
                      <p className="text-sm text-slate-500">{meeting.recommendation}</p>
                      <button className="self-start rounded-2xl bg-dsu-maroon px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-800">View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Minutes of Meeting</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Uploaded Documents</h2>
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Meeting</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Uploaded By</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Document</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {minutesOfMeeting.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4 text-slate-900">{item.meeting}</td>
                      <td className="px-4 py-4 text-slate-500">{item.date}</td>
                      <td className="px-4 py-4 text-slate-900">{item.uploadedBy}</td>
                      <td className="px-4 py-4 text-slate-900">{item.document}</td>
                      <td className="px-4 py-4">
                        <button className="rounded-2xl border border-dsu-maroon bg-dsu-maroon/5 px-3 py-2 text-sm font-semibold text-dsu-maroon transition hover:bg-dsu-maroon/10">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] items-start">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Presentation Repository</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">Upload & Manage PPTs</h2>
            </div>
            <button className="rounded-2xl bg-dsu-maroon px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800">
              Upload Presentation
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Title</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Upload Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Version</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {presentationRepository.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 text-slate-900">{item.title}</td>
                    <td className="px-4 py-4 text-slate-500">{item.date}</td>
                    <td className="px-4 py-4 text-slate-900">{item.version}</td>
                    <td className="px-4 py-4">
                      <button className="rounded-2xl border border-dsu-maroon bg-dsu-maroon/5 px-3 py-2 text-sm font-semibold text-dsu-maroon transition hover:bg-dsu-maroon/10">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6 h-fit">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">DAC Recommendations</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Committee Guidance</h2>
            <div className="mt-6 space-y-3">
              {dacRecommendations.map((rec) => (
                <div key={rec.id} className="rounded-3xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{rec.text}</p>
                  <p className="mt-1 text-sm text-slate-500">Status: {rec.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Action Items</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Pending Tasks</h2>
            <div className="mt-6 space-y-3">
              {actionItems.map((item) => (
                <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{item.task}</p>
                      <p className="text-sm text-slate-500">Due: {item.due}</p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Supervisor Remarks</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Advisor Feedback</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">{supervisorRemarks}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
