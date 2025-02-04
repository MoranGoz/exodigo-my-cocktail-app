import { CocktailType } from "./types/types";
import { USER_COCKTAIL_LIST } from "./consts";
import { getCocktailsData } from "./Api/HttpService";
import localStorageService from "./services/localStorage";
import { createContext, useState, useEffect, ReactNode } from "react";

interface CocktailContextType {
  loading: boolean;
  searchTerm: string;
  cocktailsList: CocktailType[];
  getCocktailById: (id: string) => CocktailType;
  setSearchTerm: (searchTerm: string) => void;
}

export const CocktailContext = createContext<CocktailContextType>({} as CocktailContextType);

export const CocktailProvider = ({ children }: { children: ReactNode }) => {
  const [cocktailsList, setCocktails] = useState<CocktailType[]>([]);
  const [userCocktailsList, setUserCocktails] = useState<CocktailType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchCocktailsFromLocalStorage = async () => {
      try {
        const coktailsFromLocalStorage: CocktailType[] =
          localStorageService.getItem(USER_COCKTAIL_LIST);
        console.log("coktailsFromLocalStorage", coktailsFromLocalStorage);
        if (coktailsFromLocalStorage.length) {
          setUserCocktails(coktailsFromLocalStorage);
        }
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktailsFromLocalStorage();
  }, []);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const list = await getCocktailsData("a");
        setCocktails(list || []);
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = userCocktailsList.filter((cocktail) =>
        cocktail.strDrink?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      const searchCocktail = async () => {
        try {
          const list = await getCocktailsData(searchTerm);

          setCocktails(list.concat(filtered) || []);
        } catch (error) {
          console.error("Error fetching cocktails:", error);
        } finally {
          setLoading(false);
        }
      };
      searchCocktail();
    } else {
      const fetchCocktails = async () => {
        try {
          const list = await getCocktailsData("a");
          setCocktails(list.concat(userCocktailsList) || []);
        } catch (error) {
          console.error("Error fetching cocktails:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCocktails();
    }
  }, [searchTerm, userCocktailsList]);

  const getCocktailById = (id: string) => {
    return (
      cocktailsList.find((cocktail: CocktailType) => cocktail.idDrink === id) ??
      ({} as CocktailType)
    );
  };

  return (
    <CocktailContext.Provider
      value={{ cocktailsList, loading, getCocktailById, searchTerm, setSearchTerm }}
    >
      {children}
    </CocktailContext.Provider>
  );
};
