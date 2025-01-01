import React, { useState, useRef, useContext, useEffect } from "react";
import { authContext } from "../../Context/AuthContext";
import { userContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";

function DropdownMenu() {
  const { userId } = useContext(userContext);
  const { role } = useContext(authContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const menuItems = {
    "Land Lord": [
      { label: "My Account", path: `/myaccount/${userId}` },
      { label: "My Listing History", path: "/myproperties" },
      { label: "Chatting History", path: "/chathistory" },
      { label: "My Ride History", path: "/myridehistory" },
      { label: "Logout", path: "/logout" },
    ],
    Tenant: [
      { label: "My Account", path: `/tenantaccount/${userId}` },
      { label: "My Application History", path: "/myapplication" },
      { label: "Chatting History", path: "/chathistory" },
      { label: "My Ride History", path: "/myridehistory" },
      { label: "Logout", path: "/logout" },
    ],
    Admin: [
      { label: "Logout", path: "/logout" },
    ],

    Driver: [
      { label: "My Account", path: `/driveraccount/${userId}` },
      { label: "Logout", path: "/logout" },
    ],
  };

  const userMenu = menuItems[role] || [];

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Menu
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-50"
          role="menu"
          aria-orientation="vertical"
        >
          {userMenu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;

