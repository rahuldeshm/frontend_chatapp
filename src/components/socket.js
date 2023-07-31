import { io } from "socket.io-client";
const token = JSON.parse(localStorage.getItem("token")).token;
const socket = io.connect("http://localhost:3001", {
  auth: token,
});

export default socket;
