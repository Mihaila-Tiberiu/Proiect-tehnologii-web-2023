// ProjectList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.css';

const ProjectList = () => {
  const projects = [
    { ProiectID: 1, NumeProiect: 'Project 1', Descriere: 'Description for Project 1', NotaProiect: 5, IconitaProiect: 0 },
    { ProiectID: 2, NumeProiect: 'Project 2', Descriere: 'Description for Project 2', NotaProiect: 10, IconitaProiect: 1 },
    { ProiectID: 3, NumeProiect: 'Project 3', Descriere: 'Description for Project 3', NotaProiect: 9, IconitaProiect: 2 },
  ];

  const getIconEmoji = (iconitaProiect) => {
    switch (iconitaProiect) {
      case 0:
        return '❌'; // X emoji for rejection
      case 1:
        return '✅'; // Checkmark emoji for acceptance
      case 2:
        return '➕'; // Plus emoji for availability
      default:
        return '';
    }
  };

  const handleClick = (projectId) => {
    localStorage.setItem('clickedProjectId', projectId);
  };

  return (
    <div className="project-list-container">
      <h2>Projects:</h2>
      {projects.map((project) => (
        <div key={project.ProiectID} className="project-item">
          
            <div className="project-info">
            <Link to="/" onClick={() => handleClick(project.ProiectID)}>
              <h3>
                {project.NumeProiect}  
              </h3>
              </Link>
              <p>{project.Descriere}</p>
             
              <p>Nota proiect: {project.NotaProiect}</p>
            </div>
            <span className="project-icon">{getIconEmoji(project.IconitaProiect)}</span>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
