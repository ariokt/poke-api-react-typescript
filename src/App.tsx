import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokedex from "./pages/Pokedex";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
