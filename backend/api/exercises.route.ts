import express from "express";
import ExercisesController from "./exercises.controller";

const router = express.Router();
const exercisesController = new ExercisesController();

// .bind() ensures that the exercisesService newed up in the controller will be accessible from the controller methods
router.route("/search").get(exercisesController.get.bind(exercisesController));
router.route("/random").get(exercisesController.getRandom.bind(exercisesController));
router.route("/programme").get(exercisesController.getProgramme.bind(exercisesController));
router.route("/").post(exercisesController.post.bind(exercisesController));

export default router;