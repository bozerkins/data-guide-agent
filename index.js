// const FileTailer = require('./src/receiver/FileTailer');
// const MySQLPuller = require('./src/receiver/MySQLPuller');

const HttpListener = require('./src/receiver/HttpListener');
const Pipeline = require('./src/Pipeline');

// let pipeline = new Pipeline({
//   name: 'main-pipe'
// });
// pipeline.receiveFrom(new HttpListener({
//   port: 1234
// }));
// pipeline.bufferInto(new FileBuffer({
//    path: __dirname + '/buffer/'
// }))
// pipeline.start();
