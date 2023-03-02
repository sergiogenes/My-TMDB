import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api_key, base_url } from "../utils/apiConfig.json";

const Cartel = ({ config }) => {
  const { category, id } = useParams();
  console.log(category, id);
  const [contentCartel, setContentCartel] = useState({});

  useEffect(() => {
    axios
      .get(`${base_url}/${category}/${id}?api_key=${api_key}`)
      .then((result) => result.data)
      .then((newContent) => {
        console.log("newContent", newContent);
        setContentCartel(newContent);
      });
  }, [id, base_url]);
  console.log("config", config);
  console.log("contentCartel", contentCartel);
  console.log(
    "url imagen",
    `${config.images.base_url}${config.images.poster_sizes[2]}${contentCartel.poster_path}?${api_key}`
  );

  return contentCartel.id ? (
    <div className="cartelContainer">
      <img
        src={`${config.images.base_url}/${config.images.poster_sizes[3]}/${contentCartel.poster_path}?${api_key}`}
        alt="Imagen del contenido pelicula / serie"
      />
      <div>
        <h1>
          {contentCartel.title
            ? contentCartel.title
            : contentCartel.original_name}
        </h1>
        <h3>
          {contentCartel.release_date
            ? contentCartel.release_date
            : contentCartel.first_air_date}
        </h3>
        <p>{contentCartel.overview}</p>
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};

export default Cartel;
