import React, { useContext, useEffect, useState } from "react";
import { Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Edit from "@material-ui/icons/Edit";
import LocalHospital from "@material-ui/icons/LocalHospital";
import Person from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts";
import { getClinic } from "../../util/API";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  welcome: {
    marginTop: "50px",
  },
  optionBtn: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
  },
  optionsContainer: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
  },
});

function Welcome() {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const [clinic, setClinic] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinic = async () => {
      console.log(userContext);
      if (userContext.user) {
        try {
          const response = await getClinic(userContext.user);
          if (response.success) {
            console.log(response.result[0]);
            setClinic(response.result[0]);
          }
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchClinic();
  }, [userContext]);

  if (loading || !clinic) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.page}>
      <Typography variant="h2" align="center" className={classes.welcome}>
        Welcome To {clinic.name}
      </Typography>
      <Box className={classes.optionsContainer}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.optionBtn}
          endIcon={<AssignmentIcon />}
          component={Link}
          to="/checkin"
        >
          <Typography variant="h5">Check In</Typography>
        </Button>
        <Button
          disabled
          size="large"
          variant="contained"
          className={classes.optionBtn}
          endIcon={<LocalHospital />}
        >
          <Typography variant="h5">Make An Appointment</Typography>
        </Button>
        <Button
          disabled
          size="large"
          variant="contained"
          className={classes.optionBtn}
          endIcon={<Edit />}
        >
          <Typography variant="h5">Change an Appointment</Typography>
        </Button>
        <Button
          disabled
          size="large"
          variant="contained"
          className={classes.optionBtn}
          endIcon={<Person />}
        >
          <Typography variant="h5">Contact Staff</Typography>
        </Button>
      </Box>
    </div>
  );
}

export default Welcome;
