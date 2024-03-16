import React, { useState } from "react";
import { Patient } from "../../../types";
import { Alert, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { HealthCheckForm } from "./HealthCheckForm";
import { HospitalForm } from "./HospitalForm";
import { OccupationalHealthcareForm } from "./OccupationalHealthcareForm";

interface Props {
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setViewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

enum EntryFormType {
  Hospital = "Hospital",
  OccupationalHealthcare = "Occupational Healthcare",
  HealthCheck = "Health Check",
}

const style = {
  header: {
    margin: "10px",
  },
  form: {
    padding: "10px",
    margin: "10px",
    border: "1px solid black",
  },
};

export const EntryForm = ({ setPatient, setViewForm }: Props) => {
  const [entryType, setEntryType] = useState<EntryFormType>(
    EntryFormType.Hospital
  );
  const [error, setError] = useState<string>();

  const isEntryType = (param: string): param is EntryFormType => {
    return Object.values(EntryFormType).includes(param as EntryFormType);
  };

  const changeForm = (e: SelectChangeEvent<string>) => {
    if (!isEntryType(e.target.value)) {
      setError("Invalid entry type.");
      return;
    }
    setEntryType(e.target.value);
  };

  return (
    <div style={style.form}>
      <h3 style={style.header}>New Entry</h3>

      <Select onChange={changeForm} value={entryType}>
        <MenuItem value={EntryFormType.Hospital}>Hospital</MenuItem>
        <MenuItem value={EntryFormType.OccupationalHealthcare}>
          Occupational Healthcare
        </MenuItem>
        <MenuItem value={EntryFormType.HealthCheck}>Health Check</MenuItem>
      </Select>

      {error && <Alert severity="error">{error}</Alert>}

      {entryType === EntryFormType.Hospital && (
        <HospitalForm
          setViewForm={setViewForm}
          setPatient={setPatient}
          setError={setError}
        />
      )}
      {entryType === EntryFormType.OccupationalHealthcare && (
        <OccupationalHealthcareForm
          setViewForm={setViewForm}
          setPatient={setPatient}
          setError={setError}
        />
      )}
      {entryType === EntryFormType.HealthCheck && (
        <HealthCheckForm
          setViewForm={setViewForm}
          setPatient={setPatient}
          setError={setError}
        />
      )}
    </div>
  );
};
