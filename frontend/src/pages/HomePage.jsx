import React from 'react';
import FoodItems from '../components/Home/FoodItems';
import GroceryItems from '../components/Home/GroceryItems';
import RestaurantList from '../components/Home/RestaurantList';
import CityList from '../components/Home/CityList';

const HomePage = () => {
  return (
    <>
      <FoodItems />
      <GroceryItems />
      <RestaurantList />
      <CityList />
    </>
  );
};

export default HomePage;