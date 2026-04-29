import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

const GroceryCategory = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [cart, setCart] = useState({});

  const products = {
    'Fresh Vegetables': [
      { id: 1, name: "Tomato", price: 40, unit: "kg", image: "🍅", quantity: "500g" },
      { id: 2, name: "Potato", price: 30, unit: "kg", image: "🥔", quantity: "1kg" },
      { id: 3, name: "Onion", price: 35, unit: "kg", image: "🧅", quantity: "1kg" },
      { id: 4, name: "Carrot", price: 45, unit: "kg", image: "🥕", quantity: "500g" },
      { id: 5, name: "Capsicum", price: 50, unit: "kg", image: "🫑", quantity: "250g" }
    ],
    'Fresh Fruits': [
      { id: 6, name: "Apple", price: 120, unit: "kg", image: "🍎", quantity: "4 pcs" },
      { id: 7, name: "Banana", price: 40, unit: "dozen", image: "🍌", quantity: "6 pcs" },
      { id: 8, name: "Orange", price: 80, unit: "kg", image: "🍊", quantity: "4 pcs" }
    ]
  };

  const currentProducts = products[category] || [];

  const addToCart = (product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: { ...product, quantity: (prev[product.id]?.quantity || 0) + 1 }
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId].quantity === 1) {
        delete newCart[productId];
      } else {
        newCart[productId].quantity--;
      }
      return newCart;
    });
  };

  return (
    <>
      <div className="grocery-category-page">
        <div className="page-banner" style={{ background: '#2e7d32' }}>
          <div className="container">
            <button className="back-button" onClick={() => navigate('/instamart')}>
              <FaArrowLeft /> Back to Instamart
            </button>
            <h1>{category}</h1>
            <p>Fresh groceries delivered in minutes</p>
          </div>
        </div>

        <div className="container">
          <div className="products-grid">
            {currentProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.image}</div>
                <h3>{product.name}</h3>
                <p className="product-unit">{product.quantity}</p>
                <div className="product-price">₹{product.price}</div>
                <div className="product-actions">
                  {cart[product.id] ? (
                    <div className="quantity-selector">
                      <button onClick={() => removeFromCart(product.id)}><FaMinus /></button>
                      <span>{cart[product.id].quantity}</span>
                      <button onClick={() => addToCart(product)}><FaPlus /></button>
                    </div>
                  ) : (
                    <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {Object.keys(cart).length > 0 && (
          <div className="floating-cart">
            <div className="cart-summary">
              <FaShoppingCart />
              <span>{Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)} items</span>
              <button onClick={() => navigate('/checkout')}>View Cart</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 25px;
          padding: 40px 0;
        }
        .product-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.3s;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }
        .product-image {
          font-size: 60px;
          margin-bottom: 15px;
        }
        .product-unit {
          color: #666;
          font-size: 14px;
          margin: 8px 0;
        }
        .product-price {
          font-size: 22px;
          font-weight: 700;
          color: #2e7d32;
          margin: 10px 0;
        }
        .quantity-selector {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          background: #f5f5f5;
          padding: 8px;
          border-radius: 30px;
        }
        .quantity-selector button {
          background: #2e7d32;
          color: white;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
        }
        .add-btn {
          background: #2e7d32;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 30px;
          width: 100%;
          cursor: pointer;
        }
        .floating-cart {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #2e7d32;
          color: white;
          padding: 12px 24px;
          border-radius: 50px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          z-index: 100;
        }
        .cart-summary {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .cart-summary button {
          background: white;
          color: #2e7d32;
          border: none;
          padding: 5px 15px;
          border-radius: 20px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default GroceryCategory;