import os

file_path = 'src/pages/Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Locate the supervisor scholars view block
start_target = "        {view === 'scholars' && (() => {"
end_target = "        })()}"

start_pos = content.find(start_target)
if start_pos == -1:
    print("Error: Could not find start target")
    exit(1)

end_pos = -1
search_pos = start_pos
while True:
    pos = content.find(end_target, search_pos)
    if pos == -1:
        break
    next_part = content[pos:pos+300]
    if "view === 'dac'" in next_part:
        end_pos = pos + len(end_target)
        break
    search_pos = pos + 1

if end_pos == -1:
    print("Error: Could not find matching end target")
    exit(1)

print(f"Target block start: {start_pos}, end: {end_pos}")

new_block = """        {view === 'scholars' && (() => {
          const scholars = [
            { name: 'Priya R',      reg: 'DSU-PHD-2022-045', dept: 'Computer Science', topic: 'Secure AI-Driven Framework for Smart Healthcare Systems',     status: 'Active',      progress: 85, milestone: 'Thesis Evaluation', pubs: 4, scopus: 3, patents: 1, pending: 'Thesis Review Pending',           meeting: 'Synopsis Meeting',   meetDate: '12 Jul 2026' },
            { name: 'Rajesh Kumar', reg: 'DSU-PHD-2023-012', dept: 'Computer Science', topic: 'Blockchain for Decentralized Cloud IoT Architectures',         status: 'Active',      progress: 50, milestone: 'Synopsis',          pubs: 2, scopus: 2, patents: 0, pending: 'Publication Verification Pending', meeting: 'Colloquium',         meetDate: '30 Jun 2026' },
            { name: 'Aishwarya S',  reg: 'DSU-PHD-2024-008', dept: 'Computer Science', topic: 'Explainable AI in Cybersecurity Systems',                       status: 'Coursework',  progress: 10, milestone: 'First DAC',        pubs: 0, scopus: 0, patents: 0, pending: 'DAC Approval Pending',              meeting: 'First DAC',          meetDate: '25 Jun 2026' },
            { name: 'Manoj Rajan',  reg: 'DSU-PHD-2021-031', dept: 'Computer Science', topic: 'Edge Computing Frameworks for Heterogeneous IoT Systems',       status: 'Completed',   progress: 100,milestone: 'Thesis Defense',  pubs: 6, scopus: 5, patents: 2, pending: 'No Pending Actions',              meeting: 'Thesis Defense',     meetDate: '20 Jul 2026' },
            { name: 'Divya Menon',  reg: 'DSU-PHD-2023-019', dept: 'Computer Science', topic: 'Natural Language Processing for Regional Language Preservation', status: 'Active',      progress: 40, milestone: 'Colloquium',       pubs: 1, scopus: 1, patents: 0, pending: 'Coursework Verification Pending',  meeting: 'Comprehensive Viva', meetDate: '05 Jul 2026' },
          ]

          // 1. PHASE DETAILS VIEW FOR A SPECIFIC SCHOLAR & PHASE
          if (activeSupervisorScholar && activeSupervisorPhase) {
            const s = activeSupervisorScholar
            const phase = activeSupervisorPhase

            // Form handler wrappers so forms update list states locally
            const onConstituteDac = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newDac = {
                id: dacPanels.length + 1,
                scholar: s.name,
                internal: formData.get('internal'),
                external: formData.get('external'),
                date: formData.get('date'),
                status: 'Pending Dean Approval'
              }
              setDacPanels([newDac, ...dacPanels])
              e.target.reset()
              alert('DAC Committee constituted successfully and submitted for Dean approval!')
            }

            const onAllocateCourse = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newAlloc = {
                id: courseworkAllocations.length + 1,
                scholar: s.name,
                course: formData.get('course'),
                credits: parseInt(formData.get('credits') || '4'),
                type: formData.get('type'),
                status: 'Approved'
              }
              setCourseworkAllocations([newAlloc, ...courseworkAllocations])
              e.target.reset()
              alert('Course successfully allocated to scholar!')
            }

            const onRequestViva = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newRequest = {
                id: vivaRequests.length + 1,
                scholar: s.name,
                date: formData.get('date'),
                external: formData.get('external'),
                status: 'Pending Approval'
              }
              setVivaRequests([newRequest, ...vivaRequests])
              e.target.reset()
              alert('Comprehensive Viva request filed successfully!')
            }

            const onScheduleColloquium = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newColl = {
                id: colloquiumSchedules.length + 1,
                scholar: s.name,
                topic: formData.get('topic'),
                date: formData.get('date'),
                status: 'Scheduled'
              }
              setColloquiumSchedules([newColl, ...colloquiumSchedules])
              e.target.reset()
              alert('Pre-Synopsis Colloquium scheduled successfully!')
            }

            const onRecommendSynopsis = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newSyn = {
                id: synopsisRequests.length + 1,
                scholar: s.name,
                title: formData.get('title'),
                date: formData.get('date'),
                status: 'Submitted'
              }
              setSynopsisRequests([newSyn, ...synopsisRequests])
              if (!synopsisExaminerStatus.find(ex => ex.scholar === s.name)) {
                setSynopsisExaminerStatus(prev => [{ id: prev.length + 1, scholar: s.name, panelStatus: 'Pending' }, ...prev])
              }
              e.target.reset()
              alert('Synopsis recommendation submitted successfully!')
            }

            const onForwardEvaluation = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newEval = {
                id: thesisEvaluations.length + 1,
                scholar: s.name,
                title: formData.get('title'),
                submissionDate: formData.get('date'),
                evalStatus: 'Pending Submission'
              }
              setThesisEvaluations([newEval, ...thesisEvaluations])
              if (!evaluationExaminerStatus.find(ex => ex.scholar === s.name)) {
                setEvaluationExaminerStatus(prev => [{ id: prev.length + 1, scholar: s.name, panelStatus: 'Pending' }, ...prev])
              }
              e.target.reset()
              alert('Thesis forwarded for evaluation successfully!')
            }

            const onRecommendDefense = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newDef = {
                id: defenseRequests.length + 1,
                scholar: s.name,
                title: formData.get('title'),
                date: formData.get('date'),
                status: 'Pending Approval'
              }
              setDefenseRequests([newDef, ...defenseRequests])
              e.target.reset()
              alert('Defense recommendation submitted successfully!')
            }

            const onUploadMom = (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const scholarName = formData.get('scholarName')
              const meetingType = formData.get('meetingType')
              const meetingDate = formData.get('meetingDate')
              const file = formData.get('momFile')
              const newMom = {
                id: uploadedMoms.length + 1,
                scholar: scholarName || s.name,
                type: meetingType || (phase + ' Meeting'),
                date: meetingDate || new Date().toISOString().split('T')[0],
                fileName: file && file.name ? file.name : `${(scholarName || s.name).toLowerCase().replace(' ', '_')}_mom.pdf`,
                status: 'Awaiting Audit'
              }
              setUploadedMoms([newMom, ...uploadedMoms])
              e.target.reset()
              alert(`Minutes of Meeting for ${newMom.type} uploaded successfully and sent to registry!`)
            }

            const renderMomUploadForm = () => {
              return (
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-dsu-maroon/8 flex items-center justify-center text-dsu-maroon">
                      <Upload className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-black text-dsu-maroon uppercase tracking-wider">Upload Minutes of Meeting</h4>
                  </div>

                  <form onSubmit={onUploadMom} className="space-y-3.5 text-xs font-semibold text-slate-700">
                    {/* Scholar name hidden element to preserve the handler payload */}
                    <input type="hidden" name="scholarName" value={s.name} />

                    <div>
                      <label className="block mb-1 text-slate-600 font-bold">Meeting Type</label>
                      <select name="meetingType" defaultValue={phase + " Meeting"} className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon font-bold" required>
                        <option value="First DAC Meeting">First DAC Meeting</option>
                        <option value="Comprehensive Viva">Comprehensive Viva</option>
                        <option value="Pre-Synopsis Colloquium">Pre-Synopsis Colloquium</option>
                        <option value="Synopsis Meeting">Synopsis Meeting</option>
                        <option value="Thesis Evaluation Review">Thesis Evaluation Review</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-1 text-slate-600 font-bold">Meeting Date</label>
                      <input type="date" name="meetingDate" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-xs focus:outline-none focus:border-dsu-maroon" required />
                    </div>

                    <div>
                      <label className="block mb-1 text-slate-600 font-bold">Upload MoM PDF</label>
                      <div className="border-2 border-dashed border-slate-200 hover:border-dsu-maroon/30 rounded-xl p-5 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-slate-50 transition cursor-pointer text-center relative">
                        <FileText className="w-6 h-6 text-slate-400 mb-1" />
                        <span className="text-[11px] font-bold text-slate-500">Click to upload PDF</span>
                        <span className="text-[9px] text-slate-400 mt-0.5">Max size: 10MB</span>
                        <input type="file" name="momFile" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" required />
                      </div>
                    </div>

                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-dsu-maroon hover:bg-red-800 text-white font-extrabold uppercase py-3 rounded-xl transition text-xs tracking-wider shadow-sm">
                      <Send className="w-3.5 h-3.5" />
                      Upload & Send to Registry
                    </button>
                  </form>

                  {/* List of uploaded documents for this scholar & phase */}
                  {uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes(phase) || m.type.toLowerCase().includes(phase.toLowerCase()))).length > 0 && (
                    <div className="border-t border-slate-100 pt-3 space-y-2">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Uploaded Documents History</p>
                      <div className="space-y-2">
                        {uploadedMoms.filter(m => m.scholar === s.name && (m.type.includes(phase) || m.type.toLowerCase().includes(phase.toLowerCase()))).map((m, idx) => (
                          <div key={idx} className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between text-[11px]">
                            <div>
                              <p className="font-bold text-slate-800 truncate max-w-[150px]">{m.fileName}</p>
                              <p className="text-[9px] text-slate-500">{m.date}</p>
                            </div>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{m.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            return (
              <div className="space-y-4">
                {/* Header with Back button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Milestone Phase Detail</span>
                    <h2 className="text-base font-black text-slate-900 mt-0.5">{s.name} &mdash; <span className="text-dsu-maroon">{phase}</span></h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{s.reg} &bull; {s.dept}</p>
                  </div>
                  <button 
                    onClick={() => setActiveSupervisorPhase(null)}
                    className="self-start sm:self-center px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition flex items-center gap-1.5"
                  >
                    &larr; Back to Phases
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                  {/* Scholar Dashboard View Box (Outcome & Details) */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="border-b pb-2 flex justify-between items-center">
                      <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scholar Dashboard view</h3>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Status & remarks from scholar portal</p>
                      </div>
                      <span className="text-[10px] font-black uppercase text-dsu-maroon bg-dsu-maroon/5 px-2 py-0.5 rounded border border-dsu-maroon/20">
                        {s.progress}% Progress
                      </span>
                    </div>

                    {phase === 'First DAC' && (() => {
                      const isCompleted = s.progress >= 10
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-amber-600" />}
                              <p className="font-extrabold uppercase tracking-wide">First DAC Meeting Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted 
                                ? `Completed on ${s.name === 'Aishwarya S' ? '25 Jun 2026' : '12 Jun 2026'}. Venue: Research Cell Conference Room.` 
                                : 'Scheduled/Awaiting scheduling.'}
                            </p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1">DAC Committee Constitution</p>
                            <p className="flex justify-between"><span>Convener:</span> <span className="font-bold text-slate-900">Dr. D. Srinivasan (Supervisor)</span></p>
                            <p className="flex justify-between"><span>Internal Member:</span> <span className="font-bold text-slate-900">Dr. R. Venkataraman</span></p>
                            <p className="flex justify-between"><span>External Member:</span> <span className="font-bold text-slate-900">Dr. M. Sathyapriya (NIT Trichy)</span></p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1">DAC Recommendations</p>
                            <p className="italic font-medium leading-relaxed">
                              "Scholar should complete 12 credits of coursework focusing on advanced research methodology and domain subjects. Coursework mappings approved."
                            </p>
                          </div>
                        </div>
                      )
                    })()}

                    {phase === 'Comprehensive Viva' && (() => {
                      const isCompleted = s.progress >= 40
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-amber-600" />}
                              <p className="font-extrabold uppercase tracking-wide">Comprehensive Viva Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted ? 'Passed & Recommended continuation' : 'Awaiting Coursework completion/scheduling'}
                            </p>
                          </div>

                          {isCompleted && (
                            <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
                              <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-2">Viva Evaluation Scores</p>
                              <div className="space-y-2.5">
                                {[
                                  { label: 'Domain Knowledge & Methodology', score: '44 / 50', pct: 88 },
                                  { label: 'Research Proposal Defensibility', score: '22 / 25', pct: 88 },
                                  { label: 'Q&A / Defence Performance', score: '23 / 25', pct: 92 }
                                ].map((sc, i) => (
                                  <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-[11px] font-bold">
                                      <span>{sc.label}</span>
                                      <span>{sc.score}</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${sc.pct}%` }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Committee Remarks</p>
                            <p className="italic font-medium leading-relaxed">
                              {isCompleted 
                                ? `"The scholar demonstrated a clear grasp of domain-specific challenges. The proposed methodology is logically sound. continuation recommended without reservations."` 
                                : `"Awaiting coursework clearance to formulate exam board."`}
                            </p>
                          </div>
                        </div>
                      )
                    })()}

                    {phase === 'Colloquium' && (() => {
                      const isCompleted = s.progress >= 50
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-505" />}
                              <p className="font-extrabold uppercase tracking-wide">Pre-Synopsis Colloquium Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted ? 'Completed & Approved' : (s.name === 'Divya Menon' || s.name === 'Rajesh Kumar' ? 'Scheduled for review' : 'Pending Stage')}
                            </p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Colloquium Details</p>
                            <p className="flex justify-between"><span>Presentation Date:</span> <span className="font-bold text-slate-900">{isCompleted ? '10 Jun 2026' : (s.name === 'Rajesh Kumar' ? '30 Jun 2026' : 'To be scheduled')}</span></p>
                            <p className="flex justify-between"><span>Venue:</span> <span className="font-bold text-slate-900">Auditorium 2, DSU Main Campus</span></p>
                            <p className="flex justify-between"><span>Mode:</span> <span className="font-bold text-slate-900">Offline (In-Person)</span></p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Committee Feedback</p>
                            <p className="italic font-medium leading-relaxed">
                              {isCompleted 
                                ? `"Research presented was methodologically sound. Simulation results were comprehensive. Permitted to proceed to thesis preparation."`
                                : `"Awaiting draft submission to initiate colloquium slot reservation."`}
                            </p>
                          </div>
                        </div>
                      )
                    })()}

                    {phase === 'Inch Committee' && (() => {
                      const isCompleted = s.progress >= 60
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-amber-600" />}
                              <p className="font-extrabold uppercase tracking-wide">Inch Committee Review Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted ? 'Approved with Corrections' : (s.name === 'Rajesh Kumar' ? 'Under Review' : 'Pending')}
                            </p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Audit Checklist</p>
                            <p className="flex items-center gap-1.5">✓ Coursework Credits: Verified (12 credits)</p>
                            <p className="flex items-center gap-1.5">✓ Plagiarism Index: Verified (&lt; 10% similarity)</p>
                            <p className="flex items-center gap-1.5">{isCompleted ? '✓' : '⌛'} Journal Publications: {isCompleted ? 'Verified' : 'Under Review'}</p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Remarks</p>
                            <p className="italic font-medium leading-relaxed">
                              {isCompleted 
                                ? `"Minor corrections required in Chapter 3 equation numbering and page 141. Scholar may proceed after making these adjustments."`
                                : `"Format audit will be initiated upon draft submission."`}
                            </p>
                          </div>
                        </div>
                      )
                    })()}

                    {phase === 'Synopsis' && (() => {
                      const isCompleted = s.progress >= 80
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-505'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-400" />}
                              <p className="font-extrabold uppercase tracking-wide">Synopsis Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted ? 'Approved & Forwarded to External Examiners' : (s.name === 'Rajesh Kumar' ? 'Under Review' : 'Pending')}
                            </p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Synopsis details</p>
                            <p className="flex justify-between"><span>Meeting Date:</span> <span className="font-bold text-slate-900">{isCompleted ? '20 Jun 2026' : 'To be scheduled'}</span></p>
                            <p className="flex justify-between"><span>Venue:</span> <span className="font-bold text-slate-900">Dean Research Chambers, Room 302</span></p>
                            <p className="flex justify-between"><span>Examiner Panel:</span> <span className="font-bold text-emerald-600">{isCompleted ? 'Approved' : 'Pending'}</span></p>
                            <p className="flex justify-between"><span>Synopsis Clearance:</span> <span className="font-bold text-emerald-600">{isCompleted ? 'Cleared' : 'Pending'}</span></p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Clearance Remark</p>
                            <p className="italic font-medium leading-relaxed">
                              {isCompleted 
                                ? `"Synopsis approved and cleared for external evaluation. Examiner panel recommended and approved by VC."`
                                : `"Awaiting synopsis presentation outcomes."`}
                            </p>
                          </div>
                        </div>
                      )
                    })()}

                    {phase === 'Thesis Evaluation' && (() => {
                      const isCompleted = s.progress >= 85
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <Clock className="w-4.5 h-4.5 text-amber-600" /> : <Clock className="w-4.5 h-4.5 text-slate-400" />}
                              <p className="font-extrabold uppercase tracking-wide">Thesis Evaluation Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted ? 'Evaluation In Progress' : 'Pending Thesis Submission'}
                            </p>
                          </div>
                          {isCompleted && (
                            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
                              <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1">Examiner Tracker</p>
                              <p className="flex items-center justify-between"><span>Examiner 1 (National):</span> <span className="font-bold text-emerald-600">Report Received (Accepted)</span></p>
                              <p className="flex items-center justify-between"><span>Examiner 2 (National):</span> <span className="font-bold text-amber-600">Awaiting Report</span></p>
                              <p className="flex items-center justify-between"><span>Examiner 3 (International):</span> <span className="font-bold text-amber-600">Awaiting Report</span></p>
                            </div>
                          )}
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Evaluation Remarks</p>
                            <p className="italic font-medium leading-relaxed">
                              {isCompleted 
                                ? `"Indian Examiner A recommended minor corrections to Chapter 5 smart gateway data models. Typographical errors to be resolved before defense."`
                                : `"Awaiting external panel report dispatches."`}
                            </p>
                          </div>
                        </div>
                      )
                    })()}

                    {phase === 'Thesis Defense' && (() => {
                      const isCompleted = s.progress >= 100
                      return (
                        <div className="space-y-4 text-xs text-slate-700">
                          <div className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                            <div className="flex items-center gap-2">
                              {isCompleted ? <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" /> : <Clock className="w-4.5 h-4.5 text-slate-400" />}
                              <p className="font-extrabold uppercase tracking-wide">Thesis Defense Status</p>
                            </div>
                            <p className="mt-2 font-medium text-[11px]">
                              {isCompleted ? 'Completed — PhD Recommended' : 'Pending evaluation reports approval'}
                            </p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Defense Schedule</p>
                            <p className="flex justify-between"><span>Date:</span> <span className="font-bold text-slate-900">{isCompleted ? '20 Jul 2026' : 'To be scheduled'}</span></p>
                            <p className="flex justify-between"><span>Venue:</span> <span className="font-bold text-slate-900">Research Auditorium, Main Block</span></p>
                            <p className="flex justify-between"><span>Final Decision:</span> <span className="font-bold text-emerald-600">{isCompleted ? 'Recommended for PhD Award' : 'Pending'}</span></p>
                          </div>
                          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5">
                            <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wider border-b pb-1 mb-1.5">Board Remarks</p>
                            <p className="italic font-medium leading-relaxed">
                              {isCompleted 
                                ? `"Oral defense completed successfully. The board unanimously recommends the award of Doctor of Philosophy (PhD) to the scholar."`
                                : `"Defense panel scheduling will proceed once all thesis evaluation reports are received and cleared."`}
                            </p>
                          </div>
                        </div>
                      )
                    })()}
                  </div>

                  {/* Research Supervisor Content Box (Forms & tracking actions) */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
                    <div className="border-b pb-2">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Research Supervisor view</h3>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Forms & tracking details for this milestone</p>
                    </div>

                    {phase === 'First DAC' && (
                      <div className="space-y-4">
                        <form onSubmit={onConstituteDac} className="space-y-3 text-xs font-semibold text-slate-700">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase">Constitute DAC Committee</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block mb-1 text-slate-600">Internal Member</label>
                              <input type="text" name="internal" placeholder="Dr. R. Venkataraman" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600">External Member</label>
                              <input type="text" name="external" placeholder="Dr. M. Sathyapriya" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Meeting Date</label>
                            <input type="date" name="date" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition">
                            Submit DAC Constitution
                          </button>
                        </form>

                        <div className="border-t pt-3">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Constituted Panels for {s.name}</h4>
                          <div className="space-y-2 text-xs">
                            {dacPanels.filter(p => p.scholar === s.name).length === 0 ? (
                              <p className="text-slate-400 font-medium italic">No panels constituted yet.</p>
                            ) : (
                              dacPanels.filter(p => p.scholar === s.name).map((p, idx) => (
                                <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between">
                                  <div>
                                    <p className="font-bold text-slate-800">Internal: {p.internal} &bull; External: {p.external}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Date: {p.date}</p>
                                  </div>
                                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{p.status}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {phase === 'Comprehensive Viva' && (
                      <div className="space-y-4">
                        <form onSubmit={onRequestViva} className="space-y-3 text-xs font-semibold text-slate-700">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase">File Viva Request</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block mb-1 text-slate-600">External Examiner</label>
                              <input type="text" name="external" placeholder="Dr. Mary Watson" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                            <div>
                              <label className="block mb-1 text-slate-600">Proposed Date</label>
                              <input type="date" name="date" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                            </div>
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition">
                            Submit Viva Request
                          </button>
                        </form>

                        <div className="border-t pt-3">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Viva Requests for {s.name}</h4>
                          <div className="space-y-2 text-xs">
                            {vivaRequests.filter(p => p.scholar === s.name).length === 0 ? (
                              <p className="text-slate-400 font-medium italic">No viva requests filed yet.</p>
                            ) : (
                              vivaRequests.filter(p => p.scholar === s.name).map((p, idx) => (
                                <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between">
                                  <div>
                                    <p className="font-bold text-slate-800">External: {p.external}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Proposed Date: {p.date}</p>
                                  </div>
                                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{p.status}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {phase === 'Colloquium' && (
                      <div className="space-y-4">
                        <form onSubmit={onScheduleColloquium} className="space-y-3 text-xs font-semibold text-slate-700">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase">Schedule Colloquium Presentation</h4>
                          <div>
                            <label className="block mb-1 text-slate-600">Presentation Topic</label>
                            <input type="text" name="topic" placeholder="Research findings and methodology" defaultValue={s.topic} className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Proposed Date</label>
                            <input type="date" name="date" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition">
                            Submit Colloquium Slot
                          </button>
                        </form>

                        <div className="border-t pt-3">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Scheduled slots for {s.name}</h4>
                          <div className="space-y-2 text-xs">
                            {colloquiumSchedules.filter(p => p.scholar === s.name).length === 0 ? (
                              <p className="text-slate-400 font-medium italic">No scheduled colloquiums yet.</p>
                            ) : (
                              colloquiumSchedules.filter(p => p.scholar === s.name).map((p, idx) => (
                                <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between">
                                  <div>
                                    <p className="font-bold text-slate-800">Topic: {p.topic}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Date: {p.date}</p>
                                  </div>
                                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{p.status}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {phase === 'Inch Committee' && (
                      <div className="space-y-4">
                        <form onSubmit={handleSubmitInchRequest} className="space-y-3 text-xs font-semibold text-slate-700">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase">File Inch Audit Request</h4>
                          <div>
                            <label className="block mb-1 text-slate-600">Thesis Synopsis Title</label>
                            <input type="text" name="title" defaultValue={s.topic} placeholder="Blockchain Security in Smart Cities" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Proposed Audit Date</label>
                            <input type="date" name="date" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition">
                            Submit Audit Request
                          </button>
                        </form>

                        <div className="border-t pt-3">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Inch Requests for {s.name}</h4>
                          <div className="space-y-2 text-xs">
                            {inchRequests.filter(p => p.scholar === s.name).length === 0 ? (
                              <p className="text-slate-400 font-medium italic">No requests filed yet.</p>
                            ) : (
                              inchRequests.filter(p => p.scholar === s.name).map((p, idx) => (
                                <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between">
                                  <div>
                                    <p className="font-bold text-slate-800">Title: {p.title}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Date: {p.date}</p>
                                  </div>
                                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{p.status}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {phase === 'Synopsis' && (
                      <div className="space-y-4">
                        <form onSubmit={onRecommendSynopsis} className="space-y-3 text-xs font-semibold text-slate-700">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase">Submit Synopsis Recommendation</h4>
                          <div>
                            <label className="block mb-1 text-slate-600">Synopsis Title</label>
                            <input type="text" name="title" defaultValue={s.topic} placeholder="Secure AI-Driven Smart Healthcare Framework" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Proposed Presentation Date</label>
                            <input type="date" name="date" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition">
                            Submit Recommendation
                          </button>
                        </form>

                        <div className="border-t pt-3">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Recommendations for {s.name}</h4>
                          <div className="space-y-2 text-xs">
                            {synopsisRequests.filter(p => p.scholar === s.name).length === 0 ? (
                              <p className="text-slate-400 font-medium italic">No recommendations submitted yet.</p>
                            ) : (
                              synopsisRequests.filter(p => p.scholar === s.name).map((p, idx) => (
                                <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between">
                                  <div>
                                    <p className="font-bold text-slate-800">Title: {p.title}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Date: {p.date}</p>
                                  </div>
                                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{p.status}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {phase === 'Thesis Evaluation' && (
                      <div className="space-y-4">
                        <form onSubmit={onForwardEvaluation} className="space-y-3 text-xs font-semibold text-slate-700">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase">Forward Thesis for Evaluation</h4>
                          <div>
                            <label className="block mb-1 text-slate-600">Thesis Title</label>
                            <input type="text" name="title" defaultValue={s.topic} placeholder="Secure AI-Driven Smart Healthcare Framework" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Submission Date</label>
                            <input type="date" name="date" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition">
                            Forward Thesis
                          </button>
                        </form>

                        <div className="border-t pt-3">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Thesis Submissions for {s.name}</h4>
                          <div className="space-y-2 text-xs">
                            {thesisEvaluations.filter(p => p.scholar === s.name).length === 0 ? (
                              <p className="text-slate-400 font-medium italic">No evaluations in progress yet.</p>
                            ) : (
                              thesisEvaluations.filter(p => p.scholar === s.name).map((p, idx) => (
                                <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between">
                                  <div>
                                    <p className="font-bold text-slate-800">Title: {p.title}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Date: {p.submissionDate}</p>
                                  </div>
                                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{p.evalStatus}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {phase === 'Thesis Defense' && (
                      <div className="space-y-4">
                        <form onSubmit={onRecommendDefense} className="space-y-3 text-xs font-semibold text-slate-700">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase">Submit Thesis Defense Recommendation</h4>
                          <div>
                            <label className="block mb-1 text-slate-600">Thesis Title</label>
                            <input type="text" name="title" defaultValue={s.topic} placeholder="Secure AI-Driven Smart Healthcare Framework" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600">Proposed Defense Date</label>
                            <input type="date" name="date" className="w-full border p-2 rounded-lg bg-slate-50 focus:outline-none focus:border-dsu-maroon" required />
                          </div>
                          <button type="submit" className="w-full bg-dsu-maroon text-white py-2 rounded-lg font-bold hover:bg-red-800 transition">
                            Submit Recommendation
                          </button>
                        </form>

                        <div className="border-t pt-3">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Defense Recommendations for {s.name}</h4>
                          <div className="space-y-2 text-xs">
                            {defenseRequests.filter(p => p.scholar === s.name).length === 0 ? (
                              <p className="text-slate-400 font-medium italic">No defense requests yet.</p>
                            ) : (
                              defenseRequests.filter(p => p.scholar === s.name).map((p, idx) => (
                                <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between">
                                  <div>
                                    <p className="font-bold text-slate-800">Title: {p.title}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Date: {p.date}</p>
                                  </div>
                                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{p.status}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Render MoM Upload Box if not Inch Committee or Thesis Defense */}
                    {phase !== 'Inch Committee' && phase !== 'Thesis Defense' && (
                      <div className="border-t border-slate-100 pt-4">
                        {renderMomUploadForm()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          }

          // 2. PHASES SELECT VIEW FOR A SPECIFIC SCHOLAR
          if (activeSupervisorScholar) {
            const s = activeSupervisorScholar
            const phases = [
              { name: 'First DAC',          icon: ShieldCheck },
              { name: 'Comprehensive Viva', icon: CheckCircle2 },
              { name: 'Colloquium',         icon: Calendar },
              { name: 'Inch Committee',     icon: FileCheck },
              { name: 'Synopsis',           icon: ClipboardList },
              { name: 'Thesis Evaluation',  icon: Layers },
              { name: 'Thesis Defense',     icon: Award }
            ]

            return (
              <div className="space-y-4">
                {/* Header card with Back button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Supervisor Dashboard</span>
                    <h2 className="text-base font-black text-slate-900 mt-0.5">{s.name} &mdash; Milestone Phases</h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{s.reg} &bull; {s.dept}</p>
                  </div>
                  <button 
                    onClick={() => setActiveSupervisorScholar(null)}
                    className="self-start sm:self-center px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition flex items-center gap-1.5"
                  >
                    &larr; Back to Scholar List
                  </button>
                </div>

                {/* Vertical list of phases matching the second image layout */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-sm">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">
                    Select Milestone Phase
                  </h3>
                  <div className="space-y-4">
                    {phases.map((p, idx) => {
                      const PhaseIcon = p.icon
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveSupervisorPhase(p.name)
                          }}
                          className="w-full flex items-center gap-3.5 py-1.5 text-slate-600 hover:text-dsu-maroon transition text-left group"
                        >
                          <PhaseIcon className="w-5 h-5 text-slate-400 group-hover:text-dsu-maroon transition shrink-0" />
                          <span className="text-sm font-bold group-hover:text-dsu-maroon transition">{p.name}</span>
                          <span className="ml-auto text-slate-300 group-hover:text-dsu-maroon transition font-bold">&rarr;</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          }

          // 3. TABLE VIEW - LIST ONLY SCHOLAR NAMES
          return (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-dsu-maroon uppercase tracking-wide">My Supervised Scholars</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Click a scholar's name to view milestone phases and details</p>
                </div>
                <div className="flex gap-2 text-[10px] font-bold">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{scholars.filter(s=>s.status==='Active').length} Active</span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{scholars.filter(s=>s.status==='Coursework').length} Coursework</span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">{scholars.filter(s=>s.status==='Completed').length} Completed</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-md">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Scholar Name</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {scholars.map((s, idx) => (
                      <tr 
                        key={idx} 
                        className="hover:bg-slate-50/80 transition cursor-pointer"
                        onClick={() => {
                          setActiveSupervisorScholar(s)
                          setActiveSupervisorPhase(null)
                        }}
                      >
                        <td className="px-5 py-3.5 whitespace-nowrap text-sm font-extrabold text-slate-700 hover:text-dsu-maroon transition-colors">
                          {s.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        })()}"""

new_content = content[:start_pos] + new_block + content[end_pos:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Patch applied successfully!")
