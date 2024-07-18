const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const { StatusCodes } = require('http-status-codes');

const insertMovie = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { id, title, media_type, genre, director, language } = req.body;

    let movie = await Movie.findOne({ id });
    if (!movie) {
      movie = new Movie({ id, title, media_type, genre, director, language });
      await movie.save();
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    if (user.watchedMovies.some(m => m.toString() === movie._id.toString())) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'Movie already in watched list' });
    }

    user.watchedMovies.push(movie._id);
    await user.save();

    res.status(StatusCodes.CREATED).json({
      message: 'Movie added to watched list successfully',
      watchedMovies: user.watchedMovies,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error adding movie to watched list', error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const userId = req.params.userId;
    const movieId = req.params.movieId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    user.watchedMovies = user.watchedMovies.filter(m => m.toString() !== movieId);
    await user.save();

    res.status(StatusCodes.OK).json({
      message: 'Movie removed from watched list successfully',
      watchedMovies: user.watchedMovies,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error removing movie from watched list', error: error.message });
  }
};

const listAllMovies = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('watchedMovies');
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    res.status(StatusCodes.OK).json({ watchedMovies: user.watchedMovies });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error listing watched movies', error: error.message });
  }
};

module.exports = { insertMovie, deleteMovie, listAllMovies };
