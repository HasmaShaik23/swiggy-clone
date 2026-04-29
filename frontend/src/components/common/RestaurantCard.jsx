import React from 'react';
import { FaStar, FaMapMarkerAlt, FaTag, FaRupeeSign, FaClock } from 'react-icons/fa';

const RestaurantCard = ({ 
  restaurant, 
  onClick, 
  showDistance = true, 
  showOffer = true,
  showDeliveryTime = false,
  variant = 'default'
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(restaurant);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#4caf50';
    if (rating >= 4.0) return '#8bc34a';
    if (rating >= 3.5) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className={`restaurant-card-component restaurant-card-${variant}`} onClick={handleClick}>
      <div className="restaurant-card-image">
        {restaurant.imageUrl ? (
          <img src={restaurant.imageUrl} alt={restaurant.name} />
        ) : (
          <span className="restaurant-emoji">{restaurant.image || '🍽️'}</span>
        )}
        <div className="restaurant-rating" style={{ background: getRatingColor(restaurant.rating) }}>
          <FaStar className="star-icon" /> {restaurant.rating}
        </div>
        {showDeliveryTime && restaurant.deliveryTime && (
          <div className="restaurant-delivery-time">
            <FaClock /> {restaurant.deliveryTime}
          </div>
        )}
      </div>
      
      <div className="restaurant-card-info">
        <h3 className="restaurant-card-name">{restaurant.name}</h3>
        <p className="restaurant-card-cuisine">{restaurant.cuisine}</p>
        
        <div className="restaurant-card-location">
          <FaMapMarkerAlt /> {restaurant.location}
        </div>
        
        <div className="restaurant-card-price">
          <FaRupeeSign /> {restaurant.price} for two
        </div>
        
        {showDistance && restaurant.distance && (
          <div className="restaurant-card-distance">
            📍 {restaurant.distance}
          </div>
        )}
        
        {showOffer && restaurant.offer && (
          <div className="restaurant-card-offer">
            <FaTag /> {restaurant.offer}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;