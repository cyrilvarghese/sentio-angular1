var mapLocation = new google.maps.LatLng(-33.4267933,-70.6200213); //change coordinates here
var marker;
var map;

function initialize() {
    var mapOptions = {
        zoom: 11, //change zoom here
        center: mapLocation,
        scrollwheel: false,
				styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dbdbdb"},{"visibility":"on"}]}]
                
    };
    
    map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
    
    
    //change address details here
    var contentString = '<div class="map-info-box">' 
    + '<div class="map-head">' 
    + '<h3>Sentio VR</h3></div>' 
    + '<p class="map-address"><i class="fa fa-map-marker"></i>Santa Beatriz 91, Providencia, ChileSanta Beatriz 91, Providencia, Chile<span ' 
    + '<p><a href="https://www.google.co.in/maps/place/Sta+Beatriz+91,+Providencia,+Regi%C3%B3n+Metropolitana,+Chile/@-33.4267933,-70.6200213,17z/data=!3m1!4b1!4m5!3m4!1s0x9662cf63a6705415:0xa512b5ad8aa5d76d!8m2!3d-33.4267933!4d-70.6178326?hl=en" target="_blank">Open on Google Maps</a></p></div>';
    
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    
    
    var image = 'img/flag.svg';
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        title: 'Site Name', //change title here
        icon: image,
        animation: google.maps.Animation.DROP,
        position: mapLocation
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });

}

google.maps.event.addDomListener(window, 'load', initialize);
