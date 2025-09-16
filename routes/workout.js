const express = require("express");

const {
  getWorkouts,
  getWorkout,
  addWorkout,
  deleteWorkout,
  editWorkout,
} = require("../controllers/workout");

const workoutRouter = express.Router();
const auth = require("../middlewares/auth");

workoutRouter.get("/getworkouts", auth, getWorkouts);
workoutRouter.get("/getworkout/:id", auth, getWorkout);
workoutRouter.post("/addworkout", auth, addWorkout);
workoutRouter.patch("/editworkout/:id", auth, editWorkout);
workoutRouter.delete("/deleteworkout/:id", auth, deleteWorkout);

module.exports = workoutRouter;
