import { Link } from 'react-router-dom';

const getProductImage = (item) => {
    if(item.images && item.images > 0){
        return item.images[0];
    }
    if (item.image){
        return item.image;
    }
    return '/placeholder.jfif';
}

export function OrderSummary({ cartItems, totalPrice, deliveryFee, grandTotal }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            
            {/* Items List */}
            <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3">
                        <img 
                            src={getProductImage(item)} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                                e.target.src = '/placeholder.jfif'
                            }}
                        />
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            <p className="text-green-600 font-semibold text-sm">{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Price Breakdown */}
            <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>NGN{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'Free' : `NGN${deliveryFee.toLocaleString()}`}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-gray-800">
                        <span>Total</span>
                        <span className="text-green-600">NGN{grandTotal.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            {/* Continue Shopping Link */}
            <Link 
                to="/marketplace"
                className="block text-center text-green-600 hover:text-green-700 mt-4 text-sm"
            >
                <i className="fas fa-arrow-left mr-1"></i>
                Continue Shopping
            </Link>
        </div>
    );
}