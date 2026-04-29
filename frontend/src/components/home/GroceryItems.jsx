import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const GroceryItems = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const groceryList = [
    { name: 'Fresh Vegetables', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=150', color: '#4caf50' },
    { name: 'Fresh Fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150', color: '#ff9800' },
    { name: 'Dairy, Bread & Eggs', image: 'https://tse1.explicit.bing.net/th/id/OIP.yHWYgJhehxqrVmVttVbqCQHaJ3?rs=1&pid=ImgDetMain&o=7&rm=3', color: '#2196f3' },
    { name: 'Rice, Atta & Dals', image: 'https://tse2.mm.bing.net/th/id/OIP.MUGHsaMHQcRuUBTNlOI8jQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3', color: '#795548' },
    { name: 'Masalas & Dry Fruits', image: 'https://th.bing.com/th/id/R.e485de73e05e81d8b8e5e3c4b4f44b0a?rik=BKC5Ofr%2ba0%2fj2g&riu=http%3a%2f%2fhathimasala.com%2fcdn%2fshop%2fcollections%2fbuy-dry-fruits-online.jpg%3fv%3d1750655246&ehk=WtEH%2fZLF4aOX5EQsXWv2LmVftI2VIyMu3GC0BRK0oow%3d&risl=&pid=ImgRaw&r=0', color: '#f44336' },
    { name: 'Oils & Ghee', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150', color: '#ff9800' },
    { name: 'Snacks & Munchies', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=150', color: '#ff5722' },
    { name: 'Sweet Tooth', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=150', color: '#9c27b0' },
    { name: 'Cold Drinks & Juices', image: 'https://th.bing.com/th/id/OIP.WJPSXkUbtCxYDO7z-MtBNAHaE7?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', color: '#00bcd4' },
    { name: 'Biscuits & Cakes', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=150', color: '#8d6e63' },
    { name: 'Instant & Frozen Food', image: 'https://www.shutterstock.com/shutterstock/photos/645528388/display_1500/stock-photo-chiang-rai-thailand-may-instant-frozen-food-and-dessert-in-packaging-for-sale-on-supermarket-645528388.jpg', color: '#607d8b' }
  ];

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
      const scrollAmount = 300;
      const newScroll = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const handleGroceryClick = (grocery) => {
    navigate('/instamart', { state: { categoryName: grocery.name } });
  };

  return (
    <div className="grocery-section-main">
      <div className="container">
        <div className="grocery-main-header">
          <h2 className="grocery-main-title">Shop groceries on Instamart</h2>
          <div className="grocery-main-controls">
            {showLeftArrow && (
              <button className="grocery-scroll-btn" onClick={() => scroll('left')}>
                <FaChevronLeft />
              </button>
            )}
            {showRightArrow && (
              <button className="grocery-scroll-btn" onClick={() => scroll('right')}>
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>
        
        <div 
          className="grocery-main-scroll" 
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
        >
          {groceryList.map((item, index) => (
            <div key={index} className="grocery-main-card" onClick={() => handleGroceryClick(item)}>
              <div className="grocery-main-img">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="grocery-main-name">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroceryItems;