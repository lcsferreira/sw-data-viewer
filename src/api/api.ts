import axios from "axios";
import { swapiUrl } from "./utils";

const api = axios.create({
  baseURL: swapiUrl,
});

export default api;
