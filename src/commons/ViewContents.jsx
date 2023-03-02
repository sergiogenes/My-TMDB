import React from "react";
import Card from "./Card";

const ViewContents = ({ config, contents, category, type }) => {
  return (
    <div className="divContent">
      {contents.map((content) => (
        <Card
          key={content.id}
          content={content}
          category={category}
          config={config}
          type={type}
        />
      ))}
    </div>
  );
};

export default ViewContents;
