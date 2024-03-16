import axios from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (id: string, entry: Entry) => {
  try {
    const { data } = await axios.post<Patient>(
      `${apiBaseUrl}/patients/${id}/entries`,
      entry
    );

    return data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      if (e?.response?.data && typeof e?.response?.data === "string") {
        throw new Error(e.response.data);
      }
      throw new Error("Unrecognized axios error");
    }
    throw new Error("Unknown error");
  }
};

export default {
  getAll,
  getOne,
  create,
  addEntry,
};
