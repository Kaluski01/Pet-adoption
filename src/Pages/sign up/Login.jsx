import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from "react-icons/bi"; // Import BiHide icon
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore
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
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    try {
      // Sign in with email and password
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      // Fetch user's data after successful login
      const db = getFirestore();
      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      let fetchedFirstname = '';
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        fetchedFirstname = userData.firstName; // Correct key
        setFirstname(fetchedFirstname); // Set firstname state
      });

      // Show welcome message and navigate to seller dashboard
      setShowWelcomeMessage(true);
      navigate('/sellerdashboard/sellerdash', { state: { propsFirstName: fetchedFirstname } });

    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError('');
        setEmail('');
        setPassword('');
        setAcceptance('');
      }, 3000);
    }

    setSpinner(false);
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
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-12">
            <h1 className='main-sign mb-4 mt-5' style={{ color: 'black' }}>LOGIN</h1>
            <div className="center-container mx-auto">
              <div className='form-container'>
                {error && <p className="error-message text-center">{error}</p>}
                {spinner && <Spinner animation="border" variant='primary' className="mt-3" />}
                {showWelcomeMessage && (
                  <p className="welcome-message">Welcome, {firstname}!</p> // Display firstname
                )}
                <form className='form-hold' onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Enter your email:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Password:</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"} // Conditionally render as text or password
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={handleChange}
                      />
                      <div className="show-password-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <BiHide /> : <BiShow />} {/* Show BiHide icon when password is visible */}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name='acceptance'
                      checked={acceptance}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" style={{ color: 'black' }}>I understand and accept that my phone number may be shared with potential adopters.</label>
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
    </>
  );
};

export default Login;
