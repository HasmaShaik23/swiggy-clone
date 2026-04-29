import React, { useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaClock, FaArrowLeft } from 'react-icons/fa';

const RestaurantMenu = ({ restaurant, onBack }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, delta) => {
    const item = cart.find(c => c.id === itemId);
    if (item.quantity + delta <= 0) {
      setCart(cart.filter(c => c.id !== itemId));
    } else {
      setCart(cart.map(c => c.id === itemId ? { ...c, quantity: c.quantity + delta } : c));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="restaurant-detail-page">
      <div className="restaurant-cover">
        <div className="container">
          <button className="back-arrow" onClick={onBack}>
            <FaArrowLeft /> Back
          </button>
          <div className="restaurant-info">
            <h1>{restaurant.name}</h1>
            <p>{restaurant.cuisine}</p>
            <div className="restaurant-meta">
              <span><FaStar color="#FFD700" /> {restaurant.rating}</span>
              <span><FaClock /> {restaurant.deliveryTime}</span>
              <span><FaMapMarkerAlt /> {restaurant.location}</span>
              <span>{restaurant.price}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-items">
          {restaurant.menu.map(item => (
            <div key={item.id} className="menu-item-card">
              <div className="menu-item-info">
                <div className="menu-item-name">{item.name}</div>
                <div className="menu-item-desc">{item.description}</div>
                <div className="menu-item-price">₹{item.price}</div>
                <div className="quantity-control">
                  <button className="quantity-btn" onClick={() => addToCart(item)}>Add</button>
                </div>
              </div>
              <div className="menu-item-image">{item.image}</div>
            </div>
          ))}
        </div>

        <div className="cart-sidebar">
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center' }}>Cart is empty</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">₹{item.price}</div>
                  </div>
                  <div className="cart-item-controls">
                    <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <div><span>Subtotal</span><span>₹{getTotalPrice()}</span></div>
                <div><span>Delivery Fee</span><span>₹40</span></div>
                <div><span>Total</span><span>₹{getTotalPrice() + 40}</span></div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;