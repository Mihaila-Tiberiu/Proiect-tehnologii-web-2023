// ProjectList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProfProjectList.css';

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
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Add the new project to the projects array
      const newProjectObject = {
        ProiectID: projects.length + 1, // Generate a unique ID for the new project
        NumeProiect: newProject.projectName,
        Descriere: newProject.projectDescription,
        IconitaProiect: 2, // Assuming the default icon for a new project
      };
  
      projects.push(newProjectObject);
  
      // Clear the form inputs
      setNewProject({
        projectName: '',
        projectDescription: '',
      });
    };
  
    return (
      <div className="page-container">
        <div className="left-container">
          <div className="project-list-container">
            <h2>Complete project list:</h2>
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
        </div>

        <div className="right-container">
        <div className="jury-chief-projects-container">
          <h2>Pentru a vizualiza nota proiectului, intrati pe pagina acestuia!</h2>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
