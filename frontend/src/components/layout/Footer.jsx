import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Swiggy Corporate</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Swiggy One</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact us</h4>
            <ul>
              <li><a href="#">Help & Support</a></li>
              <li><a href="#">Partner With Us</a></li>
              <li><a href="#">Ride With Us</a></li>
              <li><a href="#">Legal</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Available in:</h4>
            <ul>
              <li><a href="#">Bangalore</a></li>
              <li><a href="#">Gurgaon</a></li>
              <li><a href="#">Hyderabad</a></li>
              <li><a href="#">Delhi</a></li>
              <li><a href="#">Mumbai</a></li>
              <li><a href="#">Pune</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Life at Swiggy</h4>
            <ul>
              <li><a href="#">Explore With Swiggy</a></li>
              <li><a href="#">Swiggy News</a></li>
              <li><a href="#">Snacksales</a></li>
            </ul>
            <div className="social-icons">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Swiggy Limited</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;