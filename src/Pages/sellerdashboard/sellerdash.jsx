import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import Spinner from 'react-bootstrap/Spinner';

const Sellerdash = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [userFirstname, setUserFirstname] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
    
        if (!currentUser) {
          throw new Error('No user found');
        }
    
        const userId = currentUser.uid;
        const db = getFirestore();
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, where('uid', '==', userId)); // Assuming UID is stored in Firestore
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          console.log('User data firstName:', userData.firstName); // Print firstName to console
          setUserFirstname(userData.firstName);
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  useEffect(() => {
    // Check if propsFirstName exists in location state and set userFirstname accordingly
    if (location.state && location.state.propsFirstName) {
      setUserFirstname(location.state.propsFirstName);
    }
  }, [location.state]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className='bg-dark container' style={{ height: '500px', color: 'white', marginTop: '100px' }}>
      <h5>Welcome to your Dashboard, {loading ? <Spinner animation="border" variant='primary' className="mt-3" /> : userFirstname}!</h5>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="col-lg-12">
              <Link to='/sellerdashboard/Addpet'><button className='btn btn-primary'>Add pet</button></Link>
              <br />
              <br />
            </div>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellerdash;
