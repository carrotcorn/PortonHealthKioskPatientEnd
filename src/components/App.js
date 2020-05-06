import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Welcome, CheckIn, Appointment, Login } from "./pages";
import Layout from "./Layout";
import { getCurrentUser } from "../util/API";
import PrivateRoute from "../util/PrivateRoute";
import { UserContext } from "./Contexts";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success) {
          console.log(response.result);
          setUser(response.result);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/">
            <Welcome />
          </PrivateRoute>
          <PrivateRoute path="/checkin">
            <CheckIn />
          </PrivateRoute>
          <PrivateRoute path="/appointment">
            <Appointment />
          </PrivateRoute>
        </Switch>
      </Layout>
    </UserContext.Provider>
  );
}

export default App;
