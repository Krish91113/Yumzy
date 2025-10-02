import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../redux/mapSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCreditCard } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { FaMobileScreen } from "react-icons/fa6";
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
  const { cartItems } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [addressInput, setAddressInput] = useState("");
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  // ✅ Handle drag and update Redux
  const onDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  // ✅ Get current location from browser
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, lon: longitude }));
      getAddressByLatLng(latitude, longitude);
    });
  };

  // ✅ Reverse geocoding
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

  // ✅ Forward geocoding
  const getLatLngByAddress = async () => {
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
    if (address) {
      setAddressInput(address);
    }
  }, [address]);

  return (
    <div className="min-h-screen bg-[#fff9f6] flex items-center p-6 justify-center">
      {/* Back Button */}
      <div
        className="absolute top-[20px] left-[20px] z-[10] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack
          size={35}
          className="text-orange-600 hover:text-red-600 transition-colors"
        />
      </div>

      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

        {/* Delivery Location */}
        <section>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800 ">
            <FaLocationDot className="text-[#ff4d2d]" />
            Delivery Location
          </h2>

          {/* Address Input */}
          <div className="flex gap-2 mb-3">
            <input
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              type="text"
              placeholder="Enter your delivery address"
              value={addressInput || ""}
              onChange={(e) => setAddressInput(e.target.value)}
            />
            <button
              className="bg-[#ff4d2d] hover:bg-[#ff4d2d] text-white px-3 py-2 rounded-lg flex items-center justify-center"
              onClick={getLatLngByAddress}
            >
              <FaSearch size={18} />
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center"
              onClick={getCurrentLocation}
            >
              <BiCurrentLocation size={18} />
            </button>
          </div>

          {/* Map */}
          <div className="rounded-xl border overflow-hidden">
            <div className="h-64 w-full flex items-center justify-center ">
              {location?.lat && location?.lon ? (
                <MapContainer
                  className="w-full h-full"
                  center={[location.lat, location.lon]}
                  zoom={16}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <RecenterMap location={location} />
                  <Marker
                    position={[location.lat, location.lon]}
                    draggable
                    eventHandlers={{ dragend: onDragEnd }}
                  />
                </MapContainer>
              ) : (
                <p className="text-gray-500">Loading map...</p>
              )}
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                paymentMethod === "cod"
                  ? "border-[#ff4d2d] bg-orange-50 shadow"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setPaymentMethod("cod")}
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <MdDeliveryDining className="text-green-600 text-xl"/>
                </span>
                <div>
                    <p className="font-medium text-gray-800">Cash on Delivery</p>
                    <p className="text-xs text-gray-400">Pay when your Food arrives</p>
                </div>
              
            </div>
            <div
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                paymentMethod === "online"
                  ? "border-[#ff4d2d] bg-orange-50 shadow"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setPaymentMethod("online")}
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100"><FaMobileScreen className="text-purple-700 text-xl" /></span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"><FaCreditCard className="text-blue-700 text-xl" /></span>
             <div>
                <p className="font-medium text-gray-800"> UPI/Credit/Debit</p>
                <p className="text-xs text-gray-400">Pay Securely Online</p>
             </div>
            </div>
          </div>
        </section>

        <section>
            <h2 className="text-lg text-gray-800 font-semibold mb-3">Order Summary</h2>
            <div className="rounded-xl bg-gray-50 p-4 sy-2">

            </div>
        </section>
      </div>
    </div>
  );
}

export default CheckOut;
