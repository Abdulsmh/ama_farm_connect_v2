export function CheckoutForm({ orderDetails, onInputChange, onNext }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (orderDetails.fullName && orderDetails.email && orderDetails.phone && 
            orderDetails.address && orderDetails.city && orderDetails.state) {
            onNext();
        } else {
            alert('Please fill in all required fields');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Contact & Delivery Details</h2>
            
            <div onSubmit={handleSubmit}>
                {/* Contact Information */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-600 mb-1">Full Name *</label>
                            <input
                                type="text"
                                name="fullName"
                                value={orderDetails.fullName}
                                onChange={onInputChange}
                                required
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                placeholder="Abdul Musa"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-600 mb-1">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={orderDetails.email}
                                onChange={onInputChange}
                                required
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                placeholder="abdulmm@example.com"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-600 mb-1">Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={orderDetails.phone}
                                onChange={onInputChange}
                                required
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                placeholder="+234 801 234 5678"
                            />
                        </div>
                    </div>
                </div>

                {/* Delivery Method */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-4">Delivery Method</h3>
                    <div className="space-y-3">
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="deliveryMethod"
                                value="pickup"
                                checked={orderDetails.deliveryMethod === 'pickup'}
                                onChange={onInputChange}
                                className="mr-3"
                            />
                            <div>
                                <span className="font-medium text-gray-800">Pickup at Market</span>
                                <p className="text-sm text-gray-500">Free • Collect from your chosen market location</p>
                            </div>
                        </label>
                        
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="deliveryMethod"
                                value="delivery"
                                checked={orderDetails.deliveryMethod === 'delivery'}
                                onChange={onInputChange}
                                className="mr-3"
                            />
                            <div>
                                <span className="font-medium text-gray-800">Home Delivery</span>
                                <p className="text-sm text-gray-500">₦1,500 • Delivered to your address</p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Pickup Location (if pickup selected) */}
                {orderDetails.deliveryMethod === 'pickup' && (
                    <div className="mb-6">
                        <label className="block text-gray-600 mb-1">Pickup Location *</label>
                        <select
                            name="pickupLocation"
                            value={orderDetails.pickupLocation}
                            onChange={onInputChange}
                            required
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        >
                            <option value="">Select a market</option>
                            <option value="Singer Market, Kano">Singer Market, Kano</option>
                            <option value="Bodija Market, Ibadan">Bodija Market, Ibadan</option>
                            <option value="Terminus Market, Jos">Terminus Market, Jos</option>
                            <option value="Kurmi Market, Kano">Kurmi Market, Kano</option>
                        </select>
                    </div>
                )}

                {/* Delivery Address (if delivery selected) */}
                {orderDetails.deliveryMethod === 'delivery' && (
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-700 mb-4">Delivery Address</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-600 mb-1">Street Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={orderDetails.address}
                                    onChange={onInputChange}
                                    required
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                    placeholder="123 abbagana Street"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-600 mb-1">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={orderDetails.city}
                                        onChange={onInputChange}
                                        required
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                        placeholder="Kano"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={orderDetails.state}
                                        onChange={onInputChange}
                                        required
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                        placeholder="Kano State"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Additional Notes */}
                <div className="mb-6">
                    <label className="block text-gray-600 mb-1">Order Notes (Optional)</label>
                    <textarea
                        name="notes"
                        value={orderDetails.notes}
                        onChange={onInputChange}
                        rows="3"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        placeholder="Any special instructions for the farmer?"
                    ></textarea>
                </div>

                {/* Next Button */}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                    Continue to Payment.
                </button>
            </div>
        </div>
    );
}