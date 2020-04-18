import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from "@material-ui/core";
import CheckIn from "./components/CheckIn";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Porton Health</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <CheckIn />
      </Container>
    </>
  );
}

export default App;
