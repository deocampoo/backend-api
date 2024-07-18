const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const { expressjwt: jwt } = require("express-jwt");

const authenticationRoutes = require("./routes/authenticationRoutes");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const toWatchRoutes = require("./routes/toWatchRoutes");
const watchedRoutes = require("./routes/watchedRoutes");

// Rutas públicas que no requieren autenticación
const publicRoutes = [
  "/api/auth/createUser",
  "/api/auth/loginUser",
];

// Conexión con MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// Configuraciones
const app = express();
const port = process.env.PORT || 9000;

// Servidor escuchando
app.listen(port, () => console.log("Server listening on port", port));

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    getToken: req => req.headers.authorization && req.headers.authorization.split(' ')[1]
  }).unless({
    path: publicRoutes,
  })
);

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authenticationRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/user/liked/", favoriteRoutes);
app.use("/api/user/to-watch/", toWatchRoutes);
app.use("/api/user/watched/", watchedRoutes);
