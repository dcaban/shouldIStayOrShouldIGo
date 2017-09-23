function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
           origin: "Orlando, FL",
           destination: "Atlanta, GA",
          travelMode: 'DRIVING'
        }, function(response, status) {
          console.log(response);
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 28.538, lng: -81.379}
        });
        directionsDisplay.setMap(map);

        
        calculateAndDisplayRoute(directionsService, directionsDisplay);
        
        
      }
