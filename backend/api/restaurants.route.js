import express from "express";
import RestaurantsController from "./restaurants.controller.js";

const router = express.Router();
const restaurantsController = new RestaurantsController();

router.route("/").get((req, res) => res.send("Hello world!"));

const restaurants = await restaurantsController.get();

router.route("/all").get((req, res) => res.send(restaurants));

export default router;