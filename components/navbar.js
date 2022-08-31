import React from "react";
import Link from "next/link";

export default function Navbar({ text, handleClick }) {
  return (
    <nav className="px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/" className="flex items-center ">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white hover:cursor-pointer">
            PostIT!
          </span>
        </Link>
        <div className="block w-auto" id="navbar-multi-level">
          <ul className="flex p-4  rounded-lg  flex-row space-x-8 mt-0 text-sm font-medium border-0 bg-white dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button
                onClick={() => handleClick()}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {text}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
