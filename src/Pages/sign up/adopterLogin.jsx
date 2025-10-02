import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import './seller.css';

const AdopterLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptance, setAcceptance] = useState(false);
  const [error, setError] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    setError('');

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      // Fetch user's data from Firestore
      const db = getFirestore();
      const usersCollectionRef = collection(db, 'adopters');
      const q = query(usersCollectionRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      let fetchedFirstname = '';
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        fetchedFirstname = userData.firstName;
        setFirstname(fetchedFirstname);
      });

      setShowWelcomeMessage(true);
      setTimeout(() => {
        navigate('/adopterdashboard', { state: { propsFirstName: fetchedFirstname } });
      }, 2000);
    } catch (error) {
      setError('Invalid email or password.');
      console.error('Login error:', error.message);
    } finally {
      setSpinner(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'acceptance') {
      setAcceptance(checked);
    }
  };

  return (
    <div className="login-page mt-5 p-5 d-flex justify-content-center align-items-center">
      <div className="login-card p-4 shadow-lg rounded">
        <h1 className="text-center mb-4" style={{ color: '#e67e22' }}>
          🐾 Adopter Login
        </h1>

        {error && <p className="error-message text-center">{error}</p>}
        {spinner && <Spinner animation="border" variant="warning" className="d-block mx-auto mb-3" />}
        {showWelcomeMessage && <p className="welcome-message text-center">Welcome, {firstname}!</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: '#d35400' }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: '#d35400' }}>
              Password
            </label>
            <div className="password-input d-flex">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-warning ms-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BiHide /> : <BiShow />}
              </button>
            </div>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="acceptance"
              checked={acceptance}
              onChange={handleChange}
            />
            <label className="form-check-label" style={{ color: '#d35400' }}>
              I accept the terms and conditions
            </label>
          </div>

          <div className="d-flex justify-content-between">
            <Link to="/signup/signup">
              <button className="btn btn-outline-warning" type="button">
                Back
              </button>
            </Link>
            <button className="btn btn-warning text-white" type="submit" disabled={spinner}>
              {spinner ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <Link to="/signup/signup" style={{ textDecoration: 'none', color: '#e67e22' }}>
            Don’t have an account? <span className="fw-bold">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdopterLogin;
