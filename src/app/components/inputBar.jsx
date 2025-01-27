"use client";

import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useData } from "../context/DataContext";

export default function InputBar() {
  const [inputText, setInputText] = useState("");
  const [inputHeight, setInputHeight] = useState("auto");
  const [scrollable, setScrollable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    data,
    addDataEntry,
    updateLastDataEntry,
    updateThreadId,
    threadId,
    generateChatId,
    updateChatHistory,
  } = useData();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setInputText(""); // Reset input after submitting
    setInputHeight("auto"); // Reset height
    setScrollable(false);

    if (inputText.trim()) {
      const convId = generateChatId();
      addDataEntry({ id: convId, userMessage: inputText });

      let currentThreadId = threadId;

      if (!threadId) {
        const newThreadId = generateChatId();
        await updateThreadId(newThreadId);
        currentThreadId = newThreadId;
        window.history.replaceState(null, "", `/chat/${newThreadId}`);
      }

      const checkInitialData = data.length;

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/v1/query-verse-agent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: inputText,
              thread_id: currentThreadId,
            }),
          }
        );

        if (!response.ok) {
          console.error("Failed to send message:", response.statusText);
        } else {
          const agent_response = await response.json();
          updateLastDataEntry({ agentMessage: agent_response.agent_response });

          if (checkInitialData == 0) {

            const newChatInfo = {
              thread_id: currentThreadId,
              chat: inputText,
            };
            try {
              const response = await fetch(
                "http://127.0.0.1:8000/v1/add-conversation-history",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newChatInfo),
                }
              );
    
              if (!response.ok) {
                console.error("Failed to send message:", response.statusText);
              } else {
                const add_chat_response = await response.json();
                updateChatHistory(add_chat_response.chat);
              }
            } catch (error) {
              console.error("Error sending message:", error);
            }
          }
          
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }



      setIsLoading(false);
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
          disabled={isLoading}
          className={`absolute right-3 bottom-3 bg-black text-white px-2 py-2 rounded-full hover:opacity-75 disabled:opacity-75 ${isLoading && "cursor-not-allowed"}`}
        >
          <FaArrowUp />
        </button>
      </form>
    </div>
  );
}
