import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../commons/Card";
import { api_key, base_url } from "../utils/apiConfig.json";

const ViewFavotites = ({ config }) => {
  const { category } = useParams();
  const [contents, setContents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [change, setChange] = useState(false);

  console.log("category  ==>>", category);

  useEffect(() => {
    setContents([]);
    axios
      .get(`http://localhost:3001/api/favorites/${category}s`, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((favorites) => {
        console.log("favorites", favorites);
        setFavorites(favorites);
      });
  }, [category, change]);

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

  console.log("contents ==>>", contents);

  return (
    <div className="divContent">
      {contents.map((content) => (
        <Card
          key={content.id}
          content={content}
          category={category}
          config={config}
          type={"delete"}
          change={change}
          setChange={setChange}
        />
      ))}
    </div>
  );
};

export default ViewFavotites;
