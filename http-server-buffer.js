const http = require('http');
const fs = require('fs');
const readline = require('readline');

const FileBuffer = require('./src/FileBuffer');
// create buffer 
const buffer = new FileBuffer(__dirname);
// start buffer streams
buffer.listen();

const server = http.createServer(
  (req, res) => {

    const rl = readline.createInterface({
        input: req,
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        // push item to buffer
        buffer.push(line);
    });

    // After all the data is saved, respond with a simple html form so they can post more data
    req.on('end', function () {
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify({status: 'ok'}));
    });

  }
);
server.listen(1234);