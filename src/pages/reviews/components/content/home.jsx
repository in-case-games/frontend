import React, { useState, useEffect } from "react";
import { LoadingArrow as Loading } from "../../../../components/loading";
import { Reviews as ReviewsApi, User as UserApi } from "../../../../api";
import { Inventory as InventoryLayout } from "../../../../layouts";
import { ReviewLine as Review } from "../../../../components/review";
import TokenService from "../../../../services/token";
import { useParams, useNavigate } from "react-router-dom";
import {
  TemplateUser as UserImage,
  TemplateLoadImage as LoadImage,
  Template1Image as ShowImage1,
  Template2Image as ShowImage2,
  Template3Image as ShowImage3,
  TemplateUser as CreateImage,
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
import { Eye } from "../../../../assets/images/icons";

const Home = (props) => {
  const { id } = useParams();
  const reviewsApi = new ReviewsApi();
  const userApi = new UserApi();

  const user = TokenService.getUser();
  const navigate = useNavigate();

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
      if (!userReview) await loadUserReview();

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

  const loadUserReview = async () => {
    let reviews = [];

    try {
      reviews = await reviewsApi.get();
    } catch (ex) {}

    const ur = await pushImages(reviews.length > 0 ? reviews[0] : {});

    let r = ur;

    if (id) {
      try {
        r = isAdmin()
          ? await reviewsApi.getByIdAdmin(id)
          : await reviewsApi.getById(id);
        r.user = {
          id: r.userId,
          image: await userApi.getImageByUserId(r.userId),
        };
      } catch (ex) {
        console.log(ex);
        navigate("/reviews");
      }
    }

    r = r ? await pushImages(r) : ur;

    setReview(r);
    setUserReview(ur);
    setIsLoading(true);
  };

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

    for (let i = 0; i < length; i++)
      review.images.push({ id: i, image: LoadImage, action: "create" });

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

    if (review.id === id) navigate("/reviews");
    if (!isAdmin()) window.location.reload();

    loadUserReview();
    setIsLoading(true);
  };

  const updateReview = async () => {
    await reviewsApi.put(review);

    for (let i = 0; i < review.images.length; i++) {
      try {
        const img = review.images[i];

        if (
          (img.image && img.image !== LoadImage && img.action === "create") ||
          img.action === "update"
        ) {
          if (img.action === "update") await reviewsApi.deleteImage(img.id);

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

    loadUserReview();
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

          if (img.image && img.image !== LoadImage && img.action === "create") {
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

    loadUserReview();
    setIsLoading(true);
  };

  const deniedReview = async () => {
    if (isAdmin()) {
      await reviewsApi.denied(review.id);

      loadUserReview();
      setIsLoading(true);
    }
  };

  const approveReview = async () => {
    if (isAdmin()) {
      await reviewsApi.approve(review.id);

      loadUserReview();
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

  const showImage = async (image) => {
    let options = {
      width: 2000,
      height: 2000,
      sizeMb: 2,
      regular: /\.(jpg|jpeg)$/,
      description: "JPEG,JPG (MAX. 2000x2000px | 2MB)",
      isBlockedLoad: review?.userId && review?.userId !== user?.id,
    };

    if (image.action === undefined) {
      const images = review.images;
      const index = images.findIndex((i) => i.id === image.id);

      if (!image.image) {
        image.image = await reviewsApi.getImageReview(review.id, image.id);
        images[index].image = image.image;
      }

      setReview((prev) => ({ ...prev, images: images }));

      if (isAccessActions()) {
        options = Object.assign(options, {
          buttonName: "Удалить",
          buttonColor: "#e36060",
          click: async () => {
            isAdmin()
              ? await reviewsApi.deleteImageByAdmin(image.id)
              : await reviewsApi.deleteImage(image.id);

            setLoadReviewImageWindow();
            setImage();

            if (!isAdmin()) window.location.reload();

            loadUserReview();
            setIsLoading(true);
          },
        });
      }
    }

    setImage(image?.image);
    setLoadReviewImageWindow(image?.id);
    setImageOptions(options);
    setIsOpenLoadWindow(true);
  };

  const getImageReview = (image) => {
    if (image.image) return image.image;

    const images = review.images;
    const index = images.findIndex((i) => i.id === image.id);

    if (index === 0) return ShowImage1;
    if (index === 1) return ShowImage2;
    if (index === 2) return ShowImage3;
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
              loadPrimary={async () => {
                if (user?.role === "owner" || user?.role === "admin")
                  return await reviewsApi.getAllByAdmin();

                if (primary.items.length > 0) return primary.items;

                const reviews = [];
                const userReviews = await reviewsApi.get();

                if (userReviews.length > 0 && !userReviews[0].isApproved)
                  reviews.push(userReviews[0]);

                return reviews.concat(await reviewsApi.getAll());
              }}
              quantityPerPage={8}
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
              {review && review?.userId && review?.userId !== user?.id ? (
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
                    onClick={async () => {
                      if (hoveredImage === i.id) await showImage(i);
                    }}
                  >
                    <img
                      className={styles.image}
                      alt=""
                      src={getImageReview(i)}
                      style={{
                        opacity: hoveredImage === i.id ? 0 : 1,
                      }}
                    />
                    <div className={styles.show_image}>
                      <img
                        alt=""
                        className={styles.image}
                        src={Eye}
                        style={{
                          opacity: hoveredImage === i.id ? 1 : 0,
                          visibility:
                            hoveredImage === i.id ? "visible" : "hidden",
                        }}
                      />
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

            if (images[index].action !== "remove") {
              images[index].image = image;

              if (
                images[index].action !== "create" &&
                images[index].image !== image
              ) {
                images[index].action = "update";
              }

              setReview((prev) => ({ ...prev, images: images }));
            }

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
          isBlockedLoad={imageOptions?.isBlockedLoad}
          click={imageOptions?.click}
          buttonColor={imageOptions?.buttonColor}
          buttonName={imageOptions?.buttonName}
        />
      </ModalLayout>
    </div>
  );
};

export default Home;
