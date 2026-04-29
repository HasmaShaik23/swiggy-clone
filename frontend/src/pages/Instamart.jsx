import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaRupeeSign, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

const Instamart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);

  const categories = [
    { id: 1, name: "Fresh Vegetables", image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=200", count: "50+ items", color: "#4caf50" },
    { id: 2, name: "Fresh Fruits", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200", count: "40+ items", color: "#ff9800" },
    { id: 3, name: "Dairy, Bread & Eggs", image: "https://img.freepik.com/premium-photo/dairy-products-with-bread-eggs_488220-32176.jpg", count: "60+ items", color: "#2196f3" },
    { id: 4, name: "Rice, Atta & Dals", image: "https://tse2.mm.bing.net/th/id/OIP.MUGHsaMHQcRuUBTNlOI8jQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3", count: "45+ items", color: "#795548" },
    { id: 5, name: "Masalas & Dry Fruits", image: "https://tse1.mm.bing.net/th/id/OIP.hQLXVnjP-qi-9ZmfwRbd1QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", count: "70+ items", color: "#f44336" },
    { id: 6, name: "Oils & Ghee", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200", count: "30+ items", color: "#ff9800" },
    { id: 7, name: "Snacks & Munchies", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200", count: "100+ items", color: "#ff5722" },
    { id: 8, name: "Sweet Tooth", image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=200", count: "80+ items", color: "#9c27b0" },
    { id: 9, name: "Cold Drinks & Juices", image: "https://tse3.mm.bing.net/th/id/OIP.WJPSXkUbtCxYDO7z-MtBNAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3", count: "55+ items", color: "#00bcd4" },
    { id: 10, name: "Biscuits & Cakes", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200", count: "65+ items", color: "#8d6e63" },
    { id: 11, name: "Instant & Frozen Food", image: "https://www.shutterstock.com/shutterstock/photos/645528388/display_1500/stock-photo-chiang-rai-thailand-may-instant-frozen-food-and-dessert-in-packaging-for-sale-on-supermarket-645528388.jpg", count: "40+ items", color: "#607d8b" }
  ];

  const productsByCategory = {
    1: [
      { id: 101, name: "Tomato", price: 40, unit: "kg", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150", description: "Fresh farm tomatoes" },
      { id: 102, name: "Onion", price: 35, unit: "kg", image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=150", description: "Red onions" },
      { id: 103, name: "Potato", price: 30, unit: "kg", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150", description: "Premium potatoes" }
    ],
    2: [
      { id: 201, name: "Apple", price: 120, unit: "kg", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150", description: "Fresh Kashmiri apples" },
      { id: 202, name: "Banana", price: 50, unit: "dozen", image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=150", description: "Cavendish bananas" }
    ],
    3: [
      { id: 301, name: "Milk", price: 60, unit: "litre", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150", description: "Fresh toned milk" },
      { id: 302, name: "Bread", price: 40, unit: "packet", image: "https://i.pinimg.com/originals/d0/9d/e7/d09de718ece7c820ad3d2b2b34cfa540.jpg", description: "Whole wheat bread" }
    ],
    4: [
      { id: 401, name: "Basmati Rice", price: 120, unit: "kg", image: "https://th.bing.com/th/id/OIP.TQ3GhCABJ7QXhzQtQnUyMgHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Premium basmati rice" },
      { id: 402, name: "Wheat Atta", price: 45, unit: "kg", image: "https://5.imimg.com/data5/LW/JW/GA/ANDROID-65289178/product-jpeg-1000x1000.jpg", description: "Whole wheat flour" }
    ],
    5: [
      { id: 501, name: "Turmeric Powder", price: 60, unit: "200g", image: "https://cdn.shopify.com/s/files/1/1558/1905/products/Superfood_World_Turmeric_Curcumin_Powder_1024x1024.jpg?v=1495982813", description: "Pure turmeric" },
      { id: 502, name: "Red Chilli Powder", price: 80, unit: "200g", image: "https://m.media-amazon.com/images/I/71zHXhA0pKL._SL1500_.jpg", description: "Spicy chilli powder" },
      { id: 503, name: "Almonds", price: 450, unit: "kg", image: "https://www.health.com/thmb/xklPFBrlPpwcHND_ov5EZwLHAwc=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/almonds-GettyImages-683814187-2000-44a06e730fac4c60a10cbb5f9642b589.jpg", description: "California almonds" },
      { id: 504, name: "Cashews", price: 550, unit: "kg", image: "https://th.bing.com/th/id/OIP.oi3Z0b4tAnPAyGDwUelT9wHaET?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Premium cashews" }
    ],
    6: [
      { id: 601, name: "Sunflower Oil", price: 110, unit: "litre", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150", description: "Heart healthy oil" },
      { id: 602, name: "Ghee", price: 350, unit: "500g", image: "https://images.healthshots.com/healthshots/en/uploads/2023/12/19124558/ghee-1.jpg", description: "Pure cow ghee" }
    ],
    7: [
      { id: 701, name: "Potato Chips", price: 20, unit: "packet", image: "https://tse4.mm.bing.net/th/id/OIP.BM-LStUWJ5TjQHIcD2pQ_QHaFj?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Classic salted" },
      { id: 702, name: "Popcorn", price: 25, unit: "packet", image: "https://tse2.mm.bing.net/th/id/OIP.h1tifceAwzQ__5lUbSUlfgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Butter popcorn" }
    ],
    8: [
      { id: 801, name: "Dark Chocolate", price: 120, unit: "100g", image: "https://tse4.mm.bing.net/th/id/OIP.-L6vwraXRYYJ8kvk6y_QSwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3", description: "70% cocoa" },
      { id: 802, name: "Ice Cream", price: 180, unit: "500ml", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=150", description: "Vanilla ice cream" }
    ],
    9: [
      { id: 901, name: "Coca Cola", price: 40, unit: "bottle", image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5307ef37224391.57397a56d79da.jpg", description: "Soft drink" },
      { id: 902, name: "Orange Juice", price: 80, unit: "litre", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=150", description: "Fresh orange juice" }
    ],
    10: [
      { id: 1001, name: "Oreo Biscuits", price: 30, unit: "packet", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=150", description: "Chocolate creme" },
      { id: 1002, name: "Chocolate Cake", price: 250, unit: "slice", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150", description: "Rich chocolate cake" }
    ],
    11: [
      { id: 1101, name: "Instant Noodles", price: 50, unit: "packet", image: "https://m.media-amazon.com/images/I/8175r4+ruSL._SL1500_.jpg", description: "Masala noodles" },
      { id: 1102, name: "Frozen Pizza", price: 150, unit: "piece", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150", description: "Margherita pizza" }
    ]
  };

  useEffect(() => {
    if (location.state?.categoryName) {
      const category = categories.find(c => c.name === location.state.categoryName);
      if (category) {
        setSelectedCategory(category);
      }
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

  const addToCart = (product) => {
    const existing = cart.find(p => p.id === product.id);
    let newCart;
    if (existing) {
      newCart = cart.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
    } else {
      newCart = [...cart, { ...product, quantity: 1, image: product.image }];
    }
    saveCart(newCart);
  };

  const updateQuantity = (productId, delta) => {
    const item = cart.find(p => p.id === productId);
    if (!item) return;
    let newCart;
    if (item.quantity + delta <= 0) {
      newCart = cart.filter(p => p.id !== productId);
    } else {
      newCart = cart.map(p => p.id === productId ? { ...p, quantity: p.quantity + delta } : p);
    }
    saveCart(newCart);
  };

  const getCartTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (selectedCategory) {
    const products = productsByCategory[selectedCategory.id] || [];
    return (
      <div className="instamart-page">
        <div className="instamart-header">
          <div className="container">
            <button className="back-btn" onClick={() => setSelectedCategory(null)}>
              <FaArrowLeft /> Back to Categories
            </button>
            <h1>{selectedCategory.name}</h1>
            <p>Shop fresh groceries</p>
          </div>
        </div>
        <div className="container">
          <div className="instamart-layout">
            <div className="products-grid">
              {products.map(product => {
                const cartItem = cart.find(c => c.id === product.id);
                const quantity = cartItem?.quantity || 0;
                return (
                  <div key={product.id} className="product-card">
                    <div className="product-img">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <div className="product-name">{product.name}</div>
                      <div className="product-description">{product.description}</div>
                      <div className="product-price">
                        <FaRupeeSign /> {product.price} / {product.unit}
                      </div>
                    </div>
                    <div className="product-button">
                      {quantity > 0 ? (
                        <div className="quantity-control">
                          <button className="qty-btn" onClick={() => updateQuantity(product.id, -1)}>
                            <FaMinus />
                          </button>
                          <span className="qty-number">{quantity}</span>
                          <button className="qty-btn" onClick={() => updateQuantity(product.id, 1)}>
                            <FaPlus />
                          </button>
                        </div>
                      ) : (
                        <button className="add-product-btn" onClick={() => addToCart(product)}>
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart-sidebar">
              <div className="cart-title"><FaShoppingCart /> Your Cart ({cart.length})</div>
              {cart.length === 0 ? (
                <div className="empty-cart">Cart is empty</div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-details">
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-price">₹{item.price}</div>
                        </div>
                        <div className="cart-item-qty">
                          <button onClick={() => updateQuantity(item.id, -1)}><FaMinus /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><FaPlus /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    <span>Total</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                  <button className="checkout-btn" onClick={() => navigate('/cart')}>Proceed to Checkout</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="instamart-page">
      <div className="instamart-header">
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/')}>
            <FaArrowLeft /> Back to Home
          </button>
          <h1>Instamart</h1>
          <p>Instant grocery delivery in minutes</p>
        </div>
      </div>
      <div className="container">
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card" onClick={() => setSelectedCategory(category)}>
              <div className="category-img-wrapper">
                <img src={category.image} alt={category.name} />
              </div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-count">{category.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instamart;