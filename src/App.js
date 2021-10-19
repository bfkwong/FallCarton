import React from "react";
import { Container, Button } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Utility/NavBar/NavBar";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Auth from "@aws-amplify/auth";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./App.css";
import FilesList from "./components/FilesList/FilesList";
import FileView from "./components/FileView/FileView";
import { TextInput } from "./components/Utility/Forms";

function MainApp() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const getUserInfo = async () => {
    setLoading(true);
    const cogUserId = await Auth.currentSession();
    const cogUsername = cogUserId?.idToken?.payload["cognito:username"];
    const resp = await fetch(
      `https://wzwyqze9bi.execute-api.us-west-2.amazonaws.com/prod/v1/user?userId=${cogUsername}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: cogUserId?.idToken?.jwtToken
        }
      }
    );
    const respData = await resp.json();
    setUserInfo(respData);
    setLoading(false);
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

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
          <Route path="/">
            <FilesList />
          </Route>
        </Switch>
      </Container>
      <Dialog open={!loading && !userInfo?.Item} disableBackdropClick>
        <DialogTitle>Hello! Tell us a bit about yourself</DialogTitle>
        <DialogContent>
          <TextInput
            label="Your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ paddingBottom: 20 }}
          />
          <TextInput label="Your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!firstName || !lastName}
            onClick={async () => {
              const cogUserId = await Auth.currentSession();
              const cogUsername = cogUserId?.idToken?.payload["cognito:username"];
              await fetch(`https://wzwyqze9bi.execute-api.us-west-2.amazonaws.com/prod/v1/user`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify({
                  userId: cogUsername,
                  firstName,
                  lastName
                }),
                headers: {
                  Authorization: cogUserId?.idToken?.jwtToken
                }
              });
              getUserInfo();
            }}
            color="primary"
            variant="contained">
            Done!
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function App() {
  return <MainApp />;
}

export default withAuthenticator(App);
