// // const WebSocket = require("ws");

// // // Use dynamic port for Render or default to 6000
// // const port = process.env.PORT || 6000;
// // // Create a WebSocket server
// // const server = new WebSocket.Server({ port });

// // console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);

// // let client1 = null; // First client
// // let client2 = null; // Second client

// // server.on("connection", (ws) => {
// //   if (!client1) {
// //     client1 = ws;
// //     console.log("Client 1 connected.");
// //     client1.send("You are Client 1. Waiting for another user to join...");
// //   } else if (!client2) {
// //     client2 = ws;
// //     console.log("Client 2 connected.");
// //     client2.send("You are Client 2. Start chatting!");

// //     // Notify Client 1 that Client 2 has joined
// //     if (client1.readyState === WebSocket.OPEN) {
// //       client1.send("Client 2 has joined. Start chatting!");
// //     }
// //   } else {
// //     // Reject additional connections
// //     ws.send("Server is full. Try again later.");
// //     ws.close();
// //     console.log("Additional connection rejected.");
// //     return;
// //   }

// //   // Handle incoming messages and forward them
// //   ws.on("message", (message) => {
// //     console.log(`Received message: ${message}`);

// //     // Ensure the message is forwarded to the other client
// //     const recipient = ws === client1 ? client2 : client1;

// //     if (recipient && recipient.readyState === WebSocket.OPEN) {
// //       // Send as a string for compatibility
// //       recipient.send(String(message));
// //     } else {
// //       ws.send("Opponent is not connected.");
// //     }
// //   });

// //   // Handle disconnections
// //   ws.on("close", () => {
// //     console.log(`A client disconnected.`);
// //     if (ws === client1) client1 = null;
// //     if (ws === client2) client2 = null;

// //     // Notify the remaining client
// //     const remainingClient = client1 || client2;
// //     if (remainingClient && remainingClient.readyState === WebSocket.OPEN) {
// //       remainingClient.send("Your opponent has disconnected.");
// //     }
// //   });

// //   // Handle errors
// //   ws.on("error", (error) => {
// //     console.error(`WebSocket error: ${error.message}`);
// //   });
// // });

// // MULTIPLE CLIENTS
// const WebSocket = require("ws");

// // Use dynamic port for Render or default to 6000
// const port = process.env.PORT || 6000;
// // Create a WebSocket server
// const server = new WebSocket.Server({ port });

// console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);

// // Array to store connected clients
// const clients = [];

// server.on("connection", (ws) => {
//   // Add new client to the list
//   clients.push(ws);
//   console.log(`A new client connected. Total clients: ${clients.length}`);

//   ws.send(
//     JSON.stringify({
//       type: "system",
//       content: `Welcome! There are currently ${
//         clients.length - 1
//       } other users connected.`,
//     })
//   );

//   // Notify all other clients about the new connection
//   clients.forEach((client) => {
//     if (client !== ws && client.readyState === WebSocket.OPEN) {
//       client.send(
//         JSON.stringify({
//           type: "system",
//           content: "A new user has joined the chat.",
//         })
//       );
//     }
//   });
//   // Handle incoming messages and broadcast to all other clients
//   ws.on("message", (message) => {
//     console.log(`Received message: ${message}`);

//     // Send the message as JSON to all other clients
//     const outgoingMessage = JSON.stringify({
//       type: "user",
//       sender: "UserX", // Add unique sender identifier here
//       content: message,
//     });

//     clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(outgoingMessage);
//       }
//     });
//   });

//   // Handle client disconnection
//   ws.on("close", () => {
//     console.log(`A client disconnected.`);
//     // Remove the client from the list
//     const index = clients.indexOf(ws);
//     if (index !== -1) {
//       clients.splice(index, 1);
//     }
//     console.log(`Total clients: ${clients.length}`);

//     // Notify remaining clients
//     clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(
//           JSON.stringify({
//             type: "system",
//             content: "A user has disconnected.",
//           })
//         );
//       }
//     });
//   });

//   // Handle errors
//   ws.on("error", (error) => {
//     console.error(`WebSocket error: ${error.message}`);
//   });
// });


// Trying to fix object object 
const WebSocket = require("ws");

// Use dynamic port for Render or default to 6000
const port = process.env.PORT || 6000;

// Create a WebSocket server
const server = new WebSocket.Server({ port });

console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);

// Array to store connected clients
const clients = [];

server.on("connection", (ws) => {
  // Add new client to the list
  clients.push(ws);
  console.log(`A new client connected. Total clients: ${clients.length}`);

  // Send a welcome message to the new client
  ws.send(
    JSON.stringify({
      type: "system",
      content: `Welcome! There are currently ${clients.length - 1} other users connected.`,
    })
  );

  // Notify all other clients about the new connection
  clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "system",
          content: "A new user has joined the chat.",
        })
      );
    }
  });

  // Handle incoming messages and broadcast to all other clients
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);

    // Send the message as JSON to all other clients
    const outgoingMessage = JSON.stringify({
      type: "user",
      sender: "UserX", // Add unique sender identifier here
      content: message,
    });

    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(outgoingMessage);
      }
    });
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log(`A client disconnected.`);
    // Remove the client from the list
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
    console.log(`Total clients: ${clients.length}`);

    // Notify remaining clients
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "system",
            content: "A user has disconnected.",
          })
        );
      }
    });
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error(`WebSocket error: ${error.message}`);
  });
});
