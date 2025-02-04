import axios from "axios";

const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1";

export const getCocktailsData = async (query: string) => {
  const { data } = await axios.get(`${API_BASE}/search.php?s=${query}`);
  return data.drinks || [];
};

export const getCocktailsDataById = async (id: string) => {
  console.log("id", id);
  const { data } = await axios.get(`${API_BASE}/lookup.php?=${id}`);
  console.log("data", data);
  return data || [];
};
