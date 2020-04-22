import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckInForm from "./CheckInForm";

function CheckIn() {
  const styles = useStyles();

  return (
    <Paper className={styles.root}>
      <Typography variant="h4" align="center">
        Please Provide Your Information
      </Typography>
      <CheckInForm />
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
}));

export default CheckIn;
