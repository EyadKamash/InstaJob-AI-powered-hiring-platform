import React, { useState } from "react";

function NewJobForm() {
  const [desc, setdesc] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${desc}, Email: ${email}`);
    console.log(`Selected option: ${selectedOption}`);
  };

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
            <option value="option6">Operations Manager</option>       
          </select>

        <label htmlFor="desc" className="block mb-2">
            Job Description
          </label>
          <textarea
            type="text"
            id="desc"
            value={desc}
            onChange={(event) => setdesc(event.target.value)}
            className="w-full border-2 border-gray-300 p-2 mb-4"
          />

          <label htmlFor="email" className="block mb-2">
            Job Requirements
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border-2 border-gray-300 p-7 mb-4"
          />

          <label htmlFor="resp" className="block mb-2">
            Job Responsibilities
          </label>
          <input
            type="text"
            id="resp"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border-2 border-gray-300 p-7 mb-4"
          />

          <label htmlFor="rew" className="block mb-2">
            Job Rewards
          </label>
          <input
            type="text"
            id="rew"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border-2 border-gray-300 p-7 mb-4"
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