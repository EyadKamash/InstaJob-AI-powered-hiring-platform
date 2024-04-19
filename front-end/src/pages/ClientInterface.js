import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Jobpost from "../components/Jobpost";
import { UserContext } from "../UserContext";

function ClientInterface() {
  const { user } = useContext(UserContext);
  const [firstname, setFirstname] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [showRemote, setShowRemote] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
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
          setFilteredJobs(response.data);
          setFirstname(user.firstname);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          navigate("/login");
        }
      };

      fetchJobs();
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/logout");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    filterJobs(e.target.value, showRemote, selectedCountry);
  };

  const handleRemoteChange = (e) => {
    setShowRemote(e.target.checked);
    filterJobs(filter, e.target.checked, selectedCountry);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    filterJobs(filter, showRemote, e.target.value);
  };

  const filterJobs = (title, remote, country) => {
    let filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(title.toLowerCase()) &&
        (remote ? job.location.toLowerCase().includes("remote") : true) &&
        (country !== ""
          ? job.location.toLowerCase().includes(country.toLowerCase())
          : true)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/4 p-4">
        <h1 className="text-lg font-bold mb-2">Filters</h1>
        <input
          type="text"
          placeholder="Search by job title"
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg px-3 py-1 w-full mb-4"
        />
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={showRemote}
            onChange={handleRemoteChange}
            className="mr-2"
          />
          Remote Jobs
        </label>
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="border border-gray-300 rounded-lg px-3 py-1 w-full"
        >
          <option value="">All Countries</option>
          {/* Add your country options here */}
        </select>
      </div>
      <div className="lg:w-3/4 p-4">
        <h1 className="text-white text-right mr-11">HELLO, {firstname}</h1>
        <button
          className="bg-[#ff5050] w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-black"
          onClick={handleLogout}
        >
          Logout
        </button>
        <div className="text-white">
          {filteredJobs.map((job) => (
            <Jobpost key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientInterface;
