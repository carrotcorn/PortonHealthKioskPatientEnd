import React from "react";
import {
  FirstName,
  LastName,
  Birthday,
  StreetAddress,
  City,
  Province,
  PostalCode,
} from ".";
import { isSameDay } from "date-fns/esm";

// input types
const FIRST_NAME = "FIRST_NAME";
const LAST_NAME = "LAST_NAME";
const BIRTHDAY = "BIRTHDAY";
const STREET_ADDRESS = "STREET_ADDRESS";
const CITY = "CITY";
const PROVINCE = "PROVINCE";
const POSTAL_CODE = "POSTAL_CODE";

export function formInputFactory(inputType, { errors, name, ...rest }) {
  switch (inputType) {
    case FIRST_NAME:
      return <FirstName errors={errors[name]} name={name} {...rest} />;
    case LAST_NAME:
      return <LastName errors={errors[name]} name={name} {...rest} />;
    case BIRTHDAY:
      return <Birthday errors={errors[name]} name={name} {...rest} />;
    case STREET_ADDRESS:
      return <StreetAddress errors={errors[name]} name={name} {...rest} />;
    case CITY:
      return <City errors={errors[name]} name={name} {...rest} />;
    case PROVINCE:
      return <Province errors={errors[name]} name={name} {...rest} />;
    case POSTAL_CODE:
      return <PostalCode errors={errors[name]} name={name} {...rest} />;
    default:
      throw Error("invalid form input type");
  }
}

// returns true if value matches the fieldName in patientInfo (move to backend if time permits)
export function validatePatientInfo(inputType, fieldName, value, patientInfo) {
  switch (inputType) {
    case FIRST_NAME:
    case LAST_NAME:
      return value.toUpperCase() === patientInfo[fieldName].toUpperCase();
    case BIRTHDAY:
      const calendarDate = patientInfo[fieldName].split("T")[0];
      const year = calendarDate.split("-")[0];
      const month = Number(calendarDate.split("-")[1]) - 1;
      const day = calendarDate.split("-")[2];
      return isSameDay(value, new Date(year, month, day));
    case STREET_ADDRESS:
    case CITY:
    case PROVINCE:
    case POSTAL_CODE:
      return (
        patientInfo.address[fieldName].toUpperCase() ===
        value.trim().toUpperCase()
      );
    default:
      throw Error(`invalid input type: ${inputType}`);
  }
}
