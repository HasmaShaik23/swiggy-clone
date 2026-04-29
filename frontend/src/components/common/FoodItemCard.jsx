import React from 'react';

const FoodItemCard = ({ item, onClick }) => {
  return (
    <div className="food-item-card" onClick={() => onClick && onClick(item)}>
      <div className="food-item-image">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} />
        ) : (
          <span>{item.icon || '🍽️'}</span>
        )}
      </div>
      <div className="food-item-name">{item.name}</div>
    </div>
  );
};

export default FoodItemCard;