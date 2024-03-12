import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainContent from "./components/MainContent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import CustomFooter from "./components/CustomFooter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainContent />} />
      </Routes>
      <CustomFooter />
    </BrowserRouter>
  );
}

export default App;
