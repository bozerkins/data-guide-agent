const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
var events = require('events');

module.exports = class FileBuffer
{
    constructor(folder)
    {
        // location
        this.folder = folder;
        this.resetStream();

        // queue parameters
        this.queue = [[], []];
        this.currentQueueIndex = 0;
        this.processQueueIndex = 1;
        
        // check for permissions. throws an error if no permissions
        fs.accessSync(this.folder, fs.constants.R_OK | fs.constants.W_OK);

        // create emmiter
        this.emmiter = new events.EventEmitter();

        // prepare methods
        this.readdir = util.promisify(fs.readdir);
    }

    dispatchInto(dispatcher)
    {
        this.emmiter.removeAllListeners();
        this.emmiter.on('dispatch', dispatcher);
    }

    listen()
    {
        this.readdir(this.folder)
            .then((list) => {
                list.forEach(path => this.emmiter.emit('dispatch', this.folder + '/' + path))
            })
            .finally(() => {
                // start async writer
                this.writer();
            });
    }

    push(item)
    {
        this.queue[this.currentQueueIndex].push(item);
    }

    writer()
    {
        if (this.queue[this.currentQueueIndex].length > 0) {
            // switch queue indexes
            this.currentQueueIndex = Math.abs(this.currentQueueIndex-1);
            this.processQueueIndex = Math.abs(this.currentQueueIndex-1);
            // get stream
            let stream = this.getOrCreateStream();
            // write processing queue
            this.queue[this.processQueueIndex].forEach(
                (item) => {
                    // write record
                    stream.write(item + "\n");
                    // update size
                    this.streamSize += item.length + "\n".length;
                }
            );
            // empty queue
            this.queue[this.processQueueIndex] = [];
        }
    
        
        // check if stream empty
        if (this.streamSize > 0) { 
            // check if size >= 5mb or created more than 60 seconds ago
            if (this.streamSize >= 5242880 || new Date().getTime() - this.streamCreated > 60*1000 ) {
                this.stream.end();
                this.resetStream();
            }
        }
        setTimeout(() => { this.writer(); }, 100);
    }

    getOrCreateStream()
    {
        if (this.stream === null) {
            this.stream = this.createStream();
            this.streamSize = 0;
            this.streamCreated = new Date().getTime();
        }
        return this.stream;
    }

    resetStream()
    {
        this.stream = null;
        this.streamSize = null;
        this.streamCreated = null;
    }

    createStream()
    {
        const stream = fs.createWriteStream(
            this.folder + '/' + uuidv4(), {flags: 'a', autoClose: false}
        );
        stream.on('error', (err) => {
            console.log(err);
        });
        stream.on('finish', () => {
            this.emmiter.emit('dispatch', stream.path);  
        });
        return stream;
    }

}