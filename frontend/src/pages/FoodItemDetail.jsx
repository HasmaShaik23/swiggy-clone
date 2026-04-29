import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaClock, FaRupeeSign, FaTag } from 'react-icons/fa';

const FoodItemsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemName, restaurants: restaurantNames } = location.state || { itemName: '', restaurants: [] };

  // Complete restaurant data
  const allRestaurants = {
    'House of Candy': { id: 1, name: "House of Candy", cuisine: "Desserts", location: "Express Avenue Mall, Royapettah, Chennai", price: 500, rating: 4.5, deliveryTime: "25-30 min", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300" },
    'Dosa.in': { id: 4, name: "Dosa.in", cuisine: "South Indian", location: "Coconut Tawa, Chennai", price: 250, rating: 4.4, deliveryTime: "15-20 min", imageUrl: "https://images.unsplash.com/photo-1589301760014-5e6d6d8c9e5f?w=300" },
    'Biryani House': { id: 2, name: "Biryani House", cuisine: "Biryani, Mughlai", location: "Anna Nagar, Chennai", price: 600, rating: 4.7, deliveryTime: "35-40 min", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21bb4fb89?w=300" },
    'Me.Burger': { id: 5, name: "Me.Burger", cuisine: "Burgers, Fast Food", location: "Park Tower, Chennai", price: 400, rating: 4.6, deliveryTime: "20-25 min", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300" },
    'Pizza Mania': { id: 3, name: "Pizza Mania", cuisine: "Pizza, Italian", location: "T Nagar, Chennai", price: 550, rating: 4.4, deliveryTime: "30-35 min", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300" },
    'South Indian Delight': { id: 6, name: "South Indian Delight", cuisine: "South Indian", location: "Mylapore, Chennai", price: 300, rating: 4.6, deliveryTime: "20-25 min", imageUrl: "https://images.unsplash.com/photo-1589301760014-5e6d6d8c9e5f?w=300" },
    'Sagar Ratna': { id: 7, name: "Sagar Ratna", cuisine: "South Indian", location: "T Nagar, Chennai", price: 350, rating: 4.5, deliveryTime: "25-30 min", imageUrl: "https://images.unsplash.com/photo-1589301760014-5e6d6d8c9e5f?w=300" },
    'Paradise': { id: 8, name: "Paradise", cuisine: "Biryani", location: "Secunderabad, Chennai", price: 650, rating: 4.8, deliveryTime: "35-40 min", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21bb4fb89?w=300" }
  };

  const restaurants = restaurantNames.map(name => allRestaurants[name]).filter(r => r);

  const handleRestaurantClick = (restaurantId) => {
    navigate('/restaurant-detail', { state: { restaurantId } });
  };

  return (
    <div className="food-items-list-page">
      <div className="food-items-list-header">
        <div className="container">
          <button className="back-btn-list" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <h1>{itemName}</h1>
          <p>Restaurants serving {itemName}</p>
        </div>
      </div>

      <div className="container">
        {restaurants.length === 0 ? (
          <div className="no-restaurants-found">
            <span className="no-food-icon">🍽️</span>
            <h3>No restaurants found</h3>
            <p>Try searching for another food item</p>
            <button className="explore-btn" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        ) : (
          <div className="restaurants-list-grid">
            {restaurants.map(restaurant => (
              <div key={restaurant.id} className="restaurant-list-card" onClick={() => handleRestaurantClick(restaurant.id)}>
                <div className="restaurant-list-img">
                  <img src={restaurant.imageUrl} alt={restaurant.name} />
                  <div className="restaurant-list-rating">
                    <FaStar /> {restaurant.rating}
                  </div>
                  <div className="restaurant-list-time">
                    <FaClock /> {restaurant.deliveryTime}
                  </div>
                </div>
                <div className="restaurant-list-info">
                  <h3 className="restaurant-list-name">{restaurant.name}</h3>
                  <p className="restaurant-list-cuisine">{restaurant.cuisine}</p>
                  <div className="restaurant-list-location">
                    <FaMapMarkerAlt /> {restaurant.location}
                  </div>
                  <div className="restaurant-list-price">
                    <FaRupeeSign /> {restaurant.price} for two
                  </div>
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