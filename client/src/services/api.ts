import axios from "axios";
const API_BASE_URL = "http://localhost:8000/api";

// schema
export interface UserData {
  name: string;
  email: string;
  phone: number;
  title: string;
  description: string;
}
// getusers
export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/getusers`);
  return response.data;
};
//getUser
export const getUser = async (userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/getuser/${userId}`);
  return response.data;
};
//updateuser
export const updateUserData = async (userId: string, newData: UserData) => {
  const response = await axios.put(
    `${API_BASE_URL}/updateuser/${userId}`,
    newData
  );
  return response.data;
};
//deleteuser
export const deleteUserData = async (userId: string) => {
  const response = await axios.delete(`${API_BASE_URL}/deleteuser/${userId}`);
  return response.data;
};
//inseruser
export const insertUserData = async (newData: UserData) => {
  const response = await axios.post(`${API_BASE_URL}/insertuser`, newData);
  return response.data;
};
