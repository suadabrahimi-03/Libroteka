import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Hyr from "./pages/Hyr";
import Regjistrohu from "./pages/Regjistrohu";
import Paneli from "./pages/Paneli";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hyr" element={<Hyr />} />
          <Route path="/regjistrohu" element={<Regjistrohu />} />
          <Route path="/paneli" element={<Paneli />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;