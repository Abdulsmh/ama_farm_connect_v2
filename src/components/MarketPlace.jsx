import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { products } from "./ProductData";
import { CategoryFilter } from "./CategoryFilter";
import { Link, useLocation } from "react-router-dom";

export function MarketPlaceSection(){
    // state for selecting the categories from product list
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // Check if we're on the marketplace page
    const location = useLocation();
    const isMarketplacePage = location.pathname === '/marketplace';

    // getting unique list from the categories
    const categories = [...new Set(products.map(product => product.category))];

    // filter products based on the selected category
    const filteredProducts = selectedCategory === 'All' ? products 
    : products.filter(product => product.category === selectedCategory);

  
    return (
        <section id="marketplace" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Fresh From Our Farms
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Discover the best local produce available now
                    </p>
                </div>

                <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                />


                 {/* Product Grid - dynamically displays the products */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                 </div>


                 {/* shows some message when no product in the category */}
                 {filteredProducts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No Products Found in this Category
                    </div>
                 )}

                  {/* Only show "View All Products" button if NOT on marketplace page */}
                  {!isMarketplacePage && (
                    <div className="text-center mt-12">
                        <Link
                            to="/marketplace"
                            className="inline-block bg-white text-green-600 border border-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition font-semibold"
                        >
                            View All Products
                        </Link>
                    </div>
                  )}
            </div>
        </section>
    )
}