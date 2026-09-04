export const thesisOverview = {
  progressPercent: 40,
  currentStage: 'Synopsis Meeting',
  lastUpdated: '12 Jun 2026',
  expectedNextAction: 'Complete Synopsis Presentation before DAC panel scheduled for 20 Jun 2026',
}

export const thesisStages = [
  {
    id: 1,
    title: 'Draft Thesis Submission',
    status: 'Completed',
    date: '10 May 2026',
    description: 'Scholar submits draft thesis and synopsis through the guide. Initial review request is generated.',
    details: [
      { label: 'Thesis Draft', value: 'Draft_Thesis_v1.0.pdf', type: 'file' },
      { label: 'Synopsis Draft', value: 'Synopsis_Draft_v1.0.pdf', type: 'file' },
      { label: 'Submission Status', value: 'Forwarded by Guide to School', type: 'text' }
    ]
  },
  {
    id: 2,
    title: 'Format Verification (Inch Committee)',
    status: 'Completed',
    date: '18 May 2026',
    description: 'Inch Committee verifies thesis formatting, citations, references, page numbering, figures, tables, and overall structure.',
    details: [
      { label: 'Verification Status', value: 'Verified & Approved', type: 'text' },
      { label: 'Report File', value: 'Format_Verification_Report.pdf', type: 'file' },
      { label: 'Remarks', value: 'Format adheres to DSU guidelines.', type: 'text' }
    ]
  },
  {
    id: 3,
    title: 'Publication Verification',
    status: 'Completed',
    date: '25 May 2026',
    description: 'Research Office verifies mandatory publication requirements. Publication status must be approved before further processing.',
    details: [
      { label: 'Journal Papers', value: '2 Published (SCI/Scopus)', type: 'text' },
      { label: 'Conference Papers', value: '3 Published/Presented', type: 'text' },
      { label: 'Approval Status', value: 'Cleared by Research Office', type: 'text' }
    ]
  },
  {
    id: 4,
    title: 'Plagiarism Check',
    status: 'Completed',
    date: '02 Jun 2026',
    description: 'Thesis is checked using Turnitin/URKUND. Similarity index must not exceed 10%. Plagiarism report is generated and stored.',
    details: [
      { label: 'Software Used', value: 'Turnitin', type: 'text' },
      { label: 'Similarity Index', value: '6% (Requirement: <= 10%)', type: 'status-success' },
      { label: 'Certificate File', value: 'Plagiarism_Clearance_Certificate.pdf', type: 'file' }
    ]
  },
  {
    id: 5,
    title: 'Synopsis Meeting',
    status: 'In Progress',
    date: '12 Jun 2026',
    description: 'Scholar presents research work before the Departmental Advisory Committee (DAC). Research contributions, findings, objectives, and outcomes are evaluated.',
    details: [
      { label: 'DAC Meeting Date', value: '20 Jun 2026 (10:30 AM)', type: 'text' },
      { label: 'Presentation Deck', value: 'Synopsis_Presentation.pptx', type: 'file-upload' },
      { label: 'Current Status', value: 'Under Review - Presentation Pending', type: 'text' }
    ]
  },
  {
    id: 6,
    title: 'Examiner Panel Approval',
    status: 'Pending',
    date: '',
    description: 'Guide submits a panel of 12 examiners, consisting of 6 Indian and 6 International experts. The Dean Research and Vice Chancellor review and approve the panel.',
    details: [
      { label: 'Indian Panel', value: '0 of 6 proposed', type: 'text' },
      { label: 'International Panel', value: '0 of 6 proposed', type: 'text' },
      { label: 'Guide Status', value: 'Pending submission by Supervisor', type: 'text' }
    ]
  },
  {
    id: 7,
    title: 'Thesis Evaluation',
    status: 'Pending',
    date: '',
    description: 'Thesis is dispatched to approved external examiners. Evaluation reports are collected and recommendation status is tracked. Reminders are sent automatically.',
    details: [
      { label: 'Examiner A Status', value: 'Awaiting Panel Dispatch', type: 'text' },
      { label: 'Examiner B Status', value: 'Awaiting Panel Dispatch', type: 'text' },
      { label: 'Automatic Reminder', value: 'Active (30-day interval)', type: 'text' }
    ]
  },
  {
    id: 8,
    title: 'Thesis Defense',
    status: 'Pending',
    date: '',
    description: 'Oral Examination Board is constituted. The scholar presents the final thesis defense before the board and open audience. The board records a Satisfactory or Not Satisfactory decision.',
    details: [
      { label: 'Board Constitution', value: 'Awaiting evaluation approval', type: 'text' },
      { label: 'Oral Board Members', value: 'Pending', type: 'text' }
    ]
  },
  {
    id: 9,
    title: 'Final Thesis Submission',
    status: 'Pending',
    date: '',
    description: 'Scholar incorporates all corrections suggested during the defense. The final approved thesis is uploaded, and a digital archive copy is created in the university repository.',
    details: [
      { label: 'Final Upload', value: 'Awaiting defense clearance', type: 'text' }
    ]
  },
  {
    id: 10,
    title: 'Degree Award',
    status: 'Pending',
    date: '',
    description: 'Thesis is formally accepted by the University Senate. The scholar status is marked as Completed, and the PhD Degree Award and Convocation process is initiated.',
    details: [
      { label: 'Final Scholar Status', value: 'Active Scholar (Pending Thesis)', type: 'text' }
    ]
  }
]
