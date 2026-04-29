import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaChevronDown, FaSearch, FaUser, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import { GiFoodTruck, GiShoppingBag } from 'react-icons/gi';
import { BiRestaurant } from 'react-icons/bi';
import LocationModal from '../Common/LocationModal';

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState('Enter delivery location');
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };
    
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const services = [
    {
      icon: <GiFoodTruck />,
      iconBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      title: "FOOD DELIVERY",
      subtitle: "FROM RESTAURANTS",
      discount: "UPTO 60% OFF",
      path: "/food-delivery"
    },
    {
      icon: <GiShoppingBag />,
      iconBg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      title: "INSTAMART",
      subtitle: "INSTANT GROCERY",
      discount: "UPTO 60% OFF",
      path: "/instamart"
    },
    {
      icon: <BiRestaurant />,
      iconBg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      title: "DINEOUT",
      subtitle: "EAT OUT & SAVE MORE",
      discount: "UPTO 50% OFF",
      path: "/dineout"
    }
  ];

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const heroSearchQuery = e.target.querySelector('input')?.value;
    if (heroSearchQuery && heroSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(heroSearchQuery)}`);
    }
  };

  return (
    <>
      <div className="main-header">
        <div className="container">
          {/* Navigation Bar */}
          <div className="nav-bar">
            <div className="logo" onClick={() => navigate('/')}>
              <h1>Swiggy</h1>
            </div>
            
            <div className="location-selector" onClick={() => setModalOpen(true)}>
              <FaMapMarkerAlt className="location-icon" />
              <span className="location-text">{location}</span>
              <FaChevronDown className="dropdown-icon" />
            </div>
            
            <form className="search-wrapper" onSubmit={handleSearch}>
              <FaSearch className="search-icon-nav" />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search for restaurant, item or more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            <div className="nav-buttons">
              <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
              <button className="signup-nav" onClick={() => navigate('/signup')}>Sign Up</button>
              <div className="cart-icon-wrapper" onClick={() => navigate('/cart')}>
                <FaShoppingCart className="cart-icon-nav" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
            </div>
          </div>
          
          {/* Hero Content */}
          <div className="hero-content">
            <h2>Order food & groceries. Discover best restaurants.</h2>
            <p>Swiggy it!</p>
            <form className="hero-search" onSubmit={handleHeroSearch}>
              <FaSearch className="hero-search-icon" />
              <input type="text" className="hero-search-input" placeholder="Enter your delivery location" />
            </form>
          </div>
          
          {/* Service Tabs */}
          <div className="service-tabs">
            {services.map((service, index) => (
              <div key={index} className="service-tab" onClick={() => navigate(service.path)}>
                <div className="tab-header">
                  <div className="tab-icon-wrapper" style={{ background: service.iconBg }}>
                    <div className="tab-icon">{service.icon}</div>
                  </div>
                  <FaArrowRight className="arrow-icon" />
                </div>
                <div className="tab-content">
                  <div className="tab-title">{service.title}</div>
                  <div className="tab-subtitle">{service.subtitle}</div>
                  <div className="tab-discount">{service.discount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <LocationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSelectLocation={(newLocation) => {
          setLocation(newLocation);
          setModalOpen(false);
        }} 
      />
    </>
  );
};

export default Header;