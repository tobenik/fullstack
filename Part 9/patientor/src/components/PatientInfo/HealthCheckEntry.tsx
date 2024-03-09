import { HealthAndSafety } from "@mui/icons-material";
import { HealthCheckEntry } from "../../types";

interface EntryDetailsProps {
  entry: HealthCheckEntry;
}

export const HealthCheckEntryBox = ({ entry }: EntryDetailsProps) => {
  const style = {
    border: "solid",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  };
  return (
    <div key={entry.id} style={style}>
      <i>{entry.date}</i> <br />
      <HealthAndSafety /> <br />
      <i>{entry.description}</i> <br />
      health rating: {entry.healthCheckRating} <br />
    </div>
  );
};
