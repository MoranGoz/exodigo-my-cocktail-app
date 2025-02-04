import "./emptyState.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import svg from "../../assets/cocktail.svg";
import { CocktailContext } from "../../CocktailContext";

function EmptyState() {
  const context = useContext(CocktailContext);
  const { setSearchTerm } = context;
  return (
    <>
      <div className="empty-state">
        <img className="svg-image" src={svg} alt="svg" />
        <div className="empty-state-text">No cocktails found</div>
        <div className="clear" onClick={() => setSearchTerm("")}>
          clear search
        </div>
        <div>or</div>
        <Link to={"./add"}>
          <div className="add">Add your own coctail</div>
        </Link>
      </div>
    </>
  );
}

export default EmptyState;
