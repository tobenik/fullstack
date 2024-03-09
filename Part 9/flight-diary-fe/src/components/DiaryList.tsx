import { NonSensitiveDiaryEntry } from "../types";

export const DiaryList = ({
  entries,
}: {
  entries: NonSensitiveDiaryEntry[];
}) => {
  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h2>{entry.date}</h2>
          <p>
            Weather: {entry.weather} <br />
            Visibility: {entry.visibility}
          </p>
        </div>
      ))}
    </div>
  );
};
