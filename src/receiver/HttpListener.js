const http = require('http');

module.exports = class HttpListener
{
    constructor(port, path = null)
    {
        this.port = port;
        this.path = path;
    }

    listen()
    {
        const server = http.createServer(
            this.handler
        );
        server.listen(this.port);
    }

    handler(req, res)
    {
        res.writeHead(200);
        res.end('Hello, World!');
    }
}