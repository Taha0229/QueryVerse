"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "@heroui/react";
import Chat from "./components/chat";
import { useState } from "react";
import InputBar from "./components/inputBar";
import ChatHistory from "./components/chatHistory";
import LogoSection from "./components/logoSection";
import IconSection from "./components/iconSection";

const now = new Date();

const dummyChatHistory = [
  { id: 1, title: "chat 1", time: "2025-01-24T19:21:40.053745" },
  { id: 2, title: "chat 2", time: "2025-01-24T19:21:40.053756" },
  { id: 3, title: "chat 3", time: "2025-01-23T19:21:40.053760" },
  { id: 4, title: "chat 4", time: "2025-01-21T19:21:40.053762" },
  { id: 5, title: "chat 5", time: "2025-01-20T19:21:40.053765" },
  { id: 6, title: "chat 6", time: "2025-01-19T19:21:40.053767" },
  { id: 7, title: "chat 7", time: "2025-01-18T19:21:40.053770" },
  { id: 8, title: "chat 8", time: "2025-01-17T19:21:40.053774" },
  { id: 9, title: "chat 9", time: "2025-01-16T19:21:40.053778" },
  { id: 10, title: "chat 10", time: "2025-01-15T19:21:40.053783" },
  { id: 11, title: "chat 11", time: "2025-01-14T19:21:40.053788" },
  { id: 12, title: "chat 12", time: "2025-01-13T19:21:40.053793" },
  { id: 13, title: "chat 13", time: "2025-01-12T19:21:40.053798" },
  { id: 14, title: "chat 14", time: "2025-01-11T19:21:40.053802" },
  { id: 15, title: "chat 15", time: "2025-01-10T19:21:40.053806" },
  { id: 16, title: "chat 16", time: "2025-01-09T19:21:40.053811" },
  { id: 17, title: "chat 17", time: "2025-01-08T19:21:40.053816" },
  { id: 18, title: "chat 18", time: "2025-01-07T19:21:40.053828" },
  { id: 19, title: "chat 19", time: "2025-01-06T19:21:40.053831" },
  { id: 20, title: "chat 20", time: "2025-01-05T19:21:40.053834" },
  { id: 21, title: "chat 21", time: "2025-01-04T19:21:40.053839" },
  { id: 22, title: "chat 22", time: "2025-01-03T19:21:40.053843" },
  { id: 23, title: "chat 23", time: "2025-01-02T19:21:40.053847" },
  { id: 24, title: "chat 24", time: "2025-01-01T19:21:40.053852" },
  { id: 25, title: "chat 25", time: "2024-12-31T19:21:40.053856" },
];

const categorizeChat = (chatTime) => {
  const chatDate = new Date(chatTime);
  const diffTime = now - chatDate;
  const diffDays = diffTime / (1000 * 3600 * 24); // Convert milliseconds to days

  if (diffDays < 1) return "Today";
  if (diffDays < 2) return "Yesterday";
  if (diffDays <= 7) return "Last 7 days";
  return "Earlier";
};

const conversations = [
  {
    id: 1,
    userMessage: "Hello! Can you help me with learning JavaScript?",
    agentMessage:
      "Of course! JavaScript is a great language. What would you like to start with?",
  },
  {
    id: 2,
    userMessage: "What's the difference between `let`, `const`, and `var`?",
    agentMessage:
      "`let` and `const` are block-scoped and introduced in ES6, while `var` is function-scoped and considered outdated. Use `const` for values that don't change, and `let` otherwise.",
  },
  {
    id: 3,
    userMessage: "Can you explain what closures are in JavaScript?",
    agentMessage:
      "Sure! A closure is when a function remembers and accesses variables from its lexical scope, even when it's executed outside that scope.",
  },
  {
    id: 4,
    userMessage: "What is the purpose of promises?",
    agentMessage:
      "Promises are used to handle asynchronous operations in JavaScript, allowing you to manage actions that may take time, like fetching data from an API.",
  },
  {
    id: 5,
    userMessage: "How do I create an async function?",
    agentMessage:
      "You can create an async function by using the `async` keyword before a function declaration. For example: `async function fetchData() { /* code */ }`.",
  },
  {
    id: 6,
    userMessage:
      "What's the difference between synchronous and asynchronous code?",
    agentMessage:
      "Synchronous code executes line by line, blocking the next operation until the current one finishes. Asynchronous code, on the other hand, doesn't block the program and allows other operations to run while waiting for tasks to complete.",
  },
  {
    id: 7,
    userMessage: "How can I use the Fetch API to get data from an API?",
    agentMessage:
      "You can use `fetch('https://api.example.com')` to send a request. It returns a promise, and you can chain `.then()` or use `async/await` to handle the response.",
  },
  {
    id: 8,
    userMessage: "What's the difference between `==` and `===`?",
    agentMessage:
      "`==` checks for equality after type conversion, while `===` checks for strict equality without type conversion. It's safer to use `===`.",
  },
  {
    id: 9,
    userMessage: "Can you suggest a good project for learning JavaScript?",
    agentMessage:
      "Sure! Building a to-do list app is a great beginner project. It will teach you about DOM manipulation, event handling, and local storage.",
  },
  {
    id: 10,
    userMessage: "What are some common JavaScript frameworks or libraries?",
    agentMessage:
      "Some popular ones are React, Angular, and Vue for front-end development. Node.js is commonly used for back-end development.",
  },
];

export default function Home() {
  const router = useRouter();

  const categorizedChats = dummyChatHistory.reduce((acc, chat) => {
    const category = categorizeChat(chat.time);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(chat);
    return acc;
  }, {});

  // console.log(categorizedChats);

  const [activeChat, setActiveChat] = useState(dummyChatHistory[0].id);

  return (
    <div className="relative h-full w-full bg-blue-800 grid grid-cols-7">
      <div className="col-span-1 bg-[#f6f6f6]"></div>
      <div className="flex flex-col col-span-1 h-full bg-[#f6f6f6] fixed w-[270px] z-50">
        <IconSection />
        <ChatHistory categorizedChats={categorizedChats} />
      </div>

      <div className="col-span-6 h-full bg-white relative flex flex-col mx-auto w-full">
        <LogoSection />
        <div className="chat h-full relative mt-2">
          {conversations.map((conversation) => {
            return (
              <div
                key={conversation.id}
                className="chat-element flex flex-col w-[40vw] mx-auto gap-8  mb-8"
              >
                <Chat type="user" msg={conversation.userMessage} />
                <Chat type="agent" msg={conversation.agentMessage} />
              </div>
            );
          })}
        </div>
        <InputBar />
      </div>
    </div>
  );
}
