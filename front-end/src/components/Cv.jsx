import React, { useState } from "react";
import cv from "../assets/cv.jpg";

function Cv() {
  const [predictionResult, setPredictionResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction result");
      }

      const data = await response.text();
      setPredictionResult(data);
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., display error message
    }
  };

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="w-[500px] mx-auto my-4" src={cv} alt="CV" />
        <div className="flex flex-col justify-center">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 ">
            GET YOUR CV ANALYZED USING MODERN AI !
          </h1>
          <p className="font-bold py-2 my-4">
            Match with available job offers based on your cv
          </p>
          <p className="font-bold py-2 my-2">Upload your cv here :</p>
          <form
            id="uploadForm"
            action="/"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-auto">
                <input
                  type="file"
                  name="file"
                  accept=".pdf"
                  required
                  className="p-2 border border-gray-300 rounded-md w-[80%] md:w-full"
                />
              </div>

              <button
                type="submit"
                className="bg-[#00df9a]  rounded-md font-bold p-2 md:w-auto w-full text-black"
              >
                ANALYZE
              </button>
            </div>
          </form>
          <div className="text-black" id="predictionResult ">
            {predictionResult}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cv;
