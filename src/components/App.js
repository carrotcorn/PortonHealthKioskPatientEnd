import React from "react";
import { Route, Switch } from "react-router-dom";
import { Welcome, CheckIn, Appointment } from "./pages";
import Layout from "./Layout";

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
