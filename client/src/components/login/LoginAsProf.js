import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../config';
import { useNavigate } from 'react-router-dom';

const LoginAsProf = () => {
  const [formData, setFormData] = useState({
    ProfesorID: '',
    Prenume: '',
    Nume: '',
    Parola: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Log the updated value in the console
    console.log(`Updated ${name}:`, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(config.REACT_APP_BACKEND_URL + "/auth/loginProf", formData);
      // Set the token in Cookies upon successful login
      console.log('Login Successful:', response.data);
      document.cookie = `ProfesorID=${formData.ProfesorID}; path=/`;

      // Redirect to ProfDashboard upon successful login
      navigate('/prof-dashboard');
    } catch (error) {
      console.error('Login Failed:', error);
      setErrorMessage('Login failed. Please try again.'); // Set error message state
    }
  };

  return (
    <div className="container mt-5">
    <h2 style={{ marginBottom: '20px' }}>Autentificare ca profesor:</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="Prenume" className="form-label">
            Prenume (First Name)
          </label>
          <input
            type="text"
            className="form-control"
            id="Prenume"
            name="Prenume"
            value={formData.Prenume}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Nume" className="form-label">
            Nume (Last Name)
          </label>
          <input
            type="text"
            className="form-control"
            id="Nume"
            name="Nume"
            value={formData.Nume}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Parola" className="form-label">
            Parola (Password)
          </label>
          <input
            type="password"
            className="form-control"
            id="Parola"
            name="Parola"
            value={formData.Parola}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ProfesorID" className="form-label">
            ID Profesor
          </label>
          <input
            type="text"
            className="form-control"
            id="ProfesorID"
            name="ProfesorID"
            value={formData.ProfesorID}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
         <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}> Autentificare </button>
         <button className="btn btn-secondary" onClick={handleBack}>Înapoi</button>
        </div>

      </form>
      
    </div>
  );
};

export default LoginAsProf;
