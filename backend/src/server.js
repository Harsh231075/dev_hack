import dotenv from "dotenv";
dotenv.config();
import { getEnv } from "./utils/getEnv.js";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import redis from "./config/redisClient.js";


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_feedback", (data) => {
    redis.publish("feedback_channel", JSON.stringify(data));
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

redis.subscribe("feedback_channel", (err) => {
  if (err) console.error("Redis subscription failed:", err);
});

redis.on("message", (channel, message) => {
  if (channel === "feedback_channel") {
    io.emit("new_feedback", JSON.parse(message));
  }
});

server.listen(getEnv("PORT"), () => console.log(`Server running on port ${getEnv("PORT")}`));
