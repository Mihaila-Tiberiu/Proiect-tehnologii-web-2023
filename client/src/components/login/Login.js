import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login Page</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="d-grid">
            <Link to="/login/professor" className="btn btn-primary">
              Login as Professor
            </Link>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="d-grid">
            <Link to="/login/student" className="btn btn-primary">
              Login as Student
            </Link>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="d-grid">
            <Link to="/register/prof" className="btn btn-secondary">
              Register as Professor
            </Link>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="d-grid">
            <Link to="/register/student" className="btn btn-secondary">
              Register as Student
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;