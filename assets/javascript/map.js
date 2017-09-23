function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var start = $("#start").val().trim();
        var end = $("#end").val().trim();
        
        directionsService.route({
           origin: start,
           destination: end,
          travelMode: 'DRIVING'
        }, function(response, status) {
          console.log(response);
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            directionsDisplay.setPanel(document.getElementById('directions'));
            console.log(directionsDisplay);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
var infowindow;
function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 28.538, lng: -81.379}
        });
        directionsDisplay.setMap(map);

        infoWindow = new google.maps.InfoWindow;

        // if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition(function(position) {
        //     console.log(position)
        //     var pos = {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     };

        //     infoWindow.setPosition(pos);
        //     infoWindow.setContent('Location found.');
        //     infoWindow.open(map);
        //     map.setCenter(pos);
        //   }, function() {
        //     handleLocationError(true, infoWindow, map.getCenter());
        //   });
        // } else {
        //   // Browser doesn't support Geolocation
        //   handleLocationError(false, infoWindow, map.getCenter());
        // }

        $(document).on("click", "#search-button", function(event){
          event.preventDefault();
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });       
        
      }

// function geolocation(position){
//   infoWindow = new google.maps.InfoWindow;

//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(function(position) {
//             var pos = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude
//             };

//             infoWindow.setPosition(pos);
//             infoWindow.setContent('Location found.');
//             infoWindow.open(map);
//             map.setCenter(pos);
//           }, function() {
//             handleLocationError(true, infoWindow, map.getCenter());
//           });
//         } else {
//           // Browser doesn't support Geolocation
//           handleLocationError(false, infoWindow, map.getCenter());
//         }
// }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

