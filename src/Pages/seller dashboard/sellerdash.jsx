import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Spinner from 'react-bootstrap/Spinner';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './sellerdash.css';

const SellerDash = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [petName, setPetName] = useState('');
  const [petDescription, setPetDescription] = useState('');
  const [petImage, setPetImage] = useState('');
  const [petAge, setAge] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [PetHeight, setPetHeight] = useState('');
  const [price, setPrice] = useState('');
  const [, setPets] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ownername, setOwnerName] = useState('')
  const [ownerphone, setOwnerPhone] =useState('')
  const handleAddPet = async () => {
    if (!petName || !petAge || !petWeight || !PetHeight || !petImage || !price|| !ownername||! ownerphone) {
      alert('Please fill in all the fields before adding a pet.');
      return;
    }
    setSpinner(true);

    // Create a new pet object
    const newPet = {
      name: petName,
      description: petDescription,
      image: await convertToDataURL(petImage), // Convert image to Data URL
      Age: petAge,
      weight: petWeight,
      height: PetHeight,
      price: price,
      ownername: ownername,
      ownerphone: ownerphone
    };

    // Get the existing pets from local storage
    const storedPets = localStorage.getItem('pets');
    const existingPets = storedPets ? JSON.parse(storedPets) : [];

    // Update the pets array with the new pet
    const updatedPets = [...existingPets, newPet];
    setPets(updatedPets);

    // Clear the form fields
    setPetName('');
    setPetDescription('');
    setPetImage('');
    setAge('');
    setPetWeight('');
    setPetHeight('');
    setPrice('');
    setOwnerName('')
    setOwnerPhone('')
    // Store the updated pets array in localStorage
    localStorage.setItem('pets', JSON.stringify(updatedPets));

    // Redirect to the pet details route with the pet name as a parameter
    navigate(`/pet-details/${petName}`); // Replace '/pet-details/' with the actual route

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
      img.crossOrigin = 'Anonymous'; // Allow cross-origin access to image data
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
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [success]);

  return (
    <>
      {spinner && <Spinner animation="grow" />}
      <div className="mt-5">
        <div style={{height: '500px' }}>
          <h1 style={{ color: 'gray', marginTop:"30px", fontSize:'25px'}}>Please post a pet and write some info</h1>
          {/* Form for adding pet information */}
          <form style={{marginLeft:'20px', paddingBottom:'20px'}}>
            <label>
              Pet Name:
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Age:
              <input
                type="text"
                name="Age"
                value={petAge}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <br />
            <label>
              Weight:
              <input
                type="text"
                name="weight"
                value={petWeight}
                onChange={(e) => setPetWeight(e.target.value)}
              />
            </label>
            <br />
            <label>
              Height:
              <input
                type="text"
                name="height"
                value={PetHeight}
                onChange={(e) => setPetHeight(e.target.value)}
              />
            </label>
            <br />
            <label>
              Pet Description:
              <textarea
                value={petDescription}
                onChange={(e) => setPetDescription(e.target.value)}
              />
            </label>
            <br />
            <label>
              Price rate:
              <input
                type="text"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <br />
            <label>
              Pet Image URL:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            {petImage && (
              <div>
                <p>Image Preview:</p>
                <img src={petImage} alt="Pet Preview" style={{ width: '20%', height: '200px' }} />
              </div>
            )}
            <br />
            <label>
              Owner name:
              <input
                type="text"
                name="owner"
                value={ownername}
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Owner Phone:
              <input
                type="number"
                name="ownerphone"
                value={ownerphone}
                onChange={(e) => setOwnerPhone(e.target.value)}
              />
            </label>
            <br />
            <button type="button" onClick={handleAddPet}>
              Add pet
            </button>
            {success && <p style={{ color: 'green' }}>Info added</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SellerDash;
