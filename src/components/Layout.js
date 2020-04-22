import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from "@material-ui/core";

function Layout({ children }) {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Porton Health</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </>
  );
}

export default Layout;
