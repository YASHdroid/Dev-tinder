import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import Footer from "./Footer";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

import { BASE_URL } from "../utils/constants";

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
  try {
    const res = await axios.get(BASE_URL + "profile/view", {
      withCredentials: true,
    });
    dispatch(addUser(res.data));
  } catch (err) {
    console.error(err);
    // only redirect on actual 401, not network errors
    if (err.response?.status === 401) {
      navigate("/login");
    }
  }
};

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#e5e7eb]">

      <Navbar />

      <main className="flex-1 px-6 py-6">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default Body;