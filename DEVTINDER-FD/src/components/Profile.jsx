import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {

  const user = useSelector((store) => store.user);

  if (!user) return null;

  return (
    <div>
      <EditProfile />
    </div>
  );
};

export default Profile;