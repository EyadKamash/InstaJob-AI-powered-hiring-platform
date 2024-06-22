const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { questions_internship, questions_entry, questions_junior, questions_senior } = require('../front-end/questions');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://instajob:80z93toSszx6yIlt@cluster0.csynum6.mongodb.net/instajob?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define MongoDB schema and model
const VideoInterviewSchema = new mongoose.Schema({
  title: String,
  video: Buffer,
  contentType: String,
});
const VideoInterview = mongoose.model("VideoInterview", VideoInterviewSchema, "videointerviews");

const ApplicationSchema = new mongoose.Schema({
  applicantName: String,
  applicantEmail: String,
  jobTitle: String,
  yearsOfExperience: String,
  collegeName: String,
  companyName: String,
  previousWorkName: String,
  companyEmail: String,
  jobLevel: String,
});
const Application = mongoose.model("Application", ApplicationSchema, "applications");

// Route to serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index2.html'));
});

// API routes
app.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ message: "No files were uploaded." });
  }

  let video = req.files.video;

  const videoInterview = new VideoInterview({
    title: "Untitled Video",
    video: video.data,
    contentType: video.mimetype,
  });

  try {
    await videoInterview.save();
    res.send({
      message: "Video uploaded successfully",
      videoId: videoInterview._id,
    });
  } catch (err) {
    console.error("Error uploading video:", err);
    res.status(500).send({ message: "Error uploading video" });
  }
});

let questions = [];
let questionIndex = 0;

app.post('/start', async (req, res) => {
  try {
    const application = await Application.findOne(); // Adjust the query as needed
    if (!application) {
      return res.status(404).json({ error: 'No application found.' });
    }

    const userInfo = {
      name: application.applicantName,
      job_title: application.jobTitle,
      years_of_experience: application.yearsOfExperience,
      college: application.collegeName,
      company: application.companyName,
      company_email: application.companyEmail,
      email: application.applicantEmail,
      prev_company: application.previousWorkName,
      level: application.jobLevel
    };

    console.log('User info:', userInfo);

    if (userInfo.level.toLowerCase() === 'internship') {
      questions = questions_internship;
    } else if (userInfo.level.toLowerCase() === 'entry') {
      questions = questions_entry;
    } else if (userInfo.level.toLowerCase() === 'junior') {
      questions = questions_junior;
    } else if (userInfo.level.toLowerCase() === 'senior') {
      questions = questions_senior;
    }

    console.log('Selected questions:', questions);

    questionIndex = 0; // Reset question index for new interview session

    res.status(200).json(userInfo);
  } catch (err) {
    console.error("Error fetching application:", err);
    res.status(500).json({ error: "Error fetching application." });
  }
});

// API endpoints for interview questions
app.post('/next', (req, res) => {
  console.log('Fetching next question. Current index:', questionIndex);
  if (questionIndex < questions.length) {
    const question = questions[questionIndex];
    questionIndex++;
    console.log('Sending question:', question);
    res.status(200).json({ question });
  } else {
    console.log('No more questions available.');
    res.status(404).json({ error: 'No more questions available.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
