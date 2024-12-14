const WebSocket = require('ws');
const readline = require('readline');

// ANSI escape codes for colors
const COLORS = {
    green: '\x1b[32m',  // Green color for client's messages
    orange: '\x1b[33m', // Orange (Yellow close to orange)
    red: '\x1b[31m',    // Red color
    reset: '\x1b[0m'    // Reset color
};

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const serverAddress = 'ws://127.0.0.1:6000';
console.log(`Connecting to server at ${serverAddress}...`);

const client = new WebSocket(serverAddress);

client.on('open', () => {
    console.log('Connected to the server.');
    rl.setPrompt(`${COLORS.green}You: ${COLORS.reset}`);
    rl.prompt();

    // Handle user input and send to the server
    rl.on('line', (message) => {
        if (message.toLowerCase() === 'exit') {
            console.log('Exiting chat...');
            client.close();
            rl.close();
        } else {
            client.send(message);
        }
    });
});

client.on('message', (message) => {
    console.log(`\n${COLORS.orange}Opponent: ${COLORS.reset}${message}\n${COLORS.red}Reply: ${COLORS.reset}`);
    rl.prompt();
});

client.on('close', () => {
    console.log('Disconnected from the server.');
    rl.close();
});

client.on('error', (error) => {
    console.error(`WebSocket error: ${error.message}`);
});
