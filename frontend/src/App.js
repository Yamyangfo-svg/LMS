import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
<<<<<<< Updated upstream
import Authors from "./Components/User Management/Authors";
=======
import LanguageList from "./pages/LanguageList";
import book from "./pages/book";


>>>>>>> Stashed changes
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
<<<<<<< Updated upstream
          <Route path="/authors" element={<Authors />} />
=======
          <Route path="/LanguageList" element={<LanguageList/>} />
          <Route path="/book" element={<book/>} />
          
>>>>>>> Stashed changes
        </Routes>
      </div>
    </Router>
  );
}

export default App;
