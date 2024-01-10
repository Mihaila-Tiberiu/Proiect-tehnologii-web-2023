import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from './dashboard_components/InfoUser';
import ProfProjectList from './dashboard_components/ProfProjectList';

const ProfessorDashboard = () => {
  const [hasCookie, setHasCookie] = useState(false);
  const [professorID, setProfessorID] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkCookie = () => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('ProfesorID=')) {
          setHasCookie(true);
          const value = cookie.split('=')[1];
          setProfessorID(value);
          return;
        }
      }
      setHasCookie(false);
    };

    checkCookie();
  }, []);

  // Assuming you have a state for user information
  const user = {
    username: 'JohnDoe',
    id: '123',
  };

  const handleLogout = () => {
    // Delete the 'StudentID' cookie by setting its expiration to a date in the past
    document.cookie = 'StudentID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Redirect to the main root of the site
    navigate('/');
  };

  return (
    <div>
      {hasCookie ? (
        // Content to display if the 'ProfessorID' cookie is set
        <div>
          <UserInfo username={user.username} id={user.id} onLogout={handleLogout} />
          <ProfProjectList />
        </div>
      ) : (
        // Content to display if the 'ProfessorID' cookie is not set
        <h1>Error: Professor ID not found. Please log in first.</h1>
      )}
    </div>
  );
};

export default ProfessorDashboard;
