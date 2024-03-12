import React, { useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../../services/patients";
import { Patient } from "../../../types";
import { Alert } from "@mui/material";

interface Props {
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setViewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EntryForm = ({ setPatient, setViewForm }: Props) => {
  const params = useParams<{ id: string }>();
  const [error, setError] = useState<string>();
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
    <div>
      <h3>New Healthcheck Entry</h3>
      <form onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}
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
    </div>
  );
};
