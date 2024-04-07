import React from "react";
import work from "../assets/work.png";

function MainPageBlockTwo() {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="w-[500px] mx-auto my-4" src={work} alt="working" />
        <div className="flex flex-col justify-center">
          <p className="text-[#00df9a] font-bold">AI-POWERED HIRING PLATFORM</p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 ">
            Transformative Solutions for Companies and Job Seekers.
          </h1>
          <p className="font-bold py-2">
            FOR HIRING COMPANIES: Streamline your hiring process with our
            AI-driven platform. Manage hiring analytics from a centralized
            dashboard, enabling data-informed decisions and efficient talent
            acquisition.
          </p>
          <p className="font-bold py-2">
            FOR JOB SEEKERS: Showcase your skills and boost your career with our
            AI-powered hiring platform. Simplify your job search, and let our
            technology match you with opportunities that fit your expertise and
            aspirations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPageBlockTwo;
