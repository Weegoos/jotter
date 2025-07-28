import { wss } from "../../server.js";

export function wssSend(event, data) {
    if (wss && wss.clients) {
        wss.clients.forEach((client) => {
        if (client.readyState === 1) { 
            client.send(JSON.stringify({ event, data }));
        }
        });
    } else {
        console.error('WebSocket server is not initialized or has no clients.');
    }
}