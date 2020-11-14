const TailReceiver = require('./src/TailReceiver');
const FileBuffer = require('./src/FileBuffer');
const FileDispatcher = require('./src/FileDispatcher');

// 1. create dispatcher
const dispatcher = new FileDispatcher(__dirname + '/destination');
dispatcher.listen();

// 2. create buffer
const buffer = new FileBuffer(__dirname + '/buffer');
buffer.dispatchInto(dispatcher.dispatch);
buffer.listen();

// 3.create receiver
const receiver = new TailReceiver({filename: __dirname + '/samples/tail-file'});
receiver.bufferInto(buffer);
receiver.listen();