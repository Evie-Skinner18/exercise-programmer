import express, { Application } from "express";
import cors from "cors";
import expressMongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";
import hpp from "hpp";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import actuator from "express-actuator";
import dotenv from "dotenv";
import path from "path";
import exercises from "./api/exercises.route";

const app: Application = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

app.use(express.json());

// security precautions
app.use(expressMongoSanitize());
app.use(xssClean());
app.use(hpp());
app.use(helmet());

// health check for a load balancer
app.use(actuator());

const corsOptions = {
    origin: process.env.REACT_APP_ORIGIN,
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));

const timeLimit = 10 * 60 * 1000;
const maxNumberOfRequestsAllowed = 500;

const rateLimiter = rateLimit({
  windowMs: timeLimit,
  max: maxNumberOfRequestsAllowed
});

app.use(rateLimiter);

// defining router
app.use("/api/exercises", exercises);

// using static React assets for production only 
if (process.env.NODE_ENV === "production") {
  console.log("Running exercise-programmer in prd!");
  // by the time the TS compiles we will be in the /dist folder
  app.use(express.static(path.join(__dirname,"../../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
  });
} else {
    // for any route other than /api/exercises, return Not Found. This is useful
  // if API and frontend are deployed separately instead of using Express
  // to serve up prd React assets
  app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
}

export default app