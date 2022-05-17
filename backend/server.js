import express from "express";

import cors from "cors";
import expressMongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";
import hpp from "hpp";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";

import dotenv from "dotenv";
import exercises from "./api/exercises.route.js";

dotenv.config();

const app = express();
app.use(express.json());

// security precautions
app.use(expressMongoSanitize());
app.use(xssClean());
app.use(hpp());
app.use(helmet());

const corsOptions = {
    origin: process.env.REACT_APP_ORIGIN,
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));

const timeLimit = 10 * 60 * 1000;
const maxNumberOfRequestsAllowed = 100;

const rateLimiter = rateLimit({
  windowMs: timeLimit,
  max: maxNumberOfRequestsAllowed
});

app.use(rateLimiter);

// defining router
app.use("/api/exercises", exercises);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app