const express = require("express");

const {getWorkouts, getWorkout,addWorkout, deleteWorkout, editWorkout, addWorkout} = require("../controllers/workout");


const workoutRouter = express.Router();

workoutRouter.get("/", getWorkouts);
workoutRouter.get("/", getWorkout);
workoutRouter.post("/", addWorkout);
workoutRouter.delete("/:id", editWorkout);
workoutRouter.patch("/:id", deleteWorkout);
