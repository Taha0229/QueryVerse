const ChatHistory = ({ categorizedChats }) => {
  return (
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
  );
};

export default ChatHistory;
