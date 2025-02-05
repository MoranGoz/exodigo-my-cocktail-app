import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import CocktailForm from "./pages/CocktailForm/CocktailForm";
import { CocktailProvider } from "./CocktailContext";
import CocktailDetails from "./pages/CocktailDetails/CocktailDetails";

function App() {
  return (
    <>
      <CocktailProvider>
        <Routes>
          <Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/add" element={<CocktailForm />}></Route>
            <Route path="/cocktail/:id" element={<CocktailDetails />}></Route>
            <Route path="*" element={<div>page not found</div>} />
          </Route>
        </Routes>
      </CocktailProvider>
    </>
  );
}

export default App;
