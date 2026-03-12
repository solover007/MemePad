// import Carousel from "@/components/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const videoList = [
  "https://www.youtube.com/watch?v=FrWrOrpyIxE&t=695s",
  "https://www.youtube.com/watch?v=3K3ezWRf2eo",
  "https://www.youtube.com/watch?v=gYN95uhZgl0",
  "https://www.youtube.com/watch?v=Afw5k_ZY1Ms",
  "https://www.youtube.com/watch?v=BOskQ5IIHNo",
  "https://www.youtube.com/watch?v=g3LoDQsS29Q&t=7s",
  "https://youtu.be/Yy2pMUCkmOQ?si=y9afNHaAApiuKrUy&t=240",
];

// Helper function to normalize YouTube URLs
const normalizeYouTubeUrl = (url: string) => {
  let videoId = "";
  const urlObj = new URL(url);

  if (urlObj.hostname === "youtu.be") {
    videoId = urlObj.pathname.slice(1);
  } else if (urlObj.hostname === "www.youtube.com") {
    videoId = urlObj.searchParams.get("v") || "";
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  console.warn(`Invalid YouTube URL: ${url}`);
  return null;
};

const normalizedVideos = videoList.map(normalizeYouTubeUrl).filter(Boolean);

const ALL_VIDEOS = normalizedVideos.map((video, idx) => (
  <div key={idx} className="p-4">
    <iframe
      className="w-full h-96 rounded-xl"
      src={video || ""}
      title={`YouTube video player ${video}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
));

const YouTubeVideo = () => {
  return (
    <>
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
        {normalizedVideos?.map((video, idx: number) => (
          <div key={idx} className="w-full py-2">
            <iframe
              className="w-full h-96 rounded-xl"
              src={video || ""}
              title={`YouTube video player ${video}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default YouTubeVideo;
