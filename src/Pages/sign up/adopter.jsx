import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast'; // Add this import
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

    // Simulate form submission delay
    setTimeout(() => {
      if (!firstname || !number || !email || !address || !password) {
        setError('Please fill in all required fields.');
        setSpinner(false);
      } else {
        setError('');

        // Save user data to local storage
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

        // Store the adopter's phone number separately
        localStorage.setItem('adopterPhone', number);

        // Clear form fields after successful submission
        setFirstName('');
        setNumber('');
        setEmail('');
        setAddress('');
        setPassword('');

        // Display the welcome message
        setShowWelcomeMessage(true);

        // Reset the welcome message after 5 seconds
        setTimeout(() => {
          setShowWelcomeMessage(false);
        }, 5000);
      }

      // Always set spinner to false after submission attempt
      setSpinner(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Use the input's name attribute to determine which state to update
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
      <h1 className='main-sign'>Sign up as Adopter</h1>
      <div className="center-container mx-auto">
        <div className='form-container'>
          {error && <p className="error-message">{error}</p>}
          {spinner && <Spinner animation="border" variant='primary' className="mt-3" />}
          {showWelcomeMessage && (
            <Toast className='w-100' onClose={() => setShowWelcomeMessage(false)} show={showWelcomeMessage} autohide>
              <Toast.Header>
                <strong className="me-auto">Success</strong>
              </Toast.Header>
              <Toast.Body>Thank you for signing up! <Link to='/'><button className='btn btn-primary'>Ok</button></Link></Toast.Body>
            </Toast>
          )}
          {!showWelcomeMessage && (
            <form className='form-hold w-100 gap-5' onSubmit={handleSubmit}>
              <label style={{ color: 'white', width:'100%' }}>
                Enter your name:
                <input style={{width:'50%'}}
                  type="text"
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
                  name="number"
                  value={number}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label style={{ color: 'white', width:'100%' }}>
                Please enter your email:
                <input style={{width:'40%'}}
                  type="email"
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
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </label>
              <br />
              <Link to="/signup/signup">
                <button className='btn btn-primary mt-3 me-4'>
                  Back
                </button>
              </Link>
              {!error && !spinner && !showWelcomeMessage && (
                <button className='btn btn-primary mt-3' type="submit" value="Submit">
                  Submit
                </button>
              )}
            </form>
          )}
                   <Link to='/Login'><p style={{color:'white', textDecoration:'none'}}>Already have an account? <button className='btn btn-primary'> Log-in</button></p></Link>
        </div>
      </div>
    </>
  );
}
