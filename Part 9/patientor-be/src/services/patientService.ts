import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import { Entry, NewPatient, Patient, PublicPatient } from "../types";

export const getPatients = (): Patient[] => {
  return patients;
};

export const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

export const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, occupation, gender }) => ({
    id,
    name,
    dateOfBirth,
    occupation,
    gender,
  }));
};

export const addPatient = (newPatient: NewPatient): PublicPatient => {
  const p = {
    ...newPatient,
    id: String(uuid()),
  };
  patients.push(p);
  return {
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
  };
};

export const addEntry = (patientId: string, entry: Entry): Patient => {
  const newEntry = {
    ...entry,
    id: String(uuid()),
  };
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error(`Patient with id ${patientId} not found`);
  }
  patient.entries.push(newEntry);
  return patient;
};
