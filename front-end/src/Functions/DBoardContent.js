import React from "react";

const DBoardContent = ({ selectedOption }) => {
  let content = null;
  switch (selectedOption) {
    case "Jobs":
      content = (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">You have no jobs posted</h1>
          <h1 className="text-lg text-gray-500">
            Get started and post your new job on InstaJob
          </h1>
        </div>
      );
      break;
    case "Create New":
      content = <div>Create New Content Here</div>;
      break;
    case "Candidates":
      content = <div>Candidates Content Here</div>;
      break;
    case "Interview":
      content = <div>Interview Content Here</div>;
      break;
    default:
      content = (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">You have no jobs posted</h1>
          <h1 className="text-lg text-gray-500">
            Get started and post your new job on InstaJob
          </h1>
        </div>
      );
      break;
  }

  return content;
};

export default DBoardContent;
