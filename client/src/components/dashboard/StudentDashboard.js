import React, { useEffect, useState } from 'react';

const StudentDashboard = () => {
  const [hasCookie, setHasCookie] = useState(false);
  const [studentID, setStudentID] = useState(null);

  useEffect(() => {
    const checkCookie = () => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('StudentID=')) {
          setHasCookie(true);
          const value = cookie.split('=')[1];
          setStudentID(value);
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
        // Content to display if the 'StudentID' cookie is set
        <div>
          <h1>Welcome to the Student Dashboard</h1>
          <p>Your Student ID: {studentID}</p>
        </div>
      ) : (
        // Content to display if the 'StudentID' cookie is not set
        <h1>Error: Student ID not found. Please log in first.</h1>
      )}
    </div>
  );
};

export default StudentDashboard;
