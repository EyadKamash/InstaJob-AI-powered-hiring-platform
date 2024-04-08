import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../CSS/FormPages.css";
import SignInImage from "../assets/sign_in_up.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      alert("Login Successful");
      console.log(response.data); // Log the response from the backend
      // Optionally, redirect the user to another page
    } catch (error) {
      alert("Invalid email or password ! ");
      console.error("Error:", error);
    }
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
                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="label">Password</label>
                <input
                  className="input"
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex">
                <button
                  className="bg-[#00df9a] w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-black"
                  type="submit"
                >
                  Log In
                </button>
              </div>
            </form>
            <p className="sign-in-link text-center ">
              New User? <Link to="/register">Sign Up</Link>
            </p>
          </div>
          <img className="sign-up-image" src={SignInImage} alt="Sign In" />
        </div>
      </div>
    </div>
  );
};

export default Login;
