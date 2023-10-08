import React from "react";

export default function Searchbar() {
  return (
    <form className="py-4 flex justify-between w-1/2 mb-4">
      <input
        type="text"
        className=" bg-darker-pkn w-full py-3 rounded border-2 border-gray-50/10 px-4"
        placeholder="Search Pokemon"
      />
      <button className="bg-cyan-pkn px-4 ml-4 rounded-sm border-cyan-pnk/50 border-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </form>
  );
}
