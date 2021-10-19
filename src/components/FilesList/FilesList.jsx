import Auth from "@aws-amplify/auth";
import { Typography, Grid } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { FileUploader } from "../Utility/FileUploader/FileUploader";

import "./FilesList.css";

export default function FilesList(props) {
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();

  const updateFileList = async () => {
    setLoading(true);
    const cogUserId = await Auth.currentSession();
    const resp = await fetch("https://uvn8m8dpn6.execute-api.us-west-2.amazonaws.com/prod/v1/files", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      }
    });
    const respData = await resp.json();

    const newFiles = [];
    for (const item of respData.Items) {
      const respUserName = await fetch(
        `https://wzwyqze9bi.execute-api.us-west-2.amazonaws.com/prod/v1/user?userId=${item.userId}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: cogUserId?.idToken?.jwtToken
          }
        }
      );
      const respUserNameData = await respUserName.json();
      newFiles.push({ ...item, ...respUserNameData.Item });
    }

    console.log(newFiles);
    setFiles(newFiles);
    setLoading(false);
  };

  React.useEffect(() => {
    updateFileList();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (files?.length === 0) {
    return <FileUploader onComplete={updateFileList} />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FileUploader onComplete={updateFileList} />
      </Grid>
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
          <Grid item xs={12} className="filelist_item" onClick={() => history.push(`/file/${file.fileId}`)}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  {file.name}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle1" color="textSecondary">
                  {new Date(file.lastModifiedTime).toLocaleDateString()}{" "}
                  {new Date(file.lastModifiedTime).toLocaleTimeString()}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle1" color="textSecondary">
                  {file.firstName} {file.lastName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}
