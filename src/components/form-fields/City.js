import React from "react";
import { TextField } from "@material-ui/core";

function City({ register, errors, ...rest }) {
  return (
    <TextField
      {...rest}
      inputRef={register({ required: true })}
      label="City"
      error={!!errors}
      helperText={errors && errors.type === "required" && "Required"}
    />
  );
}

export default City;
