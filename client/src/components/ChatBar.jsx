import { useState, useEffect, useRef } from "react";

const ChatBar = () => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentTime = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          user: "0x1ab2feccd", // Replace with actual user address
          message: newMessage,
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <ul className="chats p-8 space-y-4">
          {messages.map((message, key) => (
            <li className="chat chat-start" key={key}>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined bg-gray-200 p-2 rounded-full">
                  person_3
                </span>
                <div className="flex flex-col">
                  <h3 className="text-sm text-gray-600">
                    {message.user.slice(0, 6)}...{message.user.slice(-4)}
                  </h3>
                  <div className="chat-bubble chat-bubble-primary mt-1">
                    {message.message}
                  </div>
                  <time className="text-xs opacity-50 mt-1">
                    {currentTime()}
                  </time>
                </div>
              </div>
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      </div>

      <form
        onSubmit={handleSubmit}
        className="chat-input w-full p-4  border-t  flex items-center gap-4"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="input input-bordered flex-1"
          maxLength={50}
        />
        <button type="submit" className="btn btn-circle btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatBar;
