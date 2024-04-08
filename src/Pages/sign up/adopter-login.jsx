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
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);

    setTimeout(() => {
      if (!firstname || !password || !acceptance) {
        setError('Please fill in all required fields.');
        setSpinner(false);
      } else {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.firstname === firstname && storedUser.password === password) {
          setError('');
          localStorage.setItem('user', JSON.stringify(storedUser));
          setShowWelcomeMessage(true);

          setTimeout(() => {
            setShowWelcomeMessage(false);
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
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-12">
            <h1 className='main-sign mb-4 mt-5' style={{color:'black'}}>LOGIN</h1>
            <div className="center-container mx-auto">
              <div className='form-container'>
                {error && <p className="error-message text-center">{error}</p>}
                {spinner && <Spinner animation="border" variant='primary' className="mt-3" />}
                {showWelcomeMessage && (
                  <p className="welcome-message">Welcome, {firstname}!</p>
                )}
                <form className='form-hold' onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'white' }}>Enter your name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'white' }}>Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name='acceptance'
                      checked={acceptance}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" style={{ color: 'white' }}>I understand and accept that my phone number may be shared with potential adopters.</label>
                  </div>
                  <div className='d-flex justify-content-between mt-3'>
                    <Link to='/signup/signup'>
                      <button className='btn btn-primary' type="button">Back</button>
                    </Link>
                    <button className='btn btn-primary' type="submit" disabled={spinner}>
                      {spinner ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
