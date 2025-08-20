import React, { useState } from 'react';
import { useCart } from '../Context/CartContext'; 

function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart(); 
  const [showForm, setShowForm] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [customer, setCustomer] = useState({ name: '', address: '', phone: '' });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.05;
  const delivery = cartItems.length > 0 ? 50 : 0;
  const total = subtotal + gst + delivery;

  const handleFormChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleBuyNow = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setShowBill(true);
  };

  const handleOrder = () => {
    alert('Order successful!');
    setShowBill(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <>
          <div className="row g-3">
            {cartItems.map(item => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <img src={item.image} className="card-img-top" alt={item.name} style={{height: '180px', objectFit: 'cover'}} />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.desc}</p>
                    <div className="d-flex align-items-center mb-2">
                      <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span className="fw-bold mx-2">{item.quantity}</span>
                      <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-success">₹{item.price * item.quantity}</span>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!showForm && !showBill && (
            <div className="mt-4 text-end">
              <button className="btn btn-success px-4" onClick={handleBuyNow}>Buy Now</button>
            </div>
          )}
        </>
      )}
      {showForm && (
        <div className="mt-4">
          <h4>Delivery Details</h4>
          <form onSubmit={handleFormSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={customer.name} onChange={handleFormChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" name="phone" value={customer.phone} onChange={handleFormChange} required />
            </div>
            <div className="col-12">
              <label className="form-label">Address</label>
              <textarea className="form-control" name="address" value={customer.address} onChange={handleFormChange} required />
            </div>
            <div className="col-12 text-end">
              <button type="submit" className="btn btn-primary">Continue to Bill</button>
            </div>
          </form>
        </div>
      )}
      {showBill && (
        <div className="mt-4">
          <h4>Order Bill</h4>
          <div className="card p-3 mb-3">
            <div><strong>Name:</strong> {customer.name}</div>
            <div><strong>Phone:</strong> {customer.phone}</div>
            <div><strong>Address:</strong> {customer.address}</div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end">Subtotal</td>
                <td>₹{subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end">GST (5%)</td>
                <td>₹{gst.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end">Delivery</td>
                <td>₹{delivery.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end fw-bold">Total</td>
                <td className="fw-bold">₹{total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <div className="text-end">
            <button className="btn btn-success px-4" onClick={handleOrder}>Confirm Order</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
