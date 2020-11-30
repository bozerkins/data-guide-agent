const basedir = __dirname + '/../..';
const MysqlReceiver = require(basedir + '/src/MysqlReceiver');
const FileBuffer = require(basedir + '/src/FileBuffer');
const FileDispatcher = require(basedir + '/src/FileDispatcher');

// // 1. create dispatcher
// const dispatcher = new FileDispatcher(basedir + '/destination');
// dispatcher.listen();

// // 2. create buffer
// const buffer = new FileBuffer(basedir + '/buffer');
// buffer.dispatchInto(dispatcher.dispatch);
// buffer.listen();

// 3.create receiver
const receiver = new MysqlReceiver(
    {host: 'localhost', user: 'root', password: 'root', database: 'main_db', port: 3306},
    'from_table', 'id'
);
// receiver.bufferInto(buffer);
receiver.listen();