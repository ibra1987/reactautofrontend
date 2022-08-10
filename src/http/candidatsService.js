import axios from "axios";
const API_URL = "/api/candidates";

// get all
const getCandidats = async () => {
  const response = await axios.get(API_URL);
  if (response.data) {
    return response.data;
  }
};
// add candidat

const addCandidat = async (candidatInfo) => {
  const response = await axios.post(API_URL + "/create", candidatInfo, {
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.data) {
    return response.data;
  }
};
// edit candidat

const editCandidat = async (candidatInfo) => {
  const response = await axios.post(
    API_URL + "/update/" + candidatInfo._id,
    candidatInfo,
    {
      "content-type": "application/json",
    }
  );

  if (response.data) {
    return response.data;
  }
};

const candidatsService = {
  getCandidats,
  addCandidat,
  editCandidat,
};

export default candidatsService;
