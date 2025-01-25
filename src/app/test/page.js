"use client";

import React, { useState } from "react";

export default function ChatInput() {
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
    <div className="flex flex-col items-center justify-end w-full h-full bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl flex items-center"
      >
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className={`w-full p-4 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${scrollable ? "overflow-y-auto" : "overflow-y-hidden"}`}
          style={{ height: inputHeight, maxHeight: "200px" }}
        />
        <button
          type="submit"
          className="absolute right-3 bottom-3 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}
