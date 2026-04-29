import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaClock, FaArrowLeft, FaPlus, FaMinus, FaRupeeSign, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { restaurantsData } from '../data/restaurantsData';

const RestaurantDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const restaurantId = location.state?.restaurantId;
    const restaurantData = location.state?.restaurant;
    
    if (restaurantId && restaurantsData[restaurantId]) {
      setRestaurant(restaurantsData[restaurantId]);
    } else if (restaurantData) {
      setRestaurant(restaurantData);
    } else {
      setRestaurant(restaurantsData[1]);
    }
  }, [location]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const saveCart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    let newCart;
    if (existing) {
      newCart = cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
    } else {
      newCart = [...cart, { ...item, quantity: 1, restaurantName: restaurant?.name }];
    }
    saveCart(newCart);
  };

  const updateQuantity = (itemId, delta) => {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;
    let newCart;
    if (item.quantity + delta <= 0) {
      newCart = cart.filter(c => c.id !== itemId);
    } else {
      newCart = cart.map(c => c.id === itemId ? { ...c, quantity: c.quantity + delta } : c);
    }
    saveCart(newCart);
  };

  const removeItem = (itemId) => {
    saveCart(cart.filter(c => c.id !== itemId));
  };

  const getCartTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const getItemQuantity = (itemId) => cart.find(c => c.id === itemId)?.quantity || 0;

  if (!restaurant) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="restaurant-detail">
      {/* Header Section */}
      <div className="restaurant-detail-header">
        <div className="container">
          <button className="detail-back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back to Restaurants
          </button>
          <div className="restaurant-info">
            <h1>{restaurant.name}</h1>
            <p className="restaurant-cuisine">{restaurant.cuisine}</p>
            <div className="restaurant-meta">
              <span><FaStar /> {restaurant.rating}</span>
              <span><FaClock /> {restaurant.deliveryTime}</span>
              <span><FaMapMarkerAlt /> {restaurant.location}</span>
              <span><FaRupeeSign /> {restaurant.price} for two</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu and Cart Section */}
      <div className="container">
        <div className="restaurant-detail-layout">
          {/* Menu Items */}
          <div className="menu-section">
            <h2 className="menu-section-title">Menu</h2>
            {restaurant.menu && restaurant.menu.length > 0 ? (
              restaurant.menu.map(item => {
                const quantity = getItemQuantity(item.id);
                return (
                  <div key={item.id} className="menu-item">
                    <div className="menu-item-left">
                      <div className="menu-item-img">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <span>🍽️</span>
                        )}
                      </div>
                      <div className="menu-item-details">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <span className="menu-item-price"><FaRupeeSign /> {item.price}</span>
                      </div>
                    </div>
                    <div className="menu-item-right">
                      {quantity > 0 ? (
                        <div className="item-quantity-control">
                          <button onClick={() => updateQuantity(item.id, -1)}><FaMinus /></button>
                          <span>{quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><FaPlus /></button>
                        </div>
                      ) : (
                        <button className="add-to-cart-btn" onClick={() => addToCart(item)}>Add to Cart</button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-menu-items">No menu items available</div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="cart-sidebar">
            <h3><FaShoppingCart /> Your Cart ({cart.length})</h3>
            {cart.length === 0 ? (
              <div className="empty-cart-msg">
                <span>🛒</span>
                <p>Cart is empty</p>
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">₹{item.price}</div>
                    </div>
                    <div className="cart-item-actions">
                      <button onClick={() => updateQuantity(item.id, -1)}><FaMinus /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}><FaPlus /></button>
                      <button className="cart-remove" onClick={() => removeItem(item.id)}><FaTrash /></button>
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <span>Total</span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <button className="checkout-btn" onClick={() => navigate('/cart')}>Go to Cart</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;