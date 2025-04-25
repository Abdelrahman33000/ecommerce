import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaInfoCircle, FaPhone, FaUser, FaBars, FaTimes, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext'; 

const navLinks = [
  { name: 'Home', path: '/home', icon: <FaHome /> },
  { name: 'Cart', path: '/cart', icon: <FaShoppingCart /> },
  { name: 'About', path: '/about', icon: <FaInfoCircle /> },
  { name: 'Contact', path: '/contact', icon: <FaPhone className="transform -scale-x-100"  /> }
];

const Navbar = () => {
  const { user, logout } = useUser();
  const { cart } = useCart(); 
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); 

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 z-50">
      <div className="mx-auto px-7 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-white">🛍️ MyStore</Link>

       
        <ul className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.path} className="relative flex items-center gap-1 text-gray-700 dark:text-white hover:text-blue-300">
              {link.name === 'Cart' && totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
              {link.icon}
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
          {user ? (
            <>
              <li className="text-sm font-medium text-gray-800 dark:text-gray-200">
                <FaUser className="inline mr-1" />
                {user.firstName} {user.lastName}
              </li>
              <li>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
              >
                <FaSignInAlt /> Login
              </Link>
            </li>
          )}
        </ul>

        <div className="md:hidden text-2xl text-blue-600 dark:text-white cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-4 px-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className="flex items-center gap-2 text-gray-700 dark:text-white"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <p className="text-sm text-gray-700 dark:text-white">
                <FaUser className="inline mr-1" />
                {user.firstName} {user.lastName}
              </p>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              <FaSignInAlt /> Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
