import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import Jobpost from "../components/Jobpost";
import axios from "axios";

const ClientDBoardContent = ({
  selectedOption,
  filteredJobs,
  filter,
  showRemote,
  selectedCountry,
  handleFilterChange,
  handleRemoteChange,
  handleCountryChange,
}) => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [cv, setCv] = useState(null);
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    usertype: user.usertype,
    profilePhoto: user.profilePhoto,
    cv: user.cv,
    age: user.age || "", // Add age
    highschool: user.highschool || "", // Add highschool
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleCvChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email); //meen 3ando el email da
    formDataToSend.append("firstname", formData.firstname);
    formDataToSend.append("lastname", formData.lastname);
    formDataToSend.append("age", formData.age); // Add age to formDataToSend
    formDataToSend.append("highschool", formData.highschool); // Add highschool to formDataToSend

    if (profilePhoto) {
      formDataToSend.append("profilePhoto", profilePhoto);
    }

    if (cv) {
      formDataToSend.append("cv", cv);
    }

    try {
      const response = await axios.put(
        "http://localhost:4000/updateprofile",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.message === "Profile updated successfully") {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert("An error occurred while updating the profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  let content = null;

  switch (selectedOption) {
    case "Jobs":
      content = (
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
            className="border border-gray-300 rounded-lg px-3 py-1 w-full mb-4"
          >
            <option value="">All Countries</option>
            {/* Add your country options here */}
          </select>
          <div className="flex-1 overflow-auto">
            <div className="flex flex-col space-y-4 p-12">
              {filteredJobs.map((job) => (
                <Jobpost key={job._id} job={job} className="m-2" />
              ))}
            </div>
          </div>
        </>
      );
      break;
    case "Applications":
      content = <div>Applications appear here</div>;
      break;
    case "My Profile":
      content = (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CV
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCvChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
              </div>
              <button
                onClick={handleSaveChanges}
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <span className="font-semibold">First Name:</span>{" "}
                {formData.firstname}
              </div>
              <div>
                <span className="font-semibold">Last Name:</span>{" "}
                {formData.lastname}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {formData.email}
              </div>
              <div>
                <span className="font-semibold">Age:</span> {formData.age}
              </div>
              <div>
                <span className="font-semibold">Profile Photo:</span>{" "}
                {formData.profilePhoto && (
                  <img
                    src={formData.profilePhoto}
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                )}
              </div>
              <div>
                <span className="font-semibold">CV:</span>{" "}
                {formData.cv && (
                  <a
                    href={formData.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    View CV
                  </a>
                )}
              </div>
              <button
                onClick={handleEditToggle}
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      );
      break;
    default:
      content = <div>Please select an option from the sidebar.</div>;
      break;
  }

  return <div className="p-8">{content}</div>;
};

export default ClientDBoardContent;
