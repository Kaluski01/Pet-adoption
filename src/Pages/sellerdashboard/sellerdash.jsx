import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import PetCard from './Petinput';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Import necessary Firestore functions

export default function Sellerdash() {
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate(); // Declare navigate before it's used
  const [firstname, setFirstname] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const db = getFirestore(); // Get Firestore instance
      const usersCollectionRef = collection(db, 'users'); // Reference to 'users' collection
      const q = query(usersCollectionRef, where('email', '==', email)); // Query to fetch user with matching email
      const querySnapshot = await getDocs(q); // Get query snapshot
      querySnapshot.forEach((doc) => {
        // Iterate over query results
        const userData = doc.data(); // Get user data
        setFirstname(userData.firstname); // Set firstname state
      });
    };

    fetchUserData(); // Call fetchUserData function
  }, [email]); // Call useEffect whenever email changes

  const handleLogout = () => {
    // Clear user data from local storage
    navigate('/'); // Redirect to the home screen
  };
  
  return (
    <div className='bg-dark' style={{ height: '500px', color: 'white', marginTop: '60px' }}>
      <h5>Welcome to your Dashboard, {firstname || 'Loading'}!</h5> {/* Display 'Loading' until firstname is fetched */}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <PetCard />
            <br />
            <br />
            <Link to='/sellerdashboard/Addpet'><button className='btn btn-primary'>Add pet</button></Link>
            <br />
            <br />
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
