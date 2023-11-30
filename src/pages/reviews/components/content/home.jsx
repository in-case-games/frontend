import React, { useState, useEffect } from "react";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { Reviews as ReviewsApi, User as UserApi } from "../../../../api";
import { Inventory as InventoryLayout } from "../../../../layouts";
import { ReviewLine as Review } from "../../../../components/review";
import styles from "./content.module";

const Home = (props) => {
  const reviewsApi = new ReviewsApi();
  const userApi = new UserApi();

  const [isLoading, setIsLoading] = useState(true);
  const [isStart, setIsStart] = useState(true);

  const [review, setReview] = useState();
  const [primary, setPrimary] = useState({ items: [] });

  const additionalLoading = async (array, start, end) => {
    const loaded = [];

    setPrimary((prev) => ({ ...prev, items: array }));

    for (let i = start; i < end; i++) {
      const review = array[i];

      if (!review.user) {
        review.user = {
          id: review.userId,
          image: await userApi.getImageByUserId(review.userId),
        };
      }

      loaded.push(review);
    }

    return loaded;
  };

  const createShowByLoaded = (array, start, end) => {
    let result = [];

    for (let j = start; j < end; j++) {
      const r = array[j];

      result.push(
        <Review
          id={r.id}
          isSelected={r.id === review?.id}
          review={r}
          click={() => {
            setReview(r.id === review?.id ? undefined : r);
            setIsLoading(true);
          }}
          key={r.id}
        />
      );
    }

    return result;
  };

  return (
    <div className={styles.home}>
      <div className={styles.content_tittle}>
        <div className={styles.tittle}>
          <div className={styles.loading}>
            <Loading
              isLoading={isLoading}
              setLoading={() => setIsLoading(true)}
            />
          </div>
          <div className={styles.name}>Отзывы </div>
        </div>
      </div>
      <div className={styles.delimiter}></div>
      <div className={styles.inner}>
        <div className={styles.menu_left}>
          <div className={styles.menu_top}></div>
          <div className={styles.reviews}>
            <InventoryLayout
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              additionalLoading={additionalLoading}
              createShowByLoaded={createShowByLoaded}
              loadPrimary={async () =>
                primary.items.length > 0
                  ? primary.items
                  : await reviewsApi.getAll()
              }
              quantityPerPage={20}
            />
          </div>
        </div>
        <div className={styles.menu_right}>
          <div className={styles.review_info}></div>
          <div className={styles.user_reviews}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
