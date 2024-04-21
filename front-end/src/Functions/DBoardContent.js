import React from "react";
import NewJobForm from "../components/NewJobForm";

const DBoardContent = ({ selectedOption }) => {
  let content = null;
  switch (selectedOption) {
    case "Jobs":
      content = (
        <div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#00df9a', borderRadius: '6px 0 0 6px' }}>Open Jobs</button>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#848484', borderRadius: '0 6px 6px 0' }}>Closed Jobs</button>
          </div>
          <button style={{ padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: 'black', color: 'white', borderRadius: '15px' }}>Post Job</button>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">You have no jobs posted</h1>
          <h1 className="text-lg text-gray-500">
            Get started and post your new job on InstaJob
          </h1>
        </div>
        </div>
      );
      break;
    case "Create New":
      content = <div>
        <NewJobForm/>
      </div>;

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
            Get started and post your new job on InstaJob ss
          </h1>
        </div>
      );
      break;
  }

  return content;
};

export default DBoardContent;
