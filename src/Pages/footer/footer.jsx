import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
import logo from '../assests/paw-removebg-preview.png'
import image1 from '../assests/facebook.svg'
import image2 from '../assests/twitter-x.svg'
import image3 from '../assests/instagram.svg'
import image4 from '../assests/whatsapp.svg'
export default function Footer() {
  return (
    <div className='container-fluid' style={{backgroundColor: 'black'}}>
        <div className="row">
            <div className="col w-100">
                <h2 className='my-4'><img style={{width:'50px', height:'50px'}} src={logo} alt="" />Pet Finder</h2>
                <hr />
                <div className='d-flex col-lg-12 col-12 justify-content-around gap-5  w-100'>
                    <ul className=''>
                    <h3>Useful links</h3>
                    <li>Contact us</li>
                    <li>Donate</li>
                    <li>Rehoming</li>
                    <li>Privacy</li>
                    </ul>
                    <div className='w-50 king'>
                    <h5>Sign up for our newsletter</h5>
                    <p className='p'>We'll send you monthly emails, packed with info about our work and pupdates about some of our favourite furry friends.</p>
                    <Link to='/signup/signup'><button className='sign'>Sign up</button></Link>
                    </div>
                </div>
                <hr />
                <p style={{textAlign:'center', borderBottom:'1px solid white'}}>Contact: nzedivine@gmail.com</p>
                 <div className="d-flex gap-5 col-lg-12 justify-content-around">
                 <div className="icons">
                        <img className='logo' src={image1} alt="" />
                        <img className='logo' src={image2} alt="" />
                        <img className='logo' src={image3} alt="" />
                        <img className='logo' src={image4} alt="" />
                    </div>
                    <div className='w-50'>
                            <h6>Copyrigth: Nze Divine Onyeadikachi</h6>
                            <p>Registered Charity Numbers: 227523 & SC037843 Donations are tax exempt and Gift Aid can be claimed</p>
                    </div>
                 </div>
            </div>
        </div>
    </div>
  )
}
