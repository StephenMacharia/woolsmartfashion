import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light shadow-sm mt-1">
   
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand fw-bold">
          Wools<span className="text-primary">MartFashion</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarcontents"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarcontents">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <b><Link to="/" className="nav-link">Home</Link></b>
            </li>
            <li className="nav-item">
              <b><Link to="/addproducts" className="nav-link">Add products</Link></b>
            </li>
            <li className="nav-item">
              <b><Link to="/aboutus" className="nav-link">About us</Link></b>
            </li>
          </ul>

          {/* Authorization Links (Aligned Right) */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/signin" className="btn btn-outline-primary me-2">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="btn btn-outline-primary">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/Cart" className="btn btn-outline-primary me-2">Cart</Link>
            </li>
          </ul>
        </div>
     
    </nav>
  );
};

export default Navbar;