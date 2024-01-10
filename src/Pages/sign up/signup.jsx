import React, { useState } from 'react';
import './signup.css';

export default function Signup() {
  const [firstname, setFirstName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [address, setAddress] =useState('')
    const[password, setPassword]= useState('')


  const handleSubmit = (e) => {
    e.preventDefault();


    setTimeout(() => {
        setError('');
      }, 1000);

    // Check if required fields are filled
    setError('');
    setFirstName('');
    setNumber('');
    setEmail('');
    setAddress('');
    setPassword('')

    if (!firstname || !number || !email || !address ||!password) {
      alert('Please fill in all required fields.');
    } else {
      // Clear error message if all fields are filled
      setError('Thank You for joining us');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Use the input's name attribute to determine which state to update
    if (name === 'name') {
      setFirstName(value);
    } else if (name === 'number') {
      setNumber(value);
    } else if (name === 'email') {
      setEmail(value);
    }else if(name === 'address'){
            setAddress(value);
      }else if(name === 'password'){
            setPassword(value)
      }
    }
    return (
        <>
          <h1 className='main-sign'>Sign up</h1>
          <div className="center-container mx-auto">
            <div className='form-container'>
              {error && <p className="error-message">{error}</p>}
              <form className='form-hold' onSubmit={handleSubmit}>
                <label style={{color:'white'}}>
                  Enter your name:
                  <input
                    type="text"
                    name="name"
                    value={firstname}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label style={{color:'white'}}>
                  Phone number:
                  <input
                    type="number"
                    name="number"
                    value={number}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label style={{color:'white'}}>
                  Please enter your email:
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label style={{color:'white'}}>
                    Adress:
                  <input
                    type="text"
                    name="address"
                    value ={address}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label style={{color:'white'}}>
                    password:
                  <input
                    type="password"
                    name="password"
                    // required
                    value ={password}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <button  className='btn btn-primary mt-3' type="submit" value="Submit">Submit</button>
                <p className='error-message'>{setError}</p>
              </form>
            </div>
          </div>
        </>
      );
  };

  
  
