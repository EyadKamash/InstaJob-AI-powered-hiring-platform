const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  applicantName: {
    type: String,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobLevel: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  previousWorkName: {
    type: String,
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  interviewDate: {
    type: Date,
    default: null,
  },
});

const Application = mongoose.model(
  "Application",
  applicationSchema,
  "applications"
);

module.exports = Application;
