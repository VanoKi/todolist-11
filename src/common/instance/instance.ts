import axios from "axios";

const token = '448e0d12-136a-4f40-9ff3-99347c703a57'
const apiKey = '14d62fb0-7776-4500-94b8-5e06e7d229ae'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  headers: {
    Authorization: `Bearer ${token}`,
    "API-KEY": apiKey
  }
})