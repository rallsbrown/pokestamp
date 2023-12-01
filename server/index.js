const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5175",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/", (req, res) => {
  res.json("hi");
});

app.get("/pokemon", cors(corsOptions), (req, res) => {
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
