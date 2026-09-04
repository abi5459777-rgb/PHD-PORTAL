const wait = (ms=500) => new Promise(r => setTimeout(r, ms))

import { scholarData } from '../data/scholarData'
import { progressData } from '../data/progressData'
import activities from '../data/mockActivities.json'
import publications from '../data/mockPublications.json'
import notifications from '../data/mockNotifications.json'
import events from '../data/mockEvents.json'
import documents from '../data/documents.json'

export async function fetchScholar(){ await wait(300); return scholarData }
export async function fetchProgress(){ await wait(300); return progressData }
export async function fetchActivities(){ await wait(300); return activities }
export async function fetchPublications(){ await wait(300); return publications }
export async function fetchNotifications(){ await wait(300); return notifications }
export async function fetchEvents(){ await wait(300); return events }
export async function fetchDocuments(){ await wait(300); return documents }

export default { fetchScholar, fetchProgress, fetchActivities, fetchPublications, fetchNotifications, fetchEvents, fetchDocuments }
