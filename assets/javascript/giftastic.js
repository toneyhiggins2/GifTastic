var actors = ["Michael Jordan", "Jamie Foxx", "Will Smith", "Denzel Washington"];



// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayActor() {

    var person = $(this).attr("data-name");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        for (i = 0; i < results.length; i++) {

            // Creating a div to hold the gif
            var gifDiv = $("<div class='actor'>");

            // Storing the rating data
            var rating = results[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            
            var actorImage = $("<img>");

            actorImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(pOne);
            gifDiv.append(actorImage);

            // Putting the entire movie above the previous movies
            $("#actors-gifs").prepend(gifDiv);

        }


    });

}

// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < actors.length; i++) {

        // Then dynamicaly generating buttons for each actor in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("actor-btn");
        // Adding a data-attribute
        a.attr("data-name", actors[i]);
        // Providing the initial button text
        a.text(actors[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a actor button is clicked
$("#add-actors").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var actorChoice = $("#actor-input").val().trim();

    // Adding movie from the textbox to our array
    actors.push(actorChoice);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".actor-btn", displayActor);

// Calling the renderButtons function to display the intial buttons
renderButtons();