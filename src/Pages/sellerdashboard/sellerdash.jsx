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
  const [userEmail, setUserEmail] = useState();
  const [userPets, setUserPets] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) throw new Error('No user found');

        const userId = currentUser.uid;
        const db = getFirestore();
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, where('uid', '==', userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setUserFirstname(userData.firstName);
          setUserEmail(userData.email);
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
    if (location.state && location.state.propsFirstName) {
      setUserFirstname(location.state.propsFirstName);
      setUserEmail(location.state.propsEmail);
      setLoading(false);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        if (userEmail && userEmail.trim() !== '') {
          const db = getFirestore();
          const petsCollectionRef = collection(db, 'pets');
          const q = query(petsCollectionRef, where('ownerEmail', '==', userEmail));
          const querySnapshot = await getDocs(q);
          const petsData = [];

          querySnapshot.forEach((doc) => {
            petsData.push({ id: doc.id, ...doc.data() });
          });

          setUserPets(petsData);
        }
      } catch (error) {
        console.error('Error fetching user pets:', error);
      }
    };

    fetchUserPets();
  }, [userEmail]);

  const handleLogout = () => {
    navigate('/signup/signup');
  };

  return (
    <div
      className="container mt-5 p-4"
      style={{
        backgroundColor: '#FFF8E7', // warm cream background
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 className="text-center mb-4" style={{ color: '#A0522D' }}>
        Welcome to your Dashboard,{' '}
        {loading ? (
          <Spinner animation="border" variant="warning" size="sm" />
        ) : (
          <span style={{ color: '#FF7F50' }}>{userFirstname}</span> // coral highlight
        )}
        !
      </h2>

      <div className="text-center mb-4">
        <h5>
          Ready to add your pets?{' '}
          <Link
            to={{
              pathname: '/sellerdashboard/Addpet',
              state: { propsFirstName: userFirstname },
            }}
          >
            <button
              className="btn"
              style={{
                backgroundColor: '#FFD700', // golden button
                color: '#333',
                fontWeight: 'bold',
                borderRadius: '25px',
                padding: '0.5rem 1.5rem',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
              }}
            >
              Add Pet
            </button>
          </Link>
        </h5>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead style={{ backgroundColor: '#FFDEAD', color: '#5C4033' }}>
            <tr>
              <th scope="col">Pet Name</th>
              <th scope="col">Age</th>
              <th scope="col">Breed</th>
            </tr>
          </thead>
          <tbody>
            {userPets.length > 0 ? (
              userPets.map((pet) => (
                <tr key={pet.id}>
                  <td>{pet.name}</td>
                  <td>{pet.age}</td>
                  <td>{pet.specie}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No pets added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn"
          onClick={handleLogout}
          style={{
            backgroundColor: '#FF6347', // tomato red
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '25px',
            padding: '0.5rem 1.5rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sellerdash;
