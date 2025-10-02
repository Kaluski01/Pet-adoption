import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable } from 'firebase/storage';
import './sellerdash.css';

const Addpet = ({ updateNumberOfPets }) => {
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
  const location = useLocation();
  const userFirstname = location.state?.propsFirstName || '';
  const navigate = useNavigate();

  const firebaseConfig = {
    apiKey: 'AIzaSyA8R-6JStMc680KVXXQ_XGSRche5OQUtl4',
    authDomain: 'pet-adoption-project-99a08.firebaseapp.com',
    projectId: 'pet-adoption-project-99a08',
    storageBucket: 'pet-adoption-project-99a08.appspot.com',
    messagingSenderId: '226601747265',
    appId: '1:226601747265:web:24326e722ad314f751d7c0',
    measurementId: 'G-WJRCH01VP2',
  };

  const handleAddPet = async () => {
    if (
      !petName ||
      !petAge ||
      !petWeight ||
      !petHeight ||
      !petImage ||
      !price ||
      !ownerName ||
      !ownerPhone ||
      !sex ||
      !specie
    ) {
      alert('⚠️ Please fill in all the fields before adding a pet.');
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
      price,
      sex,
      specie,
      ownerName,
      ownerPhone,
    };

    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      const storageRef = ref(firebase.storage(), `petImages/${newPet.id}`);
      await uploadBytesResumable(storageRef, petImage);

      await firebase.firestore().collection('pets').add(newPet);

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
      setPetImage('');
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate('/sellerdashboard/sellerdash', { state: { propsFirstName: userFirstname } });
      }, 2000);
    } catch (error) {
      console.error('Error adding pet:', error);
      alert('❌ An error occurred while adding the pet. Please try again.');
    } finally {
      setSpinner(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPetImage(file);
    else setPetImage('');
  };

  return (
    <div
      className="container mt-5 p-4"
      style={{
        background: 'linear-gradient(135deg, #FFF8E7, #FFDAB9)',
        borderRadius: '15px',
        boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
      }}
    >
      <div className="card border-0 shadow-lg" style={{ borderRadius: '15px' }}>
        <div className="card-body p-5">
          {success ? (
            <Toast
              onClick={() => navigate('/sellerdashboard/sellerdash', { state: { propsFirstName: userFirstname } })}
            >
              <Toast.Header className="bg-success text-white fw-bold">Success</Toast.Header>
              <Toast.Body>🎉 Your pet has been added! Possible adopters can now view it.</Toast.Body>
            </Toast>
          ) : (
            <form>
              <h3 className="text-center mb-4 fw-bold" style={{ color: '#A0522D' }}>
                🐾 Add Your Pet
              </h3>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Pet Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="e.g. Bella"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Age:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={petAge}
                    onChange={(e) => setPetAge(e.target.value)}
                    placeholder="e.g. 2 years"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Weight:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={petWeight}
                    onChange={(e) => setPetWeight(e.target.value)}
                    placeholder="e.g. 10kg"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Height:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={petHeight}
                    onChange={(e) => setPetHeight(e.target.value)}
                    placeholder="e.g. 30cm"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Price:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. $100 or Free"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Sex:</label>
                  <select className="form-control" value={sex} onChange={(e) => setSex(e.target.value)}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Specie:</label>
                  <select className="form-control" value={specie} onChange={(e) => setSpecie(e.target.value)}>
                    <option value="">Select</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Owner Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Owner Phone:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="e.g. +234 812 345 6789"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Pet Description:</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={petDescription}
                    onChange={(e) => setPetDescription(e.target.value)}
                    placeholder="Tell adopters about your pet's personality, habits, and needs..."
                  ></textarea>
                </div>

                <div className="col-12 mt-3">
                  <label className="form-label">Pet Image:</label>
                  <input type="file" className="form-control" onChange={handleImageChange} />
                </div>

                {petImage && (
                  <div className="col-12 mt-3 text-center">
                    <label className="form-label d-block">Preview:</label>
                    <img
                      src={URL.createObjectURL(petImage)}
                      alt="Pet Preview"
                      style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        border: '3px solid #FFD700',
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="text-center mt-4">
                <button
                  type="button"
                  className="btn fw-bold px-4 py-2"
                  style={{
                    backgroundColor: '#FF7F50',
                    color: 'white',
                    borderRadius: '30px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  }}
                  onClick={handleAddPet}
                >
                  {spinner ? <Spinner animation="border" size="sm" /> : 'Add Pet'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addpet;
