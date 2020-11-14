var Tail = require('always-tail');
var fs = require('fs');

module.exports = class HttpReceiver
{
    constructor({filename})
    {
        // check file exists
        if (!fs.existsSync(filename)) {
            throw `File ${filename} does no exist`;        
        }
 
        // check for permissions. throws an error if no permissions
        fs.accessSync(filename, fs.constants.R_OK);

        this.filename = filename;
        this.buffers = [];
    }

    bufferInto(buffer)
    {
        this.buffers.push(buffer);
    }

    listen()
    {
        var tail = new Tail(this.filename, "\n");
 
        tail.on('line', (line) => {
            this.buffers.forEach(buffer => buffer.push(line));
        });
        
        tail.on('error', function(error) {
            console.log("error:", error);
        });
        
        tail.watch();
    }
}