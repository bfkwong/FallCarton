import { Container, Grid, Typography } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Utility/NavBar/NavBar";

import "./App.css";
import FilesList from "./components/FilesList/FilesList";
import FileView from "./components/FileView/FileView";

function App() {
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
            About
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

export default App;
