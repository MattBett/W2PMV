const dev = true;

const server = {
    url: '',
    ip: 'wheredoiparkmyvelov.matthieubettinger.fr',
    localhost: '127.0.0.1',
    service: '/api',

    headers: new Headers(),
    getInit: {
        method: 'GET',
        headers: this.headers,
        mode: 'cors',
        cache: 'default'
    },

    init: function() {
        if(dev) {
            this.url = 'http://' + this.localhost;
        } else {
            this.url = 'https://' + this.ip;
        }
        
        this.reqAPI = new Request(this.url + this.service, this.getInit);
    }
}

const app = {
    stations: [],

    init: function(map, full, almostFull, empty, warning) {
        server.init();
        this.refresh(map, full, almostFull, empty, warning);
    },

    refresh: async function(map, full, almostFull, empty, warning) {
        var marker = full;
        var description = '<em>No description</em>';
        var rawData = await fetch(server.reqAPI);
        var parsedData = await rawData.json();
        this.stations = parsedData;

        this.stations.forEach(station => {
            var lastupdate = station.last_update.split(' ');
            const hour = lastupdate[1];
            var date = lastupdate[0].split('/');
            const year = date[0];
            const month = date[1];
            const day = date[2];
            lastupdate = day + '/' + month + '/' + year + ' ' + hour;

            description = '<div style="text-align: center; font-size: 1.2em;">'
                            + '<strong>' + station.name + '</strong><br>'
                            + '<em>' + station.address + '</em><br>'
                            + station.commune + '<br>'
                            + '<strong>Stands libres:</strong> ' + station.stands_count + '<br>'
                            + '<strong>Velo\'v disponibles:</strong> ' + station.bikes_count + '<br>'
                            + '<em>' + lastupdate + '</em>'
                            + '<br>' + station.status
                            + '</div>';
            if(station.stands_count == 0) {
                marker = full;
            } else if(station.stands_count < 5) {
                marker = almostFull;
            } else {
                marker = empty;
            }

            if(station.status != 'OPEN') { 
                marker = warning;
            }
            
            L.marker([station.location.lat, station.location.lon], {icon: marker}).addTo(map)
                .bindPopup(description, {'maxWidth': '400', 'maxHeight': '400', 'keepInView': 'true'});
        });
    }
}
