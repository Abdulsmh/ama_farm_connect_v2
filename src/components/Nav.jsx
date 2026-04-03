import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsAccountMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <i className="fas fa-tractor text-green-600 text-2xl"></i>
            <span className="text-xl font-bold text-green-800 hidden sm:inline">AMA FarmConnect</span>
            <span className="text-xl font-bold text-green-800 sm:hidden">AMA</span>
          </Link>

          {/* Desktop Menu - Optimized */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition text-sm font-medium">Home</Link>
            <Link to="/marketplace" className="text-gray-700 hover:text-green-600 transition text-sm font-medium">Marketplace</Link>
            
            {/* Hide on medium, show on large */}
            <Link to="/how-it-works" className="hidden lg:block text-gray-700 hover:text-green-600 transition text-sm font-medium">
              How It Works
            </Link>
            
            {/* Sell Link - subtle style */}
            <Link to="/sell" className="text-gray-700 hover:text-green-600 transition text-sm font-medium">
              Sell
            </Link>
            
            {/* Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-gray-700 hover:text-green-600 transition text-lg relative p-1"
            >
              <i className="fas fa-shopping-cart"></i>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Account Dropdown - Clean and compact */}
            <div className="relative">
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition text-sm font-medium"
              >
                <i className="fas fa-user-circle"></i>
                <span className="hidden lg:inline">Account</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              
              {/* Dropdown Menu */}
              {isAccountMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsAccountMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link 
                      to="/signin" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      <i className="fas fa-sign-in-alt w-5 text-green-600"></i>
                      Sign In
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      <i className="fas fa-user-plus w-5 text-green-600"></i>
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile - Keep as is but maybe simplify */}
          <div className="md:hidden flex items-center space-x-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-gray-700 hover:text-green-600 transition text-lg relative p-1"
            >
              <i className="fas fa-shopping-cart"></i>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 p-1 focus:outline-none"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Simplified */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-700 hover:text-green-600 transition py-2 px-2 text-sm" onClick={toggleMobileMenu}>Home</Link>
              <Link to="/marketplace" className="text-gray-700 hover:text-green-600 transition py-2 px-2 text-sm" onClick={toggleMobileMenu}>Marketplace</Link>
              <Link to="/how-it-works" className="text-gray-700 hover:text-green-600 transition py-2 px-2 text-sm" onClick={toggleMobileMenu}>How It Works</Link>
              <Link to="/sell" className="text-gray-700 hover:text-green-600 transition py-2 px-2 text-sm" onClick={toggleMobileMenu}>Sell on AMA</Link>
              <div className="border-t my-2"></div>
              <Link to="/signin" className="text-gray-700 hover:text-green-600 transition py-2 px-2 text-sm" onClick={toggleMobileMenu}>
                <i className="fas fa-sign-in-alt mr-2 text-green-600"></i>
                Sign In
              </Link>
              <Link to="/signup" className="text-gray-700 hover:text-green-600 transition py-2 px-2 text-sm" onClick={toggleMobileMenu}>
                <i className="fas fa-user-plus mr-2 text-green-600"></i>
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;