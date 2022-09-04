
const { google } = require("googleapis");
const dayjs = require("dayjs");

const fetchYouTubeVideos = async (apiKey, searchQuery) => {

  try {
    const youTubeService = google.youtube({
      version: "v3",
      auth: apiKey,
    });
    //Date is in the format taken by the youTube Object.
    const publishedAfterDay = dayjs().subtract(2, "minute").toISOString();

    let params = {
      part: ["id", "snippet"],
      order: "date",
      type: "video",
      q: searchQuery,
      relevanceLanguage: "en",
      publishedAfter: publishedAfterDay,
      maxResults: 1
    }
    //YouTube API call
    const { data: { items } } = await youTubeService.search.list(params);
    const videos = items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description || searchQuery,
      publishedAt: item.snippet.publishedAt,
      id: item.id.videoId,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      thumbnails: {
        high: item.snippet.thumbnails.high,
        medium: item.snippet.thumbnails.medium,
        default: item.snippet.thumbnails.default
      }
    }));
    return videos;
  } catch (err) {
    console.error("Error while fetching videos", err);
    throw new Error(err);
  }
}

module.exports = {
  fetchYouTubeVideos
};
