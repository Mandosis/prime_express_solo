var search = "";

$(function(){
  $('button').on("click", function(){
    // Gets input and replaces spaces with +
    search = $('input').val().replace(/ /g,"+");

    // console.log(search);
    gifIt(search);
  });

  $('input').keypress(function(e) {
    // Gets what key was pressed
    var code = e.keyCode || e.which;

    // Checks to see if the enter key was pressed
    if (code == 13) {
      // Get input from text box
      search = $('input').val().replace(/ /g,"+");

      // Change placeholder
      var placeholder = $("input").val();
      if(placeholder != "") {
        $('input').attr("placeholder", placeholder);
      }

      // Clear textbox
      $('input').val("");

      // Get the gifs
      gifIt(search);
    }
  });
});

function gifIt(search) {

  // Chek to see if search is empty
  if (search != "") {
    // Remove any gifs on page
    $(".gifs").empty();

    // Set the api search
    var searchApi = 'http://api.giphy.com/v1/gifs/search?q=' + search +'&api_key=dc6zaTOxFJmzC';

    // Get information
    $.get(searchApi).done(function(response) {
      // console.log(response);

      // Loop through results and show images
      for (var i = 0; i < response.data.length; i++) {
        $('.gifs').append("<img src=\"" + response.data[i].images.fixed_height.url + "\" />");
      }
    });
  } else {

    // Clears gifs if attribute is not random
    if($('input').attr("placeholder") != "Random") {
      $('.gifs').empty();
    }
    // Change placholder to Random
    $('input').attr("placeholder", "Random");

    // Get random image
    $.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC').done(function(response){
      // Add image to DOM
      $('.gifs').append("<img src=\"" + response.data.fixed_height_downsampled_url + "\" />");
      // console.log(response);
    }).fail(function(response){
      console.log("No gif's :(");
    });
  }
}
