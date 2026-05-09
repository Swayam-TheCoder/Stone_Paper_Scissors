import axios from "axios";

const API = "http://localhost:5000/api/matches";


// GET MATCH HISTORY
export const getMatches = async () => {

  const response = await axios.get(API);

  return response.data;
};


// SAVE MATCH
export const saveMatch = async (matchData) => {

  const response = await axios.post(
    API,
    matchData
  );

  return response.data;
};