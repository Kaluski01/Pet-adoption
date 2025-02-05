import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import 'firebase/compat/firestore';
import { BiShow, BiHide } from 'react-icons/bi';

const firebaseConfig = {
  apiKey: 'AIzaSyA8R-6JStMc680KVXXQ_XGSRche5OQUtl4',
  authDomain: 'pet-adoption-project-99a08.firebaseapp.com',
  projectId: 'pet-adoption-project-99a08',
  storageBucket: 'pet-adoption-project-99a08.appspot.com',
  messagingSenderId: '226601747265',
  appId: '1:226601747265:web:24326e722ad314f751d7c0',
  measurementId: 'G-WJRCH01VP2',
};
initializeApp(firebaseConfig);

const Seller = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [acceptance, setAcceptance] = useState(false);
  const [error, setError] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    setIsSubmitting(true);

    if (!firstName || !number || !email || !address || !acceptance || !password) {
      setError('Please fill out all the specified form fields');
      setSpinner(false);
      setIsSubmitting(false);
      return;
    }

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);

      const userData = { firstName, number, address, acceptance, email };
      await firebase.firestore().collection('users').add(userData);

      setIsFormDisabled(true);

      setTimeout(() => {
        navigate('/sellerdashboard/sellerdash', { state: { propsEmail: email, propsFirstName: firstName } });
      }, 2000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please use a different email.');
      } else if (error.code === 'auth/weak-password') {
        setError('Your password is too weak. Please use a stronger password.');
      } else {
        setError('An error occurred during signup. Please try again.');
      }

      setSpinner(false);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    if (isFormDisabled) {
      return;
    }
    const { name, value, checked } = e.target;
    if (name === 'name') setFirstName(value);
    if (name === 'number') setNumber(value);
    if (name === 'email') setEmail(value);
    if (name === 'address') setAddress(value);
    if (name === 'password') setPassword(value);
    if (name === 'acceptance') setAcceptance(checked);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '15px' }}>
        {!isFormDisabled ? (
          <>
            <h2 className="text-center mb-4">Sign Up as a Seller</h2>
            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={firstName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  name="number"
                  value={number}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BiHide /> : <BiShow />}
                  </button>
                </div>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="acceptance"
                  checked={acceptance}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
                <label className="form-check-label">I agree to share my phone number with potential adopters.</label>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/signup/signup" className="btn btn-outline-primary">
                  Back
                </Link>
                <button className="btn btn-primary" type="submit" disabled={spinner || isSubmitting}>
                  {spinner ? <Spinner animation="border" size="sm" /> : 'Submit'}
                </button>
              </div>
              <div className="text-center mt-3">
                Already have an account?{' '}
                <Link to="/Login" className="text-primary">
                  Log in
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="alert alert-success text-center">
            <h4>Welcome, {firstName}!</h4>
            <p>Redirecting to your dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seller;
