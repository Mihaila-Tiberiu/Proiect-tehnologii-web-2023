import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config'

const ProjectDetails = () => {

  function formatDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const formattedDate = new Date(year, month - 1, day + 1);
  return formattedDate.toISOString().split('T')[0];
}


  function parseDateString(dateString) {
    // Split the date string into an array of day, month, and year
    const [year,month,day] = dateString.split('-').map(Number);
  
    // Month in JavaScript Date object is zero-indexed, so subtract 1 from the parsed month
    const monthIndex = month - 1;
  
    // Create a new Date object with the parsed values
    const parsedDate = new Date(year, monthIndex, day);
  
    return parsedDate;
  }
  // Sample project data (replace with your actual data)

  const [livrabileValue, setLivrabileValue] = useState(null);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  useEffect(() => {
    // Step 1: Retrieve clickedProjectId from localStorage
    const clickedProjectId = localStorage.getItem("clickedProjectId");

    // Step 2: Make an API call to fetch all projects
    fetch(config.REACT_APP_BACKEND_URL+"/professors/getProjects")
      .then(response => response.json())
      .then(data => {
        // Step 3: Identify the project with ProiectID equal to clickedProjectId
        const projects = data; // Assuming data is an array of projects from the API
        const selectedProject = projects.find(project => project.ProiectID == clickedProjectId);
        console.log(selectedProject);

        if (selectedProject) {
          // Step 4: Extract Livrabile property and save it as a new variable
          const livrabileValue = selectedProject.Livrabile;

          // Update state with the extracted value
          setLivrabileValue(livrabileValue);

          const titleValue = selectedProject.NumeProiect;
          setTitleValue(titleValue);

          const descriptionValue = selectedProject.Descriere;
          setDescriptionValue(descriptionValue);

          console.log("Livrabile Value:", livrabileValue);
        } else {
          console.log("Project not found");
        }
      })
      .catch(error => console.error("Error fetching projects:", error));
  }, []);

  const project = {
    title: titleValue,
    description: descriptionValue,
    deliverables: livrabileValue !== null ? livrabileValue : []
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    const studentIDCookie = document.cookie.includes('StudentID=');
    const professorIDCookie = document.cookie.includes('ProfesorID=');

    if (studentIDCookie) {
      navigate('/student-dashboard');
    } else if (professorIDCookie) {
      navigate('/prof-dashboard');
    } else {
      navigate('/');
    }
  };

  const calculateMeanGrade = (reviews) => {
    const gradesSum = reviews.reduce((total, review) => total + review.grade, 0);
    const meanGrade = gradesSum / reviews.length;
    return meanGrade.toFixed(2); // Round the mean grade to two decimal places
  };

  const [selectedDeliverable, setSelectedDeliverable] = useState(null);

  const [selectedDeliverableId, setSelectedDeliverableId] = useState(null);

  const handleDeliverableClick = (deliverable) => {
    const today = new Date();
  if (deliverable && deliverable.Deadline && parseDateString(deliverable.Deadline) <= today) {
    setSelectedDeliverable(deliverable);
    setSelectedDeliverableId(deliverable.LivrabilID); // Store the ID of the selected deliverable
    console.log('Selected Deliverable ID:', deliverable.LivrabilID);
  } else {
    setSelectedDeliverable(null);
    setSelectedDeliverableId(null); // Reset the selected deliverable ID
  }
  };

  const [newDeliverable, setNewDeliverable] = useState({
    name: '',
    description: '',
    deadline: '',
    videoLink: '',
  });

  const [newReview, setNewReview] = useState({
    grade: '',
    description: '',
  });

  const handleNewDeliverableChange = (e) => {
    const { name, value } = e.target;
    setNewDeliverable({ ...newDeliverable, [name]: value });
  };

  const handleNewDeliverableSubmit = (e) => {
    e.preventDefault();

    // Create a new deliverable object from the form data
    const newDeliverableData = {
      ProiectID: localStorage.getItem("clickedProjectId"),
      NumeLivrabil: newDeliverable.name,
      VideoDemonstrativ: newDeliverable.videoLink,
      LinkServer: newDeliverable.description,
      Deadline: formatDate(newDeliverable.deadline), // Assuming you have a formatDate function
    };

    // Make a POST request to add the new deliverable
    fetch(`${config.REACT_APP_BACKEND_URL}/students/addDeliverable/${newDeliverableData.ProiectID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDeliverableData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('New deliverable added:', data);
        // Assuming the API response contains the updated list of deliverables, you can update the state accordingly
        setLivrabileValue([...livrabileValue, data]);
      })
      .catch(error => console.error('Error adding new deliverable:', error));

    // Reset the form fields
    setNewDeliverable({
      name: '',
      description: '',
      deadline: '',
      videoLink: '',
    });
  };

  const handleNewReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleNewReviewSubmit = (e) => {
    e.preventDefault();
    // Logic to add a new review
    console.log('New review:', newReview);
    // Reset the form fields
    setNewReview({
      grade: '',
      description: '',
    });
  };

  return (
    <div className="container-fluid" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="row">
        {/* Left side */}
        <div className="col-md-6 bg-light">
          <div className="p-4">
          <button
            onClick={handleGoBack}
            className="btn btn-secondary mb-2"
            style={{ marginRight: '10px' }}
          >
            Back to Dashboard
          </button>
            <h2>{project.title}</h2>
            <p>{project.description}</p>

            <h4>Deliverables:</h4>
            <ul className="list-group">
              {project.deliverables.map((deliverable) => {
                const today = new Date();
                const isPastDeadline = deliverable.Deadline <= today;
                const meanGrade =
                  isPastDeadline && deliverable.reviews.length > 0
                    ? calculateMeanGrade(deliverable.reviews)
                    : null;

                return (
                  <li
                    key={deliverable.id}
                    className={`list-group-item ${
                      selectedDeliverableId === deliverable.id ? 'active' : ''
                    }`}
                    onClick={() => handleDeliverableClick(deliverable)}
                    style={{ cursor: isPastDeadline ? 'pointer' : 'default' }}
                  >
                    <strong>{deliverable.NumeLivrabil}</strong>
                    <br />
                    Deadline: {deliverable.Deadline}
                    {isPastDeadline && meanGrade !== null && ( // Display mean grade if conditions are met
                      <span>
                        <br />
                        Mean Grade: {meanGrade}
                      </span>
                    )}
                    <br />
                    <span>Description: {deliverable.LinkServer}</span>
                    {deliverable.VideoDemonstrativ && (
                      <span>
                        <br />
                        Video Link:{' '}
                        <a href={deliverable.VideoDemonstrativ} target="_blank" rel="noopener noreferrer">
                          {deliverable.VideoDemonstrativ}
                        </a>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            {/* Form to add a new deliverable */}
          <form onSubmit={handleNewDeliverableSubmit}>
            <br />
            <h4>Add New Deliverable:</h4>
            <div className="mb-3">
              <label htmlFor="newDeliverableName" className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                id="newDeliverableName"
                name="name"
                value={newDeliverable.name}
                onChange={handleNewDeliverableChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newDeliverableDescription" className="form-label">Description:</label>
              <textarea
                className="form-control"
                id="newDeliverableDescription"
                name="description"
                value={newDeliverable.description}
                onChange={handleNewDeliverableChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="newDeliverableDeadline" className="form-label">Deadline:</label>
              <input
                type="date"
                className="form-control"
                id="newDeliverableDeadline"
                name="deadline"
                value={newDeliverable.Deadline}
                onChange={handleNewDeliverableChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newDeliverableVideoLink" className="form-label">Video Link:</label>
              <input
                type="url"
                className="form-control"
                id="newDeliverableVideoLink"
                name="videoLink"
                value={newDeliverable.videoLink}
                onChange={handleNewDeliverableChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Deliverable</button>
          </form>
          </div>
        </div>

        {/* Right side */}
        <div className="col-md-6">
          <div className="p-4">
            <h2>Reviews:</h2>
            {selectedDeliverable ? (
              <React.Fragment>
                <ul>
                  {selectedDeliverable.reviews.map((review, index) => (
                    <li key={index}>
                      <strong>Grade:</strong> {review.grade}
                      <br />
                      <strong>Description:</strong> {review.description}
                      <br />
                      <br />
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleNewReviewSubmit}>
                  <div className="mb-3">
                  <h4>Add New Review:</h4>
                    <label htmlFor="newReviewGrade" className="form-label">Grade:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="newReviewGrade"
                      name="grade"
                      value={newReview.grade}
                      onChange={handleNewReviewChange}
                      min="1"
                      max="10"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newReviewDescription" className="form-label">Description:</label>
                    <textarea
                      className="form-control"
                      id="newReviewDescription"
                      name="description"
                      value={newReview.description}
                      onChange={handleNewReviewChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Add Review</button>
                </form>
              </React.Fragment>
            ) : (
              <p>No deliverable selected or deadline is in the future.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
