"use client"
import { Button } from "@mui/material";
import clsx from "clsx";
import { useState, KeyboardEvent } from "react";

interface ITagInputProps {
  onSubmit?: (tags: string[]) => any;
  onChange?: (tags: string[]) => any;
  className?: string;
  errorMsg?: string;
}

export function TagInput({
  onSubmit,
  onChange,
  className,
  errorMsg,
}: ITagInputProps) {
  const [inputEnteredTags, setInputEnteredTags] = useState<string[]>([]);
  const [tagsInputVal, setTagsInputVal] = useState<string>("");

  const tagsInputHandleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case " ":
        if (tagsInputVal.trim() !== "") {
          setInputEnteredTags((prev) => {
            const resultTags = [...prev, tagsInputVal.trim()];
            onChange && onChange(resultTags);
            return resultTags;
          });
          setTagsInputVal("");
        }
        break;
      case "Enter":
        if (inputEnteredTags.length) {
          onSubmit && onSubmit(inputEnteredTags);
          setInputEnteredTags([]);
          setTagsInputVal("");
        }
    }
  };

  const removeTag = (index: number) => {
    setInputEnteredTags(inputEnteredTags.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        className={clsx(
          "flex flex-wrap items-center gap-2 p-1 border rounded",
          errorMsg ? "border-red-500" : "border-gray-300",
          className,
        )}
      >
        {inputEnteredTags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded"
          >
            <span>{tag}</span>
            <button
              onClick={() => removeTag(index)}
              className="text-slate-500 transition-colors hover:text-red-600 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          value={tagsInputVal}
          onChange={(e) => setTagsInputVal(e.target.value)}
          onKeyDown={tagsInputHandleKeyDown}
          className="flex-grow outline-none px-2 py-1"
          placeholder="Tags"
        />
        {inputEnteredTags.length ? (
          <Button
            onClick={() => {
              setInputEnteredTags([]);
              onChange && onChange([]);
            }}
            variant="outlined"
          >
            Clear
          </Button>
        ) : null}
      </div>
      {errorMsg && <p className="mt-1 text-sm text-red-500">{errorMsg}</p>}
    </div>
  );
}
