import axios from "axios";
const API_URL = "/api/users";

const Login = async (user) => {
  const response = await axios.post(`${API_URL}/login`, user, {
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.status === 200) {
    return response.data;
  }
};

const getUser = async () => {
  const response = await axios.get(API_URL + "/getuser");
  if (response.data) {
    return response.data;
  }
};

const userService = {
  Login,
  getUser,
};

export default userService;
