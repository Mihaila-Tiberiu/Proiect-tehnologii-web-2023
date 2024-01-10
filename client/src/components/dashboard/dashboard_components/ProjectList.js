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
        // Make the "+" emoji clickable and link to the home page
        return <Link to="/">➕</Link>;
      default:
        return '';
    }
  };

  const handleClick = (projectId) => {
    localStorage.setItem('clickedProjectId', projectId);
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
                <p>Nota proiect: {project.NotaProiect}</p>
              </div>
              <span className={`project-icon ${project.IconitaProiect === 2 ? 'add' : ''}`}>
                {getIconEmoji(project.IconitaProiect)}
              </span>
            </div>
          ))}
        </div>

       
      </div>

      <div className="right-container">
      <div className="part-of-projects-container">
          <h2>You are part of the following projects:</h2>
          {/* Render the list of projects the user is part of */}
          {/* [project 1] [project 1 description] and so on */}
          {/* You can replace the following placeholder text with your actual data */}
          <div className="part-of-project-item">
            [Project 1]
            <br />
            [Project 1 description] and so on
          </div>
          {/* Repeat the above structure for each project the user is part of */}
        </div>
        <div className="jury-projects-container">
          <h2>You have been selected jury for the following projects:</h2>
          {/* Render the list of projects the user is selected as a jury for */}
          {/* [Proiect 3] [Descriere proiect 3] and so on */}
          {/* You can replace the following placeholder text with your actual data */}
          <div className="jury-project-item">
            [Proiect 3]
            <br />
            [Descriere proiect 3] and so on
          </div>
          {/* Repeat the above structure for each project the user is selected as a jury for */}
        </div>

        <div className="jury-chief-projects-container">
          <h2>You are chief juror for the following projects:</h2>
          {/* Render the list of projects the user is chief juror for */}
          {/* [Proiect 4] [Descriere proiect 4] and so on */}
          {/* You can replace the following placeholder text with your actual data */}
          <div className="jury-chief-project-item">
            [Proiect 4]
            <br />
            [Descriere proiect 4] and so on
          </div>
          {/* Repeat the above structure for each project the user is chief juror for */}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
