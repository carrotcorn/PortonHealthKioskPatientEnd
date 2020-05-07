/* global Backend */
const backend = new Backend("http://localhost:7001");

// have the backend do this if time
export const checkInAppointment = async (id) => {
  return backend.post("/appointment/checkin", { conditions: { _id: id } });
};

export const getUserCheckInFields = async (id) => {
  let fields;

  const clinic = await getClinicByOwner(id);
  const response = await backend.post("/checkinformfield/find", {
    conditions: { $in: clinic.formFields },
  });
  if (response.success) fields = response.result;
  else throw response.error;

  return fields;
};

export const getCurrentUser = async () => {
  let user;

  const response = await backend.get("/user/current");
  if (response.success) user = response.result;
  else throw response.error;

  return user;
};

export const getUser = async (id) => {
  let user;

  const response = await backend.post("/user/find", {
    conditions: { _id: id },
  });
  if (response.success) user = response.result;
  else throw response.error;

  return user;
};

export const changeUserStatus = async (id, status) => {
  let user;

  const response = await backend.put("/user/update", {
    conditions: { _id: id },
    doc: { disabled: status },
  });
  if (response.success) user = response.result;
  else throw response.error;

  return user;
};

export const getClinicByOwner = async (id) => {
  let clinic;

  const response = await backend.post("/clinic/find", {
    conditions: { ownerId: id },
  });
  if (response.success) clinic = response.result;
  else throw response.error;

  return clinic[0];
};

export const getClinics = async () => {
  let clinics;

  const response = await backend.get("/clinic/find");
  if (response.success) clinics = response.result;
  else throw response.error;

  return clinics;
};

export const getAppointmentsByClinic = async (id, startTime, endTime) => {
  let appointments;

  const response = await backend.post("/appointment/find", {
    conditions: {
      clinicId: id,
      checkedIn: { $exists: false },
      "time.start": { $gte: startTime, $lte: endTime },
    },
  });
  if (response.success) appointments = response.result;
  else throw response.error;

  return appointments;
};

export const auth = async (data) => {
  let userId;

  const response = await backend.post("/user/login", data);
  if (response.success) userId = response.result;
  else throw response.error;

  return userId;
};

export const logout = async () => {
  await backend.post("/user/logout");
};

export const registerUser = async (data) => {
  let user;

  const response = await backend.post("/user/create", data);
  if (response.success) user = response.result;
  else throw response.error;

  return user;
};
