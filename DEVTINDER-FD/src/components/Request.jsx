import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/CONSTANTS";
import { useDispatch, useSelector } from "react-redux";
// FIX: import removeRequest (new action) instead of only addRequests
import { addRequests, removeRequest } from "../utils/RequestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + `request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      // FIX: use removeRequest action instead of filtering and re-dispatching
      // via addRequests (which was overwriting entire state unnecessarily)
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return (
      <h1 className="text-white text-3xl text-center my-10">Loading...</h1>
    );
  }

  if (requests.length === 0) {
    return (
      <h1 className="text-white text-3xl text-center my-10">
        No Requests Found
      </h1>
    );
  }

  return (
    <div className="my-10 flex flex-col items-center text-white">
      <h1 className="text-3xl font-bold mb-8">Connection Requests</h1>

      <div className="flex flex-col gap-4 w-full max-w-2xl">
        {requests.map((request) => {
          const { _id, fromUserId } = request;
          const { firstName, lastName, photoUrl, about } = fromUserId;

          return (
            <div
              key={_id}
              className="bg-gray-900 p-5 rounded-2xl flex items-center justify-between gap-5"
            >
              <div className="flex items-center gap-5">
                <img
                  src={
                    photoUrl ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="user"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-semibold">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-400 mt-1">
                    {about || "No bio available"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => reviewRequest("accepted", _id)}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white font-semibold"
                >
                  Accept
                </button>
                <button
                  onClick={() => reviewRequest("rejected", _id)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;