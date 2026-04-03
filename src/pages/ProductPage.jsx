import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Nav';
import { products } from '../components/ProductData';
import { ReviewCard } from '../components/ReviewCard';
import { RelatedProducts } from '../components/RelatedProducts';
import { useCart } from '../context/CartContext';

export function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    
    const product = products.find(p => p.id === parseInt(id));
    
    useEffect(() => {
        if (!product) {
            navigate('/marketplace');
        }
    }, [product, navigate]);

    if (!product) return null;

    const productDetails = {
        ...product,
        itemsSold: product.sold,
        remainingItems: product.stock,
        platform: {
            guarantee: "100% Quality Guarantee",
            delivery: "Fast delivery by AMA partners",
            returns: "Free returns within 24 hours",
            support: "24/7 customer support"
        },
        nutritionInfo: {
            calories: "18 kcal",
            protein: "0.9g",
            carbs: "3.9g",
            fat: "0.2g"
        },
        reviews: [
            {
                id: 1,
                userName: "Amina Y.",
                rating: 5,
                date: "2024-02-15",
                comment: "Very fresh tomatoes! Better than what I get at the market. Will definitely order again.",
                verifiedPurchase: true
            },
            {
                id: 2,
                userName: "Sadiq M.",
                rating: 4,
                date: "2024-02-10",
                comment: "Good quality. Delivery was on time. The tomatoes were a bit small but very fresh.",
                verifiedPurchase: true
            },
            {
                id: 3,
                userName: "Fatima B.",
                rating: 5,
                date: "2024-02-05",
                comment: "My family loves these! They taste like real farm tomatoes.",
                verifiedPurchase: true
            }
        ]
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/checkout');
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<i key={i} className="fas fa-star text-yellow-400 text-sm"></i>);
            } else if (hasHalfStar && i === fullStars + 1) {
                stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400 text-sm"></i>);
            } else {
                stars.push(<i key={i} className="far fa-star text-yellow-400 text-sm"></i>);
            }
        }
        return stars;
    };

    const productImages = product.images || [
            product.image,
            product.image.replace('.jfif', '2.jfif'),
            product.image.replace('.jfif', '3.jfif'),
        ];

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
                {/* Breadcrumb */}
                <div className="flex items-center text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                    <Link to="/" className="hover:text-green-600">Home</Link>
                    <i className="fas fa-chevron-right mx-2 text-[10px]"></i>
                    <Link to="/marketplace" className="hover:text-green-600">Marketplace</Link>
                    <i className="fas fa-chevron-right mx-2 text-[10px]"></i>
                    <Link to={`/category/${product.category}`} className="hover:text-green-600">{product.category}</Link>
                    <i className="fas fa-chevron-right mx-2 text-[10px]"></i>
                    <span className="text-gray-800 truncate max-w-[150px]">{product.name}</span>
                </div>

                {/* Product Main Section */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                    {/* Product Images */}
                    <div>
                        <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 aspect-square">
                            <img 
                                src={productImages[selectedImage]} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = product.image;
                                }}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {productImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                                        selectedImage === index ? 'border-green-600' : 'border-transparent'
                                    }`}
                                >
                                    <img 
                                        src={img} 
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = product.image;
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Category Tag and Verification */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                {product.category}
                            </span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <i className="fas fa-check-circle text-xs"></i>
                                AMA Verified
                            </span>
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                            {product.name}
                        </h1>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center">
                                {renderStars(parseFloat(product.rating))}
                                <span className="text-gray-600 text-sm ml-2">{product.rating}</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-600 text-sm">{productDetails.reviews.length} reviews</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-600 text-sm">{productDetails.itemsSold}+ sold</span>
                        </div>
                        
                        {/* Price */}
                        <div className="mb-4">
                            <p className="text-2xl md:text-3xl font-bold text-green-600">{product.price}</p>
                            {productDetails.remainingItems < 20 && (
                                <p className="text-orange-600 text-xs mt-1">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    Only {productDetails.remainingItems} items left
                                </p>
                            )}
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-600 text-sm md:text-base mb-4">
                            {product.description}
                        </p>
                        
                        {/* Quantity Selector */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Quantity</label>
                            <div className="flex items-center">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 border rounded-l-lg hover:bg-gray-50 transition flex items-center justify-center"
                                >
                                    <i className="fas fa-minus text-xs"></i>
                                </button>
                                <input 
                                    type="number" 
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 h-8 border-t border-b text-center focus:outline-none text-sm"
                                    min="1"
                                    max={productDetails.remainingItems}
                                />
                                <button 
                                    onClick={() => setQuantity(Math.min(productDetails.remainingItems, quantity + 1))}
                                    className="w-8 h-8 border rounded-r-lg hover:bg-gray-50 transition flex items-center justify-center"
                                >
                                    <i className="fas fa-plus text-xs"></i>
                                </button>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-4">
                            <button 
                                onClick={handleAddToCart}
                                className="flex-1 bg-white border-2 border-green-600 text-green-600 px-4 py-2.5 rounded-lg font-medium hover:bg-green-50 transition text-sm flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-shopping-cart"></i>
                                Add to Cart
                            </button>
                            <button 
                                onClick={handleBuyNow}
                                className="flex-1 bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-green-700 transition text-sm flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-bolt"></i>
                                Buy Now
                            </button>
                        </div>
                        
                        {/* AMA Guarantee - REPLACES Farmer Info */}
                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <i className="fas fa-shield-alt text-green-600"></i>
                                AMA FarmConnect Guarantee
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-start gap-2">
                                    <i className="fas fa-check-circle text-green-600 text-sm mt-0.5"></i>
                                    <div>
                                        <p className="text-xs font-medium text-gray-800">Quality Checked</p>
                                        <p className="text-xs text-gray-600">Inspected by our team</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <i className="fas fa-truck text-green-600 text-sm mt-0.5"></i>
                                    <div>
                                        <p className="text-xs font-medium text-gray-800">Fast Delivery</p>
                                        <p className="text-xs text-gray-600">{productDetails.platform.delivery}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <i className="fas fa-undo-alt text-green-600 text-sm mt-0.5"></i>
                                    <div>
                                        <p className="text-xs font-medium text-gray-800">Free Returns</p>
                                        <p className="text-xs text-gray-600">Within 24 hours</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <i className="fas fa-headset text-green-600 text-sm mt-0.5"></i>
                                    <div>
                                        <p className="text-xs font-medium text-gray-800">24/7 Support</p>
                                        <p className="text-xs text-gray-600">We're here to help</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section - same as before */}
                <div className="mb-8 md:mb-12">
                    {/* Tab Headers */}
                    <div className="border-b flex gap-4 md:gap-8 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`pb-2 md:pb-3 font-medium text-sm md:text-base whitespace-nowrap ${
                                activeTab === 'description' 
                                    ? 'text-green-600 border-b-2 border-green-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab('nutrition')}
                            className={`pb-2 md:pb-3 font-medium text-sm md:text-base whitespace-nowrap ${
                                activeTab === 'nutrition' 
                                    ? 'text-green-600 border-b-2 border-green-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Nutrition Info
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`pb-2 md:pb-3 font-medium text-sm md:text-base whitespace-nowrap ${
                                activeTab === 'reviews' 
                                    ? 'text-green-600 border-b-2 border-green-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Reviews ({productDetails.reviews.length})
                        </button>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="py-4 md:py-6">
                        {activeTab === 'description' && (
                            <div className="text-sm md:text-base text-gray-600 space-y-3">
                                <p>{product.description}</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>100% organic and naturally grown</li>
                                    <li>Harvested fresh daily</li>
                                    <li>No preservatives or chemicals</li>
                                    <li>Quality checked by AMA team</li>
                                    <li>Supports local farmers</li>
                                </ul>
                            </div>
                        )}
                        
                        {activeTab === 'nutrition' && (
                            <div>
                                <h4 className="font-medium text-gray-800 mb-3 text-sm">Nutritional Information (per 100g)</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <p className="text-xs text-gray-500">Calories</p>
                                        <p className="text-base font-bold text-gray-800">{productDetails.nutritionInfo.calories}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <p className="text-xs text-gray-500">Protein</p>
                                        <p className="text-base font-bold text-gray-800">{productDetails.nutritionInfo.protein}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <p className="text-xs text-gray-500">Carbs</p>
                                        <p className="text-base font-bold text-gray-800">{productDetails.nutritionInfo.carbs}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <p className="text-xs text-gray-500">Fat</p>
                                        <p className="text-base font-bold text-gray-800">{productDetails.nutritionInfo.fat}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'reviews' && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-gray-800">{product.rating}</p>
                                        <div className="flex items-center mt-1">
                                            {renderStars(parseFloat(product.rating))}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{productDetails.reviews.length} reviews</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    {productDetails.reviews.map(review => (
                                        <ReviewCard key={review.id} review={review} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <RelatedProducts 
                    currentProductId={product.id}
                    category={product.category}
                    products={products}
                />
            </div>
        </div>
    );
}