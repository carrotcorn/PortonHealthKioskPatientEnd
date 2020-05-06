import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {
  getAllCheckInFields,
  getUserCheckInFields,
  setUserCheckInFields,
  getClinicByOwner
} from "../../../util/API";
import { CircularProgress, Paper } from "@material-ui/core";
import { UserContext } from "../../Contexts";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px 50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  checkboxes: {
    marginBottom: "20px",
  },
}));

export default function CheckInFormFields(props) {
  const classes = useStyles();
  const [state, setState] = React.useState();
  const [error, setError] = React.useState(false);
  const { user } = useContext(UserContext);
  const [clinic, setClinic] = React.useState({});
  
  useEffect(() => {
    // TODO: consider moving this logic to the api/backend
    let fields;
    let userFields;
    let configuredInputTypes;

    (async () => {
    try {
      const clinicData = await getClinicByOwner(user._id);
      setClinic(clinicData);
      userFields = clinicData.formFields || [];      
      console.log(userFields);
      let configuredInputIds = new Set();
      for (let userField of userFields) {
        configuredInputIds.add(userField._id);
      }
      fields = await getAllCheckInFields() || [];

      setState(
        fields.map((field) => ({
          ...field,
          active: configuredInputIds.has(field._id),
        }))
      );
  
    }
    catch (error) {
      console.log(error.message);
    }

    })();


  }, []);

  const handleChange = (event) => {
    setState(
      state.map((field) =>
        field.name === event.target.name
          ? { ...field, active: !field.active }
          : field
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const checked = state.filter((field) => field.active);

    if (checked.length < 1) {
      setError(true);
      return;
    }

    try {
      await setUserCheckInFields(clinic, 
        checked.map(({ _id }) => ({ _id }))
      );
    }
    catch (e) {
      console.log(e.message);
    }

    props.onSubmitted();
  };

  return state ? (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormControl
          required
          error={error}
          component="fieldset"
          className={classes.checkboxes}
        >
          <FormGroup>
            {state.map(({ inputType, name, label, active }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={active}
                    onChange={handleChange}
                    name={name}
                  />
                }
                label={label}
                key={inputType}
              />
            ))}
          </FormGroup>
          {error && <FormHelperText>Select at least one.</FormHelperText>}
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Save Preferences
        </Button>
      </form>
    </Paper>
  ) : (
    <CircularProgress />
  );
}
