import Link from "next/link";
import React from "react";
import Drawer from "./Drawer";
import path from "path";

const Nav = () => {
  return (
    <div className="font-monterey text-2xl">
      <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 h-16 shadow-lg flex items-center justify-between px-4 sm:px-8 z-50">
        <div className="text-2xl font-extrabold text-orange-600 tracking-wide">
          Eventify
        </div>
        <div className="flex items-center space-x-4 sm:space-x-8">
          {/* Hide regular links on small screens, show in drawer */}
          <div className="hidden sm:flex space-x-4 sm:space-x-8">
            <Link href="/" passHref>
              <span className="cursor-pointer text-lg text-gray-800 hover:text-orange-600 transition-all duration-200 font-medium">
                Home
              </span>
            </Link>
            <Link href="/CreateEvent" passHref>
              <span className="cursor-pointer text-lg text-gray-800 hover:text-orange-600 transition-all duration-200 font-medium">
                Create
              </span>
            </Link>
            <Link href="/Planner" passHref>
              <span className="cursor-pointer text-lg text-gray-800 hover:text-orange-600 transition-all duration-200 font-medium">
                Planner
              </span>
            </Link>
          </div>
          
          {/* Drawer button - always visible */}
          <div className="drawer drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer"
                className="cursor-pointer text-lg text-gray-800 hover:text-orange-600 transition-all duration-200 font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="ml-2 hidden sm:inline">My Notes</span>
              </label>
            </div>
            <div className="drawer-side z-[60]">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="menu p-4 w-80 min-h-full bg-orange-50 text-base-content">
                <Drawer/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;