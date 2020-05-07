import React from "react";
import { Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

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
  const location = useLocation();
  const { appointment } = location.state || {};

  return (
    <div className={classes.page}>
      <Typography variant="h2" align="center" className={classes.welcome}>
        Appointment Confirmed!
      </Typography>
      <Typography variant="h5" align="center" className={classes.welcome}>
        {`Thank you for checking in for your appointment with ${
          appointment && appointment.doctorId.doctorname
        } at ${format(new Date(appointment.time.start), "p")}`}
      </Typography>
      <Typography variant="h5" align="center">
        The Doctor Will Be With You Shortly.
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
