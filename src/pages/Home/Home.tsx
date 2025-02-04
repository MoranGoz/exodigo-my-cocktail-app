import "./Home.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { CocktailContext } from "../../CocktailContext";
import EmptyState from "../../components/EmptyState/EmptyState";
import CocktailGrid from "../../components/CocktailGrid/CocktailGrid";

function Home() {
  const navigate = useNavigate();
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
        <div className="add-button" onClick={() => navigate("/add")}>
          Add new cocktail
        </div>
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
