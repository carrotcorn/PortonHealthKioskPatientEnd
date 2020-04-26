import React from "react";
import { TextField } from "@material-ui/core";

function City({ register, errors }) {
  return (
    <TextField
      inputRef={register({ required: true })}
      name="city"
      label="City"
      error={!!errors}
      helperText={errors && errors.type === "required" && "Required"}
    />
  );
}

export default City;
