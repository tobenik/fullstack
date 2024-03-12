import { LocalHospital } from "@mui/icons-material";
import { HospitalEntry } from "../../../../types";

interface EntryDetailsProps {
  entry: HospitalEntry;
}

export const HospitalEntryBox = ({ entry }: EntryDetailsProps) => {
  const style = {
    border: "solid",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  };
  return (
    <div style={style}>
      <i>{entry.date}</i> <br />
      <LocalHospital /> <br />
      <i>{entry.description}</i> <br />
      discharged on: {entry.discharge.date} <br />
    </div>
  );
};
