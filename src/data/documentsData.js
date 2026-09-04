export const documentCategories = [
  'All Categories',
  'Admission',
  'DAC & Coursework',
  'Comprehensive Viva',
  'Colloquium',
  'Inch Committee',
  'Synopsis',
  'Thesis Evaluation',
  'Thesis Defense',
  'Certificates',
  'Forms & Templates'
]

export const mockDocuments = [
  {
    id: 'd1',
    name: 'PhD Admission Order.pdf',
    category: 'Admission',
    uploadedBy: 'Scholar (Priya R)',
    uploadDate: '12 Jun 2022',
    fileType: 'PDF',
    status: 'Approved',
    url: '#',
    versions: [
      { version: 'v1.0', date: '12 Jun 2022', author: 'Scholar', remarks: 'Official PhD Admission Letter from DSU.' }
    ]
  },
  {
    id: 'd2',
    name: 'DAC Nomination Form.pdf',
    category: 'DAC & Coursework',
    uploadedBy: 'Supervisor (Dr. D. Srinivasan)',
    uploadDate: '15 Sep 2022',
    fileType: 'PDF',
    status: 'Approved',
    url: '#',
    versions: [
      { version: 'v1.0', date: '15 Sep 2022', author: 'Supervisor', remarks: 'DAC members nomination list signed by Supervisor.' }
    ]
  },
  {
    id: 'd3',
    name: 'DAC Minutes of Meeting.pdf',
    category: 'DAC & Coursework',
    uploadedBy: 'Supervisor (Dr. D. Srinivasan)',
    uploadDate: '10 Jan 2023',
    fileType: 'PDF',
    status: 'Approved',
    url: '#',
    versions: [
      { version: 'v1.0', date: '10 Jan 2023', author: 'Supervisor', remarks: 'First DAC meeting minutes and syllabus approval.' }
    ]
  },
  {
    id: 'd4',
    name: 'Coursework Grade Sheet.pdf',
    category: 'DAC & Coursework',
    uploadedBy: 'Controller of Examinations',
    uploadDate: '15 Jun 2024',
    fileType: 'PDF',
    status: 'Approved',
    url: '#',
    versions: [
      { version: 'v1.0', date: '15 Jun 2024', author: 'CoE', remarks: 'Official coursework completion transcript with grades.' }
    ]
  },
  {
    id: 'd5',
    name: 'Comprehensive Viva Report.pdf',
    category: 'Comprehensive Viva',
    uploadedBy: 'Supervisor (Dr. D. Srinivasan)',
    uploadDate: '25 Jun 2026',
    fileType: 'PDF',
    status: 'Pending',
    url: '#',
    versions: [
      { version: 'v1.0', date: '25 Jun 2026', author: 'Supervisor', remarks: 'Comprehensive Viva-Voce evaluation report draft.' }
    ]
  },
  {
    id: 'd6',
    name: 'Colloquium Presentation.pdf',
    category: 'Colloquium',
    uploadedBy: 'Scholar (Priya R)',
    uploadDate: '28 Jul 2026',
    fileType: 'PDF',
    status: 'Pending',
    url: '#',
    versions: [
      { version: 'v1.0', date: '28 Jul 2026', author: 'Scholar', remarks: 'Colloquium research slides draft.' }
    ]
  },
  {
    id: 'd7',
    name: 'Format Verification Report.pdf',
    category: 'Inch Committee',
    uploadedBy: 'Inch Committee Chairperson',
    uploadDate: '18 May 2026',
    fileType: 'PDF',
    status: 'Approved',
    url: '#',
    versions: [
      { version: 'v1.0', date: '18 May 2026', author: 'Chairperson', remarks: 'Thesis structure and references checklist verified by Inch Committee.' }
    ]
  },
  {
    id: 'd8',
    name: 'Synopsis Approval.pdf',
    category: 'Synopsis',
    uploadedBy: 'Scholar (Priya R)',
    uploadDate: '10 May 2026',
    fileType: 'PDF',
    status: 'Approved',
    url: '#',
    versions: [
      { version: 'v1.0', date: '10 May 2026', author: 'Scholar', remarks: 'Official synopsis approval document.' }
    ]
  },
  {
    id: 'd9',
    name: 'Thesis Evaluation Report.pdf',
    category: 'Thesis Evaluation',
    uploadedBy: 'External Examiner (National)',
    uploadDate: '15 Sep 2026',
    fileType: 'PDF',
    status: 'Pending',
    url: '#',
    versions: [
      { version: 'v1.0', date: '15 Sep 2026', author: 'National Examiner', remarks: 'Thesis evaluation and recommendations form.' }
    ]
  },
  {
    id: 'd10',
    name: 'Thesis Defense Report.pdf',
    category: 'Thesis Defense',
    uploadedBy: 'Oral Board Chairman',
    uploadDate: '05 Nov 2026',
    fileType: 'PDF',
    status: 'Pending',
    url: '#',
    versions: [
      { version: 'v1.0', date: '05 Nov 2026', author: 'Oral Board Chair', remarks: 'Final defense minutes and viva evaluation.' }
    ]
  },
  {
    id: 'd11',
    name: 'Final Thesis.pdf',
    category: 'Thesis Defense',
    uploadedBy: 'Scholar (Priya R)',
    uploadDate: '10 Nov 2026',
    fileType: 'PDF',
    status: 'Pending',
    url: '#',
    versions: [
      { version: 'v1.0', date: '10 Nov 2026', author: 'Scholar', remarks: 'Final thesis copy incorporating defense corrections.' }
    ]
  },
  {
    id: 'd12',
    name: 'Plagiarism Self Check Report (Rejected).pdf',
    category: 'Certificates',
    uploadedBy: 'Scholar (Priya R)',
    uploadDate: '28 Apr 2026',
    fileType: 'PDF',
    status: 'Rejected',
    url: '#',
    versions: [
      { version: 'v1.0', date: '28 Apr 2026', author: 'Scholar', remarks: 'Similarity index is 18%, which exceeds the threshold of 10%.' }
    ]
  }
]
