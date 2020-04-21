import React from "react";
import {
  TextField,
  Paper,
  Typography,
  Button,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  form: {
    margin: "30px auto 0",
    maxWidth: "700px",
    "& div": {
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      flex: 1,
    },
    "& .MuiButton-root": {
      width: "100%",
      maxWidth: "200px",
      margin: "30px auto 0",
    },
  },
}));

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

function CheckIn() {
  const styles = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Paper className={styles.root}>
      <Typography variant="h4" align="center">
        Please Provide Your Information
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
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
          <TextField
            inputRef={register}
            name="birthday"
            label="Birthday"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
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
        <div>
          <TextField
            inputRef={register({ required: true })}
            name="city"
            label="City"
            error={!!errors.city}
            helperText={
              errors.city && errors.city.type === "required" && "Required"
            }
          />
          {/* Textfield select warning in strict mode https://github.com/mui-org/material-ui/issues/13394 */}
          <TextField
            select
            inputRef={(e) => e && register(e.node, { required: true })}
            name="province"
            label="Province"
            defaultValue=""
            error={!!errors.province}
            helperText={
              errors.province &&
              errors.province.type === "required" &&
              "Required"
            }
          >
            {provinces.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            inputRef={register({
              required: true,
              pattern: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] *?[0-9][A-Z][0-9]$/i,
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
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default CheckIn;
