export const publicationSummary = {
  total: 12,
  journal: 5,
  conference: 4,
  patents: 1,
  chapters: 2,
}

export const publicationStats = {
  published: 8,
  underReview: 2,
  accepted: 1,
  rejected: 1,
}

export const publicationCategories = [
  { id: 'pc1', label: 'Journal Papers', count: 5 },
  { id: 'pc2', label: 'Conference Papers', count: 4 },
  { id: 'pc3', label: 'Patents', count: 1 },
  { id: 'pc4', label: 'Book Chapters', count: 2 },
  { id: 'pc5', label: 'Scopus Indexed', count: 6 },
  { id: 'pc6', label: 'SCI Indexed', count: 3 },
]

export const publicationsTable = [
  {
    id: 'pub1',
    title: 'Explainable AI for Healthcare Diagnostics',
    type: 'Journal',
    venue: 'IEEE Transactions on AI',
    publisher: 'IEEE',
    date: '12 Jan 2026',
    doi: '10.1109/TAI.2026.123456',
    status: 'Published',
  },
  {
    id: 'pub2',
    title: 'Knowledge Graphs for Drug Discovery',
    type: 'Conference',
    venue: 'NeurIPS 2025',
    publisher: 'Curran Associates',
    date: '05 Dec 2025',
    doi: '10.5555/neurips.2025.789',
    status: 'Accepted',
  },
  {
    id: 'pub3',
    title: 'Patent on Adaptive Learning Systems',
    type: 'Patent',
    venue: 'Indian Patent Office',
    publisher: 'DSU Research',
    date: '28 Feb 2026',
    doi: 'IN2026A12345',
    status: 'Published',
  },
  {
    id: 'pub4',
    title: 'Deep Learning Optimization in Vision Tasks',
    type: 'Journal',
    venue: 'Springer AI Review',
    publisher: 'Springer',
    date: '15 Mar 2026',
    doi: '10.1007/s00125-026-1234',
    status: 'Under Review',
  },
  {
    id: 'pub5',
    title: 'Book Chapter on AI Ethics',
    type: 'Book Chapter',
    venue: 'Handbook of AI Research',
    publisher: 'Academic Press',
    date: '09 Nov 2025',
    doi: '10.1016/B978-0-12-345678-9.00005-3',
    status: 'Published',
  },
]

export const documentFiles = [
  { id: 'doc1', label: 'Publication PDF', file: 'AI_Diagnostics.pdf', uploaded: '14 Jan 2026' },
  { id: 'doc2', label: 'Acceptance Letter', file: 'NeurIPS_Acceptance.pdf', uploaded: '20 Nov 2025' },
  { id: 'doc3', label: 'Patent Document', file: 'Adaptive_Learning_Patent.pdf', uploaded: '01 Mar 2026' },
  { id: 'doc4', label: 'Conference Certificate', file: 'NeurIPS_Certificate.pdf', uploaded: '07 Dec 2025' },
]

export const researchImpact = {
  citations: 158,
  hIndex: 12,
  i10Index: 9,
}

export const publicationTimeline = [
  { id: 't1', title: 'Book Chapter on AI Ethics', date: '09 Nov 2025', status: 'Published' },
  { id: 't2', title: 'NeurIPS Conference Paper', date: '05 Dec 2025', status: 'Accepted' },
  { id: 't3', title: 'Journal Submission to IEEE TAI', date: '12 Jan 2026', status: 'Published' },
  { id: 't4', title: 'SCI Journal Review', date: '15 Mar 2026', status: 'Under Review' },
  { id: 't5', title: 'Patent Filing', date: '28 Feb 2026', status: 'Published' },
]
