const Movie = require("../models/movieModel");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");


const insertMovie = async (req, res) => {
  try {
    const userId = req.params.userId;
    const movieId = req.params.movieId;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Movie not found" });
    }

    if (user.toWatchMovies.includes(movieId)) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Movie already in to watch list" });
    }

    user.toWatchMovies.push(movieId);
    await user.save();

    res.status(StatusCodes.CREATED).json({
      message: "Movie added to watch list successfully",
      toWatchMovies: user.toWatchMovies,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: "Error adding movie to watch list",
        error: error.message,
      });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const userId = req.params.userId;
    const movieId = req.params.movieId;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Movie not found" });
    }

    const movieIndex = user.toWatchMovies.indexOf(movieId);
    if (movieIndex === -1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Movie not found in to watch list" });
    }

    user.toWatchMovies.splice(movieIndex, 1);
    await user.save();

    res.status(StatusCodes.OK).json({
      message: "Movie removed from to watch list successfully",
      toWatchMovies: user.toWatchMovies,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: "Error deleting movie from to watch list",
        error: error.message,
      });
  }
};


const listAllMovies = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const userToWatchMovies = [];

    for (const movieId of user.toWatchMovies) {
      const movie = await Movie.findById(movieId);
      if (movie) {
        userToWatchMovies.push(movie);
      }
    }

    res.status(StatusCodes.OK).json({ toWatchMovies: userToWatchMovies });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error listing movies to watch", error: error.message });
  }
};

module.exports = { insertMovie, deleteMovie, listAllMovies };
