import React from "react";

const MainPageFeatures = () => {
  return (
    <div className="w-full bg-black py-16">
      <div className="max-w-[1240px] mx-auto px-2">
        <h1 className="text-[#00df9a] md:text-4xl sm:text-3xl text-2xl font-bold text-center py-8">
          Features
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl">
            <p className="font-bold text-2xl py-2 text-center">
              AI powered CV filtering
            </p>
            <p className="text-gray-400 text-center">
              Improve the hiring process by using AI to filter and sort CVs.
            </p>
          </div>
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl">
            <p className="font-bold text-2xl py-2 text-center">Easy Apply</p>
            <p className="text-gray-400 text-center">
              Upload your CV and let AI review it. Based on the review, AI will
              search for compatible and matching jobs, and apply for them on
              your behalf.
            </p>
          </div>
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl">
            <p className="font-bold text-2xl py-2 text-center">
              AI powered Interviews
            </p>
            <p className="text-gray-400 text-center">
              Conduct more efficient and objective interviews using AI
              technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageFeatures;
