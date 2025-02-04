import "./CocktailGrid.css";
import { Link } from "react-router-dom";
import { CocktailType } from "../../types/types";

interface CocktailGridProps {
  cocktailsList: CocktailType[];
}

const CocktailGrid: React.FC<CocktailGridProps> = ({ cocktailsList }) => {
  return (
    <>
      <div className="container">
        {cocktailsList.map((cocktail: CocktailType) => (
          <Link to={`cocktail/${cocktail.idDrink}`} key={cocktail.idDrink}>
            <div className="item">
              <div className="image-container">
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrinkThumb} />
              </div>
              <div className="cocktail-name">{cocktail.strDrink}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CocktailGrid;
