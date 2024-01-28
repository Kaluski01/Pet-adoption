import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Pages/Header folder/home';
import {BasicExample} from "./Pages/Header folder/navbar";
import Dog from "./Pages/dog folder/dog";
import SingleDog from "./Pages/singleDog/singleDog";
import SingleCat from "./Pages/singlecat/singlecat";
import Cat from "./Pages/cat folder/cat";
import Own from "./Pages/ownership/own";
import Search from "./Pages/searchbar/search";
import About from "./Pages/Header folder/about";
import Sellerdash from "./Pages/seller dashboard/sellerdash";
import SignupPage from "./Pages/sign up/signup";
import Seller from "./Pages/sign up/seller";
import Adopter from "./Pages/sign up/adopter";
import Storedpets from "./Pages/Header folder/Storedpets";
function App() {
  return (
    <>
     {/* <BasicExample/> */}
     <BrowserRouter>
        <BasicExample />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/dogs" element={<Dog />} />
           <Route path="/cat" element={<Cat/>}/>
           <Route path="/Own" element={<Own/>}/>
           <Route path="/dogs/:name/:id" element={<SingleDog />} />
           <Route path="/Storedpets/:name" element={<Storedpets/>}/>
           <Route path="/:name" element={<SingleDog />} />
          <Route path="/cats/:id" element={<SingleCat />} />
           <Route path='signup/signup' element={<SignupPage/>}/> 
           <Route path="/seller" element={<Seller/>}/>
           <Route path="/adopter" element={<Adopter/>}/>
           <Route path='Dog' element={<Dog/>} />
           <Route path="Cat" element={<Cat/>}/>
           <Route path="Search" element={<Search/>}/>
           <Route path="/sellerdash" element={<Sellerdash/>} />
        </Routes>
      </BrowserRouter>
    </>
  
  );
}

export default App;
