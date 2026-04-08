import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function CartSidebar() {
    const { 
        cartItems, 
        isCartOpen, 
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        formatPrice
    } = useCart();

    const totalPrice = getTotalPrice();
    const formattedTotal = totalPrice.toLocaleString();
    const [animatedItem, setAnimatedItem] = useState(null);
    const [celebration, setCelebration] = useState(false);

    useEffect(() => {
        if (cartItems.length > 0) {
            setCelebration(true);
            setTimeout(() => setCelebration(false), 1500);
        }
    }, [cartItems.length]);

    if (!isCartOpen) return null;

    //making the function that will handle the image preview not showing
    const getProductImage = (item) => {
        if(item.images && item.images > 0){
            return item.images[0];
        }
        if(item.image){
            return item.image;
        }
        return '/placeholder.jfif'
    }

    return (
        <>
            <div 
                className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />
            
            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto animate-slideIn">
                {/* Header */}
                <div className="sticky top-0 bg-green-600 text-white p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-base flex items-center gap-2">
                            <i className="fas fa-shopping-basket"></i>
                            Your Cart ({cartItems.length})
                        </h2>
                        <button 
                            onClick={() => setIsCartOpen(false)}
                            className="w-8 h-8 bg-white/20 rounded-full hover:bg-white/30 transition flex items-center justify-center"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                <i className="fas fa-shopping-basket text-gray-400 text-2xl"></i>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">Your cart is empty</p>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-3 mb-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                                {cartItems.map((item, index) => {
                                    const { unit } = formatPrice(item.price);
                                    const itemTotal = (parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString();
                                    
                                    return (
                                        <div 
                                            key={item.id} 
                                            className="flex gap-3 bg-gray-50 p-3 rounded-lg"
                                        >
                                            <img 
                                                src={getProductImage(item)} 
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                                onError={(e)=> {e.target.src='/placeholder.jfif'}}
                                            />
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start gap-2">
                                                    <h3 className="font-medium text-gray-800 text-sm truncate">{item.name}</h3>
                                                    <button 
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-600 transition"
                                                    >
                                                        <i className="fas fa-trash-alt text-xs"></i>
                                                    </button>
                                                </div>
                                                
                                                <p className="text-green-600 font-medium text-sm mt-1">
                                                    ₦{itemTotal}{unit}
                                                </p>
                                                
                                                <div className="flex items-center mt-2">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-6 h-6 border rounded-l hover:bg-gray-100 flex items-center justify-center"
                                                    >
                                                        <i className="fas fa-minus text-xs"></i>
                                                    </button>
                                                    <span className="w-8 h-6 border-t border-b flex items-center justify-center text-xs">
                                                        {item.quantity}
                                                    </span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-6 h-6 border rounded-r hover:bg-gray-100 flex items-center justify-center"
                                                    >
                                                        <i className="fas fa-plus text-xs"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t pt-3">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm text-gray-600">Subtotal</span>
                                    <span className="font-bold text-gray-800">₦{formattedTotal}</span>
                                </div>
                                
                                <p className="text-xs text-gray-500 mb-3">
                                    Delivery fee calculated at checkout
                                </p>
                                
                                <Link 
                                    to="/checkout"
                                    className="block bg-green-600 text-white text-center py-2.5 rounded-lg font-medium text-sm hover:bg-green-700 transition mb-2"
                                    onClick={() => setIsCartOpen(false)}
                                >
                                    Checkout
                                </Link>
                                
                                <button 
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-full text-center text-gray-500 hover:text-gray-700 text-xs"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
}