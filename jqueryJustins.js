var map;
//var center;
 //var address = "";
// var full_address = "Provo, UT, USA";
 //var coords = {lat: -25.363, lng: 131.044};

function initMap() {
  var myLatlng = {lat: -25.363, lng: 131.044};

    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng
  });


  map.addListener('center_changed', function() {
    center = map.getCenter()
    console.log(center.lat())
    console.log(center.lng())
  });
}


function getCoordsFromAddress(address) {
    // build Geocoding API URL
    var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBW7MzBq1JwCe6Jv-uViDGjvs8rK5jE4wo&address="
    url += address;
    console.log("Geocoding API URL:" + url);
  var myCoordinates;
  // Geocoding JSON
  $.getJSON(url, function(data) {
    console.log(data);
    full_address = data["results"][0]["formatted_address"];
    var latitude = data["results"][0]["geometry"]["location"]["lat"];
    var long = data["results"][0]["geometry"]["location"]["lng"];
    myCoordinates = {lat: latitude, lng: long};
    console.log(myCoordinates);

  });
      return myCoordinates;
}

$(document).ready(function() {

  function refresh() {

  }


 // var address = "";
  //var full_address = "";
  //var coords = "";

  $("#GG_button").click(function(e){
    // get input
    address = encodeURIComponent($("#GG_input").val());
    console.log("Google Geocoding and Maps")
    console.log("Input: " + address);
    e.preventDefault();

    newCoords = getCoordsFromAddress(address);
    console.log(newCoords);
    map.panTo(newCoords);
    map.setZoom(12);


  });
});


    
