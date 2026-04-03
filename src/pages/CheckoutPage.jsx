import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Nav';
import { CheckoutForm } from '../components/CheckoutForm';
import { OrderSummary } from '../components/OrderSummary';
import { PaymentMethod } from '../components/PaymentMethod';

export function CheckoutPage() {
    const { cartItems, getTotalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [orderDetails, setOrderDetails] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pickupLocation: '',
        deliveryMethod: 'pickup', // 'pickup' or 'delivery'
        paymentMethod: 'bank_transfer',
        notes: ''
    });

    const totalPrice = getTotalPrice();
    const deliveryFee = orderDetails.deliveryMethod === 'delivery' ? 1500 : 0;
    const grandTotal = totalPrice + deliveryFee;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        
        // In a real app, you'd send this to your backend
        const orderData = {
            ...orderDetails,
            items: cartItems,
            subtotal: totalPrice,
            deliveryFee,
            total: grandTotal,
            orderDate: new Date().toISOString(),
            orderId: 'ORD-' + Date.now()
        };
        
        console.log('Order placed:', orderData);
        
        // Save order to localStorage for demo
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart and redirect to success page
        clearCart();
        navigate('/order-success', { state: { orderData } });
    };

    if (cartItems.length === 0) {
        return (
            <div>
                <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                    <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Add some products to your cart before checkout</p>
                    <Link 
                        to="/marketplace"
                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Link to="/" className="hover:text-green-600">Home</Link>
                    <i className="fas fa-chevron-right mx-2 text-xs"></i>
                    <Link to="/cart" className="hover:text-green-600">Cart</Link>
                    <i className="fas fa-chevron-right mx-2 text-xs"></i>
                    <span className="text-gray-800">Checkout</span>
                </div>

                {/* Checkout Steps */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            currentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                            1
                        </div>
                        <span className="mx-2 text-gray-600">Details</span>
                    </div>
                    <div className="w-12 h-1 mx-2 bg-gray-200">
                        <div className={`h-full ${currentStep >= 2 ? 'bg-green-600' : ''}`}></div>
                    </div>
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                            2
                        </div>
                        <span className="mx-2 text-gray-600">Payment</span>
                    </div>
                    <div className="w-12 h-1 mx-2 bg-gray-200">
                        <div className={`h-full ${currentStep >= 3 ? 'bg-green-600' : ''}`}></div>
                    </div>
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            currentStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                            3
                        </div>
                        <span className="mx-2 text-gray-600">Confirm</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - 2 columns */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmitOrder}>
                            {currentStep === 1 && (
                                <CheckoutForm 
                                    orderDetails={orderDetails}
                                    onInputChange={handleInputChange}
                                    onNext={() => setCurrentStep(2)}
                                />
                            )}
                            
                            {currentStep === 2 && (
                                <PaymentMethod 
                                    orderDetails={orderDetails}
                                    onInputChange={handleInputChange}
                                    onBack={() => setCurrentStep(1)}
                                    onNext={() => setCurrentStep(3)}
                                />
                            )}
                            
                            {currentStep === 3 && (
                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Your Order</h2>
                                    
                                    {/* Order Details Summary */}
                                    <div className="space-y-4 mb-6">
                                        <div className="border-b pb-4">
                                            <h3 className="font-semibold text-gray-700 mb-2">Contact Information</h3>
                                            <p className="text-gray-600">{orderDetails.fullName}</p>
                                            <p className="text-gray-600">{orderDetails.email}</p>
                                            <p className="text-gray-600">{orderDetails.phone}</p>
                                        </div>
                                        
                                        <div className="border-b pb-4">
                                            <h3 className="font-semibold text-gray-700 mb-2">Delivery Details</h3>
                                            <p className="text-gray-600">{orderDetails.address}</p>
                                            <p className="text-gray-600">{orderDetails.city}, {orderDetails.state}</p>
                                            <p className="text-gray-600">
                                                Method: {orderDetails.deliveryMethod === 'pickup' ? 'Pickup at Market' : 'Home Delivery'}
                                            </p>
                                            {orderDetails.deliveryMethod === 'pickup' && (
                                                <p className="text-gray-600">Location: {orderDetails.pickupLocation}</p>
                                            )}
                                        </div>
                                        
                                        <div className="border-b pb-4">
                                            <h3 className="font-semibold text-gray-700 mb-2">Payment Method</h3>
                                            <p className="text-gray-600 capitalize">
                                                {orderDetails.paymentMethod.replace('_', ' ')}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(2)}
                                            className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                                        >
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                    
                    {/* Order Summary - 1 column */}
                    <div className="lg:col-span-1">
                        <OrderSummary 
                            cartItems={cartItems}
                            totalPrice={totalPrice}
                            deliveryFee={deliveryFee}
                            grandTotal={grandTotal}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}