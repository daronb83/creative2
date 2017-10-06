
$(document).ready(function() {

  setHints();
  var address = "";
  var full_address = "";
  var coords = "";

  $("#GG_button").click(function(e){
    console.log("Clicked submit");
    e.preventDefault();

    // get input
    var input1 = encodeURIComponent($("#YT_input1").val());
    var input2 = encodeURIComponent($("#YT_input2").val());
    address = encodeURIComponent($("#GG_input").val());

    if (!validateInput()){
      console.log("Invalid input");
      return;
    }

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
      iframe += "width=\"100%\"";
      iframe += "height=\"50%\"";
      iframe += "frameborder=\"0\"";
      iframe += "style=\"border:0;\"";
      iframe += "src=\"https://www.google.com/maps/embed/v1/place?";
      iframe += "key=AIzaSyBW7MzBq1JwCe6Jv-uViDGjvs8rK5jE4wo";
      iframe += "&maptype=satellite";
      iframe += "&q=" + address;
      iframe += "\"></iframe>";
      console.log(iframe);

      var resultList = "<br><h1><div id=\"c1\">" + input1 + "</div>&nbsp vs &nbsp<div id=\"c2\">" + input2 + "</div></h1>"
      resultList += "<h2>" + full_address + "</h2>";
      resultList += iframe + "<br>";

      $("#GG_results").html(resultList);
      $("#forms").hide();
      $("#results").fadeIn(4000);
      youtube();
    });
  });

  function validateInput() {
    var valid = true;
    $("#YT_input1").removeAttr('style');
    $("#YT_input2").removeAttr('style');
    $("#GG_input").removeAttr('style');

    if ($("#YT_input1").val() === "") {
      valid = false;
      $("#YT_input1").attr('style', 'border: 2px solid red;');
    }

    if ($("#YT_input2").val() === "") {
      valid = false;
      $("#YT_input2").attr('style', 'border: 2px solid red;');
    }

    if ($("#GG_input").val() === "") {
      valid = false;
      $("#GG_input").attr('style', 'border: 2px solid red;');
    }

    return valid;
  }

  function setHints() {
    var random = Math.floor(Math.random() * 7);

    switch (random) {
      case 0:
        $("#YT_input1").attr('placeholder', 'Pirates');
        $("#YT_input2").attr('placeholder', 'Ninjas');
        break;
      case 1:
        $("#YT_input1").attr('placeholder', 'Pie');
        $("#YT_input2").attr('placeholder', 'Cake');
        break;
      case 2:
        $("#YT_input1").attr('placeholder', 'Cats');
        $("#YT_input2").attr('placeholder', 'Dogs');
        break;
      case 3:
        $("#YT_input1").attr('placeholder', 'Batman');
        $("#YT_input2").attr('placeholder', 'Superman');
        break;
      case 4:
        $("#YT_input1").attr('placeholder', 'Coke');
        $("#YT_input2").attr('placeholder', 'Pepsi');
        break;
      case 5:
        $("#YT_input1").attr('placeholder', 'iPhone');
        $("#YT_input2").attr('placeholder', 'Android');
        break;
      case 6:
        $("#YT_input1").attr('placeholder', 'Red');
        $("#YT_input2").attr('placeholder', 'Blue');
        break;
    }
  }

  function youtube() {
    console.log("Youtube")

    var input1 = encodeURIComponent($("#YT_input1").val());
    var input2 = encodeURIComponent($("#YT_input2").val());
    var radius = $("#radius").val() + "mi";

    // build API URL for input 1
    var url1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&key=AIzaSyBW7MzBq1JwCe6Jv-uViDGjvs8rK5jE4wo";
    url1 += "&q=" + input1;
    if (coords !== "") {
      url1 += "&location=" + coords + "&locationRadius=" + radius;
    }
    console.log("API URL:" + url1);

    // build API URL for input 2
    var url2 = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&key=AIzaSyBW7MzBq1JwCe6Jv-uViDGjvs8rK5jE4wo";
    url2 += "&q=" + input2;
    if (coords !== "") {
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
      resultList1 = "<ul><b>Check out these " + input1 + " videos from within " + radius + "miles!</b><li></li>";

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
      resultList2 = "<ul><b>Check out these " + input2 + " videos from within " + radius + "</b><li></li>";

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

    buildBar(input1, resultCount1, input2, resultCount2);

    if (resultCount1 > resultCount2) {
      stringBuild = "<h1>"+input1+" wins!</h1>";
      $("#Match_results").html(stringBuild);
      $("#YT_results").html(resultList1);
    }
    else {
      stringBuild = "<h1>"+input2+" wins!</h1>";
      $("#Match_results").html(stringBuild);
      $("#YT_results").html(resultList2);
    }

  }

  function buildBar (leftName, left, rightName, right) {
    var inc = 100 / (left + right);
    $("#left_bar").css("width", inc * left + "%");
    $("#left_bar").html("&nbsp&nbsp" + leftName + ": " + left);
    $("#right_bar").css("width", inc * right + "%");
    $("#right_bar").html(rightName + ": " + right + "&nbsp&nbsp");
  }

  $("#results").click(function(){
    $("#resultBox").slideDown();
    $("#search").hide();
  });

  $("#resultBox").click(function(){
    location.reload();
  });
});
