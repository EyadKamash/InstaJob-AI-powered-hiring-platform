import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const ClientDBoardContent = ({ selectedOption }) => {
  const { user } = useContext(UserContext);
  let content = null;
  switch (selectedOption) {
    case "Jobs":
      content = <div></div>;
      break;
    case "Applications":
      content = <div>Applications appear here</div>;

      break;
    case "My Profile":
      content = (
        <div>
          {user.firstname}
          <br />
          {user.email}
          <br />
          {user.lastname}
          <br />
          {user.usertype}
          <br />
          <br />
          {user.email}
        </div>
      );
      break;
    case "Interviews":
      content = <div>Interview Content Here</div>;
      break;
    default:
      content = (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">You have no jobs posted</h1>
          <h1 className="text-lg text-gray-500">
            Get started and post your new job on InstaJob ss
          </h1>
        </div>
      );
      break;
  }

  return content;
};

export default ClientDBoardContent;
