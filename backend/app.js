const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://User:GSjPwhjnbt941hGZ@cluster0.noy2w.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//intercerpte tout les requête qui ont un content type jsons et nous mettent a dispo tout le contenu ( body parser est ancien mais fais la meme chose )
app.use(express.json());

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
