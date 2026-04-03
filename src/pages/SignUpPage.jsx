import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function SignUpPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const defaultType = queryParams.get('type') === 'farmer' ? 'farmer' : 'buyer';
    
    const [userType, setUserType] = useState(defaultType);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
        // Farmer specific fields
        farmName: '',
        farmLocation: '',
        farmSize: '',
        yearsExperience: ''
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
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        console.log('Signing up as:', userType, formData);
        
        // If farmer, set farmer logged in
        if (userType === 'farmer') {
            localStorage.setItem('farmerLoggedIn', 'true');
        }
        
        // Redirect to sign in
        navigate('/signin');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                {/* Back to Home */}
                <div className="mb-6 md:mb-8">
                    <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 transition text-sm md:text-base">
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Home
                    </Link>
                </div>

                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8">
                    {/* Header */}
                    <div className="text-center mb-6 md:mb-8">
                        <div className="flex items-center justify-center mb-3">
                            <i className="fas fa-tractor text-green-600 text-2xl md:text-3xl mr-2"></i>
                            <span className="text-xl md:text-2xl font-bold text-green-800">AMA FarmConnect</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Create Your Account</h1>
                        <p className="text-sm md:text-base text-gray-600">Join our farm-to-table community today</p>
                    </div>

                    {/* User Type Toggle */}
                    <div className="max-w-md mx-auto mb-6 md:mb-8">
                        <div className="flex bg-gray-100 rounded-lg p-1 relative">
                            <div 
                                className="absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-green-600 to-green-500 rounded-lg transition-transform duration-300 ease-in-out shadow-md"
                                style={{ transform: `translateX(${userType === 'farmer' ? '0' : '100%'})` }}
                            ></div>
                            
                            <button
                                type="button"
                                onClick={() => setUserType('farmer')}
                                className={`flex-1 py-2.5 md:py-3 px-3 rounded-lg text-center font-semibold transition relative z-10 text-sm md:text-base ${
                                    userType === 'farmer' ? 'text-white' : 'text-gray-600'
                                }`}
                            >
                                <i className="fas fa-seedling mr-2"></i>
                                Join as Farmer
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => setUserType('buyer')}
                                className={`flex-1 py-2.5 md:py-3 px-3 rounded-lg text-center font-semibold transition relative z-10 text-sm md:text-base ${
                                    userType === 'buyer' ? 'text-white' : 'text-gray-600'
                                }`}
                            >
                                <i className="fas fa-shopping-basket mr-2"></i>
                                Join as Buyer
                            </button>
                        </div>
                    </div>

                    {/* Sign Up Form */}
                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 md:space-y-6">
                        {/* Common Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                    <i className={`fas fa-user mr-2 ${userType === 'farmer' ? 'text-green-600' : 'text-amber-600'}`}></i>
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                                    placeholder="Abdul Musa"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                    <i className={`fas fa-envelope mr-2 ${userType === 'farmer' ? 'text-green-600' : 'text-amber-600'}`}></i>
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                    <i className={`fas fa-phone mr-2 ${userType === 'farmer' ? 'text-green-600' : 'text-amber-600'}`}></i>
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                                    placeholder="+234 801 234 5678"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                    <i className={`fas fa-lock mr-2 ${userType === 'farmer' ? 'text-green-600' : 'text-amber-600'}`}></i>
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                    <i className={`fas fa-lock mr-2 ${userType === 'farmer' ? 'text-green-600' : 'text-amber-600'}`}></i>
                                    Confirm Password *
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            
                            {userType === 'farmer' && (
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                        <i className="fas fa-map-marker-alt mr-2 text-green-600"></i>
                                        Farm Location *
                                    </label>
                                    <select
                                        name="farmLocation"
                                        value={formData.farmLocation}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                                        required
                                    >
                                        <option value="">Select Location</option>
                                        <option value="Kano State">Kano State</option>
                                        <option value="Kaduna State">Kaduna State</option>
                                        <option value="Benue State">Benue State</option>
                                        <option value="Oyo State">Oyo State</option>
                                        <option value="Lagos State">Lagos State</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Farmer-specific fields */}
                        {userType === 'farmer' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                        Farm Name
                                    </label>
                                    <input
                                        type="text"
                                        name="farmName"
                                        value={formData.farmName}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                                        placeholder="Karari Farms"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                        Farm Size (hectares)
                                    </label>
                                    <input
                                        type="number"
                                        name="farmSize"
                                        value={formData.farmSize}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                                        placeholder="5"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                                        Years Experience
                                    </label>
                                    <input
                                        type="number"
                                        name="yearsExperience"
                                        value={formData.yearsExperience}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                                        placeholder="3"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Terms and Conditions */}
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleInputChange}
                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 w-4 h-4"
                                    required
                                />
                                <span className="ml-2 text-xs md:text-sm text-gray-600">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-green-600 hover:text-green-700">Terms of Service</Link>
                                    {' '}and{' '}
                                    <Link to="/privacy" className="text-green-600 hover:text-green-700">Privacy Policy</Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full text-white py-3 px-6 rounded-lg hover:opacity-90 transition font-semibold text-sm md:text-base shadow-md hover:shadow-lg ${
                                userType === 'farmer' 
                                    ? 'bg-gradient-to-r from-green-600 to-green-500' 
                                    : 'bg-gradient-to-r from-amber-600 to-amber-500'
                            }`}
                        >
                            <i className="fas fa-user-plus mr-2"></i>
                            Create {userType === 'farmer' ? 'Farmer' : 'Buyer'} Account
                        </button>

                        {/* Sign In Link */}
                        <div className="text-center">
                            <p className="text-xs md:text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/signin" className={`font-semibold transition ${
                                    userType === 'farmer' ? 'text-green-600 hover:text-green-700' : 'text-amber-600 hover:text-amber-700'
                                }`}>
                                    Sign In
                                </Link>
                            </p>
                        </div>

                        {/* Demo Info */}
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs text-blue-700 flex items-center gap-1">
                                <i className="fas fa-info-circle"></i>
                                Demo: Fill and submit to continue (no real account created)
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}