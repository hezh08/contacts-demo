import axios from "axios";

const API = "http://127.0.0.1:9000/api/";

function getContactList(query, sortMode, listDirection) {
  return axios.get(API + "contacts", { 
    params: {
      query: query,
      sortMode: sortMode
    }
  }).then(
    (response) => {
      return (listDirection) ? response.data : response.data.reverse();
    },
    (error) => {
      console.error(error);
      return null;
    }
  );
}

function getContactByID(id) {
  return axios.get(API + "contacts/" + id).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
      return null;
    }
  )
}

const Services = {
  getContactList,
  getContactByID
}

export default Services;

