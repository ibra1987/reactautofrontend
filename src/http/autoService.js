import axios from "axios";
const API_URL = "/api/autoecoles";

const getAutoEcoles = async () => {
  const response = await axios.get(API_URL);
  if (response.data) {
    return response.data;
  }
};

const autoService = {
  getAutoEcoles,
};

export default autoService;
