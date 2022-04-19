import express from "express";
import ExercisesController from "./exercises.controller.js";

const router = express.Router();

router.route("/search").get(ExercisesController.get);
router.route("/random").get(ExercisesController.getRandom);
router.route("/programme").get(ExercisesController.getProgramme);
router.route("/").post(ExercisesController.post);

export default router;