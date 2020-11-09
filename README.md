# DataGuide Agent

The core idea behind data guide is to provide data collection and delivery. This is not a logging solution, nor is it a DWH / ETL solution. The purpose of this library is to make application data governance possible.

# Roadmap

Data receivers (push)
- HTTP receiver
- TCP receiver

Data receivers (pull)
- Tail file
- S3 directory
- MySQL table

Mediators
- File Buffer
- Metric collector

Data dispatchers (push)
- File directory
- MySQL table
- S3 directory

Data dispatchers (pull)
- Prometheus


# Development

Build a development docker image

```console
docker build -t bozerkins/data-guide-agent .
```

Then run it with docker

```console
docker run --mount src="$(pwd)",target=/app,type=bind bozerkins/data-guide-agent
```