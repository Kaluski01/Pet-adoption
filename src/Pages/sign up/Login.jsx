import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import './seller.css';

const Login = () => {
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

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      const db = getFirestore();
      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      let fetchedFirstname = '';
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        fetchedFirstname = userData.firstName;
        setFirstname(fetchedFirstname);
      });

      setShowWelcomeMessage(true);
      navigate('/sellerdashboard/sellerdash', { state: { propsFirstName: fetchedFirstname } });
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError('');
        setEmail('');
        setPassword('');
        setAcceptance(false);
      }, 3000);
    }

    setSpinner(false);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'acceptance') setAcceptance(checked);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: '100%',
          maxWidth: '500px',
          borderRadius: '15px',
          border: 'none',
          backgroundColor: '#fff3e0', // soft warm cream
        }}
      >
        <h2 className="text-center mt-4" style={{ color: '#e65100' }}>
          🔑 Login
        </h2>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        {spinner && <Spinner animation="border" variant="warning" className="d-block mx-auto mb-3" />}
        {showWelcomeMessage && (
          <div className="alert alert-success text-center" style={{ backgroundColor: '#ffe0b2', color: '#e65100' }}>
            Welcome, {firstname}!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#bf360c' }}>
              Enter your email:
            </label>
            <input type="email" className="form-control" name="email" value={email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: '#bf360c' }}>
              Password:
            </label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
              <button type="button" className="btn btn-outline-warning" onClick={() => setShowPassword(!showPassword)}>
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
            />
            <label className="form-check-label" style={{ color: '#bf360c' }}>
              I accept that my phone number may be shared with adopters.
            </label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <Link to="/signup/signup" className="btn btn-outline-warning">
              Back
            </Link>
            <button
              className="btn"
              type="submit"
              disabled={spinner}
              style={{ backgroundColor: '#ff7043', color: 'white', border: 'none' }}
            >
              {spinner ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          Don’t have an account?{' '}
          <Link to="/signup/signup" style={{ color: '#e64a19', fontWeight: 'bold' }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
