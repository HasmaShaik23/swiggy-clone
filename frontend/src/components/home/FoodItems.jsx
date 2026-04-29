import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FoodItems = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const foodItems = [
    { name: 'Idli', image: 'https://boldoutline.in/wp-content/uploads/2020/01/web-cover-57.jpg', restaurants: ['Dosa.in', 'South Indian Delight', 'Sagar Ratna'] },
    { name: 'Dosa', image: 'https://tse1.explicit.bing.net/th/id/OIP.yAPiYST8uQIQqdbNDjsr1wHaFj?rs=1&pid=ImgDetMain&o=7&rm=3', restaurants: ['Dosa.in', 'Sagar Ratna', 'South Indian Delight'] },
    { name: 'Pongal', image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/01/pongal-ven-pongal.jpg', restaurants: ['South Indian Delight', 'Dosa.in'] },
    { name: 'Vada', image: 'https://www.bing.com/th/id/OIP.OeHaxzXP8qCXmoWRLfl_YQHaEK?w=188&h=135&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2', restaurants: ['Dosa.in', 'South Indian Delight', 'Sagar Ratna'] },
    { name: 'Coffee', image: 'https://th.bing.com/th/id/OIP.zPiUB3AVv70izmiMipRc9gHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7', restaurants: ['Dosa.in', 'South Indian Delight'] },
    { name: 'Poori', image: 'https://tse4.mm.bing.net/th/id/OIP.LBgQT_vkGokprGIzpdRIvgHaFe?rs=1&pid=ImgDetMain&o=7&rm=3', restaurants: ['South Indian Delight', 'Sagar Ratna'] },
    { name: 'Biryani', image: 'https://authenticroyal.com/wp-content/uploads/2024/10/royal-rice-may-220461.jpg', restaurants: ['Biryani House', 'Paradise'] },
    { name: 'Juice', image: 'https://static.vecteezy.com/system/resources/previews/022/453/370/non_2x/mix-fruit-juice-in-a-glass-with-fresh-fruits-generative-ai-free-photo.jpg', restaurants: ['Dosa.in', 'South Indian Delight'] },
    { name: 'Tea', image: 'https://www.jinfiniti.com/wp-content/uploads/2025/02/146.png', restaurants: ['Dosa.in', 'South Indian Delight'] },
    { name: 'Cake', image: 'https://static-assets-prod.fnp.com/images/pr/l/v20250319162812/choco-symphony-eggless-truffle-cake-1kg_1.jpg', restaurants: ['House of Candy'] },
    { name: 'Salad', image: 'https://simple-veganista.com/wp-content/uploads/2012/09/healthy-chopped-vegetable-salad-recipe-4.jpg', restaurants: ['House of Candy', 'Dosa.in'] },
    { name: 'Uthappam', image: 'https://tse1.mm.bing.net/th/id/OIP.RweHJjz2mc-T1eozUjvKkgHaE0?rs=1&pid=ImgDetMain&o=7&rm=3', restaurants: ['Dosa.in', 'South Indian Delight'] },
    { name: 'Samosa', image: 'https://c.ndtvimg.com/2022-09/lpcnb0g8_samosa_625x300_29_September_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675', restaurants: ['House of Candy'] },
    { name: 'Parotta', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=150', restaurants: ['Biryani House'] },
    { name: 'Shake', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=150', restaurants: ['Me.Burger', 'House of Candy'] },
    { name: 'Poha', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=150', restaurants: ['Dosa.in', 'South Indian Delight'] }
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

  const handleItemClick = (item) => {
    navigate('/food-items-list', { state: { itemName: item.name, restaurants: item.restaurants } });
  };

  return (
    <div className="food-items-section-horizontal">
      <div className="container">
        <div className="food-items-header-horizontal">
          <h2 className="food-items-title-horizontal">Order our best food options</h2>
          <div className="food-items-controls-horizontal">
            {showLeftArrow && (
              <button className="food-scroll-btn" onClick={() => scroll('left')}>
                <FaChevronLeft />
              </button>
            )}
            {showRightArrow && (
              <button className="food-scroll-btn" onClick={() => scroll('right')}>
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>
        
        <div 
          className="food-items-scroll-horizontal" 
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
        >
          {foodItems.map((item, index) => (
            <div key={index} className="food-item-card-horizontal" onClick={() => handleItemClick(item)}>
              <div className="food-item-img-horizontal">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="food-item-name-horizontal">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodItems;