import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import firebase from 'firebase/compat/app'; // Import Firebase core module
import 'firebase/compat/firestore'; // Import Firestore
import 'firebase/compat/storage'; // Import Storage
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable } from 'firebase/storage'; // Import storage functions
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './sellerdash.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8R-6JStMc680KVXXQ_XGSRche5OQUtl4",
  authDomain: "pet-adoption-project-99a08.firebaseapp.com",
  projectId: "pet-adoption-project-99a08",
  storageBucket: "pet-adoption-project-99a08.appspot.com",
  messagingSenderId: "226601747265",
  appId: "1:226601747265:web:24326e722ad314f751d7c0",
  measurementId: "G-WJRCH01VP2"
};

const Addpet = () => {
  const [petName, setPetName] = useState('');
  const [petDescription, setPetDescription] = useState('');
  const [petImage, setPetImage] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petHeight, setPetHeight] = useState('');
  const [price, setPrice] = useState('');
  const [sex, setSex] = useState('');
  const [specie, setSpecie] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  // const navigate = useNavigate(); // Initialize useNavigate

  const handleAddPet = async () => {
    if (!petName || !petAge || !petWeight || !petHeight || !petImage || !price || !ownerName || !ownerPhone || !sex || !specie) {
      alert('Please fill in all the fields before adding a pet.');
      return;
    }
    setSpinner(true);

    const newPet = {
      id: uuidv4(),
      name: petName,
      description: petDescription,
      age: petAge,
      weight: petWeight,
      height: petHeight,
      price: price,
      sex: sex,
      specie: specie,
      ownerName: ownerName,
      ownerPhone: ownerPhone,
    };

    try {
      // Initialize Firebase if not already initialized
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      const storageRef = ref(firebase.storage(), `petImages/${newPet.id}`);
      await uploadBytesResumable(storageRef, petImage);

      await firebase.firestore().collection('pets').add(newPet);

      // Reset form fields after successful submission
      setPetName('');
      setPetDescription('');
      setPetAge('');
      setPetWeight('');
      setPetHeight('');
      setPrice('');
      setSex('');
      setSpecie('');
      setOwnerName('');
      setOwnerPhone('');

      setSuccess(true);
      setTimeout(() => {
        // navigate('/success'); // Navigate to success page after a delay
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error('Error adding pet:', error);
    }

    setSpinner(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPetImage(file);
    } else {
      setPetImage('');
    }
  };
  const handleClose = () => {
    // Navigate back to the form page when the toast is closed
    navigate('/');
  };

  return (
    <div className="container mt-5 p-4 bg-dark">
      <div className="card">
        <div className="card-body">
          {success ? (
            <Toast onClick={handleClose}>
              <Toast.Header>
                {/* <strong className="me-auto">{firstname}</strong> */}
              </Toast.Header>
              <Toast.Body>We have successfully added your pet. It can now be seen by possible adopters</Toast.Body>
            </Toast>
          ) : (
            <form>
              <div className="form-group">
                <label>Pet Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Pet Description:</label>
                <textarea
                  className="form-control"
                  value={petDescription}
                  onChange={(e) => setPetDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="text"
                  className="form-control"
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Weight:</label>
                <input
                  type="text"
                  className="form-control"
                  value={petWeight}
                  onChange={(e) => setPetWeight(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Height:</label>
                <input
                  type="text"
                  className="form-control"
                  value={petHeight}
                  onChange={(e) => setPetHeight(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="text"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Sex:</label>
                <select
                  className="form-control"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>Specie:</label>
                <select
                  className="form-control"
                  value={specie}
                  onChange={(e) => setSpecie(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Owner Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Owner Phone:</label>
                <input
                  type="text"
                  className="form-control"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Pet Image:</label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={handleImageChange}
                />
              </div>
              {petImage && ( // Display image preview if petImage is not null
                <div className="form-group">
                  <label>Preview:</label>
                  <img src={URL.createObjectURL(petImage)} alt="Pet Preview" style={{ width: '20%', height: '200px' }} />
                </div>
              )}
              <button type="button" className="btn btn-primary" onClick={handleAddPet}>
                Add Pet
              </button>
            </form>
          )}
          {spinner && <Spinner animation="grow" />}
        </div>
      </div>
    </div>
  );
};

export default Addpet;
