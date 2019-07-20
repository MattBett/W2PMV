const express = require('express');
const app = express();
const fetch = require('node-fetch');
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.listen(3000, () => console.log('Listening at port 3000'));

app.get('/api', function(req, res) {
    res.send('Success !');
    console.log('New connexion at /api');
});

/*
async function getf() {
    const response = await fetch('https://download.data.grandlyon.com/sos/velov?service=SOS&request=GetCapabilities');
    return response;
}
*/