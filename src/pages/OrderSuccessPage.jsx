import { Link, useLocation } from 'react-router-dom';

export function OrderSuccessPage() {
    const location = useLocation();
    const orderData = location.state?.orderData;

    return (
        <div>
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-check text-green-600 text-4xl"></i>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
                    <p className="text-gray-600 mb-6">
                        Thank you for your order. You will receive a confirmation email shortly.
                    </p>
                    
                    {orderData && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                            <p className="text-sm text-gray-500 mb-1">Order Number</p>
                            <p className="font-mono font-bold text-gray-800">{orderData.orderId}</p>
                            
                            <p className="text-sm text-gray-500 mt-3 mb-1">Total Amount</p>
                            <p className="text-xl font-bold text-green-600">NGN{orderData.total.toLocaleString()}</p>
                        </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/marketplace"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                        >
                            Continue Shopping
                        </Link>
                        <Link 
                            to="/orders"
                            className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition"
                        >
                            View My Orders
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}