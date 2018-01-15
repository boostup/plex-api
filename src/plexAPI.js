const plexConf = require("./plex.config");

const logger = require("./logger");
const axios = require("axios");
const xmlParser = require("xml2json");
const PlexAPI = require("plex-api");
const QS = require("qs");

const all = "/all";
const movieSectionURLAll = `/library/sections/1${all}`;

const docsSectionURL = `/library/sections/3`;
const docsSectionURLAll = `${docsSectionURL}${all}`;

const watchLaterVideosURL = "https://plex.tv/pms/playlists/queue/all?X-Plex-Product=Plex%20Web&X-Plex-Version=3.23.1&X-Plex-Client-Identifier=gp4hnyrwrhpdda14vtku170z&X-Plex-Platform=Chrome&X-Plex-Platform-Version=63.0&X-Plex-Device=OSX&X-Plex-Device-Name=Plex%20Web%20%28Chrome%29&X-Plex-Device-Screen-Resolution=640x736%2C1440x900&X-Plex-Token=PVJbhQuynXUx7KXcKB7b";

const client = new PlexAPI({
    hostname: plexConf.hostname,
    username: plexConf.username,
    password: plexConf.password
});

const APICaughtError = (msg) => {
    throw Error(`[plexAPI.js] Error caught: ${msg}`)
};


const getDocus = () => {
    return client.query(docsSectionURLAll).then(function (result) {
        return result.MediaContainer.Metadata;
    }, function (err) {
        return APICaughtError(err)
    });
}

/**
 * The array of videos in the object returned by this function is found at:
 * jsonData.MediaContainer.Video[n]
 * 
 * The video object contains : url, title, summary
 */
const getWatchLaterVideos = () => {
    return axios.get(watchLaterVideosURL)
        .then(function (result) {
            return JSON.parse(xmlParser.toJson(result.data));
        })
        .catch(function (err) {
            return APICaughtError(err)
        })
}

const updateMetadata = (id, YTVideo) => {
    if (id && YTVideo) {
        const {
            snippet
        } = YTVideo;
        let metadata = {
            id,
            "type": 1,
            "originallyAvailableAt.value": snippet.publishedAt,
            "studio.value": `${snippet.channelTitle}`,
            "summary.value": formatDescription(YTVideo)
        }

        const qstr = (QS.stringify(metadata));

        client.putQuery(`${docsSectionURLAll}?${qstr}`)
            .then(function () {
                logger.log(`Description of video by id ${metadata.id} has been set`);
            }, function (err) {
                return APICaughtError(err)
            });
    }
}


const launchFileScan = () => {
    // update library section of key "1"
    client.perform(`${docsSectionURL}/refresh`).then(function () {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log("Plex file scan started.")
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    }, function (err) {
        console.error("Could not connect to server", err);
    });
}


module.exports = {
    getDocus,
    getWatchLaterVideos,
    updateMetadata,
    launchFileScan
}



/** HELPERS  */

const formatDescription = (YTVideo) => {
    const {
        snippet
    } = YTVideo;
    return `
        Original video URL:
        https://www.youtube.com/watch?v=${YTVideo.id}

        Channel link:
        https://www.youtube.com/channel/${snippet.channelId}
        ---------------------
        ${snippet.description}`.trim()
}