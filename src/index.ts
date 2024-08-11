//Using the inbuild http package
/*
import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function (request, response) {
  console.log("request received");
  response.end("Hello, World!");
});

const wss = new WebSocketServer({ server });

let userCount = 0;
wss.on("connection", function connection(ws: WebSocket) {
  ws.on("error", function (error: Error) {
    console.log(error);
  });

  ws.on("message", function incoming(data: WebSocket.Data, isBinary: boolean) {
    wss.clients.forEach(function each(client) {
      //client !== ws use this to not send the same data from the server to the client who sent it
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  console.log(`${++userCount} users have connected`);
  ws.send("something");
});

server.listen(8080, function () {
  console.log("listening on *:8080");
});
*/

//Using express
import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const httpServer = app.listen(8080, () => {
  console.log("listening on *:8080");
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const wss = new WebSocketServer({ server: httpServer });

let userCount = 0;
wss.on("connection", function connection(ws: WebSocket) {
  ws.on("error", function (error: Error) {
    console.log(error);
  });
  ws.on("message", function incoming(data: WebSocket.Data, isBinary: boolean) {
    wss.clients.forEach(function each(client: WebSocket) {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  console.log(`${++userCount} users have connected`);
  ws.send("Message from the server.");
});
