import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import RegisterAsProf from './components/register/RegisterAsProf';
import RegisterAsStudent from './components/register/RegisterAsStudent';

import ProfDashboard from './components/dashboard/ProfDashboard';
import StudentDashboard from './components/dashboard/StudentDashboard';

import Login from './components/login/Login';
import LoginAsProf from './components/login/LoginAsProf';
import LoginAsStudent from './components/login/LoginAsStudent';

import ProjectInfo from './components/project-info/Project-info';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login/professor" element={<LoginAsProf/>} />
        <Route path="/login/student" element={<LoginAsStudent/>} />
        <Route path="/register/prof" element={<RegisterAsProf/>} />
        <Route path="/register/student" element={<RegisterAsStudent/>} />
        <Route path="/prof-dashboard" element={<ProfDashboard/>} />
        <Route path="/student-dashboard" element={<StudentDashboard/>} />
        <Route path="/project-info" element={<ProjectInfo/>} />
        </Routes>
    </Router>
  );
}

export default App;
