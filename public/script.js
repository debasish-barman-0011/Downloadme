function searchVideo() {
  const videoUrl = document.getElementById("video-url").value;

  // Simulate a call to the backend server to get video details

  const videoData = [

    {
      thumbnail: "./images/youtube.png",
      title: "Fetched video",
    //   quality: "1080p",
    //   size: "High Resulation",
      url: videoUrl,
    },
   
  ];

  const videoResults = document.getElementById("video-results");
  videoResults.innerHTML = "";

  videoData.forEach((video) => {
    const videoContainer = document.createElement("div");
    videoContainer.className = "video-container";

    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.className = "thumbnail";
    const thumbnailImg = document.createElement("img");
    thumbnailImg.src = video.thumbnail;
    thumbnailDiv.appendChild(thumbnailImg);

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "details";
    detailsDiv.innerHTML = `
            <h3>${video.title}</h3>
            <p>Quality: ${video.quality}</p>
            <p>Size: ${video.size}</p>
        `;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download";
    downloadButton.className = "downloadBtn";
    downloadButton.onclick = () => downloadVideo(video);
    const favouriteButton = document.createElement("button");
    favouriteButton.textContent = "Favourite";

    actionsDiv.appendChild(downloadButton);
    actionsDiv.appendChild(favouriteButton);

    videoContainer.appendChild(thumbnailDiv);
    videoContainer.appendChild(detailsDiv);
    videoContainer.appendChild(actionsDiv);

    videoResults.appendChild(videoContainer);
  });
}

function downloadVideo(video) {
  alert(
    `Downloading: ${video.title}\nQuality: ${video.quality}\nSize: ${video.size}`
  );

  const videoUrl = video.url;
  const downloadUrl = `/download?url=${encodeURIComponent(
    videoUrl
  )}`;

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.target = "_blank";
  link.click();
}
