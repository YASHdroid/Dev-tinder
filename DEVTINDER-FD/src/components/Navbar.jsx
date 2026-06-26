import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "logout", {}, { withCredentials: true });
      dispatch(removeUser());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // FIX: was bg-[#1111] which is invalid — changed to bg-[#111111]
    <div className="navbar bg-[#111111] border-b-2 border-gray-800 px-6">

      {/* Left */}
      <div className="flex-1">
        <Link to="/feed" className="text-2xl font-bold text-[#ff2d2d]">
          DevTinder
        </Link>
      </div>

      {/* Right */}
      <div className="flex gap-3 items-center">
        {user ? (
          <>
            <div className="text-sm text-gray-300">
              Welcome,{" "}
              <span className="text-white font-medium">{user.firstName}</span>
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border">
                  <img
                    alt="user"
                    src={
                      user.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#1a1a1a] rounded-box w-52"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  {/* FIX: was /Connections (capital C) — route is defined as /connections */}
                  <Link to="/connections">Friends</Link>
                </li>
                <li>
                  <Link to="/request">Requests</Link>
                </li>
                <li>
                  <a onClick={handleLogout} className="text-red-500 cursor-pointer">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <a href="/login" className="btn btn-primary">
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;