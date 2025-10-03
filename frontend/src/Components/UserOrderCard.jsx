import React from "react";

function UserOrderCard({ data }) {
  const formatDate = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  
  return (
    <div className="group bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 space-y-5 border border-gray-100 hover:border-orange-200 relative overflow-hidden">
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Order header section with enhanced styling */}
      <div className="relative z-10 flex justify-between border-b-2 border-gray-100 pb-4">
        {/* Left side - Order details */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📦</span>
            <p className="font-bold text-lg text-gray-800">
              Order <span className="text-orange-600">#{data._id.slice(-7)}</span>
            </p>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <span className="text-gray-400">📅</span>
            Date: <span className="font-medium">{formatDate(data.createdAt)}</span>
          </p>
        </div>
        
        {/* Right side - Payment and status */}
        <div className="text-right space-y-1">
          <p className="text-sm font-medium px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full inline-block">
            💳 {data.paymentMethod?.toUpperCase()}
          </p>
          <p className="font-semibold text-base">
            <span className={`px-3 py-1 rounded-full inline-block ${
              data.shopOrders?.[0].status === 'delivered' 
                ? 'bg-green-100 text-green-700' 
                : data.shopOrders?.[0].status === 'pending'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {data.shopOrders?.[0].status}
            </span>
          </p>
        </div>
      </div>

      {/* Shop orders section with enhanced cards */}
      {data.shopOrders.map((shopOrder, index) => (
        <div
          key={index}
          className="relative z-10 border-2 border-orange-100 rounded-xl p-4 bg-gradient-to-br from-orange-50 via-white to-red-50 space-y-4 hover:border-orange-200 transition-all duration-300"
        >
          {/* Shop name with icon */}
          <div className="flex items-center gap-2 border-b border-orange-100 pb-2">
            <span className="text-xl">🏪</span>
            <p className="font-bold text-lg text-gray-800">
              {shopOrder.shop?.name || "No Shop Name"}
            </p>
          </div>

          {/* Items carousel with enhanced cards */}
          <div className="flex space-x-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-gray-100">
            {shopOrder.shopOrderItems.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-44 rounded-xl p-3 bg-white shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-100"
              >
                {/* Item image with overlay gradient */}
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={item.item.image}
                    alt={item.name}
                    className="w-full h-28 object-cover rounded-lg transform hover:scale-110 transition-transform duration-500"
                  />
                  {/* Quantity badge */}
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    {item.quantity}x
                  </div>
                </div>
                
                {/* Item details */}
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-bold text-gray-800 line-clamp-1 hover:text-orange-600 transition-colors">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-orange-600">₹{item.price}</span>
                    <span className="text-gray-400 mx-1">×</span>
                    <span className="font-medium">{item.quantity}</span>
                  </p>
                  <p className="text-sm font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Shop order subtotal and status */}
          <div className="flex justify-between items-center border-t-2 border-orange-100 pt-3">
            <p className="font-bold text-lg text-gray-800">
              Subtotal: <span className="text-orange-600">₹{shopOrder.subtotal}</span>
            </p>
            <span className={`text-sm font-semibold px-4 py-2 rounded-full ${
              shopOrder.status === 'delivered' 
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                : shopOrder.status === 'pending'
                ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700'
                : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700'
            } shadow-md`}>
              Status: <span className="uppercase">{shopOrder.status}</span>
            </span>
          </div>
        </div>
      ))}

      {/* Footer section with total and track button */}
      <div className="relative z-10 flex justify-between items-center border-t-2 border-gray-200 pt-4 bg-gradient-to-r from-gray-50 to-white p-4 -mx-6 -mb-6 mt-4 rounded-b-2xl">
        {/* Total amount with enhanced styling */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 font-medium">Order Total</p>
          <p className="font-bold text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            ₹{data.totalAmount}
          </p>
        </div>
        
        {/* Track order button with gradient and animation */}
        <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
          <span>Track Order</span>
          <span className="text-lg">📍</span>
        </button>
      </div>
    </div>
  );
}

export default UserOrderCard;