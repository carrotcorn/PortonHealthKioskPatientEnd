import React, { useState, useEffect, useContext } from "react";
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
import { format, addMinutes, subMinutes } from "date-fns";
import CheckInDialog from "./CheckInDialog";
import FormFieldDialog from "./FormFieldDialog";
import { UserContext } from "../../Contexts";
import {
  getClinicByOwner,
  getAppointmentsByClinic,
} from "../../../util/API.js";

function CheckIn() {
  const styles = useStyles();
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const clinic = await getClinicByOwner(user._id);
        const appointmentsData = await getAppointmentsByClinic(
          clinic._id,
          subMinutes(new Date(), 15),
          addMinutes(new Date(), 15)
        );
        console.log(appointmentsData);
        setAppointments(appointmentsData);
      } catch (e) {
        console.log(e.message);
      }
    }

    fetchAppointments();
  }, [user._id]);

  // dialog management
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  return (
    <Paper className={styles.root}>
      <Typography variant="h4" align="center">
        Please Select an Appointment
      </Typography>
      <TableContainer className={styles.table} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Attending</TableCell>
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
                  {`${
                    appointment.patientId.givenName
                  } ${appointment.patientId.familyName.charAt(0)}.`}
                </TableCell>
                <TableCell>{appointment.doctorId.doctorname}</TableCell>
                <TableCell align="right">
                  {format(new Date(appointment.time.start), "p")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CheckInDialog
        appointment={selectedAppointment}
        open={isDialogOpen}
        handleClose={handleCloseDialog}
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
