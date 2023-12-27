import React, { useEffect, useState } from "react";
import { Review } from "../../review";
import { Group } from "../../../layouts/group";
import { User as UserApi } from "../../../api";
import { Modal as ModalLayout } from "../../../layouts";
import {
  MiniProfile as MiniProfileWindow,
  Item as ItemWindow,
  Box as BoxWindow,
  LoadImage as LoadImageWindow,
  Restriction as RestrictionWindow,
} from "../../windows";

const Reviews = () => {
  const userApi = new UserApi();

  const [isStart, setIsStart] = useState(true);
  const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false);

  const [reviews, setReviews] = useState([]);

  const [miniProfile, setMiniProfile] = useState();
  const [item, setItem] = useState();
  const [box, setBox] = useState();
  const [restriction, setRestriction] = useState();
  const [image, setImage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const interval = setInterval(
      async () => {
        try {
          setIsStart(false);
          const response = await userApi.getReviewLast(10);
          const result = [];

          for (let i = 0; i < response.length; i++) {
            const r = response[i];
            const image = await userApi.getImageByUserId(r.userId);
            result.push(
              <Review
                id={r.id}
                image={image}
                name={r.title}
                date={r.creationDate}
                showMiniProfile={() => setMiniProfile(r.userId)}
                content={r.content}
                score={r.score}
                key={r.id}
              />
            );
          }

          setReviews(result);
        } catch (ex) {
          console.log(ex);

          if (
            ex?.response?.status < 500 &&
            ex?.response?.data?.error?.message
          ) {
            setErrorMessage(ex.response.data.error.message);
          } else {
            setErrorMessage("Неизвестная ошибка");
          }
        }
      },
      isStart ? 100 : 50000
    );

    return () => clearInterval(interval);
  });

  return (
    <div>
      <Group sliderSpeed={540} name="Отзывы">
        {reviews}
      </Group>
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
          openLoadWindow={setIsOpenLoadWindow}
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
          openLoadWindow={setIsOpenLoadWindow}
        />
      </ModalLayout>
      <ModalLayout
        isActive={isOpenLoadWindow}
        close={() => setIsOpenLoadWindow(false)}
      >
        <LoadImageWindow
          file={image}
          setFile={setImage}
          width={200}
          height={200}
          sizeMb={1}
          regular={/\.(png)$/}
          description={"PNG (MAX. 200x200px | 1MB)"}
        />
      </ModalLayout>
    </div>
  );
};

export default Reviews;
