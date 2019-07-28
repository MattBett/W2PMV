require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const app = express();

const port = process.env.PORT;

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => console.log('Listening at port ' + port));

const updateStations = async function() {
    const response = await fetch('https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=jcd_jcdecaux.jcdvelov&outputFormat=application/json;%20subtype=geojson&SRSNAME=EPSG:4171&startIndex=0');
    //const response = await fetch('http://localhost/data');
    const data = await response.json();
    var stations = [];

    for(entry of data.features) {
        var station = {
            name: entry.properties.name,
            address: entry.properties.address + '<br>' + entry.properties.address2,
            commune: entry.properties.commune,
            status: entry.properties.status,
            location: {
                lat: entry.properties.lat,
                lon: entry.properties.lng
            },
            stands_count: entry.properties.available_bike_stands,
            bikes_count: entry.properties.available_bikes,
            pole: entry.properties.pole,
            id: entry.properties.number,
            last_update: entry.properties.last_update
        };

        stations.push(station);
    }

    return stations;
}

var stations;

updateStations().then((success, error) => {
    if(error) {
        console.error(error);
    } else {
        stations = success;
        console.log('Data updated');
    }
});

setInterval(() => {
    updateStations().then((success, error) => {
        if(error) {
            console.error(error);
        } else {
            stations = success;
            console.log('Data updated');
        }
    });
}, 30000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html');
})
.get('/api', (req, res) => {
    res.json(stations);
    log('New connexion at /api');
})
.get('/data', (req, res) => {
    res.sendFile(__dirname + '/data-full.json');
});

function log(msg) {
    var now = new Date();

    var annee   = now.getFullYear();
    var mois    = ('0'+(now.getMonth()+1)).slice(-2);
    var jour    = ('0'+now.getDate()     ).slice(-2);
    var heure   = ('0'+now.getHours()    ).slice(-2);
    var minute  = ('0'+now.getMinutes()  ).slice(-2);
    var seconde = ('0'+now.getSeconds()  ).slice(-2);

    console.log('[' + jour + '/' + mois + '/' + annee + ' ' +  heure + ':' + minute + ':' + seconde + '] ' + msg);
}