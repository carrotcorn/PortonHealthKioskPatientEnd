import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
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
            {appointment &&
              `Please confirm you are ${
                appointment.patientId.givenName
              } ${appointment.patientId.familyName.charAt(0)}.`}
          </Typography>
        </Toolbar>
      </AppBar>
      <CheckInForm />
    </Dialog>
  );
}
