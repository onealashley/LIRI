require("dotenv").config();
var fs = require('fs');
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var task = process.argv[2];
var thingSearched = process.argv.slice(3).join(" ");

if (task === "movie-this") {
    movieSearch();
} else if (task === "spotify-this-song"){
    spotifySearch();
} else {
    console.log("I have no idea what you want.")
}

function spotifySearch() {
    if (thingSearched == null) {
        thingSearched = "amerika";
    }
    spotify.search({
        type: "track",
        query: thingSearched 
    }, function(error, data) {
        if (error) {
            console.log("Error occurred: " + error);
            return;
            }
            // console.log("--------------------");
            // console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            // console.log("Song Title: " + data.tracks.items[0].name);
            // console.log("Preview Link: " + data.tracks.items[0].preview_url);
            // console.log("Album: " + data.tracks.items[0].album.name);
            // console.log('--------------------');
            var showData = [
                "Artist: " + data.tracks.items[0].artists[0].name,
                "Song Title: " + data.tracks.items[0].name,
                "Preview Link: " + data.tracks.items[0].preview_url,
                "Album: " + data.tracks.items[0].album.name,
                "---------------------------------------------\n"
            ].join("\n\n"); 
            fs.appendFile("log.txt", showData, function(err) {
                if (err) throw err;
                console.log(showData);
            });
            
    });
}

function movieSearch () {
    console.log(thingSearched);
    if (thingSearched === "Undefined"){
        var queryUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";
    } else {
        var queryUrl = "http://www.omdbapi.com/?t=" + thingSearched + "&y=&plot=short&apikey=trilogy";
    }

    var request = require("request");
    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200){
            var showData = [
                "Title: " + JSON.parse(body).Title,
                "Release year: " + JSON.parse(body).Year,
                "IMDB Rating: " + JSON.parse(body).imdbRating,
                "Country: " + JSON.parse(body).Country,
                "Language: " + JSON.parse(body).Language,
                "Plot: " + JSON.parse(body).Plot,
                "Actors: " + JSON.parse(body).Actors,
                "--------------------------------------------\n"
            ].join("\n\n"); 
            fs.appendFile("log.txt", showData, function(err) {
                if (err) throw err;
                console.log(showData);
            });
            
        }
    })
}
