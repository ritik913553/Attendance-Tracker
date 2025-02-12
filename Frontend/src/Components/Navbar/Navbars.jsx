import React from "react";
import { Link } from "react-router-dom";
function Navbars(){
    return (
        <nav className=" px-3 py-5 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-white text-2xl font-bold">
              MyLogo
            </Link>
            {/* Menu Items */}
            <div className="space-x-6 hidden sm:block">
              <Link
                to="/home"
                className="text-white hover:text-blue-500 transition duration-300 mr-10"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-blue-500 transition duration-300 mr-10"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-white hover:text-blue-500 transition duration-300 mr-10"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-blue-500 transition duration-300 mr-10"
              >
                Contact
              </Link>
            </div>
    
            {/* Mobile Menu (for small screens) */}
            <div className="sm:hidden flex items-center">
              <button className="text-white text-xl">
                {/* Hamburger Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

          </div>
        </nav>
      );
}
export default Navbars;