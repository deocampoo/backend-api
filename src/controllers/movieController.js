const Movie = require("../models/movieModel");
const { StatusCodes } = require("http-status-codes");

const insertMovie = async (req, res) => {
  try {
    const { title, name, media_type, trailerUrl, overview } = req.body;

    const movie = new Movie({
      title,
      name,
      media_type,
      trailerUrl,
      overview,
    });
    await movie.save();

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Movie added successfully", movie: movie });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error adding movie", error: error });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const removedMovie = await Movie.findByIdAndDelete(movieId);

    if (!removedMovie) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Movie not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error deleting movie", error });
  }
};


const fetchMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Movie not found" });
    }
    res.status(StatusCodes.OK).json({ movie: movie });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error getting movie by ID", error: error });
  }
};


const listAllMovies = async (_, res) => {
  try {
    const movies = await Movie.find();
    res.status(StatusCodes.OK).json({ movies: movies });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error getting movies", error: error });
  }
};



module.exports = { insertMovie, deleteMovie, fetchMovieById, listAllMovies };
