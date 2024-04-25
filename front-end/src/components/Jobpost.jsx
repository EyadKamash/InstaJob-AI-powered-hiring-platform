import React from "react";

const Jobpost = ({ job }) => {
  return (
    <div key={job._id}>
      <div className="bg-gray-200 shadow-xl rounded-lg p-4 mb-4 lg:w-[60%] sm:w-[100%]">
        <div className="text-xl font-bold text-gray-800">{job.title}</div>
        <div className="text-gray-600">{job.company}</div>
        <div className="text-gray-500">{job.location}</div>
        <div className="text-gray-500">{job.description}</div>
        <div className="text-gray-500">Date Posted: {job.datePosted}/</div>
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-300 py-1 px-2 rounded-lg text-sm text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex mt-4 ">
          <button className="bg-[#00df9a] w-[200px] rounded-lg font-bold mx-auto py-2 px-4 text-black ">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jobpost;
