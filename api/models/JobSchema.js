const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSchema = new Schema({
  companyemail: { type: String, unique: true },
  title: String,
  description: String,
  requirements: String,
  responsibilities: String,
  rewards: String,
  deadline: Date,
  salary: Number,
  country: String,
  city: String,
  remote: Boolean,
});

const JobModel = mongoose.model("Job", JobSchema, "jobposts");
module.exports = JobModel;
