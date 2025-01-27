"use client";

import React, { createContext, useState, useContext } from "react";

// Create the context
const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  const addDataEntry = (entry) => {
    setData((prevData) => [...prevData, entry]); // Append the new entry to the list
  };

  const updateLastDataEntry = (updatedFields) => {
    setData((prevData) => {
      const lastIndex = prevData.length - 1;
      if (lastIndex >= 0) {
        const updatedEntry = { ...prevData[lastIndex], ...updatedFields };
        const updatedData = [...prevData];
        updatedData[lastIndex] = updatedEntry;
        return updatedData;
      }
      return prevData;
    });
  };
  const generateChatId = () => {
    const chatId = crypto.randomUUID();
    return chatId;
  };

  // use for single data entry
  const updateChatHistory = (newChat) => {
    setConversationHistory((prevData) => [newChat, ...prevData]);
  };

  const updateThreadId = async (id) => {
    return new Promise((resolve) => {
      setThreadId(id);
      resolve();
    });
  };

  return (
    <DataContext.Provider
      value={{
        setData,
        data,
        addDataEntry,
        updateLastDataEntry,
        threadId,
        updateThreadId,
        generateChatId,
        updateChatHistory,
        conversationHistory,
        setConversationHistory
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useData = () => {
  return useContext(DataContext);
};
