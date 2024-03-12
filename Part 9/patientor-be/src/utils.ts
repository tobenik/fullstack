import {
  Entry,
  EntryType,
  Gender,
  HealthCheckRating,
  NewPatient,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing data");
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data: a field is missing");
};

/////// Entry ///////

const isEntryType = (type: string): type is EntryType => {
  return Object.values(EntryType)
    .map((e) => e.toString())
    .includes(type);
};

const toEntryType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error("Incorrect or missing data");
  }
  return type;
};

const isNumber = (value: unknown): value is number => {
  return typeof value === "number" || value instanceof Number;
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing data");
  }
  return rating;
};

const isDiagnosisCodes = (codes: unknown[]): codes is string[] => {
  return codes.every((c) => isString(c));
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!Array.isArray(codes) || !isDiagnosisCodes(codes)) {
    throw new Error("Incorrect or missing data");
  }
  return codes;
};

const toHealthCheckEntry = (object: unknown): Entry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "healthCheckRating" in object
  ) {
    const baseEntry: Entry = {
      id: "123",
      type: EntryType.HealthCheck,
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
    if ("diagnosisCodes" in object) {
      const HealthCheckEntry = {
        ...baseEntry,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      };
      return HealthCheckEntry;
    }
    return baseEntry;
  }
  throw new Error("Incorrect data: a field is missing");
};

const toHospitalEntry = (object: unknown): Entry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "discharge" in object
  ) {
    if (!object.discharge || typeof object.discharge !== "object") {
      throw new Error("Incorrect or missing data");
    }
    if (!("date" in object.discharge) || !("criteria" in object.discharge)) {
      throw new Error("Incorrect or missing data");
    }
    const baseEntry: Entry = {
      id: "123",
      type: EntryType.Hospital,
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      discharge: {
        date: parseDate(object.discharge.date),
        criteria: parseString(object.discharge.criteria),
      },
    };
    if ("diagnosisCodes" in object) {
      const HospitalEntry = {
        ...baseEntry,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      };
      return HospitalEntry;
    }
    return baseEntry;
  }
  throw new Error("Incorrect data: a field is missing");
};

const toOccupationalHealthcareEntry = (object: unknown): Entry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "employerName" in object
  ) {
    const baseEntry: Entry = {
      id: "123",
      type: EntryType.OccupationalHealthcare,
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      employerName: parseString(object.employerName),
    };
    if ("diagnosisCodes" in object) {
      const OccupationalHealthcareEntry = {
        ...baseEntry,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      };
      if ("sickLeave" in object) {
        if (!object.sickLeave || typeof object.sickLeave !== "object") {
          throw new Error("Incorrect or missing data");
        }
        if (
          !("startDate" in object.sickLeave) ||
          !("endDate" in object.sickLeave)
        ) {
          throw new Error("Incorrect or missing data");
        }
        return {
          ...OccupationalHealthcareEntry,
          sickLeave: {
            startDate: parseDate(object.sickLeave.startDate),
            endDate: parseDate(object.sickLeave.endDate),
          },
        };
      }
      return OccupationalHealthcareEntry;
    }
    if ("sickLeave" in object) {
      if (!object.sickLeave || typeof object.sickLeave !== "object") {
        throw new Error("Incorrect or missing data");
      }
      if (
        !("startDate" in object.sickLeave) ||
        !("endDate" in object.sickLeave)
      ) {
        throw new Error("Incorrect or missing data");
      }
      return {
        ...baseEntry,
        sickLeave: {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate),
        },
      };
    }
    return baseEntry;
  }
  throw new Error("Incorrect data: a field is missing");
};

export const toEntry = (object: unknown): Entry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("type" in object) {
    switch (toEntryType(object.type)) {
      case EntryType.HealthCheck:
        return toHealthCheckEntry(object);
      case EntryType.Hospital:
        return toHospitalEntry(object);
      case EntryType.OccupationalHealthcare:
        return toOccupationalHealthcareEntry(object);
      default:
        throw new Error("Incorrect or missing entry type");
    }
  }
  throw new Error("Incorrect data: a field is missing");
};
