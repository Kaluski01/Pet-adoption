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
  const [userPets, setUserPets] = useState([]);

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
        const q = query(usersCollectionRef, where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setUserFirstname(userData.firstName);
          console.log("User data fetched:", userData.firstName); // Add this console log
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading to false after user data is fetched or an error occurs
      }
    };
  
    fetchUserData();
  }, []);
  
  
  useEffect(() => {
    if (location.state && location.state.propsFirstName) {
      setUserFirstname(location.state.propsFirstName);
    }
  }, [location.state]);
  

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        // Check if userFirstname is not an empty string
        if (userFirstname.trim() !== '') {
          const auth = getAuth();
          const currentUser = auth.currentUser;
      
          if (!currentUser) {
            throw new Error('No user found');
          }
      
          const db = getFirestore();
          const petsCollectionRef = collection(db, 'pets');
          const q = query(petsCollectionRef, where('ownerName', '==', userFirstname));
          const querySnapshot = await getDocs(q);
          const petsData = [];
    
          querySnapshot.forEach((doc) => {
            const petData = doc.data();
            petsData.push({
              id: doc.id,
              ...petData
            });
          });
    
          setUserPets(petsData);
        }
      } catch (error) {
        console.error('Error fetching user pets:', error);
      }
    };
    
    fetchUserPets();
  }, [userFirstname]); // Add userFirstname as a dependency
  

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
            <Link to={{
                pathname: "/sellerdashboard/Addpet",
                state: { propsFirstName: userFirstname }
              }}>
                <button className='btn btn-primary'>Add pet</button>
              </Link>
              <br />
              <br />
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Pet Name</th>
                  <th>Age</th>
                  <th>Breed</th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody>
                {userPets.map((pet) => (
                  <tr key={pet.id}>
                    <td>{pet.name}</td>
                    <td>{pet.age}</td>
                    <td>{pet.specie}</td> {/* Assuming specie represents the breed */}
                    {/* Add more columns as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellerdash;
