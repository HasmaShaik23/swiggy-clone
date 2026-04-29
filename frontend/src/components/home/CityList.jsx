import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CityList = () => {
  const [showFoodMore, setShowFoodMore] = useState(false);
  const [showGroceryMore, setShowGroceryMore] = useState(false);
  
  const foodCities = [
    'Order food online in Bangalore',
    'Order food online in Gurgaon',
    'Order food online in Hyderabad',
    'Order food online in Delhi',
    'Order food online in Mumbai',
    'Order food online in Pune',
    'Order food online in Kolkata',
    'Order food online in Chennai',
    'Order food online in Ahmedabad',
    'Order food online in Chandigarh',
    'Order food online in Jaipur'
  ];
  
  const groceryCities = [
    'Order grocery delivery in Bangalore',
    'Order grocery delivery in Gurgaon',
    'Order grocery delivery in Hyderabad',
    'Order grocery delivery in Delhi',
    'Order grocery delivery in Mumbai',
    'Order grocery delivery in Pune',
    'Order grocery delivery in Kolkata',
    'Order grocery delivery in Chennai',
    'Order grocery delivery in Ahmedabad',
    'Order grocery delivery in Chandigarh',
    'Order grocery delivery in Jaipur'
  ];
  
  // Display 8 cities by default, show all when expanded
  const displayFood = showFoodMore ? foodCities : foodCities.slice(0, 8);
  const displayGrocery = showGroceryMore ? groceryCities : groceryCities.slice(0, 8);
  
  // Split into 3 columns
  const splitIntoColumns = (items) => {
    const columnSize = Math.ceil(items.length / 3);
    const columns = [];
    for (let i = 0; i < items.length; i += columnSize) {
      columns.push(items.slice(i, i + columnSize));
    }
    return columns;
  };
  
  const foodColumns = splitIntoColumns(displayFood);
  const groceryColumns = splitIntoColumns(displayGrocery);

  return (
    <div className="cities-section-final">
      <div className="container">
        {/* Food Delivery Cities */}
        <div className="cities-block-final">
          <h2 className="cities-heading-final">Cities with food delivery</h2>
          <div className="cities-three-columns">
            {foodColumns.map((column, colIndex) => (
              <ul key={colIndex} className="city-column-final">
                {column.map((city, idx) => (
                  <li key={idx}><a href="#">{city}</a></li>
                ))}
              </ul>
            ))}
          </div>
          <button className="show-more-final" onClick={() => setShowFoodMore(!showFoodMore)}>
            {showFoodMore ? <>Show Less <FaChevronUp /></> : <>Show More <FaChevronDown /></>}
          </button>
        </div>

        {/* Grocery Delivery Cities */}
        <div className="cities-block-final">
          <h2 className="cities-heading-final">Cities with grocery delivery</h2>
          <div className="cities-three-columns">
            {groceryColumns.map((column, colIndex) => (
              <ul key={colIndex} className="city-column-final">
                {column.map((city, idx) => (
                  <li key={idx}><a href="#">{city}</a></li>
                ))}
              </ul>
            ))}
          </div>
          <button className="show-more-final" onClick={() => setShowGroceryMore(!showGroceryMore)}>
            {showGroceryMore ? <>Show Less <FaChevronUp /></> : <>Show More <FaChevronDown /></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityList;