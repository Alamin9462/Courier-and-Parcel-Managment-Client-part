import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

export default socket;

// import { io } from "socket.io-client";

// const socket = io("https://book-ecommerce-backend-node.vercel.app", {
//   transports: ["websocket"],
// });

// export default socket;