import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../Components/CartItemCard";

function CartPage() {
    const navigate = useNavigate();
    const {cartItems, totalAmount}=useSelector(state=>state.user)
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex justify-center p-6 relative">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-200 opacity-20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main content container with glass morphism effect */}
      <div className="w-full max-w-[850px] relative z-10">
        {/* Header section with enhanced styling */}
        <div className="flex items-center gap-5 mb-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-orange-100">
          {/* Back button with hover effects */}
          <div
            className="cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-x-2 bg-gradient-to-r from-orange-100 to-red-100 p-2 rounded-full"
            onClick={() => navigate("/")}
          >
            <IoIosArrowRoundBack size={35} className="text-orange-600 hover:text-red-600 transition-colors" />
          </div>
          
          {/* Page title with gradient text */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Your Shopping Cart
            </h1>
            <p className="text-sm text-gray-500 mt-1">Review your items before checkout</p>
          </div>
          
          {/* Cart items count badge */}
          {cartItems?.length > 0 && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg">
              <span className="font-bold">{cartItems.length}</span> {cartItems.length === 1 ? 'item' : 'items'}
            </div>
          )}
        </div>
        
        {/* Cart content area */}
        {cartItems?.length==0? (
          /* Empty cart state with enhanced design */
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-gray-100">
            {/* Empty cart illustration */}
            <div className="text-8xl mb-6 animate-pulse">🛒</div>
            <p className="text-2xl font-semibold text-gray-700 mb-3">Your cart is empty</p>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet</p>
            
            {/* Call to action button */}
            <button 
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-red-500 hover:to-orange-500"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart items list with staggered animation */}
            <div className="space-y-4 mb-6">
              {cartItems?.map((item,index)=>(
                <div 
                  key={index}
                  className="transform transition-all duration-500 hover:scale-[1.01]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CartItemCard data={item} />
                </div>
              ))}
            </div>
            
            {/* Order summary section with glassmorphism */}
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
              {/* Price breakdown */}
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>
              
              {/* Total amount with gradient background */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Total Amount</h1>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  ₹{totalAmount}
                </span>
              </div>
            </div>
            
            {/* Checkout button section */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              {/* Continue shopping button */}
              <button 
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl text-lg font-medium hover:bg-gray-200 transition-all duration-300 hover:shadow-lg"
              >
                Continue Shopping
              </button>
              
              {/* Proceed to checkout button with gradient and animation */}
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-red-500 hover:to-orange-500 flex items-center justify-center gap-2" onClick={()=>navigate("/checkout")}>
                <span>Proceed to Checkout</span>
                <span className="text-xl">→</span>
              </button>
            </div>
            
            {/* Trust badges */}
            <div className="mt-8 flex justify-center gap-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Best Prices</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default CartPage;