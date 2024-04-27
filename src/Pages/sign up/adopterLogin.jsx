import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import './seller.css';
import { BiShow, BiHide } from "react-icons/bi"

export default function Adopterlogin() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);

    setTimeout(() => {
      const storedUsers = localStorage.getItem('users');
      const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
      const user = usersArray.find(u => u.name === firstname && u.password === password);

      if (!user) {
        // Set error message and show it for 1 second
        setError('Invalid name or password.');
        setSpinner(false);
        setTimeout(() => {
          setError('');
        }, 1000);
      } else {
        // Show welcome message for 1 second before redirecting
        setShowWelcomeMessage(true);
        setTimeout(() => {
          setShowWelcomeMessage(false);
          navigate('/', { replace: true }); // Redirect to the home page
        }, 2000);
      }
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setFirstName(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <>
      <div className="container p-5">
      <h1 className='mt-5' style={{}}>Login as Adopter</h1>
        <div className='form-container mb-4'>
          {error && <p className="error-message">{error}</p>}
          {showWelcomeMessage && (
            <Toast className='w-100' onClose={() => setShowWelcomeMessage(false)} show={showWelcomeMessage} autohide>
              <Toast.Header>
                <strong className="me-auto">Success</strong>
              </Toast.Header>
              <Toast.Body>Welcome, {firstname}! Redirecting...</Toast.Body>
            </Toast>
          )}
          {!showWelcomeMessage && (
            <form className='form-hold' onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Enter your name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Password:</label>
                <input
                  type={showPassword ? "text" : "password"} 
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  
                />
                  <div className="show-password-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <BiHide /> : <BiShow />} {/* Show BiHide icon when password is visible */}
                      </div>
              </div>
              {spinner && <Spinner animation="border" variant='primary' className="mt-3" />}
              <div className="mb-3">
                <Link to="/login">
                  <button className='btn btn-primary me-4'>
                    Back
                  </button>
                </Link>
                {!spinner && !showWelcomeMessage && (
                  <button className='btn btn-primary' type="submit" value="Submit">
                    Submit
                  </button>
                )}
              </div>
              <Link to='/signup/signup' className="mt-3 d-block" style={{ color: 'black', textDecoration: 'none' }}>Don't have an account? <span className='btn btn-link'> Sign up</span></Link>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
