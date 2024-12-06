import { NavLink, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext, useState } from "react";
import { logout } from "../utilities/data-access";

const Header = () => {
  const { user, setUser } = useContext(CurrentUserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  function handleLogout() {
    logout()
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }
  const linkClasses = "block py-2 px-3 rounded hover:text-yellow-500";

  return (
    <nav className="bg-bluegray text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <NavLink to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap ml-2">
            Sawyer's Book Website
          </span>
        </NavLink>
        <div className="w-full md:block md:w-auto">
          <ul className="font-medium flex flex-row p-4">
            <li>
              <NavLink to={"/all"} className={linkClasses}>
                All Books
              </NavLink>
            </li>
            <li>
              <NavLink to={"/user/1"} className={linkClasses}>
                Sawyer's Books
              </NavLink>
            </li>

            {user ? (
              <li className={linkClasses + " relative"}>
                {/* Button to toggle dropdown */}
                <button onClick={toggleDropdown} className="">
                  My Account{" "}
                  {user.roleId == 1 && (
                    <span className="bg-yellow-500 px-1 rounded-lg text-blue-900 text-sm font-semibold">
                      Admin
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <ul className="absolute mt-2 w-48 bg-bluegray border border-gray-700 rounded shadow-lg">
                    <li className={linkClasses}>
                      <NavLink
                        to={`/user/${user.userId}`}
                        className="block px-4 py-1 text-white hover:text-yellow-400"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </NavLink>
                    </li>

                    <li className={linkClasses}>
                      <button
                        className="block px-4 py-1 text-white hover:text-yellow-400"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <li>
                <NavLink to={`/login`} className={linkClasses}>
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
