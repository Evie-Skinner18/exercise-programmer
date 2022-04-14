import Axios from "axios";

export class HttpClient {
  static async axiosClient() {
    const axios = Axios.create({
      timeout: 30 * 1000,
      // how do I productionise this? Do I need to make another .env file for frontend?
      baseURL: "http://localhost:5001/api/",
      headers: {
          "Content-type": "application/json"
      }
    });

    return axios;
  }
}