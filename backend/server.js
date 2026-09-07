 
 const express = require("express");
const cors = require("cors");
const mongoose= require("mongoose");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
require ("dotenv").config();

const User=require("./models/User");
const Journal=require("./models/Journal");

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MindSpace API Running");
});

const PORT = 5000;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token.",
    });
  }
};


app.post("/signup", async (req, res) => {
  try {

    const { username, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save to database
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
});
app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      username:user.username,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }

});

app.post("/journal",async(req,res)=>{
    try{
        const{title,entry,mood}=req.body;

        const newJournal=new Journal({
            userId:req.user.id,
            title,
            entry,
            mood,
        });
        await newJournal.save();

        res.status(201).json({
            message:"Journal saved successfully",
        });

    }catch(error){
        console.log(error);

        res.status(500).json({
            message:"Server error",
        });
    }
});
    app.get("/journal", async (req, res) => {

  try {

    const journals = await Journal.find({
      userId:req.user.id
    } );

    res.status(200).json(journals);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

});
app.put("/journal/:id", async (req, res) => {

  try {

    const { title, entry, mood } = req.body;

    await Journal.findByIdAndUpdate(
      req.params.id,
      {
        title,
        entry,
        mood,
      }
    );

    res.status(200).json({
      message: "Journal updated successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

});
app.delete("/journal/:id", authenticateToken,async (req, res) => {

  try {

    await Journal.findOneAndDelete({
    _id:req.params.id,
     userId:req.user.id,
     });

    res.status(200).json({
      message: "Journal deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});