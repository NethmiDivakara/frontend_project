import axios from "axios";
import config from "./ApiConfig.Services";

const PublicApi = axios.create({
  baseURL: config.serverUrl,
  withCredentials: false,
});

export default PublicApi;

