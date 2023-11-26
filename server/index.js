const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.json("hi");
});

app.get("/pokemon", (req, res) => {
  const options = {
    method: "GET",
    url: `${process.env.POKEAPI_KEY}pokemon?limit=151`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
