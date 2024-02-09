import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import './seller.css';

const Login = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [acceptance, setAcceptance] = useState(false);
  const [error, setError] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false); // Initialize as boolean

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
  
    setTimeout(() => {
      if (!firstname || !password || !acceptance) {
        setError('Please fill in all required fields.');
        setSpinner(false);
      } else {
        // Check if user exists in local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));
  
        if (storedUser && storedUser.firstname === firstname && storedUser.password === password) {
          setError('');
  
          // Store data in localStorage
          localStorage.setItem('user', JSON.stringify(storedUser));
  
          // Display the welcome message
          setShowWelcomeMessage(true);
  
          // Reset the welcome message after 5 seconds and navigate to the seller dashboard
          setTimeout(() => {
            setShowWelcomeMessage(false);
            // Redirect to the seller dashboard using navigate
            navigate('/sellerdashboard/sellerdash', { state: { firstname } });
          }, 2000);
        } else {
          setError('Invalid name or password.');
          setSpinner(false);
        }
      }
    }, 1000);
  };
  

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'name') {
      setFirstName(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'acceptance') {
      setAcceptance(checked);
    }
  };

  return (
    <>
      <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-lg-12">
                <h1 className='main-sign mb-2 mt-5'>Login</h1>
                    <div className="center-container mx-auto">
                        <div className='form-container' style={{ color: 'white' }}>
                        {error && <p className="error-message text-center mt-5">{error}</p>}
                        {spinner && <Spinner animation="border" variant='primary' className="mt-3" />}
                        {showWelcomeMessage && (
                          <p className="welcome-message">Welcome, {firstname}!</p>
                        )}
                        <form className='form-hold' onSubmit={handleSubmit} style={{borderRadius:'100px'}}>
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
                            <div className='d-flex gap-5 align-items-center'>
                            <Link to='/signup/signup'>
                                <button className='btn btn-primary mt-3' type="button">Back</button>
                            </Link>
                            <button className='btn btn-primary mt-3' type="submit" disabled={spinner}>
                                {spinner ? 'Submitting...' : 'Submit'}
                            </button>
                            </div>
                            <br />
                        </form>
                        </div>
                    </div>
                </div>
            </div>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
