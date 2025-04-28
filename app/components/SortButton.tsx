'use client'
import React from "react";

type SortButtonProps = {
  onClick: () => void;
};

const SortButton = ({ onClick }: SortButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 border border-orange-300 rounded-full hover:bg-orange-200 transition duration-200 shadow-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
        />
      </svg>
      Sort Items
    </button>
  );
};

export default SortButton;
