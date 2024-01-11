import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="container mt-5">
      <div>
        <h1 className='titlu'>Proiect Tehnologii Web - Aplicație web pentru acordarea anonimă de note</h1>
        <h2 className='about'>Realizat de: Martalogu Alexandru-Ionuț, Mihăilă Andrei-Tiberiu și Popescu Gabriel</h2>
      
      </div>
      <h2 className="mb-4">Pagina de autentificare: </h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="d-grid">
            <Link to="/login/professor" className="btn btn-primary">
              Autentificare ca Profesor
            </Link>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="d-grid">
            <Link to="/login/student" className="btn btn-primary">
              Autentificare ca Student
            </Link>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="d-grid">
            <Link to="/register/prof" className="btn btn-secondary">
            Înregistrare ca Profesor
            </Link>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="d-grid">
            <Link to="/register/student" className="btn btn-secondary">
            Înregistrare ca Student
            </Link>
          </div>
        </div>
      </div>
      <h3 className='info'>Grupa 1091 - seria D</h3>
      <h3 className='info2'>2024</h3>
    </div>
  );
};

export default Login;