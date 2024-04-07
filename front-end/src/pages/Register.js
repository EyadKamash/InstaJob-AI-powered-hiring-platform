import React, { useState } from "react";
import SignUpImage from "../assets/sign_in_up.png";
import "../CSS/FormPages.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [userType, setUserType] = useState("job_seeker");

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div>
      <div className="sign-up-container">
        <div className="form-container">
          <div className="form-content">
            <h1 className="form-title text-[#00df9a] ">
              YOUR JOURNEY STARTS HERE
            </h1>
            <form onSubmit={handleSubmit} className="form">
              <div className="input-group">
                <label className="label">First Name</label>
                <input
                  className="input"
                  type="text"
                  required
                  placeholder="First Name"
                />
              </div>
              <div className="input-group">
                <label className="label">Last Name</label>
                <input
                  className="input"
                  type="text"
                  required
                  placeholder="Last Name"
                />
              </div>
              <div className="input-group">
                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  required
                  placeholder="Email"
                />
              </div>
              <div className="input-group">
                <label className="label">Password</label>
                <input
                  className="input"
                  type="password"
                  required
                  placeholder="Passworrd"
                />
              </div>
              <div className="radio-group">
                <div>
                  <input
                    type="radio"
                    id="job_seeker"
                    name="user_type"
                    value="job_seeker"
                    checked={userType === "job_seeker"}
                    onChange={handleUserTypeChange}
                  />
                  <label htmlFor="job_seeker" className="label">
                    Job Seeker
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="company"
                    name="user_type"
                    value="company"
                    checked={userType === "company"}
                    onChange={handleUserTypeChange}
                  />
                  <label htmlFor="company" className="label">
                    Company
                  </label>
                </div>
              </div>
              <div className="flex">
                <button
                  className="bg-[#00df9a] w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-black  "
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="sign-in-link text-center ">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
          <img className="sign-up-image" src={SignUpImage} alt="Sign Up" />
        </div>
      </div>
    </div>
  );
};

export default Register;
