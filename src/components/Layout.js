import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  homeLink: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
}));

function Layout({ children }) {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.homeLink}>
            <Typography variant="h4">Porton Health</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </>
  );
}

export default Layout;
