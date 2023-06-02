import { configHandler } from "./config";
import { initialRoute } from "./routes";
import express from "express";

const app = express();

// main configs
configHandler(app);


// routes initial
initialRoute(app);


// server running
app.listen(process.env.SERVER_PORT, () => {
  console.log(`🚀 Server running at: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});
