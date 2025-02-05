import { CocktailContextType, CocktailType } from "./types/types";
import { USER_COCKTAIL_LIST } from "./consts";
import { getCocktailsData } from "./Api/HttpService";
import localStorageService from "./services/localStorage";
import { createContext, useState, useEffect, ReactNode, useCallback } from "react";

export const CocktailContext = createContext<CocktailContextType>({} as CocktailContextType);

export const CocktailProvider = ({ children }: { children: ReactNode }) => {
  const [cocktailsList, setCocktails] = useState<CocktailType[]>([]);
  const [userCocktailsList, setUserCocktails] = useState<CocktailType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchCocktailsFromLocalStorage = useCallback(() => {
    try {
      const coktailsFromLocalStorage: CocktailType[] =
        localStorageService.getItem(USER_COCKTAIL_LIST);
      if (coktailsFromLocalStorage.length) {
        setUserCocktails(coktailsFromLocalStorage);
      }
    } catch (error) {
      console.error("Error fetching cocktails:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCocktailById = useCallback(
    (id: string) =>
      cocktailsList.find((cocktail) => cocktail.idDrink === id) || ({} as CocktailType),
    [cocktailsList],
  );

  useEffect(() => {
    fetchCocktailsFromLocalStorage();
  }, [fetchCocktailsFromLocalStorage]);

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

  return (
    <CocktailContext.Provider
      value={{
        cocktailsList,
        loading,
        searchTerm,
        getCocktailById,
        setSearchTerm,
        fetchCocktailsFromLocalStorage,
      }}
    >
      {children}
    </CocktailContext.Provider>
  );
};
