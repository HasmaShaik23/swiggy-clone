import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaClock, FaRupeeSign } from 'react-icons/fa';
import { restaurantsData } from '../data/restaurantsData';

const FoodItemsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemName, restaurants: restaurantNames } = location.state || { itemName: '', restaurants: [] };

  // Map restaurant names to full restaurant data
  const getRestaurantById = (name) => {
    return Object.values(restaurantsData).find(r => r.name === name);
  };

  const restaurants = restaurantNames.map(name => getRestaurantById(name)).filter(r => r);

  const handleRestaurantClick = (restaurantId) => {
    navigate('/restaurant-detail', { state: { restaurantId } });
  };

  return (
    <div className="food-items-list-page">
      <div className="food-items-list-header">
        <div className="container">
          <button className="food-items-back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <h1>{itemName}</h1>
          <p>Restaurants serving {itemName}</p>
        </div>
      </div>

      <div className="container">
        {restaurants.length === 0 ? (
          <div className="no-food-items">
            <span className="no-food-icon">🍽️</span>
            <h3>No restaurants found</h3>
            <p>Try searching for another food item</p>
            <button className="back-home-food-btn" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        ) : (
          <div className="food-items-restaurants-grid">
            {restaurants.map(restaurant => (
              <div key={restaurant.id} className="food-items-restaurant-card" onClick={() => handleRestaurantClick(restaurant.id)}>
                <div className="food-items-restaurant-img">
                  <img src={restaurant.imageUrl} alt={restaurant.name} />
                  <div className="food-items-rating">
                    <FaStar /> {restaurant.rating}
                  </div>
                  <div className="food-items-time">
                    <FaClock /> {restaurant.deliveryTime}
                  </div>
                </div>
                <div className="food-items-restaurant-info">
                  <h3 className="food-items-restaurant-name">{restaurant.name}</h3>
                  <p className="food-items-restaurant-cuisine">{restaurant.cuisine}</p>
                  <div className="food-items-restaurant-location">
                    <FaMapMarkerAlt /> {restaurant.location}
                  </div>
                  <div className="food-items-restaurant-price">
                    <FaRupeeSign /> {restaurant.price} for two
                  </div>
                  <div className="food-items-restaurant-distance">📍 {restaurant.distance}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItemsList;