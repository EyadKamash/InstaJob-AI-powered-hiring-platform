import React, { useState, useEffect, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useSpeechSynthesis } from 'react-speech-kit';

const VideoInterview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes timer
  const [timerActive, setTimerActive] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showStopButton, setShowStopButton] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false); // State to control whether to show question

  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } = useReactMediaRecorder({
    video: { facingMode: "user" }, // Ensure the camera faces the user
    onStop: (blobUrl, blob) => {
      setVideoBlob(blob);
    },
  });

  const { speak } = useSpeechSynthesis();
  const timerRef = useRef(null);
  const videoRef = useRef(null);
  const initialPreviewStreamRef = useRef(null); // Store initial preview stream

  useEffect(() => {
    if (videoRef.current && initialPreviewStreamRef.current === null && previewStream) {
      videoRef.current.srcObject = previewStream;
      initialPreviewStreamRef.current = previewStream; // Store the initial preview stream
    }
  }, [previewStream]);

  useEffect(() => {
    fetch('http://localhost:4000/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('User info received:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(timerRef.current);
    } else if (timeLeft === 0) {
      handleStopRecording(); // Automatically stop recording when time is up
      clearInterval(timerRef.current);
    }
  }, [timerActive, timeLeft]);

  const handleNext = () => {
    fetch('http://localhost:4000/next', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('No more questions available.');
        }
        return response.json();
      })
      .then(data => {
        setCurrentQuestion(data.question);
        speak({ text: data.question });
        console.log('Received question:', data.question);
        setTimeLeft(120); // reset timer
        setTimerActive(true); // start timer
        setShowTimer(true); // show timer
        setShowQuestion(false); // hide shown question
      })
      .catch((error) => {
        console.error('Error:', error);
        setCurrentQuestion(null);
      });
  };

  const handleShow = () => {
    setShowQuestion(true);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    startRecording();
    setShowButtons(true); // show buttons when recording starts
    setShowStartButton(false); // hide start button after starting
    setShowStopButton(true); // show stop button after starting
    setTimerActive(true); // start timer
    setShowTimer(true); // show timer
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopRecording();
    setShowStopButton(false); // hide stop button after stopping
    setShowButtons(false); // hide next and show question buttons after stopping
    document.getElementById('question').innerText = ''; // Clear displayed question
    setTimerActive(false); // stop timer
    setShowTimer(false); // hide timer after stopping
  };

  const uploadVideo = async () => {
    if (!videoBlob) return;

    const formData = new FormData();
    formData.append("video", videoBlob, "recorded_video.mp4");

    try {
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

  return (
    <div style={styles.container}>
      {showTimer && (
        <div style={styles.timerContainer}>
          <h1 className="text-[#4CAF50] text-2xl font-bold px-2">Time left  </h1>
          <svg style={styles.timerCircle} width="100" height="100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#4CAF50"
              strokeWidth="6"
              fill="none"
              strokeDasharray="282"
              strokeDashoffset={(1 - timeLeft / 120) * 282}
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              stroke="#4CAF50"
              strokeWidth="1px"
              dy=".3em"
            >
              {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </text>
          </svg>
        </div>
      )}

      {isRecording && (
        <div style={styles.videoContainer}>
          <video ref={videoRef} autoPlay style={{ ...styles.video, transform: 'scaleX(-1)' }} />
        </div>
      )}

      {mediaBlobUrl && (
        <div style={styles.videoContainer}>
          <video src={mediaBlobUrl} controls style={styles.video} />
          <button onClick={uploadVideo} style={styles.button}>Upload Video</button>
        </div>
      )}

      <div style={styles.buttonsContainer}>
        {showStartButton && (
          <button onClick={handleStartRecording} id="startRecordingButton" style={styles.button}>
            Start Recording
          </button>
        )}
        {showStopButton && (
          <button onClick={handleStopRecording} id="stopRecordingButton" style={styles.button}>
            Stop Recording
          </button>
        )}
        <button
          onClick={handleNext}
          style={{ ...styles.button, display: showButtons ? 'inline-block' : 'none' }}
          id="nextButton"
        >
          Next Question
        </button>
        <button
          onClick={handleShow}
          style={{ ...styles.button, display: showButtons ? 'inline-block' : 'none' }}
          id="showButton"
        >
          Show Question
        </button>
      </div>

      <div id="question" style={{ ...styles.question, display: showQuestion ? 'block' : 'none' } }>
        {currentQuestion}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    margin: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  question: {
    margin: '20px 0',
    fontSize: '1.2em',
    fontWeight: 'bold',
    color:'white',
  },
  timerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  timerCircle: {
    width: '100px',
    height: '100px',
  },
  videoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: '20px',
  },
  video: {
    width: '55%',
    borderRadius: '10px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    fontWeight: 'bold'
  },
};

export default VideoInterview;
