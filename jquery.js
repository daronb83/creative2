
$(document).ready(function() {

  var address = "";
  var full_address = "";
  var coords = "";

  $("#GG_button").click(function(e){
    // get input
    address = encodeURIComponent($("#GG_input").val());
    console.log("Google Geocoding and Maps")
    console.log("Input: " + address);
    e.preventDefault();

    // build Geocoding API URL
    var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBW7MzBq1JwCe6Jv-uViDGjvs8rK5jE4wo&address="
    url += address;
    console.log("Geocoding API URL:" + url);

    // Geocoding JSON
    $.getJSON(url, function(data) {
      console.log(data);
      full_address = data["results"][0]["formatted_address"];
      var lat = data["results"][0]["geometry"]["location"]["lat"];
      var long = data["results"][0]["geometry"]["location"]["lng"];
      coords = lat + "," + long;

      var iframe = "<iframe ";
      iframe += "width=\"600\"";
      iframe += "height=\"450\"";
      iframe += "frameborder=\"0\"";
      iframe += "style=\"border:0\"";
      iframe += "src=\"https://www.google.com/maps/embed/v1/place?";
      iframe += "key=AIzaSyBW7MzBq1JwCe6Jv-uViDGjvs8rK5jE4wo";
      iframe += "&q=" + address;
      iframe += "\" allowfullscreen></iframe>";
      console.log(iframe);

      var resultList = "<ul>";
      resultList += "<li><h2>" + full_address + "</h2></li>";
      resultList += "<li>Coords: " + coords + "</li>";
      resultList += "<li>" + iframe + "</li>";

      console.log("Weather Underground")

      // build Weather Underground API URL
      url = "https://api.wunderground.com/api/b5842b6ee6e1e144/geolookup/conditions/q/";
      url += address + ".json";
      console.log("API URL:" + url);

      // Weather Underground JSON
      $.getJSON(url, function(data) {
        var temp = data.current_observation.temperature_string;
        var weather = data.current_observation.weather;
        var lat = data.current_observation.display_location.latitude;
        var long = data.current_observation.display_location.longitude;
        var icon = data.current_observation.icon_url;

        resultList += "<li><h2>Weather</h2></li>";
        resultList += "<li>Temperature: " + temp + "</li>";
        resultList += "<li>" + weather + "</li>";
        resultList += "<li><img src=\"" + icon + "\"></li>";
        //resultList += "<li>Weather Coords: " + lat + "," + long + "</li>";
        resultList += "</ul>";
        $("#GG_results").html(resultList);

      });

      $("#YT_input").val("cats");
      youtube();
    });
  });

  function youtube() {
    var input = encodeURIComponent($("#YT_input").val());
    var radius = "10mi";
    console.log("Youtube")

    // build API URL
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&key=AIzaSyBW7MzBq1JwCe6Jv-uViDGjvs8rK5jE4wo";
    url += "&q=" + input;
    if (coords !== "") {
      $("#YT_header").html("Youtube Videos within " + radius + " of " + full_address);
      url += "&location=" + coords + "&locationRadius=" + radius;
    }
    console.log("API URL:" + url);

    // JSON
    $.getJSON(url, function(data) {
      var resultCount = data["pageInfo"]["totalResults"];
      var resultList = "<ul><li>Total Results: " + resultCount + "</li>";

      for (var i = 0; i < data["items"].length; i++) {
        resultList += "<li><b>Title: </b>" + data["items"][i]["snippet"]["title"] + "<br>";
        resultList += "<b>Description: </b>" + data["items"][i]["snippet"]["description"] + "<br>";
        resultList += "<a href=\"https://www.youtube.com/watch?v=" + data["items"][i]["id"]["videoId"] + "\" target=\"_blank\">";
        resultList += "<img src=\"" + data["items"][i]["snippet"]["thumbnails"]["default"]["url"] + "\"></a></li>";
      }
      resultList += "</ul>";

      $("#YT_results").html(resultList);

    });
  }

  $("#YT_button").click(function(e){
    e.preventDefault();
    youtube();
  });

  $("#SO_button").click(function(e){
    // get input
    var input = encodeURIComponent($("#SO_input").val());
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
});
