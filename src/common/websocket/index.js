import io from "socket.io-client";
const BASE_URL = process.env.VUE_APP_SOCKET_URL;
const socket = io(BASE_URL);
socket.on("connect", () => {
  console.log("Connected to the Socket.IO server");
});
export default socket;
