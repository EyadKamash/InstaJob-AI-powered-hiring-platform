import React from "react";

const OptionsBar = ({ selectedOption, handleOptionSelect }) => {
  const options = ["Jobs", "Create New", "Candidates", "Interview"];

  return (
    <div className="bg-black-200 flex-1 flex flex-col">
      <div className="flex-1">
        <ul className="text-white" style={{paddingTop:'1rem'}}>
          {options.map((option) => (
            <li key={option}>
              <button
                className={`w-full p-2 ${
                  selectedOption === option ? " text-white bg-gray-600" : ""
                }`}
                onClick={() => handleOptionSelect(option)} 
                style={{borderRadius:'10px' , padding:'1rem'}}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OptionsBar;