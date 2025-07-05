require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware setup
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// MongoDB connection
mongoose.connect("mongodb+srv://vinayaknaik577:ZweN7yJ3SsX4SNe2@cluster0.rlmsuuu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ Connection error:", err));


// Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Middleware to protect secret route
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.redirect("/login");
    req.user = user;
    next();
  });
}

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const emailPattern = /^[^@]+@[^@]+\.[a-z]{2,}$/i;
  const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/;

  if (!emailPattern.test(email) || !passPattern.test(password)) {
    return res.render("register", { error: "Invalid email or password format." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("register", { error: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("register", { error: "Registration failed. Try again." });
  }
});


app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.render("login", { error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Incorrect password." });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      maxAge: 3600000 // 1 hour
    });

    res.redirect("/secrets");
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Login failed. Try again." });
  }
});

app.get("/secrets", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.render("secrets", { user });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.listen(5000, () => {
  console.log("🚀 Server started on port 5000");
});
