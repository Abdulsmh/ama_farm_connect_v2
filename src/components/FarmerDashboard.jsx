import { Link } from 'react-router-dom';

export function FarmerDashboard({ products, onEdit, onDelete, onToggleStatus }) {
    const activeProducts = products.filter(p => p.status === 'active');
    const inactiveProducts = products.filter(p => p.status === 'inactive');

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-box text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Products</p>
                            <p className="text-2xl font-bold text-gray-800">{products.length}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-check-circle text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active</p>
                            <p className="text-2xl font-bold text-green-600">{activeProducts.length}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-shopping-bag text-amber-600 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Orders This Month</p>
                            <p className="text-2xl font-bold text-amber-600">24</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-money-bill-wave text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Earnings</p>
                            <p className="text-2xl font-bold text-blue-600">₦124,500</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Your Products</h2>
                </div>

                {products.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-seedling text-gray-400 text-3xl"></i>
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No products listed yet</h3>
                        <p className="text-gray-500 mb-6">Start by listing your first farm product</p>
                        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                            List Your First Product
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {products.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {product.images && product.images[0] ? (
                                                    <img 
                                                        src={product.images[0]} 
                                                        alt={product.name}
                                                        className="w-12 h-12 object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        <i className="fas fa-image text-gray-400"></i>
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-gray-800">{product.name}</p>
                                                    <p className="text-sm text-gray-500">{product.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-green-600">{product.price}</td>
                                        <td className="px-6 py-4 text-gray-600">{product.quantity} {product.unit}</td>
                                        <td className="px-6 py-4 text-gray-600">{product.location}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => onToggleStatus(product.id)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    product.status === 'active' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}
                                            >
                                                {product.status === 'active' ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <button 
                                                    onClick={() => onEdit(product)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Edit"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button 
                                                    onClick={() => onDelete(product.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                                <Link 
                                                    to={`/product/${product.id}`}
                                                    className="text-green-600 hover:text-green-800"
                                                    title="View"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Tips Section */}
            <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="fas fa-lightbulb text-yellow-500"></i>
                    Tips for Successful Selling
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                    <li className="flex items-center gap-2">
                        <i className="fas fa-camera text-green-600"></i>
                        Upload clear photos of your products
                    </li>
                    <li className="flex items-center gap-2">
                        <i className="fas fa-tag text-green-600"></i>
                        Price your products competitively
                    </li>
                    <li className="flex items-center gap-2">
                        <i className="fas fa-check-circle text-green-600"></i>
                        Keep your inventory updated
                    </li>
                    <li className="flex items-center gap-2">
                        <i className="fas fa-comments text-green-600"></i>
                        Respond quickly to customer inquiries
                    </li>
                </ul>
            </div>
        </div>
    );
}