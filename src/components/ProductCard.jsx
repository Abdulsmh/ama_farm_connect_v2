import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    // Helper function to get the first image
    const getProductImage = (product) => {
        if (product.images && product.images.length > 0) {
            return product.images[0];
        }
        return product.image || '/placeholder.jpg';
    };

    return (
        <Link to={`/product/${product.id}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden">
                <div className="relative overflow-hidden aspect-square">
                    <img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        onError={(e) => {
                            e.target.src = '/placeholder.jpg';
                        }}
                    />
                    {product.verified && (
                        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <i className="fas fa-check-circle text-xs"></i>
                            Verified
                        </span>
                    )}
                    {product.stock < 20 && (
                        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                            Only {product.stock} left
                        </span>
                    )}
                </div>
                
                <div className="p-3">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-gray-800 text-sm line-clamp-1">{product.name}</h3>
                        <span className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">
                            {product.price}
                        </span>
                    </div>
                    
                    <p className="text-gray-500 text-xs mb-2 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <i className="fas fa-star text-yellow-400 text-xs"></i>
                            <span className="text-gray-600 text-xs ml-1">{product.rating}</span>
                        </div>
                        <span className="text-gray-400 text-xs">
                            {product.sold}+ sold
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                        <i className="fas fa-shield-alt text-green-600 text-xs"></i>
                        <span className="text-green-600 text-xs">AMA Quality Guaranteed</span>
                    </div>
                    
                    <button 
                        onClick={handleAddToCart}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-xs font-medium flex items-center justify-center gap-1"
                    >
                        <i className="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
}