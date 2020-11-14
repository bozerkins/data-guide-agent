const net = require('net');

module.exports = class TcpReceiver
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
        const server = new net.Server();
        server.listen(this.port, () => {
            console.log(`Server listening for connection requests on socket ${this.port}`);
        });

        server.on('connection', (socket) => {
            console.log('A new connection has been established.');

            socket.on('data', (chunk) => {
                this.buffers.forEach(buffer => buffer.push(chunk.toString()));
            });

            socket.on('end', () => {
                console.log('Closing connection with the client');
            });

            socket.on('error', (err) => {
                console.log(`Error: ${err}`);
            });
        });
    }
}