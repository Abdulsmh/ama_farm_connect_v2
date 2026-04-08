import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FarmerProductForm } from '../components/FarmerProductForm';
import { FarmerDashboard } from '../components/FarmerDashboard';

export function SellProductPage() {
    const navigate = useNavigate();
    const [isFarmerLoggedIn, setIsFarmerLoggedIn] = useState(() => {
        return localStorage.getItem('farmerLoggedIn') === 'true';
    });

    // Redirect to signin if not logged in
    useEffect(() => {
        if (!isFarmerLoggedIn) {
            navigate('/signin?type=farmer');
        }
    }, [isFarmerLoggedIn, navigate]);

    const [farmerProducts, setFarmerProducts] = useState(() => {
        const savedProducts = localStorage.getItem('farmerProducts');
        return savedProducts ? JSON.parse(savedProducts) : [];
    });
    
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleLogout = () => {
        localStorage.setItem('farmerLoggedIn', 'false');
        setIsFarmerLoggedIn(false);
    };

    const handleAddProduct = (productData) => {
        // Add platform commission (10%)
        const price = parseInt(productData.price);
        const commission = Math.round(price * 0.1);
        const finalPrice = price + commission;

        const productWithPlatform = {
            ...productData,
            platformPrice: `₦${finalPrice}/${productData.unit}`,
            farmerPayout: `₦${price}/${productData.unit}`,
            commission: '10%',
            status: 'pending_verification', // Products need verification
            dateListed: new Date().toISOString()
        };

        if (editingProduct) {
            // Update existing product
            const updatedProducts = farmerProducts.map(p => 
                p.id === editingProduct.id ? { ...productWithPlatform, id: p.id } : p
            );
            setFarmerProducts(updatedProducts);
            localStorage.setItem('farmerProducts', JSON.stringify(updatedProducts));
            setEditingProduct(null);
        } else {
            // Add new product
            const newProduct = {
                ...productWithPlatform,
                id: Date.now(),
            };
            const updatedProducts = [...farmerProducts, newProduct];
            setFarmerProducts(updatedProducts);
            localStorage.setItem('farmerProducts', JSON.stringify(updatedProducts));
        }
        setShowForm(false);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to remove this product?')) {
            const updatedProducts = farmerProducts.filter(p => p.id !== productId);
            setFarmerProducts(updatedProducts);
            localStorage.setItem('farmerProducts', JSON.stringify(updatedProducts));
        }
    };

    const handleToggleStatus = (productId) => {
        const updatedProducts = farmerProducts.map(p => 
            p.id === productId 
                ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
                : p
        );
        setFarmerProducts(updatedProducts);
        localStorage.setItem('farmerProducts', JSON.stringify(updatedProducts));
    };

    // If not logged in, show nothing while redirecting
    if (!isFarmerLoggedIn) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-green-600 text-white py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Sell on AMA FarmConnect</h1>
                    <p className="text-sm md:text-base text-green-100 max-w-2xl">
                        Reach thousands of customers. We handle quality checks, delivery, and customer service.
                        You focus on growing great products.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                {/* Farmer Info Bar */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-user text-green-600"></i>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-800 text-sm">Alh. Musa Abdullahi</h3>
                            <p className="text-xs text-gray-500">Karari Farm, Kano State</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="text-xs text-gray-500 hover:text-red-600 transition flex items-center gap-1"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        Sign Out
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setShowForm(true);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-plus-circle"></i>
                        List New Product
                    </button>
                    
                    <Link
                        to="/farmer/analytics"
                        className="border border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-chart-line"></i>
                        View Earnings
                    </Link>
                </div>

                {/* Product Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                                <h2 className="font-bold text-gray-800 text-base">
                                    {editingProduct ? 'Edit Product' : 'List New Product'}
                                </h2>
                                <button 
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingProduct(null);
                                    }}
                                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                                >
                                    <i className="fas fa-times text-gray-500"></i>
                                </button>
                            </div>
                            <div className="p-4">
                                <FarmerProductForm 
                                    onSubmit={handleAddProduct}
                                    initialData={editingProduct}
                                    onCancel={() => {
                                        setShowForm(false);
                                        setEditingProduct(null);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Dashboard */}
                <FarmerDashboard 
                    products={farmerProducts}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onToggleStatus={handleToggleStatus}
                />
            </div>
        </div>
    );
}