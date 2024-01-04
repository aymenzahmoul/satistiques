import "./scss/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import StatsLive from "./pages/StatsLive";
import Blank from "./pages/Blank";
import LoginForm from "./pages/signIn/LoginForm";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = Cookies.get("loggedIn") === "loggedIn";
    setLoggedIn(isLoggedIn);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ? (
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Blank />} />
            <Route path="/StateLive" element={<StatsLive />} />
          </Route>
        ) : (
          <Route path="*" element={<LoginForm />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
