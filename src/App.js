import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Pages/Header folder/home';
import {BasicExample} from "./Pages/Header folder/navbar";
import Dog from "./Pages/dog folder/dog";
import SingleDog from "./Pages/singleDog/singleDog";
import SingleCat from "./Pages/singlecat/singlecat";
import Cat from "./Pages/cat folder/cat";
import Signup from "./Pages/sign up/signup";
import Own from "./Pages/ownership/own";
import Search from "./Pages/searchbar/search";
function App() {
  return (
    <>
     {/* <BasicExample/> */}
     <BrowserRouter>
        <BasicExample />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dogs" element={<Dog />} />
           <Route path="/cat" element={<Cat/>}/>
           <Route path="/Own" element={<Own/>}/>
           <Route path="/dogs/:name/:id" element={<SingleDog />} />
          <Route path="/:id" element={<SingleCat />} />
           <Route path='signup/signup' element={<Signup/>}/> 
           <Route path='Dog' element={<Dog/>} />
           <Route path="Cat" element={<Cat/>}/>
           <Route path="Search" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </>
  
  );
}

export default App;
