import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import { getDiaries } from "./services/diaryService";
import { DiaryForm } from "./components/DiaryForm";
import { DiaryList } from "./components/DiaryList";

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getDiaries().then((data) => setEntries(data));
  }, []);

  const updateEntries = (newEntry: NonSensitiveDiaryEntry) => {
    setEntries([...entries, newEntry]);
  };

  return (
    <>
      <h1>Add a new entry</h1>
      <DiaryForm updateEntries={updateEntries} />
      <h1>Entries</h1>
      <DiaryList entries={entries} />
    </>
  );
}

export default App;
