import React, { useState, useEffect, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const VideoInterview = () => {
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [mediaStream, setMediaStream] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    video: true,
    onStop: (blobUrl) => {
      fetch(blobUrl)
        .then((res) => res.blob())
        .then((blob) => {
          setRecordedVideo(blob);
        })
        .catch((error) => console.error("Error fetching blob:", error));
    },
  });

  const videoRef = useRef(null);

  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    if (timer === 0) {
      stopRecording();
      setTimerActive(false);
      setTimer(120); // Reset the timer
    }
  }, [timer, stopRecording]);

  const handleTimerToggle = () => {
    setTimerActive((prev) => !prev);
    if (status === "idle") {
      startRecording();
    } else {
      stopRecording();
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        setMediaStream(stream);
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const handleUploadVideo = async () => {
    if (!recordedVideo) return;

    try {
      const formData = new FormData();
      formData.append("video", recordedVideo, "recorded_video.mp4");

      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Video uploaded:", data);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const calculateDashOffset = () => {
    const radius = 45; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const remainingPercentage = (timer / 120) * 100; // Adjust to match the total time (in seconds)
    return circumference - (circumference * remainingPercentage) / 100;
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        {mediaStream && (
          <video
            ref={videoRef}
            autoPlay
            muted
            controls={false}
            style={{
              width: "100%",
              maxWidth: "900px",
              transform: "scaleX(-1)",
              paddingTop: "2rem",
            }}
          />
        )}

        <div style={{ position: "relative" }}>
          <svg
            width="100"
            height="100"
            style={{ position: "absolute", right: "-10rem", top: "-280px" }}
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#2196F3"
              strokeWidth="10"
              strokeDasharray="282.6"
              strokeDashoffset={calculateDashOffset()}
              style={{
                transition: "stroke-dashoffset 1s linear",
              }}
            />
            <text
              x="50"
              y="55"
              fontSize="18"
              textAnchor="middle"
              fill="#2196F3"
            >
              {formatTime(timer)}
            </text>
          </svg>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={handleTimerToggle}
          style={{
            backgroundColor: status === "idle" ? "#4CAF50" : "#f44336",
            color: "black",
            fontWeight: "bolder",
            padding: "15px 32px",
            textAlign: "center",
            display: "inline-block",
            fontSize: "24px",
            margin: "20px 0",
            marginRight: "20px",
            borderRadius: "12px",
            border: "none",
          }}
        >
          {status === "idle" ? "Start Recording" : "Stop Recording"}
        </button>
      </div>

      {recordedVideo && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <video src={URL.createObjectURL(recordedVideo)} controls />
          <button
            onClick={handleUploadVideo}
            style={{
              backgroundColor: "#2196F3",
              color: "black",
              fontWeight: "bolder",
              padding: "15px 32px",
              textAlign: "center",
              display: "inline-block",
              fontSize: "24px",
              margin: "20px 0",
              borderRadius: "12px",
              border: "none",
            }}
          >
            Upload Video
          </button>
        </div>
      )}
    </div>
  );
};
export default VideoInterview;
