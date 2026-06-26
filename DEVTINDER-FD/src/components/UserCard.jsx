import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/FeedSlice";

const UserCard = ({ user }) => {
  if (!user) return null;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { _id, firstName, lastName, gender, about, photoUrl } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      setLoading(true);
      await axios.post(
        BASE_URL + "request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex justify-center items-center mt-10 mb-10">
    <div className="bg-black border border-gray-800 rounded-3xl overflow-hidden shadow-2xl w-80 hover:scale-105 transition">

      {/* Image */}
      <div className="relative h-80">
        <img
          src={photoUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="profile"
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="px-6 py-5 text-center">
        <h2 className="text-2xl font-bold text-white">
          {firstName} {lastName}
        </h2>
        <p className="text-pink-300 mt-1 capitalize text-sm">
          {gender || "Not specified"}
        </p>
        <p className="text-gray-400 mt-2 text-sm leading-relaxed">
          {about || "No bio available"}
        </p>

        <div className="flex justify-center gap-4 mt-5 mb-2">
          <button
            disabled={loading}
            className="btn btn-outline btn-error rounded-full px-6"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            disabled={loading}
            className="btn btn-primary rounded-full px-6"
            onClick={() => handleSendRequest("interested", _id)}
          >
            {loading ? "Sending..." : "Interested"}
          </button>
        </div>
      </div>

    </div>
  </div>
);
};

export default UserCard;