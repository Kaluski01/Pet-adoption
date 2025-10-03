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
    <footer className="footer py-5">
      <div className="container text-center">
        {/* Logo + Title */}
        <div className="d-flex justify-content-center align-items-center mb-4">
          <img src={logo} alt="Pet Finder Logo" className="footer-logo" />
          <h3 className="ms-3 mb-0 footer-title">Pet Finder</h3>
        </div>

        {/* Quick Links */}
        <ul className="list-inline mb-4 footer-links">
          <li className="list-inline-item mx-3">
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/donate" className="footer-link">
              Donate
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/rehoming" className="footer-link">
              Rehoming
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link to="/privacy" className="footer-link">
              Privacy
            </Link>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="d-flex justify-content-center gap-4 mb-4 social-icons">
          {[facebook, twitter, instagram, whatsapp].map((icon, i) => (
            <a href="#" key={i}>
              <img src={icon} alt="social-icon" className="social-icon" />
            </a>
          ))}
        </div>

        {/* Contact + Copyright */}
        <p className="small mb-1">
          Contact:{' '}
          <a href="mailto:nzedivine55@gmail.com" className="footer-link">
            nzedivine55@gmail.com
          </a>
        </p>
        <p className="small">&copy; 2025 Nze Divine Onyeadikachi</p>
      </div>
    </footer>
  );
}
