import { CocktailFormState, CocktailType } from "./types/types";
import { USER_COCKTAIL_LIST } from "./consts";
import localStorageService from "./services/localStorage";

export const addNewCocktailToLocalStorage = (newCocktail: CocktailType) => {
  const currentList: CocktailType[] = localStorageService.getItem(USER_COCKTAIL_LIST);
  if (currentList.length) {
    currentList.push(newCocktail);
    localStorageService.setItem(USER_COCKTAIL_LIST, currentList);
  } else {
    localStorageService.setItem(USER_COCKTAIL_LIST, [newCocktail]);
  }
};

export const generateRandomId = (): string =>
  String(Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000);

export const transformCocktailData = (formData: CocktailFormState): CocktailType => {
  const transformedData: { [key: string]: string | null } = {
    idDrink: generateRandomId(),
    strDrink: formData.name,
    strDrinkThumb: formData.image ?? null,
    strInstructions: formData.instructions,
  };

  formData.ingredients.forEach((item, index) => {
    const ingredientKey = `strIngredient${index + 1}`;
    const measureKey = `strMeasure${index + 1}`;

    transformedData[ingredientKey] = item.ingredient.trim() ? item.ingredient : null;
    transformedData[measureKey] = item.measure.trim() ? item.measure : null;
  });

  return transformedData;
};
