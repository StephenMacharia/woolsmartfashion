import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "font-awesome/css/font-awesome.min.css";

// Mock cart count for demonstration (replace with your actual state or context)
const cartItemCount = 3;

const Navbar = () => {
  return (
    <motion.nav
      className="navbar navbar-expand-md navbar-light bg-light shadow-sm mt-1"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="navbar-brand fw-bold">
        Wools<span className="text-primary">MartFashion</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarcontents"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

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

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="/signin" className="btn btn-outline-primary me-2">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="btn btn-outline-primary me-2">Register</Link>
          </li>

          {/* Cart Icon with Badge */}
          <li className="nav-item position-relative me-2">
            <Link to="/cart" className="btn btn-outline-primary position-relative">
              <i className="fa fa-shopping-cart"></i>
              {cartItemCount > 0 && (
                <motion.span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/profile" className="btn btn-outline-primary">
              <i className="fa fa-user"></i>
            </Link>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
