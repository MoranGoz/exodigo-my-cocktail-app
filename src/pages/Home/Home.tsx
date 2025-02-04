import "./Home.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { CocktailContext } from "../../CocktailContext";
import EmptyState from "../../components/EmptyState/emptyState";
import CocktailGrid from "../../components/CocktailGrid/CocktailGrid";

function Home() {
  const context = useContext(CocktailContext);
  const { cocktailsList, loading, searchTerm, setSearchTerm } = context;

  return (
    <>
      <div className="header">
        <div className="home-title">Cocktails</div>
        <input
          type="text"
          placeholder="🔍 Search a cocktail..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to={"/add"}>
          <div className="add-button">ADD NEW COCKTAIL</div>
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : cocktailsList.length ? (
        <CocktailGrid cocktailsList={cocktailsList} />
      ) : (
        <EmptyState />
      )}
    </>
  );
}

export default Home;
