import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = bmiCalculator(height, weight);
  res.json({
    weight,
    height,
    bmi,
  });
});
app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  }
  if (!Array.isArray(daily_exercises) || isNaN(target)) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  const result = calculateExercises(daily_exercises, target);
  res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
