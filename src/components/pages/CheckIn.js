import React from "react";
import { TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  },
}));

function CheckIn() {
  const styles = useStyles();
  return (
    <Paper className={styles.root}>
      <Typography variant="h4" align="center">
        Please Provide Your Information
      </Typography>
      <form className={styles.form}>
        <div>
          <TextField label="First Name"></TextField>
          <TextField label="Last Name"></TextField>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <TextField label="Street Address"></TextField>
        <div>
          <TextField label="City"></TextField>
          <TextField label="Province"></TextField>
          <TextField label="Postal Code"></TextField>
        </div>
      </form>
    </Paper>
  );
}

export default CheckIn;
