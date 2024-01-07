import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const RegisterAsProf = () => {
  const [formData, setFormData] = useState({
    Prenume: '',
    Nume: '',
    Parola: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Log the updated value in the console
    console.log(`Updated ${name}:`, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/createUserProf", formData);
      console.log('Registration Successful:', response.data);
    } catch (error) {
      console.error('Registration Failed:', error);
      setErrorMessage('Registration failed. Please try again.'); // Set error message state
    }
  };

  return (
    <div className="container mt-5">
      <h2>Inregistrare Profesor</h2>
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
        <button type="submit" className="btn btn-primary">
          Inregistreaza
        </button>
      </form>
    </div>
  );
};

export default RegisterAsProf;
