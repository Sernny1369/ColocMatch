import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Header from './componant/header.jsx';
import Footer from './componant/footer.jsx';
import Signup from './pages/signup';
import Dashboard from './pages/owner/owner_dashboard';
import Detail from './pages/owner/detail';
import CreatePostPage from './pages/owner/create';
import Swipe from './pages/student/swipe';
import StudentProfile from './pages/student/profile';
import HostProfile from './pages/owner/profile';
import Likes from './pages/student/likes';
import RequireRole from './componant/RequireRole';
import './App.css';
import "./styles/dash.css"; 

import ProfileCompletionModal from './componant/ProfileCompletionModal';

function App() {
  return (
    <Router>
      <Header />
      <ProfileCompletionModal />
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Host Routes */}
        <Route path="/host/dashboard" element={
          <RequireRole allowedRoles={["Host"]}>
            <Dashboard />
          </RequireRole>
        } />
        <Route path="/host/detail/:id" element={
          <RequireRole allowedRoles={["Host"]}>
            <Detail />
          </RequireRole>
          } />
        <Route path="/host/create" element={<RequireRole allowedRoles={["Host"]}>
          <CreatePostPage />
        </RequireRole>
        } />

        <Route path="/host/profile" element={<RequireRole allowedRoles={["Host"]}>
          <HostProfile />
        </RequireRole>
        } />

        {/* Student Routes */}
        <Route path="/student/swipe" element={<RequireRole allowedRoles={["Student"]}>
          <Swipe />
        </RequireRole>
        } />
        <Route path="/student/profile" element={<RequireRole allowedRoles={["Student"]}>
          <StudentProfile />
        </RequireRole>
        } />
        <Route path="/student/likes" element={<RequireRole allowedRoles={["Student"]}>
          <Likes />
        </RequireRole>
      } />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
