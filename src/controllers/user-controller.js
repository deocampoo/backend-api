const User = require("../models/user");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .select("-password")
      .select("-recoveryAnswer");

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error fetching user data", details: err.message });
  }
};

const listAllUsers = async (_, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(StatusCodes.OK).json(users);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error fetching users", details: err.message });
  }
};

const removeUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error deleting user", details: err.message });
  }
};

const updatePassword = async (req, res) => {
  const { email, password: newPassword, recoveryAnswer } = req.body;

  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid email" });
  }

  if (!newPassword) {
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
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Authentication failed. User not found." });
  }

  if (user.recoveryAnswer !== recoveryAnswer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid recoveryAnswer." });
  }

  const hashedPassword = await bcrypt.hash(newPassword, process.env.SALT);
  user.password = hashedPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ message: "User updated successfully" });
};

module.exports = {
  getUserProfile,
  listAllUsers,
  removeUser,
  updatePassword,
};
