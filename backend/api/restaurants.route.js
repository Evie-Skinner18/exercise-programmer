import express from "express";
import RestaurantsProvider from "./dtos/restaurantsProvider.js";

const router = express.Router();
const provider = new RestaurantsProvider();

router.route("/").get((req, res) => res.send("Hello world!"));

const restaurants = provider.getRestaurants();
router.route("/all").get((req, res) => res.send(restaurants));

export default router;