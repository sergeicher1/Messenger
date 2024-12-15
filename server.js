// // const WebSocket = require('ws');

// // // Use dynamic port for Render or default to 6000
// // const port = process.env.PORT || 6000;

// // // Create a WebSocket server
// // const server = new WebSocket.Server({ port });

// // console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);

// // let client1 = null; // First client
// // let client2 = null; // Second client

// // server.on('connection', (ws) => {
// //     if (!client1) {
// //         client1 = ws;
// //         console.log('Client 1 connected.');
// //         client1.send('You are Client 1. Waiting for another user to join...');
// //     } else if (!client2) {
// //         client2 = ws;
// //         console.log('Client 2 connected.');
// //         client2.send('You are Client 2. Start chatting!');

// //         // Notify Client 1 that Client 2 has joined
// //         if (client1.readyState === WebSocket.OPEN) {
// //             client1.send('Client 2 has joined. Start chatting!');
// //         }
// //     } else {
// //         // Reject additional connections
// //         ws.send('Server is full. Try again later.');
// //         ws.close();
// //         console.log('Additional connection rejected.');
// //         return;
// //     }

// //     // Handle incoming messages and forward them
// //     ws.on('message', (message) => {
// //         console.log(`Received message: ${message}`);
// //         const recipient = ws === client1 ? client2 : client1;

// //         if (recipient && recipient.readyState === WebSocket.OPEN) {
// //             recipient.send(message);
// //         } else {
// //             ws.send('Opponent is not connected.');
// //         }
// //     });

// //     // Handle disconnections
// //     ws.on('close', () => {
// //         console.log(`A client disconnected.`);
// //         if (ws === client1) client1 = null;
// //         if (ws === client2) client2 = null;

// //         // Notify the remaining client
// //         const remainingClient = client1 || client2;
// //         if (remainingClient && remainingClient.readyState === WebSocket.OPEN) {
// //             remainingClient.send('Your opponent has disconnected.');
// //         }
// //     });

// //     ws.on('error', (error) => {
// //         console.error(`WebSocket error: ${error.message}`);
// //     });
// // });

// const WebSocket = require('ws');

// // Use dynamic port for Render or default to 6000
// const port = process.env.PORT || 6000;

// // Create a WebSocket server
// const server = new WebSocket.Server({ port });

// console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);

// let client1 = null; // First client
// let client2 = null; // Second client

// server.on('connection', (ws) => {
//     if (!client1) {
//         client1 = ws;
//         console.log('Client 1 connected.');
//         client1.send('You are Client 1. Waiting for another user to join...');
//     } else if (!client2) {
//         client2 = ws;
//         console.log('Client 2 connected.');
//         client2.send('You are Client 2. Start chatting!');

//         // Notify Client 1 that Client 2 has joined
//         if (client1.readyState === WebSocket.OPEN) {
//             client1.send('Client 2 has joined. Start chatting!');
//         }
//     } else {
//         // Reject additional connections
//         ws.send('Server is full. Try again later.');
//         ws.close();
//         console.log('Additional connection rejected.');
//         return;
//     }

//     // Handle incoming messages and forward them
//     ws.on('message', (message) => {
//         console.log(`Received message: ${message}`);

//         // Ensure the message is forwarded to the other client
//         const recipient = ws === client1 ? client2 : client1;

//         if (recipient && recipient.readyState === WebSocket.OPEN) {
//             // Send as a string for compatibility
//             recipient.send(String(message));
//         } else {
//             ws.send('Opponent is not connected.');
//         }
//     });

//     // Handle disconnections
//     ws.on('close', () => {
//         console.log(`A client disconnected.`);
//         if (ws === client1) client1 = null;
//         if (ws === client2) client2 = null;

//         // Notify the remaining client
//         const remainingClient = client1 || client2;
//         if (remainingClient && remainingClient.readyState === WebSocket.OPEN) {
//             remainingClient.send('Your opponent has disconnected.');
//         }
//     });

//     // Handle errors
//     ws.on('error', (error) => {
//         console.error(`WebSocket error: ${error.message}`);
//     });
// });

// TO HANDLE SYSTEM MESSAGES

const WebSocket = require('ws');

// Use dynamic port for Render or default to 6000
const port = process.env.PORT || 6000;

// Create a WebSocket server
const server = new WebSocket.Server({ port });

console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);

let client1 = null; // First client
let client2 = null; // Second client

server.on('connection', (ws) => {
    if (!client1) {
        client1 = ws;
        console.log('Client 1 connected.');
        client1.send(JSON.stringify({
            type: 'system',
            content: 'You are Client 1. Waiting for another user to join...',
        }));
    } else if (!client2) {
        client2 = ws;
        console.log('Client 2 connected.');
        client2.send(JSON.stringify({
            type: 'system',
            content: 'You are Client 2. Start chatting!',
        }));

        // Notify Client 1 that Client 2 has joined
        if (client1.readyState === WebSocket.OPEN) {
            client1.send(JSON.stringify({
                type: 'system',
                content: 'Client 2 has joined. Start chatting!',
            }));
        }
    } else {
        // Reject additional connections
        ws.send(JSON.stringify({
            type: 'system',
            content: 'Server is full. Try again later.',
        }));
        ws.close();
        console.log('Additional connection rejected.');
        return;
    }

    // Handle incoming messages and forward them
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Ensure the message is forwarded to the other client
        const recipient = ws === client1 ? client2 : client1;

        if (recipient && recipient.readyState === WebSocket.OPEN) {
            recipient.send(JSON.stringify({
                type: 'chat',
                content: message,
            }));
        } else {
            ws.send(JSON.stringify({
                type: 'system',
                content: 'Opponent is not connected.',
            }));
        }
    });

    // Handle disconnections
    ws.on('close', () => {
        console.log(`A client disconnected.`);
        if (ws === client1) client1 = null;
        if (ws === client2) client2 = null;

        // Notify the remaining client
        const remainingClient = client1 || client2;
        if (remainingClient && remainingClient.readyState === WebSocket.OPEN) {
            remainingClient.send(JSON.stringify({
                type: 'system',
                content: 'Your opponent has disconnected.',
            }));
        }
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error.message}`);
    });
});
