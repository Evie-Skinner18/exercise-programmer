import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import exercises from "./api/exercises.route.js";

dotenv.config();
const app = express();
app.use(express.json());

const corsOptions = {
    origin: process.env.REACT_APP_ORIGIN,
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));

app.use("/api/exercises", exercises);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app