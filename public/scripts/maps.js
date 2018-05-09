
var map;
 // $(document).ready(function(){
    var options = {
        zoom: 15,
        // center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
function initialize(options) {
  coord()
console.log(options.latitude, ' ', options.longitude)
    var latlng = new google.maps.LatLng(options.latitude, options.longitude);
  
    options.center = latlng;
 
    map = new google.maps.Map(document.getElementById("mapa"), options);
}
 let coord = function () {

  navigator.geolocation.getCurrentPosition(function(position){
      
      options.latitude = position.coords.latitude;
      options.longitude = position.coords.longitude;

      console.log(options)
  initialize(options)

    })
}

$(window).on('load', function() {
  $('div #content').each(function(index, Element){
    console.log("hey ", index)
      coord();
    
  })
})
 // })