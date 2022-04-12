import express from "express";
import RestaurantsController from "./restaurants.controller.js";
import ReviewsController from "./reviews.controller.js";

const router = express.Router();
const restaurantsController = new RestaurantsController();
const reviewsController = new ReviewsController();

router.route("/search").get(restaurantsController.get);

router
  .route("/review")
  .post(reviewsController.post)
  .put(reviewsController.put)
  .delete(reviewsController.delete);

export default router;