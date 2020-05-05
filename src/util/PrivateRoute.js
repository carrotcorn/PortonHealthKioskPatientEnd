import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../components/Contexts";

export default function PrivateRoute({ children, ...rest }) {
  const userContext = useContext(UserContext);

  useEffect(() => console.log(userContext), [userContext]);

  return (
    <Route
      {...rest}
      render={() =>
        userContext.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}
