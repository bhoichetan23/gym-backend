const Workout = require("../models/workout");

// Get all data
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({
      createdAt: -1,
    });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single data
const getWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    const workouts = await Workout.findById(id);

    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add data
const addWorkout = async (req, res) => {
  const { exercise, sets, reps, weight } = req.body;
  if (!exercise || !sets || !reps || !weight) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  const workout = await Workout.create({
    user: req.user._id,
    exercise,
    sets,
    reps,
    weight,
  });

  res.status(201).json(workout);
};

// Update data
const editWorkout = async (req, res) => {
  try {
    const allowedEditFields = ["exercise", "sets", "reps", "weight"];
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((field) =>
      allowedEditFields.includes(field)
    );
    if (!isValidOperation) {
      return res.status(400).json({ message: "Invalid fields in update" });
    }

    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!workout) {
      return res
        .status(404)
        .json({ message: "Workout not found or not authorized" });
    }

    updates.forEach((key) => {
      workout[key] = req.body[key];
    });

    const updatedWorkout = await workout.save();

    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete data
const deleteWorkout = async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) return res.status(404).json({ message: "Workout not found" });

  if (workout.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await workout.deleteOne();
  res.json({ message: "Workout deleted" });
};

module.exports = {
  getWorkouts,
  getWorkout,
  addWorkout,
  deleteWorkout,
  editWorkout,
};
