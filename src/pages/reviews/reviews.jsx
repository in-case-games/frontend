import React from "react";
import { Helmet } from "react-helmet";
import { Panel } from "./components/panel";
import styles from "./reviews.module";

const Reviews = () => {
  return (
    <div className={styles.reviews}>
      <Helmet>
        <title>InCase - Отзывы</title>
        <meta
          name="description"
          content="InCase отзывы о наших счастливых клиентах, мы каждый день растем. Используем новые технологии и первые, кто предлагает лучший дроп по многим играм."
        />
      </Helmet>
      <div className={styles.container}>
        <Panel />
      </div>
    </div>
  );
};

export default Reviews;
