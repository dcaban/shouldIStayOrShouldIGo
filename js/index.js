$(document).ready(function(){


	$('.input-dark').hide();
	$('.carousel-item').hide(0).fadeIn(3000);


$('.carousel.carousel-slider').carousel({fullWidth: true});

$('.bttn').click(function(){
   $('.carousel').carousel('next');



});



});

$('.bttn-dark').click(function(){

	$('.bttn-dark').hide();
	$('.input-dark').fadeIn(2000);
});


// Variables declarations
var api_key = "OuGqGq3usEeU5ErOgA0GhDU53AEuQ2HZ"; // Api key coming from Amadeus provider hotel search
var latitude = 0;
var longitud = 0;
var qta = "5";
var date_in = "2017-09-24";
var date_out = "2017-09-27";
var show = "";
var description_line = "";



   //Coordinates of Miami, Florida. If this is the start point, then the directions did not take the user's location.
var coords = {lat: 25.761, lng: -80.191};

function calculateAndDisplayRoute(directionsService, directionsDisplay, coordinates) {
//============= Form Input Variables ================================
        var start = coords;
        var end = $("#end").val().trim();
//===================================================================      
        directionsService.route({
           origin: start,
           destination: end,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            directionsDisplay.setPanel(document.getElementById('directions'));
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      
//Map Display
function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 28.538, lng: -81.379}
        });
        directionsDisplay.setMap(map);

       
//======Geolocation Functionality===============================
        infoWindow = new google.maps.InfoWindow;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            map.setCenter(pos);
//==========The user's coordinates are stored in the global variable, coords
            coords = pos;

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        $(document).on("click", "#search-button", function(event){
          event.preventDefault();
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });


$(document).on("keydown",function(e){

   var keyCode = e.which || e.keyCode;
   if(keyCode == 13) // enter key code
   { $('.carousel').carousel('next');
      console.log("enter pressed");

      event.preventDefault();
          calculateAndDisplayRoute(directionsService, directionsDisplay); }
});  

        console.log(coordinates);
//==================================================================              
        
      }

//=======Error Handling 
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

// ****************GEOCODE FUNCTION******************
//Function to covert address to Latitude and Longitude
function getLocation(address) {
    var deferred = $.Deferred(); // This would help to wayt until the function is done and have results
    var city = address;
    var api_google_key = "AIzaSyB1sBPX4i_pqV8q24NxvHTl40vesylu-js"
    var google_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=" + api_google_key;
    $.ajax({
        url: google_url,
        method: "GET"
    }).done(function(response) {
        var result_map = response.status;
        var coordinates = response.results[0].geometry.location;
        console.log(result_map);
        if (result_map == "OK") {
            var latLngArray = [+coordinates.lat, +coordinates.lng];
            deferred.resolve(latLngArray);
            console.log(latLngArray);
        } else {
            deferred.rejected(result_map);
        }
    })
    return deferred.promise(); //is returning the promise already completed and send the array as result
}

// **************END GEOCODE FUNCTION*****************
getLocation('Miami').then(function(resultArray) {
    // ************************************************************
    // Everithing on this section after the result from Geolocation
    // ************************************************************
    latitude = resultArray[0];
    longitud = resultArray[1];

    var query_url = "http://api.sandbox.amadeus.com/v1.2/hotels/search-circle?latitude=" + latitude + "&longitude=" + longitud + "&radius=50&check_in=" + date_in + "&check_out=" + date_out + "&number_of_results=" + qta + "&apikey=" + api_key;
    console.log(query_url);
    // API call back
    $.ajax({
        url: query_url,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var hotels = response.results;
        console.log(hotels);
        for (var w = 0; w < hotels.length; w++) {
            var hotel_div = $("<div>");
            var hotel_name = hotels[w].property_name;
            hotel_div.append(hotel_name);
            var description = hotels[w].rooms[0].descriptions;
            description.forEach(function(element) {
                console.log(element);
            });
            console.log(description);
            var rating_check = $("<p>").text("Daily Rate " + hotels[w].rooms[0].rates[0].price); //add the daily rate
            var total_price = " Total Amount " + hotels[w].total_price.amount;
            rating_check.append(total_price);

            hotel_div.append(rating_check);
            $("#hotel_container").append(hotel_div); // Printing out the final result into the div
        }

    });
}, function(error) {
    console.error("there is an error " + error);
});
