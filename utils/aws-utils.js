import React, { useState } from "react";
import axios from "axios";

const uploadFileToS3 = async file => {
    let fileParts = file.name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    let url = `${process.env.REACT_APP_S3_BUCKET_ENDPOINT}objectName=${
      file.name
    }`;
  
    let options = {
      headers: {
        "Content-Type": fileType
      }
    };
  
    return await axios
      .get(url, {
        fileName: fileName,
        fileType: fileType
      })
      .then(async response => {
        let returnData = response.data;
        uploadStatus = { ...uploadStatus, ...returnData };
        return await axios
          .put(returnData.signedUrl, file, options)
          .then(result => {
            return { ...uploadStatus, ...{ success: true, uploading: false } };
          })
          .catch(error => {
            return {
              ...uploadStatus,
              ...{
                uploading: false,
                error: true,
                errormsg: JSON.stringify(error)
              }
            };
          });
      });
  };
  
  export { uploadFileToS3 };