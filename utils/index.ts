import axios from "axios";

export const generateAddEventAPI = (token) => {
  const api = axios.create({
    baseURL: "https://www.addevent.com/api/v1"
  })
  const defaultParams = {
    token
  }
  return { api, defaultParams }
}
export const generateDiscordAPI = (token) => {
  return axios.create({
    baseURL: "https://discord.com/api",
    headers: { Authorization: `Bot ${token}`}
  })
}
