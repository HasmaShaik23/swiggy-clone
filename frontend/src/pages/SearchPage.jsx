import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaClock, FaRupeeSign, FaTag } from 'react-icons/fa';
import { restaurantsList } from '../data/restaurantsData';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);

  const foodItemsList = [
    { id: 1, name: 'Idli', image: 'https://boldoutline.in/wp-content/uploads/2020/01/web-cover-57.jpg' },
    { id: 2, name: 'Dosa', image: 'https://tse1.explicit.bing.net/th/id/OIP.yAPiYST8uQIQqdbNDjsr1wHaFj?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 3, name: 'Pongal', image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/01/pongal-ven-pongal.jpg' },
    { id: 4, name: 'Vada', image: 'https://www.bing.com/th/id/OIP.OeHaxzXP8qCXmoWRLfl_YQHaEK?w=188&h=135&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2' },
    { id: 5, name: 'Biryani', image: 'https://authenticroyal.com/wp-content/uploads/2024/10/royal-rice-may-220461.jpg' },
    { id: 6, name: 'Cake', image: 'https://static-assets-prod.fnp.com/images/pr/l/v20250319162812/choco-symphony-eggless-truffle-cake-1kg_1.jpg' },
    { id: 7, name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150' },
    { id: 8, name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150' },
    { id: 9, name: 'Samosa', image: 'https://c.ndtvimg.com/2022-09/lpcnb0g8_samosa_625x300_29_September_22.jpg' }
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      const restaurantResults = restaurantsList.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
      );
      
      const foodResults = foodItemsList.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(restaurantResults);
      setFilteredFoodItems(foodResults);
    }
  }, [location.search]);

  const handleRestaurantClick = (restaurantId) => {
    navigate('/restaurant-detail', { state: { restaurantId } });
  };

  const handleFoodItemClick = (item) => {
    const restaurantsForItem = restaurantsList.filter(restaurant =>
      restaurant.menu?.some(menuItem => 
        menuItem.name.toLowerCase().includes(item.name.toLowerCase())
      )
    );
    if (restaurantsForItem.length > 0) {
      navigate('/restaurant-detail', { state: { restaurantId: restaurantsForItem[0].id } });
    }
  };

  return (
    <div className="search-page">
      <div className="search-page-header">
        <div className="container">
          <button className="search-back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <h1>Search Results</h1>
          <p>Showing results for "{searchQuery}"</p>
        </div>
      </div>

      <div className="container">
        {searchResults.length === 0 && filteredFoodItems.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No results found</h3>
            <p>Try searching for different keywords</p>
            <button className="back-home-btn" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        ) : (
          <>
            {filteredFoodItems.length > 0 && (
              <div className="search-section">
                <h2 className="search-section-title">Food Items</h2>
                <div className="search-food-grid">
                  {filteredFoodItems.map(item => (
                    <div key={item.id} className="search-food-item" onClick={() => handleFoodItemClick(item)}>
                      <div className="search-food-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="search-food-name">{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="search-section">
                <h2 className="search-section-title">Restaurants</h2>
                <div className="search-restaurants-grid">
                  {searchResults.map(restaurant => (
                    <div key={restaurant.id} className="search-restaurant-card" onClick={() => handleRestaurantClick(restaurant.id)}>
                      <div className="search-restaurant-img">
                        <img src={restaurant.imageUrl} alt={restaurant.name} />
                        <div className="search-rating-badge">
                          <FaStar /> {restaurant.rating}
                        </div>
                        <div className="search-time-badge">
                          <FaClock /> {restaurant.deliveryTime}
                        </div>
                      </div>
                      <div className="search-restaurant-info">
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.cuisine}</p>
                        <div className="search-restaurant-location">
                          <FaMapMarkerAlt /> {restaurant.location}
                        </div>
                        <div className="search-restaurant-price">
                          <FaRupeeSign /> {restaurant.price} for two
                        </div>
                        <div className="search-restaurant-offer">
                          <FaTag /> {restaurant.offer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;