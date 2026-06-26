import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileDrop = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const formData = new FormData();
    formData.append("photo", file);
    try {
      setUploading(true);
      setError("");
      const res = await axios.post(BASE_URL + "upload/photo", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPhotoUrl(res.data.photoUrl);
    } catch (err) {
      setError("Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setError("");
      setSuccess("");

      const res = await axios.patch(
        BASE_URL + "profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setSuccess("Profile Updated Successfully");

    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10 px-4">

      <div className="card bg-black border border-zinc-800 w-96 shadow-2xl">

        <div className="card-body">

          <h2 className="card-title justify-center text-white text-2xl mb-4">
            Edit Profile
          </h2>

          {/* Drag & Drop Photo Upload */}
          <div
            className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 my-3 cursor-pointer transition-all
              ${dragging ? "border-primary bg-zinc-800" : "border-zinc-600 bg-zinc-900"}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFileDrop(e.dataTransfer.files[0]);
            }}
            onClick={() => document.getElementById("photoInput").click()}
          >
            <input
              id="photoInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileDrop(e.target.files[0])}
            />

            <img
              src={photoUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border border-zinc-700 mb-3"
              onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
            />

            {uploading ? (
              <span className="text-gray-400 text-sm">Uploading...</span>
            ) : (
              <span className="text-gray-400 text-sm">
                Drag & drop or <span className="text-primary underline">click</span> to upload
              </span>
            )}
          </div>

          {/* First Name */}
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text text-gray-300">First Name</span>
            </div>
            <input
              type="text"
              value={firstName}
              className="input input-bordered bg-zinc-900 text-white border-zinc-700"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          {/* Last Name */}
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text text-gray-300">Last Name</span>
            </div>
            <input
              type="text"
              value={lastName}
              className="input input-bordered bg-zinc-900 text-white border-zinc-700"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          {/* Age */}
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text text-gray-300">Age</span>
            </div>
            <input
              type="number"
              value={age}
              className="input input-bordered bg-zinc-900 text-white border-zinc-700"
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          {/* Gender */}
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text text-gray-300">Gender</span>
            </div>
            <select
              value={gender}
              className="select select-bordered bg-zinc-900 text-white border-zinc-700"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          {/* About */}
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text text-gray-300">About</span>
            </div>
            <textarea
              value={about}
              className="textarea textarea-bordered bg-zinc-900 text-white border-zinc-700 h-24"
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>

          {/* Error */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Success */}
          {success && <p className="text-green-500 text-center">{success}</p>}

          {/* Save */}
          <div className="card-actions justify-center mt-4">
            <button
              onClick={handleSaveProfile}
              className="btn btn-primary w-full"
            >
              Save Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;