import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaMinus, FaTrash, FaRupeeSign, FaShoppingCart, FaTag } from 'react-icons/fa';

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(40);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  };

  const saveCart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (itemId, delta) => {
    const newCart = cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta;
        if (newQuantity <= 0) return null;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item !== null);
    saveCart(newCart);
  };

  const removeItem = (itemId) => {
    saveCart(cart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getGST = () => {
    return getSubtotal() * 0.05;
  };

  const getTotal = () => {
    return getSubtotal() + deliveryFee + getGST();
  };

  // Group items by restaurant
  const groupedItems = cart.reduce((groups, item) => {
    const key = item.restaurantName || 'Grocery Items';
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-page-header">
          <div className="container">
            <button className="cart-back-btn" onClick={() => navigate('/')}>
              <FaArrowLeft /> Back to Home
            </button>
            <h1>Your Cart</h1>
          </div>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add items from restaurants or grocery to get started</p>
          <button className="explore-btn" onClick={() => navigate('/')}>Explore Now</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <div className="container">
          <button className="cart-back-btn" onClick={() => navigate('/')}>
            <FaArrowLeft /> Back to Home
          </button>
          <h1>Your Cart</h1>
          <p className="cart-items-count">{cart.reduce((s, i) => s + i.quantity, 0)} items</p>
        </div>
      </div>

      <div className="container">
        <div className="cart-content">
          <div className="cart-items">
            {Object.entries(groupedItems).map(([restaurantName, items]) => (
              <div key={restaurantName} className="cart-group">
                <div className="cart-group-header">
                  <FaTag className="group-icon" />
                  <h3>{restaurantName}</h3>
                </div>
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-left">
                      <div className="cart-item-image">
                        {item.image ? (
                          item.image.startsWith('http') ? (
                            <img src={item.image} alt={item.name} />
                          ) : (
                            <span className="item-emoji" style={{ fontSize: '32px' }}>{item.image}</span>
                          )
                        ) : (
                          <span className="item-emoji">🍽️</span>
                        )}
                      </div>
                      <div className="cart-item-details">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">
                          <FaRupeeSign /> {item.price}
                        </div>
                        {item.description && (
                          <div className="cart-item-desc">{item.description}</div>
                        )}
                      </div>
                    </div>
                    <div className="cart-item-right">
                      <div className="cart-item-quantity">
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          <FaPlus />
                        </button>
                      </div>
                      <div className="cart-item-total">
                        <FaRupeeSign /> {item.price * item.quantity}
                      </div>
                      <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span><FaRupeeSign /> {Math.floor(getSubtotal())}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span><FaRupeeSign /> {deliveryFee}</span>
            </div>
            <div className="summary-row">
              <span>GST (5%)</span>
              <span><FaRupeeSign /> {Math.floor(getGST())}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span><FaRupeeSign /> {Math.floor(getTotal())}</span>
            </div>
            <button className="place-order-btn" onClick={() => alert('Order placed successfully!')}>
              Place Order
            </button>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;