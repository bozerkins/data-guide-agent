const http = require('http');
const fs = require('fs');
const readline = require('readline');

let queue = [[], []]; // define 2 queues
let currentQueueIndex = 0;  // switch between 0 and 1
let processQueueIndex = 1;

// This opens up the writeable stream to `output`
let writeStream = fs.createWriteStream('./output.stream', {flags: 'a', autoClose: false});
// This is here incase any errors occur
writeStream.on('error', function (err) {
    console.log(err);
});

const server = http.createServer(
  (req, res) => {

    const rl = readline.createInterface({
        input: req,
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        queue[currentQueueIndex].push(line);
    });

    // After all the data is saved, respond with a simple html form so they can post more data
    req.on('end', function () {
        res.writeHead(200, {"content-type":"text/html"});
        res.end('All good, live your life');
    });

  }
);
server.listen(1234);

function dispatchCache()
{
    // check if queue not empty
    if (queue[currentQueueIndex].length > 0) {
        currentQueueIndex = Math.abs(currentQueueIndex-1);
        processQueueIndex = Math.abs(currentQueueIndex-1);
        // write processing queue
        queue[processQueueIndex].forEach((item) => {
            // console.log(item);
            writeStream.write(item + "\n");
        });
        // debug
        console.log(`Lines written: ${queue[processQueueIndex].length}`);
        // empty queue
        queue[processQueueIndex] = [];
    }
    setTimeout(dispatchCache, 1000);
}
dispatchCache();