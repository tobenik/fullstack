import express from "express";
import {
  getPublicPatients,
  addPatient,
  getPatient,
  addEntry,
} from "../services/patientService";
import { toEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPublicPatients());
});

router.get("/:id", (req, res) => {
  const patient = getPatient(req.params.id);
  if (patient) {
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

router.post("/:id/entries", (req, res) => {
  const patient = getPatient(req.params.id);
  if (patient) {
    const newEntry = toEntry(req.body);
    if (newEntry) {
      const updatedPatient = addEntry(patient.id, newEntry);
      res.send(updatedPatient);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(404);
  }
});

export default router;
