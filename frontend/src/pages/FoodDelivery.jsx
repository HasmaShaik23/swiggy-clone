import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaTag, FaRupeeSign, FaClock } from 'react-icons/fa';
import { restaurantsList } from '../data/restaurantsData';

const FoodDelivery = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  // Get unique categories from restaurants
  const getCategory = (restaurant) => {
    if (restaurant.name === "House of Candy") return "desserts";
    if (restaurant.name === "The Great Kebab Factory") return "kebab";
    if (restaurant.name === "Copper Chimney") return "north indian";
    if (restaurant.name === "Dosa.in") return "south indian";
    if (restaurant.name === "Me.Burger") return "burgers";
    return "other";
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'kebab', label: 'Kebab' },
    { id: 'north indian', label: 'North Indian' },
    { id: 'south indian', label: 'South Indian' },
    { id: 'burgers', label: 'Burgers' }
  ];

  const filteredRestaurants = activeFilter === 'all' 
    ? restaurantsList 
    : restaurantsList.filter(r => getCategory(r) === activeFilter);

  const handleRestaurantClick = (restaurantId) => {
    navigate('/restaurant-detail', { state: { restaurantId } });
  };

  return (
    <div className="food-delivery-page">
      <div className="food-delivery-header">
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/')}>
            <FaArrowLeft /> Back to Home
          </button>
          <h1>Food Delivery</h1>
          <p>Discover the best restaurants in your city</p>
        </div>
      </div>

      <div className="food-filters">
        <div className="container">
          <div className="filters-container">
            {filters.map(filter => (
              <button 
                key={filter.id} 
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`} 
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="restaurants-grid">
          {filteredRestaurants.map(restaurant => (
            <div key={restaurant.id} className="restaurant-card" onClick={() => handleRestaurantClick(restaurant.id)}>
              <div className="restaurant-card-img">
                <img src={restaurant.imageUrl} alt={restaurant.name} />
                <div className="rating-badge">
                  <FaStar /> {restaurant.rating}
                </div>
                <div className="time-badge">
                  <FaClock /> {restaurant.deliveryTime}
                </div>
              </div>
              <div className="restaurant-card-info">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                <div className="restaurant-location">
                  <FaMapMarkerAlt /> {restaurant.location}
                </div>
                <div className="restaurant-price">
                  <FaRupeeSign /> {restaurant.price} for two
                </div>
                <div className="restaurant-distance">📍 {restaurant.distance}</div>
                <div className="restaurant-offer">
                  <FaTag /> {restaurant.offer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDelivery;