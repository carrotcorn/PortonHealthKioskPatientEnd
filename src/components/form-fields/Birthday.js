import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { Controller } from "react-hook-form";

function Birthday({ control, errors }) {
  return (
    <Controller
      as={
        <DatePicker
          disableFuture
          openTo="year"
          format="dd/MM/yyyy"
          label="Date of birth"
          views={["year", "month", "date"]}
        />
      }
      control={control}
      name="birthday"
      rules={{ required: true }}
      error={!!errors}
      helperText={errors && errors.type === "required" && "Required"}
    />
  );
}

export default Birthday;
