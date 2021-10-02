import { Typography, Grid } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { FileUploader } from "../Utility/FileUploader/FileUploader";

import "./FilesList.css";

export default function FilesList(props) {
  const [files, setFiles] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    setFiles([]);
  }, []);

  if (files?.length === 0) {
    return <FileUploader />;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container alignItems="center" style={{ marginBottom: 10, marginTop: 10 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" align="left">
              Filename
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1">Last modified</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1">File owner</Typography>
          </Grid>
        </Grid>
      </Grid>
      {files?.map &&
        files.map((file) => (
          <Grid item xs={12} className="filelist_item" onClick={() => history.push(`/file/${file.id}`)}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  {file.name}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle1" color="textSecondary">
                  {file.last_modified}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle1" color="textSecondary">
                  {file.owner}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}
