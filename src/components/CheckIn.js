import React from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  welcome: {
    marginTop: "50px",
  },
  checkIn: {
    marginTop: "100px",
  },
});

function CheckIn() {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Typography variant="h2" align="center" className={classes.welcome}>
        Welcome To Our Clinic
      </Typography>
      <Button
        size="large"
        variant="contained"
        color="primary"
        className={classes.checkIn}
        endIcon={<AssignmentIcon />}
      >
        <Typography variant="h5">Check In</Typography>
      </Button>
    </div>
  );
}

export default CheckIn;
