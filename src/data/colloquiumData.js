export const colloquiumOverview = {
  status: 'Scheduled',
  upcomingDate: '05 Aug 2026',
  presentationStatus: 'Draft Ready',
  committeeReviewStatus: 'Pending',
}

export const colloquiumSchedule = [
  {
    id: 'e1',
    event: 'Opening Remarks',
    date: '05 Aug 2026 • 09:00 AM',
    venue: 'DSU Auditorium',
    status: 'Confirmed',
  },
  {
    id: 'e2',
    event: 'Candidate Presentation',
    date: '05 Aug 2026 • 09:30 AM',
    venue: 'DSU Auditorium',
    status: 'Scheduled',
  },
  {
    id: 'e3',
    event: 'Committee Q&A',
    date: '05 Aug 2026 • 10:30 AM',
    venue: 'DSU Conference Room 2',
    status: 'Scheduled',
  },
  {
    id: 'e4',
    event: 'Feedback Summary',
    date: '05 Aug 2026 • 11:30 AM',
    venue: 'DSU Conference Room 2',
    status: 'Pending',
  },
]

export const presentationDetails = {
  title: 'AI-Driven Knowledge Discovery for Smart Healthcare',
  uploadDate: '28 Jul 2026',
  version: 'v3.0',
  viewLink: '#',
  downloadLink: '#',
}

export const committeeMembers = [
  { id: 'c1', role: 'Chairperson', name: 'Dr. L. Iyer' },
  { id: 'c2', role: 'Supervisor', name: 'Prof. R. Srinivasan' },
  { id: 'c3', role: 'Internal Expert', name: 'Dr. M. Ramesh' },
  { id: 'c4', role: 'External Expert', name: 'Dr. A. Sharma' },
]

export const preparationChecklist = [
  { id: 'p1', label: 'Finalize presentation slides', completed: true },
  { id: 'p2', label: 'Rehearse mock presentation', completed: true },
  { id: 'p3', label: 'Collect committee feedback forms', completed: false },
  { id: 'p4', label: 'Verify AV setup with admin', completed: true },
  { id: 'p5', label: 'Upload final presentation deck', completed: false },
]

export const reviewFeedback = {
  facultyComments: 'The candidate has shown strong domain understanding and a clear research trajectory.',
  suggestions: 'Strengthen the evaluation section by adding comparative benchmark analysis.',
  reviewNotes: 'Ensure the thesis chapters align with the proposed presentation slides and address committee concerns on data validity.',
}

export const colloquiumOutcome = {
  resultStatus: 'Pending',
  recommendations: ['Complete final thesis revisions', 'Schedule thesis evaluation', 'Submit publication-ready manuscript'],
  nextStage: 'Thesis Evaluation',
}

export const colloquiumTimeline = [
  { id: 't1', label: 'Coursework Completed', completed: true },
  { id: 't2', label: 'DAC Reviews Completed', completed: true },
  { id: 't3', label: 'Comprehensive Viva Completed', completed: false },
  { id: 't4', label: 'Colloquium Completed', completed: false },
  { id: 't5', label: 'Thesis Evaluation', completed: false },
  { id: 't6', label: 'Thesis Defense', completed: false },
]