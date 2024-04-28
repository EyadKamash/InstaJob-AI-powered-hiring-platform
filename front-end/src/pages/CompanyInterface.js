import React, { useState, useContext, useEffect } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import "../CSS/Dashboard.css";
import OptionsBar from "../components/OptionsBar";
import DBoardContent from "../Functions/DBoardContent";

function CompanyInterface() {
  const { user } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

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
    }
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [selectedOption, setSelectedOption] = useState("Jobs");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-48 bg-black-200 flex-shrink-0">
        <OptionsBar
          selectedOption={selectedOption}
          handleOptionSelect={handleOptionSelect}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-white flex flex-col flex-1 px-4 py-4 md:px-8 md:py-8 overflow-y-auto">
          <DBoardContent selectedOption={selectedOption} />
        </div>
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <h1 className="font-style: italic">hello {user.firstname}</h1>
          <button
            className={`p-2 bg-red-500 text-white rounded ml-10 ${
              isMobile ? "w-full" : ""
            }`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyInterface;
