function Contact() {
  return (
    <div className="w-50 mx-auto">
      <h2>Contact Us</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" placeholder="Enter your name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" placeholder="Enter your email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
