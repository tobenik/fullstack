import axios from "axios";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getDiaries = async () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then((response) => {
    return response.data;
  });
};

export const addEntry = async (entry: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(baseUrl, entry).then((response) => {
    return response.data;
  });
};
