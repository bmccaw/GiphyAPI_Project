$(document).ready(function() {

let topics = ['mario', 'kirby', 'the legend of zelda', 'metroid', 'mega man', 'battletoads', 'ninja gaiden', 'contra', 'double dragon', 'bubble bobble', 'castlevania', 'tetris',];

var createButtons = function() {
    //empty button area everytime a new button is created
    $('#buttonArea').empty();
    //Loop to create buttons and add text/attribute
    for (i=0; i <topics.length; i++) {
        //create button and assign as a variable
        var gifButton = $('<button>');
        //add classes
        gifButton.addClass('findGifs');
        //add attribute of data-value with a value of each item in the array
        gifButton.attr('data-value', topics[i]);
        //assign text to each button in the array
        gifButton.html(topics[i] + '<sup>&reg</sup>');
        //append the buttons to the div assigned the id 'buttonArea'
        $('#buttonArea').append(gifButton);
    }
};
    //$('#buttonArea').append(localStorage.getItem('topics',(topics))); //where to put the get request?
    //createButtons(); 
    //this function allows new buttons to be added
    $(document).on('click', '#newButton', function() {
        event.preventDefault();
        //convert user input into a new button
        var anotherButton = $('#user-input').val().trim();
        if (anotherButton === '') {
            alert('Please enter a valid query.');
        } else {
        //push that button to topics array
        topics.push(anotherButton);
        //attempt to keep created buttons on reset (localStorage)
        localStorage.setItem('topics',JSON.stringify(topics));
        //run the createButtons function
        createButtons();
        document.getElementById('user-input').value = ''
        console.log(this);
        }
    })

    //On click event to search GIPHY and display results below buttons
    $(document).on('click', '.findGifs', function() {
        $('#gifArea').empty();
        
        var search = $(this).attr('data-value');
        //Query URL
        var xhr = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=FbiNAP9uph7PGhtFufRqkGRI1T9PU560&limit=10"
        
        //ajax call to giphy
        $.ajax({
            url: xhr,
            method: "GET"
          })
          .then(function(response) {
              var results = (response.data);
              console.log(results);
        
        for (i=0; i< results.length; i++) {

        //Create new variables for rating, still gif, and moving gif based on the object path
        var rating = results[i].rating;
        var stillGif = results[i].images.fixed_height_still.url;
        var movingGif = results[i].images.fixed_height.url;
        //create a new div with a data-state of 'still'
        var gifDisplay = $('<div data-state="still">');
        //create a new img tag
        var gifImage = $('<img>');
        //create a new p tag with text of 'Rating: ' and the rating variable
        var p = $('<p>').text('Rating: ' + rating);
        //assign it a class
        p.addClass('ratingText');
        //add diplay class the the div
        gifDisplay.addClass('display');
        //add stillGif variable as a value for img src
        gifImage.attr('src', stillGif);
        //add 'data-animate' attribute with a value of variable movingGif
        gifImage.attr ('data-animate',movingGif);
        //add 'data-state' attribute with a value of 'still'
        gifImage.attr ('data-state', "still");
        //add 'data-still' attribute with a value of variable stillGif
        gifImage.attr ('data-still', stillGif);
        //add class of 'start-stop' to gifImage
        gifImage.addClass('col-sm-12 start-stop');
        //prepend p to gifDisplay
        gifDisplay.prepend(p);
        //append gifImage to gifDisplay
        gifDisplay.append(gifImage);
        //finally, prepend gifDisplay to the div with an id of 'gifArea'
        $('#gifArea').append(gifDisplay);
        }

        //on click event tied to image class
        //this works for the first set of Gifs but when the area is cleared and new gifs appended,
        //it no longer works
        $('.start-stop').on('click', function() {
            console.log('clicked');
            //variable calling out the current value of the data-state attribute
            var state = $(this).attr('data-state');
            //if attribute is 'still' then animate. if it is 'animate', then still
            if (state === "still") {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })

    });
    });

    createButtons(topics);
          










});