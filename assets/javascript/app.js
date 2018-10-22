$(document).ready(function() {

let topics = ['mario', 'kirby', 'the legend of zelda', 'metroid', 'mega man', 'battletoads', 'ninja gaiden', 'contra', 'double dragon', 'bubble bobble', 'castlevania', 'tetris',];
let storedGifs = [];

    //Loop to create buttons and add text/attribute
    for (i=0; i <topics.length; i++) {
        var gifButton = $('<button>');
        gifButton.addClass('findGifs btn btn-info');
        gifButton.attr('data-value', topics[i]);
        gifButton.text(topics[i]);
        $('#buttonArea').append(gifButton);
    }

    //On click event to search GIPHY and display results below buttons
    $(document).on('click', '.findGifs', function() {
        $('#gifArea').empty();
        var search = $(this).attr('data-value');
        //Query URL
        var xhr = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=FbiNAP9uph7PGhtFufRqkGRI1T9PU560&limit=10"
        
        //ajax call to giphy
        $.ajax({
            url: xhr,
            method: "GET"
          })
          .then(function(response) {
              var results = (response.data);
              console.log(results);
        
        for (i=0; i< results.length; i++) {

        //Create new variables
        var rating = results[i].rating;
        var stillGif = results[i].images.fixed_height_still.url;
        var gifDisplay = $('<div>');
        var gifImage = $('<img>');
        var p = $('<p>').text('Rating: ' + rating);
        gifDisplay.addClass('display');
        gifImage.attr('src', stillGif);
        gifImage.addClass('start-stop');
        gifDisplay.prepend(p);
        gifDisplay.append(gifImage);
        $('#gifArea').prepend(gifDisplay);
        }
    });
    });
    //add ability to click on the image and have it switch from still image to moving gif
    //start with on click function like above but targetting class added to images
    $(document).on('click', '.start-stop', function() {
        //create a variable to store the object path to the moving versions of the gif
        var playGif = response.data.images.fixed_height.url;
        //Change src attribute to variable 
        $('.start-stop').attr('src', playGif);
        //currently not recognizing variable. I think I need to make another ajax call to have access to the api data
    });











});