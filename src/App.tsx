import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokedex from "./pages/Pokedex";
import PokemonDetail from "./pages/PokemonDetail";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pokedex />} />
        <Route path='/:name' element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
