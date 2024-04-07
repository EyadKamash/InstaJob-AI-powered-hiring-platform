import React from "react";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";

const MainPageBlockOne = () => {
  return (
    <div className="text-white">
      <div className="max-w-[800px] mt-[-96] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-10">
          Bridging Talent and opportunities in the digital world.
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-3xl sm:text-2xl text-xl font-bold">
            Fast, and reliable for
          </p>
          <ReactTyped
            className="md:text-3xl sm:text-2xl text-xl font-bold pl-2 text-[#00df9a]"
            strings={["Empowering Connections", "Transforming Recruitment"]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
          <Link to="/SignUp">Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default MainPageBlockOne;
