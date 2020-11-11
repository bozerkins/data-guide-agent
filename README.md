# DataGuide Agent

The core idea behind data guide is to provide data collection and delivery. This is not a logging solution, nor is it a DWH / ETL solution. The purpose of this library is to make application data governance possible.

# Roadmap

Data receivers (push)
- HTTP receiver | done
- TCP receiver

Data receivers (pull)
- Tail file
- MySQL table

Mediators
- File Buffer | done
- Metric collector

Data dispatchers (push)
- File dispatcher | done
- MySQL table
- S3 directory

Data dispatchers (pull)
- Prometheus

# Usage example

```javascript
const HttpReceiver = require('./src/HttpReceiver');
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
const receiver = new HttpReceiver({port: 1234});
receiver.bufferInto(buffer);
receiver.listen();
```

# Development

Build a development docker image

```console
docker build -t bozerkins/data-guide-agent .
```

Then run it with docker

```console
docker run --mount src="$(pwd)",target=/app,type=bind bozerkins/data-guide-agent
```