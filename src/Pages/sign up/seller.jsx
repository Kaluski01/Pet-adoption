// import React, { useState } from 'react';
// import Spinner from 'react-bootstrap/Spinner';
// import { Link, useNavigate } from 'react-router-dom';
// import {intialiazeApp} from 'firebase/app'
// import {getAuth, createWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
// import './seller.css';

// const Seller = () => {
//   const navigate = useNavigate();
//   const [firstname, setFirstName] = useState('');
//   const [number, setNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [address, setAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [spinner, setSpinner] = useState(false);
//   const [acceptance, setAcceptance] = useState(false);
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSpinner(true);
  
//     setTimeout(() => {
//       if (!firstname || !number || !email || !address || !password || !acceptance) {
//         setError('Please fill in all required fields.');
//         setSpinner(false);
  
//         // Clear error message after 5 seconds
//         setTimeout(() => {
//           setError('');
//         }, 5000);
//       } else {
//         setError('');
  
//         const user = {
//           firstname,
//           number,
//           email,
//           address,
//           password,
//           acceptance,
//         };
//         localStorage.setItem('user', JSON.stringify(user));
  
//         // Clear form fields after successful submission
//         setFirstName('');
//         setNumber('');
//         setEmail('');
//         setAddress('');
//         setPassword('');
//         setAcceptance('');
  
//         // Set the welcome message
//         setShowWelcomeMessage(true);
  
//         // Reset the welcome message after 5 seconds
//         setTimeout(() => {
//           setShowWelcomeMessage(false);
//           navigate('/sellerdashboard/sellerdash', { state: { firstname } });
//         }, 2000);
//       }
      
//       // Always set spinner to false after submission attempt
//       setSpinner(false);
//     }, 1000);
//   };
  
//       // Always set spinner to false after submission attempt
//   const handleChange = (e) => {
//     const { name, value, checked } = e.target;

//     if (name === 'name') {
//       setFirstName(value);
//     } else if (name === 'number') {
//       setNumber(value);
//     } else if (name === 'email') {
//       setEmail(value);
//     } else if (name === 'address') {
//       setAddress(value);
//     } else if (name === 'password') {
//       setPassword(value);
//     } else if (name === 'acceptance') {
//       setAcceptance(checked);
//     }
//   };

//   return (
//     <>
//       <h1 className='main-sign mb-4'>Sign up</h1>
//       <div className="container">
//         <div className='form-container mb-4'>
//             {error && <p className="error-message">{error}</p>}
//           {!showWelcomeMessage && (
//             <form className='form-hold' onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">
//                   Enter your name:
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="name"
//                   value={firstname}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">
//                   Phone number:
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   name="number"
//                   value={number}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">
//                   Please enter your email:
//                 </label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   name="email"
//                   value={email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">
//                   Address:
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="address"
//                   value={address}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">
//                   Password:
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   name="password"
//                   value={password}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3 form-check">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   name="acceptance"
//                   checked={acceptance}
//                   onChange={handleChange}
//                 />
//                 <label className="form-check-label">I understand and accept that my phone number may be shared with potential adopters.</label>
//               </div>
//               {spinner && <Spinner animation="border" variant='primary' className="mt-3" />}
//               {showWelcomeMessage && (
//                 <p className="welcome-message">Thank you for joining us</p>
//               )}
//               <div className='d-flex justify-content-between mt-3'>
//                 <Link to='/signup/signup'>
//                   <button className='btn btn-primary' type="button">Back</button>
//                 </Link>
//                 {!error && !spinner && !showWelcomeMessage && (
//                   <button className='btn btn-primary' type="submit" value="Submit">
//                     Submit
//                   </button>
//                 )}
//               </div>
//               <Link to='/Login' className="mt-3 d-block" style={{ color: 'white', textDecoration: 'none' }}>Already have an account? <span className='btn btn-link'> Log-in</span></Link>
//             </form>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Seller;
import React, { useState } from 'react';
// import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import 'firebase/compat/firestore'; // Import Firestore for Firebase v9

// Initialize Firebase app
const firebaseConfig = {
  apiKey: "AIzaSyA8R-6JStMc680KVXXQ_XGSRche5OQUtl4",
  authDomain: "pet-adoption-project-99a08.firebaseapp.com",
  projectId: "pet-adoption-project-99a08",
  storageBucket: "pet-adoption-project-99a08.appspot.com",
  messagingSenderId: "226601747265",
  appId: "1:226601747265:web:24326e722ad314f751d7c0",
  measurementId: "G-WJRCH01VP2"
};
initializeApp(firebaseConfig);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    try {
      const auth = getAuth(); // Get the Auth object
      // Create user with email and password in Firebase
      await createUserWithEmailAndPassword(auth, email, password);

      // Store additional user data in Firebase Firestore if needed
      const userData = {
        firstname,
        number,
        address,
        acceptance,
      };

      // Here, you would typically store the user data in Firestore
      // For simplicity, this example only logs the user data
      console.log('User data:', userData);

      // Add userData to Firestore
      await firebase.firestore().collection('users').add(userData);

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
        navigate('/sellerdashboard/sellerdash', { state: { firstname } });
      }, 2000);
    } catch (error) {
      setError(error.message);
      // Clear error message after 5 seconds
      setTimeout(() => {
        setError('');
      }, 5000);
      console.error('Error signing up:', error);
    }

    setSpinner(false);
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
      <div className="container">
        <div className='form-container mb-4'>
          {error && <p className="error-message">{error}</p>}
          {!showWelcomeMessage && (
            <form className='form-hold' onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  Enter your name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Phone number:
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="number"
                  value={number}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Please enter your email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Password:
                </label>
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
                  name="acceptance"
                  checked={acceptance}
                  onChange={handleChange}
                />
                <label className="form-check-label">I understand and accept that my phone number may be shared with potential adopters.</label>
              </div>
              {spinner && <Spinner animation="border" variant='primary' className="mt-3" />}
              {!showWelcomeMessage && (
                <div className='d-flex justify-content-between mt-3'>
                  <Link to='/signup/signup'>
                    <button className='btn btn-primary' type="button">Back</button>
                  </Link>
                  {!error && !spinner && (
                    <button className='btn btn-primary' type="submit" value="Submit">
                      Submit
                    </button>
                  )}
                </div>
              )}
              <Link to='/Login' className="mt-3 d-block" style={{ color: 'white', textDecoration: 'none' }}>Already have an account? <span className='btn btn-link'> Log-in</span></Link>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Seller;


