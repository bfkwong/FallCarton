import React from "react";
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import FileViewer from "react-file-viewer";
import { saveAs } from "file-saver";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useHistory } from "react-router-dom";

import "./FileView.css";
import { TextInput } from "../Utility/Forms";
import { useParams } from "react-router-dom";
import { Storage } from "aws-amplify";
import Auth from "@aws-amplify/auth";

export default function FileView(props) {
  const history = useHistory();
  const [file, setFile] = React.useState(null);
  const [editing, setEditing] = React.useState(false);
  const { id } = useParams();

  React.useState(() => {
    (async () => {
      const cogUserId = await Auth.currentSession();
      const resp = await fetch(`https://uvn8m8dpn6.execute-api.us-west-2.amazonaws.com/prod/v1/file?fileid=${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: cogUserId?.idToken?.jwtToken
        }
      });
      const respJson = await resp.json();
      const signedURL = await Storage.get(respJson.Item.s3FileKey, { level: "private" });
      setFile({ ...respJson.Item, s3Link: signedURL });
    })();
  }, []);

  if (!file) {
    return <div>Loading ...</div>;
  }

  return (
    <Grid container className="fileview_container">
      <Grid item xs={12}>
        <Grid container style={{ width: "98%", marginBottom: 10, marginTop: 10 }} spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item>
                    <b>
                      <Typography variant="subtitle1">Last modified at:</Typography>
                    </b>
                    <Typography variant="subtitle1">{file.lastModifiedTime}</Typography>
                  </Grid>
                  <Grid item>
                    <b>
                      <Typography variant="subtitle1">Created at:</Typography>
                    </b>
                    <Typography variant="subtitle1">{file.uploadTime}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {editing ? (
                  <TextInput
                    label="Title"
                    value={file?.name}
                    onChange={(e) =>
                      setFile((fle) => {
                        return { ...fle, name: e.target.value };
                      })
                    }
                  />
                ) : (
                  <Typography variant="h6">{file?.name}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {editing ? (
                  <TextInput
                    label="Description"
                    rows={2}
                    multiline
                    value={file?.description}
                    onChange={(e) =>
                      setFile((fle) => {
                        return { ...fle, description: e.target.value };
                      })
                    }
                  />
                ) : (
                  <Typography variant="subtitle1">{file?.description}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    if (editing) {
                      const newFileObj = {
                        ...file,
                        fileId: file.fileId,
                        name: file.name,
                        description: file.description,
                        lastModifiedTime: new Date()
                      };
                      const cogUserId = await Auth.currentSession();
                      await fetch("https://uvn8m8dpn6.execute-api.us-west-2.amazonaws.com/prod/v1/file", {
                        method: "PUT",
                        mode: "cors",
                        headers: {
                          Authorization: cogUserId?.idToken?.jwtToken
                        },
                        body: JSON.stringify(newFileObj)
                      });
                      setFile((fle) => {
                        return { ...fle, lastModifiedTime: JSON.stringify(new Date()) };
                      });
                    }
                    setEditing((editing) => !editing);
                  }}>
                  {editing ? "Save" : "Edit"}
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={async () => {
                    const cogUserId = await Auth.currentSession();
                    await fetch(`https://uvn8m8dpn6.execute-api.us-west-2.amazonaws.com/prod/v1/file?fileid=${id}`, {
                      method: "DELETE",
                      mode: "cors",
                      headers: {
                        Authorization: cogUserId?.idToken?.jwtToken
                      }
                    });
                    await Storage.remove(file?.s3FileKey, { level: "private" });
                    history.push("/files");
                  }}>
                  Delete
                </Button>
              </Grid>
              <Grid item>
                <IconButton onClick={() => saveAs(file?.s3Link, file?.s3FileKey)}>
                  <GetAppIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr />
        <Grid item xs={12} className="fileview_viewer">
          <FileViewer
            fileType={file.s3FileKey.split(".").slice(-1)[0]}
            filePath={file.s3Link}
            errorComponent={() => <div />}
            onError={() => console.log("error")}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
