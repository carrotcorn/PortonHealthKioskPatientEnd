import React, { useState, useEffect, useContext } from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import {
  formInputFactory,
  validatePatientInfo,
} from "../../form-fields/FormInputHandlers";
import { UserContext } from "../../Contexts";
import { getClinicByOwner, checkInAppointment } from "../../../util/API";
import { Redirect } from "react-router-dom";
import LoadingScreen from "../util/LoadingScreen";

// Warning in strict mode https://github.com/mui-org/material-ui/issues/13394

function CheckInForm({ appointment }) {
  const styles = useStyles();
  const { register, handleSubmit, errors, control } = useForm();
  const [formFields, setFormFields] = useState();
  const [submissionStatusText, setSubmissionStatusText] = useState();
  const [isCheckedIn, setIsCheckedIn] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const clinicData = await getClinicByOwner(user._id);
        const userFields = clinicData.formFields || [];
        setFormFields(userFields);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [user._id]);

  const onSubmit = async (data) => {
    const validPatient = formFields
      .map(({ inputType, name }) =>
        validatePatientInfo(inputType, name, data[name], appointment.patientId)
      )
      .reduce((prev, curr) => prev && curr, true);

    if (!validPatient) {
      setSubmissionStatusText("Invalid Patient Info");
    } else {
      setSubmissionStatusText("");
      const checkInResponse = await checkInAppointment(appointment._id);
      if (checkInResponse.success) {
        setIsCheckedIn(true);
      } else {
        setSubmissionStatusText("There was an error checking you in :(");
      }
    }
  };

  if (isCheckedIn) {
    return (
      <Redirect
        to={{
          pathname: "/confirmation",
          state: { appointment },
        }}
      />
    );
  }

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
            autoComplete: "off",
          })
        )}
      </div>
      <div>
        <Typography color="error">{submissionStatusText}</Typography>
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
    <LoadingScreen />
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
