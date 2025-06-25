import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/owner/owner_dashboard';
import Detail from './pages/owner/detail';
import Swipe from './pages/student/swipe';
import Likes from './pages/student/likes';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Owner Routes */}
        <Route path="/owner/dashboard" element={<Dashboard />} />
        <Route path="/owner/flat/:id" element={<Detail />} />

        {/* Student Routes */}
        <Route path="/student/swipe" element={<Swipe />} />
        <Route path="/student/likes" element={<Likes />} />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
