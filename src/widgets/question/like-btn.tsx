import { MouseEventHandler } from "react";

export interface ILikeButtonProps {
  isLiked: boolean;
  likeToggler: MouseEventHandler<HTMLButtonElement>
}

export function LikeButton({ isLiked, likeToggler }: ILikeButtonProps) {
  return (
    <button
      className="bg-red-600 text-white font-semibold p-2 rounded hover:bg-red-500"
      onClick={likeToggler}
    >
      {isLiked ? "Unlike" : "Like"}
    </button>
  )
}
