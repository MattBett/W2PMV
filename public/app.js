const dev = true;

const server = {
    url: '',
    ip: 'www.matthieubettinger.fr', //En construction
    localhost: '127.0.0.1',
    port: '80',
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
            server.url = 'https://' + server.localhost + ':' + server.entryPoint;
        } else {
            server.url = 'https://' + server.ip;
        }     
        
        this.reqAPI = new Request(this.url + this.service, this.getInit);
    }
}

const app = {
    init: function() {
        server.init();
        this.refresh();
        setInterval(this.refresh, 25000);
    },

    refresh: async function() {
        var rawData = await fetch(server.reqAPI);
        var parsedData = await rawData.text();
        await console.log(parsedData);
    }
}

app.init();