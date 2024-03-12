import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../../../types";
import diagnosesServive from "../../../services/diagnoses";
import { EntryDetails } from "./EntryDetails";

interface Props {
  entries: Entry[];
}

export const PatientEntries = ({ entries }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis> | []>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesServive.getDiagnoses();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  return (
    <div>
      <h3>entries</h3>
      <div>
        {entries.map((entry) => (
          <EntryDetails entry={entry} diagnoses={diagnoses} key={entry.id} />
        ))}
      </div>
    </div>
  );
};
