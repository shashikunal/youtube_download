const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/videoInfo", async (req, res) => {
  let videoURL = req.query.videoURL;
  let info = await ytdl.getInfo(videoURL);
  console.log(info.videoDetails.videoId);
  res.status(200).json(info);
});

app.get("/download", async (req, res) => {
  let videoURL = req.query.videoURL;
  console.log(videoURL);
  let itag = req.query.itag;
  res.header("Content-Disposition", `attachment;filename=video.mp4`);
  ytdl(videoURL, {
    filter: format => format.itag == itag,
  }).pipe(res);
});

let port = 5000;
app.listen(port, err => {
  if (err) throw err;
  console.log("Server is running on port number 5000");
});
