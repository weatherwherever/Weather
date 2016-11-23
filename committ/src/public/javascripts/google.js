function initAutocomplete() {
  var pos;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var lat = document.getElementById('latt');
      var long = document.getElementById('long');

      lat.innerHTML = pos.lat;
      long.innerHTML = pos.lng;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'location': pos}, function(results, status) {
      if (status === 'OK') {
        var location = results[1].formatted_address;
        var s = document.getElementById('pac-input');
        s.placeholder = location;
        var hourheader = document.getElementById('hour-head');
        hourheader.innerHTML = 'TODAY IN ' + location.toUpperCase();
        //her gerist hlutirnir
        var address = document.getElementById('address');
        address.innerHTML = location;

      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
  else {
    alert('sorry,your broswer doesnt support Geolocation');
  }

  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  var markers = [];


  searchBox.addListener('places_changed', function() {
          var input = document.getElementById('pac-input');
          getgps(input.value);
          var address = document.getElementById('address');
          address.innerHTML = input.value;

        })
    function getgps(input){
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'address': input
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var lat = document.getElementById('latt');
          var long = document.getElementById('long');
          lat.innerHTML = results[0].geometry.location.lat();
          long.innerHTML = results[0].geometry.location.lng();

        } else {
          alert("Something got wrong " + status);
        }
    })
  }
}