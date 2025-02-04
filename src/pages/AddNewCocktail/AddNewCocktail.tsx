import "./Home.css";
import { useEffect, useState } from "react";
import { CocktailType } from "../../types/types";
import { getCocktailsData } from "../../Api/HttpService";

function AddNewCocktail() {
  const [cocktailsList, setCocktailsList] = useState([] as CocktailType[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCocktailsData("a");
        setCocktailsList(data);
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Cocktails</h1>
        <div className="container">
          {cocktailsList.map((cocktail) => (
            <div className="item" key={cocktail.idDrink}>
              <img src={cocktail.strDrinkThumb} />
              <div>{cocktail.strDrink}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AddNewCocktail;
