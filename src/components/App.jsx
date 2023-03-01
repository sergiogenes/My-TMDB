import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Searcher from "./Searcher";
import { api_key, base_url } from "../utils/apiConfig.json";
import { Route, Routes } from "react-router-dom";
import Content from "./Content";

const App = () => {
  const [user, setUser] = useState({});
  const [config, setConfig] = useState({});
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/configuration?api_key=${api_key}`)
      .then((result) => result.data)
      .then((config) => setConfig(config));
  }, []);

  useEffect(() => {
    const newUser = JSON.parse(localStorage.getItem("user")) || {};

    if (newUser.id) {
      setUser(newUser);
    }
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Searcher />
      <Routes>
        <Route path="register" element={<Register setUser={setUser} />} />
        <Route path="login" element={<Login user={user} setUser={setUser} />} />
        <Route path=":contentId" element={<Content config={config} />} />
      </Routes>
    </>
  );
};

export default App;
