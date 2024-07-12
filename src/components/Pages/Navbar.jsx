import React, { useState, useContext } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import image from '../../assets/image.png';

const Navbar = ({ toggleSidebar }) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear local storage, update global state)
    localStorage.removeItem('userToken'); // Example: clear user token
    sessionStorage.removeItem("loggedInUserId");
    sessionStorage.removeItem("loggedInUserName");
    sessionStorage.removeItem("loggedInUserEmail");
    sessionStorage.removeItem("loggedInUserContact");
    sessionStorage.clear();
    navigate('/'); // Redirect to login page
    closeDropdown(); // Close the dropdown
  };
  return (
    <header className="flex w-full justify-between items-center bg-blue-800 p-4 text-white">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-2xl">
          <BiMenu />
        </button>
      </div>
      <div className="flex items-center">
        <div className="mb-3 xl:w-96">
          <div className="relative flex w-full flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-white dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <span
              className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-white dark:text-neutral-200"
              id="basic-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <img
            src={image}
            width="40"
            height="40"
            className="rounded-circle cursor-pointer"
            alt="Profile"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
             
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800"
                onClick={closeDropdown}
              >
                Edit Profile
              </Link>
              <hr />
              <Link
                to="/password"
                className="block px-4 py-2 text-gray-800"
                onClick={closeDropdown}
              >
                Change Password
              </Link>
              <hr />
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
