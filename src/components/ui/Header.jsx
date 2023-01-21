import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <header className="flex items-center justify-between bg-gray-900 py-3 px-6 text-white">
        {isLoggedIn ? (
          <Link to="/" className="text-lg font-medium">
            Home
          </Link>
        ) : (
          <nav className="flex">
            <Link to="/login" className="mx-3 text-lg font-medium">
              Login
            </Link>
            <Link to="/register" className="mx-3 text-lg font-medium">
              Register
            </Link>
          </nav>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout} className="text-lg font-medium">
            Logout
          </button>
        )}
      </header>
      <Outlet />
    </>
  );
}

export default Header;
