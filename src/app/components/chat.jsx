"use client";
import Markdown from "react-markdown";

import React from "react";
import { Avatar } from "@heroui/react";

const Chat = ({ type, cls, msg, isLoading }) => {
  if (type === "agent") {
    return (
      <div className={`flex gap-4 ${cls}`}>
        <div>
          <Avatar
            size="sm"
            src="/ai_logo.svg"
          />
        </div>
        <div className="bg-white">
          <Markdown>{isLoading ? "processing your request..." : msg}</Markdown>
        </div>
      </div>
    );
  } else if (type === "user") {
    return (
      <div
        className={`bg-gray-200 rounded-lg p-2 px-4 flex max-w-xl self-end ${cls}`}
      >
        <p className="hyphens-none">{msg}</p>
      </div>
    );
  }
};

export default Chat;
