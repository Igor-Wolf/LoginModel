import axios from "axios";

export const api = axios.create({
    baseURL: 'https://login-backend-test.vercel.app/api',
    headers: {
      'Content-Type': 'application/json',
    }
})