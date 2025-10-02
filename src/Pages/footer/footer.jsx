import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import logo from '../assests/paw-removebg-preview.png';
import facebook from '../assests/facebook.svg';
import twitter from '../assests/twitter-x.svg';
import instagram from '../assests/instagram.svg';
import whatsapp from '../assests/whatsapp.svg';

export default function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container text-center">
        {/* Logo + Title */}
        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={logo} alt="Pet Finder Logo" style={{ width: '40px', height: '40px' }} />
          <h3 className="ms-2 mb-0 text-warning">Pet Finder</h3>
        </div>

        {/* Quick Links */}
        <ul className="list-inline mb-3">
          <li className="list-inline-item mx-2">
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
          </li>
          <li className="list-inline-item mx-2">
            <Link to="/donate" className="footer-link">
              Donate
            </Link>
          </li>
          <li className="list-inline-item mx-2">
            <Link to="/rehoming" className="footer-link">
              Rehoming
            </Link>
          </li>
          <li className="list-inline-item mx-2">
            <Link to="/privacy" className="footer-link">
              Privacy
            </Link>
          </li>
        </ul>

        {/* Socials */}
        <div className="d-flex justify-content-center gap-3 mb-3">
          <img src={facebook} alt="Facebook" className="social-icon" />
          <img src={twitter} alt="Twitter" className="social-icon" />
          <img src={instagram} alt="Instagram" className="social-icon" />
          <img src={whatsapp} alt="WhatsApp" className="social-icon" />
        </div>

        {/* Contact + Copyright */}
        <p className="small mb-1">
          Contact:{' '}
          <a href="mailto:nzedivine55@gmail.com" className="footer-link">
            nzedivine55@gmail.com
          </a>
        </p>
        <small className="text-muted">&copy; 2025 Nze Divine Onyeadikachi</small>
      </div>
    </footer>
  );
}
