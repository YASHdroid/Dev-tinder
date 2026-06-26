import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/CONSTANTS";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {

try {

setLoading(true);
setError("");

let uploadedPhoto = "";

if(photoFile){

const formData = new FormData();

formData.append(
"file",
photoFile
);

formData.append(
"upload_preset",
"devtinder"
);

const uploadRes =
await axios.post(
"https://api.cloudinary.com/v1_1/dvnay8fek/image/upload",
formData
);

uploadedPhoto =
uploadRes.data.secure_url;

}

await axios.post(
`${BASE_URL}signup`,
{
firstName,
lastName,
age,
emailId,
password,
photoUrl: uploadedPhoto,
},
{
withCredentials:true
}
);

navigate("/login");

}

catch(err){

console.log(
"SIGNUP ERROR:",
err.response
);

setError(
err?.response?.data?.message ||
err?.response?.data ||
err.message
);

}

finally{

setLoading(false);

}

};

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-[#0a0a0a] px-4">

      <div className="w-96 bg-[#111111] border border-gray-800 rounded-2xl shadow-lg p-6 text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        {/* Preview */}
        <div className="flex justify-center mb-5">

          <img
            src={
              photoUrl ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border border-gray-700"
            onError={(e) => {
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
            }}
          />

        </div>

        {/* First Name */}
        <div className="mb-4">

          <label className="block text-sm mb-1 text-gray-400">
            First Name
          </label>

          <input
            type="text"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            placeholder="Enter first name"
            className="w-full px-3 py-2 rounded-lg bg-[#0f0f0f] border border-gray-700"
          />

        </div>

        {/* Last Name */}
        <div className="mb-4">

          <label className="block text-sm mb-1 text-gray-400">
            Last Name
          </label>

          <input
            type="text"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            placeholder="Enter last name"
            className="w-full px-3 py-2 rounded-lg bg-[#0f0f0f] border border-gray-700"
          />

        </div>

        {/* Age */}
        <div className="mb-4">

          <label className="block text-sm mb-1 text-gray-400">
            Age
          </label>

          <input
            type="number"
            value={age}
            onChange={(e)=>setAge(e.target.value)}
            placeholder="Enter age"
            className="w-full px-3 py-2 rounded-lg bg-[#0f0f0f] border border-gray-700"
          />

        </div>

 {/* Photo Upload */}

<div className="mb-4">

<label className="block text-sm mb-2 text-gray-400">
Profile Photo
</label>

<input
type="file"
accept="image/*"

onChange={(e)=>{

const file = e.target.files[0];

if(file){

// save actual file
setPhotoFile(file);

// preview only
setPhotoUrl(
URL.createObjectURL(file)
);

}

}}

className="
w-full
text-gray-300
file:bg-red-500
file:text-white
file:border-0
file:px-4
file:py-2
file:rounded-lg
"
/>

</div>
{/* Email */}
<div className="mb-4">

  <label className="block text-sm mb-1 text-gray-400">
    Email
  </label>

  <input
    type="email"
    value={emailId}
    onChange={(e) => setEmailId(e.target.value)}
    placeholder="Enter email"
    className="w-full px-3 py-2 rounded-lg bg-[#0f0f0f] border border-gray-700"
  />

</div>

        {/* Password */}
        <div className="mb-4">

          <label className="block text-sm mb-1 text-gray-400">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-3 py-2 rounded-lg bg-[#0f0f0f] border border-gray-700"
          />

        </div>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleSignUp}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 transition py-2 rounded-lg font-semibold disabled:opacity-60"
        >

          {loading ? "Creating..." : "Sign Up"}

        </button>

      </div>

    </div>
  );
};

export default SignUp;