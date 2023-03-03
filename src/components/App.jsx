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
import Cartel from "../commons/Cartel";
import ViewFavotites from "./ViewFavorites";
import ListUsers from "./ListUsers";
import User from "./User";
import Wellcome from "./Wellcome";

const App = () => {
  const [user, setUser] = useState({});
  const [config, setConfig] = useState({});
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/configuration?api_key=${api_key}`)
      .then((result) => result.data)
      .then((config) => setConfig(config));
  }, []);

  const cookieToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  console.log("cookies.token ==>>", cookieToken);

  useEffect(() => {
    const newUser = JSON.parse(localStorage.getItem("user")) || {};

    if (newUser.id && cookieToken) {
      setUser(newUser);
    }
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Wellcome />} />
        <Route path="register" element={<Register setUser={setUser} />} />
        <Route path="login" element={<Login user={user} setUser={setUser} />} />
        <Route path="user/:id" element={<User config={config} />} />
        <Route
          path=":category"
          element={
            <>
              <Searcher
                contents={contents}
                setContents={setContents}
                category="movie"
              />
              <Content
                config={config}
                contents={contents}
                setContents={setContents}
              />
            </>
          }
        />
        <Route path=":category/:id" element={<Cartel config={config} />} />
        <Route
          path="user/favorites/:category"
          element={<ViewFavotites config={config} />}
        />
        <Route path="user" element={<ListUsers />} />
      </Routes>
    </>
  );
};

export default App;
