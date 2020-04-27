import React from "react";
import { TextField } from "@material-ui/core";

function PostalCode({ register, errors, ...rest }) {
  return (
    <TextField
      {...rest}
      inputRef={register({
        required: true,
        pattern: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] *?[0-9][A-Z][0-9] *?$/i,
      })}
      label="Postal Code"
      error={!!errors}
      helperText={
        errors &&
        ((errors.type === "required" && "Required") ||
          (errors.type === "pattern" && "Invalid Format"))
      }
    />
  );
}

export default PostalCode;
