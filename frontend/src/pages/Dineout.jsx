import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaPercent, FaRupeeSign, FaClock } from 'react-icons/fa';
import { restaurantsList } from '../data/restaurantsData';

const Dineout = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const restaurants = restaurantsList;

  const itemsPerPage = 3;
  const totalPages = Math.ceil(restaurants.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleRestaurants = restaurants.slice(startIndex, startIndex + itemsPerPage);

  const handleRestaurantClick = (restaurantId) => {
    navigate('/restaurant-detail', { state: { restaurantId } });
  };

  return (
    <div className="dineout-page">
      <div className="dineout-header">
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/')}>
            <FaArrowLeft /> Back to Home
          </button>
          <h1>Dineout</h1>
          <p>Save more when you eat out with exclusive offers</p>
        </div>
      </div>

      <div className="container">
        <div className="dineout-header-section">
          <h2>Restaurants with Offers</h2>
          <div className="dineout-controls">
            <button onClick={() => setCurrentPage(Math.max(0, currentPage - 1))} disabled={currentPage === 0}>◀</button>
            <span>{currentPage + 1} / {totalPages}</span>
            <button onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))} disabled={currentPage === totalPages - 1}>▶</button>
          </div>
        </div>
        
        <div className="dineout-grid">
          {visibleRestaurants.map(restaurant => (
            <div key={restaurant.id} className="dineout-card" onClick={() => handleRestaurantClick(restaurant.id)}>
              <div className="dineout-card-img">
                <img src={restaurant.imageUrl} alt={restaurant.name} />
                <div className="discount-tag">{restaurant.offer.includes('50') ? '50%' : restaurant.offer.includes('25') ? '25%' : '20%'} OFF</div>
                <div className="rating-tag"><FaStar /> {restaurant.rating}</div>
                <div className="time-tag"><FaClock /> {restaurant.deliveryTime}</div>
              </div>
              <div className="dineout-card-info">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.cuisine}</p>
                <div className="dineout-location"><FaMapMarkerAlt /> {restaurant.location}</div>
                <div className="dineout-price"><FaRupeeSign /> {restaurant.price} for two</div>
                <div className="dineout-offer"><FaPercent /> {restaurant.offer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dineout;