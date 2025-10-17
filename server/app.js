import "dotenv/config";
import express from "express";

import router from "./routers/index.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

app.use(morgan("common"));
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is Listening on: ${PORT}`);
});

// eslint-disable-next-line no-undef
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
});

// eslint-disable-next-line no-undef
process.on("unhandledRejection", (err, promise) => {
  console.log("Unhandled rejection at ", promise, `reason: ${err.message}`);
});

export default app;
