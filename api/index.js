const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Create an Express.js application
const app = express();
app.use(cors());

// MongoDB Connection URI
const uri =
  "mongodb+srv://instajob:80z93toSszx6yIlt@cluster0.csynum6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to the MongoDB server
async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

// Define the jwtString variable
const jwtString = "1809427yafnkosilhjfbansoikfhbKJSAFGHDBVAS";

// Express route for registering a new user
app.use(express.json());
app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, usertype } = req.body;
  try {
    const db = client.db("instajob");
    const usersCollection = db.collection("users");

    // Check if the email is already registered
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert the new user into the database
    const result = await usersCollection.insertOne({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      usertype,
    });

    res.json({
      message: "User created successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = client.db("instajob");
    const usersCollection = db.collection("users");

    const userDoc = await usersCollection.findOne({ email });
    if (!userDoc) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordMatch = bcrypt.compareSync(password, userDoc.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      jwtString
    );

    // Include the user type in the response
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
      })
      .json({ message: "Login successful", usertype: userDoc.usertype });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
});

// HANDLING DISPLAYING JOBS IN CLIENTHOME
app.get("/jobs", async (req, res) => {
  try {
    const db = client.db("instajob");
    const jobsCollection = db.collection("jobposts");
    const jobs = await jobsCollection.find().toArray();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "An error occurred while fetching jobs" });
  }
});

// Start the Express server
app.listen(4000, async () => {
  console.log("Server running on port 4000");
  await connect(); // Connect to MongoDB when the server starts
});
