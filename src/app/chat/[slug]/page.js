"use client";
import { usePathname } from "next/navigation";
import { useData } from "@/app/context/DataContext";
import Chat from "@/app/components/chat";
import { useState, useEffect } from "react";
import InputBar from "@/app/components/inputBar";
import ChatHistory from "@/app/components/chatHistory";
import LogoSection from "@/app/components/logoSection";
import IconSection from "@/app/components/iconSection";

const now = new Date();

const categorizeChat = (chatTime) => {
  const chatDate = new Date(chatTime);
  const diffTime = now - chatDate;
  const diffDays = diffTime / (1000 * 3600 * 24); // Convert milliseconds to days

  if (diffDays < 1) return "Today";
  if (diffDays < 2) return "Yesterday";
  if (diffDays <= 7) return "Last 7 days";
  return "Earlier";
};

const ChatSlug = () => {
  const { setData, data, updateThreadId, threadId, conversationHistory, setConversationHistory } = useData();
  const [isLoading, setIsLoading] = useState(true);
  
  const pathname = usePathname();
  const splittedParam = pathname.split("/");
  const threadIdFromURL = splittedParam[splittedParam.length - 1];

  useEffect(() => {
    const setThreadId = async () => {
      try {
        await updateThreadId(threadIdFromURL);
      } catch (error) {
        console.error('Error updating thread ID:', error);
      }
    };
    
    setThreadId();
  }, [threadIdFromURL]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://queryverse-backend.onrender.com/v1/get-message-history?thread_id=${threadIdFromURL}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const fetchedData = await response.json();

        // Update context with fetched data
        if (fetchedData && fetchedData.length > 0) {
          setData(fetchedData);
        } else {
          // If no data is found, treat as a new chat
          setData([]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setData([]); // Handle gracefully by initializing as an empty chat
      }
    };

    fetchData();
  }, []);

  // When the a chat is directly accessed from the URL -> context is restarted as we are not navigating from the home page
  // For this reason it is best to have a global state like zustand or redux
  useEffect(() => {
    const fetchConversationHistory = async () => {
      if (conversationHistory.length === 0) {
        try {          
          const response = await fetch(
            `https://queryverse-backend.onrender.com/v1/get-conversation-history`
          );
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
          const fetchedData = await response.json();
          setConversationHistory(fetchedData);
        } catch (error) {
          console.error("Failed to fetch conversation history:", error);
          setConversationHistory([]);
        }
      }
    };
  
    fetchConversationHistory();
  }, [conversationHistory]);

  const categorizedChats = conversationHistory.reduce((acc, chat) => {
    const category = categorizeChat(chat.time);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(chat);
    return acc;
  }, {});

  return (
    <div>
      <div className="relative h-full w-full bg-blue-800 grid grid-cols-7">
        <div className="col-span-1 bg-[#f6f6f6]"></div>
        <div className="flex flex-col col-span-1 h-full bg-[#f6f6f6] fixed w-[270px] z-50">
          <IconSection />
          <ChatHistory categorizedChats={categorizedChats} />
        </div>

        <div className="col-span-6 h-full bg-white relative flex flex-col mx-auto w-full">
          <LogoSection />
          <div className="chat h-full relative mt-2 pb-28">
            {data.map((conversation) => {
              return (
                <div
                  key={conversation.id}
                  className="chat-element flex flex-col w-[40vw] mx-auto gap-8  mb-8"
                >
                  {conversation.userMessage && (
                    <Chat type="user" msg={conversation.userMessage} />
                  )}
                  {
                    <Chat
                      type="agent"
                      msg={conversation.agentMessage}
                      isLoading={!conversation?.agentMessage}
                    />
                  }
                </div>
              );
            })}
          </div>
          <InputBar />
        </div>
      </div>
    </div>
  );
};

export default ChatSlug;
