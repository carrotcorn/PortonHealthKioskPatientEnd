import React, { useState, useEffect, useContext } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import formInputFactory from "../../form-fields/FormInputFactory";
import { UserContext } from "../../Contexts";
import {
  getUserCheckInFields,
  getDefaultCheckInFields,
  getAllCheckInFields,
  getClinicByOwner
} from "../../../util/API";

// Warning in strict mode https://github.com/mui-org/material-ui/issues/13394

function CheckInForm() {
  const styles = useStyles();
  const { register, handleSubmit, errors, control } = useForm();
  const [formFields, setFormFields] = useState();
  const { user } = useContext(UserContext);
  const [state, setState] = React.useState();

  useEffect(() => {
    (async () => {
    try {
      const clinicData = await getClinicByOwner(user._id);
      const userFields = clinicData.formFields || [];            
      console.log(userFields);
      let configuredInputIds = new Set();
      for (let userField of userFields) {
        configuredInputIds.add(userField._id);
      }
      let fields = await getAllCheckInFields() || [];
      
      setState(
        fields.map((field) => ({
          ...field,
          active: configuredInputIds.has(field._id),
        }))
      );

      if (fields) {
        setFormFields(fields);
      } else {
        setFormFields(getDefaultCheckInFields());
      }
      console.log(formFields);

    }
    catch (e) {
      console.log(e.message);
    }
    })();    
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  return formFields ? (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        {formFields.map(({ inputType, name }, index) =>
          formInputFactory(inputType, {
            register,
            errors,
            control,
            name,
            key: index,
            classes: { root: styles.input },
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
  ) : (
    <CircularProgress />
  );
}

const useStyles = makeStyles((theme) => ({
  form: {
    margin: "30px auto 0",
    maxWidth: "700px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    minWidth: "300px",
    margin: theme.spacing(1),
  },
  submitBtn: {
    display: "block",
    width: "200px",
    margin: "30px auto 0",
  },
}));

export default CheckInForm;
