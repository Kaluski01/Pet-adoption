import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Update import statement
import 'firebase/compat/firestore';// Import Firestore
import Home from './Pages/Header folder/home';
import BasicExample from './Pages/Header folder/navbar';
import Dog from './Pages/dog folder/dog';
import SingleDog from './Pages/singleDog/singleDog';
import SingleCat from './Pages/singlecat/singlecat';
import Cat from './Pages/cat folder/cat';
import Own from './Pages/ownership/own';
import About from './Pages/Header folder/about';
import Sellerdash from './Pages/sellerdashboard/sellerdash'
import SignupPage from './Pages/sign up/signup';
import Seller from './Pages/sign up/seller';
import Adopter from './Pages/sign up/adopter';
import Storedpets from './Pages/Header folder/Storedpets';
import Login from './Pages/sign up/Login';
import Addpet from './Pages/sellerdashboard/Addpet';
import Adopterlogin from './Pages/sign up/adopterLogin';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8R-6JStMc680KVXXQ_XGSRche5OQUtl4",
  authDomain: "pet-adoption-project-99a08.firebaseapp.com",
  projectId: "pet-adoption-project-99a08",
  storageBucket: "pet-adoption-project-99a08.appspot.com",
  messagingSenderId: "226601747265",
  appId: "1:226601747265:web:24326e722ad314f751d7c0",
  measurementId: "G-WJRCH01VP2"
};

firebase.initializeApp(firebaseConfig);

function App() {
  const [pets, setPets] = useState([]);

  // Function to add a new pet
  const addNewPet = (newPet) => {
    // Update the local state
    setPets((prevPets) => [newPet, ...prevPets]);
    try {
      const updatedPets = JSON.stringify([newPet, ...pets]);
      localStorage.setItem('pets', updatedPets);
    } catch (error) {
      console.error('Error updating pets in local storage:', error);
    }
  };

  return (
    <>
      <BrowserRouter>
        <BasicExample />
        <Routes  scrollRestoration="manual">
          <Route path="/" element={<Home pets={pets} addNewPet={addNewPet} />} />
          <Route path="/about" element={<About />} />
          <Route path="/dogs" element={<Dog />} />
          <Route path="/cat" element={<Cat />} />
          <Route path="/Own" element={<Own />} />
          <Route path="/dogs/:name/:id" element={<SingleDog />} />
          <Route path="/Storedpets/:name" element={<Storedpets pets={pets} />} />
          <Route path="/:name" element={<SingleDog />} />
          <Route path="/:name/:id" element={<SingleCat />} />
          <Route path="/signup/signup" element={<SignupPage />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/adopter" element={<Adopter />} />
          <Route path="Dog" element={<Dog />} />
          <Route path="Cat" element={<Cat />} /> 
          <Route path='/sellerdashboard/sellerdash' element={<Sellerdash addNewPet={addNewPet} />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Adopterlogin' element={<Adopterlogin/>}/>
          <Route path='/sellerdashboard/Addpet' element={<Addpet />} />
          <Route path='/sellerdashboard/sellerdash/:firstname'element={<Addpet/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
