import openSocket from "socket.io-client";
const socket = openSocket('http://localhost:8080');

// All functions are client-side

// Emit a chat message event
const socketSendMessage = (message) => {
  socket.emit("message", message);
};

// Listen for a chat message event
const socketAppendMessage = () => {
  socket.on("new", (message) => {
    console.log(message, "Appending message...");
  });
}

export { socketSendMessage, socketAppendMessage };
