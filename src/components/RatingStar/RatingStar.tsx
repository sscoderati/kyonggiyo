"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

type RatingStarProps = {
  // eslint-disable-next-line no-unused-vars
  onChangeScore: (score: number) => void;
};

export default function RatingStar({ onChangeScore }: RatingStarProps) {
  const [starArray, setStarArray] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [reviewScore, setReviewScore] = useState(0);

  const handleStarMouseOver = (index: number) => {
    const newStarArray = [...starArray];
    for (let i = 0; i < 5; i++) {
      newStarArray[i] = i <= index;
    }
    setStarArray(newStarArray);
  };

  const handleCalculateReviewScore = () => {
    const reviewScore = starArray.reduce(
      (acc, cur) => (cur ? acc + 1 : acc),
      0,
    );
    setReviewScore(reviewScore);
  };

  useEffect(() => {
    onChangeScore(reviewScore);
  }, [reviewScore]);

  return (
    <>
      <div className={"mx-auto flex gap-2"}>
        {starArray.map((isFilled, index) => (
          <Star
            key={index}
            fill={isFilled ? "black" : "none"}
            className={"h-7 w-7 cursor-pointer"}
            onMouseOver={() => handleStarMouseOver(index)}
            onClick={handleCalculateReviewScore}
            onTouchStart={() => handleStarMouseOver(index)}
            onTouchMove={() => handleStarMouseOver(index)}
            onTouchEnd={handleCalculateReviewScore}
          />
        ))}
      </div>
      {reviewScore > 0 && (
        <p className={"mx-auto text-sm font-semibold text-gray-400"}>
          {reviewScore}점!
        </p>
      )}
    </>
  );
}
