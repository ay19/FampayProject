
const schedule = require('node-schedule');
const videoService = require('../service/videoFetchService');
const videoModel = require('../models/videoModel');
const config = require('../config/config.json');

async function schedulerFetchJob() {
    try {
        //schedular which run after every 10 sec.
         schedule.scheduleJob('*/10 * * * * *', async () => {
            let videoFetchSuccessful = false;
            for (let apikey of config.YOUTUBE_API_KEY) {
                try {
                    //if we are able to fetch video using current apiKey, no need to use other keys.
                    if (videoFetchSuccessful) {
                        break;
                    }
                    const youTubeVideos = videoService.fetchYouTubeVideos(
                        apikey,
                        config.YOUTUBE_SEARCH_QUERY
                    );
                    youTubeVideos.then(async (data)=>{
                        await videoModel.create(data);
                        console.log(data);
                    });
                    videoFetchSuccessful = true;
                } catch (err) {
                    throw new Error('Error in schedulerFetchJob:', err);
                }
            }
            if (!videoFetchSuccessful) {
                throw 'Quota exhuated for apiKeys';
            }
        });
    }
    catch (err) {
        console.error('Error in schedulerFetchJob', err);
    }
}

module.exports = {
    schedulerFetchJob
};

