var map;
//var center;
 //var address = "";
var currentAddress = "Provo, UT, USA";
var currentLat = -25.363;
var currentLng = 131.044;
//var coords = {lat: -25.363, lng: 131.044};

function initMap() {
  var myLatlng = {lat: currentLat, lng: currentLng};

    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng
  });


  map.addListener('center_changed', function() {
    center = map.getCenter();
    console.log(center.lat());
    console.log(center.lng());
    updateAddressFromCoords(center.lat(),center.lng());
  });
}

/*function refresh() {
      var resultList = "<ul>";
      resultList += "<li><h2>" + currentAddress + "</h2></li>";
      resultList += "<li>Coords: Latitude " + currentLat + " Longitude " + currentLng + "</li>";
      resultList += "</ul>";
      $("#GG_results").html(resultList);
}*/

function getCoordsFromAddress() {
  // build Geocoding API URL  
  var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBW7MzBq1JwCe6Jv-uViDGjvs8rK5jE4wo&address="
  url += encodeURIComponent(currentAddress);
  console.log("Geocoding API URL:" + url);
  var myCoordinates;
  // Geocoding JSON

  $.ajaxSetup({
    async: false
  });

  $.getJSON(url, function(data) {
    console.log(data);
    if(data["status"] == "OK") {

    currentAddress = data["results"][0]["formatted_address"];
    var latitude = data["results"][0]["geometry"]["location"]["lat"];
    var long = data["results"][0]["geometry"]["location"]["lng"];
    myCoordinates = {lat: latitude, lng: long};
    currentLat = latitude;
    currentLng = long;
    }
  });

  $.ajaxSetup({
    async: true
  });

  console.log("myCoordinates: " + myCoordinates);
  return myCoordinates;
}


function updateAddressFromCoords(latitude, longitude) {

  console.log("latdifference" + Math.abs(currentLat - latitude));
  console.log("longdifference" + Math.abs(currentLng - longitude));
  if((Math.abs(currentLat - latitude) > 0.1 || Math.abs(currentLng - longitude) > 0.1) && map.getZoom() > 11) {

    insert = "latlng="+latitude+","+longitude;
    // build Geocoding API URL  
    var url = "https://maps.googleapis.com/maps/api/geocode/json?"+insert+"&key=AIzaSyBW7MzBq1JwCe6Jv-uViDGjvs8rK5jE4wo"
    console.log("Geocoding API URL:" + url);
    // Geocoding JSON

    $.ajaxSetup({
      async: false
    });

    $.getJSON(url, function(data) {
      console.log(data);
      
      currentAddress = data["results"][0]["formatted_address"];
       // city = data["results"][0]["address_components"][3];
        //state = data["results"][0]["address_components"][4];
        //console.log("city:  " + city + "  state:  " + state);

      
    });

    $.ajaxSetup({
      async: true
    });
    currentLat = latitude;
    currentLng = longitude;
    //refresh();
  }

}

$(document).ready(function() {

  $("#GG_button").click(function(e){
    
    e.preventDefault();

    // update the global current address
    currentAddress = $("#GG_input").val();
    newCoords = getCoordsFromAddress();
    map.panTo(newCoords);
    map.setZoom(12);
    //refresh();
  });
});
