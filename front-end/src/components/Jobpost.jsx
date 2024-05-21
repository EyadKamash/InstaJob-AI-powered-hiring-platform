import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import ApplicationModal from "../Functions/ApplicationModal";

const Jobpost = ({ job }) => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div key={job._id}>
      <div className="bg-gray-200 shadow-xl rounded-lg p-4 mb-4 lg:w-[60%] sm:w-[100%]">
        <div className="text-xl font-bold text-gray-800">{job.title}</div>
        <div className="text-gray-600">{job.description}</div>
        <div className="text-gray-500">{job.country}</div>
        <div className="text-gray-500">{job.requirements}</div>
        <div className="text-gray-500">{job.responsibilities}</div>
        <div className="text-gray-500">{job.salary}</div>
        <div className="text-gray-500">Job Posted By: {job.companyemail}</div>
        <div className="text-gray-500">{job.deadline}</div>
        <div className="flex flex-wrap gap-2">
          {(job.tags || []).map((tag) => (
            <span
              key={tag}
              className="bg-gray-300 py-1 px-2 rounded-lg text-sm text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex mt-4">
          <button
            onClick={handleOpenModal}
            className="bg-[#00df9a] w-[200px] rounded-lg font-bold mx-auto py-2 px-4 text-black"
          >
            Apply Now
          </button>
        </div>
      </div>
      <ApplicationModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        job={job}
      />
    </div>
  );
};

export default Jobpost;
