import WebSocket from 'ws';
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
	console.log('A new client connected.');

	ws.on('message', function incoming(message) {
		console.log('received: %s', message);

		// Broadcast incoming message to all clients except the sender
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	});

	ws.on('close', () => {
		console.log('Client disconnected.');
	});
});

console.log('Signaling server running on ws://localhost:8080');
