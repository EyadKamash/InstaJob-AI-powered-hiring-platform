const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cors = require("cors");

// Create an Express.js application
const app = express();
// Update your CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowed origins list
      const allowedOrigins = ["http://localhost:3000"];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies with CORS
  })
);

app.use(
  session({
    secret: "1809427yafnkosilhjfbansoikfhbKJSAFGHDBVAS",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: false,
    },
  })
);

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

    req.session.user = {
      email: userDoc.email,
      id: userDoc._id,
      usertype: userDoc.usertype,
      firstname: userDoc.firstname,
    };

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        message: "Login successful",
        usertype: userDoc.usertype,
        firstname: userDoc.firstname,
      });
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

// Express route for checking login status
app.get("/checklogin", (req, res) => {
  if (req.session.user) {
    return res.json({
      isLoggedIn: true,
      usertype: req.session.user.usertype,
      firstname: req.session.user.firstname,
    });
  }
  res.json({ isLoggedIn: false });
});

// Express route for logging out
app.post("/logout", (req, res) => {
  try {
    res.clearCookie("token").json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "An error occurred while logging out" });
  }
});

// Start the Express server
app.listen(4000, async () => {
  console.log("Server running on port 4000");
  await connect(); // Connect to MongoDB when the server starts
});
