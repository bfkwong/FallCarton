import React from "react";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Auth } from "aws-amplify";

import FallCrateLogo from "../../../assets/fallcratel.png";
import "./NavBar.css";

export default function Navbar(props) {
  const history = useHistory();

  return (
    <Grid container className="navbar_container" alignItems="center" spacing={2}>
      <Grid item xs>
        <Grid container alignItems="center" spacing={3}>
          <Grid item onClick={() => history.push("/files")}>
            <img src={FallCrateLogo} alt="Fall Crates" width="225px" style={{ paddingBottom: 5 }} />
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
      <Grid item>
        <IconButton
          onClick={async () => {
            try {
              await Auth.signOut();
              window.location.reload(false);
            } catch (error) {
              console.log("error signing out: ", error);
            }
          }}>
          <ExitToAppIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
