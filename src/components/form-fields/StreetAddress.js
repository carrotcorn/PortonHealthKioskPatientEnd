import React from "react";
import { TextField } from "@material-ui/core";

function StreetAddress({ register, errors, ...rest }) {
  return (
    <TextField
      {...rest}
      inputRef={register({ required: true })}
      label="Street Address"
      error={!!errors}
      helperText={errors && errors.type === "required" && "Required"}
    />
  );
}

export default StreetAddress;
