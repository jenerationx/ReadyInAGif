// My Giphy API key: aUJnpSZ6JHvWv27KlxdZ7YwyHRI33AXu
var topics = ["Moulin Rouge", "LA Confidential", "Muriels Wedding", "That Thing You Do", "Clueless", "Harry Potter", "Return of the Jedi", "Rogue One", "Brazil", "Pitch Perfect", "Goodfellas", "Titanic", "The Little Mermaid", "Charade", "Love Actually", "Elf", "Beauty and the Beast", "Mamma Mia"];
// Create a for-loop to iterate through the topics array and make buttons with each movie's name on them.
for (var i = 0; i < topics.length; i++) {

  var movieBtn = $("<button>");

  movieBtn.attr("data-name", topics[i]);

  movieBtn.addClass("btn");

  movieBtn.text(topics[i]);

  $("#button-div").append(movieBtn);
}
$("button").on("click", function () {

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

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + rating);

      // Giving the image tag an src attribute of a proprty pulled off the
      // result item
      movieGif.attr("src", results[i].images.fixed_height.url);
      gifDiv.addClass("col-md-4");

      // Appending the paragraph and personImage we created to the "gifDiv" div we created
      gifDiv.append(p);
      gifDiv.append(movieGif);

      // Prepending the gifDiv to the "#gifsgohere" div in the HTML
      $("#gifsgohere").prepend(gifDiv);



    }
  });
})
// Create a function that makes the ajax call to giphy API
// function displayMovieGifs() {

  // var movie = $(this).attr("data-name");
//   var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC&limit=5";
//   // Creating an AJAX call for the specific movie button being clicked
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function (response) {
//     console.log(response);
//     // Creating a div to hold the movie
// //     var movieDiv = $("#gifsgohere");

// //     // Storing the rating data
// //     var rating = response.rating;

// //     // Creating an element to have the rating displayed
// //     var pOne = $("<p>").text("Rating: " + rating);

// //     // Displaying the rating
// //     movieDiv.append(pOne);

// //     // Retrieving the URL for the image
// //     var imgURL = response.url;

// //     // Creating an element to hold the image
// //     var image = $("<img>").attr("src", imgURL);

// //     // Appending the image
// //     movieDiv.append(image);

// //     // Putting the entire movie above the previous movies
// //     $("#gifsgohere").prepend(movieDiv);
//   });

// }
// // $(document).on("click", ".movie-btn", displayMovieInfo);

// // // Function for displaying movie data
// // function renderButtons() {

// //   // Deleting the movies prior to adding new movies
// //   // (this is necessary otherwise you will have repeat buttons)
// //   $("#buttons-view").empty();

// }
