import { useEffect, useState } from 'react'
import * as svc from '../services/mockService'

export function useScholarData(){
  const [scholar, setScholar] = useState(null)
  const [progress, setProgress] = useState([])
  const [activities, setActivities] = useState([])
  const [publications, setPublications] = useState({})
  const [notifications, setNotifications] = useState([])
  const [events, setEvents] = useState([])
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load(){
      setLoading(true)
      const [s,p,a,pu,n,e,d] = await Promise.all([
        svc.fetchScholar(),
        svc.fetchProgress(),
        svc.fetchActivities(),
        svc.fetchPublications(),
        svc.fetchNotifications(),
        svc.fetchEvents(),
        svc.fetchDocuments(),
      ])
      if(!mounted) return
      setScholar(s)
      setProgress(p)
      setActivities(a)
      setPublications(pu)
      setNotifications(n)
      setEvents(e)
      setDocuments(d)
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  },[])

  return { scholar, progress, activities, publications, notifications, events, documents, loading }
}
