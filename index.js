const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workout");

app.use("/users", userRoutes);
app.use("/users", workoutRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
