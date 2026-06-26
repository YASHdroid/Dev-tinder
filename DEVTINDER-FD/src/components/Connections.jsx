import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/CONSTANTS";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/ConnectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <h1 className="text-white text-3xl text-center my-10">Loading...</h1>
    );
  }

  if (connections.length === 0) {
    return (
      <h1 className="text-white text-3xl text-center my-10">
        No Connections Found
      </h1>
    );
  }

  return (
    <div className="my-10 flex flex-col items-center text-white">
      <h1 className="font-bold text-3xl mb-8">Connections</h1>

      {/* FIX: w-xl is not a valid Tailwind class — changed to w-full */}
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, about } = connection;

          return (
            <div
              key={_id}
              className="bg-gray-900 p-5 rounded-2xl flex items-center gap-5"
            >
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
                <p className="text-gray-400 mt-1">{about || "No bio available"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;