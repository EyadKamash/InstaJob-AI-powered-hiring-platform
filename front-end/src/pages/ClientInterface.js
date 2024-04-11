import React, { useState, useEffect } from "react";
import axios from "axios";
import Jobpost from "../components/Jobpost";

function ClientInterface() {
  const [jobs, setJobs] = useState([]);

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

  return (
    <div>
      <div className="text-white">
        {jobs && jobs.map((job) => <Jobpost key={job._id} job={job} />)}
      </div>
    </div>
  );
}

export default ClientInterface;
