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

