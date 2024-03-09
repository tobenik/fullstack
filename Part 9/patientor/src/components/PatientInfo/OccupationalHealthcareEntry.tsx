import { Construction } from "@mui/icons-material";
import { OccupationalHealthcareEntry } from "../../types";

interface EntryDetailProps {
  entry: OccupationalHealthcareEntry;
}

export const OccupationalHealthcareEntryBox = ({ entry }: EntryDetailProps) => {
  const style = {
    border: "solid",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  };
  return (
    <div key={entry.id} style={style}>
      <i>{entry.date}</i> <br />
      <Construction /> <i>{entry.employerName}</i>
      <br />
      <i>{entry.description}</i> <br />
      diagnosed by: {entry.specialist}
    </div>
  );
};
