import React, { useState } from "react";
import { IoEye, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr]=useState("")
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()
  

  

  const handleSignIn = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(setUserData(result.data))
      setErr("")
      setLoading(false)
    } catch (error) {
       setErr(error?.response?.data?.message)
       setLoading(false)
    }
  }

   const handleGoogleAuth = async () =>{
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth,provider)
      try {
            const {data}=await axios.post(`${serverUrl}/api/auth/google-auth`, {
              email : result.user.email,
            }, {withCredentials: true})
            dispatch(setUserData(data))
      } catch (error) {
            console.log(error)
      }
    }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]"
        style={{ border: `5px solid ${borderColor}` }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          YumzY
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in to your account to get started with delicious food deliveries
        </p>


        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-orange-500"
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email} required
          />
        </div>

        

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="Password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="Password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-orange-500"
              placeholder="Enter your password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password} required
            />
            <button
              type="button"
              className="absolute top-[12px] right-3 cursor-pointer text-gray-900"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <IoEye /> : <IoEyeOffOutline />}
            </button>
          </div>
        </div>
        <div className="text-right mb-4 text-[#ff4d2d] cursor-pointer font-medium" onClick={() => navigate("/forgot-password" )}>
          Forgot Password?
        </div>


        {/* Buttons */}
        <div>
          <button
            className="w-full mt-4 bg-orange-500 text-white cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            onClick={handleSignIn} disabled={loading}
          >
            {loading? <ClipLoader color="white" size={20}/> : "Sign In"}
            
          </button>
          {err && <p className="text-center text-red-500 my-[10px] font-semibold">*{err}</p>}

          <button onClick={handleGoogleAuth} className="w-full mt-4 border border-gray-100 rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-300 cursor-pointer transition-colors">
            <FcGoogle size={20} />
            <span>Sign In with Google</span>
          </button>

          <p
            className="text-center mt-6 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Want to create a new account ?{" "}
            <span className="text-orange-500 cursor-pointer">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
