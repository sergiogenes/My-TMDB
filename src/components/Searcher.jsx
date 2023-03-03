import React from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { api_key, base_url } from "../utils/apiConfig.json";
//import ViewContents from "../commons/ViewContents";
import { useParams } from "react-router-dom";

const Searcher = ({ config, contents, setContents }) => {
  const searchInput = useInput("");
  const params = useParams();
  console.log("params", params);
  const category = params.category;
  const handlerSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `${base_url}/search/${category}?api_key=${api_key}&language=en-US&query=${searchInput.value}&page=1&include_adult=false`
      )
      .then((result) => result.data)
      .then((newContens) => {
        console.log("newContens buscado ==>>>", newContens);
        setContents(newContens.results);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form className="searchForm" onSubmit={handlerSearch}>
        <input type="text" {...searchInput} />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Searcher;
