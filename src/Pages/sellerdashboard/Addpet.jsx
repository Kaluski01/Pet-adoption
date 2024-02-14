import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import './sellerdash.css';

const Addpet = () => {
  const location = useLocation();
  const { firstname } = location.state || {};

  const [petName, setPetName] = useState('');
  const [petDescription, setPetDescription] = useState('');
  const [petImage, setPetImage] = useState('');
  const [petAge, setAge] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [PetHeight, setPetHeight] = useState('');
  const [price, setPrice] = useState('');
  const [sex, setSex] = useState('');
  const [specie, setSpecie] = useState('');
  const [ownername, setOwnerName] = useState('');
  const [ownerphone, setOwnerPhone] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [storedPets, setStoredPets] = useState(() => {
    const petsFromStorage = JSON.parse(localStorage.getItem('pets')) || [];
    return petsFromStorage;
  });

  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(storedPets));
  }, [storedPets]);

  const handleAddPet = async () => {
    if (!petName || !petAge || !petWeight || !PetHeight || !petImage || !price || !ownername || !ownerphone || !sex || !specie) {
      alert('Please fill in all the fields before adding a pet.');
      return;
    }
    setSpinner(true);

    const isPetExists = storedPets.some(pet => pet.name === petName);
    if (isPetExists) {
      alert('A pet with this name already exists.');
      setSpinner(false);
      return;
    }

    const newPet = {
      name: petName,
      description: petDescription,
      image: await convertToDataURL(petImage),
      Age: petAge,
      weight: petWeight,
      height: PetHeight,
      price: price,
      ownername: ownername,
      ownerphone: ownerphone,
      sex: sex,
      specie: specie
    };

    const updatedPets = [...storedPets, newPet];
    setStoredPets(updatedPets);

    setPetName('');
    setPetDescription('');
    setAge('');
    setOwnerName('');
    setOwnerPhone('');
    setSex('');
    setSpecie('');
    setPetHeight('');
    setPetWeight('');
    setPrice('');
    setPetImage('');

    setSuccess(true);
    setSpinner(false);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPetImage(imageUrl);
    } else {
      setPetImage('');
    }
  };

  const convertToDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        resolve(canvas.toDataURL());
      };
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  };

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => {
        setSuccess(false);
      }, 8000);
    }
    return () => clearTimeout(timeout);
  }, [success]);

  return (
    <div className="container mt-5 p-4 bg-dark">
      <div className="card">
        <div className="card-body">
          {success ? (
            <Toast>
              <Toast.Header>
                <strong className="me-auto">{firstname}</strong>
              </Toast.Header>
              <Toast.Body>We have successfully added your pet. It can now be seen by possible adopters</Toast.Body>
            </Toast>
          ) : (
            <form>
              <h1 className="card-title" style={{ color: 'gray', fontSize: '20px' }}>Please post a pet and write some info</h1>
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
                <label>Age:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Age"
                  value={petAge}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Sex:</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="male"
                      checked={sex === "male"}
                      onChange={(e) => setSex(e.target.value)}
                    /> Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="female"
                      checked={sex === "female"}
                      onChange={(e) => setSex(e.target.value)}
                    /> Female
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Species:</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="specie"
                      value="dog"
                      checked={specie === "dog"}
                      onChange={(e) => setSpecie(e.target.value)}
                    /> Dog
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="specie"
                      value="cat"
                      checked={specie === "cat"}
                      onChange={(e) => setSpecie(e.target.value)}
                    /> Cat
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="specie"
                      value="other"
                      checked={specie === "other"}
                      onChange={(e) => setSpecie(e.target.value)}
                    /> Other
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Weight:</label>
                <input
                  type="text"
                  className="form-control"
                  name="weight"
                  value={petWeight}
                  onChange={(e) => setPetWeight(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Height:</label>
                <input
                  type="text"
                  className="form-control"
                  name="height"
                  value={PetHeight}
                  onChange={(e) => setPetHeight(e.target.value)}
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
                <label>Price rate:</label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Pet Image URL:</label>
                <input
                  type="file"
                  className="form-control-file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {petImage && (
                  <div className='mt-2'>
                    <p>Image Preview:</p>
                    <img src={petImage} alt="Pet Preview" style={{ width: '20%', height: '200px' }} />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Owner name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="owner"
                  value={ownername}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Owner Phone:</label>
                <input
                  type="number"
                  className="form-control"
                  name="ownerphone"
                  value={ownerphone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleAddPet}>
                Add pet
              </button>
              {success && <p style={{ color: 'green' }}>Info added</p>}
            </form>
          )}
          {spinner && <Spinner animation="grow" />}
        </div>
      </div>
    </div>
  );
};

export default Addpet;
