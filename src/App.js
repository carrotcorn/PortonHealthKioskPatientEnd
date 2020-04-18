import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout, Welcome, CheckIn, Appointment } from "./components";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/checkin" component={CheckIn} />
        <Route exact path="/appointment" component={Appointment} />
      </Switch>
    </Layout>
  );
}

export default App;
