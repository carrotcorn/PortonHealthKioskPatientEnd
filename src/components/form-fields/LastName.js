import React from "react";
import { TextField } from "@material-ui/core";

function LastName({ register, errors }) {
  return (
    <TextField
      inputRef={register({ required: true, minLength: 2 })}
      name="lastName"
      label="Last Name"
      error={!!errors}
      helperText={
        errors &&
        ((errors.type === "required" && "Required") ||
          (errors.type === "minLength" && "At least 2 characters are required"))
      }
    />
  );
}

export default LastName;
