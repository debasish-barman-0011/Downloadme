const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const path = require("path");
const app = express()
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to enable CORS
app.use(cors());

app.get("/download", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).send("URL is required");
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    if (!info) {
      return res.status(404).send("Video not found");
    }

    const format = ytdl.chooseFormat(info.formats, { quality: "highestvideo" });
    if (!format) {
      return res.status(404).send("Video format not found");
    }

    // Sanitize the video title
    const sanitizedTitle = info.videoDetails.title.replace(/[^\w\s.-]/g, ""); // Remove invalid characters

    res.header(
      "Content-Disposition",
      `attachment; filename="${sanitizedTitle}.mp4"`
    );
    ytdl(videoUrl, { format: "mp4" }).pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).send("Failed to download video");
  }
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
