const TcpReceiver = require('./src/TcpReceiver');
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
const receiver = new TcpReceiver({port: 2345});
receiver.bufferInto(buffer);
receiver.listen();