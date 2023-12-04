import React from "react";
import { Helmet } from "react-helmet";
import { Panel } from "./components/panel";
import styles from "./reviews.module";

const Reviews = () => {
  return (
    <div className={styles.reviews}>
      <Helmet>
        <title>InCase - Отзывы</title>
      </Helmet>
      <div className={styles.container}>
        <Panel />
      </div>
    </div>
  );
};

export default Reviews;
