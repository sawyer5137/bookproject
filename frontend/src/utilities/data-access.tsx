import axios from "axios";
import { AxiosError } from "axios";

// const API_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = "/api/";

const instance = axios.create({
  withCredentials: true,
});

export function getUserById(id: number) {
  return instance
    .get(`${API_URL}user/${id}`)
    .then((resp) => resp.data)
    .catch(errorHandler);
}

export function getUsersBooksById(id: number) {
  return axios
    .get(`${API_URL}user/${id}/books`)
    .then((resp) => resp.data)
    .catch(errorHandler);
}

export function changeUsersBook(
  userId: number,
  bookId: number,
  rating: number,
  haveRead: boolean,
  hardCover: boolean
) {
  return instance
    .put(`${API_URL}user/${userId}/books/${bookId}`, {
      rating,
      haveRead,
      hardCover,
    })
    .then((resp) => resp.data)
    .catch(errorHandler);
}

export function removeUserBook(userId: number, bookId: number) {
  return instance
    .delete(`${API_URL}user/${userId}/books/${bookId}`)
    .then((resp) => {
      return resp.data;
    })
    .catch(errorHandler);
}

export function addUserBook(userId: number, bookId: number) {
  return instance
    .post(`${API_URL}user/${userId}/books`, {
      bookId,
    })
    .then((resp) => {
      return resp.data;
    })
    .catch(errorHandler);
}

export function getAllBooks() {
  return instance
    .get(`${API_URL}books`)
    .then((resp) => resp.data)
    .catch(errorHandler);
}

export function login(username: string, password: string) {
  return instance
    .post(`${API_URL}auth/login`, {
      username,
      password,
    })
    .then(function (resp) {
      return resp;
    })
    .catch(errorHandler);
}

export function register(username: string, password: string) {
  return instance
    .post(`${API_URL}auth/register`, {
      username,
      password,
    })
    .then((resp) => {
      return resp;
    })
    .catch(errorHandler);
}

export function checkSession() {
  return instance
    .get(`${API_URL}auth/check-session`)
    .then((resp) => resp.data)
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
