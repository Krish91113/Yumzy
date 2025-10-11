import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLocationDot, FaCreditCard } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../redux/mapSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDeliveryDining } from "react-icons/md";
import { FaMobileScreen } from "react-icons/fa6";
import { serverUrl } from "../App";
import { addMyOrder } from "../redux/userSlice"; // ✅ import action

function RecenterMap({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location?.lat && location?.lon) {
      map.setView([location.lat, location.lon], 16, { animate: true });
    }
  }, [location, map]);

  return null;
}

function CheckOut() {
  const { location, address } = useSelector((state) => state.map);
  const { cartItems, totalAmount, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [addressInput, setAddressInput] = useState("");
  const apiKey = import.meta.env.VITE_GEOAPIKEY;
  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const AmountWithDeliveryFee = totalAmount + deliveryFee;

  const onDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, lon: longitude }));
      getAddressByLatLng(latitude, longitude);
    });
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`
      );

      const addr =
        result?.data?.results?.[0]?.formatted ||
        result?.data?.results?.[0]?.address_line1 ||
        "Unknown location";

      dispatch(setAddress(addr));
    } catch (error) {
      console.log(error);
    }
  };

  const getLatLngByAddress = async () => {
    if (!addressInput) return;
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&apiKey=${apiKey}`
      );
      const { lat, lon } = result.data.features[0].properties;
      dispatch(setLocation({ lat, lon }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (address) setAddressInput(address);
  }, [address]);

  const handlePlaceOrder = async () => {
    // ✅ Frontend validations
    if (!location?.lat || !location?.lon) {
      alert("Please select your delivery location on the map.");
      return;
    }
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!addressInput) {
      alert("Please enter a delivery address.");
      return;
    }

    try {
      // ✅ Map cartItems to backend expected format
      const formattedCartItems = cartItems.map((item) => ({
        _id: item._id, // item id
        shop: item.shop, // shop id
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const result = await axios.post(
        `${serverUrl}/api/order/place-order`,
        {
          paymentMethod,
          totalAmount: AmountWithDeliveryFee,
          deliveryAddress: {
            text: addressInput,
            latitude: location.lat,
            longitude: location.lon,
          },
          cartItems: formattedCartItems,
        },
        { withCredentials: true }
      );

      dispatch(addMyOrder(result.data));
      navigate("/order-placed");
    } catch (error) {
      console.error("Place order failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center p-4 md:p-6 justify-center relative">
      {/* Background circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      {/* Back button */}
      <div
        className="absolute top-4 md:top-6 left-4 md:left-6 z-50 cursor-pointer group"
        onClick={() => navigate("/")}
      >
        <div className="bg-white rounded-full p-2 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110">
          <IoIosArrowRoundBack
            size={35}
            className="text-orange-600 group-hover:text-orange-700 transition-colors"
          />
        </div>
      </div>

      {/* Main container */}
      <div className="w-full max-w-7xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-200 pb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Complete Your Order
          </h1>
          <p className="text-gray-600 text-lg">Just a few steps away from delicious food!</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Delivery + Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Section */}
            <section className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 shadow-xl border border-orange-100 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-3 shadow-lg">
                  <FaLocationDot className="text-white text-xl" />
                </div>
                Delivery Location
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  className="flex-1 border-2 border-gray-300 rounded-2xl p-4 pl-5 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md bg-white"
                  type="text"
                  placeholder="🏠 Enter your delivery address"
                  value={addressInput || ""}
                  onChange={(e) => setAddressInput(e.target.value)}
                />
                <div className="flex gap-3">
                  <button
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                    onClick={getLatLngByAddress}
                  >
                    <FaSearch size={20} />
                  </button>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-4 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                    onClick={getCurrentLocation}
                  >
                    <BiCurrentLocation size={20} />
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border-4 border-white overflow-hidden shadow-2xl">
                <div className="h-80 w-full flex items-center justify-center bg-gray-50">
                  {location?.lat && location?.lon ? (
                    <MapContainer className="w-full h-full" center={[location.lat, location.lon]} zoom={16}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <RecenterMap location={location} />
                      <Marker position={[location.lat, location.lon]} draggable eventHandlers={{ dragend: onDragEnd }} />
                    </MapContainer>
                  ) : (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
                      <p className="text-gray-600 text-lg font-medium">Loading map...</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-3 shadow-lg">
                  <FaCreditCard className="text-white text-xl" />
                </div>
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* COD */}
                <div
                  className={`flex items-center gap-4 rounded-3xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    paymentMethod === "cod"
                      ? "border-4 border-orange-500 bg-white shadow-2xl ring-4 ring-orange-200"
                      : "border-2 border-gray-200 bg-white hover:border-gray-300 shadow-lg hover:shadow-xl"
                  }`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg">
                    <MdDeliveryDining className="text-white text-3xl" />
                  </span>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Cash on Delivery</p>
                    <p className="text-sm text-gray-500 mt-1">Pay when food arrives</p>
                  </div>
                </div>

                {/* Online */}
                <div
                  className={`flex items-center gap-4 rounded-3xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    paymentMethod === "online"
                      ? "border-4 border-orange-500 bg-white shadow-2xl ring-4 ring-orange-200"
                      : "border-2 border-gray-200 bg-white hover:border-gray-300 shadow-lg hover:shadow-xl"
                  }`}
                  onClick={() => setPaymentMethod("online")}
                >
                  <div className="flex gap-2">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg">
                      <FaMobileScreen className="text-white text-xl" />
                    </span>
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-cyan-600 shadow-lg">
                      <FaCreditCard className="text-white text-xl" />
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Online Payment</p>
                    <p className="text-sm text-gray-500 mt-1">UPI/Cards/Wallets</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <section className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-3xl p-8 shadow-2xl sticky top-6 border-2 border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <span className="text-3xl">🛒</span>
                Order Summary
              </h2>
              <div className="space-y-5">
                {cartItems.length > 0 ? (
                  <>
                    <div className="max-h-72 overflow-y-auto space-y-3 pr-2">
                      {cartItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-gray-700 bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
                        >
                          <div className="flex-1">
                            <p className="font-bold text-base text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                          </div>
                          <span className="font-bold text-xl text-orange-600">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t-2 border-dashed border-gray-300 pt-5 space-y-4">
                      <div className="flex justify-between text-gray-700 text-lg">
                        <span className="font-semibold">Subtotal</span>
                        <span className="font-bold text-gray-800">₹{totalAmount}</span>
                      </div>
                      <div className="flex justify-between text-gray-700 text-lg">
                        <span className="font-semibold">Delivery Fee</span>
                        <span className={`font-bold ${deliveryFee === 0 ? "text-green-600" : "text-gray-800"}`}>
                          {deliveryFee === 0 ? "FREE 🎉" : `₹${deliveryFee}`}
                        </span>
                      </div>
                      {totalAmount < 500 && (
                        <div className="bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-2xl p-3 shadow-sm">
                          <p className="text-sm text-orange-700 text-center font-semibold">
                            💡 Add ₹{500 - totalAmount} more for free delivery!
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-5 shadow-xl">
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold text-xl">Total Amount</span>
                        <span className="font-extrabold text-3xl">₹{AmountWithDeliveryFee}</span>
                      </div>
                    </div>

                    <button
                      className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold text-lg py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                      onClick={handlePlaceOrder}
                    >
                      <span className="text-2xl">🍽️</span>
                      {paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
                    </button>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-6xl mb-4">🛒</p>
                    <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
