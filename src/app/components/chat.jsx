import React from "react";
import { Avatar } from "@heroui/react";

const Chat = ({ type, cls, msg }) => {
  if (type === "agent") {
    return (
      <div className={`flex gap-4 ${cls}`}>
        <div>
          <Avatar
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          />
        </div>
        <div className="bg-white">
          <p>{msg}</p>
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
