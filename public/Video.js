let BTN = document.querySelector("#videoBtn");
let VIDEO_URL = document.getElementById("videoUrl");
BTN.addEventListener("click", async e => {
  e.preventDefault();
  let VIDEO = VIDEO_URL.value.trim();
  if (VIDEO.length === 0) {
    alert("Please enter youtube url...");
  } else {
    let videoREFERENCE = await window.fetch(
      `http://localhost:5000/videoinfo?videoURL=${VIDEO}`
    );
    let VIDEO_DATA = await videoREFERENCE.json();
    console.log(VIDEO_DATA);

    let allNodes = {
      thumbnails: document.getElementById("img_thumbnail"),
      title: document.getElementById("video-h2"),
      description: document.getElementById("video_description"),
      videoURL: document.getElementById("video_url"),
      downloadOptions: document.getElementById("download-options"),
    };
    //LOOP FORMAt ARRAY
    let output = "";
    for (let i = 0; i < VIDEO_DATA.formats.length; i++) {
      console.log(VIDEO_DATA.formats[i]);
      output += `
            <option value=${VIDEO_DATA.formats[i].itag}>
            ${VIDEO_DATA.formats[i].container} - ${VIDEO_DATA.formats[i].qualityLabel}
            </option>
         `;
      let thumbNailsImg =
        VIDEO_DATA.videoDetails.thumbnails[
          VIDEO_DATA.videoDetails.thumbnails.length - 1
        ].url;
      allNodes.thumbnails.src = thumbNailsImg;
      allNodes.title.innerHTML = VIDEO_DATA.videoDetails.title;
      allNodes.description.innerHTML = VIDEO_DATA.videoDetails.description;
      allNodes.downloadOptions.innerHTML = output;
      document.querySelector(".data").style.display = "block";
    }

    let downloadBTN = document.getElementById("download-btn");
    downloadBTN.addEventListener("click", e => {
      e.preventDefault();
      let videoURL = document.getElementById("video_url").value;
      console.log(videoURL);
      let itag = document.getElementById("download-options").value;
      window.open(
        `http://localhost:5000/download?videoURL=${VIDEO_DATA.videoDetails.videoId}&itag=${itag}`
      );
    });
  }
});
