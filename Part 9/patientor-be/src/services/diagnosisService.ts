import data from "../../data/diagnoses";
import { Diagnosis } from "../types";

export const getDiagnoses = (): Array<Diagnosis> => {
  return data;
};
