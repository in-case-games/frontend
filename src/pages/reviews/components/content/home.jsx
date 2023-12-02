import React, { useState, useEffect } from "react";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { Reviews as ReviewsApi, User as UserApi } from "../../../../api";
import { Inventory as InventoryLayout } from "../../../../layouts";
import { ReviewLine as Review } from "../../../../components/review";
import TokenService from "../../../../services/token";
import { useParams } from "react-router-dom";
import {
  TemplateUser as UserImage,
  TemplateSoon as ReviewImage,
} from "../../../../assets/images/main";
import {
  Input,
  TextArea,
  ComboBox,
} from "../../../../components/common/inputs";
import { Modal as ModalLayout } from "../../../../layouts";
import {
  MiniProfile as MiniProfileWindow,
  Item as ItemWindow,
  Box as BoxWindow,
  LoadImage as LoadImageWindow,
  Restriction as RestrictionWindow,
} from "../../../../components/windows";
import { Converter } from "../../../../helpers/converter";
import styles from "./content.module";

const Home = (props) => {
  const { id } = useParams();
  const reviewsApi = new ReviewsApi();
  const userApi = new UserApi();

  const user = TokenService.getUser();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false);
  const [loadReviewImageWindow, setLoadReviewImageWindow] = useState();

  const [backOperation, setBackOperation] = useState();
  const [operation, setOperation] = useState();

  const [primary, setPrimary] = useState({ items: [] });
  const [review, setReview] = useState();
  const [userReview, setUserReview] = useState();
  const [hoveredImage, setHoveredImage] = useState();
  const [miniProfile, setMiniProfile] = useState();
  const [item, setItem] = useState();
  const [box, setBox] = useState();
  const [image, setImage] = useState();
  const [restriction, setRestriction] = useState();

  const [imageOptions, setImageOptions] = useState();

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

        let r = ur;

        if (id)
          r = isAdmin()
            ? await reviewsApi.getByIdAdmin(id)
            : await reviewsApi.getById(id);

        r = await pushImages(r || ur);

        setReview(r);
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
          click={async () => {
            const temp = await pushImages(r);
            setReview(temp.id === review?.id ? userReview : temp);
            setIsLoading(true);
          }}
          showMiniProfile={() => setMiniProfile(r.userId)}
          key={r.id}
        />
      );
    }

    return result;
  };

  const pushImages = async (review) => {
    review.images = review.images || [];
    const length = 3 - review.images.length;

    for (let i = 0; i < length; i++) review.images.push({ id: i });

    review.images[0].image = await reviewsApi.getImageReview(
      review.id,
      review.images[0].id
    );
    review.images[1].image = await reviewsApi.getImageReview(
      review.id,
      review.images[1].id
    );
    review.images[2].image = await reviewsApi.getImageReview(
      review.id,
      review.images[2].id
    );

    return review;
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

    for (let i = 0; i < review.images.length; i++) {
      try {
        const img = review.images[i];

        if (img.image === ReviewImage && isNaN(img.id)) {
          await reviewsApi.deleteImage(img.id);
        }
        if (img.image !== ReviewImage) {
          await reviewsApi.postImage({
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            image: img.image,
            reviewId: review.id,
          });
        }
      } catch (ex) {
        console.log(ex);
      }
    }

    if (!isAdmin()) window.location.reload();

    setUserReview();
    setIsLoading(true);
  };

  const createReview = async () => {
    const result = await reviewsApi.post({
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      title: review.title,
      content: review.content,
      creationDate: "2023-12-01T13:24:21.814Z",
      score: review.score || 5,
      isApproved: false,
      userId: user.id,
    });

    if (result) {
      for (let i = 0; i < review.images.length; i++) {
        try {
          const img = review.images[i];

          if (img.image !== ReviewImage) {
            await reviewsApi.postImage({
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              image: img.image,
              reviewId: result.id,
            });
          }
        } catch (ex) {
          console.log(ex);
        }
      }
    }

    if (!isAdmin()) window.location.reload();

    setUserReview();
    setIsLoading(true);
  };

  const deniedReview = async () => {
    if (isAdmin()) {
      await reviewsApi.denied(review.id);

      setUserReview();
      setIsLoading(true);
    }
  };

  const approveReview = async () => {
    if (isAdmin()) {
      await reviewsApi.approve(review.id);

      setUserReview();
      setIsLoading(true);
    }
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
                src={
                  review?.id && review?.id !== userReview?.id
                    ? review?.user?.image || UserImage
                    : user?.image || UserImage
                }
                onClick={() => {
                  if (review.userId) setMiniProfile(review.userId);
                }}
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
                {!backOperation && review?.id ? (
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
          <div className={styles.review_images}>
            {review?.images
              ? review?.images.map((i) => (
                  <div
                    className={styles.review_image}
                    key={i.id}
                    onMouseEnter={() => setHoveredImage(i.id)}
                    onMouseLeave={() => setHoveredImage({})}
                  >
                    <img
                      className={styles.image}
                      alt=""
                      src={i.image}
                      style={{
                        opacity: hoveredImage === i.id ? 0.5 : 1,
                      }}
                    />
                    <div
                      className={styles.image_remove}
                      style={{
                        opacity:
                          isAccessActions() &&
                          hoveredImage === i.id &&
                          isNaN(i.id)
                            ? 1
                            : 0,
                        visibility:
                          isAccessActions() &&
                          hoveredImage === i.id &&
                          isNaN(i.id)
                            ? "visible"
                            : "hidden",
                      }}
                      onClick={() => {
                        if (
                          isAccessActions() &&
                          hoveredImage === i.id &&
                          isNaN(i.id)
                        ) {
                          const images = review.images;
                          const index = images.findIndex((r) => r.id === i.id);

                          images[index].image = ReviewImage;

                          setReview((prev) => ({ ...prev, images: images }));
                        }
                      }}
                    >
                      x
                    </div>
                    <div
                      className={styles.image_add}
                      style={{
                        opacity:
                          isAccessActions() &&
                          hoveredImage === i.id &&
                          !isNaN(i.id)
                            ? 1
                            : 0,
                        visibility:
                          isAccessActions() &&
                          hoveredImage === i.id &&
                          !isNaN(i.id)
                            ? "visible"
                            : "hidden",
                      }}
                      onClick={() => {
                        if (
                          isAccessActions() &&
                          hoveredImage === i.id &&
                          !isNaN(i.id)
                        ) {
                          setImage(i.image);
                          setLoadReviewImageWindow(i.id);
                          setImageOptions({
                            width: 2000,
                            height: 2000,
                            sizeMb: 4,
                            regular: /\.(jpg|jpeg|png)$/,
                            description:
                              "JPEG,JPG,PNG (MAX. 2000x2000px | 4MB)",
                          });
                          setIsOpenLoadWindow(true);
                        }
                      }}
                    >
                      +
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      <ModalLayout isActive={miniProfile} close={() => setMiniProfile()}>
        <MiniProfileWindow
          userId={miniProfile}
          openRestrictionWindow={(r) => setRestriction(r)}
          openItemWindow={(item) => setItem(item)}
          openBoxWindow={(box) => setBox(box)}
          exchangeWindow={(id) => setMiniProfile(id)}
        />
      </ModalLayout>
      <ModalLayout isActive={restriction} close={() => setRestriction()}>
        <RestrictionWindow
          restriction={restriction}
          setRestriction={setRestriction}
          close={() => setRestriction()}
        />
      </ModalLayout>
      <ModalLayout
        isActive={item}
        close={() => {
          setItem();
          setImage();
        }}
      >
        <ItemWindow
          item={item}
          image={image}
          setImage={setImage}
          setItem={setItem}
          openLoadWindow={(v) => {
            setImageOptions({
              width: 200,
              height: 200,
              sizeMb: 1,
              regular: /\.(png)$/,
              description: "PNG (MAX. 200x200px | 1MB)",
            });
            setIsOpenLoadWindow(v);
          }}
        />
      </ModalLayout>
      <ModalLayout
        isActive={box}
        close={() => {
          setBox();
          setImage();
        }}
      >
        <BoxWindow
          box={box}
          image={image}
          setImage={setImage}
          setBox={setBox}
          openLoadWindow={(v) => {
            setImageOptions({
              width: 200,
              height: 200,
              sizeMb: 1,
              regular: /\.(png)$/,
              description: "PNG (MAX. 200x200px | 1MB)",
            });
            setIsOpenLoadWindow(v);
          }}
        />
      </ModalLayout>
      <ModalLayout
        isActive={isOpenLoadWindow}
        close={() => {
          if (loadReviewImageWindow || loadReviewImageWindow === 0) {
            const images = review.images;
            const index = images.findIndex(
              (i) => i.id === loadReviewImageWindow
            );

            images[index].image = image;

            setReview((prev) => ({ ...prev, images: images }));
            setLoadReviewImageWindow();
            setImage();
          }

          setIsOpenLoadWindow(false);
        }}
      >
        <LoadImageWindow
          file={image}
          setFile={setImage}
          width={imageOptions?.width}
          height={imageOptions?.height}
          sizeMb={imageOptions?.sizeMb}
          regular={imageOptions?.regular}
          description={imageOptions?.description}
        />
      </ModalLayout>
    </div>
  );
};

export default Home;
