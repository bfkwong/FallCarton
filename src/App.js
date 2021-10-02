import { Container, Grid, Typography } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Utility/NavBar/NavBar";
import { withAuthenticator } from "@aws-amplify/ui-react";

import "./App.css";
import FilesList from "./components/FilesList/FilesList";
import FileView from "./components/FileView/FileView";

function MainApp() {
  return (
    <Container>
      <Navbar />
      <Container className="app_body-container">
        <Switch>
          <Route path="/files">
            <FilesList />
          </Route>
          <Route path="/file/:id">
            <FileView />
          </Route>
        </Switch>
      </Container>
      <Grid container className="app_footer" spacing={3}>
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary">
            About us
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary">
            Help
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary">
            Terms of Service
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

function App() {
  return <MainApp />;
}

export default withAuthenticator(App);
