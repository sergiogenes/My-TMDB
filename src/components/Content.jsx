import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../commons/Card";
import { useParams } from "react-router-dom";
import { api_key, base_url } from "../utils/apiConfig.json";

const Content = ({ config, contents, setContents }) => {
  const params = useParams();

  const { category } = params;
  console.log("params", params);

  console.log("contents  ==>> ", contents, "setContents", setContents);

  useEffect(() => {
    if (category) {
      axios
        .get(
          `${base_url}/discover/${category}?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        )
        .then((result) => result.data)
        .then((newContents) => setContents(newContents.results));
    }
  }, [category]);

  return (
    <div className="divContent">
      {contents.map((content) => (
        <Card
          key={content.id}
          content={content}
          category={category}
          config={config}
          type={"add"}
        />
      ))}
    </div>
  );
};

export default Content;
