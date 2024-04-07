import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
const Header = () => {
  const [nav, setNav] = useState(true);

  const NavHandler = () => {
    setNav(!nav);
  };
  return (
    <div className="flex justify-between items-center h-24 max-w-[1240] mx-auto px-4  text-white">
      <Link to="/">
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">INSTAJOB</h1>
      </Link>
      <ul className="hidden md:flex">
        <li className="p-4">
          <Link to="/services">Services</Link>
        </li>
        <li className="p-4">HelpCenter</li>
        <li className="p-4">About</li>
        <li className="p-4">Contact</li>
      </ul>
      <div onClick={NavHandler} className="block md:hidden">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
          INSTAJOB
        </h1>
        <ul className="uppercase p-4 ">
          <li className="p-4 border-b border-gray-600">Services</li>
          <li className="p-4 border-b border-gray-600">HelpCenter</li>
          <li className="p-4 border-b border-gray-600">About</li>
          <li className="p-4 border-b border-gray-600">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
