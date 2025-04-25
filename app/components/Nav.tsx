import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <div className="font-monterey text-2xl">
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 h-16 shadow-lg flex items-center justify-between px-8 z-50">
      <div className="text-2xl font-extrabold text-orange-600 tracking-wide">Eventify</div>
      <div className="space-x-8 flex">
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
    </div>
    </div>
  );
};

export default Nav;
