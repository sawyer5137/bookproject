import axios from "axios";
import { AxiosError } from "axios";

const API_URL = "http://localhost:8081/api/";

export function getUserById(id: number) {
  return axios
    .get(API_URL + `user/${id}`)
    .then((resp) => {
      return resp.data;
    })
    .catch(errorHandler);
}

export function getUsersBooksById(id: number) {
  return axios
    .get(API_URL + `user/${id}/books`)
    .then((resp) => {
      return resp.data;
    })
    .catch(errorHandler);
}

export function getAllBooks() {
  return axios
    .get(API_URL + "books")
    .then((resp) => resp.data)
    .catch(errorHandler);
}

export function login(username: string, password: string) {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then(function (resp) {
      return resp;
    })
    .catch(errorHandler);
}

function errorHandler(err: AxiosError) {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log("ERROR: ", err.message);
  }
  console.log(err.config);
  throw err;
}
