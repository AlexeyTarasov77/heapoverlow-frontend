import { useEffect, useState } from "react";

export function LikeButton({
  objID,
  storingKey
}: {
  objID: number;
  storingKey: string;
}) {
  const getLikedQuestions = (): number[] => {
    return JSON.parse(localStorage.getItem(storingKey) || "[]");
  };
  const checkIsLiked = (): boolean => {
    return getLikedQuestions().includes(objID);
  };
  const [isLiked, setIsLiked] = useState<boolean>(false);
  useEffect(() => setIsLiked(checkIsLiked()), []);
  const unlikeQuestion = (): void => {
    localStorage.setItem(
      storingKey,
      JSON.stringify(getLikedQuestions().filter(value => value !== objID))
    );
    setIsLiked(false);
  };
  const likeQuestion = (): void => {
    const likedQuestions = getLikedQuestions();
    likedQuestions.push(objID);
    localStorage.setItem(storingKey, JSON.stringify(likedQuestions));
    setIsLiked(true);
  };
  function handleLike() {
    if (isLiked) {
      unlikeQuestion();
    } else {
      likeQuestion();
    }
  }
  return (
    <button
      className="bg-red-600 text-white font-semibold p-2 rounded hover:bg-red-500"
      onClick={handleLike}
    >
      {isLiked ? "Unlike" : "Like"}
    </button>
  );
}
