import { Link } from 'react-router-dom';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
                    {/* Company Info - Made more prominent */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="bg-green-600 p-2 rounded-lg">
                                <i className="fas fa-tractor text-white text-xl"></i>
                            </div>
                            <span className="text-xl font-bold text-white">AMA FarmConnect</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Connecting local farmers directly with consumers for fresh, sustainable produce. 
                            Building a stronger agricultural community, one harvest at a time.
                        </p>
                        
                        {/* Social Media Links - New addition */}
                        <div className="flex space-x-4 pt-2">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition"
                            >
                                <i className="fab fa-facebook-f text-sm"></i>
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition"
                            >
                                <i className="fab fa-twitter text-sm"></i>
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition"
                            >
                                <i className="fab fa-instagram text-sm"></i>
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition"
                            >
                                <i className="fab fa-linkedin-in text-sm"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links - Enhanced with icons */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 flex items-center">
                            <i className="fas fa-link text-green-500 mr-2 text-sm"></i>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition flex items-center group">
                                    <i className="fas fa-chevron-right text-xs mr-2 text-green-500 group-hover:translate-x-1 transition"></i>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/marketplace" className="text-gray-400 hover:text-white transition flex items-center group">
                                    <i className="fas fa-chevron-right text-xs mr-2 text-green-500 group-hover:translate-x-1 transition"></i>
                                    Marketplace
                                </Link>
                            </li>
                            <li>
                                <Link to="/sell" className="text-gray-400 hover:text-white transition flex items-center group">
                                    <i className="fas fa-chevron-right text-xs mr-2 text-green-500 group-hover:translate-x-1 transition"></i>
                                    For Farmers
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-white transition flex items-center group">
                                    <i className="fas fa-chevron-right text-xs mr-2 text-green-500 group-hover:translate-x-1 transition"></i>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-400 hover:text-white transition flex items-center group">
                                    <i className="fas fa-chevron-right text-xs mr-2 text-green-500 group-hover:translate-x-1 transition"></i>
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support - Enhanced */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 flex items-center">
                            <i className="fas fa-headset text-green-500 mr-2 text-sm"></i>
                            Support
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/help" className="text-gray-400 hover:text-white transition flex items-center group">
                                    <i className="fas fa-life-ring text-xs mr-2 text-green-500"></i>
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-white transition flex items-center group">
                                    <i className="fas fa-envelope text-xs mr-2 text-green-500"></i>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-400 hover:text-white transition flex items-center group">
                                    <i className="fas fa-shield-alt text-xs mr-2 text-green-500"></i>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-400 hover:text-white transition flex items-center group">
                                    <i className="fas fa-file-contract text-xs mr-2 text-green-500"></i>
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-gray-400 hover:text-white transition flex items-center group">
                                    <i className="fas fa-question-circle text-xs mr-2 text-green-500"></i>
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact - Enhanced with better formatting */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 flex items-center">
                            <i className="fas fa-map-marker-alt text-green-500 mr-2 text-sm"></i>
                            Get in Touch
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <i className="fas fa-envelope text-green-500 mt-1 mr-3"></i>
                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <a href="mailto:hello@amafarmconnect.com" className="text-white hover:text-green-500 transition text-sm">
                                        hello@amafarmconnect.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <i className="fas fa-phone-alt text-green-500 mt-1 mr-3"></i>
                                <div>
                                    <p className="text-gray-400 text-sm">Phone</p>
                                    <a href="tel:+2349039089233" className="text-white hover:text-green-500 transition text-sm">
                                        +234 90-3908-9233
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <i className="fas fa-map-marker-alt text-green-500 mt-1 mr-3"></i>
                                <div>
                                    <p className="text-gray-400 text-sm">Office</p>
                                    <p className="text-white text-sm">Fagge D1, Kano</p>
                                    <p className="text-white text-sm">Nigeria</p>
                                </div>
                            </li>
                        </ul>

                        {/* Business Hours - New addition */}
                        <div className="mt-4 pt-4 border-t border-gray-800">
                            <p className="text-gray-400 text-xs flex items-center">
                                <i className="fas fa-clock text-green-500 mr-2"></i>
                                Mon - Sat: 8:00 AM - 6:00 PM
                            </p>
                        </div>
                    </div>
                </div>

                {/* Newsletter Signup - New section */}
                <div className="border-t border-gray-800 pt-8 pb-6">
                    <div className="max-w-2xl mx-auto text-center">
                        <h4 className="text-white font-semibold mb-2">Fresh from the farm to your inbox</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to get updates on new products, seasonal offers, and farming stories.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                            />
                            <button 
                                type="submit"
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar - Enhanced */}
                <div className="border-t border-gray-800 pt-6 mt-4">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
                        <p>&copy; {currentYear} AMA FarmConnect. All rights reserved.</p>
                        <div className="flex space-x-6 mt-2 md:mt-0">
                            <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
                            <Link to="/terms" className="hover:text-white transition">Terms</Link>
                            <Link to="/cookies" className="hover:text-white transition">Cookies</Link>
                            <Link to="/accessibility" className="hover:text-white transition">Accessibility</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}