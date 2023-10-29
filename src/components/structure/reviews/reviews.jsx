import React, { useEffect, useState } from "react";
import { Review } from "../../review";
import { Group } from "../../../layouts/group";
import { User as UserApi } from "../../../api";

const Reviews = () => {
  const userApi = new UserApi();
  const [isStart, setIsStart] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        setIsStart(false);
        const response = await userApi.getReviewLast(10);
        const result = [];

        for (let i = 0; i < response.length; i++) {
          const r = response[i];
          const image = await userApi.getImageByUserId(r.userId);
          result.push(
            <Review
              image={image}
              name={r.title}
              date={r.creationDate}
              content={r.content}
              score={r.score}
              key={r.id}
            />
          );
        }

        setReviews(result);
      },
      isStart ? 100 : 50000
    );

    return () => clearInterval(interval);
  });

  return (
    <Group sliderSpeed={540} name="Отзывы">
      {reviews}
    </Group>
  );
};

export default Reviews;
