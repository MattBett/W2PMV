function initialize() {
    var userLocation = {
        lat: 48.833, //latitude
        lon: 2.333   //longitude
    }

    //Création du marqueur
    var userMarker = L.icon({
        iconUrl: 'resources/user.png',
        iconSize:     [44, 44], // taille de l'icone
        iconAnchor:   [22, 22], // point de l'icone qui correspondra à la position du marker
        popupAnchor:  [22, -10] // point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
    });

    if("geolocation" in navigator) {
        console.log('Geolocation available');
        navigator.geolocation.getCurrentPosition((position) => {
            userLocation.lat = position.coords.latitude;
            userLocation.lon = position.coords.longitude;
            console.table(userLocation);
            L.marker([userLocation.lat, userLocation.lon], {icon: userMarker}).addTo(map);
        });
    } else {
        console.error('Geolocation unavailable... Try with another browser?');
    }

    var map = L.map('map').setView([userLocation.lat, userLocation.lon], 7);

    var osmLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });

    map.addLayer(osmLayer);

/*
    L.marker([48.5, -0.09], {icon: stationIcon}).addTo(map)
        .bindPopup('Plus de détail sur cette station Velo\'v (html)');
*/
    
}