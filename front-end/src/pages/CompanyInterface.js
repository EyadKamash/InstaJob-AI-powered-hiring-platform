import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import "../CSS/Dashboard.css";
import OptionsBar from "../components/OptionsBar";
import DBoardContent from "../Functions/DBoardContent";

function CompanyInterface() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/logout");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
            className="p-2 bg-red-500 text-white rounded"
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