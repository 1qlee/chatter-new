import io from "socket.io-client";
const socket = io('http://localhost:8080');

// All functions are client-side

// Emit a chat message event
// Sends the message object
const socketSendMessage = (message) => {
  console.log("Emitting message:", message);
  socket.emit("message", message);
}

// Listen for a chat message event
// It's going to accept a callback that's invoked in chatmessages.js
// The callback will append the message to the DOM
const socketAppendMessage = (cb) => {
  socket.on("message", (message) => {
    console.log(`Appending message from: ${message.messageInfo.username}: "${message.messageInfo.text}"`);
    // Send the message object to the callback function
    return cb(message.messageInfo);
  });
}

// Connect to a specific chatroom
const socketConnectToChatroom = (chatroom) => {
  socket.emit("subscribe", chatroom);
}

export {
  socketSendMessage,
  socketAppendMessage,
  socketConnectToChatroom
};
