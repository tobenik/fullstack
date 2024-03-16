import { useState } from "react";
import patientService from "../../../services/patients";
import { Patient } from "../../../types";
import { useParams } from "react-router-dom";

interface Props {
  setViewForm: React.Dispatch<React.SetStateAction<boolean>>;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const HealthCheckForm = ({
  setViewForm,
  setPatient,
  setError,
}: Props) => {
  const params = useParams<{ id: string }>();
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (params.id) {
      try {
        const updatedPatient = await patientService.addEntry(params.id, {
          type: "HealthCheck",
          id: "",
          date,
          description,
          specialist,
          diagnosisCodes: diagnosisCodes.split(", "),
          healthCheckRating: parseInt(healthCheckRating),
        });
        setPatient(updatedPatient);
        setDate("");
        setDescription("");
        setSpecialist("");
        setDiagnosisCodes("");
        setHealthCheckRating("");
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
        <label htmlFor="healthCheckRating">Health Check Rating</label>
        <input
          id="healthCheckRating"
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
