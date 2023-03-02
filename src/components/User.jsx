import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFavorite from "../hooks/useFavorite";
import ViewContents from "../commons/ViewContents";

const User = ({ config }) => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const favoritesMovies = useFavorite("movie", id);
  const favoriteTvs = useFavorite("tv", id);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/${id}`, { withCredentials: true })
      .then((result) => result.data)
      .then((user) => setUser(user));
  }, []);
  console.log("user", user);
  console.log("favorites Movies", favoritesMovies);
  console.log("favorites TVs", favoriteTvs);

  return (
    <>
      <p>{`First Name:  ${user.firstName}`}</p>
      <p>{`Last Name:   ${user.lastName}`}</p>
      <p>{`User Name:   ${user.userName}`}</p>
      <p>{`E-mail:      ${user.email}`}</p>
      <p>Favoritos</p>
      <p>Movies</p>
      {favoritesMovies.length !== 0 ? (
        <ViewContents
          config={config}
          contents={favoritesMovies}
          category="movie"
          type="add"
        />
      ) : (
        <p>Loding...</p>
      )}
      <p>Tv Series</p>
      {favoriteTvs.length !== 0 ? (
        <ViewContents
          config={config}
          contents={favoriteTvs}
          category="movie"
          type="add"
        />
      ) : (
        <p>Loding...</p>
      )}
    </>
  );
};

export default User;
