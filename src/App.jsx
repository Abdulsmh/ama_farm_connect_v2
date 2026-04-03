import { Routes, Route } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Navbar from './components/Nav'
import { HeroSection } from './components/Hero'
import './App.css'
import { HowItWorksSection } from './components/HowItWorks'
import { MarketPlaceSection } from './components/MarketPlace'
import { MarketPlacePage } from './MarketPlacePage'
import { FarmerShowCaseSection } from './components/FarmerShowCase'
import { ProductPage } from './pages/ProductPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrderSuccessPage } from './pages/OrderSuccessPage'
import { SellProductPage } from './pages/SellProductPage'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'
import { Footer } from './components/Footer'
import { CartProvider } from './context/CartContext'
import { CartSidebar } from './components/CartSidebar'

function App() {
  return (
    <CartProvider>
      <div className='w-full'>
        <Navbar />
        <CartSidebar />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <>
              <HeroSection />
              <HowItWorksSection />
              <MarketPlaceSection />
              <FarmerShowCaseSection />
            </>
          } />
          
          {/* Marketplace */}
          <Route path="/marketplace" element={<MarketPlacePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          
          {/* Sell Products */}
          <Route path="/sell" element={<SellProductPage />} />
          
          {/* Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          
          {/* Authentication */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App