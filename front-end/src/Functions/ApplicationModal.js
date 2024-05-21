import React, { useState, useContext } from "react";
import Modal from "react-modal";
import axios from "axios";
import { UserContext } from "../UserContext";

Modal.setAppElement("#root");

const ApplicationModal = ({ isOpen, onRequestClose, job }) => {
  const { user } = useContext(UserContext);
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [previousWorkName, setPreviousWorkName] = useState("");
  const [jobLevel, setJobLevel] = useState(""); // New state for job level

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      applicantName: user.firstname,
      applicantEmail: user.email,
      jobTitle: job.title,
      yearsOfExperience,
      collegeName,
      companyName,
      previousWorkName,
      companyEmail: job.companyemail,
      jobLevel,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/apply",
        applicationData
      );

      if (response.status === 201) {
        alert("Application submitted successfully!");
        onRequestClose(); // Close the modal on success
      } else {
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred while submitting your application.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      className="relative p-6 bg-transparent rounded-lg max-w-lg w-full mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Apply for {job.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Applicant Name
            </label>
            <input
              type="text"
              value={user.firstname}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Applicant Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              value={job.title}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Years of Experience
            </label>
            <input
              type="number"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Applicant College Name
            </label>
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Previous Work Name
            </label>
            <input
              type="text"
              value={previousWorkName}
              onChange={(e) => setPreviousWorkName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="jobLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Job Level
            </label>
            <select
              id="jobLevel"
              name="jobLevel"
              value={jobLevel}
              onChange={(e) => setJobLevel(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select Job Level</option>
              <option value="Internship">Internship</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Email
            </label>
            <input
              type="email"
              value={job.companyemail}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onRequestClose}
              className="mr-3 inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ApplicationModal;
