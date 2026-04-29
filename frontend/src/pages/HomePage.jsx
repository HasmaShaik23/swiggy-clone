import React from 'react';
import FoodItems from '../components/home/FoodItems';
import GroceryItems from '../components/home/GroceryItems';
import RestaurantList from '../components/home/RestaurantList';
import CityList from '../components/home/CityList';

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