# ARtist: Open Online Piano Platform Using MP3 To MIDI And AR Piano

<img width="1148" alt="image" src="https://raw.githubusercontent.com/AR-tist/ARtist/main/assets/interface.png">

ARtist is a platform where you can share and play sheet music played by different users online.

Upload an MP3 of the music you want to play to the site and it will be converted to Note Play and you can play it!

You can create a room, invite other users, play together at the same time, and play on a virtual piano using your camera through the mobile application (AR Piano)!

## Overview

- Mp3 To MIDI with magenta.js
- Implementing Note Play with Phaser and Tone.js
- Implementing real-time multiplayer and server frameworks with Websocket, Fastapi, and Mongo
- Implementing AR Piano with MediaPipe

<img width="1148" alt="image" src="https://raw.githubusercontent.com/AR-tist/ARtist/main/assets/architecture.png">

## Getting Started

We provide a Docker Compose and DockerFile. thus, If you have Docker daemon, you can use direct our framework.

```jsx
git clone https://github.com/AR-tist/ARtist.git
```

After clone our repository, Just run docker compose

```jsx
docker compose up -d
```

## Our Containers

Our framework consists of four containers, each with a webserver and API, Websocket, and DB server.

- Nginx `nginx:latest` + Node `node:14-alpine`
- FastAPI `tiangolo/uvicorn-gunicorn:python3.11` + `install requirements.txt`
- Mongodb `mongo:latest`
- Mongo-express `mongo-express:latest`
