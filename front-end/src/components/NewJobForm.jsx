import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

function NewJobForm() {
  const { user } = useContext(UserContext);
  const [companyemail, setCompanyEmail] = useState(user.email);
  const [selectedOption, setSelectedOption] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [rewards, setRewards] = useState("");
  const [deadline, setDeadline] = useState("");
  const [salary, setSalary] = useState("");
  const [city, setCity] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [remote, setRemote] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/postingjobs", {
        companyemail,
        title: selectedOption,
        description,
        requirements,
        responsibilities,
        rewards,
        deadline,
        salary,
        country: selectedCountry,
        city,
        remote,
      });
      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred while posting the job.");
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `http://api.geonames.org/countryInfoJSON?username=janna21&style=FULL`
        );
        const data = await response.json();
        console.log("Response data:", data);
        if (data.geonames && data.geonames.length > 0) {
          setCountryList(data.geonames);
          setSelectedCountry(data.geonames[0].countryName);
        } else {
          console.error(
            "Error fetching countries:",
            data.status.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div>
      <div>
        <h1 style={{ fontSize: "25px", fontWeight: "bolder" }}>New Job</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
          <label htmlFor="Fname" className="block mb-2">
            Job Title
          </label>

          <select
            id="options"
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            className="w-full border-4 border-white-300 p-5 mb-4"
          >
            <option value="">-- Select an option --</option>
            <option value="option1">Java Developer</option>
            <option value="option2">DevOps Engineer</option>
            <option value="option3">Python Developer</option>
            <option value="option4">Web Designer</option>
            <option value="option5">HR</option>
            <option value="option6">Testing</option>
            <option value="option7">Operations Manager</option>
            <option value="option8">Hadoop</option>
            <option value="option9">Data Science</option>
            <option value="option10">Blockchain</option>
            <option value="option11">ETL Developer</option>
            <option value="option12">Mechanical Engineer</option>
            <option value="option13">Sales</option>
            <option value="option14">Arts</option>
            <option value="option15">Database</option>
            <option value="option16">Electrical Engineering</option>
            <option value="option17">PMO</option>
            <option value="option18">Health and fitness</option>
            <option value="option19">Business Analyst</option>
            <option value="option20">DotNet Developer</option>
            <option value="option21">Automation Testing</option>
            <option value="option22">Network Security Engineer</option>
            <option value="option23">SAP Developer</option>
            <option value="option24">Civil Engineer</option>
            <option value="option25">Advocate</option>
          </select>

          <div className="flex">
            <div className="w-1/2 pr-2">
              <label className="block mb-2">Deadline</label>
              <input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                className="w-full border-2 border-gray-300 p-2 mb-4"
              />
            </div>

            <div className="w-1/2 pl-2">
              <label htmlFor="salary" className="block mb-2">
                Salary
              </label>
              <input
                type="number"
                id="salary"
                value={salary}
                onChange={(event) => setSalary(event.target.value)}
                className="w-full border-2 border-gray-300 p-2 mb-4"
              />
            </div>
          </div>

          <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
            <input
              type="checkbox"
              checked={remote}
              onChange={(e) => setRemote(e.target.checked)}
            />
            <label style={{ padding: "0.7rem" }}>Remote position</label>
          </div>

          <div className="flex">
            <div className="w-1/2 pr-2">
              <label>Country</label>
              <select
                value={selectedCountry || "none"}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                }}
                className="w-full border-4 border-white-3000 p-4 mb-4"
                style={{ width: "550px", height: "45px" }}
              >
                {countryList.map((country, index) => (
                  <option key={country.countryCode} value={country.countryName}>
                    {country.countryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/2 pl-2">
              <label>City</label>
              <input
                type="text"
                id="country"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="w-full border-2 border-gray-300 p-2 mb-4"
              />
            </div>
          </div>

          <label htmlFor="desc" className="block mb-2">
            Job Description
          </label>
          <textarea
            type="text"
            id="desc"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full border-2 border-gray-300 p-2 mb-4"
          />

          <label htmlFor="email" className="block mb-2">
            Job Requirements
          </label>
          <textarea
            type="text"
            id="email"
            value={requirements}
            onChange={(event) => setRequirements(event.target.value)}
            className="w-full border-2 border-gray-300 p-2 mb-4"
          />

          <label htmlFor="resp" className="block mb-2">
            Job Responsibilities
          </label>
          <textarea
            type="text"
            id="responsibilities"
            value={responsibilities}
            onChange={(event) => setResponsibilities(event.target.value)}
            className="w-full border-2 border-gray-300 p-2 mb-4"
          />

          <label htmlFor="rew" className="block mb-2">
            Job Rewards
          </label>
          <textarea
            type="text"
            id="rew"
            value={rewards}
            onChange={(event) => setRewards(event.target.value)}
            className="w-full border-2 border-gray-300 p-2 mb-4"
          />

          <button type="submit" className="w-full bg-blue-500 text-white p-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewJobForm;
