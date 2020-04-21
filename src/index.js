import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

ReactDOM.render(
  <Router>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MuiPickersUtilsProvider>
  </Router>,
  document.getElementById("root")
);
