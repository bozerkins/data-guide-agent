const http = require('http');
const readline = require('readline');

module.exports = class HttpReceiver
{
    constructor({port})
    {
        this.port = port;
        this.buffers = [];
    }

    bufferInto(buffer)
    {
        this.buffers.push(buffer);
    }

    listen()
    {
        const server = http.createServer(
            (req, res) =>
            {
                const rl = readline.createInterface({
                    input: req,
                    crlfDelay: Infinity
                });
            
                rl.on('line', (line) => {
                    this.buffers.forEach(buffer => buffer.push(line));
                });
            
                // After all the data is saved, respond with a simple html form so they can post more data
                req.on('end', function () {
                    res.writeHead(200, {"Content-Type":"application/json"});
                    res.end(JSON.stringify({status: 'ok'}));
                });
            
            }
        );
        server.listen(this.port);
    }
}