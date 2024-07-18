const Movie = require("../models/movieModel");
const User = require("../models/userModel");
const fetchMovieFromTMDB = require("../API/tmdbAPI");
const { StatusCodes } = require("http-status-codes");

const insertMovieFromTMDB = async (req, res) => {
  const { movieId } = req.params;

  try {
    // Fetch movie details from TMDB
    const movieData = await fetchMovieFromTMDB(movieId);

    // Check if the movie already exists in the database
    let movie = await Movie.findOne({ tmdbId: movieId });
    if (!movie) {
      // Map TMDB data to your movie model
      movie = new Movie({
        tmdbId: movieId,
        title: movieData.title,
        name: movieData.original_title,
        media_type: 'movie',
        trailerUrl: movieData.homepage,
        overview: movieData.overview,
        poster_path: movieData.poster_path,
      });
      await movie.save();
    }

    res.status(StatusCodes.CREATED).json({ message: "Movie added successfully", movie });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error adding movie", error: error.message });
  }
};

module.exports = { insertMovieFromTMDB };
