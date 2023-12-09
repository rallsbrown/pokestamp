const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");

const corsOptions = {
  origin: "http://localhost:7000",
  methods: "GET,FETCH, HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type",
  optionsSuccessStatus: 200,
};

const fetchImages = async () => {
  const uploadDir = "./upload";

  try {
    const files = await fsp.readdir(uploadDir);
    return files;
  } catch (err) {
    throw err;
  }
};

app
  .use(express.json({ limit: "10mb" }))
  .use(cors(corsOptions))
  .use("/images", express.static(path.join(__dirname, "upload")));

app
  .get("/", (req, res) => {
    res.json("hi");
  })
  .get("/pokemon", (req, res) => {
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
  .get("/getImages", async (req, res) => {
    const uploadDir = "./upload";

    if (!fs.existsSync(uploadDir)) {
      return res.status(404).send("No files uploaded yet.");
    }
    const imageFileNames = await fetchImages();
    console.log("image names", imageFileNames);
    const imgUrls = imageFileNames.map((filename) => `/images/${filename}`);
    res.json({ imgUrls });
  })
  .post("/upload", (req, res) => {
    if (!req.body) {
      return res.status(400).send("No file uploaded.");
    }
    const { dataURL } = req.body;

    const uploadDir = "./upload";
    console.log("ugh", uploadDir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const files = fs.readdirSync(uploadDir);

    console.log(files);

    const fileNumbers = files.map((fileName) => {
      return parseInt(fileName.split("_")[1].split(".")[0]);
    });

    const latestFileNum = Math.max(...fileNumbers);

    const nextFileName = `${uploadDir}/pokestamp_${latestFileNum + 1}.jpg`;

    const fileName = `${uploadDir}/pokestamp_0.jpg`;

    const file = () => {
      if (files.length) {
        return nextFileName;
      } else {
        return fileName;
      }
    };

    const base64Data = dataURL.replace(/^data:image\/jpeg;base64,/, "");

    fs.writeFile(file(), base64Data, "base64", (e) => {
      if (e) {
        console.error("Error saving file:", e);
        return res.status(500).send("Error saving file.");
      }

      return res.status(200).send("File uploaded and saved successfully.");
    });

    // res.status(200).send("JSON data received and processed successfully");
  });

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
