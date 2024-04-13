import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Jobpost from "../components/Jobpost";

function ClientInterface() {
  const [firstname, setFirstname] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("http://localhost:4000/checklogin");
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
          setFirstname(response.data.firstname);
        } else {
          setIsLoggedIn(false);
          setFirstname("");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/logout", {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      setFirstname("");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoggedIn && (
        <h1 className="text-white text-right mr-11">HELLO, {firstname}</h1>
      )}
      {isLoggedIn && (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
      <div>
        <div className="text-white">
          {jobs && jobs.map((job) => <Jobpost key={job._id} job={job} />)}
        </div>
      </div>
    </div>
  );
}

export default ClientInterface;
