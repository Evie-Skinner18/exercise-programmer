import express from "express";
import ExercisesController from "./exercises.controller";

const router = express.Router();
const exercisesController = new ExercisesController();

router.route("/search").get(exercisesController.get);
router.route("/random").get(exercisesController.getRandom);
router.route("/programme").get(exercisesController.getProgramme);
router.route("/").post(exercisesController.post);

export default router;