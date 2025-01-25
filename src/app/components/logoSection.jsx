import React from "react";
import { Avatar } from "@heroui/react";

const LogoSection = () => {
    
  return (
    <div className="logo-section flex justify-between p-4 bg-white sticky top-0 z-50">
      <p className="text-xl font-semibold text-gray-500">QueryVerse</p>
      <Avatar size="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    </div>
  );
};

export default LogoSection;
