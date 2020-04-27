import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import formInputFactory from "../../form-fields/FormInputFactory";

// Warning in strict mode https://github.com/mui-org/material-ui/issues/13394

// input types
const FIRST_NAME = "FIRST_NAME";
const LAST_NAME = "LAST_NAME";
const BIRTHDAY = "BIRTHDAY";
const STREET_ADDRESS = "STREET_ADDRESS";
const CITY = "CITY";
const PROVINCE = "PROVINCE";
const POSTAL_CODE = "POSTAL_CODE";

const formConfig = [
  { inputType: FIRST_NAME, name: "fName", active: true },
  { inputType: LAST_NAME, name: "lastName", active: false },
  { inputType: BIRTHDAY, name: "birthday", active: false },
  { inputType: STREET_ADDRESS, name: "streetAddress", active: false },
  { inputType: CITY, name: "city", active: false },
  { inputType: PROVINCE, name: "province", active: false },
  { inputType: POSTAL_CODE, name: "postalCode", active: true },
];

function CheckInForm() {
  const styles = useStyles();
  const { register, handleSubmit, errors, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formRow}>
        {formConfig
          .filter((inputConfig) => inputConfig.active)
          .map(({ inputType, name }, index) =>
            formInputFactory(inputType, {
              register,
              errors,
              control,
              name,
              key: index,
            })
          )}
      </div>
      <div>
        <Button
          className={styles.submitBtn}
          type="submit"
          variant="contained"
          color="primary"
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
      minWidth: "300px",
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
