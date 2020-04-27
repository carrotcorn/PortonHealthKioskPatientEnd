import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { Controller } from "react-hook-form";

function Province({ control, errors, register, ...rest }) {
  return (
    <Controller
      {...rest}
      as={
        <TextField select label="Province">
          {provinces.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      }
      defaultValue=""
      control={control}
      rules={{ required: true }}
      error={!!errors}
      helperText={errors && errors.type === "required" && "Required"}
    />
  );
}

const provinces = [
  {
    // Alberta
    value: "AB",
    label: "AB",
  },
  {
    // British Columbia
    value: "BC",
    label: "BC",
  },
  {
    // Manitoba
    value: "MB",
    label: "MB",
  },
  {
    // New Brunswick
    value: "NB",
    label: "NB",
  },
  {
    // Newfoundland
    value: "NL",
    label: "NL",
  },
  {
    // Nova Scotia
    value: "NS",
    label: "NS",
  },
  {
    // Northwest Territories
    value: "NT",
    label: "NT",
  },
  {
    // Nunavut
    value: "NU",
    label: "NU",
  },
  {
    // Ontario
    value: "ON",
    label: "ON",
  },
  {
    // Prince Edward Island
    value: "PE",
    label: "PE",
  },
  {
    // Quebec
    value: "QC",
    label: "QC",
  },
  {
    // Saskatchewan
    value: "SK",
    label: "SK",
  },
  {
    // Yukon
    value: "YT",
    label: "YT",
  },
];

export default Province;
