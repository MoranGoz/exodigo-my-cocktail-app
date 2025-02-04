import { useContext } from "react";
import "./CocktailDetails.css";
import { useParams } from "react-router-dom";
import { CocktailContext } from "../../cocktailContext";
import { maxIngredients } from "../../consts";

function CocktailDetails() {
  const context = useContext(CocktailContext);
  const { getCocktailById } = context;
  const { id } = useParams();
  const cocktail = getCocktailById(id);

  const ingredients = Array.from({ length: maxIngredients }, (_, i) => {
    const ingredient = cocktail[`strIngredient${i + 1}` as keyof typeof cocktail];
    const measure = cocktail[`strMeasure${i + 1}` as keyof typeof cocktail];

    return ingredient ? { ingredient, measure: measure || "" } : null;
  }).filter((item): item is { ingredient: string; measure: string } => item !== null);

  return (
    <>
      {cocktail ? (
        <>
          <div className="cocktail-conainer">
            <div className="cocktail-name">{cocktail.strDrink}</div>

            <div>How To Make It Yourself ?!</div>

            <div className=" ingredient">
              <div className="title">Ingredients: </div>
              <ul>
                {ingredients.map(({ ingredient, measure }, index) => (
                  <li key={index}>
                    {measure ? `${measure} ` : ""}
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <div className="title">instructions: </div>
              <div className="info">{cocktail.strInstructions}</div>
            </div>
            {cocktail.strGlass && (
              <div className="section alcoholic">
                <div className="title">Recomended to serve in : </div>
                <div className="info">{cocktail.strGlass}</div>
              </div>
            )}
            <img
              className="cocktail-image"
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrinkThumb}
            />
            {cocktail.strCategory && (
              <div className="section category">
                <div className="title">Category: </div>
                <div className="info">{cocktail.strCategory}</div>
              </div>
            )}

            {cocktail.strAlcoholic && (
              <div className="section alcoholic">
                <div className="title">Alcoholic: </div>
                <div className="info">{cocktail.strAlcoholic}</div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>not found go back to home page</div>
      )}
    </>
  );
}

export default CocktailDetails;
