// ProjectList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';

const ProjectList = () => {
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
            {projects.map((project) => (
              <div key={project.ProiectID} className="project-item">
                <div className="project-info">
                  <Link to="/project-info" onClick={() => handleClick(project.ProiectID)}>
                    <h3>{project.NumeProiect}</h3>
                  </Link>
                  <p>{project.Descriere}</p>
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
          <h2>Faceți parte din următoarele proiecte:</h2>
          {/* Render the list of projects the user is part of */}
          {/* [project 1] [project 1 description] and so on */}

          <div className="part-of-project-item">
            [Project 1]
            <br />
            [Project 1 description]
          </div>

        </div>
        <div className="jury-projects-container">
          <h2>Ați fost selectat drept jurat pentru următoarul livrabil:</h2>
          {/* Render the list of projects the user is selected as a jury for */}
          {/* [Proiect 3] [Descriere proiect 3] and so on */}
      
          <div className="jury-project-item">
            [Proiect 3]
            <br />
            [Descriere proiect 3]
          </div>
          {/* Repeat the above structure for each project the user is selected as a jury for */}
        </div>

        <div className="jury-chief-projects-container">
          <h2>Sunteți jurat șef pentru următoarul livrabil:</h2>
          {/* Render the list of projects the user is chief juror for */}
          {/* [Proiect 4] [Descriere proiect 4] and so on */}
  
          <div className="jury-chief-project-item">
            [Proiect 4]
            <br />
            [Descriere proiect 4] 
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectList;
