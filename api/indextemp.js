const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(fileUpload());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://instajob:80z93toSszx6yIlt@cluster0.csynum6.mongodb.net/instajob?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define the schema for the 'videointerviews' collection
const VideoInterviewSchema = new mongoose.Schema({
  title: String,
  video: Buffer,
  contentType: String,
});

// Create a model from the schema
const VideoInterview = mongoose.model(
  "VideoInterview",
  VideoInterviewSchema,
  "videointerviews"
);

app.post("/upload", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ message: "No files were uploaded." });
  }

  // The name of the input field (i.e. "video") is used to retrieve the uploaded file
  let video = req.files.video;

  // Create a new document in the 'videointerviews' collection
  const videoInterview = new VideoInterview({
    title: "Untitled Video",
    video: video.data,
    contentType: video.mimetype,
  });

  try {
    // Save the document in the database
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

app.listen(port, () => console.log(`Server listening on port ${port}`));
