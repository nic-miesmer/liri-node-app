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


else if(command === "spotify-this-song") {


    if(search == null){
        noSpecialCharSearch = 'the sign' 
    }
    else{
        var noSpecialCharSearch = search.split(/[.\-_]/).join(" ").toLowerCase();
    }
    // console.log(noSpecialCharSearch);
    var songList = [];

    spotify.search({ type: 'track', query: noSpecialCharSearch }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    //   console.log(data);
      for(var i = 0; i < data.tracks.items.length; i++){
          var songLowercase = data.tracks.items[i].name.toLowerCase();
    
            if(noSpecialCharSearch === songLowercase)
            {
                songList.push(data.tracks.items[i]);
            }
      }

      if(songList.length === 0 || songList.length == null){
          console.log("Sorry could not find your song.")
      }
      else if (songList.length === 1){
          console.log("Returning 1 song!");
      }
      else{
      console.log("Returning " + songList.length + " Songs!")
    }
      console.log("-----------------------------------------------------------------------------")

      for(var i = 0; i < songList.length; i++){
        console.log("Artist: " + songList[i].artists[0].name);
        console.log("Name: " + songList[i].name)
        console.log("Album: " + songList[i].album.name);
        console.log("Spotify Link: " + songList[i].external_urls.spotify)
        console.log("-----------------------------------------------------------------------------")
      }
      });
}
