import express from "express";
import { getPublicPatients, addPatient } from "../services/patientService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("pinged patients /");
  res.send(getPublicPatients());
});

router.post("/", (req, res) => {
  console.log("post to patients /");
  const newPatient = toNewPatient(req.body);
  const addedPatient = addPatient(newPatient);
  res.send(addedPatient);
  console.log("newPatient", newPatient);
  console.log(getPublicPatients());
});

export default router;
