import fs from "fs";
import { parse } from "yaml";

function extractYouTubeId(url) {
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function getVideos() {
  const fileContent = fs.readFileSync("./src/content/videos.yaml", "utf-8");
  const data = parse(fileContent);
  return data.videos.map((video) => {
    const id = extractYouTubeId(video.url);
    return {
      ...video,
      url: id ? `https://www.youtube.com/embed/${id}` : null,
    };
  });
}
