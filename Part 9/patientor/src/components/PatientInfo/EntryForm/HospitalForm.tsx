import { useState } from "react";
import patientService from "../../../services/patients";
import { Patient } from "../../../types";
import { useParams } from "react-router-dom";

interface Props {
  setViewForm: React.Dispatch<React.SetStateAction<boolean>>;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface Discharge {
  date: string;
  criteria: string;
}

export const HospitalForm = ({ setViewForm, setPatient, setError }: Props) => {
  const params = useParams<{ id: string }>();
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (params.id) {
      try {
        const updatedPatient = await patientService.addEntry(params.id, {
          type: "Hospital",
          id: "",
          date,
          description,
          specialist,
          diagnosisCodes: diagnosisCodes.split(", "),
          discharge,
        });
        setPatient(updatedPatient);
        setDate("");
        setDescription("");
        setSpecialist("");
        setDiagnosisCodes("");
        setDischarge({ date: "", criteria: "" });
        setViewForm(false);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="specialist">Specialist</label>
        <input
          id="specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="diagnosisCodes">Diagnosis Codes</label>
        <input
          id="diagnosisCodes"
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dischargeDate">Discharge date</label>
        <input
          id="dischargeDate"
          value={discharge?.date}
          onChange={(e) => setDischarge({ ...discharge, date: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="dischargeCriteria">Discharge criteria</label>
        <input
          id="dischargeCriteria"
          value={discharge?.criteria}
          onChange={(e) =>
            setDischarge({ ...discharge, criteria: e.target.value })
          }
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
