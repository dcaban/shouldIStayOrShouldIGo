$(document).ready(function() {


    $('.input-dark').hide();
    $('.carousel-item').hide(0).fadeIn(3000);


    $('.carousel.carousel-slider').carousel({ fullWidth: true });

    $('.bttn').click(function() {
        $('.carousel').carousel('next');

    });
    $('.bttn-stay').click(function() {
        $('.carousel').carousel('prev', 2);

    });


});

$('.bttn-dark').click(function() {

    $('.bttn-dark').hide();
    $('.input-dark').fadeIn(2000);
});

// Variables declarations
var api_key = "OuGqGq3usEeU5ErOgA0GhDU53AEuQ2HZ"; // Api key coming from Amadeus provider hotel search
var latitude = 0;
var longitud = 0;
var qta = "5";
var date_in = "2017-09-30";
var date_out = "2017-10-10";
var show = "";
var description_line = "";


//Coordinates of Miami, Florida. If this is the start point, then the directions did not take the user's location.
var coords = { lat: 25.761, lng: -80.191 };

function calculateAndDisplayRoute(directionsService, directionsDisplay, dest) {
    //============= Form Input Variables ================================
    var start = coords;
    var end = dest;

    console.log(end)
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
          center: {lat: 40.674, lng: -73.945},
          zoom: 12,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });

    
    directionsDisplay.setMap(map);

    // ==========================GEOCODE FUNCTION=============================
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

    // ======================END GEOCODE FUNCTION============================

    //Function that sets a hotel as a destination
    $(document).on("click", ".hotel-card-content", function(event){
        var hotelLat = $(this).attr("lat");
        var hotelLng = $(this).attr("lng");
        hotelLat = parseFloat(hotelLat);
        hotelLng = parseFloat(hotelLng);
        console.log(hotelLat);

        var hotelCoords = {
            lat: hotelLat,
            lng: hotelLng
        }
        console.log(hotelCoords);
        calculateAndDisplayRoute(directionsService, directionsDisplay, hotelCoords);
    });

    // FUNCTION TO START MAP AND HOTELS
    $(document).on("keydown", function(e) {

        var keyCode = e.which || e.keyCode;
        if (keyCode == 13) // enter key code
        {
            $('.carousel').carousel('next');
            console.log("enter pressed");

            event.preventDefault();

            //Geolocation Functionality
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {

                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    map.setCenter(pos);
                    //The user's coordinates are stored in the global variable, coords
                    coords = pos;
                    var destination = $("#end").val().trim();
                    //When the user allows geolocation, the route is displayed
                    calculateAndDisplayRoute(directionsService, directionsDisplay, destination);

                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            };

            // =====This function would call the hotel search 
            getLocation($("#end").val().trim()).then(function(resultArray) {
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
                        var hotel_div = $("<div>"); // main Div container
                        hotel_div.addClass("card small hoverable");
                        var hotel_div2 = $("<div>"); //1 level of div
                        hotel_div2.addClass("card-image waves-effect waves-block waves-light")
                        var hotel_img = $("<img>");
                        hotel_img.addClass('class="activator"');
                        hotel_img.attr("src", "https://www.safarihotelsnamibia.com/wp-content/uploads/2014/11/Safari-Court-Hotel-Pool.jpg");
                        hotel_div2.append(hotel_img)
                        hotel_div.append(hotel_div2);
                        ////////DIV3////////////////
                        var hotel_div3 = $("<div>"); //div for content
                        hotel_div3.addClass("card-content hotel-card-content");
                        //Hotel location for Google Maps
                        console.log(hotels[w].location);
                        hotel_div3.attr("lat", hotels[w].location.latitude);
                        hotel_div3.attr("lng", hotels[w].location.longitude);
                        //span tag
                        var span = $("<span>");
                        span.addClass("card-title activator");
                        span.text(hotels[w].property_name);
                        var itag = $("<i>");
                        itag.addClass("material-icons right");
                        itag.text("more_vert");
                        span.append(itag);
                        //hiperlinktag
                        var hiperlink = $("<p>");
                        var alink = $("<a>");
                        alink.attr("href", hotels[w]._links.more_rooms_at_this_hotel.href);
                        alink.text("more rooms");
                        hiperlink.append(alink);
                        hotel_div3.append(span);
                        hotel_div3.append(hiperlink);
                        hotel_div.append(hotel_div3);
                        ////////DIV4////////////////
                        var hotel_div4 = $("<div>");
                        hotel_div4.addClass("card-reveal");
                        var span2 = $("<span>");
                        span2.addClass("card-title grey-text text-darken-4");
                        span2.text("Description and Price");
                        var itag2 = $("<i>");
                        itag2.addClass("material-icons right");
                        itag2.text("close");
                        span2.append(itag2);
                        var rating_check = $("<p>").text("Daily Rate " + hotels[w].rooms[0].rates[0].price);
                        var total_price = $("<p>").text(" Total Amount " + hotels[w].total_price.amount);
                        rating_check.attr("id", "card_description_hotel");
                        total_price.attr("id", "card_description_hotel");
                        span2.append(total_price);
                        span2.append(rating_check);

                        var description = hotels[w].rooms[0].descriptions;
                        var string = "";
                        description.forEach(function(element) {
                            string = string + element;
                        });
                        var description_final = $("<p>").text(string);
                        console.log(string);
                        description_final.attr("id", "card_description_hotel");
                        span2.append(description_final);
                        hotel_div4.append(span2);
                        hotel_div.append(hotel_div4);
                        $("#hotel_container").append(hotel_div); // Printing out the final result into the div
                    }
                });
            }, function(error) {
                console.error("there is an error " + error);
            });
        }
    });
}

//Geolocation error Handling 
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        //if true
        'Error: The Geolocation service failed.' :
        //if false         
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map)
}