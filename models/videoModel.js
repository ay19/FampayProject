const mongoose = require("mongoose");
const fuzzySearching = require("mongoose-fuzzy-searching");
// const mongooePagination = require('mongoose-paginate-v2')

const videoDataSchema = new mongoose.Schema(
    {
        title: String, 
        description: String,
        id: String,
        publishedAt: Date,
        channelId: String,
        channelTitle: String,
        thumbnails: {
            default: {
                url: String,
                width: Number,
                height: Number,
            },
            medium: {
                url: String,
                width: Number,
                height: Number,
            },
            high: {
                url: String,
                width: Number,
                height: Number,
            },
        }
    },
    { timestamps: true }
);

// videoDataSchema.plugin(mongooePagination);
//fuzzySearch on field "title" and "description"
videoDataSchema.plugin(fuzzySearching, {
    fields: ["title", "description"],
});

module.exports = mongoose.model("Video", videoDataSchema );
