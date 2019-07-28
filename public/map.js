function initialize() {
    const lyon = {
        lat: 45.763694, 
        lon: 4.835468
    }
    var userLocation = {
        lat: 48.833, //latitude
        lon: 2.333   //longitude
    }

    const size = 56;
    //Création du marqueur
    var userMarker = L.icon({
        iconUrl: 'resources/user.png',
        iconSize:     [44, 44], // taille de l'icone
        iconAnchor:   [22, 22], // point de l'icone qui correspondra à la position du marker
        popupAnchor:  [22, -10] // point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
    });

    var empty = L.icon({
        iconUrl: 'resources/empty.png',
        iconSize:     [size, size], // taille de l'icone
        iconAnchor:   [size/2, size], // point de l'icone qui correspondra à la position du marker
        popupAnchor:  [0, -size] // point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
    });

    var almostFull = L.icon({
        iconUrl: 'resources/almost-full.png',
        iconSize:     [size, size], // taille de l'icone
        iconAnchor:   [size/2, size], // point de l'icone qui correspondra à la position du marker
        popupAnchor:  [0, -size] // point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
    });

    var full = L.icon({
        iconUrl: 'resources/full.png',
        iconSize:     [size, size], // taille de l'icone
        iconAnchor:   [size/2, size], // point de l'icone qui correspondra à la position du marker
        popupAnchor:  [0, -size] // point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
    });

    var warning = L.icon({
        iconUrl: 'resources/warning.png',
        iconSize:     [size, size], // taille de l'icone
        iconAnchor:   [size/2, size], // point de l'icone qui correspondra à la position du marker
        popupAnchor:  [0, -size] // point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
    });

    var map = L.map('map').setView([lyon.lat, lyon.lon], 15);

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

    var osmLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });

    map.addLayer(osmLayer);
    app.init(map, full, almostFull, empty, warning);
}