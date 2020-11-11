const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

module.exports = class FileDispatcher{
    
    constructor(folder)
    {
        // destination for files
        this.folder = folder;

        // dispatcher queue
        this.queue = [];

        // prepare methods
        this.dispatch = (this.dispatch).bind(this);
        this.rename = util.promisify(fs.rename);

        // check for permissions. throws an error if no permissions
        fs.accessSync(this.folder, fs.constants.R_OK | fs.constants.W_OK);
    }
    
    dispatch(file)
    {
        this.queue.push(file);
    }

    listen()
    {
        // start async writer
        this.writer();
    }

    writer()
    {
        if (this.queue.length > 0) {
            this.rename(this.queue.shift(), this.folder + "/" + uuidv4())
                .finally(() => {
                    this.writer();   
                });
        } else {
            setTimeout(() => { this.writer(); }, 100);    
        }
    }
}