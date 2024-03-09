import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewPatient, Patient, PublicPatient } from "../types";

export const getPatients = (): Patient[] => {
  return patients;
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
