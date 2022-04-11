import express from "express";
import RestaurantsController from "./restaurants.controller.js";

const router = express.Router();
const restaurantsController = new RestaurantsController();

router.route("/").get((req, res) => res.send("Hello world!"));

router.route("/all").get(restaurantsController.get);

export default router;