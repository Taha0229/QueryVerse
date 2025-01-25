"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "@heroui/react";
import Chat from "./components/chat";
import { useState } from "react";
import InputBar from "./components/inputBar";

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

  const generateChatId = () => {
    const chatId = crypto.randomUUID();
    console.log(chatId);
  };

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
        <div className="icon-section flex justify-between p-4 ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-xl-heavy max-md:hidden"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
              fill="currentColor"
            ></path>
          </svg>

          <svg
            onClick={generateChatId}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-xl-heavy cursor-pointer"
          >
            <path
              d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="overflow-y-auto px-4">
          {Object.keys(categorizedChats).map((category) => (
            <div key={category} className="mb-8">
              <h2 className="font-bold text-sm">{category}</h2>
              <ul className="space-y-1 mt-2">
                {categorizedChats[category].map((chat) => (
                  <li
                    key={chat.id}
                    className="p-2 rounded-lg cursor-pointer hover:bg-gray-200/70 text-sm"
                  >
                    {chat.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-6 h-full bg-white relative flex flex-col mx-auto w-full">
        <div className="logo-section flex justify-between p-4 bg-white sticky top-0 z-50">
          <p className="text-xl font-semibold text-gray-500">QueryVerse</p>
          <Avatar
            size="md"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
        </div>
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
        <InputBar/>
      </div>
      
    </div>
  );
}
