import axios from "axios";

const API = "http://127.0.0.1:8000/api/";

function getContactList(sortMode, listDirection) {
  return axios.get(API + "contacts", { 
    params: {
      sorting: sortMode,
      direction: listDirection
    }
  }).then(
    (response) => {
      console.log(response)
      return response
    },
    (error) => {
      console.error(error.response)
      return []
    }
  );
}

export default {
  getContactList
}

