const Movie = require("../models/movieModel");
const { StatusCodes } = require("http-status-codes");

const insertMovie = async (req, res) => {
  try {
    const { title, name, media_type, genre, director, language } = req.body;

    const movieData = {
      media_type,
      genre,
      director,
      language,
    };

    if (media_type === "movie") {
      movieData.title = title;
    } else if (media_type === "tv") {
      movieData.name = name;
    }

    const movie = new Movie(movieData);
    await movie.save();

    res.status(StatusCodes.CREATED).json({ message: "Movie added successfully", movie: movie });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error adding movie", error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const removedMovie = await Movie.findByIdAndDelete(movieId);

    if (!removedMovie) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Movie not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error deleting movie", error: error.message });
  }
};

const fetchMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Movie not found" });
    }
    res.status(StatusCodes.OK).json({ movie: movie });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error getting movie by ID", error: error.message });
  }
};

const listAllMovies = async (_, res) => {
  try {
    const movies = await Movie.find();
    res.status(StatusCodes.OK).json({ movies: movies });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error getting movies", error: error.message });
  }
};

module.exports = { insertMovie, deleteMovie, fetchMovieById, listAllMovies };
