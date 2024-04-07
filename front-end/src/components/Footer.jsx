import React from "react";
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="max-w mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
      <div>
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">InstaJob</h1>
        <p className="py-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum
          corrupti fugiat provident ad eveniet praesentium, animi, laudantium
          totam veritatis, aut inventore eos corporis aperiam tempora voluptates
          optio quos repudiandae facilis.
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          <FaFacebookSquare size={30} color="white" />
          <FaInstagram size={30} color="white" />
          <FaTwitterSquare size={30} color="white" />
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6">
        <div>
          <h6 className="font-bold ">Legal</h6>
          <ul>
            <li className="py-2 text-sm ">Claim</li>
            <li className="py-2 text-sm ">Policy</li>
            <li className="py-2 text-sm ">Terms</li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold ">Support</h6>
          <ul>
            <li className="py-2 text-sm ">lorem</li>
            <li className="py-2 text-sm ">lorem</li>
            <li className="py-2 text-sm ">lorem</li>
            <li className="py-2 text-sm ">lorem</li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold">Company</h6>
          <ul>
            <li className="py-2 text-sm ">About</li>
            <li className="py-2 text-sm ">Jobs</li>
            <li className="py-2 text-sm ">Blog</li>
            <li className="py-2 text-sm ">Press</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
