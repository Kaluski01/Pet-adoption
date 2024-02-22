import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import './seller.css';

const Seller = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [acceptance, setAcceptance] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
  
    setTimeout(() => {
      if (!firstname || !number || !email || !address || !password || !acceptance) {
        setError('Please fill in all required fields.');
        setSpinner(false);
      } else {
        setError('');
  
        const user = {
          firstname,
          number,
          email,
          address,
          password,
          acceptance,
        };
        localStorage.setItem('user', JSON.stringify(user));
  
        // Clear form fields after successful submission
        setFirstName('');
        setNumber('');
        setEmail('');
        setAddress('');
        setPassword('');
        setAcceptance('');
  
        // Set the welcome message
        setShowWelcomeMessage(true);
  
        // Reset the welcome message after 5 seconds
        setTimeout(() => {
          setShowWelcomeMessage(false);
          // setError('Please fill in all required fields.');
          navigate('/sellerdashboard/sellerdash', { state: { firstname } });
        }, 2000);
      }
  
      // Always set spinner to false after submission attempt
      setSpinner(false);
    }, 1000);
  };
  

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

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
    } else if (name === 'acceptance') {
      setAcceptance(checked);
    }
  };

  return (
    <>
      <h1 className='main-sign mb-4'>Sign up</h1>
      <div className="center-container mx-auto">
        <div className='form-container'>
          {error && <p className="error-message">{error}</p>}
          {!showWelcomeMessage && (
            <form className='form-hold' onSubmit={handleSubmit}>
              <label>
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
              <label>
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
              <label>
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
              <label>
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
              <label>
                Password:
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </label>
              <br />
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="acceptance"
                  checked={acceptance}
                  onChange={handleChange}
                />
                <label className="form-check-label">I understand and accept that my phone number may be shared with potential adopters.</label>
              </div>
              {spinner && <Spinner animation="border" variant='primary' className="mt-3" />}
              {showWelcomeMessage && (
                <p className="welcome-message">Thank you for joining us</p>
              )}
              <div className='d-flex justify-content-between mt-3'>
                <Link to='/signup/signup'>
                  <button className='btn btn-primary' type="button">Back</button>
                </Link>
                {!error && !spinner && !showWelcomeMessage && (
                  <button className='btn btn-primary' type="submit" value="Submit">
                    Submit
                  </button>
                )}
              </div>
              <Link to='/Login' className="mt-3 d-block" style={{ color: 'white', textDecoration: 'none' }}>Already have an account? <span className='btn btn-link'> Log-in</span></Link>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Seller;
