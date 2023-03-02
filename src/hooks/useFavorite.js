import axios from "axios";
import { useState, useEffect } from "react";
import { api_key, base_url } from "../utils/apiConfig.json";

const useFavorite = (category, userId) => {
  const [contents, setContents] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setContents([]);
    axios
      .get(`http://localhost:3001/api/favorites/${userId}/${category}s`, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((favorites) => {
        console.log("favorites", favorites);
        setFavorites(favorites);
      });
  }, [category]);

  useEffect(() => {
    let newArray = favorites.map((favorite) =>
      axios
        .get(`${base_url}/${category}/${favorite.contentId}?api_key=${api_key}`)
        .then((result) => result.data)
        .then((newContentItem) => newContentItem)
    );
    console.log("newArray", newArray);
    Promise.all(newArray).then((result) => setContents(result));
  }, [favorites]);

  return contents;
};

export default useFavorite;
