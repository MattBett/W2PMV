const dev = true;

const express = require('express');
const fetch = require('node-fetch');
const app = express();

var port;

if(dev) {
    port = 80;
} else {
    port = 3000;
}

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => console.log('Listening at port ' + port));

app.get('/api', function(req, res) {
    res.send('Success !');
    log('New connexion at /api');
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


async function updateStations() {
    const response = await fetch('https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=jcd_jcdecaux.jcdvelov&outputFormat=application/json;%20subtype=geojson&SRSNAME=EPSG:4171&startIndex=0');
    const parsedData = await response.json();
    console.log(parsedData);
    return parsedData;
}

//updateStations();