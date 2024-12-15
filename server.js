const WebSocket = require("ws");
// LOCAL TESTING: 
// const port = 6001;
// const serverUrl = "ws://127.0.0.1:6001";

// Create WebSocket server
// const server = new WebSocket.Server({ host: "127.0.0.1", port });

// console.log(`WebSocket server is running on ${serverUrl}`);

// PROD : 
// Use dynamic port for Render or default to 6000
const port = process.env.PORT || 6000;
// Create a WebSocket server
const server = new WebSocket.Server({ port });

console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);


let clients = []; // Array to store connected clients

server.on("connection", (ws) => {
  let userName = ""; // Initialize userName as an empty string

  // Handle nickname submission or message reception
  ws.on("message", (message) => {
    message = String(message); // Ensure message is treated as a string

    if (!userName) {
      // First message is considered as nickname
      userName = message;
      clients.push({ ws, userName });

      // Send confirmation to the user
      ws.send(JSON.stringify({ message: `You are now known as ${userName}.`, type: "system" }));

      // Notify all clients that the user has joined (system message)
      broadcast(`[SYSTEM] ${userName} has joined the chat.`, "system", ws);
    } else {
      // Forward chat message to all clients (user message)
      broadcast(`${userName}: ${message}`, "user", ws);
    }
  });

  // Handle disconnections
  ws.on("close", () => {
    console.log(`${userName} disconnected.`);
    clients = clients.filter((client) => client.ws !== ws);
    broadcast(`[SYSTEM] ${userName} has disconnected.`, "system", ws);
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error(`WebSocket error: ${error.message}`);
  });

  // Broadcast a message to all clients except the sender
  function broadcast(message, type = "user", senderWs) {
    const payload = JSON.stringify({ message, type }); // Wrap message in an object and convert to JSON
    clients.forEach((client) => {
      if (client.ws !== senderWs && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(payload); // Send the valid JSON message
      }
    });
  }
});
