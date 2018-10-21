$(document).ready(function() {

let topics = ['mario', 'kirby', 'the legend of zelda', 'metroid', 'mega man', 'battletoads', 'ninja gaiden', 'contra', 'double dragon', 'bubble bobble', 'castlevania', 'tetris',];

    //Loop to create buttons and add text/attribute
    for (i=0; i <topics.length; i++) {
        var gifButton = $('<button>');
        gifButton.addClass('findGifs');
        gifButton.attr('data-value', topics[i]);
        gifButton.text(topics[i]);
        $('#buttonArea').append(gifButton);
    }

    //On click event to search GIPHY and display results below buttons
    $(document).on('click', '.findGifs', function() {
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
        var p = $('<p>').text('Rating: ' + rating)
        gifDisplay.addClass('display');
        gifImage.attr('src', stillGif);
        gifImage.addClass('start-stop');
        gifDisplay.prepend(p);
        gifDisplay.append(gifImage);
        $('#gifArea').prepend(gifDisplay);
        }
    });
    });











});