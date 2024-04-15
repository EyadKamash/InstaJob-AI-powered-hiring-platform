import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Jobpost from "../components/Jobpost";
import { UserContext } from "../UserContext";

function ClientInterface() {
  const { user } = useContext(UserContext);
  const [firstname, setFirstname] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const fetchJobs = async () => {
        try {
          const response = await axios.get("http://localhost:4000/jobs", {
            withCredentials: true,
          });
          setJobs(response.data);
          setFirstname(user.firstname);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          navigate("/login");
        }
      };

      fetchJobs();
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/logout");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <h1 className="text-white text-right mr-11">HELLO, {firstname}</h1>
      <button
        className="bg-[#ff5050] w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-black"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div>
        <div className="text-white">
          {jobs && jobs.map((job) => <Jobpost key={job._id} job={job} />)}
        </div>
      </div>
    </div>
  );
}

export default ClientInterface;
