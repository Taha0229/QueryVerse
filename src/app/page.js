"use client";

import { useRouter } from "next/navigation";
import { useData } from "./context/DataContext";
import Chat from "./components/chat";
import { useState, useEffect } from "react";
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

export default function Home() {
  const { conversationHistory, setConversationHistory, data } = useData();
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  
  const categorizedChats = conversationHistory.reduce((acc, chat) => {
    const category = categorizeChat(chat.time);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(chat);
    return acc;
  }, {});

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/v1/get-conversation-history`
          );
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
          const fetchedData = await response.json();
          
          if (fetchedData && fetchedData.length > 0) {
            setConversationHistory(fetchedData);
          } else {
            setConversationHistory([]);
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setConversationHistory([]); // Handle gracefully by initializing as an empty chat
        }
      };
  
      fetchData();
    }, []);
  

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
          {data.map((conversation) => {
            return (
              <div
                key={conversation.id}
                className="chat-element flex flex-col w-[40vw] mx-auto gap-8  mb-8"
              >
                {conversation.userMessage && <Chat type="user" msg={conversation.userMessage} />}
                {<Chat type="agent" msg={conversation.agentMessage} isLoading={!conversation?.agentMessage}/>}
              </div>
            );
          })}
        </div>
        <InputBar />
      </div>
    </div>
  );
}
