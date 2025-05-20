import axios from "axios";

const { MAILTRAP_API_TOKEN } = process.env;

if (!MAILTRAP_API_TOKEN) {
  console.error("Error: MAILTRAP_API_TOKEN environment variable is required");
  process.exit(1);
}

const apiClient = axios.create({
  baseURL: "https://mailtrap.io",
  headers: {
    Authorization: `Bearer ${MAILTRAP_API_TOKEN}`,
  },
});

export default apiClient;
