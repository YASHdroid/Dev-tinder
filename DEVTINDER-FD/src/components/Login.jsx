import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}login`,
        { emailId, password },
        { withCredentials: true }
      );

      console.log("Login Response:", res.data);

      // Store logged-in user in Redux
      dispatch(addUser(res.data));

      // Redirect to Feed/Home page
     navigate("/feed", {
replace: true
});

    } catch (err) {
      setError(err?.response?.data || "Something went Wrong");
    }
  };

  return (
    <div className="flex justify-center items-center   min-h-screen bg-[#0a0a0a]">
      <div className="w-96 bg-[#111111] text-[#e5e7eb] rounded-2xl shadow-lg border border-gray-800">

        <div className="p-6">

          <h2 className="text-2xl font-bold text-center mb-6">
            Welcome Back 👋
          </h2>

          {/* Email Input */}
          <div className="mb-4">

            <label className="block text-sm mb-1 text-gray-400">
              Email
            </label>

            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg bg-[#0f0f0f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

          </div>

          {/* Password Input */}
          <div className="mb-5">

            <label className="block text-sm mb-1 text-gray-400">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-lg bg-[#0f0f0f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

          </div>

          {/* Error Message */}
          <p className="text-red-400">{error}</p>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#ff2d2d] hover:bg-[#e02626] transition text-white py-2 rounded-lg font-medium"
          >
            Login
          </button>
         <p className="text-center mt-4 text-gray-400">
  Don't have an account?{" "}
  
  <Link
    to="/signup"
    className="text-red-500 hover:text-red-400 font-semibold"
  >
    Sign Up
  </Link>
</p>

        </div>
      </div>
    </div>
  );
};

export default Login;