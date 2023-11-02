import io from "socket.io-client";
const socket = io(process.env.SOCKER_URL);
socket.on('connect', () => {
  console.log('Connected to the Socket.IO server');
});
export default socket;
