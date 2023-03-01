import React from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { api_key, base_url } from "../utils/apiConfig.json";

const Searcher = ({ config }) => {
  const searchInput = useInput("");

  const handlerSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `${base_url}/search/movie?api_key=${api_key}&language=en-US&query=${searchInput.value}&page=1&include_adult=false`
      )
      .then((result) => result.data)
      .then((data) => console.log("data buscada ==>>>", data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handlerSearch}>
        <input type="text" {...searchInput} />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Searcher;

//https://api.themoviedb.org/3/search/movies?api_key=e08ad6a823e033e2be1a81ac21eae76d&language=en-US&query=Tom%20Hans&page=1&include_adult=false

//https://api.themoviedb.org/3/search/movie?api_key=e08ad6a823e033e2be1a81ac21eae76d&language=en-US&query=Tom%20Hanks&page=1&include_adult=false
