import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

function NewJobForm() {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
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
    <div className="flex justify-center items-start">
      <div className="w-full rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">New Job</h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Job Title
          </label>
          <select
            id="title"
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            className="w-full border border-gray-300 p-2 pl-10 text-sm text-gray-700"
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

          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="deadline"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                className="w-full border border-gray-300 p-2 text-sm text-gray-700"
              />
            </div>

            <div className="w-1/2 pl-2">
              <label
                htmlFor="salary"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                value={salary}
                onChange={(event) => setSalary(event.target.value)}
                className="w-full border border-gray-300 p-2 text-sm text-gray-700"
              />
            </div>
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="remote"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Remote position
              </label>
              <input
                type="checkbox"
                id="remote"
                checked={remote}
                onChange={(e) => setRemote(e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded-sm text-blue-500 focus:ring-blue-500 focus:ring-2"
              />
            </div>

            <div className="w-1/2 pl-2">
              <label
                htmlFor="country"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Country
              </label>
              <select
                value={selectedCountry || "none"}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                }}
                className="w-full border border-gray-300 p-2 text-sm text-gray-700"
              >
                {countryList.map((country, index) => (
                  <option key={country.countryCode} value={country.countryName}>
                    {country.countryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="w-full border border-gray-300 p-2 text-sm text-gray-700"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Job Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full border border-gray-300 p-2 text-sm text-gray-700"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="requirements"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Job Requirements
            </label>
            <textarea
              id="requirements"
              value={requirements}
              onChange={(event) => setRequirements(event.target.value)}
              className="w-full border border-gray-300 p-2 text-sm text-gray-700"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="responsibilities"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Job Responsibilities
            </label>
            <textarea
              id="responsibilities"
              value={responsibilities}
              onChange={(event) => setResponsibilities(event.target.value)}
              className="w-full border border-gray-300 p-2 text-sm text-gray-700"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="rewards"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Job Rewards
            </label>
            <textarea
              id="rewards"
              value={rewards}
              onChange={(event) => setRewards(event.target.value)}
              className="w-full border border-gray-300 p-2 text-sm text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewJobForm;
