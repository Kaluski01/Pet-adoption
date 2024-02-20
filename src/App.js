import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Header folder/home';
import BasicExample  from './Pages/Header folder/navbar';
import Dog from './Pages/dog folder/dog';
import SingleDog from './Pages/singleDog/singleDog';
import SingleCat from './Pages/singlecat/singlecat';
import Cat from './Pages/cat folder/cat';
import Own from './Pages/ownership/own';
import Search from './Pages/searchbar/search';
import About from './Pages/Header folder/about';
import Sellerdash from './Pages/sellerdashboard/sellerdash'
import SignupPage from './Pages/sign up/signup';
import Seller from './Pages/sign up/seller';
import Adopter from './Pages/sign up/adopter';
import Storedpets from './Pages/Header folder/Storedpets';
import Login from './Pages/sign up/Login';
import Addpet from './Pages/sellerdashboard/Addpet';

// Create a guest to communicate with the host (not used in this code)
// const storageGuest = createGuest('http://pet-adoption-seven.vercel.app');

function App() {
  const [pets, setPets] = useState([]);

  // Fetch pet information from local storage on app load
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'pets') {
        try {
          const storedPets = event.newValue;
          if (storedPets) {
            setPets(JSON.parse(storedPets));
          }
        } catch (error) {
          console.error('Error loading pets from local storage:', error);
        }
      }
    };
  
    // Listen for changes in the local storage
    window.addEventListener('storage', handleStorageChange);
  
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array to ensure this effect runs only once
  

  // Function to add a new pet
  const addNewPet = (newPet) => {
    // Update the local state
    setPets((prevPets) => [newPet, ...prevPets]);

    // Update the local storage
    try {
      const updatedPets = JSON.stringify([newPet, ...pets]);
      localStorage.setItem('pets', updatedPets);
    } catch (error) {
      console.error('Error updating pets in local storage:', error);
    }

    // Update the remote storage via guest (not used in this code)
    // storageGuest.setItem('pets', [newPet, ...pets]);
  };

  return (
    <>
      <BrowserRouter>
        <BasicExample />
        <Routes>
          <Route path="/" element={<Home pets={pets} addNewPet={addNewPet} />} />
          <Route path="/about" element={<About />} />
          <Route path="/dogs" element={<Dog />} />
          <Route path="/cat" element={<Cat />} />
          <Route path="/Own" element={<Own />} />
          <Route path="/dogs/:name/:id" element={<SingleDog />} />
          <Route path="/Storedpets/:name" element={<Storedpets pets={pets} />} />
          <Route path="/:name" element={<SingleDog />} />
          <Route path="/:id" element={<SingleCat />} />
          <Route path="signup/signup" element={<SignupPage />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/adopter" element={<Adopter />} />
          <Route path="Dog" element={<Dog />} />
          <Route path="Cat" element={<Cat />} />
          <Route path="Search" element={<Search />} />
          <Route path='/sellerdashboard/sellerdash' element={<Sellerdash addNewPet={addNewPet} />} />
          <Route path='/Login' element={<Login/>}/>
          <Route path='/sellerdashboard/Addpet' element={<Addpet/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

