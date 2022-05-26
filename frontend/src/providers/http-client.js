import Axios from "axios";

export class HttpClient {
  static async axiosClient() {
    const axios = Axios.create({
      timeout: 30 * 1000,
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
          "Content-type": "application/json"
      }
    });

    return axios;
  }
}