import { Link } from "react-router-dom"
import { TypingAnimation } from './TypingAnimation'

export function HeroSection(){
    return(
        <section className="bg-gradient-to-r from-green-50 to-amber-50 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
                            <TypingAnimation />
                        </h1>
                        <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
                            Connect directly with local farmers. Get the freshest produce while supporting your local
                            agricultural community. All products are verified by AMA FarmConnect.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link to="/marketplace"
                                className="bg-green-600 text-white px-6 py-3 md:px-8 md:py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-green-700 transition text-center inline-flex items-center justify-center gap-2">
                                <i className="fas fa-shopping-basket"></i>
                                Shop Fresh Produce
                            </Link>
                            <Link to="/sell"
                                className="border border-green-600 text-green-600 px-6 py-3 md:px-8 md:py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-green-50 transition text-center inline-flex items-center justify-center gap-2">
                                <i className="fas fa-seedling"></i>
                                Start Selling
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <img src="/Farm.jfif"
                            alt="Fresh vegetables" 
                            className="rounded-2xl shadow-2xl w-full max-w-[550px] mx-auto h-auto" />
                        <div className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 bg-white p-4 md:p-6 rounded-2xl shadow-lg">
                            <div className="flex items-center space-x-3 md:space-x-4">
                                <div className="bg-green-100 p-2 md:p-3 rounded-full">
                                    <i className="fas fa-users text-green-600 text-xl md:text-2xl"></i>
                                </div>
                                <div>
                                    <p className="text-xl md:text-2xl font-bold text-gray-800">500+</p>
                                    <p className="text-xs md:text-sm text-gray-600">Verified Farmers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}