const dev = true;

const server = {
    url: '',
    ip: '',
    localhost: '127.0.0.1',
    entryPoint: '3000',
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
            server.url = 'http://' + server.localhost + ':' + server.entryPoint;
        } else {
            server.url = 'http://' + server.ip + ':' + server.entryPoint;
        }     
        
        this.reqAPI = new Request(this.url + this.service, this.getInit);
    }
}

const app = {
    init: function() {
        server.init();
        this.refresh();
        setInterval(this.refresh, 7500);
    },

    refresh: async function() {
        var rawData = await fetch(server.reqAPI);
        var parsedData = await rawData.text();
        await console.log(parsedData);
    }
}

app.init();