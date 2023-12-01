import React, { useState, useEffect } from "react";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { Reviews as ReviewsApi, User as UserApi } from "../../../../api";
import { Inventory as InventoryLayout } from "../../../../layouts";
import { ReviewLine as Review } from "../../../../components/review";
import TokenService from "../../../../services/token";
import { TemplateUser as UserImage } from "../../../../assets/images/main";
import {
  Input,
  TextArea,
  ComboBox,
} from "../../../../components/common/inputs";
import { Converter } from "../../../../helpers/converter";
import styles from "./content.module";

const Home = (props) => {
  const reviewsApi = new ReviewsApi();
  const userApi = new UserApi();

  const user = TokenService.getUser();

  const [isLoading, setIsLoading] = useState(true);

  const [backOperation, setBackOperation] = useState();
  const [operation, setOperation] = useState();

  const [primary, setPrimary] = useState({ items: [] });
  const [review, setReview] = useState();
  const [userReview, setUserReview] = useState();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (backOperation) {
        let temp = backOperation - 1;
        temp = temp >= 0 ? temp : 0;

        setBackOperation(temp);

        if (temp === 0) {
          await operations[operation]();

          setOperation();
          setBackOperation();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const additionalLoading = async (array, start, end) => {
    const loaded = [];

    setPrimary((prev) => ({ ...prev, items: array }));

    for (let i = start; i < end; i++) {
      const review = array[i];

      if (!userReview) {
        let reviews = [];

        try {
          reviews = await reviewsApi.get();
        } catch (ex) {}

        const ur = reviews.length > 0 ? reviews[0] : {};

        setUserReview(ur);
        setReview(ur);
        setIsLoading(true);
      }

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
            setReview(r.id === review?.id ? userReview : r);
            setIsLoading(true);
          }}
          key={r.id}
        />
      );
    }

    return result;
  };

  const buttonClick = (isDelete = false) => {
    if (backOperation > 0) {
      setBackOperation(null);
      setOperation(null);
    } else if (!backOperation) {
      setBackOperation(5);

      if (isDelete) setOperation("delete-review");
      else if (review?.id) setOperation("update-review");
      else setOperation("create-review");
    }
  };

  const deleteReview = async () => {
    await reviewsApi.delete(review.id);

    if (!isAdmin()) window.location.reload();

    setUserReview();
    setIsLoading(true);
  };

  const updateReview = async () => {
    await reviewsApi.put(review);

    if (!isAdmin()) window.location.reload();

    setUserReview();
    setIsLoading(true);
  };

  const createReview = async () => {
    await reviewsApi.post({
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      title: review.title,
      content: review.content,
      creationDate: "2023-12-01T13:24:21.814Z",
      score: review.score,
      isApproved: false,
      userId: user.id,
    });

    if (!isAdmin()) window.location.reload();

    setUserReview();
    setIsLoading(true);
  };

  const deniedReview = async () => {
    await reviewsApi.denied(review.id);

    setUserReview();
    setIsLoading(true);
  };

  const approveReview = async () => {
    await reviewsApi.approve(review.id);

    setUserReview();
    setIsLoading(true);
  };

  const operations = {
    "create-review": createReview,
    "delete-review": deleteReview,
    "update-review": updateReview,
  };

  const isAdmin = () => user?.role === "owner" || user?.role === "admin";

  const isAccessActions = () =>
    isAdmin() || (user && (!review?.id || review?.userId === user?.id));

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
              loadPrimary={async () => {
                if (user?.role === "owner" || user?.role === "admin")
                  return await reviewsApi.getAllByAdmin();

                return primary.items.length > 0
                  ? primary.items
                  : await reviewsApi.getAll();
              }}
              quantityPerPage={20}
            />
          </div>
        </div>
        <div className={styles.menu_right}>
          <div className={styles.review_info}>
            <div className={styles.review_header}>
              <img
                className={styles.logo}
                alt=""
                src={review?.user?.image || user?.image || UserImage}
              />
              <Input
                name="tittle"
                placeholder="Заголовок"
                maxLength={25}
                isReadOnly={!isAccessActions()}
                value={review?.title}
                setValue={(title) => setReview({ ...review, title })}
              />
              {review && review?.userId !== user?.id ? (
                <div
                  className={styles.close_review}
                  onClick={() => {
                    setReview(userReview);
                    setIsLoading(true);
                  }}
                >
                  ✕
                </div>
              ) : null}
            </div>
            <div className={styles.main_info}>
              <TextArea
                name="content"
                placeholder="Описание"
                isReadOnly={!isAccessActions()}
                isDisabled={true}
                rows={4}
                value={review?.content}
                setValue={(content) => setReview({ ...review, content })}
              />
              <ComboBox
                name="score"
                isReadOnly={!isAccessActions()}
                value={"Оценка " + review?.score}
                values={[
                  { id: 5, name: "Оценка 5" },
                  { id: 4, name: "Оценка 4" },
                  { id: 3, name: "Оценка 3" },
                  { id: 2, name: "Оценка 2" },
                  { id: 1, name: "Оценка 1" },
                ]}
                setValue={() => {}}
                setIndex={(score) => setReview({ ...review, score })}
              />
            </div>
            <div className={styles.date}>
              {Converter.getMiniDate(review?.creationDate || new Date())}
            </div>
            <div className={styles.delimiter}></div>
            {isAccessActions() ? (
              <div className={styles.review_buttons}>
                {!backOperation ? (
                  <div
                    className={styles.button_send}
                    onClick={() => buttonClick()}
                  >
                    {review?.id ? "Изменить" : "Создать"}
                  </div>
                ) : null}
                {(!backOperation && review?.id && user?.role === "owner") ||
                user?.role === "admin" ? (
                  !review.isApproved ? (
                    <div
                      className={styles.button_approve}
                      onClick={async () => await approveReview()}
                    >
                      ✓
                    </div>
                  ) : (
                    <div
                      className={styles.button_denied}
                      onClick={async () => await deniedReview()}
                    >
                      ✕
                    </div>
                  )
                ) : null}
                {review?.id && !backOperation ? (
                  <div
                    className={styles.button_delete}
                    onClick={() => buttonClick(true)}
                  >
                    Удалить
                  </div>
                ) : null}
                {backOperation ? (
                  <div
                    className={styles.button_back}
                    onClick={() => buttonClick()}
                  >
                    <div className={styles.text}>Вернуть</div>
                    <div className={styles.timer}>{backOperation}</div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className={styles.user_reviews}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
