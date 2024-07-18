const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res) => {
  try {
    const { user, email, password } = req.body;

    if (!user || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({ error: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    const newUser = new User({
      user,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(StatusCodes.CREATED).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server error during registration",
      details: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Authentication failed. User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(StatusCodes.OK).json({ token, user });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error during sign in", details: err.message });
  }
};




const logoutUser = (req, res) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "No token provided" });
  }

  jwt.sign(token, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Logout error", details: err });
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser
};
