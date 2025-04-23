import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-orange-100 h-16 shadow-md flex items-center justify-between px-6 z-50">
      <div className="text-xl font-bold text-black">Events</div>
      <div className="space-x-6 flex">
        <Link href="/">
          <span className="text-black text-xl  hover:text-orange-500 transition font-medium">Home</span>
        </Link>
        <Link href="/createEvent">
          <span className="text-black text-xl  hover:text-orange-500 transition font-medium">Create Event</span>
        </Link>
        <Link href="/Schedule">
          <span className="text-black text-xl  hover:text-orange-500 transition font-medium">Planer</span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
