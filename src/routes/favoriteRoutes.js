const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
router.post('/favorites/:userId', favoriteController.insertMovie);
router.delete('/favorites/:userId/:movieId', favoriteController.deleteMovie);
router.get('/favorites/:userId', favoriteController.listAllMovies);


module.exports = router;


