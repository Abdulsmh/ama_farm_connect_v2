import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function RelatedProducts({ currentProductId, category, products }) {
    const { addToCart } = useCart();
    
    // Filter related products (same category, exclude current product)
    const relatedProducts = products
        .filter(p => p.category === category && p.id !== currentProductId)
        .slice(0, 4); // Limit to 4 products

    if (relatedProducts.length === 0) return null;

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    // Helper function to get the first image
    const getProductImage = (product) => {
        if (product.images && product.images.length > 0) {
            return product.images[0];
        }
        return product.image || '/placeholder.jpg'; // fallback
    };

    return (
        <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                    <Link 
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
                    >
                        <div className="relative overflow-hidden">
                            <img 
                                src={getProductImage(product)} 
                                alt={product.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                                onError={(e) => {
                                    e.target.src = '/placeholder.jpg'; // fallback if image fails
                                }}
                            />
                        </div>
                        <div className="p-4">
                            <h4 className="font-semibold text-gray-800 mb-1">{product.name}</h4>
                            <p className="text-green-600 font-bold mb-2">{product.price}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <i className="fas fa-star text-yellow-400 text-sm"></i>
                                    <span className="text-gray-600 text-sm ml-1">{product.rating}</span>
                                </div>
                                <button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}