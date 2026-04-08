import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function SignInPage() {
    const [userType, setUserType] = useState('farmer'); // 'farmer' or 'buyer'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In real app, you'd authenticate here
        console.log('Signing in as:', userType, formData);
        
        // Redirect based on user type
        if (userType === 'farmer') {
            localStorage.setItem('farmerLoggedIn', 'true');
            navigate('/sell'); // Farmers go to their dashboard
        } else {
            navigate('/marketplace'); // Buyers go to marketplace
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`Signing in with ${provider}`);
        // Implement social login
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
                {/* Back to Home */}
                <div className="mb-6 md:mb-8">
                    <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 transition text-sm md:text-base">
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Home
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
                    {/* Left Side - Illustration & Info */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8">
                        <div className="text-center mb-6 md:mb-8">
                            <div className="flex items-center justify-center mb-3 md:mb-4">
                                <i className="fas fa-tractor text-green-600 text-2xl md:text-3xl mr-2 md:mr-3"></i>
                                <span className="text-xl md:text-2xl font-bold text-green-800">AMA FarmConnect</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4">Welcome Back!</h1>
                            <p className="text-sm md:text-base text-gray-600">Sign in to access your account and continue your farm-to-table journey</p>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            {/* Farmer Benefits */}
                            <div className={`rounded-xl p-4 md:p-6 border transition-all ${
                                userType === 'farmer' 
                                    ? 'bg-green-50 border-green-300 shadow-md' 
                                    : 'bg-gray-50 border-gray-200 opacity-75'
                            }`}>
                                <div className="flex items-start">
                                    <div className={`p-2 md:p-3 rounded-full mr-3 md:mr-4 ${
                                        userType === 'farmer' ? 'bg-green-100' : 'bg-gray-200'
                                    }`}>
                                        <i className={`fas fa-seedling ${
                                            userType === 'farmer' ? 'text-green-600' : 'text-gray-500'
                                        }`}></i>
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold text-base md:text-lg ${
                                            userType === 'farmer' ? 'text-green-800' : 'text-gray-600'
                                        }`}>For Farmers</h3>
                                        <p className={`text-xs md:text-sm ${
                                            userType === 'farmer' ? 'text-green-700' : 'text-gray-500'
                                        }`}>Manage your products, track orders, and grow your business</p>
                                    </div>
                                </div>
                                {userType === 'farmer' && (
                                    <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-green-700">
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i>
                                            Manage your product listings
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i>
                                            Track orders and payments
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i>
                                            Connect with local buyers
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* Buyer Benefits */}
                            <div className={`rounded-xl p-4 md:p-6 border transition-all ${
                                userType === 'buyer' 
                                    ? 'bg-amber-50 border-amber-300 shadow-md' 
                                    : 'bg-gray-50 border-gray-200 opacity-75'
                            }`}>
                                <div className="flex items-start">
                                    <div className={`p-2 md:p-3 rounded-full mr-3 md:mr-4 ${
                                        userType === 'buyer' ? 'bg-amber-100' : 'bg-gray-200'
                                    }`}>
                                        <i className={`fas fa-shopping-basket ${
                                            userType === 'buyer' ? 'text-amber-600' : 'text-gray-500'
                                        }`}></i>
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold text-base md:text-lg ${
                                            userType === 'buyer' ? 'text-amber-800' : 'text-gray-600'
                                        }`}>For Buyers</h3>
                                        <p className={`text-xs md:text-sm ${
                                            userType === 'buyer' ? 'text-amber-700' : 'text-gray-500'
                                        }`}>Discover fresh produce and support local farmers</p>
                                    </div>
                                </div>
                                {userType === 'buyer' && (
                                    <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-amber-700">
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle text-amber-500 mr-2 text-xs"></i>
                                            Browse fresh local produce
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle text-amber-500 mr-2 text-xs"></i>
                                            Direct communication with farmers
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle text-amber-500 mr-2 text-xs"></i>
                                            Fast and reliable delivery
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4 text-center">
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xl md:text-2xl font-bold text-green-600">500+</p>
                                <p className="text-xs text-gray-600">Farmers</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xl md:text-2xl font-bold text-amber-600">10k+</p>
                                <p className="text-xs text-gray-600">Buyers</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Sign In Form */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8">
                        {/* Toggle Switch */}
                        <div className="mb-6 md:mb-8">
                            <div className="flex bg-gray-100 rounded-lg p-1 relative">
                                {/* Toggle Background */}
                                <div 
                                    className="absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-green-600 to-green-500 rounded-lg transition-transform duration-300 ease-in-out shadow-md"
                                    style={{ transform: `translateX(${userType === 'farmer' ? '0' : '100%'})` }}
                                ></div>

                                {/* Farmer Button */}
                                <button
                                    type="button"
                                    onClick={() => setUserType('farmer')}
                                    className={`flex-1 py-2.5 md:py-3 px-3 md:px-6 rounded-lg text-center font-semibold transition relative z-10 text-sm md:text-base ${
                                        userType === 'farmer' ? 'text-white' : 'text-gray-600'
                                    }`}
                                >
                                    <i className="fas fa-seedling mr-1 md:mr-2"></i>
                                    <span className="hidden xs:inline">Farmer</span>
                                    <span className="xs:hidden">Farm</span>
                                </button>

                                {/* Buyer Button */}
                                <button
                                    type="button"
                                    onClick={() => setUserType('buyer')}
                                    className={`flex-1 py-2.5 md:py-3 px-3 md:px-6 rounded-lg text-center font-semibold transition relative z-10 text-sm md:text-base ${
                                        userType === 'buyer' ? 'text-white' : 'text-gray-600'
                                    }`}
                                >
                                    <i className="fas fa-shopping-basket mr-1 md:mr-2"></i>
                                    <span className="hidden xs:inline">Buyer</span>
                                    <span className="xs:hidden">Buy</span>
                                </button>
                            </div>
                        </div>

                        {/* Farmer Sign In Form */}
                        <form 
                            onSubmit={handleSubmit}
                            className={`space-y-4 md:space-y-6 transition-all duration-300 ${
                                userType === 'farmer' ? 'block' : 'hidden'
                            }`}
                        >
                            <div className="text-center mb-4 md:mb-6">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Farmer Sign In</h2>
                                <p className="text-xs md:text-sm text-gray-600">Access your farming dashboard</p>
                            </div>

                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    <i className="fas fa-envelope mr-1 md:mr-2 text-green-600"></i>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                                    placeholder="farmer@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    <i className="fas fa-lock mr-1 md:mr-2 text-green-600"></i>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500 w-4 h-4"
                                    />
                                    <span className="ml-2 text-xs md:text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link to="/forgot-password" className="text-xs md:text-sm text-green-600 hover:text-green-700 transition">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:from-green-700 hover:to-green-600 transition font-semibold text-sm md:text-base shadow-md hover:shadow-lg"
                            >
                                <i className="fas fa-sign-in-alt mr-2"></i>
                                Sign In as Farmer
                            </button>

                            <div className="text-center">
                                <p className="text-xs md:text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to="/signup?type=farmer" className="text-green-600 hover:text-green-700 font-semibold transition">
                                        Sign up as Farmer
                                    </Link>
                                </p>
                            </div>
                        </form>

                        {/* Buyer Sign In Form */}
                        <form 
                            onSubmit={handleSubmit}
                            className={`space-y-4 md:space-y-6 transition-all duration-300 ${
                                userType === 'buyer' ? 'block' : 'hidden'
                            }`}
                        >
                            <div className="text-center mb-4 md:mb-6">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Buyer Sign In</h2>
                                <p className="text-xs md:text-sm text-gray-600">Access your shopping dashboard</p>
                            </div>

                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    <i className="fas fa-envelope mr-1 md:mr-2 text-amber-600"></i>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
                                    placeholder="buyer@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    <i className="fas fa-lock mr-1 md:mr-2 text-amber-600"></i>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                                    />
                                    <span className="ml-2 text-xs md:text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link to="/forgot-password" className="text-xs md:text-sm text-amber-600 hover:text-amber-700 transition">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Social Login for Buyers */}
                            <div className="space-y-2 md:space-y-3">
                                <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:from-amber-700 hover:to-amber-600 transition font-semibold text-sm md:text-base shadow-md hover:shadow-lg"
                            >
                                <i className="fas fa-sign-in-alt mr-2"></i>
                                Sign In as Buyer
                            </button>
                            
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('facebook')}
                                    className="w-full bg-[#1877f2] text-white py-2.5 md:py-3 px-4 rounded-lg hover:bg-[#166fe5] transition font-semibold text-sm md:text-base flex items-center justify-center gap-2"
                                >
                                    <i className="fab fa-facebook"></i>
                                    Continue with Facebook
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('google')}
                                    className="w-full bg-[#ea4335] text-white py-2.5 md:py-3 px-4 rounded-lg hover:bg-[#d33426] transition font-semibold text-sm md:text-base flex items-center justify-center gap-2"
                                >
                                    <i className="fab fa-google"></i>
                                    Continue with Google
                                </button>
                            </div>


                            <div className="text-center">
                                <p className="text-xs md:text-sm text-gray-600">
                                    New to FarmConnect?{' '}
                                    <Link to="/signup?type=buyer" className="text-amber-600 hover:text-amber-700 font-semibold transition">
                                        Create Buyer Account
                                    </Link>
                                </p>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="my-4 md:my-6 flex items-center">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="px-3 md:px-4 text-xs text-gray-500">or</span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        {/* Guest Access */}
                        <div className="text-center">
                            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">Just want to browse?</p>
                            <Link
                                to="/marketplace"
                                className="inline-block border border-gray-300 text-gray-700 py-2 px-4 md:px-6 rounded-lg hover:bg-gray-50 transition text-xs md:text-sm"
                            >
                                Continue as Guest
                            </Link>
                        </div>

                        {/* Demo Info */}
                        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg">
                            <p className="text-xs text-blue-700 flex items-center gap-1">
                                <i className="fas fa-info-circle"></i>
                                Demo: Click Sign In to continue (no real authentication)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/*custom styles for xs breakpoint */}
            <style>{`
                @media (min-width: 480px) {
                    .xs\\:inline {
                        display: inline;
                    }
                    .xs\\:hidden {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
}