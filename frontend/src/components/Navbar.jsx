import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-teal-600 fixed top-0 w-full">
      <div className="mycontainer text-orange-300 flex items-center justify-between px-4 h-14 py-5 ">
        <div className="logo font-bold text-2xl">
          PassKeep
          <link rel="icon" type="image/png" href="/logo.png" />
          <span className="text-gray-800">**</span>
        </div>
          <button
            className="text-white bg-teal-700 my-1 rounded-full flex justify-between items-center ">
            <img className="invert p-1 w-12" src="/github.svg" alt="github logo"/>
            <span className="font-bold px-4">Github</span>
          </button>
                </div>
    </nav>
  );
};

export default Navbar;
