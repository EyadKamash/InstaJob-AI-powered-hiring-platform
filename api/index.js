const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const upload = multer({
  dest: "uploads/",
  fieldname: "file", // Specify the expected field name
});

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:3000"];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(
  session({
    secret: "1809427yafnkosilhjfbansoikfhbKJSAFGHDBVAS",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    },
  })
);

const uri =
  "mongodb+srv://instajob:80z93toSszx6yIlt@cluster0.csynum6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

const jwtString = "1809427yafnkosilhjfbansoikfhbKJSAFGHDBVAS";

app.use(express.json());
app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, usertype } = req.body;
  try {
    const db = client.db("instajob");
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

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

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  });
});

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

// app.post("/predict", upload.single("file"), async (req, res) => {
//   try {
//     const cvFile = fs.readFileSync(req.file.path);
//     const formData = new FormData();
//     formData.append("file", cvFile, req.file.originalname);

//     const flaskResponse = await axios.post(
//       "http://localhost:5000/predict",
//       formData,
//       {
//         headers: formData.getHeaders(),
//       }
//     );

//     // Handle the Flask response here
//     res.json({ result: flaskResponse.data });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.listen(4000, async () => {
  console.log("Server running on port 4000");
  await connect();
});
