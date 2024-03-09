import express from "express";
import {
  getPublicPatients,
  addPatient,
  getPatient,
} from "../services/patientService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPublicPatients());
});

router.get("/:id", (req, res) => {
  const patient = getPatient(req.params.id);
  if (patient) {
    if (!patient.entries) {
      patient.entries = [];
    }
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = addPatient(newPatient);
  res.send(addedPatient);
});

export default router;
