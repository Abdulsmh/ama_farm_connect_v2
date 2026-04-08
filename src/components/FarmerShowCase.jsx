import { Link } from 'react-router-dom';

export function FarmerShowCaseSection(){
    return(
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Farmer Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                            For <span className="text-green-600">Farmers</span>
                        </h2>
                        <p className="text-gray-600 text-lg mb-6">
                            Join our platform to reach more customers, get better prices for your produce, and build direct
                            relationships with your buyers.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <i className="fas fa-check-circle text-green-600 text-xl mr-3"></i>
                                <span>Reach thousands of local buyers</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-check-circle text-green-600 text-xl mr-3"></i>
                                <span>Set your own prices and manage inventory</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-check-circle text-green-600 text-xl mr-3"></i>
                                <span>Direct communication with customers</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-check-circle text-green-600 text-xl mr-3"></i>
                                <span>Easy order and payment management</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Link 
                                to="/signup?type=farmer"
                                className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition font-semibold"
                            >
                                <i className="fas fa-user-plus mr-2"></i>
                                Join as Farmer
                            </Link>
                        </div>
                    </div>

                    {/* Farmer Image */}
                    <div className="relative">
                        <img 
                            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Happy Farmer" 
                            className="rounded-2xl shadow-2xl w-full"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-2xl shadow-lg">
                            <p className="text-2xl font-bold">95%</p>
                            <p className="text-sm">Farmers Report<br />Increased Sales</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}