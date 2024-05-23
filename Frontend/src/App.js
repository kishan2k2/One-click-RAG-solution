import { useState } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import "./App.css";
import CopyRight from "./components/CopyRight.js";
import LandingPage from "./components/LandingPage.js";
import Login from "./components/Login.js";
import Navbar from "./components/NavBar.js";
import SignUp from "./components/SignUp.js";
import Dashboard from "./components/Dashboard.js";


function App() {

  const [login, setLogin]=useState(false);
  function showLoginPage()
  {
      setLogin(true);
  }
  return (
    <BrowserRouter>
      <div className="relative">
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>

        </Routes>
       <CopyRight/>
    </div>
    </BrowserRouter>
  );
}

export default App;
