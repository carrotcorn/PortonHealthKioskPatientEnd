import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Box,
} from "@material-ui/core";
import CheckInForm from "./CheckInForm";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  content: {
    paddingTop: "30px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CheckInDialog({ appointment, open, handleClose }) {
  const classes = useStyles();

  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Check In
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.content}>
        <Typography variant="h6" className={classes.title} align="center">
          {appointment &&
            `Please confirm you are ${
              appointment.patientId.givenName
            } ${appointment.patientId.familyName.charAt(0)}.`}
        </Typography>
        <CheckInForm appointment={appointment} />
      </Box>
    </Dialog>
  );
}
