import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientServive from "../../services/patients";
import { Patient } from "../../types";
import { GenderIcon } from "./PatientEntries/EntryDetails/GenderIcon";
import { PatientEntries } from "./PatientEntries";
import { Button } from "@mui/material";
import { EntryForm } from "./EntryForm";

export const PatientInfo = () => {
  const [viewForm, setViewForm] = useState<boolean>(false);
  const [patient, setPatient] = useState<Patient | undefined>();
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientServive.getOne(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [id]);

  return (
    <>
      {patient ? (
        <div>
          <h2>
            {patient.name} <GenderIcon gender={patient.gender} />
          </h2>
          <div>
            ssn: {patient.ssn} <br />
            occupation: {patient.occupation}
          </div>
          <div>
            <Button variant="contained" onClick={() => setViewForm(!viewForm)}>
              {viewForm ? "Cancel" : "Add New Entry"}
            </Button>
            {viewForm && (
              <EntryForm setPatient={setPatient} setViewForm={setViewForm} />
            )}
          </div>
          <PatientEntries entries={patient.entries || []} />
        </div>
      ) : null}
    </>
  );
};
