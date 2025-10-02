import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import { BiShow, BiHide } from 'react-icons/bi';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import './adopterSignUp.css'; // warm styles

const firebaseConfig = {
  apiKey: 'AIzaSyA8R-6JStMc680KVXXQ_XGSRche5OQUtl4',
  authDomain: 'pet-adoption-project-99a08.firebaseapp.com',
  projectId: 'pet-adoption-project-99a08',
  storageBucket: 'pet-adoption-project-99a08.appspot.com',
  messagingSenderId: '226601747265',
  appId: '1:226601747265:web:24326e722ad314f751d7c0',
  measurementId: 'G-WJRCH01VP2',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const AdopterSignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState('');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    setError('');

    if (!firstName || !phoneNumber || !email || !address || !password) {
      setError('⚠️ Please fill in all required fields.');
      setSpinner(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'adopters', user.uid), {
        firstName,
        phoneNumber,
        email,
        address,
        role: 'adopter',
        createdAt: new Date(),
      });

      localStorage.setItem(
        'user',
        JSON.stringify({ id: user.uid, firstName, phoneNumber, email, address, role: 'adopter' })
      );

      setShowWelcomeMessage(true);
      setTimeout(() => navigate('/adopterdashboard'), 2500);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try logging in instead.');
      } else if (error.code === 'auth/weak-password') {
        setError('Your password is too weak. Please use a stronger one.');
      } else {
        setError('❌ Something went wrong. Please try again.');
      }
    } finally {
      setSpinner(false);
    }
  };

  return (
    <div className="signup-page d-flex align-items-center justify-content-center">
      <div className="signup-card shadow-lg p-4 rounded">
        <h1 className="text-center warm-title mb-4">🐾 Sign Up as Adopter</h1>

        {error && <p className="error-message text-center">{error}</p>}

        {showWelcomeMessage ? (
          <Toast className="w-100 success-toast" onClose={() => setShowWelcomeMessage(false)} show autohide>
            <Toast.Header>
              <strong className="me-auto">🎉 Success</strong>
            </Toast.Header>
            <Toast.Body>
              Thank you for signing up!
              <Link to="/">
                <button className="btn btn-warm mt-2">Ok</button>
              </Link>
            </Toast.Body>
          </Toast>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="number"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BiHide /> : <BiShow />}
                </button>
              </div>
            </div>

            <button className="btn btn-warm w-100 mt-3" type="submit" disabled={spinner}>
              {spinner ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
            </button>

            <div className="text-center mt-3">
              Already have an account?{' '}
              <Link to="/adopterLogin" className="link-warm">
                Log in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdopterSignUp;
