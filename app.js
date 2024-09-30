const express = require("express");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(port, () => {
  console.log(`Server running. Start Browsing on http://localhost:${port}/`);
});

const wss = new WebSocket.Server({ server });

let ideas = [];

function broadcastIdeas() {
  const ideasData = JSON.stringify(ideas);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(ideasData);
    }
  });
}

wss.on("connection", (ws) => {
  //  console.log('New client connected');
  ws.send(JSON.stringify(ideas));

  ws.on("message", (message) => {
    const { initials } = JSON.parse(message);
    if (initials) {
      ideas.push(initials);
      broadcastIdeas(); //update all the clients in the new idea
    }
  });

  //   ws.on('close', () => {
  //       console.log('Client disconnected');
  //   });
});
