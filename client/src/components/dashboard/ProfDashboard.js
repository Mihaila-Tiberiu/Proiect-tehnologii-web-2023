import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from './dashboard_components/InfoUser';
import ProfProjectList from './dashboard_components/ProfProjectList';
import config from '../../config';

const ProfessorDashboard = () => {
  
  const [hasCookie, setHasCookie] = useState(false);
  const [professorID, setProfessorID] = useState(null);
  const [professorName, setProfessorName] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessorName = async () => {
      try {
        const response = await fetch(config.REACT_APP_BACKEND_URL+`/auth/getProfesorById/${professorID}`);
        const data = await response.json();
        const { Prenume, Nume } = data.professor;
        
        setProfessorName(`${Prenume} ${Nume}`);
      } catch (error) {
        console.error('Error fetching professor name:', error);
        // Handle error fetching professor name
      }
    };

    if (professorID) {
      fetchProfessorName();
    }
  }, [professorID]);

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

  const handleLogout = () => {
    // Delete the 'StudentID' cookie by setting its expiration to a date in the past
    // Pentru delogare -> vom sterge cookie-ul 
    document.cookie = 'ProfesorID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Redirect to the main root of the site
    navigate('/');
  };

  return (
    <div>
      {hasCookie ? (
        // Daca exista cookie-ul 'ProfessorID' -> afisam dashboard-ul
        <div>
          <UserInfo username={professorName} id={professorID} onLogout={handleLogout} />
          <ProfProjectList />
        </div>
      ) : (
         // Daca nu exista cookie-ul 'ProfessorID' -> afisam mesajul de eroare
        <h1>Eroare: ID-ul profesorului nu a fost găsit. Vă rugăm să vă conectați mai întâi.</h1>
      )}
    </div>
  );
};

export default ProfessorDashboard;
