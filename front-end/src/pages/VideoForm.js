import React, { useState } from "react";
// eslint-disable-next-line
import formstyle from "../CSS/formstyle.css";

const VideoForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    experience: "",
    jobLevel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      experience: "",
      jobLevel: "",
    });
  };

  return (
    <div className="container">
      <h2>Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience:</label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobLevel">Job Level:</label>
          <select
            id="jobLevel"
            name="jobLevel"
            value={formData.jobLevel}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select Job Level</option>
            <option value="Internship">Internship</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Junior Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
        <div className="center-btn">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoForm;
