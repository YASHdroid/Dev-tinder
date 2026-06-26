import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/CONSTANTS";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/FeedSlice";
import UserCard from "./UserCard";
import { Navigate } from "react-router-dom";

const Feed = () => {

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const feed =
    useSelector((store) => store.feed);

  const getFeed = async () => {

    try {

      const res =
      await axios.get(

        BASE_URL + "user/feed",

        {
          withCredentials: true
        }

      );

      console.log(
        "FEED RESPONSE:",
        res.data
      );

      dispatch(
        addFeed(
          res.data.data
        )
      );

    } catch (err) {

      console.log(
        "FEED ERROR:",
        err.response?.data
      );

    }

  };

  useEffect(() => {

    getFeed();

  }, []);

  if (!user) {

    return (
      <Navigate to="/login" />
    );

  }

  if (!feed) {

    return (
      <h1 className="text-white text-center">
        Loading...
      </h1>
    );

  }

  if (feed.length === 0) {

    return (
      <h1 className="text-center text-white mt-10">
        No Users Found
      </h1>
    );

  }

  return (

    <div className="flex justify-center mt-10">

      <UserCard
        user={feed[0]}
      />

    </div>

  );

};

export default Feed;