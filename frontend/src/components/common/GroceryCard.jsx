import React from 'react';

const GroceryCard = ({ category, onClick }) => {
  return (
    <div className="grocery-card-component" onClick={() => onClick && onClick(category)}>
      <div className="grocery-card-icon">{category.icon}</div>
      <h3 className="grocery-card-name">{category.name}</h3>
      <p className="grocery-card-count">{category.count}</p>
    </div>
  );
};

export default GroceryCard;