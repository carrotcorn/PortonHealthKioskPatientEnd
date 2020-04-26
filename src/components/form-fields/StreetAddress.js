import React from "react";
import { TextField } from "@material-ui/core";

function StreetAddress({ register, errors }) {
  return (
    <TextField
      inputRef={register({ required: true })}
      name="streetAddress"
      label="Street Address"
      error={!!errors}
      helperText={errors && errors.type === "required" && "Required"}
    />
  );
}

export default StreetAddress;
