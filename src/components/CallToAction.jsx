import '../index.css';
import { Link } from 'react-router-dom';
const CallToAction = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">Little Lemon</h1>
            <h2 className="hero-subtitle">Chicago</h2>
            <p className="hero-description">
              We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </p>
            <Link to="/reservations">
                 <button className="cta-button">Reserve a Table</button>
            </Link>
          </div>
          <div className="hero-image">
            <img 
              src="/hero.jpg" 
              alt="Mediterranean dishes" 
              className="hero-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};


export default CallToAction;