// ProjectList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';

const ProjectList = () => {
  const [assignmentMessage, setAssignmentMessage] = useState('');

  const handleButtonClick = (projectId) => {
    // Retrieve StudentID from the cookie
    const studentIdFromCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('StudentID='))
      ?.split('=')[1];

    if (!studentIdFromCookie) {
      console.error('StudentID not found in the cookie');
      return;
    }

    // Prepare the request body
    const requestBody = {
      studId: studentIdFromCookie,
      projId: projectId,
    };

    // Make the API call
    axios.put(`${config.REACT_APP_BACKEND_URL}/students/joinProject`, requestBody)
      .then(response => {
        // Handle the API response as needed
        console.log('API response:', response.data);

        setAssignmentMessage(`Te-ai alaturat unui nou proiect!`);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error making API call:', error);
        // Handle any error scenarios or display error messages
      });
  };

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    projectName: '',
    projectDescription: '',
    projectNota: '',
  });
  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await axios.get(`${config.REACT_APP_BACKEND_URL}/students/allProjects`);
          setProjects(response.data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };
  
      fetchProjects();
    }, []);
  
//---------------------------------------------------
    const [proiectId, setProiectId] = useState(null);

    // Extragem valoarea cookie-ului StudentID
    const studentIdFromCookie2 = document.cookie
  .split('; ')
  .find(row => row.startsWith('StudentID='))
  ?.split('=')[1];


  const getStudentDetailsById = async (studentIdFromCookie2) => {
    try {
     
      const response = await axios.get(`${config.REACT_APP_BACKEND_URL}/auth/getStudentById/${studentIdFromCookie2}`);
      return response.data.professor.ProiectID;

    } catch (error) {
      console.error('Error fetching student details:', error);
      throw error;
    }
  };

    const fetchStudentDetails = async () => {
      if (studentIdFromCookie2) {
        try {
          const studentDetails = await getStudentDetailsById(studentIdFromCookie2);
          setProiectId(studentDetails);

        } catch (error) {
          console.error('Error getting student details:', error);
        }
      }
    };
  
  useEffect(() => {
    fetchStudentDetails();
  }, [studentIdFromCookie2]); 

  const [esteJurat, setEsteJurat] = useState(null);
  const getEsteJurat = async (studentIdFromCookie2) => {
    try {
      const response = await axios.get(`${config.REACT_APP_BACKEND_URL}/auth/getStudentById/${studentIdFromCookie2}`);
      return response.data.professor.esteJurat;
    } catch (error) {
      console.error('Error fetching student details:', error);
      throw error;
    }
  };

  const fetchStudentDetails2 = async () => {
    if (studentIdFromCookie2) {
      try {
        const studentDetails = await getStudentDetailsById(studentIdFromCookie2);
        setEsteJurat(studentDetails);

      } catch (error) {
        console.error('Error getting student details:', error);
      }
    }
  };

  useEffect(() => {
    fetchStudentDetails2();
  }, [studentIdFromCookie2]); 

  const [esteSef, setEsteSef] = useState(null);
  const getEsteSef = async (studentIdFromCookie2) => {
    try {
      const response = await axios.get(`${config.REACT_APP_BACKEND_URL}/auth/getStudentById/${studentIdFromCookie2}`);
      return response.data.professor.esteSef;
    } catch (error) {
      console.error('Error fetching student details:', error);
      throw error;
    }
  };

  const fetchStudentDetails3 = async () => {
    if (studentIdFromCookie2) {
      try {
        const studentDetails = await getStudentDetailsById(studentIdFromCookie2);
        setEsteSef(studentDetails);

      } catch (error) {
        console.error('Error getting student details:', error);
      }
    }
  };

  useEffect(() => {
    fetchStudentDetails3();
  }, [studentIdFromCookie2]); 

  //---------------------------------------------------

    const getIconEmoji = (iconitaProiect) => {
      switch (iconitaProiect) {
        case 0:
          return '❌'; // X emoji for rejection
        case 1:
          return '✅'; // Checkmark emoji for acceptance
        case 2:
          // Make the "+" emoji clickable and link to the home page
          return <Link to="/">➕</Link>;
        default:
          return '';
      }
    };
  
    const handleClick = (projectId) => {
      localStorage.setItem('clickedProjectId', projectId);
    };
  
    // Handle form input changes
    const handleInputChange = (e) => {
      setNewProject({
        ...newProject,
        [e.target.name]: e.target.value,
      });
    };
  
    // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Create a new project object
  const newProjectObject = {
    NumeProiect: newProject.projectName,
    Descriere: newProject.projectDescription,
    NotaProiect: 1,
  };

  try {
    // Perform the API call to add the new project
    await axios.post(`${config.REACT_APP_BACKEND_URL}/students/createProject`, newProjectObject);
    
    // Clear the form inputs
    setNewProject({
      projectName: '',
      projectDescription: '',
    });

    // Refresh the page after the API call completes
    window.location.reload();
  } catch (error) {
    console.error('Error adding project:', error);
    // Handle any error scenarios or display error messages
  }
};
  
    return (
      <div className="page-container">
        <div className="left-container">
          <div className="project-list-container">
            <h2>Lista completă a proiectelor:</h2>
            {/* Display assignment message as a Bootstrap success alert */}
      {assignmentMessage && (
        <div className="alert alert-success" role="alert">
          <p>{assignmentMessage}</p>
        </div>
      )}
            {projects.map((project) => (
              <div key={project.ProiectID} className="project-item">
                <div className="project-info">
                  <Link to="/project-info" onClick={() => handleClick(project.ProiectID)}>
                    <h3>{project.NumeProiect}</h3>
                  </Link>
                  <p>{project.Descriere}</p>
                  <button className="btn btn-secondary" onClick={() => handleButtonClick(project.ProiectID)}>Alătură-te proiectului</button>
                </div>
                <span className={`project-icon ${project.IconitaProiect === 2 ? 'add' : ''}`}>
                  {getIconEmoji(project.IconitaProiect)}
                </span>
              </div>
            ))}
          </div>
  
        {/* Formular pentru adaugarea unui nou proiect */}
<form className="new-project-form" onSubmit={handleSubmit}>
  
  <h2>Adaugă un proiect nou:</h2>
  <label htmlFor="projectName">Nume proiect:</label>
  <input
    type="text"
    id="projectName"
    name="projectName"
    value={newProject.projectName}
    onChange={handleInputChange}
    required
  />

  <label htmlFor="projectDescription">Descrierea proiectului:</label>
  <textarea
    id="projectDescription"
    name="projectDescription"
    value={newProject.projectDescription}
    onChange={handleInputChange}
    required
  />

  <button type="submit">Adaugă proiect</button>
</form>

        </div>

      <div className="right-container">
      <div className="part-of-projects-container">
        <h2>Faceți parte din următorul proiect:</h2>
        {proiectId !== null ? (
          <p>ID Proiect: {proiectId}</p>
        ) : (
          <p>Nu faceți parte din niciun proiect.</p>
        )}
      </div>

      <div className="jury-projects-container">
      <h2>Ați fost selectat drept jurat pentru următoarele proiecte:</h2>
      {esteJurat !== null ? (
        <p>Sunteți jurat? {esteJurat === 1 ? 'DA' : 'NU'}</p>
      ) : (
        <p>Nu ați fost ales jurat pentru niciun proiect.</p>
      )}
    </div>


        <div className="jury-chief-projects-container">
          <h2>Ați fost selectat drept jurat șef pentru următoarele proiecte:</h2>
        {esteSef !== null ? (
          <p>Sunteți jurat șef? {esteSef === 1 ? 'DA' : 'NU'}</p>
        ) : (
          <p>Nu ați fost ales jurat șef pentru niciun proiect.</p>
        )}

        </div>
      </div>
    </div>
  );
};

export default ProjectList;
