require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Request = require("request");
var Moment = require("moment");

var spotify = new Spotify(keys.spotify);

// Basic Node application for requesting data from the OMDB website
// Here we incorporate the "request" npm package
var request = require("request");


var inputString = process.argv;
var command = process.argv[2];
var search = process.argv[3];

if(command === "movie-this"){

    console.log(search);
    
    // search = search.split(' ').join('+')

    console.log(search);
    if(search == null){
        search = "Mr.+Nobody";
    }

// We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t="+ search +"&y=&plot=short&apikey=trilogy&tomatoes=true", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("The movie's title is: " + JSON.parse(body).Year);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("The movie's Rotten Tomatoes Rating is: " + JSON.parse(body).tomatoMeter);
    console.log("The movie's was produced in: " + JSON.parse(body).Country);
    console.log("The movie's original language is: " + JSON.parse(body).Country);
    console.log("The movie's plot: " + JSON.parse(body).Plot);
    console.log("The movie's actors: " + JSON.parse(body).Actors);




}
});

}

else if(command === "concert-this") {

    // We then run the request module on a URL with a JSON
request("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp", function(error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {
  
        var bandInfoJson = JSON.parse(body)
        for( var i = 0; i < bandInfoJson.length; i++){
            // console.log(bandInfoJson[i])
            console.log(bandInfoJson[i].venue.name)
            console.log(bandInfoJson[i].venue.city + ", " + bandInfoJson[i].venue.country)
            console.log(bandInfoJson[i].datetime)
            console.log("__________________________________")

        }
          

  
  }
  });


}
