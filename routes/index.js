const express = require("express");
const videoModel = require("../models/videoModel");
const config = require("../config/config.json");

const router = express.Router();
//search API.
const pageLimit = config.PAGE_LIMIT;
router.get('/videos', async function (req, res) {
    try {
        //To check if the search parameter are there or not empty. 
        //Future scope: can add a generalise validation method when more parameters are there.
        if (!req.query.searchPhrase) {
            throw 'No search phrase found'
        }
        let limit = req.query.limit || pageLimit;
        let videos = await videoModel.fuzzySearch(req.query.searchPhrase).sort({ "publishedAt": 1 }).limit(limit);
        if (!videos) {
            throw 'No video found';
        }
        res.status(200).send({
            status: true,
            response: { videos },
            message: "Request processed successfully"
        });
    } catch (err) {
        console.error('Error in searchAPI:', err);
        res.status(400).send({
            status: false,
            error: typeof err === Error ? err.toString() : err,
            message: "Something went wrong. Please try again"
        })
    }
})

//pagination and search
router.get('/videos/pagination', async function (req, res) {
    try {
        let pageNo = req.query.page || 0;
        let totalVideo = await videoModel.estimatedDocumentCount();
        let videoInfo = await videoModel.fuzzySearch(req.query.searchPhrase).sort({ "publishedAt": 1 }).skip(pageNo * pageLimit);
        let totalVideos = videoInfo.length;
        let videos = videoInfo.slice(0, pageLimit);

        res.status(200).send({
            status: true,
            message: "Videos fetch successful",
            videos,
            nextPages: totalVideos - pageLimit > 0,
            prevPages: req.query.page > 0,
            totalVideo
        });

    } catch (err) {
        console.error("Error in paginationAPI:", err);
        res.status(400).send({
            status: false,
            message: "Something went wrong. Please try again",
            error: typeof err === Error ? err.toString() : err
        })
    }
})

module.exports = router;
