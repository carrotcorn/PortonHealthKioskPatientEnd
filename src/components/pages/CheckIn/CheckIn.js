import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { format, addMinutes } from "date-fns";
import CheckInDialog from "./CheckInDialog";
import FormFieldDialog from "./FormFieldDialog";

function createAppointment(id, firstName, lastInitial, attending) {
  const randTime = addMinutes(Date.now(), Math.floor(Math.random() * 15 + 1));
  const formattedTime = format(randTime, "p");
  return { id, firstName, lastInitial, attending, time: formattedTime };
}

function CheckIn() {
  const styles = useStyles();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(
      [
        createAppointment(1, "Abigail", "A.", "Walk In"),
        createAppointment(2, "Lucas", "J.", "Dr. Johnson"),
        createAppointment(3, "Thomas", "F.", "Dr. Armstrong"),
        createAppointment(4, "Peter", "C.", "Dr. Squire"),
        createAppointment(5, "Eric", "B.", "Dr. Smith"),
        createAppointment(6, "Andrea", "F.", "Dr. Toledo"),
      ].sort((a, b) => a.time > b.time)
    );
  }, []);

  // dialog management
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseFormDialog = () => {
    setIsFormDialogOpen(false);
  };

  const handleClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  return (
    <Paper className={styles.root}>
      <Typography variant="h4" align="center">
        Please Select an Upcoming Appointment
      </Typography>
      <TableContainer className={styles.table} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Attending</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow
                classes={{ root: styles.tableRow }}
                hover
                key={appointment.id}
                onClick={() => handleClick(appointment)}
              >
                <TableCell component="th" scope="row">
                  {`${appointment.firstName} ${appointment.lastInitial}`}
                </TableCell>
                <TableCell align="right">{appointment.attending}</TableCell>
                <TableCell align="right">{appointment.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={() => setIsFormDialogOpen(true)}>
        Configure Check In Form
      </Button>
      <CheckInDialog
        appointment={selectedAppointment}
        open={isDialogOpen}
        handleClose={handleCloseDialog}
      />
      <FormFieldDialog
        open={isFormDialogOpen}
        handleClose={handleCloseFormDialog}
      />
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    maxWidth: 800,
    margin: "0 auto",
  },
  table: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  tableRow: {
    cursor: "pointer",
  },
}));

export default CheckIn;
