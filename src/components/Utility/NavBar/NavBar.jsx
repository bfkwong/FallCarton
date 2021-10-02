import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import "./NavBar.css";

export default function Navbar(props) {
  const history = useHistory();

  return (
    <Grid container className="navbar_container" alignItems="flex-end">
      <Grid item xs>
        <Grid container alignItems="flex-end" spacing={3}>
          <Grid item>
            <Typography variant="h5" className="navbar_link-btn" onClick={() => history.push("/")} color="textPrimary">
              FallCarton
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className="navbar_link-btn" onClick={() => history.push("/files")}>
              Files
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className="navbar_link-btn">
              Recently deleted
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" className="navbar_link-btn">
          Profile
        </Typography>
      </Grid>
    </Grid>
  );
}
