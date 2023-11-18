import io from "socket.io-client";
// const BASE_URL = process.env.SOCKER_URL;
// console.log(BASE_URL);
const socket = io("https://my-app-aqw2.onrender.com");
socket.on("connect", () => {
  console.log("Connected to the Socket.IO server");
});
export default socket;
