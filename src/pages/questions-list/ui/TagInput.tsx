import { useState, KeyboardEvent } from "react";

export function TagInput({ onSubmit }: { onSubmit: (tags: string[]) => any }) {
    const [inputEnteredTags, setInputEnteredTags] = useState<string[]>([]);
    const [tagsInputVal, setTagsInputVal] = useState<string>("");
    
    const tagsInputHandleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
          case " ":
            if (tagsInputVal.trim() !== "") {
              setInputEnteredTags([...inputEnteredTags, tagsInputVal.trim()]);
              setTagsInputVal("");
            }
            break;
          case "Enter":
            if (inputEnteredTags.length) {
              onSubmit(inputEnteredTags);
              setInputEnteredTags([]);
              setTagsInputVal("");
            }
        }
      };
    
      const removeTag = (index: number) => {
        setInputEnteredTags(inputEnteredTags.filter((_, i) => i !== index));
      };
    

    return (
        <div className="flex flex-wrap items-center gap-2 p-1 border border-gray-300 rounded max-w-xs">
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
              onChange={e => setTagsInputVal(e.target.value)}
              onKeyDown={tagsInputHandleKeyDown}
              className="flex-grow outline-none px-2 py-1"
              placeholder="Tags"
            />
          </div>
    )
}