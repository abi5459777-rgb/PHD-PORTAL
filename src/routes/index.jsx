import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import DacCoursework from '../pages/DacCoursework'
import InchCommittee from '../pages/InchCommittee'
import Documents from '../pages/Documents'
import Settings from '../pages/Settings'
import Colloquium from '../pages/Colloquium'
import ComprehensiveViva from '../pages/ComprehensiveViva'
import Admission from '../pages/Admission'
import Synopsis from '../pages/Synopsis'
import ThesisEvaluation from '../pages/ThesisEvaluation'
import ThesisDefense from '../pages/ThesisDefense'
import Notifications from '../pages/Notifications'

const routes = [
  { path: 'dashboard', element: Dashboard },
  { path: 'profile', element: Profile },
  { path: 'dac-coursework', element: DacCoursework },
  { path: 'inch-committee', element: InchCommittee },
  { path: 'colloquium', element: Colloquium },
  { path: 'comprehensive-viva', element: ComprehensiveViva },
  { path: 'synopsis', element: Synopsis },
  { path: 'thesis-evaluation', element: ThesisEvaluation },
  { path: 'thesis-defense', element: ThesisDefense },
  { path: 'admission', element: Admission },
  { path: 'notifications', element: Notifications }, // Wait! Was Notifications imported in original? Oh!
  { path: 'documents', element: Documents },
  { path: 'settings', element: Settings },
]

export default routes
