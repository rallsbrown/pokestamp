const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const fs = require("fs");
const path = require("path");

const corsOptions = {
  origin: "http://localhost:5175",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(cors());

app
  .get("/", (req, res) => {
    res.json("hi");
  })
  .get("/pokemon", cors(corsOptions), (req, res) => {
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
  })
  //cors(coprsOptions) doens't seems to be working so enabled in globally for now.
  .post("/upload", cors(corsOptions), (req, res) => {
    if (!req.body) {
      return res.status(400).send("No file uploaded.");
    }
    const { dataURL } = req.body;

    const uploadDir = "./upload";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const fileName = `${uploadDir}/pokestamp${Date.now()}.jpg`;

    const base64Data = dataURL.replace(/^data:image\/jpeg;base64,/, "");

    fs.writeFile(fileName, base64Data, "base64", (e) => {
      if (e) {
        console.error("Error saving file:", e);
        return res.status(500).send("Error saving file.");
      }

      return res.status(200).send("File uploaded and saved successfully.");
    });

    // res.status(200).send("JSON data received and processed successfully");
  });

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
