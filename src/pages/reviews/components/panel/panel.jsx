import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Home from "../content/home";
import styles from "../../reviews.module";

const Panel = () => {
  const { id } = useParams();

  const [content, setContent] = useState("home");

  const dictionary = {
    home: <Home exchange={setContent} />,
  };

  return (
    <div className={styles.panel}>
      {dictionary[content] ? dictionary[content] : dictionary["home"]}
    </div>
  );
};

export default Panel;
