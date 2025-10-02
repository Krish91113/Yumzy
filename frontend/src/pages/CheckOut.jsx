import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setLocation } from "../redux/mapSlice";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Handle drag and update Redux
  const onDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    dispatch(setLocation({ lat, lon: lng })); // FIX: use `lon` not `long`
  };

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
              value={address || ""} // FIX: show address if available
              onChange={(e) => {
                // Optional: if you have setAddress in Redux
                // dispatch(setAddress(e.target.value));
              }}
            />
            <button className="bg-[#ff4d2d] hover:bg-[#ff4d2d] text-white px-3 py-2 rounded-lg flex items-center justify-center">
              <FaSearch size={18} />
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center">
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
      </div>
    </div>
  );
}

export default CheckOut;
