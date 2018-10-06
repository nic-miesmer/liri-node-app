require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Request = require("request");
var Moment = require("moment");

var spotify = new Spotify(keys.spotify);

