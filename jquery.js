
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

      /*console.log("Weather Underground")

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
        //resultList += "<li><img src=\"" + icon + "\"></li>";
        //resultList += "<li>Weather Coords: " + lat + "," + long + "</li>";
      });*/

      resultList += "</ul>";
      $("#GG_results").html(resultList);

      youtube();
    });
  });

  function youtube() {
    var input1 = encodeURIComponent($("#YT_input1").val());
    var input2 = encodeURIComponent($("#YT_input2").val());
    var radius = $("#radius").val() + "mi"
    console.log("Youtube")

    // build API URL for input 1
    var url1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&key=AIzaSyBW7MzBq1JwCe6Jv-uViDGjvs8rK5jE4wo";
    url1 += "&q=" + input1;
    if (coords !== "") {
      $("#YT_header").html("Youtube Videos within " + radius + " of " + full_address);
      url1 += "&location=" + coords + "&locationRadius=" + radius;
    }
    console.log("API URL:" + url1);

    // build API URL for input 2
    var url2 = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&key=AIzaSyBW7MzBq1JwCe6Jv-uViDGjvs8rK5jE4wo";
    url2 += "&q=" + input2;
    if (coords !== "") {
      $("#YT_header").html("Youtube Videos within " + radius + " of " + full_address);
      url2 += "&location=" + coords + "&locationRadius=" + radius;
    }
    console.log("API URL:" + url2);

    var resultCount1;
    var resultCount2;
    var resultList1;
    var resultList2;

    $.ajaxSetup({
      async: false
    });
    // JSON url1
    $.getJSON(url1, function(data1) {
      resultCount1 = data1["pageInfo"]["totalResults"];
      resultList1 = "<ul><li>Total Results: " + resultCount1 + "</li>";

      for (var i = 0; i < data1["items"].length; i++) {
        resultList1 += "<li><b>Title: </b>" + data1["items"][i]["snippet"]["title"] + "<br>";
        resultList1 += "<b>Description: </b>" + data1["items"][i]["snippet"]["description"] + "<br>";
        resultList1 += "<a href=\"https://www.youtube.com/watch?v=" + data1["items"][i]["id"]["videoId"] + "\" target=\"_blank\">";
        resultList1 += "<img src=\"" + data1["items"][i]["snippet"]["thumbnails"]["default"]["url"] + "\"></a></li>";
      }
      resultList1 += "</ul>";

    });

    // JSON url2
    $.getJSON(url2, function(data2) {
      resultCount2 = data2["pageInfo"]["totalResults"];
      resultList2 = "<ul><li>Total Results: " + resultCount2 + "</li>";

      for (var i = 0; i < data2["items"].length; i++) {
        resultList2 += "<li><b>Title: </b>" + data2["items"][i]["snippet"]["title"] + "<br>";
        resultList2 += "<b>Description: </b>" + data2["items"][i]["snippet"]["description"] + "<br>";
        resultList2 += "<a href=\"https://www.youtube.com/watch?v=" + data2["items"][i]["id"]["videoId"] + "\" target=\"_blank\">";
        resultList2 += "<img src=\"" + data2["items"][i]["snippet"]["thumbnails"]["default"]["url"] + "\"></a></li>";
      }
      resultList2 += "</ul>";

      

    });

    $.ajaxSetup({
      async: true
    });
    if (resultCount1 > resultCount2) {
      stringBuild = "<h1>"+input1+" wins with "+ resultCount1 + " results</h1>";
      $("#Match_results").html(stringBuild);
      $("#YT_results").html(resultList1);
    }    else {
      stringBuild = "<h1>"+input2+" wins with "+ resultCount2 + " results</h1>";
      $("#Match_results").html(stringBuild);
      $("#YT_results").html(resultList2);
    }
    
  }

  $("#YT_button").click(function(e){
    e.preventDefault();
    youtube();
  });
});
