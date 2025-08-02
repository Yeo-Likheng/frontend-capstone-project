import "../index.css"
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-brand">
            <img src="/logo.jpg" alt="Little Lemon Logo" className="logo-img" />
          </div>
          <div className="nav-menu">
            <div className="nav-links">
              <a href="#home" className="nav-link active">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#menu" className="nav-link">Menu</a>
              <Link to="/reservations">
                <a href="#reservation" className="nav-link">Reservations</a>
              </Link>
              <a href="#order" className="nav-link">Order Online</a>
              <a href="#login" className="nav-link">Login</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
