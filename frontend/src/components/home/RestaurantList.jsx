import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaStar, FaMapMarkerAlt, FaTag, FaRupeeSign, FaClock } from 'react-icons/fa';
import { restaurantsList } from '../../data/restaurantsData';

const RestaurantList = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      const newScroll = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate('/restaurant-detail', { state: { restaurantId } });
  };

  return (
    <div className="restaurant-main-section">
      <div className="container">
        <div className="restaurant-main-header">
          <h2 className="restaurant-main-title">Discover best restaurants on Dineout</h2>
          <div className="restaurant-main-controls">
            {showLeftArrow && (
              <button className="restaurant-scroll-btn" onClick={() => scroll('left')}>
                <FaChevronLeft />
              </button>
            )}
            {showRightArrow && (
              <button className="restaurant-scroll-btn" onClick={() => scroll('right')}>
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>
        
        <div className="restaurant-main-scroll" ref={scrollContainerRef} onScroll={checkScrollButtons}>
          {restaurantsList.map(restaurant => (
            <div key={restaurant.id} className="restaurant-main-card" onClick={() => handleRestaurantClick(restaurant.id)}>
              <div className="restaurant-main-img">
                <img src={restaurant.imageUrl} alt={restaurant.name} />
                <div className="restaurant-main-rating">
                  <FaStar /> {restaurant.rating}
                </div>
                <div className="restaurant-main-time">
                  <FaClock /> {restaurant.deliveryTime}
                </div>
              </div>
              <div className="restaurant-main-info">
                <h3 className="restaurant-main-name">{restaurant.name}</h3>
                <p className="restaurant-main-cuisine">{restaurant.cuisine}</p>
                <div className="restaurant-main-location">
                  <FaMapMarkerAlt /> {restaurant.location}
                </div>
                <div className="restaurant-main-price">
                  <FaRupeeSign /> {restaurant.price} for two
                </div>
                <div className="restaurant-main-distance">📍 {restaurant.distance}</div>
                <div className="restaurant-main-offer">
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

export default RestaurantList;