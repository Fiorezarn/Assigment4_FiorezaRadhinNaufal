import Profile from "../assets/evan.jpg";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/academy-logo.png";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export function MainNavbar() {
  const { cookie } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "auth/getCookieRequest" });
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "auth/logoutRequest" });
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white border-gray-700">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12" alt="Flowbite Logo" />
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {cookie ? (
            <div className="relative inline-block text-left">
              <button onClick={toggleDropdown}>
                <img
                  src={Profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-fill"
                />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-10">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-white">
                      {cookie?.us_username}
                    </span>
                    <span className="block text-sm text-gray-400 truncate">
                      {cookie?.us_email}
                    </span>
                  </div>
                  <hr className="border-gray-600" />
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white cursor-pointer"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="text-sm  text-blue-600 hover:underline">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainNavbar;
