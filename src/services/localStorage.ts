import { CocktailType } from "../types/types";

const localStorageService = {
  setItem: (key: string, value: CocktailType[]) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving ${key} to localStorage`, error);
    }
  },

  getItem: <T>(key: string): T | [] => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : [];
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage`, error);
      return [];
    }
  },
};

export default localStorageService;
