export function HowItWorksSection(){
    return(
         <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
                <p className="text-gray-600 text-lg">Simple steps to get fresh produce directly from farmers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-search text-green-600 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">1. Browse & Discover</h3>
                    <p className="text-gray-600">Explore fresh produce from local farmers in your area. Filter by location,
                        price, and availability.</p>
                </div>

                <div className="text-center p-6">
                    <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-shopping-cart text-amber-600 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">2. Order Directly</h3>
                    <p className="text-gray-600">Place orders directly with farmers. Chat with them to discuss details and
                        arrange pickup.</p>
                </div>

                <div className="text-center p-6">
                    <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-truck text-blue-600 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">3. Fresh Delivery</h3>
                    <p className="text-gray-600">Get your fresh produce delivered or pick up directly from the farm. Enjoy
                        farm-fresh quality!</p>
                </div>
            </div>
        </div>
    </section>

    )
}