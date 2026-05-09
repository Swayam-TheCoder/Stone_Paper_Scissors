import axios from "axios";

const API = "https://stone-paper-scissors-r74z.onrender.com/api/matches";


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

// DELETE ALL MATCHES
export const clearMatches = async () => {

  const response = await axios.delete(API);

  return response.data;
};