import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProjectDetails = () => {
  // Sample project data (replace with your actual data)
  const project = {
    title: 'Your Project Title',
    description: 'Description of your project goes here.',
    deliverables: [
        {
            id: 1,
            name: 'Deliverable 1',
            description: 'Description of Deliverable 1 goes here.',
            deadline: new Date('2023-01-15'), // Replace with an actual date
            videoLink: 'https://example.com/video1',
            reviews: [
              { grade: 8, description: 'Good work on this deliverable!' },
              { grade: 6, description: 'Needs improvement in some areas.' }
            ]
          },
          {
            id: 2,
            name: 'Deliverable 2',
            description: 'Description of Deliverable 2 goes here.',
            deadline: new Date('2024-02-05'), // Replace with an actual date
            videoLink: 'https://example.com/video2',
            reviews: [
              { grade: 9, description: 'Excellent job on this one!' }
            ]
          },
          {
            id: 3,
            name: 'Deliverable 3',
            description: 'Description of Deliverable 3 goes here.',
            deadline: new Date('2024-03-10'), // A future deadline
            videoLink: 'https://example.com/video3',
            reviews: [
              { grade: 7, description: 'This deliverable was okay.' }
            ]
          },
          {
            id: 3,
            name: 'Deliverable 3',
            description: 'Description of Deliverable 3 goes here.',
            deadline: new Date('2024-03-10'), // A future deadline
            videoLink: 'https://example.com/video3',
            reviews: [
              { grade: 7, description: 'This deliverable was okay.' }
            ]
          },
          {
            id: 3,
            name: 'Deliverable 3',
            description: 'Description of Deliverable 3 goes here.',
            deadline: new Date('2024-03-10'), // A future deadline
            videoLink: 'https://example.com/video3',
            reviews: [
              { grade: 7, description: 'This deliverable was okay.' }
            ]
          },
          {
            id: 3,
            name: 'Deliverable 3',
            description: 'Description of Deliverable 3 goes here.',
            deadline: new Date('2024-03-10'), // A future deadline
            videoLink: 'https://example.com/video3',
            reviews: [
              { grade: 7, description: 'This deliverable was okay.' }
            ]
          },
          {
            id: 4,
            name: 'Deliverable 3',
            description: 'Description of Deliverable 3 goes here.',
            deadline: new Date('2024-01-01'), // A future deadline
            videoLink: 'https://example.com/video3',
            reviews: [
              { grade: 7, description: 'This deliverable was okay.' },
              { grade: 7, description: 'This deliverable was okay.' },
              { grade: 7, description: 'This deliverable was okay.' },
              { grade: 7, description: 'This deliverable was okay.' },
              { grade: 7, description: 'This deliverable was okay.' },
              { grade: 7, description: 'This deliverable was okay.' },
              { grade: 7, description: 'This deliverable was okay.' },
              { grade: 7, description: 'This deliverable was okay.' },
            ]
          }
    ],
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
    if (deliverable.deadline <= today) {
      setSelectedDeliverable(deliverable);
      setSelectedDeliverableId(deliverable.id); // Store the ID of the selected deliverable
      console.log('Selected Deliverable ID:', deliverable.id);
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
    // Logic to add a new deliverable
    console.log('New deliverable:', newDeliverable);
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
                const isPastDeadline = deliverable.deadline <= today;
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
                    <strong>{deliverable.name}</strong>
                    <br />
                    Deadline: {deliverable.deadline.toLocaleDateString('en-GB')}
                    {isPastDeadline && meanGrade !== null && ( // Display mean grade if conditions are met
                      <span>
                        <br />
                        Mean Grade: {meanGrade}
                      </span>
                    )}
                    <p>Description: {deliverable.description}</p>
                    {deliverable.videoLink && (
                      <p>
                        Video Link:{' '}
                        <a href={deliverable.videoLink} target="_blank" rel="noopener noreferrer">
                          {deliverable.videoLink}
                        </a>
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
            {/* Form to add a new deliverable */}
          <form onSubmit={handleNewDeliverableSubmit}>
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
                value={newDeliverable.deadline}
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
