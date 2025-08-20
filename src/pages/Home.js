import React, { useState, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import './Home.css';

const productsData = [ { id: 1, name: "Men’s Jacket", desc: "Lightweight jacket", price: 1200, gender: "men", image: "/images/product1.jpg" },
  { id: 2, name: "Women’s Jeans", desc: "Puffed jeans", price: 1500, gender: "women", image: "/images/product2.jpg" },
  { id: 3, name: "Men’s Shirt", desc: "Classic button sleeves", price: 699, gender: "men", image: "/images/product3.jpg" },
  { id: 4, name: "Women’s Sweater", desc: "Cream-lessies", price: 3000, gender: "women", image: "/images/product4.jpg" },
  { id: 5, name: "Men’s Hoodie", desc: "Basic shim-sivet", price: 1800, gender: "men", image: "/images/product5.jpg" },
  { id: 6, name: "Women’s crop top", desc: "Ruched sleeves", price: 1200, gender: "women", image: "/images/product6.jpg" },
  { id: 7, name: "Men’s Polo", desc: "Navy polo", price: 1499, gender: "men", image: "/images/product7.jpg" },
  { id: 8, name: "Women’s Jeans", desc: "Beige stretch jeans", price: 1999, gender: "women", image: "/images/product8.jpg" },
  { id: 9, name: "Men’s T Shirt", desc: "Tee-mye-shirt", price: 788, gender: "men", image: "/images/product9.jpg" },
  { id: 10, name: "Women’s Jumpsuit", desc: "Black-gurmint", price: 149, gender: "women", image: "/images/product10.jpg" },
  { id: 11, name: "Men’s Sweater", desc: "Crew neck", price: 390, gender: "men", image: "/images/product11.jpg" },
  { id: 12, name: "Women’s Cardigan", desc: "Rust-brown shirred", price: 390, gender: "women", image: "/images/product12.jpg" },
  { id: 13, name: "Men’s Pants", desc: "Dant-a cotton pants", price: 399, gender: "men", image: "/images/product13.jpg" },
  { id: 14, name: "Women’s Tank", desc: "Burnt orange top", price: 138, gender: "women", image: "/images/product14.jpg" },
  { id: 15, name: "Men’s Coat", desc: "Off-white formal", price: 799, gender: "men", image: "/images/product15.jpg" },
  { id: 16, name: "Women’s Hoodie", desc: "Dusty rose", price: 7999, gender: "women", image: "/images/product16.jpg" },
  { id: 17, name: "Men’s Denim", desc: "Classic rugged", price: 4999, gender: "men", image: "/images/product17.jpg" },
  { id: 18, name: "Women’s Kurti", desc: "Embroidered festive", price: 2999, gender: "women", image: "/images/product18.jpg" },
  { id: 19, name: "Men’s Joggers", desc: "Slim fit cotton", price: 2589, gender: "men", image: "/images/product19.jpg" },
  { id: 20, name: "Women’s Saree", desc: "Georgette festive wear", price: 5999, gender: "women", image: "/images/product20.jpg" } ];

function Home() {
  const { cartItems, addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const toastRef = useRef();

  const handleAddToCart = (product) => {
    addToCart(product);
    // Show toast
    if (toastRef.current && toastRef.current.classList) {
      toastRef.current.classList.add('show');
      setTimeout(() => {
        if (toastRef.current && toastRef.current.classList) {
          toastRef.current.classList.remove('show');
        }
      }, 1200);
    } else {
      console.warn('Toast ref not attached');
    }
  };

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const price = product.price;
    const matchesFilter =
      filter === "" ||
      filter === "all" ||
      (filter === "men" && product.gender === "men") ||
      (filter === "women" && product.gender === "women") ||
      (filter === "low" && price <= 1500) ||
      (filter === "high" && price > 1500);
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      {/* Top: Enhanced header */}
      <header className="logo-header d-flex align-items-center justify-content-between px-4">
        <div className="header-left d-none d-md-flex gap-3">
          <a href="#offers" className="header-link">Offers</a>
          <a href="#track" className="header-link">Track Order</a>
          <a href="#help" className="header-link">Help</a>
        </div>
        <div className="header-center text-center flex-grow-1">
          <img src="/images/logo.png" alt="Shopify Logo" className="logo" style={{ maxWidth: '120px' }} />
          <h1 className="brand-title mb-0">SHOPIFY</h1>
          <p className="brand-tag mb-0">Your Best Cloth Brand</p>
        </div>
        <div className="header-right d-none d-md-flex gap-3 justify-content-end">
          <a href="#" className="header-icon" title="Instagram"><i className="bi bi-instagram"></i></a>
          <a href="#" className="header-icon" title="Facebook"><i className="bi bi-facebook"></i></a>
          <a href="#" className="header-icon" title="Twitter"><i className="bi bi-twitter"></i></a>
        </div>
      </header>

      {/* Toast notification */}
      <div ref={toastRef} className="custom-toast">Item added to cart!</div>

      <div className="main-wrapper">
        {/* Sidebar navigation */}
        <aside className="sidebar scrollable-sidebar">
          <ul className="nav-list">
            <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
            <li><NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact Us</NavLink></li>
          </ul>
          <div className="filter-box">
            <label htmlFor="filter">Filter:</label>
            <select id="filter" onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="low">Price: Low</option>
              <option value="high">Price: High</option>
            </select>
          </div>
        </aside>

        {/* Main content area */}
        <main className="content-area">
          <div className="top-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Search clothes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="cart-btn"
              onClick={() => navigate('/cart')}
            >
              🛒 Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </button>
          </div>

          <h2 className="section-title">Latest Fashion</h2>

          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col d-flex">
                <div className="product-card flex-fill">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h5>{product.name}</h5>
                    <p>{product.desc}</p>
                    <p className="price">₹{product.price}</p>
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
