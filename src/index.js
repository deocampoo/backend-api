const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { expressjwt: jwt } = require("express-jwt");

const authRoutes = require("./routes/auth-routes");
const movieRoutes = require("./routes/movie-routes");
const userRoute = require("./routes/user-routes");
const userLikedRouter = require("./routes/user-liked-routes");
const userToWatchRouter = require("./routes/user-to-watch-routes");
const userWatchedRouter = require("./routes/user-watched-routes");

// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use(cors());

// Rutas públicas que no requieren autenticación
const publicRoutes = [
  "/api/auth/signUpUser",
  "/api/auth/signInUser",
  "/api/users/recovery",
];

// Middleware de JWT para proteger las rutas
app.use(
  jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: publicRoutes,
  })
);

// rutas
app.use("/api/users", userRoute);
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/user/liked/", userLikedRouter);
app.use("/api/user/to-watch/", userToWatchRouter);
app.use("/api/user/watched/", userWatchedRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));