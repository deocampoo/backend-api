const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const signUpUser = async (req, res) => {
  try {
    const { email, password, recoveryAnswer } = req.body;

    if (!email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid email" });
    }

    if (!password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid password" });
    }

    if (!recoveryAnswer) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid recoveryAnswer" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, process.env.SALT);
    const newUser = new User({
      email: email,
      password: hashedPassword,
      recoveryAnswer: recoveryAnswer,
    });
    await newUser.save();

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server error during registration",
      details: err.message,
    });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid email" });
    }

    if (!password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Authentication failed. User not found." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid credentials", password: password });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(StatusCodes.OK).json({ token: token, user: user });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error during signIn ", details: err.message });
  }
};

module.exports = {
  signUpUser,
  signInUser,
};
