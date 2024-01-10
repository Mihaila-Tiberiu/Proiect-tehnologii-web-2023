import React, { useEffect, useState } from 'react';

const ProfessorDashboard = () => {
  const [hasCookie, setHasCookie] = useState(false);
  const [professorID, setProfessorID] = useState(null);

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

  return (
    <div>
      {hasCookie ? (
        // Content to display if the 'ProfessorID' cookie is set
        <div>
          <h1>Welcome to the Professor Dashboard</h1>
          <p>Your Professor ID: {professorID}</p>
        </div>
      ) : (
        // Content to display if the 'ProfessorID' cookie is not set
        <h1>Error: Professor ID not found. Please log in first.</h1>
      )}
    </div>
  );
};

export default ProfessorDashboard;
