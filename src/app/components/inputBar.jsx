"use client";

import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function InputBar() {
  const [inputText, setInputText] = useState("");
  const [inputHeight, setInputHeight] = useState("auto");
  const [scrollable, setScrollable] = useState(false);

  const handleInputChange = (e) => {
    const target = e.target;
    setInputText(target.value);

    // Dynamically adjust height only if it hasn't reached max height
    target.style.height = "auto";
    target.style.height = `${Math.min(target.scrollHeight, 200)}px`; // Max height of 200px
    setInputHeight(target.style.height);

    if (target.scrollHeight >= 200) {
      setScrollable(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      console.log("User message:", inputText);
      setInputText(""); // Reset input after submitting
      setInputHeight("auto"); // Reset height
      setScrollable(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-end w-full pb-4 sticky bottom-0 z-50 bg-white">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-3xl flex items-center pe-14 pb-10 bg-gray-200 rounded-2xl "
      >
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Message QueryVerse"
          className={`w-full px-4 py-2 pt-3 rounded-tl-2xl bg-gray-200 placeholder:text-gray-600 resize-none focus:outline-none ${scrollable ? "overflow-y-auto" : "overflow-y-hidden"}`}
          style={{ height: inputHeight, maxHeight: "200px" }}
        />
        <button
          type="submit"
          className="absolute right-3 bottom-3 bg-black text-white px-2 py-2 rounded-full hover:bg-blue-600"
        >
          <FaArrowUp />
        </button>
      </form>
    </div>
  );
}
