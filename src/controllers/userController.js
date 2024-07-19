const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const getProfile = async (req, res) => {
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


const deleteUser = async (req, res) => {
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

const listUsers = async (_, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(StatusCodes.OK).json(users);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error fetching users", details: err.message });
  }
};

module.exports = {
 getProfile,deleteUser,listUsers};
