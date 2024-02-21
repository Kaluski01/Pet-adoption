import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import './signup.css';

export default function AdopterSignUp() {
  const [firstname, setFirstName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

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
      <h1 className='main-sign mb-4'>Sign up as Adopter</h1>
      <div className="center-container mx-auto">
        <div className='form-container'>
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
              <label style={{ color: 'white' }}>
                Enter your name:
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={firstname}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label style={{ color: 'white' }}>
                Phone number:
                <input
                  type="number"
                  className="form-control"
                  name="number"
                  value={number}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label style={{ color: 'white' }}>
                Please enter your email:
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label style={{ color: 'white' }}>
                Address:
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label style={{ color: 'white' }}>
                Password:
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </label>
              {spinner && <Spinner animation="border" variant='primary' className="mt-3" />}
              <br />
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
            </form>
          )}
        </div>
      </div>
    </>
  );
}
