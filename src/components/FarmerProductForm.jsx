import { useState } from 'react';

export function FarmerProductForm({ onSubmit, initialData, onCancel }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        category: initialData?.category || 'Vegetables',
        description: initialData?.description || '',
        price: initialData?.price || '',
        quantity: initialData?.quantity || '',
        unit: initialData?.unit || 'kg',
        location: initialData?.location || '',
        farmName: initialData?.farmName || '',
        harvestDate: initialData?.harvestDate || '',
        organic: initialData?.organic || false,
        deliveryAvailable: initialData?.deliveryAvailable || false,
        images: initialData?.images || [],
        proofDocuments: initialData?.proofDocuments || []
    });

    const categories = ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Legumes', 'Herbs', 'Poultry', 'Meat', 'Honey', 'Other'];
    const units = ['kg', 'g', 'litre', 'crate', 'bundle', 'piece', 'dozen', 'sack'];
    const locations = ['Kano State', 'Kaduna State', 'Benue State', 'Oyo State', 'Lagos State', 'Plateau State', 'Abuja', 'Other'];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...imageUrls]
        }));
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.quantity || !formData.location) {
            alert('Please fill in all required fields');
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                    Product Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Fresh Organic Tomatoes"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                />
            </div>

            {/* Category */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Description */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Describe your product - quality, taste, growing methods, etc."
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                ></textarea>
            </div>

            {/* Price and Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                        Price (₦) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="2000"
                        min="0"
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">You get 90% after 10% platform fee</p>
                </div>
                
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                        Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="100"
                        min="1"
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Unit</label>
                    <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                        {units.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Location and Farm Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                        Location <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                    >
                        <option value="">Select Location</option>
                        {locations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Farm Name</label>
                    <input
                        type="text"
                        name="farmName"
                        value={formData.farmName}
                        onChange={handleInputChange}
                        placeholder="e.g., Karari Farms"
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>
            </div>

            {/* Harvest Date */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Harvest Date</label>
                <input
                    type="date"
                    name="harvestDate"
                    value={formData.harvestDate}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="organic"
                        checked={formData.organic}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600"
                    />
                    <span className="text-sm text-gray-700">Organic / Naturally Grown</span>
                </label>
                
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="deliveryAvailable"
                        checked={formData.deliveryAvailable}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600"
                    />
                    <span className="text-sm text-gray-700">Delivery Available</span>
                </label>
            </div>

            {/* Product Images */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Product Photos</label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer block">
                        <i className="fas fa-cloud-upload-alt text-2xl text-gray-400 mb-1"></i>
                        <p className="text-xs text-gray-600">Click to upload photos</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </label>
                </div>
                
                {formData.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-2">
                        {formData.images.map((img, index) => (
                            <div key={index} className="relative">
                                <img 
                                    src={img} 
                                    alt={`Preview ${index}`}
                                    className="w-full h-16 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Proof of Farming */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                    <i className="fas fa-shield-alt text-green-600 mr-1"></i>
                    Proof of Farming (for verification)
                </label>
                <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    multiple
                    className="w-full text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Upload farm registration or farm photos for verification
                </p>
            </div>

            {/* Platform Info */}
            <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-700 flex items-center gap-1">
                    <i className="fas fa-info-circle"></i>
                    AMA FarmConnect charges 10% commission on sales. We handle delivery, customer service, and quality checks.
                </p>
            </div>

            {/* Form Buttons */}
            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                >
                    {initialData ? 'Update Product' : 'Submit for Verification'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}