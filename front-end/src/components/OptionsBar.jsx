import React from "react";

const OptionsBar = ({ selectedOption, handleOptionSelect }) => {
  const options = ["Jobs", "Create New", "Candidates", "Interview"];

  return (
    <div className="bg-gray-200 px-4 py-2 md:px-8 md:py-4 flex justify-between items-center">
      <div className="flex">
        {options.map((option) => (
          <button
            key={option}
            className={`p-2 mr-2 ${
              selectedOption === option ? "bg-[#00df9a] text-white" : ""
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionsBar;
