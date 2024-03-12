import { Diagnosis, Entry } from "../../../../types";
import { HealthCheckEntryBox } from "./HealthCheckEntry";
import { HospitalEntryBox } from "./HospitalEntry";
import { OccupationalHealthcareEntryBox } from "./OccupationalHealthcareEntry";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface EntryDetailsProps {
  entry: Entry;
  diagnoses?: Array<Diagnosis>;
}

export const EntryDetails = ({ entry }: EntryDetailsProps) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryBox entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryBox entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryBox entry={entry} />;
    default:
      assertNever(entry);
  }
};
