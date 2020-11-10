const fs = require('fs');

module.exports = class FileBuffer
{
    constructor(folder)
    {
        // location
        this.folder = folder;
        this.stream = null;
        // queue parameters
        this.queue = [[], []];
        this.currentQueueIndex = 0;
        this.processQueueIndex = 1;
        
    }

    listen()
    {
        // check for permissions. throws an error if no permissions
        fs.accessSync(this.folder, fs.constants.R_OK | fs.constants.W_OK);
        // open write stream
        // This opens up the writeable stream to `output`
        this.stream = fs.createWriteStream(
            this.folder + '/output.jsonline', {flags: 'a', autoClose: false}
        );
        // This is here incase any errors occur
        this.stream.on('error', function (err) {
            console.log(err);
        });
        // start async dispatcher
        this.dispatch();
    }

    push(item)
    {
        this.queue[this.currentQueueIndex].push(item);
    }

    dispatch()
    {
        if (this.queue[this.currentQueueIndex].length > 0) {
            // switch queue indexes
            this.currentQueueIndex = Math.abs(this.currentQueueIndex-1);
            this.processQueueIndex = Math.abs(this.currentQueueIndex-1);
            // write processing queue
            this.queue[this.processQueueIndex].forEach(
                (item) => this.stream.write(item + "\n")
            );
            // debug
            console.log(`Lines written: ${this.queue[this.processQueueIndex].length}`);
            // empty queue
            this.queue[this.processQueueIndex] = [];
        }
        setTimeout(() => { this.dispatch(); }, 1000);
    }

}