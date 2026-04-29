import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ title, items, type = 'food' }) => {
  const navigate = useNavigate();
  const [scrollIndex, setScrollIndex] = useState(0);
  
  const getItemsPerView = () => {
    if (window.innerWidth < 480) return 2;
    if (window.innerWidth < 768) return 3;
    if (window.innerWidth < 1024) return 4;
    return 6;
  };
  
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  
  React.useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const maxScroll = Math.max(0, items.length - itemsPerView);
  
  const handlePrev = () => {
    setScrollIndex(Math.max(0, scrollIndex - 1));
  };
  
  const handleNext = () => {
    setScrollIndex(Math.min(maxScroll, scrollIndex + 1));
  };
  
  const handleItemClick = (item) => {
    if (type === 'food') {
      navigate(`/food-item/${item.name}`);
    } else if (type === 'grocery') {
      navigate(`/grocery-category/${item.name}`);
    }
  };
  
  const visibleItems = items.slice(scrollIndex, scrollIndex + itemsPerView);
  
  return (
    <div className={`carousel-section ${type === 'grocery' ? 'grocery-section' : ''}`}>
      <div className="container">
        <div className="carousel-header">
          <h2 className="carousel-title">{title}</h2>
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={handlePrev} disabled={scrollIndex === 0}>
              <FaChevronLeft />
            </button>
            <button className="carousel-btn" onClick={handleNext} disabled={scrollIndex >= maxScroll}>
              <FaChevronRight />
            </button>
          </div>
        </div>
        
        <div className="carousel-container">
          <div className="carousel-track">
            {visibleItems.map((item, index) => (
              <div key={index} className="carousel-item" onClick={() => handleItemClick(item)}>
                <div className="item-img">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <span style={{ fontSize: 48 }}>{item.icon || '🍽️'}</span>
                  )}
                </div>
                <div className="item-name">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;