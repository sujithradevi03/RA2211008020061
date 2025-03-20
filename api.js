import axios from "axios";

const BASE_URL = "http://20.244.56.144/test";

const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const registerCompany = async () => {
  const payload = {
    companyName: "goMart",
    ownerName: "Rahul",
    rollNo: "1",
    ownerEmail: "rahul@abc.edu",
    accessCode: "FKDLjg",
  };
  const response = await API.post("/register", payload);
  return response.data;
};

export const getAuthToken = async (clientID, clientSecret) => {
  const payload = {
    companyName: "goMart",
    clientID,
    clientSecret,
    ownerName: "Rahul",
    ownerEmail: "rahul@abc.edu",
    rollNo: "1",
  };
  const response = await API.post("/auth", payload);
  return response.data.access_token;
};

export const fetchUsers = async (token) =>
  API.get("/users", { headers: { Authorization: `Bearer ${token}` } });

export const fetchPosts = async (token) =>
  API.get("/posts", { headers: { Authorization: `Bearer ${token}` } });

export const fetchComments = async (token) =>
  API.get("/comments", { headers: { Authorization: `Bearer ${token}` } });
