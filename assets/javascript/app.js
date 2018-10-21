$(document).ready(function() {

let topics = [];

topic="Jurassic Park"
    //Call to GIPHY API
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=FbiNAP9uph7PGhtFufRqkGRI1T9PU560&limit=5");
    xhr.done(function(data) { console.log("success got data", data); });














});