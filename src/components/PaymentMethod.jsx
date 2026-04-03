export function PaymentMethod({ orderDetails, onInputChange, onBack, onNext }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (orderDetails.paymentMethod) {
            onNext();
        } else {
            alert('Please select a payment method');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Method</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="bank_transfer"
                            checked={orderDetails.paymentMethod === 'bank_transfer'}
                            onChange={onInputChange}
                            className="mr-3"
                        />
                        <div className="flex items-center">
                            <i className="fas fa-university text-blue-600 text-xl mr-3"></i>
                            <div>
                                <span className="font-medium text-gray-800">Bank Transfer</span>
                                <p className="text-sm text-gray-500">Pay directly from your bank account</p>
                            </div>
                        </div>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={orderDetails.paymentMethod === 'card'}
                            onChange={onInputChange}
                            className="mr-3"
                        />
                        <div className="flex items-center">
                            <i className="fas fa-credit-card text-green-600 text-xl mr-3"></i>
                            <div>
                                <span className="font-medium text-gray-800">Card Payment</span>
                                <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or Verve</p>
                            </div>
                        </div>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="pay_on_pickup"
                            checked={orderDetails.paymentMethod === 'pay_on_pickup'}
                            onChange={onInputChange}
                            className="mr-3"
                        />
                        <div className="flex items-center">
                            <i className="fas fa-hand-holding-usd text-orange-600 text-xl mr-3"></i>
                            <div>
                                <span className="font-medium text-gray-800">Pay on Pickup</span>
                                <p className="text-sm text-gray-500">Cash payment when you collect your order</p>
                            </div>
                        </div>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="ussd"
                            checked={orderDetails.paymentMethod === 'ussd'}
                            onChange={onInputChange}
                            className="mr-3"
                        />
                        <div className="flex items-center">
                            <i className="fas fa-mobile-alt text-purple-600 text-xl mr-3"></i>
                            <div>
                                <span className="font-medium text-gray-800">USSD</span>
                                <p className="text-sm text-gray-500">Pay using your mobile bank USSD code</p>
                            </div>
                        </div>
                    </label>
                </div>

                {/* Bank Transfer Details (shown if selected) */}
                {orderDetails.paymentMethod === 'bank_transfer' && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold text-gray-800 mb-2">Bank Transfer Details</h3>
                        <p className="text-gray-600">Bank: First Bank of Nigeria</p>
                        <p className="text-gray-600">Account Name: AMA FarmConnect Ltd</p>
                        <p className="text-gray-600">Account Number: 1234567890</p>
                        <p className="text-gray-600 text-sm mt-2">Use your order number as reference</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Continue to Review
                    </button>
                </div>
            </form>
        </div>
    );
}