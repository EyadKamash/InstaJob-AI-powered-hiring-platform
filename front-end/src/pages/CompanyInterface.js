import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function CompanyInterface() {
  const { user } = useContext(UserContext);
  const [firstname, setFirstname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFirstname(user.firstname);
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

  return (
    <div>
      <h1 className="text-white text-right mr-11">HELLO, {firstname}</h1>
      <button
        className="bg-[#ff5050] w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-black"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="text-white">CompanyInterface</div>
    </div>
  );
}

export default CompanyInterface;
