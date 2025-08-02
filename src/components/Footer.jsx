import "../index.css"
import { MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-container">
              <img src="/logo.jpg" alt="Little Lemon Logo" className="footer-logo-img" />
            </div>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Doormat Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home" className="footer-link">Home</a></li>
              <li><a href="#about" className="footer-link">About</a></li>
              <li><a href="#menu" className="footer-link">Menu</a></li>
              <li><a href="#reservations" className="footer-link">Reservations</a></li>
              <li><a href="#order" className="footer-link">Order Online</a></li>
              <li><a href="#login" className="footer-link">Login</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-contact">
              <li className="contact-item">
                <MapPin className="contact-icon" />
                Address
              </li>
              <li className="contact-item">
                <Phone className="contact-icon" />
                Phone Number
              </li>
              <li className="contact-item">
                <span className="contact-icon">✉</span>
                Email
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Social Media Links</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Facebook</a></li>
              <li><a href="#" className="footer-link">Instagram</a></li>
              <li><a href="#" className="footer-link">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
