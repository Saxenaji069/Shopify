import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
// Placeholder for purchase page
import { CartProvider } from './Context/CartContext';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Optional: Custom global styles (if you have a styles.css)
import './App.css';

function Purchase() {
  // You can later move this to its own file
  return <div className="container mt-4"><h2>Purchase Page</h2><p>Checkout details go here.</p></div>;
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="container-fluid px-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/purchase" element={<Purchase />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
