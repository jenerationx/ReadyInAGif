// My Giphy API key: aUJnpSZ6JHvWv27KlxdZ7YwyHRI33AXu
var topics = ["Moulin Rouge", "LA Confidential", "Muriel's Wedding", "That Thing You Do", "Clueless", "Harry Potter", "The Empire Strikes Back", "Rogue One", "The Princess Bride", "Pitch Perfect", "Goodfellas", "Titanic", "The Little Mermaid", "Charade", "Love Actually", "Elf", "Beauty and the Beast", "Mamma Mia", "Austenland", "Amelie"];

// Create a for-loop to iterate through the topics array and make buttons with each movie's name on them.
function renderbuttons() {

  $("#button-div").empty();

  for (var i = 0; i < topics.length; i++) {

    var movieBtn = $("<button>");

    movieBtn.attr("data-name", topics[i]);

    movieBtn.attr("id", "movie-btn");

    movieBtn.addClass("btn border border-light");

    movieBtn.text(topics[i]);

    $("#button-div").append(movieBtn);
  }
};

function displayGifs() {

  var movie = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=aUJnpSZ6JHvWv27KlxdZ7YwyHRI33AXu&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var results = response.data;

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {
      var movieGif = $("<img>");
      var gifDiv = $("<div>");
      var rating = results[i].rating;
      var title = results[i].title;

      // Creating a paragraph tag with the result's rating
      var p = $("<p>").text("Rating: " + rating);
      var p2 = $("<p>").text("Title: " + title)

      // Give the gifs some class
      movieGif.attr("src", results[i].images.fixed_height_still.url);
      movieGif.attr("data-still", results[i].images.fixed_height_still.url);
      movieGif.attr("data-animate", results[i].images.fixed_height.url);
      movieGif.attr("state", "still");
      movieGif.addClass("gif");
      gifDiv.addClass("float-left m-2");

      // Appending the paragraph to the "gifDiv" div
      gifDiv.append(movieGif);
      gifDiv.append(p);
      gifDiv.append(p2);
      
      // Prepending the gifDiv to the "#gifsgohere" div in the HTML
      $("#gifsgohere").prepend(gifDiv);
    };

    $(".gif").on("click", function () {
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
};

// Function to add a movie button chosen by the user 
$("#add-movie").on("click", function (event) {
  // Prevent the submit button from refreshing the page
  event.preventDefault();
  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();
  // Adding movie from the textbox to our array (prevent blank buttons and duplicates)
  if (($.inArray(movie, topics) === -1) && (movie !== "")) { topics.push(movie); };
  // clear text box
  $("#add-movie")[0].reset();
  // Calling renderButtons to add new button to display
  renderbuttons();
});

$(document).on("click", "#movie-btn", displayGifs);

renderbuttons();
