import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import ClientOptionsBar from "../components/ClientOptionsBar";
import ClientDBoardContent from "../Functions/ClientDBoardContent";
import UseJobFilter from "../components/UseJobFilter"; // Import the custom hook

function ClientInterface() {
  const { user } = useContext(UserContext);
  const [firstname, setFirstname] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [isMobile, setIsMobile] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Jobs"); // Added this line

  // Use the custom hook
  const {
    filteredJobs,
    filter,
    showRemote,
    selectedCountry,
    handleFilterChange,
    handleRemoteChange,
    handleCountryChange,
  } = UseJobFilter(jobs);

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
        <div className="bg-white flex flex-col flex-1 p-4 md:p-8 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold">Hello, {firstname}</h1>
            <button
              className="p-2 bg-red-500 text-white rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            <ClientDBoardContent
              selectedOption={selectedOption}
              filteredJobs={filteredJobs}
              filter={filter}
              showRemote={showRemote}
              selectedCountry={selectedCountry}
              handleFilterChange={handleFilterChange}
              handleRemoteChange={handleRemoteChange}
              handleCountryChange={handleCountryChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientInterface;
