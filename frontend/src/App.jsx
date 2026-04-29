import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FoodDelivery from './pages/FoodDelivery';
import Instamart from './pages/Instamart';
import Dineout from './pages/Dineout';
import RestaurantDetail from './pages/RestaurantDetail';
import CartPage from './pages/CartPage';
import FoodItemsList from './pages/FoodItemsList';
import SearchPage from './pages/SearchPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><HomePage /><Footer /></>} />
        <Route path="/food-delivery" element={<><FoodDelivery /><Footer /></>} />
        <Route path="/instamart" element={<Instamart />} />
        <Route path="/dineout" element={<><Dineout /><Footer /></>} />
        <Route path="/restaurant-detail" element={<RestaurantDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/food-items-list" element={<FoodItemsList />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;