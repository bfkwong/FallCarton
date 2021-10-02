import { Grid, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import "./FileUploader.css";

export function FileUploader() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="fileuploader_container">
      <input {...getInputProps()} />
      {isDragActive ? (
        <Grid
          className={["fileuploader_inner", "fileuploader_inner_dragactive"]}
          container
          justifyContent="center"
          alignItems="center">
          <Typography variant="h6">Drop it like its hot!</Typography>
        </Grid>
      ) : (
        <Grid className="fileuploader_inner" container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="h6">Hmm, its a little empty here ...</Typography>
            <Typography variant="h6">Drag n' Drop some files or click to upload</Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
