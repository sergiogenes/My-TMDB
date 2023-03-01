import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
//import movie from "../utils/fakemovie";
import { api_key } from "../utils/apiConfig.json";

//console.log("movie", movie);
const Card = ({ content, config }) => {
  //console.log("config", config);
  const params = useParams();
  const category = params.contentId;
  console.log("contentId dentro de card", category);
  const { base_url } = config.images;
  const size = config.images.poster_sizes;

  const addToFavorites = (e) => {
    axios
      .post(
        `http://localhost:3001/api/favorites/${category}s/`,
        {
          id: content.id,
        },
        { withCredentials: true }
      )
      .then((result) => result.data)
      .then((favorite) => console.log("se ha agregagdo a favorito", favorite))
      .catch((error) => console.error(error));
  };

  return !config.images ? (
    <p> Loading ... </p>
  ) : (
    <div className="card-container">
      <img
        src={`${base_url}/${size[1]}/${content.poster_path}?${api_key}`}
        alt="imagen de la card"
      />
      <h3>{content.title ? content.title : content.original_name}</h3>
      <h5>
        {content.release_date ? content.release_date : content.first_air_date}
      </h5>
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default Card;

/* https://www.themoviedb.org/t/p/w220_and_h330_face/6jE6HqtBqRUKuy98NMoWyZOHguR.jpg */

/* 
`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}?api_key=e08ad6a823e033e2be1a81ac21eae76d` */
