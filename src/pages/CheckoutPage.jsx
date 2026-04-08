import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CheckoutForm } from "../components/CheckoutForm";
import { OrderSummary } from "../components/OrderSummary";
import { PaymentMethod } from "../components/PaymentMethod";

export function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pickupLocation: "",
    deliveryMethod: "pickup",
    paymentMethod: "bank_transfer",
    notes: "",
  });

  const totalPrice = getTotalPrice();
  const deliveryFee = orderDetails.deliveryMethod === "delivery" ? 1500 : 0;
  const grandTotal = totalPrice + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  // This handles the FINAL form submission (step 3)
  const handleSubmitOrder = (e) => {
    e.preventDefault();

    const orderData = {
      ...orderDetails,
      items: cartItems,
      subtotal: totalPrice,
      deliveryFee,
      total: grandTotal,
      orderDate: new Date().toISOString(),
      orderId: "ORD-" + Date.now(),
    };

    console.log("Order placed:", orderData);

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    clearCart();
    navigate("/order-success", { state: { orderData } });
  };

  // Navigation between steps
  const goToNextStep = () => {
    // Validate step 1 before proceeding
    if (currentStep === 1) {
      if (
        !orderDetails.fullName ||
        !orderDetails.email ||
        !orderDetails.phone
      ) {
        alert("Please fill in all required contact fields");
        return;
      }
      if (orderDetails.deliveryMethod === "delivery") {
        if (
          !orderDetails.address ||
          !orderDetails.city ||
          !orderDetails.state
        ) {
          alert("Please fill in all delivery address fields");
          return;
        }
      }
      if (orderDetails.deliveryMethod === "pickup") {
        if (!orderDetails.pickupLocation) {
          alert("Please select a pickup location");
          return;
        }
      }
    }

    // Validate step 2 before proceeding
    if (currentStep === 2) {
      if (!orderDetails.paymentMethod) {
        alert("Please select a payment method");
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6">
          Add some products to your cart before checkout
        </p>
        <Link
          to="/marketplace"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-600">
            Home
          </Link>
          <i className="fas fa-chevron-right mx-2 text-xs"></i>
          <span className="text-gray-800">Checkout</span>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              1
            </div>
            <span className="mx-2 text-gray-600">Details</span>
          </div>
          <div className="w-12 h-1 mx-2 bg-gray-200">
            <div
              className={`h-full ${currentStep >= 2 ? "bg-green-600" : ""}`}
            ></div>
          </div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              2
            </div>
            <span className="mx-2 text-gray-600">Payment</span>
          </div>
          <div className="w-12 h-1 mx-2 bg-gray-200">
            <div
              className={`h-full ${currentStep >= 3 ? "bg-green-600" : ""}`}
            ></div>
          </div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              3
            </div>
            <span className="mx-2 text-gray-600">Confirm</span>
          </div>
        </div>

        {/* SINGLE FORM - wraps all steps */}
        <form onSubmit={handleSubmitOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form Sections */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <CheckoutForm
                  orderDetails={orderDetails}
                  onInputChange={handleInputChange}
                />
              )}

              {currentStep === 2 && (
                <PaymentMethod
                  orderDetails={orderDetails}
                  onInputChange={handleInputChange}
                />
              )}

              {currentStep === 3 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Confirm Your Order
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="border-b pb-4">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Contact Information
                      </h3>
                      <p className="text-gray-600">{orderDetails.fullName}</p>
                      <p className="text-gray-600">{orderDetails.email}</p>
                      <p className="text-gray-600">{orderDetails.phone}</p>
                    </div>

                    <div className="border-b pb-4">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Delivery Details
                      </h3>
                      {orderDetails.deliveryMethod === "delivery" ? (
                        <>
                          <p className="text-gray-600">
                            {orderDetails.address}
                          </p>
                          <p className="text-gray-600">
                            {orderDetails.city}, {orderDetails.state}
                          </p>
                          <p className="text-gray-600">Method: Home Delivery</p>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-600">
                            Method: Pickup at Market
                          </p>
                          <p className="text-gray-600">
                            Location: {orderDetails.pickupLocation}
                          </p>
                        </>
                      )}
                    </div>

                    <div className="border-b pb-4">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Payment Method
                      </h3>
                      <p className="text-gray-600 capitalize">
                        {orderDetails.paymentMethod.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary (always visible) */}
            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
                totalPrice={totalPrice}
                deliveryFee={deliveryFee}
                grandTotal={grandTotal}
              />
            </div>
          </div>

          {/* Navigation Buttons - Inside the form but outside the step components */}
          <div className="max-w-2xl mt-6 flex gap-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={goToPreviousStep}
                className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Back
              </button>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={goToNextStep}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Continue to {currentStep === 1 ? "Payment" : "Review"}
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Place Order
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
