import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import './signup.css';
import { BiShow, BiHide } from "react-icons/bi"


export default function AdopterSignUp() {
  const [firstname, setFirstName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);

    setTimeout(() => {
      if (!firstname || !number || !email || !address || !password) {
        setError('Please fill in all required fields.');
        setSpinner(false);
      } else {
        setError('');

        const userData = {
          name: firstname,
          number,
          email,
          address,
          password,
        };

        const storedUsers = localStorage.getItem('users');
        const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
        usersArray.push(userData);
        localStorage.setItem('users', JSON.stringify(usersArray));
        localStorage.setItem('adopterPhone', number);

        setFirstName('');
        setNumber('');
        setEmail('');
        setAddress('');
        setPassword('');

        setShowWelcomeMessage(true);

        setTimeout(() => {
          setShowWelcomeMessage(false);
        }, 5000);
      }

      setSpinner(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setFirstName(value);
    } else if (name === 'number') {
      setNumber(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'address') {
      setAddress(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <>
      <div className="container p-5">
      <h1 className='mt-5' style={{}}>Sign up as Adopter</h1>
        <div className='form-container mb-4'>
          {error && <p className="error-message">{error}</p>}
          {showWelcomeMessage && (
            <Toast className='w-100' onClose={() => setShowWelcomeMessage(false)} show={showWelcomeMessage} autohide>
              <Toast.Header>
                <strong className="me-auto">Success</strong>
              </Toast.Header>
              <Toast.Body>Thank you for signing up! <Link to='/'><button className='btn btn-primary'>Ok</button></Link></Toast.Body>
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
                <label className="form-label" style={{ color: 'black' }}>Phone number:</label>
                <input
                  type="number"
                  className="form-control"
                  name="number"
                  value={number}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Please enter your email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Address:</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 ">
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
                <Link to="/signup/signup">
                  <button className='btn btn-primary me-4'>
                    Back
                  </button>
                </Link>
                {!error && !spinner && !showWelcomeMessage && (
                  <button className='btn btn-primary' type="submit" value="Submit">
                    Submit
                  </button>
                )}
              </div>
              <Link to='/Adopterlogin' className="mt-3 d-block" style={{ color: 'black', textDecoration: 'none' }}>Already have an account? <span className='btn btn-link'> Log-in</span></Link>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
