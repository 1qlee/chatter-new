import openSocket from "socket.io-client";
const socket = openSocket('http://localhost:8080');

const sendMessage = (data) => {
  console.log(data);
  socket.emit("message", data);
};

export { sendMessage };
