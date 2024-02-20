import React, { useState, } from 'react';
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
  const [acceptance, setAcceptance]=useState(false)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);

    setTimeout(() => {
      if (!firstname || !number || !email || !address || !password||!acceptance) {
        setError('Please fill in all required fields.');

        // Clear the error message after 5 seconds
        setTimeout(() => {
          setError('');
        }, 5000);
      } else {
        setError('');

        // Store data in localStorage
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
        setAcceptance('')
        // Display the welcome message
        setShowWelcomeMessage(true);

        // Reset the welcome message after 5 seconds and navigate to the seller dashboard
        setTimeout(() => {
          setShowWelcomeMessage(false);
          // Redirect to the seller dashboard using navigate
          navigate('/sellerdashboard/sellerdash', { state: { firstname } });
        }, 2000);
      }

      // Always set spinner to false after submission attempt
      setSpinner(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    // const {name,}
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
    }else if(name === 'acceptance'){
      setAcceptance(checked)
    }
  };

  return (
    <>
      <h1 className='main-sign'>Sign up</h1>
      <div className="center-container mx-auto">
        <div className='form-container' style={{color:'white'}}>
          {error && <p className="error-message">{error}</p>}
          {!showWelcomeMessage && (
            <form className='form-hold' onSubmit={handleSubmit}>
              <label style={{ color: 'white' }}>
                Enter your name:
                <input
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
              <label style={{ color: 'white' }}>
                Please enter your email:
                <input
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
              <label className='d-flex justify-content-between gap-3'>
                    <input
                type="checkbox"
                name='acceptance'
                checked={acceptance}
                onChange={handleChange}
              />
              I understand and accept that my phone number may be shared with potential adopters.
       
              </label>
              {spinner && <Spinner animation="border" variant='primary' className="mt-3" />}
          {showWelcomeMessage && (
            <p className="welcome-message">Thank you for joining us</p>
          )}
              <div className='d-flex gap-5 align-items-center'>
                <Link to='/signup/signup'>
                  <button className='btn btn-primary mt-3' type="button">Back</button>
                </Link>
                {!error && !spinner && !showWelcomeMessage && (
                  <button className='btn btn-primary mt-3' type="submit" value="Submit">
                    Submit
                  </button>
                )}
                <br />
              </div>
              <br />
              <Link to='/Login'><p style={{color:'white', textDecoration:'none'}}>Already have an account? <button className='btn btn-primary'> Log-in</button></p></Link>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Seller;
