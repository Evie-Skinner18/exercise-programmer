import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/restaurants", restaurants);
// app.use("/api/exercises", exercises);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app