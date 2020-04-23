import React from "react";
import { Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// import CheckIn from "../CheckIn";

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  welcome: {
    marginTop: "50px",
  },
  confirmBtn: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
  },
  optionsContainer: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
  },
});

function Confirmation() {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Typography variant="h2" align="center" className={classes.welcome}>
        Appointment Confirmed!
      </Typography>
      <Typography variant="h5" align="center" className={classes.welcome}>
        {`Thank you for checking in for your appointment with "doctor" at "time"`}
      </Typography>
      <Typography variant="h5" align="center">
        Please remain seated until your Doctor is ready for you. 
      </Typography>
      <Box className={classes.optionsContainer}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.optionBtn}
          component={Link}
          to="/"
        >
          <Typography variant="h5">Confirm</Typography>
        </Button>
      </Box>
    </div>
  );
}

export default Confirmation;
