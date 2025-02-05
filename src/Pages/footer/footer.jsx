import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import logo from '../assests/paw-removebg-preview.png';
import image1 from '../assests/facebook.svg';
import image2 from '../assests/twitter-x.svg';
import image3 from '../assests/instagram.svg';
import image4 from '../assests/whatsapp.svg';

export default function Footer() {
  return (
    <footer className="footer bg-dark text-light py-5">
      <div className="container">
        <div className="d-flex align-items-center mb-4">
          <img src={logo} alt="Pet Finder Logo" style={{ width: '50px', height: '50px' }} />
          <h2 className="ms-3 mb-0 text-warning">Pet Finder</h2>
        </div>
        <hr className="border-secondary" />

        <div className="row justify-content-between">
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="text-warning">Useful Links</h4>
            <ul className="list-unstyled mt-3">
              <li>
                <Link to="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/donate" className="footer-link">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/rehoming" className="footer-link">
                  Rehoming
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-5">
            <h4 className="text-warning">Sign Up for Our Newsletter</h4>
            <p className="small">
              We'll send you monthly emails packed with info about our work and updates on our favorite furry friends.
            </p>
            <Link to="/signup/signup">
              <button className="btn btn-warning fw-bold px-4 py-2 mt-2 rounded-pill shadow-sm">Sign Up</button>
            </Link>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <p className="mb-2">
            Contact:{' '}
            <a href="mailto:nzedivine55@gmail.com" className="footer-link">
              nzedivine@gmail.com
            </a>
          </p>

          <div className="d-flex gap-3 mb-2">
            <img src={image1} alt="Facebook" className="social-icon" />
            <img src={image2} alt="Twitter" className="social-icon" />
            <img src={image3} alt="Instagram" className="social-icon" />
            <img src={image4} alt="WhatsApp" className="social-icon" />
          </div>
        </div>

        <div className="text-center mt-3">
          <small>&copy; 2025 Nze Divine Onyeadikachi</small>
          <p className="small mt-1">
            Registered Charity Numbers: 227523 & SC037843. Donations are tax-exempt, and Gift Aid can be claimed.
          </p>
        </div>
      </div>
    </footer>
  );
}
