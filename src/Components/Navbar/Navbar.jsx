import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import DropdownMenu from "../DropDown/DropDownMenu";
import { getApplications } from "../../Utils/ApplicationApi";
import { userContext } from "../../Context/UserContext";
import { FaBell } from "react-icons/fa";
import { getRequest } from "../../Utils/RideApi";

function Navbar() {
  const { isAuthenticated, role } = useContext(authContext);
  const { userId } = useContext(userContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  const roleBasedNavigation = {
    "Land Lord": [
      { name: "Home", route: "/" },
      { name: "About", route: "/about" },
      { name: "Create New Listing", route: "/propertyform" },
      { name: "Chat Room", route: "/chatroom" },
      { name: "Application Portal", route: "/applicationportal" },
      { name: "Subscription", route: "/subscription" },
      {name:"Dashboard",route:"/dashboard"}
    ],
    Tenant: [
      { name: "Home", route: "/" },
      { name: "About", route: "/about" },
      { name: "Available Rentals", route: "/alllistings" },
      { name: "Chat Room", route: "/chatroom" },
      { name: "Subscription", route: "/subscription" },
    ],
    Admin: [
      { name: "Home", route: "/" },
      { name: "About", route: "/about" },
      { name: "Create New Subscription", route: "/createnewsubscription" },
      { name: "All Users", route: "/allusers" },
      { name: "Business Insights", route: "/earningfromsub" },
      {name:"Manage Subscription", route:"/subscription"},
      {name:"Reports & Suggestions", route:"/managereports&suggestions"}
    ],
    Driver: [
      { name: "Home", route: "/" },
      { name: "About", route: "/about" },
      { name: "Subscription", route: "/subscription" },
      { name: "My Schedule", route: "/myschedule" },
    ],
  };

  const navigationLinks = roleBasedNavigation[role] || [];

  const checkForNotifications = async () => {
    try {
      if (role === "Land Lord") {
        const response = await getApplications(userId);
        const hasPending = response.data.some(
          (item) => item.applicationStatus === "pending"
        );
        setHasNotification(hasPending);
      }

      if (role === "Driver" ) {
        const response = await getRequest(userId);
        if (response?.data && Array.isArray(response.data)) {
          const hasUnread = response.data.some((item) => item.isRead === false);
          setHasNotification(hasUnread);
        } else {
          console.error(
            "Invalid response data for Driver notifications:",
            response
          );
          setHasNotification(false);
        }
      }

      if (role === "Driver" ) {
        const response = await getRequest(userId);
        if (response?.data && Array.isArray(response.data)) {
          const hasUnread = response.data.some((item) => item.isRead === false);
          setHasNotification(hasUnread);
        } else {
          console.error(
            "Invalid response data for Driver notifications:",
            response
          );
          setHasNotification(false);
        }
      }
    } catch (error) {
      console.error("Error checking notifications")
      setHasNotification(false);
    }
  };

  useEffect(() => {
    {checkForNotifications()};
    const interval = setInterval(checkForNotifications, 5000);
    return () => clearInterval(interval);
  }, [role, userId]);

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-400 transition duration-200">
            MyWebsite
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-400 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <div className="hidden md:flex space-x-6 items-center">
          {navigationLinks.map((item, index) => (
            <Link
              key={index}
              to={item.route}
              className="hover:text-blue-400 transition duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {["Land Lord", "Driver"].includes(role) && (
            <div className="relative">
              <Link
                to={
                  role === "Land Lord"
                    ? "/applicationportal"
                    : "/drivernotifications"
                }
                aria-label="Notifications"
                className="hover:text-blue-400 transition duration-200"
              >
                <FaBell
                  size={20}
                  color={hasNotification ? "#d40b0e" : "white"}
                />
              </Link>
            </div>
          )}
          {isAuthenticated ? (
            <DropdownMenu />
          ) : (
            <Link
              to="/login"
              className="hover:text-blue-400 transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <div className="flex flex-col space-y-4 p-4">
            {navigationLinks.map((item, index) => (
              <Link
                key={index}
                to={item.route}
                className="hover:text-blue-400 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <DropdownMenu />
            ) : (
              <Link
                to="/login"
                className="hover:text-blue-400 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
