import axios from 'axios';
import qs from 'qs';

const simpleUploadURL = "/file/file/public/chunk"

const mergeSimpleUpload = data => {
  axios.post(
      "/file/file/public/mergeFile",
      qs.parse(data)
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default {
  simpleUploadURL,
  mergeSimpleUpload
}