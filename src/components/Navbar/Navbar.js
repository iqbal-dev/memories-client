import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { logout } from "../../actions/auth";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const handleLogout = () => {
    dispatch(logout(history));
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodeToken = decode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout(history));
        setUser(null);
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token, dispatch, history]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img
          className={classes.image}
          src={memoriesText}
          height="45px"
          alt="memories"
        />
        <img
          className={classes.image}
          src={memoriesLogo}
          height="40px"
          alt="memories"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            ></Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            variant="contained"
            to="/auth"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
