import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import MainPage from './pages/MainPage';
import Navbar from './components/Navbar';
import PreviousYearQuestionPaper from './pages/PreviousYearQuestionPaper';
import MainLayout from './components/MainLayout';
import ViewProfile from './pages/ViewProfile';
import EditProfile from './pages/EditProfile';
import NotesPage from './pages/NotesPage';
import JobsPage from './pages/JobsPage';
import ThreadsPage from './pages/ThreadsPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (localStorage.getItem('loggedIn') !== 'true') {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route element={<><Navbar /><ProtectedRoute><MainLayout><Outlet /></MainLayout></ProtectedRoute></>}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/notes" element={<NotesPage />} />
        <Route path="/main/jobs" element={<JobsPage />} />
        <Route path="/main/threads" element={<ThreadsPage />} />
        <Route path="/main/profile" element={<ViewProfile />} />
        <Route path="/main/profile/edit" element={<EditProfile />} />
        <Route path="/previous-year-question-paper" element={<PreviousYearQuestionPaper />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
