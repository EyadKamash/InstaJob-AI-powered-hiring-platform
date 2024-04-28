import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import SignInImage from "../assets/sign_in_up.png";
import { UserContext } from "../UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [userType, setUserType] = useState("");
  // eslint-disable-next-line
  const [firstname, setFirstName] = useState("");
  // eslint-disable-next-line
  const [lastname, setLastName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      alert("Login Successful");

      setUser({
        email: response.data.email,
        id: response.data.id,
        usertype: response.data.usertype,
        lastname: response.data.lastname,
        firstname: response.data.firstname,
      });
      setUserType(response.data.usertype);
      setFirstName(response.data.firstname);
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      setRedirect(true);
    } catch (error) {
      alert("Invalid email or password");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (redirect) {
      if (userType === "job_seeker") {
        navigate("/clienthome", { state: { firstname, email } });
      } else {
        navigate("/companyhome", { state: { firstname, email } });
      }
    }
  }, [redirect, userType, firstname, lastname, email, navigate]);

  return (
    <div>
      {!redirect ? (
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
      ) : (
        <Navigate
          to={userType === "job_seeker" ? "/clienthome" : "/companyhome"}
          state={{ firstname, email }}
        />
      )}
    </div>
  );
};

export default Login;
