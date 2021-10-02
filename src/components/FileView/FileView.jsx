import React from "react";
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import FileViewer from "react-file-viewer";
import dummyFiles from "../../mock/mockFiles.json";
import { saveAs } from "file-saver";
import GetAppIcon from "@material-ui/icons/GetApp";

import "./FileView.css";
import { TextInput } from "../Utility/Forms";
import { useParams } from "react-router-dom";

export default function FileView(props) {
  const [file, setFile] = React.useState(null);
  const [editing, setEditing] = React.useState(false);
  const { id } = useParams();

  React.useState(() => {
    setFile(dummyFiles[`${id}`]);
  }, []);

  return (
    <Grid container className="fileview_container">
      <Grid item xs={12}>
        <Grid container style={{ width: "98%", marginBottom: 10, marginTop: 10 }} spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {editing ? (
                  <TextInput label="Title" value={file?.name} />
                ) : (
                  <Typography variant="h6">{file?.name}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {editing ? (
                  <TextInput label="Description" rows={2} multiline value={file?.description} />
                ) : (
                  <Typography variant="subtitle1">{file?.description}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary" onClick={() => setEditing((editing) => !editing)}>
                  {editing ? "Save" : "Edit"}
                </Button>
              </Grid>
              <Grid item xs>
                <Button variant="contained" color="secondary">
                  Delete
                </Button>
              </Grid>
              <Grid item>
                <IconButton onClick={() => saveAs(file?.url, file?.file_type)}>
                  <GetAppIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr />
        <Grid item xs={12} className="fileview_viewer">
          <FileViewer
            fileType={file?.file_type}
            filePath={file?.url}
            errorComponent={() => <div />}
            onError={() => console.log("error")}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
