import "../index.css";

const Chicago = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <h2 className="about-title">Little Lemon</h2>
            <h3 className="about-subtitle">Chicago</h3>
            <p className="about-description">
              Little Lemon offers an inviting Mediterranean dining experience that balances authenticity with modern presentation. The thoughtful, rotating menu and family lineage behind each dish give it a personal touch. Perfect for diners seeking quality flavor in a casual, warm environment.
            </p>
            <p className="about-description">
              Get the best of both worlds with our traditional recipes and modern twists. Our chefs are dedicated to bringing you the freshest ingredients and the most flavorful dishes, ensuring that every meal is a memorable one.
            </p>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&crop=center" 
              alt="Restaurant interior" 
              className="about-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chicago;