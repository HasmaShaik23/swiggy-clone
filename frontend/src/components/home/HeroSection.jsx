import React from 'react';
import { FaSearch } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="hero">
      <div className="container">
        <h2>Order food & groceries. Discover best restaurants.</h2>
        <p>Swiggy it!</p>
        <div className="hero-search">
          <FaSearch className="hero-search-icon" />
          <input type="text" className="hero-search-input" placeholder="Enter your delivery location" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;