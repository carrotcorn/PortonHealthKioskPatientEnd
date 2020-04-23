import React from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@material-ui/pickers";
import SelectProvince from "./SelectProvince";

// Warning in strict mode https://github.com/mui-org/material-ui/issues/13394

function CheckInForm() {
  const styles = useStyles();
  const { register, handleSubmit, errors, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formRow}>
        <TextField
          inputRef={register({ required: true, minLength: 2 })}
          name="firstName"
          label="First Name"
          error={!!errors.firstName}
          helperText={
            errors.firstName &&
            ((errors.firstName.type === "required" && "Required") ||
              (errors.firstName.type === "minLength" &&
                "At least 2 characters are required"))
          }
        />
        <TextField
          inputRef={register({ required: true, minLength: 2 })}
          name="lastName"
          label="Last Name"
          error={!!errors.lastName}
          helperText={
            errors.lastName &&
            ((errors.lastName.type === "required" && "Required") ||
              (errors.lastName.type === "minLength" &&
                "At least 2 characters are required"))
          }
        />
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
          error={!!errors.birthday}
          helperText={
            errors.birthday && errors.birthday.type === "required" && "Required"
          }
        />
      </div>
      <div className={styles.formRow}>
        <TextField
          inputRef={register({ required: true })}
          name="streetAddress"
          label="Street Address"
          error={!!errors.streetAddress}
          helperText={
            errors.streetAddress &&
            errors.streetAddress.type === "required" &&
            "Required"
          }
        />
      </div>
      <div className={styles.formRow}>
        <TextField
          inputRef={register({ required: true })}
          name="city"
          label="City"
          error={!!errors.city}
          helperText={
            errors.city && errors.city.type === "required" && "Required"
          }
        />
        <Controller
          as={SelectProvince}
          name="province"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          error={!!errors.province}
          helperText={
            errors.province && errors.province.type === "required" && "Required"
          }
        />
        <TextField
          inputRef={register({
            required: true,
            pattern: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] *?[0-9][A-Z][0-9] *?$/i,
          })}
          name="postalCode"
          label="Postal Code"
          error={!!errors.postalCode}
          helperText={
            errors.postalCode &&
            ((errors.postalCode.type === "required" && "Required") ||
              (errors.postalCode.type === "pattern" && "Invalid Format"))
          }
        />
      </div>
      <div>
        <Button
          className={styles.submitBtn}
          type="submit"
          variant="contained"
          color="primary"
          // component={Link}
          // to="/confirmation"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  form: {
    margin: "30px auto 0",
    maxWidth: "700px",
  },
  formRow: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    "& .MuiFormControl-root": {
      margin: theme.spacing(1),
      flex: 1,
    },
  },
  submitBtn: {
    display: "block",
    width: "200px",
    margin: "30px auto 0",
  },
}));

export default CheckInForm;
