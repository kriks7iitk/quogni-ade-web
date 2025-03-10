import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TagInput = ({onChange, maxTags}) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    onChange(tags);
  }
  ,[tags])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (tags.length >= maxTags) {
        toast.error(`You can only add ${maxTags} tags`);
      return;
    }
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full max-w-md p-4 border rounded-lg">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white px-2 py-1 rounded flex items-center"
          >
            {tag}
            <button
              className="ml-2 text-sm font-bold"
              onClick={() => removeTag(tag)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="mt-2 w-full p-2 border rounded"
        placeholder="Type and press Enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TagInput;
