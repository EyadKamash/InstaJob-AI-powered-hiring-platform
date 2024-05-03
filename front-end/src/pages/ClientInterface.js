import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import ClientOptionsBar from "../components/ClientOptionsBar";
import Jobpost from "../components/Jobpost";
import ClientDBoardContent from "../Functions/ClientDBoardContent";

function ClientInterface() {
  const { user } = useContext(UserContext);
  const [firstname, setFirstname] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [showRemote, setShowRemote] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOption, setSelectedOption] = useState("Jobs");
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const fetchJobs = async () => {
        try {
          const response = await axios.get("http://localhost:4000/jobs", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
    localStorage.removeItem("token");
    navigate("/login");
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

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-48 bg-black-200 flex-shrink-0">
        <ClientOptionsBar
          selectedOption={selectedOption}
          handleOptionSelect={handleOptionSelect}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-white flex flex-col flex-1 px-4 py-4 md:px-8 md:py-8">
          {selectedOption === "Jobs" && (
            <>
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
              <div className="flex flex-col space-y-4 p-12">
                {filteredJobs.map((job) => (
                  <Jobpost key={job._id} job={job} className="m-2" />
                ))}
              </div>
            </>
          )}
          {selectedOption !== "Jobs" && (
            <ClientDBoardContent
              selectedOption={selectedOption}
              filteredJobs={filteredJobs}
              filter={filter}
              showRemote={showRemote}
              selectedCountry={selectedCountry}
            />
          )}
        </div>
        <div
          className={`flex items-center ${
            isMobile ? "flex-col" : "flex-row"
          } space-y-4 p-4`}
        >
          <h1
            className={`text-lg font-bold text-white ${
              isMobile ? "text-center" : ""
            }`}
          >
            Hello, {firstname}
          </h1>
          {isMobile && (
            <button
              className="p-2 bg-red-500 text-white rounded w-full mt-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
          {!isMobile && (
            <div className="ml-auto">
              <button
                className="p-2 bg-red-500 text-white rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientInterface;
