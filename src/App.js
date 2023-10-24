import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
