import "./App.css";
import NavBar from "./components/NavBar.jsx";
import Card from "./components/Card.jsx";
import Fileinput from "./components/Fileinput.jsx";
import SelectFolder from "./components/SelectFolder.jsx";
import Dashboard from "./components/Dashboard.jsx";
import NotFound from "./components/404.jsx";
import OpenedDir from "./components/OpenedDir.jsx";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:carpeta" element={<OpenedDir />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
