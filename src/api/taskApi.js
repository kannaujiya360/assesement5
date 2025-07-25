import axios from "axios";

const BASE_URL = "https://server-6-og92.onrender.com";

export const getTasks = () => axios.get(BASE_URL);
export const getTask = (id) => axios.get(`${BASE_URL}/${id}`);
export const createTask = (task) => axios.post(BASE_URL, task);
export const updateTask = (id, task) => axios.put(`${BASE_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${BASE_URL}/${id}`);
