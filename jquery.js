
$(document).ready(function() {

    $("#SO_button").click(function(e){
    // get input
    var input = $("#SO_input").val();
    console.log("Stack Exchange")
    console.log("Input: " + input);
    e.preventDefault();

    // build API URL
    var url = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle="
    url += input;
    console.log("API URL:" + url);

    // JSON
    $.getJSON(url, function(data) {
      var resultList = "<ul>";

      for (var i = 0; i < data.items.length; i++) {
        var link = data.items[i].link;
        var title = data.items[i].title;
        resultList += "<li><a href=\"" + link + "\" target=\"_blank\">" + title + "</a>";
      }

      resultList += "</ul>";
      $("#SO_results").html(resultList);
    });
  });

  $("#WU_button").click(function(e){
    // get input
    var input = $("#WU_input").val();
    console.log("Weather Underground")
    console.log("Input: " + input);
    e.preventDefault();

    // build API URL
    var url = "https://api.wunderground.com/api/b5842b6ee6e1e144/geolookup/conditions/q/UT/";
    url += input + ".json";
    console.log("API URL:" + url);

    // JSON
    $.getJSON(url, function(data) {
      var location = data.location.city;
      var temp = data.current_observation.temperature_string;
      var weather = data.current_observation.weather;

      var resultList = "<ul>";
      resultList += "<li>" + location + "</li>";
      resultList += "<li>" + temp + "</li>"
      resultList += "<li>" + weather + "</li>"
      resultList += "</ul>";
      $("#WU_results").html(resultList);

    });
  });

  $("#YT_button").click(function(e){
    // get input
    var input = $("#YT_input").val();
    var location = $("#YT_location").val();
    var radius = $("#YT_radius").val();
    console.log("Youtube")
    console.log("Input: " + input + " " + location + " " + radius);
    e.preventDefault();

    // build API URL
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&key=AIzaSyBW7MzBq1JwCe6Jv-uViDGjvs8rK5jE4wo&"
    url += input;
    if (location !== "") {
      url += "&" + location + "&" + radius;
    }
    console.log("API URL:" + url);

    // JSON
    $.getJSON(url, function(data) {
      var resultList = "<p>Results: " + data.pageInfo.totalResults + "<br>";
      var title = "Title: " + data.items.kind;
      console.log(title);

      $("#YT_results").html(resultList);

    });
  });

});
